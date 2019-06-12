/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {
    ACCESS_TOKEN,
    addFavorite,
    addSaved,
    getComics,
    getCurrentUser,
    getUserSaved,
    getUserStillReading,
    userHasFavorite,
    userHasSaved
} from "../../../repository/readComicsApi";
import { Icon, Button } from 'semantic-ui-react';
import LoadingOverlay from "react-loading-overlay";
import PacmanLoader from 'react-spinners/PacmanLoader';
import Modal from "react-modal";
import ComicViewer from "../Discover/ComicViewer/ComicViewer";

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

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {

            component: "Dashboard",
            comics: null,
            reading: null,
            saved: null,
            showContinueReadingFlag: false,
            showSavedFlag: false,
            isActive: true,
            id: "",
            comicInfo: "",
            comicID: "",
            showInfo: false,
            modalIsOpen: false,
            readComicById: false,
            hiddenNext: false,
            hiddenPrev: false,
            categoryOfComic: null
        };

        sessionStorage.setItem("active", "Dashboard");
        sessionStorage.setItem("profile_tabs", "info");
    }

    componentWillMount() {

        if (sessionStorage.getItem("cat") !== null)
            sessionStorage.removeItem("cat");

        if (sessionStorage.getItem("currentUser_id") === null) {
            getCurrentUser()
                .then((data) => {
                    getUserStillReading(data.id).then((read) =>{
                        if(read.length > 0) {
                            this.setState({
                                reading: read.slice(0, 3).map((reading, i) => (
                                    <li className="list-inline-item" key={i}>
                                        <figure
                                            className="mt-3 mb-3 ml-4 mr-4 figure"
                                            key={i}
                                            onClick={this.seeComicInfo.bind(this, i, reading, read)}>
                                            <img
                                                className="figure-img img-thumbnail rounded shadow"
                                                style={{height: "300px", width: "auto"}}
                                                src={process.env.PUBLIC_URL + reading.img}
                                                alt={reading.name}/>
                                            <figcaption className="figure-caption font-weight-bold text-center">{reading.name}</figcaption>
                                        </figure>
                                    </li>
                                )),
                                showContinueReadingFlag: true,
                                isActiveR: false
                            })
                        }
                        else{
                            this.setState({
                                reading: "empty",
                                isActiveR: false
                            })
                        }
                    });

                    getUserSaved(data.id).then((save) =>{
                        if(save.length > 0) {
                            this.setState({
                                saved: save.slice(0, 3).map((saved, i) => (
                                    <li className="list-inline-item" key={i}>
                                        <figure className="mt-3 mb-3 ml-4 mr-4 figure"
                                                key={i}
                                                onClick={this.seeComicInfo.bind(this, i, saved, save)}>
                                            <img
                                                className="figure-img img-thumbnail rounded shadow"
                                                style={{height: "300px", width: "auto"}}
                                                src={process.env.PUBLIC_URL + saved.img}
                                                alt={saved.name}/>
                                            <figcaption className="figure-caption font-weight-bold text-center">{saved.name}</figcaption>
                                        </figure>
                                    </li>
                                )),
                                showSavedFlag: true,
                                isActiveS: false
                            })
                        }
                        else{
                            this.setState({
                                saved: "empty",
                                isActiveS: false
                            })
                        }
                    });
                });
        }
        else{
            getUserStillReading(sessionStorage.getItem("currentUser_id")).then((read) =>{
                if(read.length > 0) {
                    this.setState({
                        reading: read.slice(0, 3).map((reading, i) => (
                            <li className="list-inline-item" key={i}>
                                <figure className="mt-3 mb-3 ml-4 mr-4 figure"
                                        key={i}
                                        onClick={this.seeComicInfo.bind(this, i, reading, read)}>
                                    <img
                                        className="figure-img img-thumbnail rounded shadow"
                                        style={{height: "300px", width: "auto"}}
                                        src={process.env.PUBLIC_URL + reading.img}
                                        alt={reading.name}/>
                                    <figcaption className="figure-caption font-weight-bold text-center">{reading.name}</figcaption>
                                </figure>
                            </li>
                        )),
                        showContinueReadingFlag: true,
                        isActiveR: false
                    })
                }
                else{
                    this.setState({
                        reading: "empty",
                        isActiveR: false
                    })
                }
            });

            getUserSaved(sessionStorage.getItem("currentUser_id")).then((save) =>{
                if(save.length > 0) {
                    this.setState({
                        saved: save.slice(0, 3).map((saved, i) => (
                            <li className="list-inline-item" key={i}>
                                <figure className="mt-3 mb-3 ml-4 mr-4 figure"
                                        key={i}
                                        onClick={this.seeComicInfo.bind(this, i, saved, save)}>
                                    <img
                                        className="figure-img img-thumbnail rounded shadow"
                                        style={{height: "300px", width: "auto"}}
                                        src={process.env.PUBLIC_URL + saved.img}
                                        alt={saved.name}/>
                                    <figcaption className="figure-caption font-weight-bold text-center">{saved.name}</figcaption>
                                </figure>
                            </li>
                        )),
                        showSavedFlag: true,
                        isActiveS: false
                    })
                }
                else{
                    this.setState({
                        saved: "empty",
                        isActiveS: false
                    })
                }
            });
        }

        getComics().then((data) =>{
            this.setState({
                comics: data.slice(0, 3).map((comic, i) => (
                    <li className="list-inline-item" key={i}>
                        <figure className="mt-3 mb-3 ml-4 mr-4 figure"
                                key={i}
                                onClick={this.seeComicInfo.bind(this, i, comic, data)}>
                            <img
                                className="figure-img img-thumbnail rounded shadow"
                                style={{height: "300px", width: "auto"}}
                                src={process.env.PUBLIC_URL + comic.img}
                                alt={comic.name}/>
                            <figcaption className="figure-caption font-weight-bold text-center">{comic.name}</figcaption>
                        </figure>
                    </li>)),
                isActive: false
            })
        });

    }


    showStillReading = (e) =>{
        e.preventDefault();

        sessionStorage.setItem("profile_tabs", "comics");
        sessionStorage.setItem("activeItem", "0");

        this.props.profile()
    };

    showProfile = (e) =>{
        e.preventDefault();

        sessionStorage.setItem("profile_tabs", "comics");
        sessionStorage.setItem("activeItem", "1");

        this.props.profile()
    };

    showDiscover = (e) =>{
        e.preventDefault();

        this.props.discover();
    };

    signOut = (s) =>{
        s.preventDefault();
        localStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active");
        sessionStorage.removeItem("profile_tabs");
        window.location.reload()
    };

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
        window.location.reload()
    }

    seeComicInfo = (id, comic, categoryOfComic) =>{

        this.setState({
            modalIsOpen: true,
            id: id,
            comicID: comic.id,
            comicInfo: comic,
            categoryOfComic: categoryOfComic
        });
    };

    addToFavorites = (id, comic) => {
        userHasFavorite(id, comic).then((data)=>{
            if(!data){
                addFavorite(id, comic);
            }
        })
    };

    saveComic = (id, comic) => {
        userHasSaved(id, comic).then((data) => {
            if(!data){
                addSaved(id, comic);
            }
        })
    };

    handlePrevious = () => {

        if(this.state.id - 1 > -1) {
            this.setState({
                id: this.state.id - 1,
                comicID: this.state.categoryOfComic[this.state.id - 1].id,
                comicInfo: this.state.categoryOfComic[this.state.id - 1]
            });
        }
        else{
            this.setState({
                id: this.state.categoryOfComic.length - 1,
                comicID: this.state.categoryOfComic[this.state.categoryOfComic.length - 1].id,
                comicInfo: this.state.categoryOfComic[this.state.categoryOfComic.length - 1]
            });
        }
    };

    handleNext = () => {

        if(this.state.id + 1 < this.state.categoryOfComic.length) {
            this.setState({
                id: this.state.id + 1,
                comicID: this.state.categoryOfComic[this.state.id + 1].id,
                comicInfo: this.state.categoryOfComic[this.state.id + 1]
            });
        }
        else{
            this.setState({
                id: 0,
                comicID: this.state.categoryOfComic[0].id,
                comicInfo: this.state.categoryOfComic[0]
            });
        }

    };

    render() {

        return (
            <div className="col-lg-9 p-2">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Dashboard</em>
                        <Button
                            onClick={this.signOut.bind(this)}
                            className="h4 m-4 float-right bg-light"
                            icon>
                            <Icon
                                link
                                color="teal"
                                size="large"
                                name="power off"/>
                        </Button>
                    </div>
                </div>
                <hr className="bg-light"/>
                

                <div className="container mt-5">

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


                        {!this.state.isActive &&
                        <div className="card m-4">
                            <div className="h5 card-title m-4 font-weight-light">
                                <i className="fa fa-compass text-success"/> What's new?
                            </div>
                            <div className="card-body">
                                <ul className="list-inline text-center col-lg-12">
                                    {this.state.comics}
                                </ul>
                            </div>
                            <div className="card-footer col-lg-10 mx-auto bg-white">
                                <div className="text-center">
                                    <Button
                                        onClick={this.showDiscover.bind(this)}
                                        className="bg-white"
                                        icon>
                                        <Icon
                                            link
                                            color="green"
                                            size="big"
                                            name="chevron circle down"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        }

                        {
                            this.state.showContinueReadingFlag &&

                            <div className="card m-4">
                                <div className="h5 card-title m-4 font-weight-light">
                                    <i className="fa fa-paper-plane text-warning" />  Continue reading
                                </div>
                                <div className="card-body">
                                    <ul className="list-inline text-center col-lg-12">
                                        {this.state.reading}
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-10 mx-auto bg-white">
                                    <div className="text-center">
                                        <Button
                                            onClick={this.showStillReading.bind(this)}
                                            className="bg-white"
                                            icon>
                                            <Icon
                                                link
                                                color="yellow"
                                                size="big"
                                                name="chevron circle down"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            this.state.showSavedFlag &&

                            <div className="card m-4">
                                <div className="h5 card-title m-4 font-weight-light">
                                    <i className="fa fa-heart text-danger" />  Saved
                                </div>
                                <div className="card-body">
                                    <ul className="list-inline text-center col-lg-12">
                                        {this.state.saved}
                                    </ul>
                                </div>
                                <div className="card-footer col-lg-10 mx-auto bg-white">
                                    <div className="text-center">
                                        <Button
                                            onClick={this.showProfile.bind(this)}
                                            className="bg-white"
                                            icon>
                                            <Icon
                                                link
                                                color="red"
                                                size="big"
                                                name="chevron circle down"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        }

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

export default Dashboard;