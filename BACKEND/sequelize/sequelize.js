
import Sequelize from "sequelize"

export const sequelize = new Sequelize(
  "bd_proiect_tw", "sa", "sa", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      //instanceName:"DESKTOP-L929KG2",
      trustedConnection: true,
      enableArithAbort: true
    }
  }
}
)

export const Proiect = sequelize.define("project", {
  id_proiect: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere: Sequelize.STRING(300),
  denumire: Sequelize.STRING(300),
  link_git: Sequelize.STRING(300),
  id_categorie: Sequelize.INTEGER(11),


})

export const Teams = sequelize.define("Team", {
  id_proiect: Sequelize.INTEGER(11),
  id_user: Sequelize.INTEGER(11)
});

export const Testers = sequelize.define("tester", {
  id_user: Sequelize.INTEGER(11),
  id_proiect: Sequelize.INTEGER(11)
});


export const Comments = sequelize.define("Comments", {
  id_comment: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  body: Sequelize.STRING(300),
  nrlikes: Sequelize.INTEGER,
  stare: Sequelize.STRING(300),
  id_bug: Sequelize.INTEGER(11)
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
  id_categorie: Sequelize.STRING(300),
  id_user: Sequelize.INTEGER(11),
  id_proiect: Sequelize.INTEGER(11)
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
  },

  
})

export const Category = sequelize.define("category", {
  id_categorie: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true
  },
  descriere_categ: Sequelize.STRING(300),
  denumire_categ: Sequelize.STRING(300),



})

Bugs.hasMany(Comments, { foreignKey: "id_bug", foreignKeyConstraint: true });
Comments.belongsTo(Bugs, { foreignKey: "id_bug" });



Proiect.hasMany(Bugs, { foreignKey: "id_proiect", foreignKeyConstraint: true });
Bugs.belongsTo(Proiect, { foreignKey: "id_proiect" });



Category.hasMany(Proiect, { foreignKey: "id_categorie", foreignKeyConstraint: true });
Proiect.belongsTo(Category, { foreignKey: "id_categorie" });


sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: false, alter: true }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);