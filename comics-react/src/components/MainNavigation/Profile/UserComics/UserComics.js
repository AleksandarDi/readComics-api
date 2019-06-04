/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';

import PDF from 'react-pdf-js';
import {getCurrentUser, getUserFavourites} from "../../../../repository/readComicsApi";
import LoadingOverlay from "react-loading-overlay";
import {PacmanLoader} from "react-spinners";

class UserComics extends Component {

    constructor(props){
        super(props);
        this.state = {
            favourites:null,
            component: "Dashboard",
            showPersonalInfoFlag: true,
            showComicsFlag: false,
            isLoading:true
        }
    }


    componentDidMount(){
        getUserFavourites(sessionStorage.getItem("currentUser_id")).then((data) =>{
            console.log(data);
            this.setState({
                favourites:data,
                isLoading:false
            })
        })
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
            pageOne: this.state.pageOne - 2,
            pageTwo: this.state.pageTwo - 2,
            flagLast: false
        });
    };

    handleNext = () => {
        if (this.state.pageTwo + 2 > this.state.pages){
            this.setState({
                pageOne: this.state.pageOne + 2,
                pageTwo: this.state.pages,
                flagLast: true
            });
        }
        else{
            this.setState({
                pageOne: this.state.pageOne + 2,
                pageTwo: this.state.pageTwo + 2,
                flagLast: false
            });

        }

    };

    renderPagination = (pageOne, pageTwo, pages) => {
        console.log("yes");
        let previousButton = null;
        if (pageOne > 1) {
            previousButton = <button className="btn previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></button>;
        }
        let nextButton = null;
        if (pageTwo < pages) {
            nextButton = <button className="btn next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></button>;
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
                    <img src={process.env.PUBLIC_URL + comic.img} alt={comic.name}/>
                    </li>
                    )
                )}
                </ul>
                <div className="container col-lg-12">
                <PDF
                    file={process.env.PUBLIC_URL + '/comics/Marvel/spiderman-comic.pdf'}
                    onDocumentComplete={this.onDocumentComplete}
                    page={this.state.pageOne}
                />
                {!this.state.flagLast && <PDF
                    file={process.env.PUBLIC_URL + '/comics/Marvel/spiderman-comic.pdf'}
                    onDocumentComplete={this.onDocumentComplete}
                    page={this.state.pageTwo}
                />}
                </div>
                {pagination}
            </div>
        )
    }
}

export default UserComics;