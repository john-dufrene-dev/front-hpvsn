import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';

const message = new MessageApiClient();

export default function CreateAds(props) {
    const [auth_email, setEmail] = useState('');
    const [alert, setAlert] = useState({ status: false, class: '' });
    const user = JSON.parse(props.user);
    const company_url = `/api/companies/${process.env.X_AUTH_IDENTIFIER}`;

    useEffect(() => {
        if (props.user !== 'null') {
            setEmail(user.token)
        }
    }, []);

    const [btntype, setBtnType] = useState('Objet');
    const [objectIn, setObjectIn] = useState('Prêt');
    const [services, setServices] = useState('Bénévolat');
  
    const handleBtnTypeChange = (event) => {
      setBtnType(event.target.value);
    };
  
    const handleObjectInChange = (event) => {
      setObjectIn(event.target.value);
    };
  
    const handleServicesChange = (event) => {
      setServices(event.target.value);
    };

    const formSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let formObject = Object.fromEntries(data.entries());

        const object = {
            ads_title: formObject.ads_title,
            ads_category: formObject.ads_category,
            ads_btntype: formObject.ads_btntype,
            ads_objectin: formObject.ads_objectin,
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
                    <label htmlFor="ads_title" className="form-label">Commençons par l'essentiel !</label>
                    <input type="text" id="ads_title" name="ads_title" className="form-control" defaultValue="" placeholder="Quel est le titre de l'annonce ?*" />
                </div>
                <div className="form-group">
                    <select className="form-select" aria-label="Default select example" name="ads_category" id="ads_category">
                        <option defaultValue="">Choisir une catégorie*</option>
                        <option defaultValue="1">One</option>
                        <option defaultValue="2">Two</option>
                        <option defaultValue="3">Three</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_btntype" className="form-label">Type : </label>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="ads_btntype" id="ads_btntype1" autoComplete="off" defaultValue="Objet" checked={btntype === 'Objet'} onChange={handleBtnTypeChange} />
                        <label className="btn btn-outline-primary" htmlFor="btntype1">Objet</label>

                        <input type="radio" className="btn-check" name="ads_btntype" id="ads_btntype2" autoComplete="off" defaultValue="Services" checked={btntype === 'Services'} onChange={handleBtnTypeChange} />
                        <label className="btn btn-outline-primary" htmlFor="btntype2">Services</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_objectin1" className="form-label">Objet en : </label>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="ads_objectin" id="ads_objectin1" autoComplete="off" defaultValue="Prêt" checked={objectIn === 'Prêt'} onChange={handleObjectInChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_objectin1">Prêt</label>

                        <input type="radio" className="btn-check" name="ads_objectin" id="ads_objectin2" autoComplete="off" defaultValue="Vente" checked={objectIn === 'Vente'} onChange={handleObjectInChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_objectin2">Vente</label>

                        <input type="radio" className="btn-check" name="ads_objectin" id="ads_objectin3" autoComplete="off" defaultValue="Location" checked={objectIn === 'Location'} onChange={handleObjectInChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_objectin3">Location</label>

                        <input type="radio" className="btn-check" name="ads_objectin" id="ads_objectin4" autoComplete="off" defaultValue="Don" checked={objectIn === 'Don'} onChange={handleObjectInChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_objectin4">Don</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_services1" className="form-label" aria-label="Disabled" disabled>Services : </label>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="ads_services" id="ads_services1" autoComplete="off" defaultValue="Bénévolat" checked={services === 'Bénévolat'} onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services1">Bénévolat</label>

                        <input type="radio" className="btn-check" name="ads_services" id="ads_services" autoComplete="off" defaultValue="Rémunéré" checked={services === 'Rémunéré'} onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services2">Rémunéré</label>

                        <input type="radio" className="btn-check" name="ads_services" id="ads_services3" autoComplete="off" defaultValue="Sur devis" checked={services === 'Sur devis'} onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services3">Sur devis</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_description" className="form-label">Description de l'annonce</label>
                    <textarea className="form-control" id="ads_description" rows="3" defaultValue="" placeholder="Description*"></textarea>
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