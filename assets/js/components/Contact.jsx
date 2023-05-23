import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';

const message = new MessageApiClient();

export default function Contact(props) {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({ status: false, class: '' });
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
            name: formObject.name,
            email: formObject.email,
            tel: formObject.tel,
            company: company_url,
            subject: formObject.subject,
            demande: formObject.demande,
            template: formObject.template,
            extras: [],
            files: [],
            want_to_subscribe: false
        };

        message.sendMessage(object)
            .then((response) => {
                if (response.status === 201) {
                    setAlert({ status: true, alert: 'alert alert-success' })
                } else {
                    setAlert({ status: true, alert: 'alert alert-danger' })
                }
            })
    }

    return (
        <>
            {alert.status &&
                <div className={alert.alert} role="alert">
                    This is a primary alert—check it out!
                </div>
            }
            <div class="container-form">
            <form onSubmit={formSubmit}>
                <div class="form-group">
                <input type="text" id="name" name="name" class="form-control" defaultValue={name} placeholder="Nom et prénom" />
                </div>
                <div class="form-group">
                <input type="email" class="form-control" id="email" name="email" defaultValue={email} placeholder="Email" />
                </div>
                <div class="form-group">
                <input type="tel" class="form-control" id="tel" name="tel" placeholder="Téléphone" />
                </div>
                <div class="form-group">
                <textarea class="form-control" id="demande" name="demande" placeholder="Ta demande"></textarea>
                </div>
                <div class="form-group">
                </div>
                <input type="hidden" id="company" name="company" defaultValue={company_url} />
                <input type="hidden" id="template" name="template" defaultValue="contact_form" />
                <input type="hidden" id="subject" name="subject" defaultValue="Formulaire de contact Happy Voisin" />
                <button type="submit" class="btn btn-primary">Valider mon profil</button>
            </form>
            </div>
        </>
    );
}