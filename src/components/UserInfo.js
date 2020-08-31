export default class UserInfo {
    constructor({ nameSelector, occupationSelector }) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);


    }
    getUserInfo() {
        const userData = {};
        userData.name = this._name.textContent;
        userData.occupation = this._occupation.textContent;
        return userData;
    }
    setUserInfo({ name, occupation }) {
        this._name.textContent = name;
        this._occupation.textContent = occupation;
    }
}
