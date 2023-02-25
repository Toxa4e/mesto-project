import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './Card.js'
import { Section } from './Section';
import { Api } from './api_NEW';
import { PopupWithImage } from './PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer } from './const';
import { popupProfile , nameImput , hobbiInput , popupAvatar , linkAvatar , profileTitle , profileSubtitle , profileImage} from "./const.js";
import { openPopProf, openPopItem, openPopAvatar } from './modal.js';
import { handleItemFormSubmit, addServerItem } from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';
import { loadGetServerData } from './api.js';
import { updateUserData } from './profile';
import { handleAvatarFormSubmit, handleProfileFormSubmit } from './profile';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';


//Получаем карточки с сервера
//Получаем данные профиля с сервера
/*function renderInitialPage() {
    loadGetServerData()
        .then(([profile, cards]) => {
            console.log(profile);
            console.log(cards);
            updateUserData(profile);
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
};*/
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

//слушатель кнопки редактирования аватара
profileAvatar.addEventListener('click', () => {
    popupFormAvatar.open();
});
//слушатель кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
    popupFormProfile.open();
});
//слушатель кнопки добовления карточки
profileButton.addEventListener('click', () => {
    popupFormItem.open();
});


//Форма редактирования Аватара
const popupFormAvatar = new PopupWithForm({
    popupSelector: '.popup-avatar',
    handleFormSubmit: (data) => {
        popupFormAvatar.renderLoading(true);
        return api.setAvatarProfile(linkAvatar.value)
        .then((res) => {
           userInfo.setUserInfo(res);
           popupFormAvatar.close()
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupFormAvatar.renderLoading(false);
        })
      }
    });
// Слушатель submit отправки формы редактирования аватара профиля
popupFormAvatar.addEventListeners();


//Форма редактирования профиля
const popupFormProfile = new PopupWithForm({
    popupSelector: '.profile-popup',
    handleFormSubmit: () => {
        popupFormProfile.renderLoading(true);
    
        api.sendingServerProfileInfo(nameImput.value, hobbiInput.value)
        .then((res) => {
            userInfo.setUserInfo(res);
            popupFormProfile.close();
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupFormProfile.renderLoading(false);
        })
      }
});
// Слушатель submit отправки формы редактирования аватара профиля
popupFormProfile.addEventListeners();

//Форма добовления карточки
const popupFormItem = new PopupWithForm({
    popupSelector: '.popup-item',
    handleFormSubmit: (data) => {
        popupCardAdd.renderLoading(true);
    
        api.sendingServerCardItem(linkCard.value, nameCard.value)
        .then((result) => {
         // создать карточку
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupCardAdd.renderLoading(false);
        })
      }
});
// Слушатель submit отправки формы редактирования аватара профиля
popupFormItem.addEventListeners();


//addServerItem();
//profileEditButton.addEventListener('click', openPopProf);
//profileButton.addEventListener('click', openPopItem);


//слушатель на Submit попапов
//formCards.addEventListener('submit', handleItemFormSubmit);
//formProfile.addEventListener('submit', handleProfileFormSubmit);
//formAvatar.addEventListener('submit', handleAvatarFormSubmit);

//Визуализировать начальную страницу
//renderInitialPage();

//Инициировать валидацию
//enableValidation(validationSettings);
export const profileFormValidator = new FormValidator(
    {
        validationSettings: validationSettings,
        form: formProfile
    },
);
profileFormValidator.enableValidation();

export const cardFormValidator = new FormValidator(
    {
        validationSettings: validationSettings,
        form: formCards
    },
);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
    {
        validationSettings: validationSettings,
        form: formAvatar
    },
);
avatarFormValidator.enableValidation();
