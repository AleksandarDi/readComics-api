/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Login.css';
import heroes from '../../repository/images/heroes.png';
import logo from '../../repository/images/logo.png';
import Modal from 'react-modal';
import {ACCESS_TOKEN, createUser, doesUserExist, login} from '../../repository/readComicsApi';

const customStyles = {
    content: {
        height: '95%',
        width: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Login extends Component {

    constructor(props, nextState){
        super(props, nextState)
        this.state = {
            email: "",
            errorMessage: "",
            username: "",
            fullname: "",
            pwd: "",
            repwd: "",
            showErrorMsg: false,
            showSuccessMsg: false,
            modalIsOpen: false
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
        else if(sessionStorage.getItem('showSuccessMsg') === "true"){
            this.showSuccessMsg();
            sessionStorage.removeItem('showSuccessMsg');
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

    closeSuccessAlert() {
        this.setState({ showSuccessMsg: false });
    }

    showSuccessMsg(){
        this.setState({ showSuccessMsg: true });
    }

    /*handleLogin = (loginFlag) => {
        this.setState({
            showDashboard: loginFlag
        })
    }*/

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
        console.log(this.state.pwd);

        let loginToken = {
            username: this.state.username,
            password: this.state.pwd
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
                    else if(this.state.errorMessage !== "Valid"){
                        this.setState({
                            showErrorMsg: true
                        });
                    }
                    else{
                        createUser(user);
                        this.closeModal();
                        this.setState({
                            showErrorMsg: false,
                            showSuccessMsg: true
                        });
                    }

                });

            });


    }


    render() {
        return (
            <div className="row">
                <div className="w-100 mb-5">
                    <header>
                        <div className="container">
                            {
                                this.state.showSuccessMsg &&
                                <div className="alert alert-success alert-dismissible">
                                    <button type="button" className="close" onClick={() => this.closeSuccessAlert()}>&times;</button>
                                    <strong>Success!</strong> You've signed up!
                                </div>
                            }

                        <nav className="navbar navbar-expand-lg navbar-dark mb-2 pb-5 font-weight-bold text-light bg-transparent">
                            <span className="navbar-brand w-25 h-25">
                                <img src={logo} alt='' width={110} height={80}/>
                            </span>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="ml-auto nav flex-column">
                                    <li className="nav-item mb-3 mt-3">
                                        <form className="form-inline">
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-sm col-sm-8 bg-transparent border text-light form-rounded" onChange={n => this.changeUsername(n)} placeholder={"Username"} name={"username"} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-sm col-sm-8 border bg-transparent text-light form-rounded" onChange={n => this.changePassword(n)} placeholder="Password" name={"password"} />
                                            </div>
                                            <button type="submit" onClick={this.handleSubmit} className="btn border btn-sm text-light">Login</button>
                                        </form>
                                    </li>
                                    <li className="nav-item d-inline signup-desc">
                                        <span className="d-inline pr-2 ">Still not a member? What are you waiting for?</span>
                                        <button onClick={this.openModal} className="btn border btn-sm text-light">SignUp</button>
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
                                                <form>

                                                    {
                                                        this.state.showErrorMsg &&
                                                        <div className="alert alert-danger" role="alert">
                                                            {this.state.errorMessage}
                                                        </div>
                                                    }
                                                    <div className="form-group col-lg-5 mx-auto">

                                                        <label for="email">Email address:</label>
                                                            <input type="email" className="form-control" id="email" name={"email"} onChange={n => this.changeEmail(n)} required/>
                                                    </div>
                                                        <div className="form-group col-lg-5 mx-auto">
                                                        <label for="fullname">Full name:</label>
                                                            <input type="text" className="form-control" id="fullname" name={"fullname"} onChange={n => this.changeFullName(n)} required/>
                                                    </div>
                                                        <div className="form-group col-lg-5 mx-auto">
                                                        <label for="username">Username:</label>
                                                            <input type="text" className="form-control" id="username" name={"username"} onChange={n => this.changeUsername(n)} required/>
                                                    </div>
                                                        <div className="form-group col-lg-5 mx-auto">
                                                        <label for="pwd">Password:</label>
                                                            <input type="password" className="form-control" id="pwd" name={"pwd"} onChange={n => this.changePassword(n)} required/>
                                                    </div>
                                                        <div className="form-group col-lg-5 mx-auto">
                                                        <label for="rpwd">Confirm password:</label>
                                                            <input type="password" className="form-control" id="repwd" name={"repwd"} onChange={n => this.changeRePassword(n)} required />
                                                    </div>

                                                    <div className="text-center">
                                                            <button type="submit" className="btn btn-info m-2" onClick={n => this.signUpUser(n)}>Submit</button>
                                                        <button type="button" className="btn btn-danger m-2" onClick={this.closeModal}>Cancel</button>
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
                            <img className="float-left col-lg-5" src={heroes} alt="" />
                            <svg className="float-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polygon fill="white" points="0,100 100,0 100,100" />
                            </svg>
                            </div>
                    </header>

                    <section className="mb-5 col-lg-5 mt-2 float-right">
                        <div className="d-inline-block mr-lg-5 text-sm-center">
                            <em className="float-lg-right">Who are we?</em>
                            <span className="col-lg-10 desc-text pt-lg-3 mr-lg-2 float-right">
                                With classic characters, both familiar and new, ReadComics is home to more than 65 of the
                                greatest, most-loved comic strips and panels.
                            </span>
                        </div>
                    </section>

                </div>


                <section className="col-lg-12 mt-4 mb-4 section-info">
                    <div className="container mt-5 mx-auto text-center">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-3 my-5 mx-auto info-card">
                                <div className="bg-custom p-3">
                                    <div className="text-center text-light">
                                        <i className="fa fa-users fa-3x mb-3" aria-hidden="true"/>
                                        <hr className="style14 col-3" />
                                        <h3>65,542</h3>
                                        <h4>Users</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-3 my-5 mx-auto info-card">
                                <div className="bg-custom p-3">
                                    <div className="text-center text-light">
                                        <i className="fa fa-book fa-3x mb-3" aria-hidden="true"/>
                                        <hr className="style14 col-3" />
                                        <h3>546</h3>
                                        <h4>Comics</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6 col-lg-3 my-5 mx-auto info-card">
                                <div className="bg-custom p-3">
                                    <div className="text-center text-light">
                                        <i className="fa fa-star fa-3x mb-3" aria-hidden="true"/>
                                        <hr className="style14 col-3" />
                                        <h3>65,542</h3>
                                        <h4>Reviews</h4>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <footer className="col-lg-12 mb-4">
                    <div className="container">
                        <div className="footer-copyright text-center py-3">
                            © 2019 Copyright
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Login;
