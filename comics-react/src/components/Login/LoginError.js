/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Login.css';
import logo from '../../repository/images/logo.png';
import Modal from 'react-modal';
import {ACCESS_TOKEN, createUser, doesUserExist, login} from '../../repository/readComicsApi';
import TextField from '@material-ui/core/TextField';
import isEmail from 'validator/lib/isEmail';

const customStyles = {
    content: {
        height: '95%',
        width: '70%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class LoginError extends Component {

    constructor(props, nextState){
        super(props, nextState)
        this.state = {
            loginUsername: "",
            loginPwd: "",
            email: "",
            errorMessage: "",
            username: "",
            fullname: "",
            pwd: "",
            repwd: "",
            showErrorMsg: false,
            modalIsOpen: false,
            doesUserExistMsg: ""
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount(){
        if(localStorage.getItem(ACCESS_TOKEN) != null){
            console.log('token', localStorage.getItem(ACCESS_TOKEN));
            this.props.history.push('/home');
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            errorMessage: "",
            showErrorMsg: false
        });
    }

    handleLogin = (loginFlag) => {
        this.setState({
            showDashboard: loginFlag
        })
    }

    changeLoginUsername(c) {
        this.setState({ loginUsername: c.target.value });
    }

    changeLoginPwd(c) {
        this.setState({ loginPwd: c.target.value });
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
        this.setState({ repwd: c.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let loginToken = {
            username: this.state.loginUsername,
            password: this.state.loginPwd
        }

        login(loginToken)
            .then(response => {
                console.log('token', response.accessToken);
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.history.push('/home');
            }).catch(() => {
            this.props.history.push('/login/error');
        });
    }

    signUpUser = (s) => {

        s.preventDefault();

        let user = {
            email: this.state.email,
            username: this.state.username,
            fullname: this.state.fullname,
            pwd: this.state.pwd
        }

        //this.checkIfUserExists();

        let checkUniqueUser = {
            email: this.state.email,
            username: this.state.username
        }

        doesUserExist(checkUniqueUser).then(response => response.text())
            .then((data) => {
                console.log('data: ', data)
                this.setState({
                    errorMessage: data
                }, () => {
                    console.log(this.state.errorMessage)

                    if(user.email === "" || user.username === "" ||
                        user.fullname === "" || user.pwd === "" || this.state.repwd === ""){

                        this.setState({
                            errorMessage: "Missing information. Please fill out all of the fields.",
                            showErrorMsg: true
                        });
                    }
                    else if(this.state.pwd !== this.state.repwd){
                        this.setState({
                            errorMessage: "Passwords don't match.",
                            showErrorMsg: true
                        });
                    }
                    else if(!isEmail(this.state.email)){
                        this.setState({
                            errorMessage: "Invalid email format.",
                            showErrorMsg: true
                        });
                    }
                    else if(this.state.errorMessage !== "Valid"){
                        this.setState({
                            showErrorMsg: true
                        });
                    }
                    else{
                        createUser(user);
                        this.closeModal();
                        sessionStorage.setItem('showSuccessMsg', "true");
                        window.location.replace('http://localhost:3000/login')
                    }

                });

            });

    }


    render() {
        return (
            <div className="row">
                <div className="w-100 mb-5">
                    <header className={"header-error"}>
                        <div className="container">

                            <nav className="navbar navbar-expand-lg navbar-dark mb-2 pb-2 font-weight-bold text-light bg-transparent">
                                <span className="navbar-brand w-25 h-25">
                                    <img src={logo} alt='' width={110} height={80}/>
                                </span>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="ml-auto nav flex-column">

                                        <li className="nav-item d-inline signup-desc">

                                            <Modal
                                                isOpen={this.state.modalIsOpen}
                                                onAfterOpen={this.afterOpenModal}
                                                onRequestClose={this.closeModal}
                                                style={customStyles}
                                                contentLabel="Sign up">


                                                <div className="modal-header d-block">
                                                    <button type="button" className="close float-right" onClick={this.closeModal}>&times;</button>
                                                    <em className="text-center h3">Sign Up</em>
                                                </div>
                                                <div className="modal-body">
                                                    <form className="col-lg-12">

                                                        {
                                                            this.state.showErrorMsg &&
                                                            <div className="alert alert-danger" role="alert">
                                                                {this.state.errorMessage}
                                                            </div>
                                                        }
                                                        <div className={"row mt-3 ml-5 mr-5 justify-content-center"}>
                                                            <div className={"col-lg-5 m-4"}>
                                                                <div className="form-group col-lg-12 mx-auto">
                                                                    <TextField
                                                                        id="email"
                                                                        label="Email address"
                                                                        className={"border-info"}
                                                                        value={this.state.email}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        type="email"
                                                                        onChange={n => this.changeEmail(n)}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-lg-12 mx-auto">
                                                                    <TextField
                                                                        id="fullname"
                                                                        label="Full name"
                                                                        className={"border-info"}
                                                                        value={this.state.fullname}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        onChange={n => this.changeFullName(n)}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-lg-12 mx-auto">
                                                                    <TextField
                                                                        id="username"
                                                                        label="Username"
                                                                        className={"border-info"}
                                                                        value={this.state.username}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        onChange={n => this.changeUsername(n)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className={"col-lg-5 m-4"}>
                                                                <div className="form-group col-lg-12 mx-auto">
                                                                    <TextField
                                                                        id="pwd"
                                                                        label="Password"
                                                                        className={"border-info"}
                                                                        margin="dense"
                                                                        type="password"
                                                                        variant="outlined"
                                                                        onChange={n => this.changePassword(n)}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-lg-12 mx-auto">
                                                                    <TextField
                                                                        id="repwd"
                                                                        label="Confirm password"
                                                                        className={"border-info"}
                                                                        margin="dense"
                                                                        type="password"
                                                                        variant="outlined"
                                                                        onChange={n => this.changeRePassword(n)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="text-center">
                                                                <button type="submit" className="btn btn-info m-2" onClick={n => this.signUpUser(n)}>Submit</button>
                                                                <button type="button" className="btn btn-danger m-2" onClick={this.closeModal}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                            </Modal>
                                        </li>

                                    </ul>
                                </div>
                            </nav>

                        </div>


                        <div className="d-inline">

                            <svg className="float-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon fill="white" points="0,100 100,0 100,100" />
                            </svg>
                        </div>
                    </header>

                    <section className="col-lg-12 mb-2">
                        <div className="container text-center mt-3">
                            <form className="col-lg-3 mx-auto justify-content-center align-items-center">
                                <div className="alert alert-danger">
                                    <span className="font-weight-lighter small">
                                        Wrong username or password.
                                    </span>
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                           className="form-control mx-auto form-control-sm col-sm-8 bg-transparent border text-dark form-rounded"
                                           onChange={n => this.changeLoginUsername(n)}
                                           placeholder={"Username"}
                                           name={"loginUsername"} />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control mx-auto form-control-sm col-sm-8 border bg-transparent text-dark form-rounded"
                                        onChange={n => this.changeLoginPwd(n)}
                                        placeholder="Password"
                                        name={"loginPwd"} />
                                </div>
                                <button type="submit" onClick={this.handleSubmit} className="btn border-info btn-sm mt-3 mb-5 text-info">Login</button>
                            </form>
                            <span className="d-inline pr-2 mt-5 font-weight-lighter small">Still not a member? What are you waiting for?</span>
                            <button onClick={this.openModal} className="btn border-info font-weight-lighter btn-sm text-info">Sign Up</button>
                        </div>
                    </section>

                </div>



            </div>
        );
    }
}

export default LoginError;
