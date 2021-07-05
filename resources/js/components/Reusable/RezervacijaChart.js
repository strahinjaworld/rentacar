import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Chart } from "react-google-charts";

export default class RezervacijeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rezervacije: this.props.rezervacije,
            podaci: []
        };

    }

    srediPodatke() {
        return [['placeholder', new Date(), new Date(2021, 3, 30)], ...this.props.rezervacije.map(rez => {
            return ['Iznajmljen', new Date(rez.datum_od), new Date(rez.datum_do)]
        })]
    }


    render() {

        return (

            <Chart
                width={'100%'}
                height={100}
                chartType="Timeline"
                loader={<div>Ucitavanje podataka...</div>}
                data={this.srediPodatke()}
                options={{
                    timeline: {
                        groupByRowLabel: true,
                        singleColor: '#fca311'
                    },

                }}
            />
        )
    }
}

