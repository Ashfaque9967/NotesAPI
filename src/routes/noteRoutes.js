const express = require("express");
const { getNote, createNote, deleteNote, updateNote } = require("../controller/noteController");
const auth = require("../Middlewares/auth");

const noteRouter = express.Router();

noteRouter.get("/",auth , getNote);

noteRouter.post("/",auth , createNote);

noteRouter.delete("/:id",auth , deleteNote);

noteRouter.put("/:id",auth , updateNote);

module.exports = noteRouter;