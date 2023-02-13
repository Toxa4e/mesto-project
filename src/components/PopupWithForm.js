import { Popup } from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(data, popupSelector) {
        //используем конструктор Popup
        super(popupSelector);

    }
    close (){
        super.close();
    }

    _getInputValues() {}

    addEventListeners() {
        super.addEventListeners();
//        formCards.addEventListener('submit', handleItemFormSubmit); 
//        formProfile.addEventListener('submit', handleProfileFormSubmit); 
//        formAvatar.addEventListener('submit', handleAvatarFormSubmit);  
    }


}
// 1. Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
// 2. Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// 3. Перезаписывает родительский метод setEventListeners. 
//    Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// 4. Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.