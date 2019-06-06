/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';

import PDF from 'react-pdf-js';
import {getUserFavourites} from "../../../../repository/readComicsApi";
import LoadingOverlay from "react-loading-overlay";
import {PacmanLoader} from "react-spinners";
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

class UserComics extends Component {

    constructor(props){
        super(props);
        this.state = {
            favourites:null,
            component: "Dashboard",
            showPersonalInfoFlag: true,
            showComicsFlag: false,
            isLoading:true,
            modalIsOpen: false,
            pageOne: 1,
            pageTwo: 2
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
        });
    }

    onDocumentComplete = (pages) => {
        console.log();
        this.setState({
            flagLast: false,
            pageOne: 1,
            pageTwo: 2,
            pages });
    };

    handlePrevious = () => {
        this.setState({
            pageOne: this.state.pageOne - 1,
            flagLast: false
        });
    };

    handleNext = () => {
        /*if (this.state.pageTwo + 2 > this.state.pages){
            this.setState({
                pageOne: this.state.pageOne + 2,
                pageTwo: this.state.pages,
                flagLast: true
            });
        }
        else{*/
            this.setState({
                pageOne: this.state.pageOne + 1,
                flagLast: false
            });


    };

    renderPagination = (pageOne, pageTwo, pages) => {
        console.log("yes");
        let previousButton = null;
        if (pageOne > 1) {
            previousButton =
                <button
                    className="btn btn-outline-dark float-left previous"
                    onClick={this.handlePrevious}>
                    <i className="fa fa-arrow-left" />
                </button>;
        }
        let nextButton = null;
        if (pageOne < pages) {
            nextButton =
                <button
                    className="btn btn-outline-dark float-right next"
                    onClick={this.handleNext}>
                    <i className="fa fa-arrow-right" />
                </button>;
        }
        return (
            <span>
                {previousButton} {nextButton}
            </span>
        );
    };


    render() {
        if(this.state.isLoading){
            return (<LoadingOverlay
                active={this.state.isActive}
                styles={{
                    overlay: {
                        position: 'absolute',
                        left: '50%',
                        margin: '40px 0px 50px 0px',
                        top: '40%',
                        width: '1000px',
                        height: '250px',
                    },
                    wrapper: {
                        backgroundColor: this.state.isActive ? '#f0f0f0' : '',
                        overflow: this.state.isActive ? 'hidden' : ''
                    }
                }}
                spinner={<PacmanLoader color={'#288282'} />}
            />)
        }
        let pagination = null;
        if (this.state.pages) {

            pagination = this.renderPagination(this.state.pageOne, this.state.pageTwo, this.state.pages);
        }
        return (
            <div className="col-lg-9 p-2">
                <ul>
                    {this.state.favourites.map((comic,i)=>(
                            <li key={i}> {comic.name}
                                <img
                                    className="img-thumbnail h-50 w-25"
                                    src={process.env.PUBLIC_URL + comic.img}
                                    alt={comic.name}/>
                            </li>
                        )
                    )}
                </ul>
                <button onClick={this.openModal} className="btn border btn-sm text-light">Read comic</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Sign up">

                    <div className="modal-body">
                        <div className="text-center sticky-top">
                            {pagination}
                        </div>
                        <div className="container mx-auto text-center col-lg-10">
                            <PDF
                                className="col-lg-11"
                                file={process.env.PUBLIC_URL + '/comics/Marvel/SecretEmpireUprising00120.pdf'}
                                onDocumentComplete={this.onDocumentComplete}
                                page={this.state.pageOne}
                            />
                            {/*{!this.state.flagLast &&
                            <PDF
                                className="col-lg-10"
                                file={process.env.PUBLIC_URL + '/comics/Marvel/SecretEmpireUprising00120.pdf'}
                                onDocumentComplete={this.onDocumentComplete}
                                page={this.state.pageTwo}
                            />}*/}
                        </div>

                    </div>

                </Modal>

            </div>
        )
    }
}

export default UserComics;