import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL, STORAGE } from "../../konstante";
import ModelCreateForma from "./ModelCreateForma";
import Select from 'react-select';
import { Modal } from "bootstrap";

export default class AutomobilCreateForma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: {
                model: {},
                parking: {}
            },
            modeli: [],
            parkinzi: [],
            datum_od: null,
            datum_od: null
        };
    }

    handleChange(e) {
        this.setState({
            automobil: {
                ...this.state.automobil,
                [e.target.name]: e.target.value
            }
        });
    }
    handleChangeSelect(selectedOption) {
        this.setState({
            [selectedOption.type]: selectedOption.data,
            automobil: {
                ...this.state.automobil,
                [selectedOption.type]: selectedOption.data
            }
        });
    }

    dodaj() {
        Axios.post(BASE_URL + '/automobili/', {
            id_model: this.state.automobil.model.id_model,
            id_parking: this.state.automobil.parking.id_parking,
            registracija: this.state.automobil.registracija,
            cena_na_dan: this.state.automobil.cena_na_dan
        }).then(res => {
            alert(res.data.poruka);
        }).catch(error => {
            alert(error.response.data.poruka);

        });
    }

    getModeli() {

        Axios.get(BASE_URL + '/modeli').then(res => {
            this.setState({ modeli: res.data.modeli });
        });
    }
    getParkinzi() {

        Axios.get(BASE_URL + '/parkinzi').then(res => {
            this.setState({ parkinzi: res.data.parkinzi });
        });
    }

    selektOpcijeModel() {
        return this.state.modeli.map(model => {
            return { value: model.id_model, label: model.marka + model.model, slika: model.slika, type: 'model', data: model }
        })
    }


    selektOpcijeParking() {
        return this.state.parkinzi.map(parking => {
            return { value: parking.id_parking, label: parking.naziv, type: 'parking', data: parking }
        })
    }

    ispisiFormu() {

        return (
            <div>

                <button onClick={() => {
                    this.getModeli();
                    this.getParkinzi();
                }} type="button" class="btn btn-success automobilCreateButton" data-toggle="modal" data-target={"#automobil_create"}>
                    +
                </button>

                <div class="modal fade" id={'automobil_create'} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Dodavanje automobila
                                </h5>
                                <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="registracija">Registracija</label>
                                    <input
                                        name="registracija"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                        maxLength={6}
                                        minLength={6}
                                    ></input>
                                    <label for='cena_na_dan'>Cena Na Dan</label>
                                    <input
                                        name='cena_na_dan'
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                    ></input>
                                    <label for="model">Model</label>
                                    <Select
                                        name="id_model"
                                        onChange={this.handleChangeSelect.bind(this)}
                                        className="form-control"
                                        options={this.selektOpcijeModel() || []}
                                    />
                                    {this.state.model ?
                                        <img class="card-img-top" height='300px' width='300px' src={STORAGE + this.state.model.slika} alt={STORAGE + this.state.model.slika}></img>
                                        :
                                        <img class="card-img-top" src={STORAGE + 'placeholder.jpg'} alt={STORAGE + 'placeholder.jpg'}></img>}
                                        <br />
                                    <label for="parking">Parking</label>
                                    <Select
                                        key={'create_form' + 'parkinzi_select'}
                                        name="id_parking"
                                        onChange={this.handleChangeSelect.bind(this)}
                                        className="form-control"
                                        options={this.selektOpcijeParking() || []}
                                    />
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={this.dodaj.bind(this)}
                                >
                                    Dodaj
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        );

    }

    render() {
        return this.ispisiFormu();
    }
}

