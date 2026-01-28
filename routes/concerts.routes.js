const express = require('express');
const router = express.Router();
const db = require('./../db');
const { randomUUID } = require('crypto');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter((e) => e.id === Number(req.params.id)));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res
      .status(400)
      .json({ message: 'performer, genre, price, day and image are required' });
  }

  const newConcert = {
    id: randomUUID(),
    performer,
    genre,
    price,
    day,
    image,
  };

  db.concerts.push(newConcert);

  res.status(201).json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = Number(req.params.id);

  if (!performer || !genre || !price || !day || !image) {
    return res
      .status(400)
      .json({ message: 'performer, genre, price, day and image are required' });
  }

  const index = db.concerts.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.concerts[index] = {
    id,
    performer,
    genre,
    price,
    day,
    image,
  };

  res.status(200).json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const id = Number(req.params.id);
  const index = db.concerts.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.concerts.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;