/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {getCurrentUser, updateUserInfo} from "../../../../repository/readComicsApi";


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: "Dashboard",
            email: "",
            username: "",
            fullname: "",
            pwd: "",
            rpwd: "",
            errorMsg: "Passwords do not match",
            successMsg: "User successfully updated",
            showSuccessMsg: false,
            showErrorMsg: false
        }
    }

    componentDidMount(){

        getCurrentUser()
            .then((data) => {
                this.setState({
                    fullname: data.name,
                    username: data.username,
                    email: data.email,
                    showSuccessMsg: false,
                    showErrorMsg: false
                })
            });
    }

    closeSuccessAlert() {
        this.setState({ showSuccessMsg: false });
    }

    closeErrorAlert() {
        this.setState({ showErrorMsg: false });
    }

    changeFullName = (n) => {
        this.setState({ fullname: n.target.value });
    }

    changeUsername(c) {
        this.setState({ username: c.target.value });
    }

    changeEmail(c) {
        this.setState({ email: c.target.value });
    }

    changePassword(c) {
        this.setState({ pwd: c.target.value });
    }

    changeRePassword(c) {
        this.setState({ rpwd: c.target.value });
    }

    updateUserInfo = (s) => {

        s.preventDefault();

        let user = {
            id: sessionStorage.getItem("currentUser_id"),
            email: this.state.email,
            username: this.state.username,
            fullname: this.state.fullname,
            pwd: this.state.pwd
        }
        
        if(this.state.pwd === this.state.rpwd) {
            this.setState({
                showSuccessMsg: true,
                showErrorMsg: false
            });
            updateUserInfo(user);
        }
        else{
            this.setState({
                showSuccessMsg: false,
                showErrorMsg: true
            });
        }



    }


    render() {
        return (
            <div className="col-lg-12 p-2 mx-auto">
                <form className={"mr-5 ml-5 mb-5"}>

                    {
                        this.state.showSuccessMsg &&
                        <div className="alert alert-success alert-dismissible">
                            <button type="button" className="close" onClick={() => this.closeSuccessAlert()}>&times;</button>
                            <strong>{this.state.successMsg}</strong>
                        </div>
                    }
                    {
                        this.state.showErrorMsg &&
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" onClick={() => this.closeErrorAlert()}>&times;</button>
                            <strong>{this.state.errorMsg}</strong>
                        </div>
                    }
                    <div className={"row mt-3 ml-5 mr-5 justify-content-center"}>
                        <div className={"col-lg-4 m-4"}>
                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="fullname">Full name:</label>
                                <input type="text" className="form-control" id="fullname" name={"fullname"}
                                       placeholder={this.state.fullname}
                                       onChange={n => this.changeFullName(n)} required/>
                            </div>

                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control" id="username" name={"username"}
                                       placeholder={this.state.username}
                                       onChange={n => this.changeUsername(n)} required/>
                            </div>

                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" id="email" name={"email"}
                                       placeholder={this.state.email}
                                       onChange={n => this.changeEmail(n)} required/>
                            </div>
                        </div>

                        <div className={"col-lg-4 m-4"}>
                            <div className="form-group col-lg-12 float-lg-right">
                                <label htmlFor="pwd">Password:</label>
                                <input type="password" placeholder={"Enter new password"} className="form-control" id="pwd" name={"pwd"}
                                       onChange={n => this.changePassword(n)} required/>
                            </div>

                            <div className="form-group col-lg-12 float-lg-right">
                                <label htmlFor="rpwd">Confirm password:</label>
                                <input type="password" placeholder={"Re-enter new password"} className="form-control" id="rpwd" name={"rpwd"}
                                       onChange={n => this.changeRePassword(n)} required/>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-info m-2" onClick={n => this.updateUserInfo(n)}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserInfo;