const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

// All Routes of user
// These are handeled in controllers
router.get("/", userController.view);
router.post("/log_in",userController.uslogin);
router.post("/searchflights",userController.showflights);
router.post("/:fid", userController.bookflight);
router.get("/sign_up",userController.signuppg);
router.post("/sign_up/register",userController.registerus);
// router.get("/sign_up", userController.form);
// router.get("/sign_up/about_u_login", userController.ulhelp);
// router.post("/sign_up", userController.post);
// router.post("/delete/:id", userController.deleteUser);       //You can use router.delete() but here through html forms you only can send GET or POST method (So handle delete using in any one of them , here using post)
// router.get("/update/:id",userController.redirectUpdatePage);
// router.post("/update/:id",userController.updateUser);
// router.post("/search",userController.searchUser);

module.exports = router;
