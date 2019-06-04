/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";

import Button from '@material-ui/core/Button';
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

            // need a count service for ContinueReading
            showContinueReadingFlag: false,

            // need a count service for SavedComics
            showSavedFlag: false

        }
    }

    signOut = (s) =>{
        s.preventDefault()
        localStorage.removeItem(ACCESS_TOKEN)
        sessionStorage.removeItem("currentUser_id");
        window.location.reload()
    }

    render() {

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
                <hr className="bg-light"></hr>
                

                <div className="container mt-5">

                    {
                        this.state.showContinueReadingFlag &&

                        <div className="card m-4">
                            <div className="h5 card-title m-4 font-weight-light">
                                <i className="fa fa-paper-plane text-warning" />  Continue reading
                            </div>
                            <div className="card-body">

                                <Carousel>
                                    <Carousel.Item>
                                        {/* 
                                            need an image from the database
                                        */}
                                    </Carousel.Item>
                                    
                                </Carousel>
                            
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

                            </div>
                        </div>
                    }

                
                    <div className="card m-4">
                        <div className="h5 card-title m-4 font-weight-light">
                            <i className="fa fa-compass text-success"/>  What's new?
                        </div>
                        <div className="card-body">

                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

}

export default Dashboard;