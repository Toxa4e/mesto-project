import '../pages/index.css'; // добавьте импорт главного файла стилей

import { profileEditButton , profileButton , elements , formItem , formElement , profileAvatar , formAvatarProf , requestFromServer } from './const';
import { openPopProf , openPopItem , openPopElem , openPopAvatar} from './modal.js';
import { likeElem , deletElem , handleItemFormSubmit , editProfInfo , edidAvatar} from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';
import { loadGetServerData} from './api.js';

//Получаем карточки с сервера
//Получаем данные профиля с сервера
loadGetServerData (requestFromServer);

//addServerItem();
profileEditButton.addEventListener('click', openPopProf);
profileButton.addEventListener('click', openPopItem);
profileAvatar.addEventListener('click', openPopAvatar);
elements.addEventListener('click', openPopElem);
elements.addEventListener('click', likeElem);
elements.addEventListener('click', deletElem);

//слушатель на Submit попапов
formItem.addEventListener('submit', handleItemFormSubmit); 
formElement.addEventListener('submit', editProfInfo); 
formAvatarProf.addEventListener('submit', edidAvatar); 

//инициировать валидацию
enableValidation(validationSettings);

