import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';

const message = new MessageApiClient();

export default function Contact(props) {
    const [email, setEmail] = useState('');
    const user = JSON.parse(props.user);
    const company_url = `/api/companies/${process.env.X_AUTH_IDENTIFIER}`;

    useEffect(() => {
        if (props.user !== 'null') {
            setEmail(user.token)
        }
    }, []);

    const formSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());

        const object = {
            email: formObject.email,
            company: company_url,
            subject: formObject.subject,
            content: formObject.content,
            template: formObject.template,
            extras: [],
            files: [],
            want_to_subscribe: false
        };

        message.sendMessage(object)
            .then((response) => {
                console.log(response)
            })
    }

    return (
        <>
            <form onSubmit={formSubmit}>
                <input type="email" id="email" name="email" defaultValue={email} placeholder="Email" />
                <input type="hidden" id="company" name="company" defaultValue={company_url} placeholder="Email" />
                <input type="text" id="subject" name="subject" placeholder="Subject" defaultValue="testerrrrrrrrrr" />
                <input type="text" id="content" name="content" placeholder="content" defaultValue="testjhgfdsfghjk" />
                <input type="hidden" id="template" name="template" defaultValue="contact_form" placeholder="Email" />
                <input type="submit" />
            </form>
        </>
    );
}