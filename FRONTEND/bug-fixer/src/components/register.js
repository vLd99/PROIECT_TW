import React ,{Component} from 'react'

import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"



class Register extends Component{
    constructor(){
        super();
       
    }
    render(){
        const props=this.props;
        console.log(props)
        return(
            <div>Register component
              
                <h1>{this.props.user.user}</h1>
            </div>
        )
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

export default connect(mapStateToProps, mapDispachToProps)(Register);