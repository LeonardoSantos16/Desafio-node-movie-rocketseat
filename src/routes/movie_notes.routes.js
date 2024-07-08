const { Router } = require("express");
const notesRoutes = Router();

const MovieNotesControllers = require("../controllers/MovieNotesControllers");
const notesControllers = new MovieNotesControllers();

notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);

module.exports = notesRoutes