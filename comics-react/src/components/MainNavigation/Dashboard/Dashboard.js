/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {ACCESS_TOKEN, getComics} from "../../../repository/readComicsApi";

import Button from '@material-ui/core/Button';
import LoadingOverlay from "react-loading-overlay";
import PacmanLoader from 'react-spinners/PacmanLoader';
/*
<div className="col-lg-12">

    <div className="col-lg-10 float-left">
        <img
            className="d-block w-25"
            src="https://cdn.pastemagazine.com/www/system/images/photo_albums/bestcomiccoversof2018/large/amazing-spider-man--2-cover-art-by-ryan-ottley.png?1384968217"
            alt="First slide"
        />
    </div>


</div>
*/

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {

            component: "Dashboard",
            comics: null,

            // need a count service for ContinueReading
            showContinueReadingFlag: false,

            // need a count service for SavedComics
            showSavedFlag: false,
            isActive: true
        }
        sessionStorage.setItem("active", "Dashboard");
        sessionStorage.setItem("profile_tabs", "info");
    }

    componentWillMount(){
        getComics().then((data) =>{
            console.log(data);
            this.setState({
                comics: data,
                isActive: false
            })
        })
    }

    signOut = (s) =>{
        s.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("profile_tabs");
        window.location.reload()
    }

    render() {

        if(this.state.comics !== null) {
            var size = 3;
            var comics = this.state.comics.slice(0, size).map((comic, i) => (
                <li className="list-inline-item" key={i}>
                        <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                            <img
                                className="figure-img img-thumbnail rounded shadow"
                                style={{height: "300px", width: "auto"}}
                                src={process.env.PUBLIC_URL + comic.img}
                                alt={comic.name}/>
                            <figcaption className="figure-caption font-weight-bold text-center">{comic.name}</figcaption>
                        </figure>

                </li>
            ))
        }
        return (
            <div className="col-lg-9 p-2">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Dashboard</em>
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
                

                <div className="container mt-5">

                    {
                        this.state.showContinueReadingFlag &&

                        <div className="card m-4">
                            <div className="h5 card-title m-4 font-weight-light">
                                <i className="fa fa-paper-plane text-warning" />  Continue reading
                            </div>
                            <div className="card-body">
                                <ul className="list-inline text-center col-lg-12">

                                </ul>
                            </div>
                        </div>
                    }

                    {
                        this.state.showSavedFlag && 

                        <div className="card m-4">
                            <div className="h5 card-title m-4 font-weight-light">
                                <i className="fa fa-heart text-danger" />  Saved
                            </div>
                            <div className="card-body">
                                <ul className="list-inline text-center col-lg-12">

                                </ul>
                            </div>
                        </div>
                    }

                    <LoadingOverlay
                        active={this.state.isActive}
                        styles={{
                            overlay: {
                                position: 'absolute',
                                left: '50%',
                                margin: '40px 0px 50px 0px',
                                top: this.state.isActive ? '100%' : '',
                                width: '1000px',
                                height: '250px'
                            },
                            wrapper: {
                                backgroundColor: this.state.isActive ? '#f8f9fa' : '',
                                overflow: 'hidden'

                            }
                        }}
                        spinner={<PacmanLoader color={'#288282'} />}
                    >

                        <div className="col-lg-12 p-2 mx-auto">
                            {!this.state.isActive &&
                            <div className="card m-4">
                                <div className="h5 card-title m-4 font-weight-light">
                                    <i className="fa fa-compass text-success"/> What's new?
                                </div>
                                <div className="card-body">
                                    <ul className="list-inline text-center col-lg-12">
                                        {comics}
                                    </ul>
                                </div>
                            </div>
                            }
                        </div>
                    </LoadingOverlay>
                </div>
            </div>
        )
    }

}

export default Dashboard;