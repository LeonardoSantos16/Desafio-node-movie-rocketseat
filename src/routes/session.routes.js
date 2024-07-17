const { Router } = require("express");
const SessionsController = require("../controllers/SessionsControllers")

const sessionRoutes = Router();
const sessionsController = new SessionsController();

sessionRoutes.post("/", sessionsController.create);

module.exports = sessionRoutes;