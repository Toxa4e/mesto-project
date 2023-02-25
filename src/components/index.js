import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './Card.js'
import { Section } from './Section';
import { Api } from './Api';
import { PopupWithImage } from './PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer, profileTitle , profileSubtitle , profileImage } from './const';
import { validationSettings } from './units.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';


const api = new Api(requestFromServer);

const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__subtitle',
    avatarSelector: '.profile__image',
});

document.addEventListener('DOMContentLoaded', () => {
    
    async function renderApp() {
        try {
            const [profile, cards] = await api._loadGetServerData();
           
            userInfo.setUserInfo(profile);
            const { _id } = userInfo.getUserInfo();
            //console.log(_id);

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
                    await api.deletServerCardItem(id)
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
    {   validationSettings: validationSettings,
        form: formAvatar
    },
);
avatarFormValidator.enableValidation();


// Форма редактирования профиля пользователя
//слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
    popupFormProfile.open();
});
//Форма редактирования профиля
const popupFormProfile = new PopupWithForm({
    popupSelector: '.profile-popup',
    handleFormSubmit: async (data) => {
        try {
            popupFormProfile.renderLoading(true);
            api.sendingServerProfileInfo({ nameImput:data.nameProfile, hobbiInput:data.hobbi });
            //console.log(data);
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
    {   validationSettings: validationSettings,
        form: formProfile
    },
);
profileFormValidator.enableValidation();


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
            api.sendingServerCardItem(data.linkCard, data.nameCard);
            //console.log(data);
            const newCard = new Card(data.nameCard, data.linkCard, data.owner, data.likes, data._id );
            cardList.addItem(newCard.generate())
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
export const cardFormValidator = new FormValidator(
    {   validationSettings: validationSettings,
        form: formCards
    },
);
cardFormValidator.enableValidation();