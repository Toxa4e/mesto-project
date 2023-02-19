import '../pages/index.css'; // добавьте импорт главного файла стилей

import { Card } from './Card.js'
import { Section } from './Section';
import { Api } from './api_NEW';
import { PopupWithImage } from './PopupWithImage'
import { profileEditButton, profileButton, formCards, formProfile, profileAvatar, formAvatar, requestFromServer } from './const';
import { openPopProf, openPopItem, openPopAvatar } from './modal.js';
import { handleItemFormSubmit, addServerItem } from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';
import { loadGetServerData } from './api.js';
import { updateUserData } from './profile';
import { handleAvatarFormSubmit, handleProfileFormSubmit } from './profile';

let _id;

//Получаем карточки с сервера
//Получаем данные профиля с сервера
function renderInitialPage() {
    loadGetServerData()
        .then(([profile, cards]) => {
            console.log(profile);
            console.log(cards);
            updateUserData(profile);
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
};

document.addEventListener('DOMContentLoaded', () => {
    async function renderApp() {
        try {
            const api = new Api(requestFromServer);
            const [profile, cards] = await api._loadGetServerData();
            _id = profile._id;

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
        const api = new Api(requestFromServer);
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



//addServerItem();
profileEditButton.addEventListener('click', openPopProf);
profileButton.addEventListener('click', openPopItem);
profileAvatar.addEventListener('click', openPopAvatar);

//слушатель на Submit попапов
formCards.addEventListener('submit', handleItemFormSubmit);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);

//Визуализировать начальную страницу
renderInitialPage();
//инициировать валидацию
enableValidation(validationSettings);

