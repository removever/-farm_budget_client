import BaseModel from './BaseModel';
export default class UserModel extends BaseModel {
    async getLogin(data) {
        return fetch(this.getBaseUrl().URL + 'user/login-user', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.access_token_result) {
                    return responseJson;
                } else {
                    window.localStorage.clear();
                    window.location.href = '/';
                }
            }).catch((error) => {
                console.error(error);
            });
    }
    async getUserBy(data) {
        return fetch(this.getBaseUrl().URL + 'user/get-user-by', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async getUserByTable(data) {
        return fetch(this.getBaseUrl().URL + 'user/get-user-by', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }


}