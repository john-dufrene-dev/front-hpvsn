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
                    <div className="jePapoteInput">
                        <form>
                            <div className="position-relative">
                                <input type="text" className="form-control rounded-20 border-0" placeholder="Je papote avec mes voisins" />
                                <button type="submit" className="btn btn-orange rounded-circle position-absolute">
                                    <span className="arrow-right"></span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="messagesFeed">
                        <div className="itemMessages">
                            <span className="nameMessages">Jane Doe</span><br/>
                            <span className="dateMessages">Aujourd'hui à 20:20 - Ville</span>
                            <p className="message">Bonjour, je recherche une crèche pour mon enfant de 1 an dans le quartier de St Philippe. 
                            Avez-vous des recommandations ? Merci</p>
                        </div>
                        <div className="itemMessages">
                            <span className="nameMessages">Jane Doe</span><br/>
                            <span className="dateMessages">Aujourd'hui à 20:20 - Ville</span>
                            <p className="message">Bonjour, je recherche une crèche pour mon enfant de 1 an dans le quartier de St Philippe. 
                            Avez-vous des recommandations ? Merci</p>
                        </div>
                        <a href="#" title="Voir tout" className="rounded-pill px-3 btn btn-sm bg-orange text-white post-annoucement">Voir tout</a>
                    </div>
                    <div className="listAnnouncements">
                        <h2 className="h2titlegray">Les dernières Ptites annonces</h2>
                    </div>
                    <div id="item_announcement_{#{announcement.id}#}" className="row announces-item">
                        <div className="col-md-4 thumb-annnouncementlist">
                            <img src="/img/img_annonce.jpg" alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-8 content-annnouncementlist">
                            <div className="d-flex head-content-annnouncementlist">
                                <div className="hour-annnouncementlist">Aujourd'hui à 22:20 - Par Sarah</div>
                                <div className="ml-auto price-annnouncementlist"><span className="price">10€</span> <span className="badge badge-secondary bg-orange">location</span></div>
                            </div>
                            <div className="content-annnouncementlist">
                                <h3 className="title-annnouncementlist">Cherche appareil à raclette</h3>
                                <p className="description-annnouncementlist">Bonjour, j’ai besoin d’un appareil à raclette pour 8 personnes avec grill au dessus. J’attends vos propositions !</p>
                                <div className="categories-annnouncementlist"><a href="#" className="text-orange">Objet</a><a href="#" className="text-orange">Électroménager</a></div>
                            </div>
                        </div>
                    </div><hr/>
                    <div id="item_announcement_{#{announcement.id}#}" className="row announces-item">
                        <div className="col-md-4 thumb-annnouncementlist">
                            <img src="/img/img_annonce.jpg" alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-8 content-annnouncementlist">
                            <div className="d-flex head-content-annnouncementlist">
                                <div className="hour-annnouncementlist">Aujourd'hui à 22:20 - Par Sarah</div>
                                <div className="ml-auto price-annnouncementlist"><span className="price">10€</span> <span className="badge badge-secondary bg-orange">location</span></div>
                            </div>
                            <div className="content-annnouncementlist">
                                <h3 className="title-annnouncementlist">Cherche appareil à raclette</h3>
                                <p className="description-annnouncementlist">Bonjour, j’ai besoin d’un appareil à raclette pour 8 personnes avec grill au dessus. J’attends vos propositions !</p>
                                <div className="categories-annnouncementlist"><a href="#" className="text-orange">Objet</a><a href="#" className="text-orange">Électroménager</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="listAnnouncements">
                        <h2 className="h2titlegray">Les dernières demandes</h2>
                    </div>
                    <div id="item_announcement_{#{announcement.id}#}" className="row announces-item">
                        <div className="col-md-4 thumb-annnouncementlist">
                            <img src="/img/img_annonce.jpg" alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-8 content-annnouncementlist">
                            <div className="d-flex head-content-annnouncementlist">
                                <div className="hour-annnouncementlist">Aujourd'hui à 22:20 - Par Sarah</div>
                                <div className="ml-auto price-annnouncementlist"><span className="price">10€</span> <span className="badge badge-secondary bg-orange">location</span></div>
                            </div>
                            <div className="content-annnouncementlist">
                                <h3 className="title-annnouncementlist">Cherche appareil à raclette</h3>
                                <p className="description-annnouncementlist">Bonjour, j’ai besoin d’un appareil à raclette pour 8 personnes avec grill au dessus. J’attends vos propositions !</p>
                                <div className="categories-annnouncementlist"><a href="#" className="text-orange">Objet</a><a href="#" className="text-orange">Électroménager</a></div>
                            </div>
                        </div>
                    </div><hr/>
                    <div id="item_announcement_{#{announcement.id}#}" className="row announces-item">
                        <div className="col-md-4 thumb-annnouncementlist">
                            <img src="/img/img_annonce.jpg" alt="" className="img-fluid" />
                        </div>
                        <div className="col-md-8 content-annnouncementlist">
                            <div className="d-flex head-content-annnouncementlist">
                                <div className="hour-annnouncementlist">Aujourd'hui à 22:20 - Par Sarah</div>
                                <div className="ml-auto price-annnouncementlist"><span className="price">10€</span> <span className="badge badge-secondary bg-orange">location</span></div>
                            </div>
                            <div className="content-annnouncementlist">
                                <h3 className="title-annnouncementlist">Cherche appareil à raclette</h3>
                                <p className="description-annnouncementlist">Bonjour, j’ai besoin d’un appareil à raclette pour 8 personnes avec grill au dessus. J’attends vos propositions !</p>
                                <div className="categories-annnouncementlist"><a href="#" className="text-orange">Objet</a><a href="#" className="text-orange">Électroménager</a></div>
                            </div>
                        </div>
                    </div>
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
