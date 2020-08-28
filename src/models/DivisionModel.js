import BaseModel from './BaseModel';
export default class DivisionModel extends BaseModel {
    async getDivisionBy(data) {
        return fetch(this.getBaseUrl().URL + 'division/get-division-by', {
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