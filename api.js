import {app,router} from "./init/serverinit.js"
import {Bugs,Users,Categories} from "./sequelize/sequelize.js"

router.route("/bugs").get((req, res) => {

    Bugs.findAll().then((bug) => {
    return res.json(bug);
  });

})

router.route("/bugs/:id_bug").get((req, res) => {

  console.log("GO ON")
  Bugs.findByPk(req.params.id_bug).then((result) => res.json(result))
}
);

router.route("/bugs").post((req, res) =>
  Bugs.create({
    id_bug: req.body.id_bug,
    severitate: req.body.severitate,
    descriere:req.body.descriere,
    prioritate: req.body.prioritate,
    link_git:req.body.link_git,
    id_categorie:req.body.id_categorie,
    id_user:req.body.id_user
  }).then((result) => res.json(result))
);



router.route("/bugs/:id_bug").put((req, res) =>
 Bugs.update({
    id_bug: req.body.id_bug,
    severitate: req.body.severitate,
    descriere:req.body.descriere,
    prioritate: req.body.prioritate,
    link_git:req.body.link_git,
    id_categorie:req.body.id_categorie,
    id_user:req.body.id_user
    
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


var port = 9999;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})