import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../../konstante";

export default class ModelCreateForma extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleImageChange(e) {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let form_data = new FormData();
        form_data.append('slika', this.state.image, this.state.image.name);
        form_data.append('model', this.state.model);
        form_data.append('marka', this.state.marka);

        let url = BASE_URL + '/modeli';
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                alert(res.data.poruka)
            })
    };


    ispisiFormu() {

        return (
            <div>

                <button type="button" class="btn btn-success" data-toggle="modal" data-target={"#modelCreate" + this.props.automobilId}>
                    Kreiraj novi model
                </button>

                <div class="modal fade" id={"modelCreate" + this.props.automobilId} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5
                                    class="modal-title"
                                    id="exampleModalLongTitle"
                                >
                                    Novi model
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
                                    <label for="marka">Marka</label>
                                    <input
                                        name="marka"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                        required
                                    ></input>
                                    <label for="marka">Model</label>
                                    <input
                                        name="model"
                                        onChange={this.handleChange.bind(this)}
                                        className="form-control"
                                        type="text"
                                        required
                                    ></input>

                                    <input type="file"
                                        id="image"
                                        accept="image/png, image/jpeg" onChange={this.handleImageChange.bind(this)} required>
                                    </input>
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
                                    onClick={this.handleSubmit.bind(this)}
                                >
                                    Napravi
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
