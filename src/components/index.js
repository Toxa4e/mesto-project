import '../pages/index.css'; // добавьте импорт главного файла стилей

import { profileEditButton , profileButton , formCards , formProfile , profileAvatar , formAvatar } from './const';
import { openPopProf , openPopItem , openPopAvatar } from './modal.js';
import { handleItemFormSubmit , addServerItem} from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';
import { loadGetServerData} from './api.js';
import { updateUserData } from './profile';
import { handleAvatarFormSubmit , handleProfileFormSubmit } from './profile';

//Получаем карточки с сервера
//Получаем данные профиля с сервера
function renderInitialPage() {
    loadGetServerData ()
    .then(([profile, cards]) => {
        console.log(profile);
        console.log(cards);
        updateUserData(profile);
        addServerItem(cards, profile);
    })
    .catch((err) => {
        console.error(`Ошибка: ${err}`);
    })
};

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

