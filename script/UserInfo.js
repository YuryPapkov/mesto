export default class UserInfo {
    constructor({ nameSelector, occupationSelector }) {
        this._nameSelector = nameSelector;
        this._occupationSelector = occupationSelector;
        this._name = document.querySelector(this._nameSelector);
        this._occupation = document.querySelector(this._occupationSelector);


    }
    getUserInfo() {
        const userData = {};
        userData.name = this._name.textContent;
        userData.occupation = this._occupation.textContent;
        return userData;
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._occupation.textContent = data.occupation;
    }
}
