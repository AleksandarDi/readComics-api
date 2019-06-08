import React, {Component} from 'react';
import { Header, Image, Table, Icon, Button } from 'semantic-ui-react';
import {
    getUserStillReading,
    removeStillReadingFromUser
} from "../../../../../../repository/readComicsApi";
import ComicViewer from "../../../../Discover/ComicViewer/ComicViewer";
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

class CurrentlyReadingComics extends Component{

    constructor(props) {
        super(props);
        this.state = {
            favorites: null,
            id: "",
            isLoading: true,
            buttonDisabled: false,
            favCount: 0,
            showTable: true
        };
        sessionStorage.setItem("activeItem", "0")
    }

    componentWillMount(){
        getUserStillReading(sessionStorage.getItem("currentUser_id")).then((data) => {
            console.log(data);
            if(data.length > 0) {
                this.setState({
                    favorites: data,
                    isLoading: false,
                    showTable: true
                })
            }
            else{
                this.setState({
                    isLoading: true,
                    showTable: false
                })
            }
        })
    }

    openModal(i) {
        console.log(i);
        this.setState({
            modalIsOpen: true,
            id: i,
            buttonDisabled: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            buttonDisabled: false
        });
    }

    removeFromCurrentlyReading = (comic) =>{
        removeStillReadingFromUser(sessionStorage.getItem("currentUser_id"), comic).then(
            window.location.reload()
        )
    };

    render(){

        if(this.state.favorites !== null) {
            var comics = this.state.favorites.map((comic, i) => (
                <Table.Row key={i}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={process.env.PUBLIC_URL + comic.img} rounded size='mini' />
                            <Header.Content>
                                {comic.name}
                                <Header.Subheader>{comic.writer}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                            onClick={this.openModal.bind(this, comic.id)}
                            hidden={this.state.buttonDisabled}
                            basic color='teal'
                            animated="vertical">
                            <Button.Content hidden>Read</Button.Content>
                            <Button.Content visible>
                                <Icon
                                    className={"text-info text-center h-25 w-25"}
                                    name="tripadvisor"/>
                            </Button.Content>
                        </Button>
                    </Table.Cell>
                    <Table.Cell>
                        <Button
                            onClick={this.removeFromCurrentlyReading.bind(this, comic.id)}
                            basic color='red'
                            animated='vertical'
                            hidden={this.state.buttonDisabled}>
                            <Button.Content hidden>Remove</Button.Content>
                            <Button.Content visible>
                                <Icon
                                    name="trash alternate outline"
                                    className={"text-danger text-center h-25 w-25"} />
                            </Button.Content>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            ));
        }

        return(
            <div>
                {this.state.showTable &&
                <div>
                    <Table className={"mx-auto"} basic='very' celled collapsing>

                        <Table.Body>
                            {comics}
                        </Table.Body>

                    </Table>
                    <div className="col-lg-9 p-2">
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            style={customStyles}
                            contentLabel="Comic">

                            <ComicViewer
                                id={this.state.id}
                                close={this.closeModal.bind(this)}/>

                        </Modal>
                    </div>
                </div>}

                {!this.state.showTable && <h4 className="text-muted text-center m-5">You're currently not reading any comics.</h4>}
            </div>
        );
    }

}
export default CurrentlyReadingComics;