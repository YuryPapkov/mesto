export default class Api {
    constructor({ userURL, cardsURL, token }) {
        this._userURL = userURL;
        this._cardsURL = cardsURL;
        this._token = token;
    }
    userDownload() {
        return fetch(this._userURL, {
                method: 'GET',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => res.json())
            .then((result) => {
                return result;
            })
            .catch(() => {
                console.log('error downloading user data');
            })
    }


    cardsDownload() {
        return fetch(this._cardsURL, {
                method: 'GET',
                headers: {
                    authorization: this._token
                }
            })
            .then(res => res.json())
            .then(res => {
                return res;
            })
    }

    profileDataUpload(name, about) {
        return fetch(this._userURL, {
                method: 'PATCH',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
    }
    newCardUpload(name, link) {
        return fetch(this._cardsURL, {
                method: 'POST',
                headers: {
                    authorization: this._token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                console.log('error uploading card ');
            })
    }
    deleteCard(id) {
        const cardDeleteURL = (this._cardsURL + `/${id}`);
        return fetch(cardDeleteURL, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
    }
    likeCard(id) {
        const cardLikeURL = (this._cardsURL + `/likes/${id}`);
        return fetch(cardLikeURL, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
    }
    dislikeCard(id) {
        const cardLikeURL = (this._cardsURL + `/likes/${id}`);
        return fetch(cardLikeURL, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
    }
    avatarUpload(url) {
        return fetch((this._userURL + `/avatar`), {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: url.link,
            })
        })
    }
}
