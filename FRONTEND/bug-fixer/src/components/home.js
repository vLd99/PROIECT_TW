import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {  Button, Typography } from '@material-ui/core'
import {Link} from "react-router-dom"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import plus from "../icons/plus.png"
import plusWhite from "../icons/plusWhite.png"
import { CircularProgress } from "@material-ui/core"
import EditIcon from '@material-ui/icons/Edit';






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

            const filterdProjects1 =new Array();
            data.forEach(element => {
                if(element.id_categorie===1)
                {let clone =JSON.parse(JSON.stringify(element))
                filterdProjects1.push(clone);
                }
            });

            const filterdProjects2=new Array();
            data.forEach(element => {
                if(element.id_categorie===2)
                {let clone =JSON.parse(JSON.stringify(element))
                    filterdProjects2.push(clone);
                    }
                
            });

            const filterdProjects3=new Array();
            data.forEach(element => {
                if(element.id_categorie===3)
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
    async DeleteProject(id_project,id_categorie) {
        try {
            const response = await fetch(`http://localhost:8001/api/projects/${id_project}`, {
                method: "DELETE"
            });
            const data = await response.json();
   

            let x=[];
            let y=[];
            let z=[];
            const props=this.props;

            x=JSON.parse(localStorage.getItem("projects1"));
            y=JSON.parse(localStorage.getItem("projects2"));
            z=JSON.parse(localStorage.getItem("projects3"));
           
            
          

            if(id_categorie===1){
                for(let i=0;i<x.length;i++){
                    if(x[i].id_proiect==id_project){
                        console.log("s a gasit elementul care trebuie sters")
                        x.splice(i,1)
                        console.log("array ul dupa splice")
                        console.log(x)
                    }
                }
                
            localStorage.setItem("projects1",JSON.stringify(x));
            }
            else if(id_categorie===2){
                localStorage.setItem("projects2",JSON.stringify(y));
            }else{
                localStorage.setItem("projects3",JSON.stringify(z));
            }


           
           this.props.history.push("/")
           this.render()
        } catch (err) {
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
        console.log(props);
        console.log(this.state.filterdProjects1)
        //this.addRows();
        //console.log(this.state.data);
        
        if(this.props.user.user){
        
        return (


            <div style={{ backgroundColor: "#FFF6EB", height:"100%", width:"100%", maxWidth:"100%"}}>
                <Typography id="welcomeMsg" style={{ fontFamily:"", paddingBottom: "5%", paddingTop: "1.5%" }} variant="h5" color="textPrimary"  >


                You are logged in.
                    


                </Typography>


                <div className="container" style={{height:"120vh"}}>

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
                                <TableHead style={{ backgroundColor: "#FFE4C4"  }}>
                                    <TableRow>
                                        <TableCell>TEHNOLOGII WEB
                                        <div className="divider">

                                        </div>
                                     
                                            <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`addProject`,   state: {
                                                    id_categorie:this.state.filterdProjects1[0]
                                                }}}>

                                            <Button variant = "contained" 
                                                style={{ color: "white" , backgroundColor:"#931621"}}
                                                
                                          
                                               >  
                                                <img src={plusWhite} alt="add-proj" height="23px" width="23px"></img>
                                              
                                                
                                               
                                                
                                               
                                            </Button>
                                                 </Link>

                                        </TableCell>
                                        
                                        <TableCell align="right">ID:</TableCell>
                                        <TableCell align="right">Edit:</TableCell>
                                       

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                     {this.state.loading && <CircularProgress></CircularProgress>}
                                    {
                                        
                                        this.state.loaded && this.state.filterdProjects1.map((row) => (
                                        <TableRow key={row.id_proiect  }>
                                            <TableCell component="th" scope="row">
                                                <Link style={{textDecoration:'none', color:"#931621"}}
                                                
                                                to ={{pathname:`project/${row.id_proiect}`,
                                                state: {
                                                   id_p: `${row.id_proiect}`
                                               }
                                                }}
                                                >{row.denumire}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.id_proiect}</TableCell>
                                            <TableCell>
                                            <Link 
                                            style={{textDecoration:'none', color:"#931621"}}
                                            to={{
                                                    pathname: `/EditProject/${row.id_proiect}`, state: {
                                                        id_p: `${row.id_proiect}`,
                                                        desc: `${row.descriere}`,
                                                        link_git: `${row.link_git}`,
                                                        denumire: `${row.denumire}`,
                                                        id_categorie: `${row.id_categorie}`,
                                                        

                                                    }
                                                }}>
                                                    <EditIcon />
                                                </Link>
                                                </TableCell>
                                            
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
                                        <TableCell>DAM - ANDROID
                                        <div className="divider">

                            </div>
                            <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`addProject`,   state: {
                                                    id_categorie:this.state.filterdProjects2[0]
                                                }}}>

                                            <Button variant = "contained" 
                                                style={{ color: "white" , backgroundColor:"#931621"}}
                                                
                                          
                                               >  
                                                <img src={plusWhite} alt="add-proj" height="23px" width="23px"></img>
                                              
                                                
                                               
                                                
                                               
                                            </Button>
                                                 </Link>
                                        </TableCell>

                                        <TableCell align="right">ID:</TableCell>
                                        <TableCell align="right">Edit:</TableCell>
                                  


                                    </TableRow>
                                </TableHead>
                                <TableBody id="tableBody2">
                                {this.state.loading && <CircularProgress></CircularProgress>}
                                    { this.state.loaded &&this.state.filterdProjects2.map((row) => (
                                        <TableRow key={row.id_proiect}>
                                            <TableCell component="th" scope="row">
                                            <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`project/${row.id_proiect}`,
                                                 state: {
                                                    id_p: `${row.id_proiect}`
                                                }
                                                 }}
                                                
                                                >{row.denumire}</Link>
                                            </TableCell>

                                            <TableCell align="right">{row.id_proiect}</TableCell>
                                            <TableCell>
                                            <Link 
                                            style={{textDecoration:'none', color:"#931621"}}
                                            to={{
                                                    pathname: `/EditProject/${row.id_proiect}`, state: {
                                                        id_p: `${row.id_proiect}`,
                                                        desc: `${row.descriere}`,
                                                        link_git: `${row.link_git}`,
                                                        denumire: `${row.denumire}`,
                                                        id_categorie: `${row.id_categorie}`,
                                                        

                                                    }
                                                }}>
                                                    <EditIcon />
                                                </Link>
                                                </TableCell>

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
                                        <TableCell>MULTIMEDIA

                                        <div className="divider">

                                        </div>
                                                 
                                        <Link style={{textDecoration:'none', color:"#931621"}}
                                                 to ={{pathname:`addProject`,   state: {
                                                    id_categorie:this.state.filterdProjects3[0]
                                                }}}>

                                            <Button variant = "contained" 
                                                style={{ color: "white" , backgroundColor:"#931621"}}
                                                
                                          
                                               >  
                                                <img src={plusWhite} alt="add-proj" height="23px" width="23px"></img>
                                              
                                                
                                               
                                                
                                               
                                            </Button>
                                                 </Link>
                                        </TableCell>



                                        <TableCell align="right">ID:</TableCell>
                                        <TableCell align="right">Edit:</TableCell>
                                      

                                    </TableRow>
                                </TableHead >
                                <TableBody>
                                {this.state.loading && <CircularProgress></CircularProgress>}
                                    {  this.state.loaded && this.state.filterdProjects3.map((row) => (
                                        
                                        <TableRow key={row.id_proiect}>
                                            <TableCell component="th" scope="row">
                                            <Link style={{textDecoration:'none', color:"#931621"}}

                                                 to ={{pathname:`project/${row.id_proiect}`,
                                                     state: {
                                                        id_p: `${row.id_proiect}`
                                                    }
                                                     }}>{row.denumire}</Link>
                                            </TableCell>

                                            <TableCell align="right">{row.id_proiect}</TableCell>
                                            <TableCell>
                                            <Link 
                                            style={{textDecoration:'none', color:"#931621"}}
                                            to={{
                                                    pathname: `/EditProject/${row.id_proiect}`, state: {
                                                        id_p: `${row.id_proiect}`,
                                                        desc: `${row.descriere}`,
                                                        link_git: `${row.link_git}`,
                                                        denumire: `${row.denumire}`,
                                                        id_categorie: `${row.id_categorie}`,
                                                        

                                                    }
                                                }}>
                                                    <EditIcon />
                                                </Link>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>




                </div>
                           
            </div>
          

        )}
        else
        {
            return (


                <div style={{ backgroundColor: "#FFF6EB", height:"100%", width:"100%", minWidth:"100vw"}}>
                    <Typography id="welcomeMsg" style={{ fontFamily:"", paddingBottom: "5%", paddingTop: "1.5%" }} variant="h5" color="textPrimary"  >
    
                    Welcome to our app! Here is a list that contains all the current projects available right now.
                      
    
    
                    </Typography>
    
    
                    <div className="container" style={{height:"120vh"}}>
    
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
                                    <TableHead style={{ backgroundColor: "#FFE4C4"  }}>
                                        <TableRow>
                                            <TableCell>TEHNOLOGII WEB</TableCell>
                                            <TableCell align="right">ID:</TableCell>
    
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {this.state.loading && <CircularProgress></CircularProgress>}
                                        {
                                            
                                            this.state.loaded && this.state.filterdProjects1.map((row) => (
                                            <TableRow key={row.id_proiect  }>
                                                <TableCell component="th" scope="row">
                                                    <Link style={{textDecoration:'none', color:"#931621"}}
                                                     to ={{pathname:`project/${row.id_proiect}`,
                                                     state: {
                                                        id_p: `${row.id_proiect}`
                                                    }
                                                     }}>{row.denumire}</Link>
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
                                            <TableCell>DAM - ANDROID</TableCell>
    
                                            <TableCell align="right">ID:</TableCell>
    
                                        </TableRow>
                                    </TableHead>
                                    <TableBody id="tableBody2">
                                    {this.state.loading && <CircularProgress></CircularProgress>}
                                        { this.state.loaded &&this.state.filterdProjects2.map((row) => (
                                            <TableRow key={row.id_proiect}>
                                                <TableCell component="th" scope="row">
                                                <Link style={{textDecoration:'none', color:"#931621"}}
                                                      to ={{pathname:`project/${row.id_proiect}`,
                                                      state: {
                                                         id_p: `${row.id_proiect}`
                                                     }
                                                      }}>{row.denumire}</Link>
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

                                    {this.state.loading && <CircularProgress></CircularProgress>}
                                        {  this.state.loaded && this.state.filterdProjects3.map((row) => (
                                            
                                            <TableRow key={row.id_proiect}>
                                                <TableCell component="th" scope="row">
                                                <Link style={{textDecoration:'none', color:"#931621"}}
                                                    to ={{pathname:`project/${row.id_proiect}`,
                                                    state: {
                                                       id_p: `${row.id_proiect}`
                                                   }
                                                    }}>{row.denumire}</Link>
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

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Home));