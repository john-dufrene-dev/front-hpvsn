import React, { useState, useEffect } from 'react';
import { CustomerApiClient } from '@@js/api/customer';

const customer = new CustomerApiClient();

export default function Account(props) {
    const [account, setAccount] = useState(null);
    const [sponsor, setSponsor] = useState(null);
    const [children, setChildren] = useState(null);
    const user = JSON.parse(props.user);

    useEffect(() => {
        customer.getCustomer(user.json.token)
            .then((response) => {
                setAccount(response);
            })
        customer.getSponsor(user.json.token)
            .then((response) => {
                setSponsor(response);
            })
    }, []);

    useEffect(() => {
        if (null !== sponsor && sponsor.ok) {
            const tree = sponsor.datas.sponsor_tree.tree;
            const levels1 = tree
                .filter(node => node.level === 1)
                .map(node => node.email);
            setChildren(levels1)
        }
    }, [sponsor]);

    if (!account) {
        return <>Loading...</>;
    };

    if (!account.ok) {
        return <>Error...</>;
    };

    return (
        <div>
            <span>{account.datas.email}</span>
            {null !== sponsor && sponsor.ok &&
                <>
                    <div>{sponsor.datas.sponsor_tree.total}</div>
                    <div><pre>{JSON.stringify(sponsor, null, 2)}</pre></div>
                    {null !== children &&
                        <ul>
                            {children.map((level, index) => (
                                <li key={index}>{level}</li>
                            ))}
                        </ul>
                    }
                </>
            }
        </div>
    );
}
