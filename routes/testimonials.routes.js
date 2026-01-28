const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.testimonals);
});

router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonals.length);
  res.json(db.testimonals[randomIndex]);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const testimonial = db.testimonals.find(t => t.id === id);

  if (!testimonial) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(testimonial);
});

router.post('/', (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  const newTestimonial = {
    id: Math.floor(Math.random() * 1000000),
    author,
    text,
  };

  db.testimionals.push(newTestimonial);

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { author, text } = req.body;

  const testimonial = db.testimonals.find(t => t.id === id);

  if (!testimonial) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  testimonial.author = author;
  testimonial.text = text;

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.testimonals.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.testimonals.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
