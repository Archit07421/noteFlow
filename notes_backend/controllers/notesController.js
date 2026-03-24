const Note = require("../models/note");

/**
 * All handlers assume `fetchUser` middleware has set `req.user` from JWT.
 * Notes are always scoped to `req.user.id`.
 */

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to fetch notes" });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to fetch note" });
  }
};

const createNote = async (req, res) => {
  try {
    const { title = "", content = "" } = req.body;
    const note = await Note.create({
      user: req.user.id,
      title,
      content,
    });
    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to create note" });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...(title !== undefined && { title }), ...(content !== undefined && { content }) },
      { new: true, runValidators: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to update note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "Note deleted", id: note._id });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to delete note" });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
