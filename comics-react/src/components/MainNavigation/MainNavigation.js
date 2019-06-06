/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './MainNavigation.css';
import Profile from './Profile/Profile';
import Discover from './Discover/Discover';
import Dashboard from './Dashboard/Dashboard';
import {ACCESS_TOKEN, getCurrentUser} from '../../repository/readComicsApi';

class MainNavigation extends Component {

    constructor(props, nextState){
        super(props, nextState);
        this.state = {
            component: "Dashboard",
            showDashboardFlag: true,
            showProfileFlag: false,
            showDiscoverFlag: false
        }
    }

    componentWillMount(){
        if(localStorage.getItem(ACCESS_TOKEN) == null){
            this.props.history.push('/login');
        }
        else {
            getCurrentUser()
                .then((data) => {
                    sessionStorage.setItem("currentUser_id", data.id);
                });
            if(sessionStorage.getItem("active") !== null){
                if(sessionStorage.getItem("active") === "Dashboard"){
                    this.showDashboard()
                }
                else if(sessionStorage.getItem("active") === "Profile"){
                    this.showProfile()
                }
                else if(sessionStorage.getItem("active") === "Discover"){
                    this.showDiscover()
                }
            }
        }

    }


    showDashboard= () => {
        this.setState({
            component: "Dashboard",
            showDashboardFlag: true,
            showProfileFlag: false,
            showDiscoverFlag: false,
        })
    }
    
    showProfile = () => {
        this.setState({
            component: "Profile",
            showDashboardFlag: false,
            showProfileFlag: true,
            showDiscoverFlag: false,
        })
    }

    showDiscover = () => {
        this.setState({
            component: "Discover",
            showDashboardFlag: false,
            showProfileFlag: false,
            showDiscoverFlag: true,
        })
    }

    render() {

        return (

            <div>
                <div className="wrapper">

                    <nav id="sidebar" className="text-light p-2">
                        <div className="sidebar-header text-center">
                            <h3 className="m-4">ReadComics</h3>
                            <hr className="bg-light"/>
                        </div>

                        <ul className="list-unstyled components mt-5">
                            <li>
                                {this.state.showDashboardFlag && <a href="#" className="nav-link mainNav-link text-light active-item m-2"
                                    onClick={this.showDashboard}>
                                        <i className="fa fa-codiepie"/> Dashboard</a>}
                                {!this.state.showDashboardFlag && <a href="#" className="nav-link mainNav-link text-light m-2"
                                    onClick={this.showDashboard}>
                                        <i className="fa fa-codiepie"/> Dashboard</a>}
                            </li>
                            <li>
                                {this.state.showProfileFlag &&
                                    <a href="#" className="nav-link mainNav-link text-light active-item m-2" onClick={this.showProfile}>
                                        <i className="fa fa-user-circle"/> Profile</a>}
                                {!this.state.showProfileFlag &&
                                    <a href="#" className="nav-link mainNav-link text-light m-2" onClick={this.showProfile}>
                                        <i className="fa fa-user-circle"/> Profile</a>}
                            </li>
                            <li>
                                {this.state.showDiscoverFlag &&
                                    <a href="#" className="nav-link mainNav-link text-light active-item m-2" onClick={this.showDiscover}>
                                        <i className="fa fa-compass"/> Discover</a>}
                                {!this.state.showDiscoverFlag &&
                                    <a href="#" className="nav-link mainNav-link text-light m-2" onClick={this.showDiscover}>
                                        <i className="fa fa-compass"/> Discover</a>}
                            </li>
                        </ul>

                    </nav>
                </div>

                <div className="col-lg-12 home-content bg-light">                    
                    {this.state.showDashboardFlag && <Dashboard dashboard = "Dashboard"/>}
                    {this.state.showProfileFlag && <Profile profile="Profile"/>}
                    {this.state.showDiscoverFlag && <Discover discover="Discover"/>}
                </div>
                
            </div>

        );
    }
}

export default MainNavigation;
