import GOBALS from '../GOBALS';

export default class BaseModel {
    getBaseUrl() {
        return GOBALS.BASE_URL
    }
    getBudgetUrl() {
        return GOBALS.BUDGET_URL
    }
    getFinanceUrl() {
        return GOBALS.FINANCE_URL
    }
    getHeaders() {
        return GOBALS.headers
    }
    setToken(token) {
        GOBALS.headers['x-access-token'] = token;
    }
}