const exp = require("express");

const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const createAdmin = require("./createAdmin.js");
const UserAuthorModel = require("../Models/UserAuthor.js");

adminApp.post("/admin", expressAsyncHandler(createAdmin));

adminApp.get(
  "/users",
  expressAsyncHandler(async (req, res) => {
    console.log("Querying the database...");
    const kk = await UserAuthorModel.find();
    console.log("Query result:", kk);  // This will log the result of the query
    res.status(200).send({ message: "users", payload: kk });
  })
);


adminApp.put(
  "/user/:userid",
  expressAsyncHandler(async (req, res) => {
    const modifiedUser = req.body;
    const dbRes = await UserAuthorModel.findByIdAndUpdate(
      modifiedUser._id,
      { isActive: modifiedUser.isActive },
      { returnOriginal: false }
    );

    res.status(200).send({ message: "updated", payload: dbRes });
  })
);

module.exports = adminApp;
