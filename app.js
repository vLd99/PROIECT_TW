import {app,router} from "./init/serverinit.js"
import {Proiect} from "./sequelize/sequelize.js"

router.route("/projects").get((req, res) => {


  Proiect.findAll().then((proiect) => {
    return res.json(proiect);
  });


})


var port = 8001;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
})



