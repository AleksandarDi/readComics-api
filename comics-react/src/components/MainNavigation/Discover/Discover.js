/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import {ACCESS_TOKEN} from "../../../repository/readComicsApi";
import Button from '@material-ui/core/Button';
import ComicsByCategory from "./ComicsByCategory/ComicsByCategory";
import Select from "react-select";


const categories = [
    { label: "Marvel", value: 0 },
    { label: "DC", value: 1 },
    { label: "Archie", value: 2 }
];

class Discover extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component: "Discover",
            category: "Marvel"
        }
        sessionStorage.setItem("active", "Discover")
    }

    componentWillMount(){
        if(sessionStorage.getItem("cat") !== null){
            this.setState({
                category: sessionStorage.getItem("cat")
            })
        }
    }

    signOut = (s) =>{
        s.preventDefault();
        localStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem("currentUser_id");
        sessionStorage.removeItem("active")
        window.location.reload()
    };

    changeCategory = (category) => {
        this.setState({
            category
        })
        console.log(category.label)
        sessionStorage.setItem("cat", category.label)
    };

    render() {
        return (
            <div className="col-lg-9 p-2">
                <div className="row">
                    <div className="col-lg-12">
                        <em className="h4 m-4 float-left">Discover</em>
                        <Button
                            className="h4 m-4 float-right"
                            onClick={this.signOut.bind(this)}
                            variant="outlined"
                            size="small"
                            color="inherit"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
                <hr className="bg-light"/>

                <div className="container mt-5">
                    <form className="form form-inline m-2" noValidate autoComplete="off">
                    <div className="form-group col-lg-12">
                        <Select
                            className={"col-lg-4 float-right"}
                            name = "Categories"
                            options = {categories}
                            onChange={this.changeCategory.bind(this)}
                            defaultValue={categories.filter(option => option.label === this.state.category)}
                        />
                    </div>
                        <button type="submit" className="btn btn-primary mx-auto text-center">Submit</button>
                    </form>
                    <ComicsByCategory comics="Comics" category={this.state.category}/>
                </div>
            </div>
        )
    }

}

export default Discover;