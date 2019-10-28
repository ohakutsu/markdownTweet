const express = require('express');
const MarkdownIt = require('markdown-it');
const db = require('../models');

const router = express.Router();
const markdown = new MarkdownIt();

// index
router.get('/', (req, res, next) => {
  res.redirect('/home');
});

// show
router.get('/:id', async (req, res, next) => {
  const item = await db.item.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      { model: db.user, require: true },
      { model: db.like, require: false },
    ],
  });

  if (item) {
    const username = item.user.name;
    const title = `${username}さんのつぶやき`;
    res.render('items/show', { title, item, markdown });
  } else {
    res.status(404).send('<h1>Not Found</h1><h2>404</h2>');
  }
});

module.exports = router;
