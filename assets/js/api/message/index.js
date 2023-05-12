import { ApiClient } from "@@js/api";

export class MessageApiClient extends ApiClient {
    constructor({ baseUrl = '', options } = {}) {
        super({ baseUrl, options });
    }

    async sendMessage(body) {
        return this.post({
            endpoint: `/api/messages`,
            data: body
        });
    }
}

