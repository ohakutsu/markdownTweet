const express = require('express');
const MarkdownIt = require('markdown-it');
const db = require('../models');

const router = express.Router();
const markdown = new MarkdownIt();

const pagenate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize + 1;
  return { offset, limit };
};

router.get('/', (req, res, next) => {
  res.redirect('/home/1');
});

router.get('/:page', async (req, res, next) => {
  let { page } = req.params;
  if (page < 1) page = 1;
  page -= 1;
  const pageSize = 10;

  const items = await db.item.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    include: {
      model: db.user,
      require: true,
    },
    ...pagenate({ page, pageSize }),
  });

  const hasNextPage = items.length > pageSize;
  const resItems = hasNextPage ? items.slice(0, -1) : items;
  res.render('home', {
    items: resItems,
    title: 'Home',
    markdown,
    pagenate: {
      page: page + 1,
      hasNextPage,
    },
  });
});

module.exports = router;
