const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const noteRoute = express.Router();
const auth = require("../authentication/auth")

//to check whether the user is authorized or not we'll use the auth middleware
noteRoute.get("/", auth, getNote)

noteRoute.post("/", auth, createNote)

noteRoute.delete("/:id", auth,  deleteNote);

noteRoute.put("/:id", auth,  updateNote)

module.exports = noteRoute;