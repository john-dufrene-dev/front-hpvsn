export class ApiClient {
    constructor({ baseUrl, options } = {}) {
        this.baseUrl = baseUrl || process.env.ADMIN_URL || '';
        this.contentType = 'application/ld+json';
        this.defaultHeaders = options?.defaultHeaders || {
            // 'Access-Control-Allow-Origin': '*',
            'Content-Type': this.contentType,
            'X-AUTH-TOKEN': `${process.env.X_AUTH_TOKEN || ''}`,
            'X-AUTH-IDENTIFIER': `${process.env.X_AUTH_IDENTIFIER || ''}`,
        };
    }

    isAbsoluteUrl({ url }) {
        return /^(?:http(s)?:\/\/)/.test(url);
    }

    objectToQueryString({ obj }) {
        const keyValuePairs = [];
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                obj[key].forEach((value) => {
                    keyValuePairs.push(
                        encodeURIComponent(key) + '[]=' + encodeURIComponent(value),
                    );
                });
            } else {
                keyValuePairs.push(
                    encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
                );
            }
        }
        return keyValuePairs.join('&');
    }

    async request({
        method,
        endpoint,
        headers,
        body,
        revalidate,
    }) {
        const requestOptions = {
            method,
            headers: { ...this.defaultHeaders, ...headers },
        };

        // requestOptions.mode = 'cors';

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }

        if (undefined !== revalidate) {
            requestOptions.next = { revalidate: revalidate };
        }

        const url = this.isAbsoluteUrl({ url: endpoint })
            ? endpoint
            : `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, requestOptions);

        const result = await response.json();

        return {
            status: response.status,
            ok: response.ok,
            datas: result,
        };
    }

    async get({ endpoint, headers, queryParams, revalidate }) {
        const queryString = queryParams
            ? '?' + this.objectToQueryString({ obj: queryParams })
            : '';
        return this.request({
            method: 'GET',
            endpoint: endpoint + queryString,
            headers,
            revalidate,
        });
    }

    async post({ endpoint, data, headers, revalidate }) {
        return this.request({
            method: 'POST',
            endpoint,
            headers,
            body: data,
            revalidate: revalidate,
        });
    }

    async put({ endpoint, data, headers, revalidate }) {
        return this.request({
            method: 'PUT',
            endpoint,
            headers,
            body: data,
            revalidate: revalidate,
        });
    }

    async patch({ endpoint, data, headers, revalidate }) {
        return this.request({
            method: 'PATCH',
            endpoint,
            headers,
            body: data,
            revalidate: revalidate,
        });
    }

    async delete({ endpoint, headers, revalidate }) {
        return this.request({
            method: 'DELETE',
            endpoint,
            headers,
            revalidate: revalidate,
        });
    }
}
