import BaseModel from './BaseModel';
export default class BudgetModel extends BaseModel {
    async getLastCodeBy(data) {
        return fetch(this.getBudgetUrl().URL + 'generate-format/get-last-code-by', {
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
    async getBudgetBy(data) {
        return fetch(this.getBudgetUrl().URL + 'budget/get-budget-by', {
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
    async getBudgetByCode(data) {
        return fetch(this.getBudgetUrl().URL + 'budget/get-budget-by-code', {
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
    async getBudgetTreeByCode(data) {
        return fetch(this.getBudgetUrl().URL + 'budget/get-budget-tree-by-code', {
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