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

export const Comments = sequelize.define("Comments", {
  id_comment: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  body: Sequelize.STRING(300),
  nrlikes: Sequelize.INTEGER,
  stare:Sequelize.STRING(300),
  
});

export const Bugs = sequelize.define("Bugs", {
  id_bug: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
});

export const Users = sequelize.define("Users", {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }

});

Bugs.hasMany(Comments, { foreignKey: "id_bug", foreignKeyConstraint: true });
Comments.belongsTo(Bugs, { foreignKey: "id_bug" });

Users.hasMany(Comments, { foreignKey: "id_user", foreignKeyConstraint: true });
Comments.belongsTo(Users, { foreignKey: "id_user" });



sequelize.authenticate()
  .then(() => {
    console.log("sequelize has successfully connected to the database")
  })

  .catch(err => console.error("Unable to connect to the database:" + err));


sequelize.sync({ force: false, alter: false }).then(() => { console.log("Sync completed") }).catch(err => console.log("Error at creating: ") + err);

