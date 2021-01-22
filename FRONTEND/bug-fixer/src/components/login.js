import React, { Component } from 'react'
import { FormControl, InputLabel, FormHelperText, Input, Button, Container } from '@material-ui/core';
import anim2 from "../icons/anim2.gif"
import {RETURN_USER} from "../redux/actionCreators"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Profile from "./profile"
import Home from "./home"
class Login extends Component {

   

    constructor() {
        super();
        this.state = {
            mail: "",
            password: "",
            isLoggedIn:false,
            userData:null
        }
        this.RETURN_USER=this.RETURN_USER.bind(this);
        this.handleClick = this.handleLogIn.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);

        this.EmailInput=React.createRef();
        
       
    }

    RETURN_USER(e){
        this.props.actions.RETURN_USER(e);
    }

 

    componentDidMount (){
   
        console.log("log in mounted")
    
    }

    handleChangePass(event) {
        this.setState({
            password: event.target.value

        })
        console.log(event.target.value)
       
    }


    handleChangeMail(event) {
        this.setState({
            mail: event.target.value

        })
        console.log(event.target.value)
      
    }

    handleLogIn = async (e) => {

        e.preventDefault();




        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mail: this.state.mail, parola: this.state.password })
        };
        const response = await fetch('http://localhost:8001/api/login', requestOptions);
        const data = await response.json();
        console.log(data)

    
        if(data.id_user){
            console.log(data.username);
            this.setState({
                isLoggedIn:true,
                userData:data
            })
            this.RETURN_USER(data.id_user);
            localStorage.setItem("username",data.username);
            localStorage.setItem("id",data.id_user);
            localStorage.setItem("email",data.mail);
            console.log("aici");
            console.log(this.props)

           
            

        }
        else
        {
            this.setState({
                isLoggedIn:false
            })
          
        }
    }


    render() {

        if(this.state.isLoggedIn===false){
     
        return (


            <div style={{ backgroundColor: "#FFF6EB", height:"150vh", minWidth:"100vw"}}>

                <div style={{height:"100px"}}></div>


                <div >
                <Container id="logInContainer" style={{ float:"left" ,marginTop:"5%",marginLeft:"30%", backgroundColor:"#FFE4C4", width:300, height:"300px", borderRadius:"25px"}}>
                <div style={{height:"20px"}}></div>
                
                <FormControl>
                    <InputLabel htmlFor="email-input">Email address</InputLabel>
                    <Input ref={this.EmailInput} onChange={this.handleChangeMail} id="email-input" />




                </FormControl>

                <div style={{height:"20px"}}></div>
                <FormControl>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input onChange={this.handleChangePass} id="password-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your Password</FormHelperText>



                </FormControl>

                <div style={{height:"50px"}}></div>

                <Button 
                style={{ backgroundColor:"#931621"}}
                onClick={this.handleLogIn} variant="contained" color="primary">
                    Log In
                </Button>
               
                </Container>

             
                <img alt="developer-animation" id="animLogIn" style={{ float:"right", marginLeft:"5%", marginRight:"10%"}} src={anim2}></img>
                </div>

                
               
            </div>


        )}
        else
        {
            return(
              <Home></Home>
               
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

export default connect(mapStateToProps, mapDispachToProps)(Login);
