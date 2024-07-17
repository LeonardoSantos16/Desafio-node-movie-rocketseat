const {Router, request} = require("express");
const routes = Router();

const usersRouter = require("./users.routes");
const notesRouter = require("./movie_notes.routes");
const tagsRouter = require("./movie_tags.routes");
const sessionsRouter = require("./session.routes");
routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionsRouter);
module.exports = routes;