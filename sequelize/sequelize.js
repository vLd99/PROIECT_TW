import Sequelize from "sequelize"

export const sequelize = new Sequelize('bd_licenta', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})



const Proiect = sequelize.define("project", {
  id_proiect: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere: Sequelize.STRING(300),
  denumire: Sequelize.STRING(300)


})


const Categorie = sequelize.define("category", {
  id_categorie: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  denumire_categ: Sequelize.STRING(300),
  descriere_categ: Sequelize.STRING(300)


})

export { Proiect ,Categorie}



Proiect.hasMany(Categorie,{foreignKey:"id_proiect",foreignKeyConstraint:true});
Categorie.belongsTo(Proiect,{foreignKey:"id_proiect"});





sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: true, alter: true }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);
