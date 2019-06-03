/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Categories from './Categories/Categories';
import ComicsByCategory from './ComicsByCategory/ComicsByCategory';

class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {

            component: "Discover",
            showCategoriesFlag: true,
            showComicsByCategoryFlag: false

        }
    }

    render() {
        return (
            <div className="col-lg-9 p-2">
                <em className="h4 m-4">Discover</em>
                <hr className="bg-light"></hr>

                {
                    this.state.showCategoriesFlag && 
                        <Categories categories="Categories"/>
                }

                {
                    this.state.showComicsByCategoryFlag && 
                        <ComicsByCategory comics="Comics"/>
                }

            </div>
        )
    }

}

export default Discover;