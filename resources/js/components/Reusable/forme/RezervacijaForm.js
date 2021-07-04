import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../../konstante";

export default class RezervacijaForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: this.props.automobil,
            datum_od: null,
            datum_od: null
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    rezervisi() {
        if (this.validateFormInput())
            Axios.post(BASE_URL + '/rezervacije', {
                datum_od: this.state.datum_od,
                datum_do: this.state.datum_do,
                id_automobil: this.props.automobil.id_automobil
            }).then(res => {
                alert(res.data.poruka);
            }).catch(error => {
                alert(error.response.data.poruka);

            });
    }

    validateFormInput() {
        if (!this.state.datum_od || !this.state.datum_do) {
            alert('Morate postaviti i datum od i datum do.');
            return false;
        }
        return true;
    }

    ispisiFormu() {

        return (
            <div>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Iznajmi automobil
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Iznajmljivanje
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
                                    <label for="datum_od">Datum od</label>
                                    <input
                                        name="datum_od"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="date"
                                        max={this.state.datum_do}
                                    ></input>
                                    <label for="datum_od">Datum do</label>
                                    <input
                                        name="datum_do"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        min={this.state.datum_od}
                                        type="date"
                                    ></input>
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
                                    onClick={this.rezervisi.bind(this)}
                                >
                                    Iznajmi
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );

    }

    render() {
        return this.ispisiFormu();
    }
}

if (document.getElementById("rezervacija")) {
    ReactDOM.render(<RezervacijaForm />, document.getElementById("rezervacija"));
}
