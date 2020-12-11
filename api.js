import { app, router } from "./init/serverinit.js"
import { Proiect, Categorie, Users, Bugs } from "./sequelize/sequelize.js"

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
    denumire: req.body.denumire
  }).then((result) => res.json(result))
);



router.route("/projects/:id_proiect").put((req, res) =>
  Proiect.update({
    id_proiect: req.body.id_proiect,
    descriere: req.body.descriere,
    denumire: req.body.denumire
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


router.route("/sequelize/projectsWithCategories").post((req, res) => {
  Proiect.create({

    descriere: req.body.descriere,
    denumire: req.body.denumire
  }).then(proiect => {

    req.body.Categorie.forEach(categorie => {
      Categorie.create({
        id_categorie: categorie.body.id_categorie,
        denumire_categ: categorie.denumire_categ,
        descriere_categ: categorie.descriere_categ,
        id_proiect: proiect.id_proiect
      }).then(response => res.json(response)).catch(err => console.log(err))
    })

  }).catch(err => console.log(err))
})

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



var port = 8001;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})



