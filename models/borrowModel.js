const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    returnDate: {
      type: Date,
      default:null,
    },
  },
  {
    timestamps: true,
  }
);

const borrow = mongoose.model("borrow", borrowSchema);

module.exports = borrow;
