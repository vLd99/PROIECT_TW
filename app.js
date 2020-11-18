import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql";
import sequelize from "sequelize"


var seq = new sequelize('bd_proiect_tw', 'root','', {
    host:'localhost',
    dialect: 'mysql'
  })

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_proiect_tw'
})

connection.connect(function(err) {
    if(err)throw err;
    console.log('Connected to DB');
})

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

router.use((req, res, next) => {
   
    console.log("Hello from middleware!");
    next();
});


app.get("/", (req, res) => {
    res.json({ message: "Welcome friend" });
  });


router.route("/posts").get((req, res,next) => {
  
    res.json(posts);
});

const Proiect =seq.define("proiect",{
    id_proiect:{
      type:sequelize.INTEGER(11),
     // autoIncrement:true,
      primaryKey:true
    },
    descriere:sequelize.STRING(300),
    denumire:sequelize.STRING(300)



  },
  {
      timestamps:false
  })


router.route("/projects").get((req, res)=>{
//    let sql="SELECT * FROM proiect";
   
//     connection.query(sql, (err, results,fields) => {
//         if (err) 
//           throw err;
//         return res.send({ results });
        

 
//})

Proiect.findAll().then((proiect)=>{
   return res.json(proiect);
});


})


    

// router.route("/posts").post((req,res)=>{
//     const post=req.body;
//     if(!post){
//         res.sendStatus(500);
//         return;
//     }

//     posts.push(post);
//     res.json(posts);
// });


// router.route("/posts/:id").put((req,res)=>{
//     const postId=req.params.id;
//     const newPost=req.body;

//     if(!newPost){
//         res.sendStatus(500);
//         return;
//     }

//     const newPosts=posts.map(post=>post.id==postId?newPost:post );
//     res.json(newPost);

// })

// router.route("/posts/:id").patch((req,res)=>{
//     const postId=req.params.id;
//     const newPost=req.body;

//     if(!newPost){
//         res.sendStatus(500);
//         return;
//     }


//     const newPosts=posts.map(post=>post.id==postId?{...post,title:newPost.title,body:newPost.body}:post)
//     res.json(newPosts);

// })


// router.route("/posts/:id").delete((req,res)=>{
    

//     if(!posts.length){
//         res.json("No post to delete!")
//         return;
//     }

//     const index=posts.findIndex(item=>item.id==postId);

//   const postId=req.params.id;
//   posts.splice(index,1);
//   res.json(posts);
// })

var port=8001;


    
app.listen(port,()=>{
    
    console.log(`Listening to port: ${port}`);

})



