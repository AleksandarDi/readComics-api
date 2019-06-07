/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';

import {getUserFavourites} from "../../../../repository/readComicsApi";
import { Tab } from 'semantic-ui-react';
import FavoriteComics from "./ComicsTabs/FavoriteComics/FavoriteComics";

const panes = [
    { menuItem: 'Currently reading', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Saved', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Favorites', render: () => <Tab.Pane><FavoriteComics /></Tab.Pane> },
]

class UserComics extends Component {

    constructor(props){
        super(props);
        this.state = {
            favourites:null,
            component: "Profile_Comics",
        }

    }


    componentWillMount(){
        getUserFavourites(sessionStorage.getItem("currentUser_id")).then((data) =>{
            console.log(data);
            this.setState({
                favourites:data,
                isLoading:false
            })
        })
    }


    render() {

        return (
            <div className="col-lg-10 m-5">

                <Tab
                    menu={{ fluid: true, vertical: true }}
                    menuPosition='right'
                    panes={panes} />

            </div>
        )
    }
}

export default UserComics;