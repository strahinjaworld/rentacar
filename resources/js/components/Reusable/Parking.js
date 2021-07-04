import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_DOMAIN, BASE_URL } from "../konstante";
import Automobili from "../Stranice/Automobili"

export default class Parking extends Component {
    constructor(props) {
        super(props);

        this.state = {
            parking: this.props.parking || false,
            stranica: this.props.parkingId ? true : false
        };
    }

    getParking() {
        if (this.state.stranica)
            Axios.get(BASE_URL + '/parking/' + this.props.parkingId).then(res => {
                this.setState({ parking: res.data.parking });
            });
    }

    prikazParkinga() {
        console.log(this.props.parkingId)
        if (this.state.stranica)
            return (
                <Automobili key={this.props.parkingId} parkingId={this.props.parkingId}/>
            )
        return (
            <tr>
                <td>{this.state.parking.adresa}</td>
                <td>{this.state.parking.naziv}</td>
                <td><a name="" id="" class="btn btn-primary" href={`${BASE_DOMAIN}/parkinzi/${this.state.parking.id_parking}`} role="button">Pogledaj</a></td>
            </tr>
        )
    }
    render() {
        return this.prikazParkinga();
    }
}

if (document.getElementById("parking")) {
    const parking = document.getElementById("parking")
    ReactDOM.render(
        <Parking parkingId={parking.dataset.parkingid} />,
        document.getElementById("parking")
    );
}
