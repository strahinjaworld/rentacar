import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../konstante";
import Parking from "../Reusable/Parking"
export default class Parkinzi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parkinzi: [],

        };

        this.getParkinzi();
    }

    getParkinzi() {
        Axios.get(BASE_URL + '/parkinzi').then(res => {
            this.setState({ parkinzi: res.data.parkinzi });
        });
    }

    render() {
        return (
            <table className="table table-hover table-info table-striped header-fixed">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Adresa</th>
                        <th scope="col">Naziv</th>
                        <th scope="col">Pogledaj automobile</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.parkinzi.map(p => {
                        return <Parking key={p.id_parking} parking={p} />;
                    })}
                </tbody>
            </table>
        );
    }
}

if (document.getElementById("parkinzi")) {

    ReactDOM.render(
        <Parkinzi />,
        document.getElementById("parkinzi")
    );
}
