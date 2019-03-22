/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';


class UserComics extends Component {

    constructor(props){
        super(props);
        this.state = {
            component: "Dashboard",
            showPersonalInfoFlag: true,
            showComicsFlag: false,
        }
    }


    render() {
        return (
            <div className="col-lg-9 p-2">
                <span>comics</span>
            </div>
        )
    }

}

export default UserComics;