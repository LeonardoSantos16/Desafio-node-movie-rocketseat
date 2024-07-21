const { Router } = require("express");
const UsersControllers = require("../controllers/UsersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const multer = require("multer");
const uploadConfig = require("../Configs/upload");
const usersRoutes = Router();
const usersControllers = new UsersControllers();
const UserAvatarControllers = require("../controllers/UserAvatarControllers");
const userAvatarControllers = new UserAvatarControllers();

const upload = multer(uploadConfig.MULTER);

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.delete("/", ensureAuthenticated, usersControllers.delete);
usersRoutes.get("/", usersControllers.index);
usersRoutes.get("/", ensureAuthenticated, usersControllers.show);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarControllers.update);
module.exports = usersRoutes;