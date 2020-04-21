const express = require("express");
const shortid = require("shortid");

const db = require("../db.js");

const router = express.Router();

router.get("/", (req, res) => {
  let books = db.get("books").value();
  let users = db.get("users").value();
  let transactions = db.get("transactions").value();

  let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);

    return { bookTitle: book.title, userName: user.name };
  });

  res.render("transactions/index", {
    transactions: changeTrans,
    books,
    users
  });
});

router.post("/", (req, res) => {
  req.body.id = shortid.generate();

  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports = router;
