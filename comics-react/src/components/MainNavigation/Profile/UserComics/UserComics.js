/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';

import {getUserFavourites} from "../../../../repository/readComicsApi";
import { Tab } from 'semantic-ui-react';
import FavoriteComics from "./ComicsTabs/FavoriteComics/FavoriteComics";
import CurrentlyReadingComics from "./ComicsTabs/CurrentlyReading/CurrentlyReadingComics";
import SavedComics from "./ComicsTabs/SavedComics/SavedComics";

const panes = [
    { menuItem: 'Currently reading', render: () => <Tab.Pane><CurrentlyReadingComics /></Tab.Pane> },
    { menuItem: 'Saved', render: () => <Tab.Pane><SavedComics /></Tab.Pane> },
    { menuItem: 'Favorites', render: () => <Tab.Pane><FavoriteComics /></Tab.Pane> },
]

class UserComics extends Component {

    constructor(props){
        super(props);
        this.state = {
            favourites:null,
            component: "Profile_Comics",
            activeItem: 0
        }

    }


    componentWillMount(){

        if(sessionStorage.getItem("activeItem") !== null){
            this.setState({
                activeItem: sessionStorage.getItem("activeItem")
            })
        }

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
            <div className="col-lg-11 m-5">

                <Tab
                    menu={{ fluid: true, vertical: true }}
                    menuPosition='right'
                    panes={panes}
                    defaultActiveIndex={this.state.activeItem}/>

            </div>
        )
    }
}

export default UserComics;