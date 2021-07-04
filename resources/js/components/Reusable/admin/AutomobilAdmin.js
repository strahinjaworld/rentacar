import Axios from "axios";
import { ready } from "jquery";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_DOMAIN, BASE_URL, STORAGE } from "../../konstante";
import AutomobilUpdateForma from "../forme/AutomobilUpdateForma";
import AutomobilDeleteForma from "../forme/AutomobilDeleteForma";

export default class AutomobilAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: this.props.automobil || {
                model: {

                },
                parking: {

                }
            },
            stranica: this.props.automobilId ? true : false
        };

    }

    updateAutomobil(automobil) {
        console.log(automobil);
        this.setState({ automobil: { ...automobil } })
    }

    modalForma() {
        return (
            <div>
                <AutomobilUpdateForma updateAutomobil={this.updateAutomobil.bind(this)} key={this.state.automobil.id_automobil + 'upd'} automobil={this.state.automobil} />
                <AutomobilDeleteForma key={this.state.automobil.id_automobil + 'del'} automobil={this.state.automobil} />
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
                        {this.modalForma()}
                    </div>
                </div>
            </div>,
        ];
    }
}

