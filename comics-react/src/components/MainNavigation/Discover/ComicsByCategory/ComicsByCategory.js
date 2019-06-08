/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect } from 'react';
import {getComicsByCategory} from "../../../../repository/readComicsApi";
import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Modal from "react-modal";

const customStyles = {
    content: {
        height: '95%',
        width: '75%',
        top: '50%',
        left: '60%',
        right: '10%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


class ComicsByCategory extends Component {

    constructor(props){
        super(props)
        this.state = {
            category: props.category,
            id: "",
            comicInfo: "",
            comics: null,
            isActive: true,
            showInfo: false,
            modalIsOpen: false
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

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    seeComicInfo = (id, comic) =>{
        console.log(id)
        console.log(comic)
        this.setState({
            modalIsOpen: true,
            id: id,
            comicInfo: comic
        });
    };


    render() {


        if(this.state.comics !== null){
            var comics = this.state.comics.map((comic, i) => (
                    <figure
                        className="m-3 figure"
                        key={i}
                        onClick={this.seeComicInfo.bind(this, comic.id, comic)}>
                        <img
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
                    <div className="col-lg-9 p-2">
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Comic"
                            ariaHideApp={false}>

                            <div className="modal-body">

                                /* ADD COMIC BOOK INFO AND SAVE, READ AND FAVORITE BUTTONS */

                            </div>

                        </Modal>
                    </div>
                    </LoadingOverlay>
                </div>
            </div>
        )
    }

}

export default ComicsByCategory;