import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './Card.js'
import { Section } from './Section';
import { Api } from './Api';
import { PopupWithImage } from './PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer, profileTitle, profileSubtitle, profileImage } from './const';
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

    async function renderApp() {
        try {
            const [profile, cards] = await api._loadGetServerData();

            userInfo.setUserInfo(profile);
            const { _id } = userInfo.getUserInfo();

            const cardList = new Section(
                {
                    renderer: (cardData) => {
                        cardList.addItem(createCard(cardData, _id));
                    },
                });
            cardList.render(cards);
        } catch (err) {
            console.error(`Ошибка: ${err}`);
        }
    }

    function createCard(cardData, userId) {
        const card = new Card(cardData, userId, {
            handleDelete: async (card) => {
                try {
                    card.remove();
                    const { id } = card.getData();
                    api.deletServerCardItem(id)
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

    const popupFormItem = new PopupWithForm({
        popupSelector: '.popup-item',
        handleFormSubmit: async (data) => {
            try {
                popupFormItem.renderLoading(true);
                const cardData = await api.sendingServerCardItem(data.linkCard, data.nameCard);
                const { _id } = userInfo.getUserInfo();
                const newCard = createCard(cardData, _id);
                const cardList = new Section(
                    {
                        renderer: (cardData) => {
                            cardList.addItem(createCard(newCard));
                        },
                    });
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

    profileButton.addEventListener('click', () => {
        popupFormItem.open();
    });
})


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
            //console.log(data.linkAvatar);
            profileImage.src = data.linkAvatar;
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
    console.log(data);
    popupFormProfile.setInputValues(data);
});
//Форма редактирования профиля
const popupFormProfile = new PopupWithForm({
    popupSelector: '.profile-popup',
    handleFormSubmit: async (data) => {
        try {
            popupFormProfile.renderLoading(true);
            api.sendingServerProfileInfo({ nameImput: data.nameProfile, hobbiInput: data.hobbi });
            profileTitle.textContent = data.nameProfile;
            profileSubtitle.textContent = data.hobbi;
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
export const profileFormValidator = new FormValidator(
    {
        validationSettings: validationSettings,
        form: formProfile
    },
);
profileFormValidator.enableValidation();


// Форма добовления карточек
//слушатель кнопки добовления карточки

//Форма добовления карточки

//Инициировать валидацию формы добовления карточек
export const cardFormValidator = new FormValidator(
    {
        validationSettings: validationSettings,
        form: formCards
    },
);
cardFormValidator.enableValidation();