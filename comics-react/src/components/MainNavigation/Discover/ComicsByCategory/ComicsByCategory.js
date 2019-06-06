/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {ACCESS_TOKEN, getComicsByCategory} from "../../../../repository/readComicsApi";

class ComicsByCategory extends Component {

    constructor(props){
        super(props)
        this.state = {
            category: props.category,
            comics: null
        }
    }

    componentWillMount(){
        console.log(this.state.category)
        getComicsByCategory(this.state.category).then((data) => {
            this.setState({
                comics: data
            })
        })
    }

    render() {


        if(this.state.comics !== null){
            var comics = this.state.comics.map((comic, i) => (
                    <figure className="m-3 figure" key={i}>
                        <img
                            className="figure-img img-thumbnail rounded shadow-lg"
                            style={{height: "300px", width: "auto"}}
                            src={process.env.PUBLIC_URL + comic.img}
                            alt={comic.name}/>
                        <figcaption className="figure-caption font-weight-bold text-center">{comic.name}</figcaption>
                    </figure>
            ))
        }

        return (
            <div className="col-lg-12 mx-auto text-center">
                <div className="row">
                    {comics}
                </div>
            </div>
        )
    }

}

export default ComicsByCategory;