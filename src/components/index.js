import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './Card.js'
import { Section } from './Section';
import { Api } from './Api';
import { PopupWithImage } from './PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer } from './const';
import { validationSettings } from './units.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';


document.addEventListener('DOMContentLoaded', () => {
    const api = new Api(requestFromServer);

    const userInfo = new UserInfo({
        nameSelector: '.profile__title',
        aboutSelector: '.profile__subtitle',
        avatarSelector: '.profile__image',
    });

    let _id;

    const cardList = new Section(
        {
            renderer: (cardData) => {
                cardList.addItem(createCard(cardData, _id));
            },
        });

    async function renderApp() {
        try {
            const [profile, cards] = await api._loadGetServerData();

            userInfo.setUserInfo(profile);
            _id = userInfo.getUserInfo()._id;
            cardList.render(cards);
        } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
    }

    function createCard(cardData, userId) {
        const card = new Card('#element', cardData, userId, {
            handleDelete: async (card) => {
                try {
                    const { id } = card.getData();
                    await api.deletServerCardItem(id);
                    card.remove();
                } catch (err) {
                    console.error(`Ошибка: ${err}`);
                }
            },
            handleLike: async (card) => {
                try {
                    const { id } = card.getData();
                    const cardInfo = await api.toggleLike(id, card.isLiked());
                    card.changeLike(cardInfo);
                } catch (err) {
                    console.error(`Ошибка: ${err}`);
                }
            },
            handleImageClick: async () => {
                try {
                    popupWithImage.open(cardData);
                } catch (err) {
                    console.error(`Ошибка: ${err}`);
                }
            }
        });

        const popupWithImage = new PopupWithImage({
            popupSelector: '.popup-image'
        });

        return card.generate();
    }
    renderApp();

    // Форма добовления карточек
    //слушатель кнопки добовления карточки
    profileButton.addEventListener('click', () => {
        popupFormItem.open();
    });

    //Форма добовления карточки
    const popupFormItem = new PopupWithForm({
        popupSelector: '.popup-item',
        handleFormSubmit: async (data) => {
            try {
                popupFormItem.renderLoading(true);
                const cardData = await api.sendingServerCardItem(data.linkCard, data.nameCard);
                const newCard = createCard(cardData, _id);
                cardList.addItem(newCard)
                popupFormItem.close();
            } catch (err) {
                console.error(`Ошибка: ${err}`);
            } finally {
                popupFormItem.renderLoading(false);
            }
        }
    });
    // Слушатель submit отправки формы добавления карточки
    popupFormItem.addEventListeners();

    //Инициировать валидацию формы добовления карточек
    const cardFormValidator = new FormValidator(
        {
            validationSettings: validationSettings,
            form: formCards
        },
    );
    cardFormValidator.enableValidation();

    // Форма редактирования аватара пользователя
    //слушатель кнопки редактирования аватара
    profileAvatar.addEventListener('click', () => {
        popupFormAvatar.open();
    });
    //Форма редактирования Аватара
    const popupFormAvatar = new PopupWithForm({
        popupSelector: '.popup-avatar',
        handleFormSubmit: async (data) => {
            try {
                popupFormAvatar.renderLoading(true);

                api.setAvatarProfile(data.linkAvatar);
                const avatar = data.linkAvatar;
                userInfo.setUserInfo({ avatar });
                popupFormAvatar.close();
            } catch (err) {
                console.error(`Ошибка: ${err}`);
            } finally {
                popupFormAvatar.renderLoading(false);
            }
        }
    });
    // Слушатель submit отправки формы редактирования аватара профиля
    popupFormAvatar.addEventListeners();
    //Инициировать валидацию формы аватара
    const avatarFormValidator = new FormValidator(
        {
            validationSettings: validationSettings,
            form: formAvatar
        },
    );
    avatarFormValidator.enableValidation();

    // Форма редактирования профиля пользователя
    //слушатель кнопки редактирования профиля
    profileEditButton.addEventListener('click', () => {
        popupFormProfile.open();
        const { name, about } = userInfo.getUserInfo();
        const data = { nameProfile: name, hobbi: about };
        popupFormProfile.setInputValues(data);
    });
    //Форма редактирования профиля
    const popupFormProfile = new PopupWithForm({
        popupSelector: '.profile-popup',
        handleFormSubmit: async (data) => {
            try {
                popupFormProfile.renderLoading(true);
                api.sendingServerProfileInfo({ nameImput: data.nameProfile, hobbiInput: data.hobbi });
                userInfo.setUserInfo({ name: data.nameProfile, about: data.hobbi });
                popupFormProfile.close();
            } catch (err) {
                console.error(`Ошибка: ${err}`);
            } finally {
                popupFormProfile.renderLoading(false);
            }
        }
    });
    // Слушатель submit отправки формы редактирования профиля
    popupFormProfile.addEventListeners();
    //Инициировать валидацию формы редактирования профиля
    const profileFormValidator = new FormValidator(
        {
            validationSettings: validationSettings,
            form: formProfile
        },
    );
    profileFormValidator.enableValidation();
})