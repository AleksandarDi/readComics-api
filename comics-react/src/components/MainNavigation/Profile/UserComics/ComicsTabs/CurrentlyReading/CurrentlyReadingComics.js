import React, {Component} from 'react';
import { Header, Image, Table, Icon, Button } from 'semantic-ui-react';
import {getUserFavourites} from "../../../../../../repository/readComicsApi";
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
            reading: null,
            id: "",
            isLoading: true,
            buttonDisabled: false
        }

    }

    componentWillMount(){
        getUserFavourites(sessionStorage.getItem("currentUser_id")).then((data) => {
            console.log(data);
            this.setState({
                favorites: data,
                isLoading: false
            })
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

    render(){

        if(this.state.favorites !== null) {
            var comics = this.state.favorites.map((comic, i) => (
                <Table.Row key={i}>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src={process.env.PUBLIC_URL + comic.img} rounded size='mini' />
                            <Header.Content>
                                {comic.name}
                                <Header.Subheader>Human Resources</Header.Subheader>
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
            ))
        }

        return(
            <Table className={"mx-auto"} basic='very' celled collapsing>

                <Table.Body>
                    {comics}
                </Table.Body>

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

                {/*<Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>*/}


            </Table>
        );
    }

}
export default CurrentlyReadingComics;