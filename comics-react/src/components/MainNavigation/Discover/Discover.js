/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Categories from './Categories/Categories';
import ComicsByCategory from './ComicsByCategory/ComicsByCategory';
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";

import Button from '@material-ui/core/Button';
class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {

            component: "Discover",
            showCategoriesFlag: true,
            showComicsByCategoryFlag: false

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
                <hr className="bg-light"></hr>

                {
                    this.state.showCategoriesFlag && 
                        <Categories categories="Categories"/>
                }

                {
                    this.state.showComicsByCategoryFlag && 
                        <ComicsByCategory comics="Comics"/>
                }

            </div>
        )
    }

}

export default Discover;