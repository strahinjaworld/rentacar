import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../../konstante";

export default class AutomobilDeleteForma extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobil: this.props.automobil,

        };
    }

    obrisi() {
        Axios.delete(BASE_URL + '/automobili/' + this.state.automobil.id_automobil)
            .then(res => {
                alert(res.data.poruka);

            }).catch(error => {
                alert(error.response.data.poruka);
            })
    }

    ispisiFormu() {

        return (
            <div>

                <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target={"#del" + this.state.automobil.id_automobil}>
                    Obrisite automobil
                </button>

                <div class="modal fade" id={"del" + this.state.automobil.id_automobil} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Jeste li sigurni?
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
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    Ne
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={this.obrisi.bind(this)}
                                >
                                    Da
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
