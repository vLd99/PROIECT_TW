import { app, router } from "./init/serverinit.js"
import { Proiect, Category, User, Bugs, Comments } from "./sequelize/sequelize.js"


////---------------PROJECTS-----------------////
router.route("/projectsWithBugs").get((req, res) => {

  
  Proiect.findAll({
    include: [{
      model: Bugs
    }]
  
  }).then(response=>res.json(response));

})


router.route("/projects").get((req, res) => {

  Proiect.findAll().then((proiect) => {
    return res.json(proiect);
  });

})

router.route("/projects/:id_proiect").get((req, res) => {

  Proiect.findByPk(req.params.id_proiect).then((result) => res.json(result))
}
);

router.route("/projects").post((req, res) =>
  Proiect.create({
    id_proiect: req.body.id_proiect,
    descriere: req.body.descriere,
    denumire: req.body.denumire,
    id_categorie:req.body.id_categorie
  }).then((result) => res.json(result))
);



router.route("/projects/:id_proiect").put((req, res) =>
  Proiect.update({
    id_proiect: req.body.id_proiect,
    descriere: req.body.descriere,
    denumire: req.body.denumire,
    id_categorie:req.body.id_categorie
  },
    {
      where: {
        id_proiect: req.params.id_proiect
      }


    }).then((result) => res.json(result))
);

router.route("/projects/:id_proiect").delete((req, res) =>
  Proiect.destroy({
    where: {
      id_proiect: req.params.id_proiect
    }
  }).then((result) => res.json(result))
);




////---------------PROJECTS-----------------////

////---------------COMMENTS-----------------////

router.route("/comments").get((req, res) => {

  Comments.findAll().then((comm) => {
    return res.json(comm);
  });

})

router.route("/comments/:id_comment").get((req, res) => {


  Comments.findByPk(req.params.id_comment).then((result) => res.json(result))
}
);

router.route("/comments").post((req, res) =>
  Comments.create({
    id_comment: req.body.id_comment,
    body: req.body.body,
    nrlikes: req.body.nrlikes,
    stare: req.body.stare,
    id_bug: req.body.id_bug,
    id_user: req.body.id_user
  }).then((result) => res.json(result))
);



router.route("/comments/:id_comment").put((req, res) =>
  Comments.update({
    id_comment: req.body.id_comment,
    body: req.body.body,
    nrlikes: req.body.nrlikes,
    stare: req.body.stare,
    id_bug: req.body.id_bug,
    id_user: req.body.id_user

  },
    {
      where: {
        id_comment: req.params.id_comment
      }


    }).then((result) => res.json(result))

)

router.route("/comments/:id_comment").delete((req, res) =>
  Comments.destroy({
    where: {
      id_comment: req.params.id_comment
    }
  }).then((result) => res.json(result))
);

////---------------COMMENTS-----------------////
////---------------BUGS-----------------////

router.route("/bugs/:id_bug").get((req, res) => {

  Bugs.findByPk(req.params.id_bug).then((result) => res.json(result))
}
);


router.route("/commentsfrombug/:id_bug").get((req,res)=>{
  Bugs.findAll({
            where: {
                  id_bug:req.params.id_bug
                  }
              }
  ).then(response=>res.json(response));
})


router.route("/bugs").get((req, res) => {

 Bugs.findAll().then((record) => {
    return res.json(record);
  });

})

router.route("/bugs").post((req, res) =>
  Bugs.create({
    id_bug: req.body.id_bug,
    severitate: req.body.severitate,
    descriere: req.body.descriere,
    prioritate: req.body.prioritate,
    link_git: req.body.link_git,
    id_categorie: req.body.id_categorie,
    id_proiect:req.body.id_proiect,
    id_user:req.body.id_user
    
  }).then((result) => res.json(result))
);



