import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import logo from '../icons/logo.png'


class Nav extends Component {


    render() {
        const props = this.props;
        console.log('NAV PROPS')
        console.log(props);

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

                                Let's fix your app togheter!
                                

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
}

export default withRouter(Nav);