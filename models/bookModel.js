const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    shelf: {
      type: String,
      required: false,
    },
    row: {
      type: String, 
      required: false,
    },
    column: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("book", bookSchema);

module.exports = book;
