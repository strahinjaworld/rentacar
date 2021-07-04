import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Rezervacija extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rezervacija: this.props.rezervacija,
        };
    }

    render() {
        return (
            <tr>
                <td>{this.state.rezervacija.datum_od}</td>
                <td>{this.state.rezervacija.datum_do}</td>
            </tr>
        )
    }
}

