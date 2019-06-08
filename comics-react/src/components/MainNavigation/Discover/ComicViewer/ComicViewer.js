/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { Icon, Button } from 'semantic-ui-react';
import PDF from 'react-pdf-js';
import {
    addStillReading,
    getComicsByID,
    userIsReading
} from "../../../../repository/readComicsApi";
import LoadingOverlay from "react-loading-overlay";
import {PacmanLoader} from "react-spinners";

class ComicViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comic: "",
            isLoading: true,
            pageOne: 1
        }
    }

    componentWillMount() {

        getComicsByID(this.props.id).then((data) => {
            this.setState({
                comic: data,
                isLoading: false
            });
        });

        userIsReading(sessionStorage.getItem("currentUser_id"), this.props.id).then((data) => {
            if(!data){
                addStillReading(sessionStorage.getItem("currentUser_id"), this.props.id);
            }
        })
    }

    onDocumentComplete = (pages) => {
        this.setState({
            flagLast: false,
            pageOne: 1,
            pageTwo: 2,
            pages
        });
    };

    handlePrevious = () => {
        this.setState({
            pageOne: this.state.pageOne - 1,
            flagLast: false
        });
    };

    handleNext = () => {
        this.setState({
            pageOne: this.state.pageOne + 1,
            flagLast: false
        });


    };

    renderPagination = (pageOne, pageTwo, pages) => {
        let previousButton = null;
        if (pageOne > 1) {
            previousButton =
                <button
                    className="btn btn-outline-dark float-left previous"
                    onClick={this.handlePrevious}>
                    <i className="fa fa-arrow-left"/>
                </button>;
        }
        let nextButton = null;
        if (pageOne < pages) {
            nextButton =
                <button
                    className="btn btn-outline-dark float-right next"
                    onClick={this.handleNext}>
                    <i className="fa fa-arrow-right"/>
                </button>;
        }
        return (
            <span>
                {previousButton} {nextButton}
            </span>
        );
    };


    render() {
        if (this.state.isLoading) {
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
                spinner={<PacmanLoader color={'#288282'}/>}
            />)
        }
        let pagination = null;
        if (this.state.pages) {

            pagination = this.renderPagination(this.state.pageOne, this.state.pageTwo, this.state.pages);
        }
        return (
            <div>
                <div className="modal-header">
                    <Button.Group className="text-center mx-auto">
                        <Button
                            onClick={this.props.close}
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
                </div>
                <div className="modal-body">
                    <div className="text-center sticky-top">
                        {pagination}
                    </div>
                    <div className="container mx-auto text-center col-lg-10">
                        <PDF
                            className="col-lg-11"
                            file={process.env.PUBLIC_URL + this.state.comic.pdf}
                            onDocumentComplete={this.onDocumentComplete}
                            page={this.state.pageOne}
                        />
                    </div>

                </div>
            </div>
        )
    }
}
export default ComicViewer;