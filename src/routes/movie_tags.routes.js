const { Router } = require("express");
const MovieTagsControllers = require("../controllers/MovieTagsControllers");
const tagsRoutes = Router();
const tagsController = new MovieTagsControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
tagsRoutes.use(ensureAuthenticated);

tagsRoutes.post("/", tagsController.create);
tagsRoutes.get("/", tagsController.index);
tagsRoutes.delete("/", tagsController.delete);

module.exports = tagsRoutes