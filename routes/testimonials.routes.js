const express = require('express');
const router = express.Router();
const db = require('./../db');
const { randomUUID } = require('crypto');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter((e) => e.id === Number(req.params.id)));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  const newTestimonial = {
    id: randomUUID(),
    author,
    text,
  };

  db.testimonials.push(newTestimonial);

  res.status(201).json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const id = Number(req.params.id);

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  const index = db.testimonials.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.testimonials[index] = {
    id,
    author,
    text,
  };

  res.status(200).json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const id = Number(req.params.id);
  const index = db.testimonials.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.testimonials.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;