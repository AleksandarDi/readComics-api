/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, useEffect } from 'react';
import {addFavorite, addSaved, getComicsByCategory} from "../../../../repository/readComicsApi";
import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Modal from "react-modal";
import {Icon, Button} from "semantic-ui-react";
import ComicViewer from "../ComicViewer/ComicViewer";

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
            comicID: "",
            comics: null,
            isActive: true,
            showInfo: false,
            modalIsOpen: false,
            readComicById: false,
            hiddenNext: false,
            hiddenPrev: false
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

    openComicByid(){
        this.setState({
            readComicById: true,
            modalIsOpen: false
        });
    }

    closeComicByid(){
        this.setState({
            readComicById: false,
            modalIsOpen: true
        });
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
            comicID: comic.id,
            comicInfo: comic
        });
    };

    addToFavorites = (id, comic) => {
        addFavorite(id, comic);
    };

    saveComic = (id, comic) => {
        console.log(id)
        console.log(comic)
        addSaved(id, comic);
    };

    handlePrevious = () => {

        if(this.state.id - 1 > -1) {
            this.setState({
                id: this.state.id - 1,
                comicID: this.state.comics[this.state.id - 1].id,
                comicInfo: this.state.comics[this.state.id - 1]
            });
        }
        else{
            this.setState({
                id: this.state.comics.length - 1,
                comicID: this.state.comics[this.state.comics.length - 1].id,
                comicInfo: this.state.comics[this.state.comics.length - 1]
            });
        }
    };

    handleNext = () => {

        if(this.state.id + 1 < this.state.comics.length) {
            this.setState({
                id: this.state.id + 1,
                comicID: this.state.comics[this.state.id + 1].id,
                comicInfo: this.state.comics[this.state.id + 1]
            });
        }
        else{
            this.setState({
                id: 0,
                comicID: this.state.comics[0].id,
                comicInfo: this.state.comics[0]
            });
        }

    };


    renderNext(){

        let nextButton = null;

        if(this.state.comicID !== null){
            nextButton =
                <Button
                    className="float-right"
                    onClick={this.handleNext.bind(this)}
                    basic color='linkedin'
                    animated="vertical">
                    <Button.Content hidden>Next</Button.Content>
                    <Button.Content visible>
                        <Icon
                            className={"text-dark text-center h-25 w-25"}
                            name="angle right"/>
                    </Button.Content>
                </Button>
        }
        return (
            <span>
                {nextButton}
            </span>
        );
    }

    renderPrev(){

    }

    render() {

        let next = this.renderNext();

        if(this.state.comics !== null){
            var comics = this.state.comics.map((comic, i) => (
                    <figure
                        className="m-3 figure"
                        key={i}
                        onClick={this.seeComicInfo.bind(this, i, comic)}>
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
                            onRequestClose={this.closeModal.bind(this)}
                            style={customStyles}
                            contentLabel="Comic"
                            ariaHideApp={false}>

                            <div className="modal-header">
                                <Button
                                    className="float-left"
                                    onClick={this.handlePrevious.bind(this)}
                                    hidden={this.state.hiddenPrev}
                                    basic color='linkedin'
                                    animated="vertical">
                                    <Button.Content hidden>Prev</Button.Content>
                                    <Button.Content visible>
                                        <Icon
                                            className={"text-dark text-center h-25 w-25"}
                                            name="angle left"/>
                                    </Button.Content>
                                </Button>
                                <Button.Group className="text-center mx-auto">
                                    <Button
                                        onClick={this.openComicByid.bind(this)}
                                        basic color='black'
                                        animated="vertical">
                                        <Button.Content hidden>Read</Button.Content>
                                        <Button.Content visible>
                                            <Icon
                                                className={"text-dark text-center h-25 w-25"}
                                                name="tripadvisor"/>
                                        </Button.Content>
                                    </Button>
                                    <Button
                                        onClick={
                                            this.saveComic.bind(this,
                                                sessionStorage.getItem("currentUser_id"),
                                                this.state.comicInfo.id)}
                                        basic color='black'
                                        animated="vertical">
                                        <Button.Content hidden>Save</Button.Content>
                                        <Button.Content visible>
                                            <Icon
                                                className={"text-dark text-center h-25 w-25"}
                                                name="bookmark outline"/>
                                        </Button.Content>
                                    </Button>
                                    <Button
                                        onClick={this.addToFavorites.bind(this,
                                            sessionStorage.getItem("currentUser_id"),
                                            this.state.comicInfo.id)}
                                        basic color='black'
                                        animated="vertical">
                                        <Button.Content hidden>Favorite</Button.Content>
                                        <Button.Content visible>
                                            <Icon
                                                className={"text-dark text-center h-25 w-25"}
                                                name="heart outline"/>
                                        </Button.Content>
                                    </Button>
                                    <Button
                                        onClick={this.closeModal.bind(this)}
                                        basic color='black'
                                        animated="vertical">
                                        <Button.Content hidden>Close</Button.Content>
                                        <Button.Content visible>
                                            <Icon
                                                className={"text-dark text-center h-25 w-25"}
                                                name="remove"/>
                                        </Button.Content>
                                    </Button>
                                </Button.Group>
                                {next}
                            </div>

                            <div className="modal-body mx-auto">

                                <div className="row">
                                    <div className="float-left">
                                        <figure
                                            className="mt-3 mr-3 ml-5 figure"
                                            key={this.state.comicInfo.id}>
                                            <img
                                                className="figure-img img-thumbnail rounded shadow"
                                                style={{height: "400px", width: "auto"}}
                                                src={process.env.PUBLIC_URL + this.state.comicInfo.img}
                                                alt={this.state.comicInfo.name}/>
                                        </figure>
                                    </div>

                                    <div className="float-right col-lg-7">
                                        <h1 className="m-3 text-center">{this.state.comicInfo.name}</h1>
                                        <div className="m-5">
                                            <span className="h4"><b>Writer:</b> {this.state.comicInfo.writer}</span><br/>
                                            <span className="h4"><b>Artist:</b> {this.state.comicInfo.coverArtist}</span><br/>
                                            <span className="h4"><b>Category:</b> {this.state.comicInfo.category}</span><br/>
                                            <br/>
                                            <br/>
                                            <span className="pt-5 h4 font-weight-bold">Description:</span><br/>
                                            <p className="h4">{this.state.comicInfo.description}</p>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Modal>

                        <Modal
                            isOpen={this.state.readComicById}
                            onRequestClose={this.closeComicByid.bind(this)}
                            style={customStyles}
                            contentLabel="Comic">

                            <ComicViewer
                                id={this.state.comicInfo.id}
                                close={this.closeComicByid.bind(this)}/>

                        </Modal>
                    </div>
                    </LoadingOverlay>
                </div>
            </div>
        )
    }

}

export default ComicsByCategory;