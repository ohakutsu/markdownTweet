const express = require('express');
const MarkdownIt = require('markdown-it');
const { check, validationResult } = require('express-validator');
const db = require('../models');

const router = express.Router();
const markdown = new MarkdownIt();

// index
router.get('/', (req, res, next) => {
  res.redirect('/home');
});

// new
router.get('/new', (req, res, next) => {
  const title = '新しくつぶやく';
  const userId = 1;
  const item = {
    userId,
    body: '',
  };
  const formMessages = {
    title,
    submit: 'つぶやく',
  };
  res.render('items/new', {
    title,
    item,
    formMessages,
    errors: null,
  });
});

// create
router.post('/new', [
  check('body').not().isEmpty().withMessage('1文字以上で入力してください')
    .isLength({ max: 200 })
    .withMessage('200文字以内で入力してください'),
], async (req, res, next) => {
  const errors = validationResult(req);
  const userId = 1;
  const { body } = req.body;
  const title = '新しくつぶやく';
  const formMessages = {
    title,
    submit: 'つぶやく',
  };

  if (!errors.isEmpty()) {
    res.status(400).render('items/new', {
      title,
      item: { userId, body },
      formMessages,
      errors: errors.array(),
    });
  }

  try {
    const item = await db.item.create({ userId, body });
    res.redirect(`/items/${item.id}`);
  } catch (error) {
    res.status(500).render('items/new', {
      title,
      item: { userId, body },
      formMessages,
      errors: error.msg,
    });
  }
});

// destroy
router.post('/destroy', (req, res, next) => {
  const { id } = req.body;
  db.item.destroy({
    where: { id },
  });
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
