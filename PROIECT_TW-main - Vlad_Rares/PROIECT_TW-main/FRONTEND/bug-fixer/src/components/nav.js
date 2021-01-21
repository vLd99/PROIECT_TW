import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import logo from '../icons/logo.png'


class Nav extends Component {


    render() {
        const props = this.props;
        console.log(props);

        return (
            <React.Fragment>
                <AppBar style={{ position: "relative", backgroundColor: "#FFE4C4" }}>
                    <Toolbar>
                       
                            <Button
                                style={{ color: "white" }}
                                onClick={() => {
                                    props.history.push("/")
                                }}
                            >
                                
                                <img src={logo} alt="logo" height="70px" width="70"></img>
                                
                            </Button>

                            <Typography variant="h6" color="textPrimary"  >

                                Let's fix your app together!
                                

                        </Typography>

                        
                                
                        <div style={{display:"flex", marginLeft:"70%"}}>
                            
                            <Button variant= "contained"
                            //de adaugat un medie query pt dispozitive mai mici -> margin left mai mic
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
                                    
                    </Toolbar>

                    
                </AppBar>

               
            </React.Fragment>

            
        )
    }
}

export default withRouter(Nav);