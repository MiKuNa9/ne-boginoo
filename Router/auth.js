const express = require("express");
const { register, login, getUser } = require("../Controller/auth");
const { createLink, getLink, getOriginal } = require("../Controller/link");
// const heyCheckMeYourTax = (req, res, next) => {
//   if (req.body?.email == true) {
//     next();
//   } else {
//     res.status(404).send("Ticket is not valid");
//   }
// };
const router = express.Router();

router.post("/enter", login);
router.get("/", getUser);
router.post("/register", register);
router.post("/short", createLink);
router.get("/ink", getLink);
router.post("/:id", getOriginal);

module.exports = router;
