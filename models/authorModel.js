const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const author = mongoose.model("author", authorSchema);

module.exports = author;
