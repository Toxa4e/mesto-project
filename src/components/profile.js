import { popupProfile , nameImput , hobbiInput , popupAvatar , linkAvatar , profileTitle , profileSubtitle , profileImage} from "./const.js";
import { setAvatarProfile , sendingServerProfileInfo} from "./api.js";
import { closePopup , handleSubmit} from './modal';

export function updateUserData(profile) {
    profileTitle.textContent = profile.name;
    profileSubtitle.textContent = profile.about;
    profileImage.src = profile.avatar;
    profileImage.alt = profile.name;
};

//Форма редактирования профиля
export function handleProfileFormSubmit(evt) {
    function makeRequest() {
      //отпровляем на сервер и получаем ответ
      return sendingServerProfileInfo(nameImput.value, hobbiInput.value)
      //если все в порядке записываем в DOM
      .then((res) => {
        console.log(res); 
        profileTitle.textContent = res.name;
        profileSubtitle.textContent = res.about;
        closePopup(popupProfile);
      })
    }
    handleSubmit(makeRequest, evt);
};
  
//Форма редактирования аватара
export function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return setAvatarProfile(linkAvatar.value)
    .then((res) => {
      profileImage.src = res.avatar;
      closePopup(popupAvatar);
    })
  }
  handleSubmit(makeRequest, evt);
};