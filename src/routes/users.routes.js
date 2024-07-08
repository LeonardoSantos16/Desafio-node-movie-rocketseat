const { Router } = require("express");
const UsersControllers = require("../controllers/UsersControllers");

const usersRoutes = Router();
const usersControllers = new UsersControllers

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/:id", usersControllers.update);
usersRoutes.delete("/:id", usersControllers.delete);
usersRoutes.get("/", usersControllers.index);
usersRoutes.get("/:id", usersControllers.show);
module.exports = usersRoutes;