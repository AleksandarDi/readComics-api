/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Profile.scss';
import UserInfo from "./UserInfo/UserInfo";
import UserComics from "./UserComics/UserComics";

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

    render() {
        return (
            <div className="col-lg-9 p-2">
                <em className="h4 m-4">Profile</em>
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