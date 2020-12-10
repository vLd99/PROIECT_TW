import { app, router } from "./init/serverinit.js"
import { Comments, Users, Bugs } from "./sequelize/sequelize.js"

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


var port = 9999;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})