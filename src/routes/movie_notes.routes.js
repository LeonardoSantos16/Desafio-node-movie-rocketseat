const { Router } = require("express");
const notesRoutes = Router();

const MovieNotesControllers = require("../controllers/MovieNotesControllers");
const notesControllers = new MovieNotesControllers();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);
notesRoutes.get("/", notesControllers.index);
module.exports = notesRoutes