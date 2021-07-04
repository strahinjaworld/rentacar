import React, { Component } from "react";
import ReactDOM from "react-dom";
import Rezervacija from "./Rezervacija";

export default class RezervacijaTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rezervacije: this.props.rezervacije,
        };
    }

    render() {
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th>Datum od</th>
                        <th>Datum do</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.rezervacije.map(rez => {
                        return <Rezervacija key={rez.id_rezervacija} rezervacija={rez} />
                    })}
                </tbody>
            </table>
        )
    }
}

