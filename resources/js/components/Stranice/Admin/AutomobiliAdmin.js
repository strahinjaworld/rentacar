import Axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BASE_URL } from "../../konstante";
import AutomobilAdmin from "../../Reusable/admin/AutomobilAdmin"
export default class AutomobiliAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            automobili: [],

        };
        this.getAutomobili();
    }


    getAutomobili(url = null) {
            Axios.get(url || (BASE_URL + '/automobili/')).then(res => {
                this.setState({
                    automobili: res.data.automobili.data,
                    prevUrl: res.data.automobili.prev_page_url,
                    nextUrl: res.data.automobili.next_page_url
                });
            });
    }

    strelicePaginacija() {
        return (
            <div className='d-flex justify-content-center'>
                <button type="button" disabled={this.state.prevUrl ? false : true} onClick={() => this.getAutomobili(this.state.prevUrl)} class="btn btn-primary btn-lg">{'<'}</button>,
                <button type="button" disabled={this.state.nextUrl ? false : true} onClick={() => this.getAutomobili(this.state.nextUrl)} class="btn btn-primary btn-lg">{'>'}</button>
            </div>
        )
    }



    render() {
        return (
            <React.Fragment key={'admin-react-fragment'}>
                <div className='row'>
                    {this.state.automobili.map(a => {
                        return <AutomobilAdmin key={a.id_automobil + 'admin-automobil' + a.id_model} automobil={a} />;
                    })}
                </div>
                {this.strelicePaginacija()}
            </React.Fragment>
        );
    }
}

if (document.getElementById("automobili-admin")) {

    ReactDOM.render(
        <AutomobiliAdmin />,
        document.getElementById("automobili-admin")
    );
}
