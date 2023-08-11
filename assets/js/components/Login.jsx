import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';

const message = new MessageApiClient();

export default function Login(props) {
    const [auth_email, setEmail] = useState('');
    const [alert, setAlert] = useState({ status: false, class: '' });

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
            email: formObject.auth_email,
            plainPassword: formObject.auth_password,
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
                    Vos identifiants sont incorrects
                </div>
            }
            <div className="container-form">
            <form onSubmit={formSubmit}>
                <div className="form-group">
                <input type="email" className="form-control" id="auth_email" name="auth_email" defaultValue="" placeholder="Email" />
                </div>
                <div className="form-group">
                <input type="password" className="form-control" id="auth_password" name="auth_password" defaultValue="" placeholder="Mot de passe" />
                </div>
                <a href="/register" className="d-block text-white">Je n'ai pas de compte, je m'inscris</a>
                <input type="hidden" id="template" name="template" defaultValue="login_form" />
                <input type="hidden" id="subject" name="subject" defaultValue="Connexion Happy Voisin" />
		        <input type="hidden" id="auth_action" name="auth_action" defaultValue="login" />
                <button type="submit" className="rounded-pill px-3 btn btn-sm bg-orange text-white big-button">Je me connecte</button>
            </form>
            </div>
        </>
    );
}