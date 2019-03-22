/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: "Dashboard",
            email: "",
            username: "",
            fullname: "",
            pwd: ""
        }
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

    updateUserInfo = (s) => {

        s.preventDefault();

        let user = {
            email: this.state.email,
            username: this.state.username,
            fullname: this.state.fullname,
            pwd: this.state.pwd
        }

        console.log("user", user);


    }


    render() {
        return (
            <div className="col-lg-12 p-2 mx-auto">
                <form className={"mr-5 ml-5 mb-5"}>

                    <div className={"row mt-3 ml-5 mr-5 justify-content-center"}>
                        <div className={"col-lg-4 m-4"}>
                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="fullname">Full name:</label>
                                <input type="text" className="form-control" id="fullname" name={"fullname"}
                                       onChange={n => this.changeFullName(n)} required/>
                            </div>

                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control" id="username" name={"username"}
                                       onChange={n => this.changeUsername(n)} required/>
                            </div>

                            <div className="form-group col-lg-12 float-left-lg">
                                <label htmlFor="email">Email address:</label>
                                <input type="email" className="form-control" id="email" name={"email"}
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
                                <input type="password" placeholder={"Re-enter new password"} className="form-control" id="rpwd" required/>
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