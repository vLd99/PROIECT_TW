import React ,{Component} from 'react'
import { FormControl, InputLabel, FormHelperText, Input, Button, Container } from '@material-ui/core';
import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"






class Register extends Component{
    constructor(){
        super();
        this.state = {
            username:"",
            mail: "",
            password: "",
            isRegistered:false,
            userData:null
        }
        this.handleClick = this.handleRegister.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeUsername =  this.handleChangeUsername.bind(this);
    }

    handleChangePass(event) {
        this.setState({
            password: event.target.value

        })
        
    

    }

    handleChangeMail(event) {
        this.setState({
            mail: event.target.value

        })
     
      
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value

        })
     
    }
    handleRegister = async (e) => {

        e.preventDefault();

        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.username, mail: this.state.mail, parola: this.state.password })
        };
        const response = await fetch('http://localhost:8001/api/users', requestOptions);
        const data = await response.json();
      
        console.log(data.message)

    
        if(data.message==="Registration successfully"){
            this.setState({
                isRegistered:true,
                userData:data
            })
                
        

         
        }
        else
        {
            this.setState({
                isRegistered:false
            })
          
        }
    }
    render(){
        const props=this.props;
        console.log(props)
        if(!this.props.isRegistered){
        
            return(
           
            <div>     
                <Container id="registerConainer" style={{ float:"center", marginTop:"5%", backgroundColor:"#FFE4C4", width:300, height:300, borderRadius:"25px"}}>
                <div style={{height:"20px"}}></div>
                
                <FormControl>
                    <InputLabel htmlFor="username-input">Username</InputLabel>
                    <Input  onChange={this.handleChangeUsername} id="email-input" />




                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="email-input">Email address</InputLabel>
                    <Input onChange={this.handleChangeMail} id="email-input" />




                </FormControl>

               
                <FormControl>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input onChange={this.handleChangePass} id="password-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your Password</FormHelperText>



                </FormControl>

                <div style={{height:"50px"}}></div>

                <Button 
                style={{ backgroundColor:"#931621"}}
                onClick={this.handleRegister} variant="contained" color="primary">
                    Register
                </Button>
               
                </Container>

            </div>

        )}
        else 
        {
            return (
                <div style={{fontSize:"40px", color:"black", fontFamily:"sans-serif"}} >Successfully Registered!</div>

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

export default connect(mapStateToProps, mapDispachToProps)(Register);