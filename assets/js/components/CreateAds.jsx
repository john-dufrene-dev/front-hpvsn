import React, { useState, useEffect } from 'react';
import { MessageApiClient } from '@@js/api/message';
import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from "react-google-autocomplete";

const message = new MessageApiClient();

export default function CreateAds(props) {
    const [auth_email, setEmail] = useState('');
    const [alert, setAlert] = useState({ status: false, class: '' });
    const user = JSON.parse(props.user);
    const company_url = `/api/companies/${process.env.X_AUTH_IDENTIFIER}`;
    const MaxSize = 10048576; // 10MB in bytes
    const acceptedFileTypes = ['image/jpeg'];
    const [btnType, setBtnType] = useState('Objet');
    const [objectIn, setObjectIn] = useState('Vente');
    const [services, setServices] = useState('Bénévolat');

    const initMap = () => {
        // Code pour initialiser la carte Google Maps ici
        const map = new window.google.maps.Map(document.getElementById('google-map'), {
            center: { lat: 43.712228, lng: 7.1251804 },
            zoom: 12
        });

        // Ajoutez des marqueurs, des informations de fenêtre d'info, etc. selon vos besoins
    };

    useEffect(() => {
        if (props.user !== 'null') {
            setEmail(user.token)
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmMm3tzEL2ScIbGlS-XgFtbJECQWQqP8s&libraries=places`;
        script.async = true;
        script.onload = initMap; // Appeler la fonction initMap une fois que l'API est chargée
        document.body.appendChild(script);
    }, []);
  
    const handlebtnTypeChange = (event) => {
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
            ads_services: formObject.ads_services,
            ads_description: formObject.ads_description,
            ads_prix: formObject.ads_prix,
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
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file) // Create a preview URL for the image
        }));
    
        if (newFiles.some(file => file.file.size > MaxSize)) {
            // Handle file size error here
            console.log('File size exceeded');
            return;
        }
    
        setUploadedFiles([...uploadedFiles, ...newFiles]);
    };

    const removeFile = (fileIndex) => {
        const updatedFiles = uploadedFiles.filter((file, index) => index !== fileIndex);
        setUploadedFiles(updatedFiles);
    };
    

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
                    <label htmlFor="ads_title" className="form-label bigLabel">Commençons par l'essentiel !</label>
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
                <div className="form-group formMb40">
                    <label htmlFor="ads_btntype1" className="form-label labelRadio">Type* : </label>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="ads_btntype" id="ads_btntype1" autoComplete="off" defaultValue="Objet" checked={btnType === 'Objet'} onChange={handlebtnTypeChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_btntype1">Objet</label>

                        <input type="radio" className="btn-check" name="ads_btntype" id="ads_btntype2" autoComplete="off" defaultValue="Services" checked={btnType === 'Services'} onChange={handlebtnTypeChange} />
                        <label className="btn btn-outline-primary" htmlFor="ads_btntype2">Services</label>
                    </div>
                </div>
                <div className="form-group formMb40">
                    <label htmlFor="ads_objectin1" className="form-label labelRadio">Objet en* : </label>
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
                <div className="form-group formMb70">
                    <label htmlFor="ads_services1" className="form-label labelRadioGrey" aria-label="Disabled" disabled>Services : </label>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="ads_services" id="ads_services1" autoComplete="off" defaultValue="Bénévolat" onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services1">Bénévolat</label>

                        <input type="radio" className="btn-check" name="ads_services" id="ads_services" autoComplete="off" defaultValue="Rémunéré" onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services2">Rémunéré</label>

                        <input type="radio" className="btn-check" name="ads_services" id="ads_services3" autoComplete="off" defaultValue="Sur devis" onChange={handleServicesChange} aria-label="Disabled" disabled />
                        <label className="btn btn-outline-primary" htmlFor="ads_services3">Sur devis</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_description" className="form-label bigLabel">Description de l'annonce*</label><br></br>
                    <span className="adsInfos">Plus il y a de détails, plus votre annonce sera de qualité.</span>
                    <textarea className="form-control" id="ads_description" rows="3" defaultValue="" placeholder="Description*"></textarea>
                    <span className="adsInfos">0 / 4000 caractères</span>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_price" className="form-label bigLabel">Quel est ton prix ?</label>
                    <input type="text" id="ads_price" name="ads_price" className="form-control" defaultValue="" placeholder="Prix*" />
                </div>
                <div className="form-group">
                    <label htmlFor="ads_price" className="form-label bigLabel">Photos de l'annonce</label>
                    <Dropzone onDrop={handleDrop} accept={acceptedFileTypes} multiple>
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="dropzone-inner">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
                                    <p>Ajouter des photos</p>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    <div className="preview-container">
                        {uploadedFiles.map((file, index) => (
                            <div className="file-preview" key={index}>
                                <img src={file.preview} alt={`Preview ${index}`} />
                                <button className="remove-button" onClick={() => removeFile(index)}><FontAwesomeIcon icon={faTrashAlt} className="upload-icon" /></button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="ads_locate" className="form-label bigLabel">Localisation</label>
                    <Autocomplete
                    apiKey="AIzaSyAmMm3tzEL2ScIbGlS-XgFtbJECQWQqP8s"
                    onPlaceSelected={(place) => {
                        console.log(place);
                    }}
                    />
                    <div id="google-map" className="google-map"></div>
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