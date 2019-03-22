/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PDF from 'react-pdf-js';
import test from './test.pdf';

class ComicViewer extends React.Component {
    
    state = {};

    onDocumentComplete = (pages) => {
        this.setState({ 
            flagLast: false,
            pageOne: 1, 
            pageTwo: 2, 
            pages });
    }

    handlePrevious = () => {
        this.setState({ 
            pageOne: this.state.pageOne - 2,
            pageTwo: this.state.pageTwo - 2,
            flagLast: false
        });
    }

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
        
    }

    renderPagination = (pageOne, pageTwo, pages) => {
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
    }

    render() {
        let pagination = null;
        if (this.state.pages) {
            pagination = this.renderPagination(this.state.pageOne, this.state.pageTwo, this.state.pages);
        }
        return (
            <div className="justify-content-center mx-auto text-center">
                <div className="container col-lg-12">
                    <PDF
                        file={test}
                        onDocumentComplete={this.onDocumentComplete}
                        page={this.state.pageOne}
                    />

                    {!this.state.flagLast && <PDF
                        file={test}
                        onDocumentComplete={this.onDocumentComplete}
                        page={this.state.pageTwo}
                    />}
                </div>
                {pagination}
            </div>
        )
    }
}

export default ComicViewer;