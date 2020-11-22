import Sequelize from "sequelize"

const sequelize = new Sequelize('bd_proiect_tw', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

const Proiect = sequelize.define("proiect", {
  id_proiect: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere: Sequelize.STRING(300),
  denumire: Sequelize.STRING(300)



},
  {
    timestamps: false
  })


sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: false, alter: false }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);

export { Proiect }