import { app, router } from "./init/serverinit.js"

import { Proiect, Category, User, Bugs, Comments, Testers, Teams, sequelize } from "./sequelize/sequelize.js"


////---------------PROJECTS-----------------////
router.route("/projectsWithBugs").get((req, res) => {
  Proiect.findAll({
    include: [{
      model: Bugs
    }]

  }).then(response => res.json(response));

})

router.route("/projectWithBugs/:id_proiect").get((req, res) => {
  Proiect.findAll({
    include: [{
      model: Bugs

    }],
    where: {
      id_proiect: req.params.id_proiect
    }

  }).then(response => res.json(response));
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
  // inseram un proiect cu membrii echipei sale
  Proiect.create({
    id_proiect: req.body.id_proiect,
    descriere: req.body.descriere,
    denumire: req.body.denumire,
    link_git: req.body.link_git,
    id_categorie: req.body.id_categorie,


  }).then((proiect) => {
    //users_ids va fi o lista/array construita la nivel de front-end care va contine
    //id-urile membrilor adaugati la proiect si pe cel al cretorului
    for (let i = 0; i < req.body.users_ids.length; i++) {
      Teams.create({
        id_proiect: proiect.id_proiect,
        id_user: req.body.users_ids[i]
      })
    }
  }).then((result) => res.json(result))
);



router.route("/projects/:id_proiect").put((req, res) =>
//validare ca modifarea se face de catre unul din membri echipei proiectului
  Proiect.update({
    id_proiect: req.body.id_proiect,
    descriere: req.body.descriere,
    denumire: req.body.denumire,
    id_categorie: req.body.id_categorie
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
//validare poate fi adaugat doar de catre un membru al unui proiect
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
//validare - la fel ca mai sus (edit-ul poate fi facut doar de cel care a lasat comentariul)
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
//valdiare la fel ca mai sus
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


router.route("/commentsfrombug/:id_bug").get((req, res) => {

  sequelize.query(
    'SELECT id_proiect FROM teams WHERE id_user = :status',
    {
      replacements: { status: req.body.id_user },
      type: sequelize.SELECT
    }
  ).then(result => {
    console.log(result[0][0].id_proiect)
    if (result[0][0].id_proiect == req.body.id_proiect) {

      Bugs.findAll({
        where: {
          id_bug: req.params.id_bug
        },
        include: [{
          model: Comments
        }]
      }
      ).then(response => res.json(response));
    }
    else
      return res.json({ message: "user is not a project member" })
  }).catch(err => res.json(err.toString()))
})



router.route("/bugs").get((req, res) => {

  Bugs.findAll().then((record) => {
    return res.json(record);
  });

})



router.route("/bugs").post((req, res) => {
  sequelize.query(
    'SELECT id_proiect FROM testers WHERE id_user = :status',
    {
      replacements: { status: req.body.id_user },
      type: sequelize.SELECT
    }
  ).then(result1 => {
    console.log(result1[0][0].id_proiect)
    if (result1[0][0].id_proiect == req.body.id_proiect) {

      return Bugs.create({
        id_bug: req.body.id_bug,
        severitate: req.body.severitate,
        descriere: req.body.descriere,
        prioritate: req.body.prioritate,
        id_categorie: req.body.id_categorie,
        id_proiect: req.body.id_proiect,
        id_user: req.body.id_user

      }).then((result) => res.json(result))

    }
    else
      return res.json({ message: "user is not a tester" })

  }).catch(err => res.json(err.toString()))
})





router.route("/bugs/:id_bug").put((req, res) =>
//validare la fel ca mai sus
  Bugs.update({
    id_bug: req.body.id_bug,
    severitate: req.body.severitate,
    descriere: req.body.descriere,
    prioritate: req.body.prioritate,
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
//validare pentru userul care l-a creat
  Bugs.destroy({
    where: {
      id_bug: req.params.id_bug
    }
  }).then((result) => res.json(result))
);

////---------------USERS-----------------////

router.route("/login").post((req, res) => {
  User.findAll({ where: { mail: req.body.mail, parola: req.body.parola } }).then(usr => {
    if (usr != 0) {
      // putem intra in aplicatie
      return res.status(200).json(
        usr[0]
      );
    } else
      //userul e gresit
      return res.status(401).json({ message: "Username or password are incorrect" })
  });
})


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
    return res.status(500).json({
      message: "Invalid username"
    });
  }

  //validare email
  var em = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!req.body.mail.match(em)) {
    return res.status(500).json({
      message: "Invalid email"
    });
  }

  //validare parola
  var pass = /^[A-Za-z]\w{7,14}$/;
  if (!req.body.parola.match(pass)) {
    return res.status(500).json({
      message: "Invalid password"
    });
  }

  //creare user
  User.create({
    username: req.body.username,
    mail: req.body.mail,
    parola: req.body.parola
  }).then(() => {
    res.json({ message: "Registration successfully" })

  }).catch((err) => res.json({ message: err.toString() }))

});



router.route("/users/:id_user").put((req, res) => {

  //trebuie adauga validare pentru editarea detaliilor dar de catre userul curent in aplicatie
  if (req.body.username) {
    //validare username
    var usr = /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    if (!req.body.username.match(usr)) {
      return res.status(500).json({
        message: "Invalid username"
      });
    }
  }
  if (req.body.mail) {
    //validare email
    var em = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!req.body.mail.match(em)) {
      return res.status(500).json({
        message: "Invalid email"
      });
    }
  }
  if (req.body.parola) {
    //validare parola
    var pass = /^[A-Za-z]\w{7,14}$/;
    if (!req.body.parola.match(pass)) {
      return res.status(500).json({
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
    }).then(() => {
      res.json({ message: "Modification was successfully" })

    }).catch((err) => res.json({ message: err.toString() }))

}
);

router.route("/users/:id_user").delete((req, res) =>
//trebuie adauga adaugata acc validare ca mai sus
  User.destroy({
    where: {
      id_user: req.params.id_user
    }
  }).then(() => {
    res.json({ message: "Deleted" })
  })

)
////---------------USERS-----------------////

////---------------CATEGORIES-----------------////

router.route("/categories").get((req, res) => {

  Category.findAll().then((Category) => {
    return res.json(Category);
  });

})

router.route("/categories/:id_categorie").get((req, res) => {


  Category.findByPk(req.params.id_categorie).then((result) => res.json(result))
}
);

router.route("/categories").post((req, res) =>
  Category.create({
    id_categorie: req.body.id_categorie,
    descriere_categ: req.body.descriere_categ,
    denumire_categ: req.body.denumire_categ,
    id_proiect: req.body.id_proiect

  }).then((result) => res.json(result))
);



router.route("/categories/:id_categorie").put((req, res) =>
  Category.update({
    id_categorie: req.body.id_categorie,
    descriere_categ: req.body.descriere_categ,
    denumire_categ: req.body.denumire_categ,
    id_proiect: req.body.id_proiect
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

  }).then(response => res.json(response));

})
////---------------CATEGORIES-----------------////

////---------------TEAMS-----------------////



router.route("/teams").get((req, res) => {

  Teams.findAll().then((teams) => {
    return res.json(teams);
  });

})

router.route("/teams/:id").get((req, res) => {

  Teams.findByPk(req.params.id).then((result) => res.json(result))
}
);

router.route("/teams").post((req, res) =>
  Teams.create({
    id_proiect: req.body.id_proiect,
    id_user: req.body.id_user
  }).then((result) => res.json(result))
);



router.route("/teams/:id").put((req, res) =>
  Teams.update({
    id_proiect: req.body.id_proiect,
    id_user: req.body.id_user
  },
    {
      where: {
        id_proiect: req.params.id
      }


    }).then((result) => res.json(result))
);

router.route("/teams/:id").delete((req, res) =>
  Teams.destroy({
    where: {
      id_proiect: req.params.id
    }
  }).then((result) => res.json(result))
);




////---------------TEAMS-----------------////
////---------------TESTERS-----------------////


router.route("/testers").get((req, res) => {

  Testers.findAll().then((tstr) => {
    return res.json(tstr);
  });

})

router.route("/testers/:id").get((req, res) => {

  Testers.findByPk(req.params.id).then((result) => res.json(result))
}
);

router.route("/testers").post((req, res) => {

  sequelize.query(
    'SELECT id_proiect FROM teams WHERE id_user = :status',
    {
      replacements: { status: req.body.id_user },
      type: sequelize.SELECT
    }
  ).then(result => {
    //console.log(result[0][0].id_proiect)
    if (result[0][0]===undefined ) {

      return Testers.create({
        id_proiect: req.body.id_proiect,
        id_user: req.body.id_user

      }).then((result) => res.json(result))
    }
    else 
      return res.json({ message: "user is already member to this project" })
  }).catch(err => res.json(err.toString()))
})


router.route("/testers/:id").put((req, res) =>
//verificare dupa id_userului curent in aplicatie
  Testers.update({
    id_proiect: req.body.id_proiect,
    id_user: req.body.id_user

  },
    {
      where: {
        id: req.params.id
      }


    }).then((result) => res.json(result))
);

router.route("/testers/:id").delete((req, res) =>
  Testers.destroy({
    where: {
      id_proiect: req.params.id
    }
  }).then((result) => res.json(result))
);




////---------------TESTERS-----------------////


var port = 8001;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})