router.route("/bugs/:id_bug").put((req, res) =>
  Bugs.update({
    id_bug: req.body.id_bug,
    severitate: req.body.severitate,
    descriere: req.body.descriere,
    prioritate: req.body.prioritate,
    link_git: req.body.link_git,
    id_categorie: req.body.id_categorie,
    id_user: req.body.id_user,
    
  },
    {
      where: {
        id_bug: req.params.id_bug
      }


    }).then((result) => res.json(result))

)



router.route("/bugs/:id_bug").delete((req, res) =>
  Bugs.destroy({
    where: {
      id_bug: req.params.id_bug
    }
  }).then((result) => res.json(result))
);

////---------------USERS-----------------////

router.route("/users").get((req, res) => {

  User.findAll().then((User) => {
    return res.json(User);
  });

})

router.route("/users/:id_user").get((req, res) => {

  User.findByPk(req.params.id_user).then((result) => res.json(result))
}
);

router.route("/users").post((req, res) => {
  //validare username
  var usr = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
  if (!req.body.username.match(usr)) {
    res.status(500).json({
      message: "Invalid username"
    });
  }

  //validare email
  var em = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!req.body.mail.match(em)) {
    res.status(500).json({
      message: "Invalid email"
    });
  }

  //validare parola
  var pass = /^[A-Za-z]\w{7,14}$/;
  if (!req.body.parola.match(pass)) {
    res.status(500).json({
      message: "Invalid password"
    });
  }

  //creare user
  User.create({
    username: req.body.username,
    mail: req.body.mail,
    parola: req.body.parola
  }).then((result) => res.json(result))
});



router.route("/users/:id_user").put((req, res) => {
  if (req.body.username) {
    //validare username
    var usr = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    if (!req.body.username.match(usr)) {
      res.status(500).json({
        message: "Invalid username"
      });
    }
  }
  if (req.body.mail) {
    //validare email
    var em = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!req.body.mail.match(em)) {
      res.status(500).json({
        message: "Invalid email"
      });
    }
  }
  if (req.body.parola) {
    //validare parola
    var pass = /^[A-Za-z]\w{7,14}$/;
    if (!req.body.parola.match(pass)) {
      res.status(500).json({
        message: "Invalid password"
      });
    }
  }
  User.update({
    username: req.body.username,
    mail: req.body.mail,
    parola: req.body.parola
  },
    {
      where: {
        id_user: req.params.id_user
      }
    }).then((result) => res.json(result))
}
);

router.route("/users/:id_user").delete((req, res) =>
  User.destroy({
    where: {
      id_user: req.params.id_user
    }
  }).then((result) => res.json(result))
);


////---------------USERS-----------------////

////---------------CATEGORIES-----------------////

router.route("/categories").get((req, res) => {

  Category.findAll().then((Category) => {
    return res.json(Category);
  });

})

router.route("/categories/:id_categorie").get((req, res) => {

  //console.log("se apelieaza")
  Category.findByPk(req.params.id_categorie).then((result) => res.json(result))
}
);

router.route("/categories").post((req, res) =>
  Category.create({
    id_categorie: req.body.id_categorie,
    descriere_categ: req.body.descriere_categ,
    denumire_categ: req.body.denumire_categ,
    id_proiect:req.body.id_proiect

  }).then((result) => res.json(result))
);



router.route("/categories/:id_categorie").put((req, res) =>
  Category.update({
    id_categorie: req.body.id_categorie,
    descriere_categ: req.body.descriere_categ,
    denumire_categ: req.body.denumire_categ,
    id_proiect:req.body.id_proiect
  },
    {
      where: {
        id_categorie: req.params.id_categorie
      }


    }).then((result) => res.json(result))
);


router.route("/categories/:id").delete((req, res) => {
  Category.findByPk(req.params.id).then(record => {
    record.destroy();
  }).then(() => res.sendStatus(200));
})


router.route("/categoriesWithProjects").get((req, res) => {

  
  Category.findAll({
    include: [{
      model: Proiect
    }]
  
  }).then(response=>res.json(response));

})
////---------------CATEGORIES-----------------////


var port = 8001;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})



