import Axios from "axios";
import { ready } from "jquery";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_DOMAIN, BASE_URL, STORAGE } from "../konstante";
import RezervacijaForm from "./forme/RezervacijaForm";
import Rezervacija from "./Rezervacija";
import RezervacijaTable from "./RezervacijaTable";
import RezervacijeChart from "./RezervacijaChart";

export default class Automobil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: this.props.automobil || {
                model: {

                }
            },
            rezervacije: [],
            stranica: this.props.automobilId ? true : false
        };

        this.getAutomobil();
        this.getRezervacije();
    }

    getAutomobil() {
        if (this.state.stranica)
            Axios.get(BASE_URL + '/automobili/' + this.props.automobilId).then(res => {
                this.setState({ automobil: res.data.automobil });
            });
    }
    getRezervacije() {
        if (this.state.stranica)
            Axios.get(BASE_URL + '/rezervacije/automobili/' + this.props.automobilId).then(res => {
                this.setState({ rezervacije: res.data.rezervacije });
            });
    }

    modalForma() {
        if (this.state.stranica)
            return (
                <div>
                    <RezervacijaForm key={this.state.automobil.id_automobil} automobil={this.state.automobil} />
                </div>
            );
    }


    render() {

        return [

            <div className='col-4'>
                <div class="card text-left">
                    <img class="card-img-top" src={STORAGE + this.state.automobil.model.slika} alt={STORAGE + this.state.automobil.model.slika}></img>
                    <div class="card-body">
                        <h4 class="card-title">{this.state.automobil.model.marka + ' ' + this.state.automobil.model.model}</h4>
                        <p class="card-text">Cena: {this.state.automobil.cena_na_dan}</p>
                        {!this.state.stranica ? <a name="" id="" class="btn btn-primary" href={`${BASE_DOMAIN}/automobili/${this.state.automobil.id_automobil}`} role="button">Pogledaj</a> : this.modalForma()}
                    </div>
                </div>
            </div>,

            this.state.stranica ?
                <div className='col spustiti'>
                    {this.state.rezervacije.length ? <RezervacijeChart key={this.props.automobilId} rezervacije={this.state.rezervacije} /> : 'Nije rezervisan'}
                    <div className='d-flex'>
                        <div className='QrKod'>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${BASE_DOMAIN}/automobili/${this.props.automobilId}`}></img>
                        </div>
                        <p className='p-2'>QR Kod stranice automobila Vam pomaze da sadrzaj ove stranice prebacite na mobilni telefon, tako sto cete skenirati kod aplikacijom za skeniranje QR koda. Kada skenirate kod, pokazite stranicu automobila ovlascenom licu na parkingu, a nakon toga ovlasceno lice ce u Vase ime rezervisati automobil.</p>
                    </div>
                </div > : ''
        ];
    }
}

if (document.getElementById("automobil")) {
    const automobil = document.getElementById("automobil")
    ReactDOM.render(
        <Automobil automobilId={automobil.dataset.automobilid} />,
        document.getElementById("automobil")
    );
}
