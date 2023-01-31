import '../pages/index.css'; // добавьте импорт главного файла стилей

import { profileEditButton , profileButton , nameImput , hobbiInput , profileSubtitle , profileTitle , elements , formItem , formElement , initialCards} from './const';
import { openPopProf , openPopItem , openPopElem} from './modal.js';
import { addServerItem ,likeElem , deletElem , handleItemFormSubmit , editProfInfo} from './cards.js';
import { enableValidation } from './validate.js';
import { validationSettings } from './units.js';

import { getServerCardsItem , getServerProfileInfo , deletServerCardItem/*, sendingServerProfileInfo*/ , loadGetServerData} from './api.js';
import { requestFromServer } from './const.js';

//Получаем карточки с сервера
//getServerCardsItem(requestFromServer);
//addServerItem(initialCards); //карточки с задания
//Получаем данные профиля с сервера
//getServerProfileInfo(requestFromServer);
loadGetServerData (requestFromServer);

//addServerItem();
profileEditButton.addEventListener('click', openPopProf);
profileButton.addEventListener('click', openPopItem);
elements.addEventListener('click', openPopElem);
elements.addEventListener('click', likeElem);
//-------------
elements.addEventListener('click', deletElem);

formItem.addEventListener('submit', handleItemFormSubmit); 

//nameImput.value = profileTitle.textContent;
//hobbiInput.value = profileSubtitle.textContent; 
formElement.addEventListener('submit', editProfInfo); 

enableValidation(validationSettings);

