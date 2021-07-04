import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../konstante";
import Automobil from "../Reusable/Automobil"
export default class Automobili extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prevUrl: null,
            nextUrl: null,
            automobili: [],
            parkingId: this.props.parkingId || null
        };
        this.getAutomobili();
    }

    getAutomobili(url = null) {
        if(this.state.parkingId)
        Axios.get(url || (BASE_URL + '/automobili?parkingId=' + this.state.parkingId)).then(res => {
            this.setState({
                automobili: res.data.automobili.data,
                prevUrl: res.data.automobili.prev_page_url,
                nextUrl: res.data.automobili.next_page_url
            });
        });

    }

    strelicePaginacija() {
        return [
            <div className='d-flex justify-content-center'>
                <button type="button" disabled={this.state.prevUrl ? false : true} onClick={() => this.getAutomobili(this.state.prevUrl)} class="btn btn-primary btn-lg">{'<'}</button>,
                <button type="button" disabled={this.state.nextUrl ? false : true} onClick={() => this.getAutomobili(this.state.nextUrl)} class="btn btn-primary btn-lg">{'>'}</button>
            </div>
        ]
    }



    render() {
        return (
            <React.Fragment>
                <div className='row'>
                    {this.state.automobili.map(a => {
                        return <Automobil key={a.id_automobil} automobil={a} />;
                    })}
                </div>
                {this.strelicePaginacija()}
            </React.Fragment>
        );
    }
}

if (document.getElementById("automobili")) {

    ReactDOM.render(
        <Automobili />,
        document.getElementById("automobili")
    );
}
