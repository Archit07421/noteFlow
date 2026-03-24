const express = require("express");
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const routes = express.Router();

// All routes here are mounted under /api and protected by fetchUser in app.js
routes.get("/notes", getNotes);
routes.get("/notes/:id", getNoteById);
routes.post("/notes", createNote);
routes.put("/notes/:id", updateNote);
routes.delete("/notes/:id", deleteNote);

module.exports = routes;
