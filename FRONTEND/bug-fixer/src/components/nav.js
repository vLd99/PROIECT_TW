import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import logo from '../icons/logo.png'
import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import usr from "../icons/usr.png"
import logout from "../icons/logout.png"

class Nav extends Component {


    render() {
        const props = this.props;
        


        if(!this.props.user.user){
        return (
            <React.Fragment>
                <AppBar style={{ position: "relative", backgroundColor: "#FFE4C4" ,width:"100%"}}>
                    <Toolbar>
                       
                            <Button
                                style={{ color: "white" }}
                                onClick={  () => {
                                  
                                    props.history.push("/")
                                    
                                }}
                            >
                                
                                <img src={logo} alt="logo" height="70px" width="70"></img>
                                
                            </Button>

                            <Typography id="slogan" fontSize="15rem" variant="h6" color="textPrimary"  >

                                Let's fix your app together!
                                

                        </Typography>

                        <div style={{flex:1}}></div>
                                
                        { !(this.props.username) && 

                       
                        <div className="appBarButtons" >
                            
                            <Button variant= "contained"
                           
                            style={{ color: "white" ,backgroundColor:"#931621"}}
                                onClick={() => {
                                    props.history.push("/Login")
                                }}
                            >
                                LOG IN
                            </Button>

                           
                                <div className="divider">

                                </div>
                           
                            
                            <Button variant = "contained" 
                                style={{ color: "white" , backgroundColor:"#931621"}}
                                onClick={() => {
                                    props.history.push("/Register")
                                }}
                            >
                               
                                    REGISTER
                               
                            </Button>
                    
                            </div>
                        }                
                    </Toolbar>

                    
                </AppBar>

               
            </React.Fragment>

            
        )
                    }
                    else{
                        return (
                            <React.Fragment>
                                <AppBar style={{ position: "relative", backgroundColor: "#FFE4C4" ,width:"100%"}}>
                                    <Toolbar>
                                       
                                            <Button
                                                style={{ color: "white" }}
                                                onClick={  () => {
                                                  
                                                    props.history.push("/")
                                                    
                                                }}
                                            >
                                                
                                                <img src={logo} alt="logo" height="70px" width="70"></img>
                                                
                                            </Button>
                
                                            <Typography id="slogan" fontSize="15rem" variant="h6" color="textPrimary"  >
                
                                                Let's fix your app together!
                                                
                
                                        </Typography>
                
                                        <div style={{flex:1}}></div>
                                                
                                        { 
                
                                       
                                        <div className="appBarButtons" >
                                            
                                          
                
                                           
                                                <div className="divider">
                
                                                </div>
                                           
                                            
                                            <Button variant = "contained" 
                                                style={{ color: "white" , backgroundColor:"#931621"}}
                                                onClick={() => {    
                                                    props.history.push("/Profile")
                                                }}>
                                                <img src={usr} alt="usr" height="40px" width="40"></img>
                                                
                                                
                                               
                                                
                                               
                                            </Button>

                                            <div className="divider">

                                                </div>
                                              
                                            <Button variant = "contained" 
                                                style={{ color: "white" , backgroundColor:"#931621"}}
                                                onClick={() => {
                                                    props.history.push("/")
                                                    window.location.reload();
                                                }}>
                                                <img src={logout} alt="logout" height="40px" width="40"></img>
                                                
                                                
                                               
                                                
                                               
                                            </Button>
                                    
                                            </div>
                                        }                
                                    </Toolbar>
                
                                    
                                </AppBar>
                
                               
                            </React.Fragment>
                
                            
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

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Nav));
