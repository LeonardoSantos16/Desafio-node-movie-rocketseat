const { Router } = require("express");
const MovieTagsControllers = require("../controllers/MovieTagsControllers");
const tagsRoutes = Router();
const tagsController = new MovieTagsControllers();

tagsRoutes.post("/", tagsController.create);
tagsRoutes.get("/:id", tagsController.index);
tagsRoutes.delete("/:id", tagsController.delete);

module.exports = tagsRoutes