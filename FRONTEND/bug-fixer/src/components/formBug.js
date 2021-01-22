import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';





class formBug extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            loaded: false,





        }
        this.updateBug = this.updateBug.bind(this);
        this.handleDescriereChange = this.handleDescriereChange.bind(this);
        this.handleSeveritateChange = this.handleSeveritateChange.bind(this);
        this.handlePrioritateChange = this.handlePrioritateChange.bind(this);


    }

    async updateBug(id_bug) {
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ severitate: this.state.severitate, descriere: this.state.descriere, prioritate: this.state.prioritate })
        };
        console.log("aici")
        try {
            const response = await fetch(`http://localhost:8001/api/bugs/${id_bug}`, requestOptions)
            const data = await response.json();
            
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
            //<div></div>

            <div>

                <form noValidate autoComplete="off">
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">ID Bug:</InputLabel>
                        <FilledInput id="component-filled" readOnly={true} defaultValue={this.props.location.state.id_b} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Id User:</InputLabel>
                        <FilledInput id="component-filled" readOnly={true} defaultValue={this.props.location.state.id_u} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Id Categorie:</InputLabel>
                        <FilledInput id="component-filled" readOnly={true} defaultValue={this.props.location.state.id_c} />
                    </FormControl>
                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Descrierea Bug-ului:</InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.des} onChange={this.handleDescriereChange} />
                    </FormControl>

                    <br />
                    <FormControl variant="filled">

                        <InputLabel htmlFor="component-filled">Prioritate:</InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.pri} onChange={this.handlePrioritateChange} />

                    </FormControl>

                    <br />
                    <FormControl variant="filled">
                        <InputLabel htmlFor="component-filled">Severitate:</InputLabel>
                        <FilledInput id="component-filled" defaultValue={this.props.location.state.sev} onChange={this.handleSeveritateChange} />
                    </FormControl>
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => this.updateBug(this.props.location.state.id_b)}
                        startIcon={<SaveIcon />}

                    >
                        Save
                </Button>

                </form>
            </div>


        )




    }
}
export default withRouter(formBug);