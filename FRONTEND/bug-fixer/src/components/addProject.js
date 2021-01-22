import React, { Component } from 'react'
import { FormControl, InputLabel, FormHelperText, Input, Button, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { RETURN_USER } from "../redux/actionCreators"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

class AddProject extends Component {



    constructor() {
        super();
        console.log()
        this.state = {
            name: "",
            description: "",
            id_categorie: "",
            link_git: "",
            users_string: "",


        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeGithubLink = this.handleChangeGithubLink.bind(this);
        this.handleChangeUsers = this.handleChangeUsers.bind(this)
        this.handleClick = this.handleUpdate.bind(this)




    }

    handleUpdate = async (e) => {

        e.preventDefault();


        var elem = this.state.users_string.split(",")
        var copy = []

        for (let i = 0; i < elem.length; i++) {

            copy[i] = parseInt(elem[i]);
        }

        console.log(copy)
        const props = this.props
        try {

            // POST request using fetch with async/await
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ denumire: this.state.name, descriere: this.state.description, link_git: this.state.link_git, users_ids: copy, id_categorie: props.location.state.id_categorie.id_categorie })
            };
            const response = await fetch('http://localhost:8001/api/projects', requestOptions);

            const data = await response.json();

            let x=[];
            let y=[];
            let z=[];

            x=JSON.parse(localStorage.getItem("projects1"));
            y=JSON.parse(localStorage.getItem("projects2"));
            z=JSON.parse(localStorage.getItem("projects3"));
           
            if(props.location.state.id_categorie.id_categorie===1){
                await x.push(data);
                localStorage.setItem("projects1",JSON.stringify(x));
            }
            else if(props.location.state.id_categorie.id_categorie===2){
                await y.push(data);
                localStorage.setItem("projects2",JSON.stringify(y));
            }else{
                await z.push(data);
                localStorage.setItem("projects3",JSON.stringify(z));
            }


           
            props.history.push("/")
         
        }
        catch (err) {
            console.log(err)
        }


    }


    RETURN_USER(e) {
        this.props.actions.RETURN_USER(e);
    }



    componentDidMount() {

        console.log("log in mounted")

    }




    handleChangeName(event) {
        this.setState({
            name: event.target.value

        })


    }



    handleChangeDescription(event) {
        this.setState({
            description: event.target.value

        })


    }

    handleChangeGithubLink(event) {
        this.setState({
            link_git: event.target.value

        })


    }

    handleChangeUsers(event) {

        this.setState({



            users_string: event.target.value


        })

        console.log(this.state.users_string)

    }











    render() {
        const props = this.props

 
        console.log("test")
        console.log(props.location.state.id_categorie)
        console.log(props.location.state.id_categorie.id_categorie)
        return (

            <div style={{ backgroundColor: "#FFF6EB", height: "150vh", minWidth: "100vw" }}>

                <div style={{ height: "100px" }}></div>
                <Container id="logInContainer" style={{ backgroundColor: "#FFE4C4", width: "400px", height: "50%", borderRadius: "25px" }}>
                    <div style={{ height: "20px" }}></div>

                    <FormControl>
                        <InputLabel htmlFor="name-input">Project name</InputLabel>
                        <Input onChange={this.handleChangeName} id="email-input" />




                    </FormControl>

                    <div style={{ height: "20px" }}></div>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Description</InputLabel>
                        <Input onChange={this.handleChangeDescription} id="password-input"  />
        



                    </FormControl>
                    <div style={{ height: "20px" }}></div>
                    <FormControl>
                        <InputLabel htmlFor="my-input">GitHub Link</InputLabel>
                        <Input onChange={this.handleChangeGithubLink} id="password-input"  />




                    </FormControl>
                    <div style={{ height: "20px" }}></div>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Members Ids </InputLabel>
                        <Input onChange={this.handleChangeUsers} id="password-input" aria-describedby="my-helper-text" />
                        <FormHelperText id="my-helper-text">Exemple: 99,13,22</FormHelperText>



                    </FormControl>

                    <div style={{ height: "50px" }}></div>

                    <Button
                        style={{ backgroundColor: "#931621" }}
                        onClick={this.handleUpdate} variant="contained" color="primary">
                        ADD
            </Button>

                </Container>
            </div>

        )
    }

}


function mapStateToProps(state) {
    return {
        user: state
    }
}

function mapDispachToProps(dispach) {
    return {
        actions: bindActionCreators({ RETURN_USER }, dispach)
    }
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(AddProject));
