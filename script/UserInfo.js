export default class UserInfo {
    constructor({ nameSelector, occupationSelector }) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;
        this._name = document.querySelector(this._nameSelector);
        this._occupation = document.querySelector(this._occupationSelector);


    }
    getUserInfo() {
        const userData = {};
        //console.log(this._nameSelector);
        //console.log(document.querySelector(this._nameSelector));
        userData.name = this._name.textContent;
        userData.occupation = this._occupation.textContent;
        return userData;
    }
    setUserInfo(data) {
        this._name.textContent = data[0];
        this._occupation.textContent = data[1];
    }
}
