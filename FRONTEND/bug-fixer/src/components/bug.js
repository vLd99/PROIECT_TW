import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Typography, ButtonGroup, Box } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class Bug extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            loading: false,
            loaded: false


        }
    }
    async fetchProjects() {

        this.setState(prevState => ({
            ...prevState,
            loading: true

        }))

        try {
            const response = await fetch(`http://localhost:8001/api/BugWithComments/${this.props.location.state.id_b}`);
            const data = await response.json();
            const comments = new Array();
            const currentBug = data[0];
            for (let i = 0; i < data[0].Comments.length; i++) {
                comments[i] = data[0].Comments[i];
            }


            this.setState(prevState => ({
                ...prevState,
                loading: false,
                loaded: true,
                data: data,
                comments: comments,
                currentBug: currentBug
            }))

            console.log("aici");
            console.log(data[0]);
            console.log(comments);


        }

        catch (err) {
            console.log(err);
        }
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
            <div style={{ backgroundColor: "#FFF6EB", height: "100%" }}>
                {this.state.loaded &&
                    <div className="container" style={{ height: "150px", width: "300px", border: "5px outset black", backgroundImage: "linear-gradient(180deg, #fff, #ddd 40%, #ccc" }}>

                        <Typography>
                            Informatii despre Bug:
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            ID Bug:{this.state.currentBug.id_bug}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Descriere:{this.state.currentBug.descriere}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Prioritate:{this.state.currentBug.prioritate}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Severitate:{this.state.currentBug.severitate}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            ID Categorie:{this.state.currentBug.id_categorie}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            ID User:{this.state.currentBug.id_user}
                        </Typography>
                        <Typography style={{ color: "#800000" }}>
                            Nr.de Comentarii:{this.state.comments.length}
                        </Typography>

                    </div>
                }
                <div className="container">


                    <div className="center"  >
                        {this.state.loaded && this.state.comments.map((comm) => (
                            <Card variant="outlined">

                                <CardContent style={{ backgroundColor: "#FFE4C4"}}>
                                    <Typography style={{color: "#800000"}} color="textPrimary" gutterBottom>
                                        Comentariu:{comm.id_comment}
                                     </Typography>
                                    <Typography variant="h" component="h2">
                                        {comm.body}
                                    </Typography>
                                    <Typography  align="right"  color="textPrimary">
                                        Stare:{comm.stare}
                                    </Typography>
                                    <Typography align="left" color="textPrimary">
                                        Nr.Likes:{comm.nrlikes}
                                    </Typography>

                                </CardContent>
                                

                            </Card>
                        ))}

                    </div>
                </div>

            </div>



        )
    }


}

export default withRouter(Bug);