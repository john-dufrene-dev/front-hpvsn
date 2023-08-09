import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';

const message = new MessageApiClient();

export default function Register(props) {
    const [auth_email, setEmail] = useState('');
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
            pseudo: formObject.pseudo,
            auth_email: formObject.auth_email,
            auth_password: formObject.auth_password,
            tel: formObject.tel,
            company: formObject.company,
            kbis: formObject.kbis,
            address: formObject.address,
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
            <div className="container-form">
            <form onSubmit={formSubmit}>
                <div className="form-group">
                <input type="text" id="pseudo" name="pseudo" className="form-control" defaultValue="" placeholder="Nom d'utilisateur" />
                </div>
                <div className="form-group">
                <input type="email" className="form-control" id="auth_email" name="auth_email" defaultValue="" placeholder="Email" />
                </div>
                <div className="form-group">
                <input type="password" className="form-control" id="auth_password" name="auth_password" defaultValue="" placeholder="Mot de passe" />
                </div>
                <hr></hr>
                <div className="form-group">
                <input type="text" id="name" name="name" className="form-control" defaultValue="" placeholder="Nom et prénom" />
                </div>
                <div className="form-group">
                <input type="tel" className="form-control" id="tel" name="tel" placeholder="Téléphone" />
                </div>
                <div className="form-group">
                <input type="tel" className="form-control" id="address" name="address" placeholder="Mon Addresse" />
                </div>
                <input type="hidden" id="template" name="template" defaultValue="register_form" />
                <input type="hidden" id="subject" name="subject" defaultValue="Formulaire d'inscription Happy Voisin" />
		        <input type="hidden" id="auth_action" name="auth_action" defaultValue="register" />
                <button type="submit" className="rounded-pill px-3 btn btn-sm bg-orange text-white big-button">Je m'inscris</button>
            </form>
            </div>
        </>
    );
}