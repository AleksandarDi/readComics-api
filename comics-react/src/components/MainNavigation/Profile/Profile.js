/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Profile.scss';
import UserInfo from "./UserInfo/UserInfo";
import UserComics from "./UserComics/UserComics";
import Button from '@material-ui/core/Button';
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: "Dashboard",
            showPersonalInfoFlag: true,
            showComicsFlag: false,
        }
    }

    componentDidMount(){

        sessionStorage.setItem("successMsg", "false");
        sessionStorage.setItem("errorMsg", "false");

    }

    showPersonalInfo = () =>{
        this.setState({
            showPersonalInfoFlag: true,
            showComicsFlag: false
        })
    }

    showComics = () =>{
        this.setState({
            showPersonalInfoFlag: false,
            showComicsFlag: true
        })
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
                        <em className="h4 m-4 float-left">Profile</em>
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


                {
                    this.state.showPersonalInfoFlag &&

                    <div>
                        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                            <ul className="navbar-nav profile-ul">
                                <li className="nav-item mr-5 profile-li">
                                    <a className="nav-link profile-a active-profile-item" onClick={this.showPersonalInfo} href="#">Personal
                                        information</a>
                                </li>
                                <li className="nav-item ml-5 profile-li">
                                    <a className="nav-link profile-a" onClick={this.showComics} href="#">Comics</a>
                                </li>
                            </ul>
                        </nav>

                        <UserInfo userInfo="info" />
                    </div>

                }

                {
                    this.state.showComicsFlag &&

                    <div>
                        <nav className="navbar navbar-expand-sm bg-light justify-content-center">
                            <ul className="navbar-nav profile-ul">
                                <li className="nav-item mr-5 profile-li">
                                    <a className="nav-link profile-a" onClick={this.showPersonalInfo}  href="#">
                                        Personal information
                                    </a>
                                </li>
                                <li className="nav-item ml-5 profile-li">
                                    <a className="nav-link profile-a active-profile-item" onClick={this.showComics} href="#">
                                        Comics
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <UserComics userComics={"comics"} />

                    </div>
                }

            </div>
        )
    }

}

export default Profile;