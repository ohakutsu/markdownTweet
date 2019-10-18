const express = require('express');
const MarkdownIt = require('markdown-it');
const db = require('../models');

const router = express.Router();
const markdown = new MarkdownIt();

router.get('/', async (req, res, next) => {
  const items = await db.item.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    include: {
      model: db.user,
      require: true,
    },
  });

  res.render('home', { items, title: 'Home', markdown });
});

module.exports = router;
