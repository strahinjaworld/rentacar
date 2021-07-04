import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL, STORAGE } from "../../konstante";
import ModelCreateForma from "./ModelCreateForma";
import Select from 'react-select';
import { Modal } from "bootstrap";

export default class AutomobilUpdateForma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: this.props.automobil,
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

    izmena() {
        Axios.put(BASE_URL + '/automobili/' + this.state.automobil.id_automobil, {
            id_model: this.state.automobil.model.id_model,
            id_parking: this.state.automobil.parking.id_parking,
            registracija: this.state.automobil.registracija,
            id_automobil: this.props.automobil.id_automobil,
            cena_na_dan: this.state.automobil.cena_na_dan
        }).then(res => {
            alert(res.data.poruka);
            this.props.updateAutomobil(this.state.automobil)
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

    selektDefaultModel() {
        const { model } = this.state.automobil;
        return {
            value: model.id_model, label: model.marka + ' ' + model.model, slika: model.slika, type: 'model', data: model
        }
    }
    selektOpcijeParking() {
        return this.state.parkinzi.map(parking => {
            return { value: parking.id_parking, label: parking.naziv, type: 'parking', data: parking }
        })
    }

    selektDefaultParking() {
        const { parking } = this.state.automobil;
        return {
            value: parking.id_parking, label: parking.naziv, type: 'parking', data: parking
        }
    }


    ispisiFormu() {

        return (
            <div>

                <button onClick={() => {
                    this.getModeli();
                    this.getParkinzi();
                }} type="button" class="btn btn-warning btn-block" data-toggle="modal" data-target={"#automobil_update_" + this.props.automobil.id_automobil}>
                    Izmena podataka
                </button>

                <div class="modal fade" id={'automobil_update_' + this.props.automobil.id_automobil} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Izmena podataka
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
                                        value={this.state.automobil.registracija}
                                    ></input>
                                    <label for='cena_na_dan'>Cena Na Dan</label>
                                    <input
                                        name='cena_na_dan'
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                        value={this.state.automobil.cena_na_dan}
                                    ></input>
                                    <label for="model">Model</label>
                                    <Select
                                        key={this.state.automobil.id_automobil}
                                        name="id_model"
                                        onChange={this.handleChangeSelect.bind(this)}
                                        className="form-control"
                                        options={this.selektOpcijeModel() || []}
                                        defaultValue={this.selektDefaultModel() || []}
                                    />
                                    {this.state.model ?
                                        <img class="card-img-top" height='300px' width='300px' src={STORAGE + this.state.model.slika} alt={STORAGE + this.state.model.slika}></img>
                                        :
                                        <img class="card-img-top" src={STORAGE + 'placeholder.jpg'} alt={STORAGE + 'placeholder.jpg'}></img>}
                                        <br />
                                    <label for="parking">Parking</label>
                                    <Select
                                        key={this.state.automobil.id_automobil + 'parkinzi_select'}
                                        name="id_parking"
                                        onChange={this.handleChangeSelect.bind(this)}
                                        className="form-control"
                                        options={this.selektOpcijeParking() || []}
                                        defaultValue={this.selektDefaultParking() || []}
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
                                    onClick={this.izmena.bind(this)}
                                >
                                    Izmena
                                </button>
                                <ModelCreateForma key={this.state.automobil.id_automobil} automobilId={this.state.automobil.id_automobil}  />
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

