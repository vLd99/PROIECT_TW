import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';





class formBug2 extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            loaded: false,





        }
        this.postBug = this.postBug.bind(this);
        this.handleDescriereChange = this.handleDescriereChange.bind(this);
        this.handleSeveritateChange = this.handleSeveritateChange.bind(this);
        this.handlePrioritateChange = this.handlePrioritateChange.bind(this);
        this.handleIdCategorieChange = this.handleIdCategorieChange.bind(this);
        this.handleIdUserChange = this.handleIdUserChange.bind(this);
        this.handleIdProiectChange=this.handleIdProiectChange.bind(this);


    }

    async postBug() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_proiect:this.state.id_proiect , id_user: this.state.id_user, id_categorie: this.state.id_categorie, severitate: this.state.severitate, descriere: this.state.descriere, prioritate: this.state.prioritate })
        };
        console.log('aici');
        try {
            const response = await fetch(`http://localhost:8001/api/bugs`, requestOptions)
            const data = await response.json();
            console.log(this.state)

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

    handleIdProiectChange = (event) => {
        this.setState({
            id_proiect: event.target.value
        })
    }



    handleIdUserChange = (event) => {
        this.setState({
            id_user: event.target.value
        })
    }
    handleIdCategorieChange = (event) => {
        this.setState({
            id_categorie: event.target.value
        })
    }




    handleDescriereChange = (event) => {
        this.setState({
            descriere: event.target.value
        })
    }

    handlePrioritateChange = (event) => {
        this.setState({
            prioritate: event.target.value
        })
    }

    handleSeveritateChange = (event) => {
        this.setState({
            severitate: event.target.value
        })
    }

    render() {
        const props = this.props;

        return (


            <div>

                <form noValidate autoComplete="off">
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Id Proiect:</InputLabel>
                        <FilledInput id="component-filled"  onChange={this.handleIdProiectChange} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Id User:</InputLabel>
                        <FilledInput id="component-filled" onChange={this.handleIdUserChange} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Id Categorie:</InputLabel>
                        <FilledInput id="component-filled" onChange={this.handleIdCategorieChange} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Descrierea Bug-ului:</InputLabel>
                        <FilledInput id="component-filled" onChange={this.handleDescriereChange} />
                    </FormControl>

                    <br />
                    <FormControl variant="filled">

                        <InputLabel htmlFor="component-filled">Prioritate:</InputLabel>
                        <FilledInput id="component-filled" onChange={this.handlePrioritateChange} />

                    </FormControl>

                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Severitate:</InputLabel>
                        <FilledInput id="component-filled" onChange={this.handleSeveritateChange} />
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => this.postBug()}
                        startIcon={<SaveIcon />}

                    >
                        Save
                </Button>

                </form>
            </div>


        )




    }
}
export default withRouter(formBug2);