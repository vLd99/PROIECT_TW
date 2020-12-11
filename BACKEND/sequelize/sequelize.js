
import Sequelize from "sequelize"

export const sequelize = new Sequelize('bd_proiect_tw', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export const Proiect = sequelize.define("project", {
  id_proiect: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere: Sequelize.STRING(300),
  denumire: Sequelize.STRING(300)


})

export const Categorie = sequelize.define("category", {
  id_categorie: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  denumire_categ: Sequelize.STRING(300),
  descriere_categ: Sequelize.STRING(300)


})



export const Comments = sequelize.define("Comments", {
  id_comment: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  body: Sequelize.STRING(300),
  nrlikes: Sequelize.INTEGER,
  stare: Sequelize.STRING(300),

});

export const Bugs = sequelize.define("Bug", {
  id_bug: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  severitate: Sequelize.STRING(300),
  prioritate: Sequelize.STRING(300),
  descriere: Sequelize.STRING(300),
  link_git: Sequelize.STRING(300)
});

export const User = sequelize.define("user", {
  id_user: 
  {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  username: 
  { 
    type: Sequelize.STRING(300), 
    allowNull: false,
    unique: {
      args: true,
      msg: 'Username address already in use!'
    }
  },
  mail: 
  {
    type: Sequelize.STRING(300),
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use!'
    }
  },
  parola:  
  { 
      type: Sequelize.STRING(300),
      allowNull: false, 
  }

})

export const Category = sequelize.define("category", {
  id_categorie: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere_categ: Sequelize.STRING(300),
  denumire_categ: Sequelize.STRING(300),
  id_proiect: Sequelize.INTEGER(11)


})

Bugs.hasMany(Comments, { foreignKey: "id_bug", foreignKeyConstraint: true });
Comments.belongsTo(Bugs, { foreignKey: "id_bug" });

User.hasMany(Comments, { foreignKey: "id_user", foreignKeyConstraint: true });
Comments.belongsTo(User, { foreignKey: "id_user" });

Categorie.hasMany(Bugs, { foreignKey: "id_categorie", foreignKeyConstraint: true });
Bugs.belongsTo(Categorie, { foreignKey: "id_categorie" });

User.hasMany(Bugs, { foreignKey: "id_user", foreignKeyConstraint: true });
Bugs.belongsTo(User, { foreignKey: "id_user" });



sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: false, alter: true }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);