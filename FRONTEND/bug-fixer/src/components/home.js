import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Typography, ButtonGroup, Box } from '@material-ui/core'
import {Link} from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}




class Home extends Component {

    
    constructor() {
        super();
        this.state = {
            data: [],
            filterdProjects1:[],
                filterdProjects2:[],
                filterdProjects3:[],
            loading: false,
            loaded: false
        }
    }

    async fetchData() {
        this.setState(prevState => ({
            ...prevState,
            loading: true
        }))

        try {
            const response = await fetch("http://localhost:8001/api/projects");
            const data = await response.json();

            const filterdProjects1=new Array();
            data.forEach(element => {
                if(element.id_categorie==1)
                {let clone =JSON.parse(JSON.stringify(element))
                filterdProjects1.push(clone);
                }
            });

            const filterdProjects2=new Array();
            data.forEach(element => {
                if(element.id_categorie==2)
                {let clone =JSON.parse(JSON.stringify(element))
                    filterdProjects2.push(clone);
                    }
                
            });

            const filterdProjects3=new Array();
            data.forEach(element => {
                if(element.id_categorie==3)
                {let clone =JSON.parse(JSON.stringify(element))
                    filterdProjects3.push(clone);
                    }
            });
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded: true,
                data: data,
                filterdProjects1:filterdProjects1,
                filterdProjects2:filterdProjects2,
                filterdProjects3:filterdProjects3,

            }))

            
           
        }

        catch (err) {
            console.log(err);
        }


        
    }



    componentDidMount() {
        
       

        const Projects = JSON.parse(localStorage.getItem("projects"))
        const Projects1 = JSON.parse(localStorage.getItem("projects1"))
        const Projects2 = JSON.parse(localStorage.getItem("projects2"))
        const Projects3 = JSON.parse(localStorage.getItem("projects3"))

        if (Object.keys(Projects).length !== 0) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded: true,
                data: Projects,
                filterdProjects1:Projects1,
                filterdProjects2:Projects2,
                filterdProjects3:Projects3
              


            }))

            
          
        }
        else {
            this.fetchData();
            console.log("mounted")

        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(`updated... is data loading? ${this.state.loading}`)
        console.log(`updated... is data loaded? ${this.state.loaded}`)

        // if (prevState.loaded !== this.state.loaded && this.state.loaded) {
        //     localStorage.setItem("Images", JSON.stringify(this.state.data.images))
        // }
    }

    componentWillUnmount() {
        localStorage.setItem("projects", JSON.stringify(this.state.data))
        localStorage.setItem("projects1", JSON.stringify(this.state.filterdProjects1))
        localStorage.setItem("projects2", JSON.stringify(this.state.filterdProjects2))
        localStorage.setItem("projects3", JSON.stringify(this.state.filterdProjects3))
        console.log("unmounted");

       


    }

    

    render() {
        const props = this.props;
        //this.addRows();
        console.log(this.state.data);
        
        
        return (


            <div style={{ backgroundColor: "#FFF6EB", height: "70vw" }}>
                <Typography style={{ paddingBottom: "5%", paddingTop: "1.5%" }} variant="h6" color="textPrimary"  >

                    Welcome to our app! Here is a list that contains all the current projects available right now.


                </Typography>


                <div className="container">

                {/*
                  <div>
                        {this.state.data.categories.map(categorie => {
                            return (<h1 key={categorie.id_categorie}></h1>)
                        })}
                    </div>

                    */}
                    <div className="left"   >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#FFE4C4", height: "45vw" }}>
                                    <TableRow>
                                        <TableCell>TEHNOLOGII WEB</TableCell>
                                        <TableCell align="right">ID:</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        
                                        this.state.loaded && this.state.filterdProjects1.map((row) => (
                                        <TableRow key={row.id_proiect  }>
                                            <TableCell component="th" scope="row">
                                                <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`project/${row.id_proiect}`}}>{row.denumire}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.id_proiect}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>


                    <div className="center"  >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#FFE4C4", height: "100%" }}>
                                    <TableRow>
                                        <TableCell>ANDROID</TableCell>

                                        <TableCell align="right">ID:</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody id="tableBody2">
                                    { this.state.loaded &&this.state.filterdProjects2.map((row) => (
                                        <TableRow key={row.id_proiect}>
                                            <TableCell component="th" scope="row">
                                            <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`project/${row.id_proiect}`}}>{row.denumire}</Link>
                                            </TableCell>

                                            <TableCell align="right">{row.id_proiect}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>

                    <div className="right" >
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#FFE4C4", height: "100%" }}> 
                                    <TableRow>
                                        <TableCell>MULTIMEDIA</TableCell>
                                        <TableCell align="right">ID:</TableCell>

                                    </TableRow>
                                </TableHead >
                                <TableBody>
                                    {  this.state.loaded && this.state.filterdProjects3.map((row) => (
                                        
                                        <TableRow key={row.id_proiect}>
                                            <TableCell component="th" scope="row">
                                            <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`project/${row.id_proiect}`}}>{row.denumire}</Link>
                                            </TableCell>

                                            <TableCell align="right">{row.id_proiect}</TableCell>
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
export default withRouter(Home);