import React, { Component } from 'react'
import { BottomNavigation } from '@material-ui/core';
import {Typography} from "@material-ui/core"

class Footer extends Component {

    render(){
        return(
                <BottomNavigation style= {{backgroundColor:"#931621"}}>

                    <div style={{color:"white"}}>
                Made with React.js and Node.js
                
                </div>
    
                </BottomNavigation>
        )
    }
}

export default Footer;