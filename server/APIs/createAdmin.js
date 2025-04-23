const Admin = require("../Models/adminModel");
const UserAuthor = require("../Models/UserAuthor");

async function createAdmin(req, res) {
  const newAdmin = req.body;
  const userInDb = await Admin.findOne({ email: newAdmin.email });
  const userInUserAuthor = await UserAuthor.findOne({ email: newAdmin.email });
  // console.log("userindb : ", userInDb);
  // console.log("userinauthor: ", userInUserAuthor);

  if (userInDb !== null) {
    if (newAdmin.role === userInDb.role) {
      res.status(200).send({ message: newAdmin.role, payload: userInDb });
    } else {
      res.status(200).send({ message: "Invalid Role" });
    }
  } else {
    if (userInUserAuthor === null) {
      let newAdmin1 = new Admin(newAdmin);
      let newAdminDoc = await newAdmin1.save();
      res.status(201).send({ message: newAdminDoc.role, payload: newAdminDoc });
    } else {
      res.status(200).send({ message: "Can't be admin" });
    }
  }
}

module.exports = createAdmin;