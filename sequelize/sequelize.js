import Sequelize from "sequelize"

const sequelize = new Sequelize(
  "proiect_tw", "vlad", "vladase18", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    options: {
      trustedConnections: true,
      enableArithAbort: true
    }
  }
}
);

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

export const Categories=sequelize.define("Categories",{
  id_categorie:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true}
});

export const Users=sequelize.define("Users",{
  id_user:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
    
});

Categories.hasMany(Bugs,{foreignKey:"id_categorie",foreignKeyConstraint:true});
Bugs.belongsTo(Categories,{foreignKey:"id_categorie"});

Users.hasMany(Bugs,{foreignKey:"id_user",foreignKeyConstraint:true});
Bugs.belongsTo(Users,{foreignKey:"id_user"});



sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: false, alter: false }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);

