/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";
import Button from '@material-ui/core/Button';
import ComicsByCategory from "./ComicsByCategory/ComicsByCategory";
import { Dropdown } from 'semantic-ui-react'

const categories = [
    { key: 'marvel', text: 'Marvel Comics', value: 'Marvel' },
    { key: 'dc', text: 'DC Comics', value: 'DC' },
    { key: 'archie', text: 'Archie Comics', value: 'Archie' },

];

class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component: "Discover",
            category: "Marvel"
        }
        sessionStorage.setItem("active", "Discover");
        sessionStorage.setItem("profile_tabs", "info");
    }

    componentWillMount(){
        if(sessionStorage.getItem("cat") !== null){
            this.setState({
                category: sessionStorage.getItem("cat")
            })
        }
    }

    signOut = (s) =>{
        s.preventDefault();
        localStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("profile_tabs");
        window.location.reload()
    };

    changeCategory = (event, {value}) => {
        this.setState({
            category: value
        })
        console.log(value)
        sessionStorage.setItem("cat", value)
        window.location.reload()
    };

    render() {
        return (
            <div className="col-lg-9 p-2">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Discover</em>
                        <Button
                            className="h4 m-4 float-right"
                            onClick={this.signOut.bind(this)}
                            variant="outlined"
                            size="small"
                            color="inherit"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
                <hr className="bg-light"/>

                <div className="container m-5">
                    <Dropdown
                        className="mx-auto col-lg-3"
                        fluid
                        selection
                        defaultValue={this.state.category}
                        options={categories}
                        onChange={this.changeCategory.bind(this)}/>

                    <ComicsByCategory comics="Comics" category={this.state.category}/>
                </div>
            </div>
        )
    }

}

export default Discover;