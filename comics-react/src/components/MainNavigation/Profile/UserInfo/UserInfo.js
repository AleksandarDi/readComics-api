/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {getCurrentUser, updateUserInfo} from "../../../../repository/readComicsApi";
import TextField from '@material-ui/core/TextField';
import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';
import isEmail from 'validator/lib/isEmail';


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
            showErrorMsg: false,
            isActive: true
        }

    }

    componentWillMount(){

        if(sessionStorage.getItem("activeItem") !== null){
            sessionStorage.removeItem("activeItem")
        }

        getCurrentUser()
            .then((data) => {
                this.setState({
                    fullname: data.name,
                    username: data.username,
                    email: data.email,
                    showSuccessMsg: false,
                    showErrorMsg: false,
                    isActive: false
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
    };

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
        };

        if (this.state.pwd !== this.state.rpwd) {
            this.setState({
                showSuccessMsg: false,
                showErrorMsg: true,
                errorMsg: "Passwords do not match"
            });
        }
        else if (!isEmail(this.state.email)) {
            this.setState({
                showSuccessMsg: false,
                showErrorMsg: true,
                errorMsg: "Invalid email format"
            });
        }
        else {
            this.setState({
                showSuccessMsg: true,
                showErrorMsg: false
            });
            updateUserInfo(user).then( () => {
                if(this.state.pwd.length > 0){
                    this.props.signOut()
                }
            });
        }
    };


    render() {

        return (
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
                        <form className={"mr-5 ml-5 mb-5"}>

                            {
                                this.state.showSuccessMsg &&
                                <div className="alert alert-success alert-dismissible">
                                    <button type="button" className="close"
                                            onClick={() => this.closeSuccessAlert()}>&times;</button>
                                    <strong>{this.state.successMsg}</strong>
                                </div>
                            }
                            {
                                this.state.showErrorMsg &&
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close"
                                            onClick={() => this.closeErrorAlert()}>&times;</button>
                                    <strong>{this.state.errorMsg}</strong>
                                </div>
                            }

                            <div className={"row mt-3 ml-5 mr-5 justify-content-center"}>
                                <div className={"col-lg-4 m-4"}>
                                    <div className="form-group col-lg-12 float-left-lg">
                                        <TextField
                                            id="fullname"
                                            label="Full Name"
                                            className={"border-info"}
                                            value={this.state.fullname}
                                            margin="dense"
                                            variant="outlined"
                                            onChange={n => this.changeFullName(n)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-12 float-left-lg">
                                        <TextField
                                            id="username"
                                            label="Username"
                                            value={this.state.username}
                                            margin="dense"
                                            variant="outlined"
                                            className="border-info"
                                            onChange={n => this.changeUsername(n)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-12 float-left-lg">
                                        <TextField
                                            id="email"
                                            label="E-mail address:"
                                            value={this.state.email}
                                            margin="dense"
                                            variant="outlined"
                                            onChange={n => this.changeEmail(n)}
                                        />
                                    </div>
                                </div>

                                <div className={"col-lg-4 m-4"}>
                                    <div className="form-group col-lg-12 float-lg-right">
                                        <TextField
                                            id="pwd"
                                            label="Password"
                                            placeholder="Enter new password"
                                            margin="dense"
                                            variant="outlined"
                                            type="password"
                                            onChange={n => this.changePassword(n)}
                                        />
                                    </div>

                                    <div className="form-group col-lg-12 float-lg-right">
                                        <TextField
                                            id="rpwd"
                                            label="Confirm password"
                                            placeholder="Re-enter new password"
                                            margin="dense"
                                            type="password"
                                            variant="outlined"
                                            onChange={n => this.changeRePassword(n)}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-info m-2"
                                        onClick={n => this.updateUserInfo(n)}>
                                    Save
                                </button>
                            </div>
                        </form>
                        }
                </div>
            </LoadingOverlay>

        )
    }

}

export default UserInfo;