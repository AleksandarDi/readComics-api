/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {getComicsByCategory} from "../../../../repository/readComicsApi";

import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';

class ComicsByCategory extends Component {

    constructor(props){
        super(props)
        this.state = {
            category: props.category,
            comics: null,
            isActive: true
        }
    }

    componentWillMount(){
        console.log(this.state.category)
        getComicsByCategory(this.state.category).then((data) => {
            this.setState({
                comics: data,
                isActive: false
            })
        })
    }

    seeComicInfo = () =>{
        this.setState({

        })
    }


    render() {


        if(this.state.comics !== null){
            var comics = this.state.comics.map((comic, i) => (
                    <figure className="m-3 figure" key={i}>
                        <img
                            onClick={this.seeComicInfo.bind(this)}
                            className="figure-img img-thumbnail rounded shadow"
                            style={{height: "300px", width: "auto"}}
                            src={process.env.PUBLIC_URL + comic.img}
                            alt={comic.name}/>
                        <figcaption className="figure-caption font-weight-bold text-center">{comic.name}</figcaption>
                    </figure>
            ))
        }

        return (
            <div className="col-lg-12 mx-auto text-center">
                <div className="row mt-3">
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
                    {comics}
                    </LoadingOverlay>
                </div>
            </div>
        )
    }

}

export default ComicsByCategory;