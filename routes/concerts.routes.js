const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.concerts);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const concert = db.concerts.find(c => c.id === id);

  if (!concert) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(concert);
});

router.post('/', (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({
      message: 'performer, genre, price, day and image are required',
    });
  }

  const newConcert = {
    id: Math.floor(Math.random() * 1000000),
    performer,
    genre,
    price,
    day,
    image,
  };

  db.concerts.push(newConcert);

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { performer, genre, price, day, image } = req.body;

  const concert = db.concerts.find(c => c.id === id);

  if (!concert) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({
      message: 'performer, genre, price, day and image are required',
    });
  }

  concert.performer = performer;
  concert.genre = genre;
  concert.price = price;
  concert.day = day;
  concert.image = image;

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.concerts.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.concerts.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
