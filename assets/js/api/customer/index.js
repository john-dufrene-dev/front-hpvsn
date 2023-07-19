import { ApiClient } from "@@js/api";

export class CustomerApiClient extends ApiClient {
    constructor({ baseUrl = '', options } = {}) {
        super({ baseUrl, options });
    }

    async getCustomer(token) {
        return this.get({
            endpoint: `/api/account/customer`,
            headers: {
                'Authorization': token
            }
        });
    }

    async getSponsor(token) {
        return this.get({
            endpoint: `/api/account/customer/sponsor`,
            headers: {
                'Authorization': token
            }
        });
    }
}

