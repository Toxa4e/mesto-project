import '../pages/index.css'; // добавьте импорт главного файла стилей

import { profileEditButton , profileButton , elements , formCards , formProfile , profileAvatar , formAvatar , requestFromServer } from './const';
import { openPopProf , openPopItem , openImagePopup , openPopAvatar , edidAvatar , editProfInfo} from './modal.js';
import { likeElem , deletElem , handleItemFormSubmit} from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';
import { loadGetServerData} from './api.js';

import { addServerItem } from "./cards.js";
import { profileTitle , profileSubtitle , profileImage} from "./const.js";
//import { renderLoading } from "./modal.js";

//Получаем карточки с сервера
//Получаем данные профиля с сервера
function renderInitialPage(){
    loadGetServerData ()
    .then(([profile, cards]) => {
        console.log(profile);
        console.log(cards);
        updateUserData(profile);
        addServerItem(cards, profile);
      });
};


function updateUserData(profile) {
    profileTitle.textContent = profile.name;
    profileSubtitle.textContent = profile.about;
    profileImage.src = profile.avatar;
    profileImage.alt = profile.name;
};

//addServerItem();
profileEditButton.addEventListener('click', openPopProf);
profileButton.addEventListener('click', openPopItem);
profileAvatar.addEventListener('click', openPopAvatar);
//elements.addEventListener('click', openImagePopup);
//elements.addEventListener('click', likeElem);
//elements.addEventListener('click', deletElem);

//слушатель на Submit попапов
formCards.addEventListener('submit', handleItemFormSubmit); 
formProfile.addEventListener('submit', editProfInfo); 
formAvatar.addEventListener('submit', edidAvatar); 

//Визуализировать начальную страницу
renderInitialPage();
//инициировать валидацию
enableValidation(validationSettings);

