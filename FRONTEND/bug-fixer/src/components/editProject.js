import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/DeleteForever';




class EditProject extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            loaded: false,





        }

        this.deleteProject = this.deleteProject.bind(this);
        this.updateProject = this.updateProject.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGitLinkChange = this.handleGitLinkChange.bind(this);


    }


    async deleteProject(id_p) {



        try {
            const response = await fetch(`http://localhost:8001/api/projects/${id_p}`, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log("test");


            const props = this.props;

            let x = [];
            let y = [];
            let z = [];

            x = JSON.parse(localStorage.getItem("projects1"));
            y = JSON.parse(localStorage.getItem("projects2"));
            z = JSON.parse(localStorage.getItem("projects3"));
            console.log(x)
            if (props.location.state.id_categorie == 1) {
                for (let i = 0; i < x.length; i++) {
                    //console.log("testTest")
                    if (x[i].id_proiect == this.props.location.state.id_p) {
                        x.splice(i, 1)
                        localStorage.setItem("projects1", JSON.stringify(x));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }


            }
            else if (props.location.state.id_categorie == 2) {
                for (let i = 0; i < y.length; i++) {
                    //console.log("testTest")
                    if (y[i].id_proiect == this.props.location.state.id_p) {
                        y.splice(i, 1)
                        localStorage.setItem("projects2", JSON.stringify(y));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }

            } else {
                for (let i = 0; i < z.length; i++) {
                    //console.log("testTest")
                    if (z[i].id_proiect == this.props.location.state.id_p) {
                        z.splice(i, 1)
                        localStorage.setItem("projects3", JSON.stringify(z));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }




            }
            props.history.push("/")
        } catch (err) {
            console.log(err);
        }
    }



    async updateProject(id_p) {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descriere: this.state.description, denumire: this.state.name, link_git: this.state.git_link })
        };
        console.log("aici")
        try {
            const response = await fetch(`http://localhost:8001/api/projects/${id_p}`, requestOptions)
            const data = await response.json();
            console.log(data);
            const props = this.props;

            let x = [];
            let y = [];
            let z = [];

            x = JSON.parse(localStorage.getItem("projects1"));
            y = JSON.parse(localStorage.getItem("projects2"));
            z = JSON.parse(localStorage.getItem("projects3"));
            console.log(x)
            if (props.location.state.id_categorie == 1) {
                for (let i = 0; i < x.length; i++) {
                    //console.log("testTest")
                    if (x[i].id_proiect == this.props.location.state.id_p) {
                        //x.splice(i,1)
                       
                        x[i].denumire=this.state.name;
                        x[i].descriere=this.state.description;
                        x[i].link_git=this.state.git_link
                        localStorage.setItem("projects1", JSON.stringify(x));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }


            }
            else if (props.location.state.id_categorie == 2) {
                for (let i = 0; i < y.length; i++) {
                    //console.log("testTest")
                    if (y[i].id_proiect == this.props.location.state.id_p) {
                        //y.splice(i,1)
                        y[i].denumire=this.state.name;
                        y[i].descriere=this.state.description;
                        y[i].link_git=this.state.git_link
                        localStorage.setItem("projects2", JSON.stringify(y));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }

            } else {
                for (let i = 0; i < z.length; i++) {
                    //console.log("testTest")
                    if (z[i].id_proiect == this.props.location.state.id_p) {
                        //z.splice(i,1)
                        z[i].denumire=this.state.name;
                        z[i].descriere=this.state.description;
                        z[i].link_git=this.state.git_link
                        localStorage.setItem("projects3", JSON.stringify(z));
                        //console.log("Projects 1 dupa splice" )
                        //console.log(x)

                    }
                }



            }
            props.history.push("/")
        }
        
        catch (err) {
            console.log(err);
        }
    }






    componentDidMount() {



    }

    componentDidUpdate(prevProps, prevState) {
        console.log(`updated... is data loading? ${this.state.loading}`)
        console.log(`updated... is data loaded? ${this.state.loaded}`)

        // if (prevState.loaded !== this.state.loaded && this.state.loaded) {
        //     localStorage.setItem("Images", JSON.stringify(this.state.data.images))
        // }
    }

    componentWillUnmount() {
        //localStorage.setItem("Projects", JSON.stringify(this.state.data))
        console.log("unmounted");
    }








    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleGitLinkChange = (event) => {
        this.setState({
            git_link: event.target.value
        })
    }

    render() {
        const props = this.props;
        console.log(this.props.location.state.id_p)
        console.log("editProject props");
        console.log(props)

        return (
          
           
            <div style={{ backgroundColor: "#FFE4C4", height:"100vh"}}>

                <form noValidate autoComplete="off">
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Project Id:</InputLabel>
                        <FilledInput id="component-filled" readOnly={true} defaultValue={this.props.location.state.id_p} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled" >
                        <InputLabel  htmlFor="component-filled">Category Id:</InputLabel>
                        <FilledInput id="component-filled" readOnly={true} defaultValue={this.props.location.state.id_categorie} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Name:</InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.denumire} onChange={this.handleNameChange} />
                    </FormControl>


                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Description:</InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.desc} onChange={this.handleDescriptionChange} />
                    </FormControl>

                    <br />
                    <FormControl variant="filled">

                        <InputLabel htmlFor="component-filled">Github Link </InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.link_git} onChange={this.handleGitLinkChange} />

                    </FormControl>

                    <br />

                    <div style={
                        { height: "20px" }
                    }></div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => this.updateProject(this.props.location.state.id_p)}
                        startIcon={<SaveIcon />}
                        style={{ color: "white", backgroundColor: "#931621" }}
                    >
                        Save
                </Button>
                    <div style={{ width: "20px", height: "20px" }}></div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => this.deleteProject(this.props.location.state.id_p)}
                        startIcon={<DeleteIcon />}
                        style={{ color: "white", backgroundColor: "#931621" }}
                    >
                        Delete Project
                </Button>

                </form>
            </div>
            

        )




    }
}
export default withRouter(EditProject);