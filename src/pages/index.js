import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from '../components/Card.js'
import { Section } from '../components/Section';
import { Api } from '../components/Api';
import { PopupWithImage } from '../components/PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer } from '../utils/const';
import { validationSettings } from '../utils/utils.js';
import { UserInfo } from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';


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
                    popupWithImage.addEventListeners();
                } catch (err) {
                    console.error(`Ошибка: ${err}`);
                }
            }
        });

        return card.generate();
    }
    renderApp();


    const popupWithImage = new PopupWithImage({
        popupSelector: '.popup-image'
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

    // Форма редактирования аватара пользователя
    const popupFormAvatar = new PopupWithForm({
        popupSelector: '.popup-avatar',
        handleFormSubmit: async (data) => {
            try {
                popupFormAvatar.renderLoading(true);

                await api.setAvatarProfile(data.linkAvatar);
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

    // Форма редактирования профиля пользователя
    const popupFormProfile = new PopupWithForm({
        popupSelector: '.profile-popup',
        handleFormSubmit: async (data) => {
            try {
                popupFormProfile.renderLoading(true);
                await api.sendingServerProfileInfo({ nameImput: data.nameProfile, hobbiInput: data.hobbi });
                userInfo.setUserInfo({ name: data.nameProfile, about: data.hobbi });
                popupFormProfile.close();
            } catch (err) {
                console.error(`Ошибка: ${err}`);
            } finally {
                popupFormProfile.renderLoading(false);
            }
        }
    });

    //слушатель кнопки добовления карточки
    profileButton.addEventListener('click', () => {
        popupFormItem.open();
        formValidators['formCards'].resetValidation()
    });
    //слушатель кнопки редактирования аватара
    profileAvatar.addEventListener('click', () => {
        popupFormAvatar.open();
        formValidators['formAvatar'].resetValidation()
    });
    //слушатель кнопки редактирования профиля
    profileEditButton.addEventListener('click', () => {
        popupFormProfile.open();
        formValidators['formProfile'].resetValidation()
        const { name, about } = userInfo.getUserInfo();
        const data = { nameProfile: name, hobbi: about };
        popupFormProfile.setInputValues(data);
    });

})

//Валидация форм
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')

        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};
//инициировать валидацию
enableValidation(validationSettings);