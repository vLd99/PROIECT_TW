import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Typography} from '@material-ui/core'
import { Link } from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



class Project extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            loaded: false
        }
        this.DeleteBug = this.DeleteBug.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
    }



    async fetchProjects() {

        this.setState(prevState => ({
            ...prevState,
            loading: true

        }))

        try {
            const response = await fetch(`http://localhost:8001/api/projectWithBugs/${this.props.location.state.id_p}`);
            const data = await response.json();
            const bugs = new Array();
            const currentProject = data[0];
            for (let i = 0; i < data[0].Bugs.length; i++) {
                bugs[i] = data[0].Bugs[i];
            }


            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded: true,
                data: data,
                bugs: bugs,
                currentProject: currentProject
            }))




        }

        catch (err) {
            console.log(err);
        }
    }

    async DeleteBug(id_bug) {
        try {
            const response = await fetch(`http://localhost:8001/api/bugs/${id_bug}`, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log("test");

        } catch (err) {
            console.log(err);
        }
    }

    refreshPage() {
        window.location.reload(false);
    }



    componentDidMount() {

        /*const savadImages = JSON.parse(localStorage.getItem("Images"))
        if (Object.keys(savadImages).length !== 0) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded:true,
                data: savadImages

            }))
        }
        else {
            this.fetchImages();
            console.log("mounted")

        }*/

        this.fetchProjects();
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


    render() {
        const props = this.props;


        return (
            <div style={{ backgroundColor: "#FFF6EB", height: "70vw" }}>
                {this.state.loaded &&
                    <div className="container" style={{ height: "150px", width: "300px", border: "5px outset black", backgroundImage: "linear-gradient(180deg, #fff, #ddd 40%, #ccc" }}>

                        <Typography>
                            Informatii despre Proiectul Curent:
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            ID Proiect:{this.state.currentProject.id_proiect}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Denumire:{this.state.currentProject.denumire}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Descriere:{this.state.currentProject.descriere}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Link GITHUB:{this.state.currentProject.link_git}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            ID Categorie:{this.state.currentProject.id_categorie}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Nr.de BUG-uri:{this.state.bugs.length}
                        </Typography>
                
                  </div>
                 }
                
                <Link to={{pathname:`/formBug/`,}}>
                    <CloudUploadIcon/>
                    Posteaza un BUG
                </Link>
                 

                <div className="container">


                    <div className="center"  >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#FFE4C4", height: "100%" }}>


                                    <TableRow>

                                        <TableCell >Descriere:</TableCell>
                                        <TableCell align="right">ID:</TableCell>
                                        <TableCell align="right">Prioritate:</TableCell>
                                        <TableCell align="right">Severitate:</TableCell>
                                        <TableCell align="right">ID Categorie:</TableCell>
                                        <TableCell align="right">ID User:</TableCell>
                                        <TableCell align="right">Editare</TableCell>
                                        <TableCell align="right">Stergere</TableCell>


                                    </TableRow>



                                </TableHead>
                                <TableBody id="tableBody1">
                                    {this.state.loaded && this.state.bugs.map((row) => (
                                        <TableRow key={row.id_bug}>
                                            <TableCell component="th" scope="row">
                                                <Link style={{ textDecoration: 'none', color: "#931621" }}
                                                    to={{
                                                        pathname: `/Bug/${row.id_bug}`, state: {
                                                            id_b: `${row.id_bug}`
                                                        }
                                                    }}>{row.descriere}</Link>
                                            </TableCell>

                                            <TableCell align="right">{row.id_bug}</TableCell>
                                            <TableCell align="right">{row.prioritate}</TableCell>
                                            <TableCell align="right">{row.severitate}</TableCell>
                                            <TableCell align="right">{row.id_categorie}</TableCell>
                                            <TableCell align="right">{row.id_user}</TableCell>
                                            <TableCell align="right">
                                                <Link to={{
                                                    pathname: `/formBug/${row.id_bug}`, state: {
                                                        id_b: `${row.id_bug}`,
                                                        id_u: `${row.id_user}`,
                                                        id_c: `${row.id_categorie}`,
                                                        des: `${row.descriere}`,
                                                        sev: `${row.severitate}`,
                                                        pri: `${row.prioritate}`

                                                    }
                                                }}>
                                                    <EditIcon />
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right" ><DeleteIcon onClick={() => this.DeleteBug(row.id_bug)} /></TableCell>



                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                </div>

            </div>



        )
    }
}
export default withRouter(Project);