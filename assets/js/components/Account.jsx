import React, { useState, useEffect } from 'react';
import { CustomerApiClient } from '@@js/api/customer';

const customer = new CustomerApiClient();

export default function Account(props) {
    const [account, setAccount] = useState(null);
    const user = JSON.parse(props.user);

    useEffect(() => {
        customer.getCustomer(user.json.token)
            .then((response) => {
                setAccount(response);
            })
    }, []);

    if (!account) {
        return <>Loading...</>;
    };

    if (!account.ok) {
        return <>Error...</>;
    };

    return (
        <div>
            <span>{account.datas.email}</span>
        </div>
    );
}
