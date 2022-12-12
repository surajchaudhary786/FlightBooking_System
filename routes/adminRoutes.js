const express = require("express");
const adminController = require("./../controllers/adminController");
const router = express.Router();

// All Routes of user
//These are handeled in controllers

router.get("/", adminController.view);
router.post("/login",adminController.log_in);
router.post("/addflight",adminController.add);
router.post("/:fno",adminController.remove);
// router.get("/sign_up", adminController.form);
// router.post("/sign_up", adminController.post);

module.exports = router;