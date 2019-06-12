/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
    ACCESS_TOKEN,
    getComics,
    getCurrentUser,
    getUserSaved,
    getUserStillReading
} from "../../../repository/readComicsApi";
import { Icon, Button } from 'semantic-ui-react';
import LoadingOverlay from "react-loading-overlay";
import PacmanLoader from 'react-spinners/PacmanLoader';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {

            component: "Dashboard",
            comics: null,
            reading: null,
            saved: null,
            showContinueReadingFlag: false,
            showSavedFlag: false,
            isActive: true
        };

        sessionStorage.setItem("active", "Dashboard");
        sessionStorage.setItem("profile_tabs", "info");
    }

    componentWillMount() {

        if (sessionStorage.getItem("cat") !== null)
            sessionStorage.removeItem("cat");

        if (sessionStorage.getItem("currentUser_id") === null) {
            getCurrentUser()
                .then((data) => {
                    getUserStillReading(data.id).then((read) =>{
                        if(read.length > 0) {
                            this.setState({
                                reading: read.slice(0, 3).map((reading, i) => (
                                    <li className="list-inline-item" key={i}>
                                        <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                                            <img
                                                className="figure-img img-thumbnail rounded shadow"
                                                style={{height: "300px", width: "auto"}}
                                                src={process.env.PUBLIC_URL + reading.img}
                                                alt={reading.name}/>
                                            <figcaption className="figure-caption font-weight-bold text-center">{reading.name}</figcaption>
                                        </figure>
                                    </li>
                                )),
                                showContinueReadingFlag: true,
                                isActiveR: false
                            })
                        }
                        else{
                            this.setState({
                                reading: "empty",
                                isActiveR: false
                            })
                        }
                    });

                    getUserSaved(data.id).then((save) =>{
                        if(save.length > 0) {
                            this.setState({
                                saved: save.slice(0, 3).map((saved, i) => (
                                    <li className="list-inline-item" key={i}>
                                        <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                                            <img
                                                className="figure-img img-thumbnail rounded shadow"
                                                style={{height: "300px", width: "auto"}}
                                                src={process.env.PUBLIC_URL + saved.img}
                                                alt={saved.name}/>
                                            <figcaption className="figure-caption font-weight-bold text-center">{saved.name}</figcaption>
                                        </figure>
                                    </li>
                                )),
                                showSavedFlag: true,
                                isActiveS: false
                            })
                        }
                        else{
                            this.setState({
                                saved: "empty",
                                isActiveS: false
                            })
                        }
                    });
                });
        }
        else{
            getUserStillReading(sessionStorage.getItem("currentUser_id")).then((read) =>{
                if(read.length > 0) {
                    this.setState({
                        reading: read.slice(0, 3).map((reading, i) => (
                            <li className="list-inline-item" key={i}>
                                <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                                    <img
                                        className="figure-img img-thumbnail rounded shadow"
                                        style={{height: "300px", width: "auto"}}
                                        src={process.env.PUBLIC_URL + reading.img}
                                        alt={reading.name}/>
                                    <figcaption className="figure-caption font-weight-bold text-center">{reading.name}</figcaption>
                                </figure>
                            </li>
                        )),
                        showContinueReadingFlag: true,
                        isActiveR: false
                    })
                }
                else{
                    this.setState({
                        reading: "empty",
                        isActiveR: false
                    })
                }
            });

            getUserSaved(sessionStorage.getItem("currentUser_id")).then((save) =>{
                if(save.length > 0) {
                    this.setState({
                        saved: save.slice(0, 3).map((saved, i) => (
                            <li className="list-inline-item" key={i}>
                                <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                                    <img
                                        className="figure-img img-thumbnail rounded shadow"
                                        style={{height: "300px", width: "auto"}}
                                        src={process.env.PUBLIC_URL + saved.img}
                                        alt={saved.name}/>
                                    <figcaption className="figure-caption font-weight-bold text-center">{saved.name}</figcaption>
                                </figure>
                            </li>
                        )),
                        showSavedFlag: true,
                        isActiveS: false
                    })
                }
                else{
                    this.setState({
                        saved: "empty",
                        isActiveS: false
                    })
                }
            });
        }

        getComics().then((data) =>{
            this.setState({
                comics: data.slice(0, 3).map((comic, i) => (
                    <li className="list-inline-item" key={i}>
                        <figure className="mt-3 mb-3 ml-4 mr-4 figure" key={i}>
                            <img
                                className="figure-img img-thumbnail rounded shadow"
                                style={{height: "300px", width: "auto"}}
                                src={process.env.PUBLIC_URL + comic.img}
                                alt={comic.name}/>
                            <figcaption className="figure-caption font-weight-bold text-center">{comic.name}</figcaption>
                        </figure>
                    </li>)),
                isActive: false
            })
        });

    }


    showStillReading = (e) =>{
        e.preventDefault();

        sessionStorage.setItem("profile_tabs", "comics");
        sessionStorage.setItem("activeItem", "0");

        this.props.profile()
    };

    showProfile = (e) =>{
        e.preventDefault();

        sessionStorage.setItem("profile_tabs", "comics");
        sessionStorage.setItem("activeItem", "1");

        this.props.profile()
    };

    showDiscover = (e) =>{
        e.preventDefault();

        this.props.discover();
    };

    signOut = (s) =>{
        s.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("profile_tabs");
        window.location.reload()
    };

    render() {

        return (
            <div className="col-lg-9 p-2">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Dashboard</em>
                        <Button
                            onClick={this.signOut.bind(this)}
                            className="h4 m-4 float-right bg-light"
                            icon>
                            <Icon
                                link
                                color="teal"
                                size="large"
                                name="power off"/>
                        </Button>
                    </div>
                </div>
                <hr className="bg-light"/>
                

                <div className="container mt-5">

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


                        {!this.state.isActive &&
                        <div className="card m-4">
                            <div className="h5 card-title m-4 font-weight-light">
                                <i className="fa fa-compass text-success"/> What's new?
                            </div>
                            <div className="card-body">
                                <ul className="list-inline text-center col-lg-12">
                                    {this.state.comics}
                                </ul>
                            </div>
                            <div className="card-footer col-lg-10 mx-auto bg-white">
                                <div className="text-center">
                                    <Button
                                        onClick={this.showDiscover.bind(this)}
                                        className="bg-white"
                                        icon>
                                        <Icon
                                            link
                                            color="green"
                                            size="big"
                                            name="chevron circle down"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        }

                        {
                            this.state.showContinueReadingFlag &&

                            <div className="card m-4">
                                <div className="h5 card-title m-4 font-weight-light">
                                    <i className="fa fa-paper-plane text-warning" />  Continue reading
                                </div>
                                <div className="card-body">
                                    <ul className="list-inline text-center col-lg-12">
                                        {this.state.reading}
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-10 mx-auto bg-white">
                                    <div className="text-center">
                                        <Button
                                            onClick={this.showStillReading.bind(this)}
                                            className="bg-white"
                                            icon>
                                            <Icon
                                                link
                                                color="yellow"
                                                size="big"
                                                name="chevron circle down"/>
                                        </Button>
                                    </div>
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
                                        {this.state.saved}
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-10 mx-auto bg-white">
                                    <div className="text-center">
                                        <Button
                                            onClick={this.showProfile.bind(this)}
                                            className="bg-white"
                                            icon>
                                            <Icon
                                                link
                                                color="red"
                                                size="big"
                                                name="chevron circle down"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }

                    </LoadingOverlay>


                </div>
            </div>
        )
    }

}

export default Dashboard;