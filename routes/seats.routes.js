const express = require('express');
const router = express.Router();
const db = require('./../db');
const { randomUUID } = require('crypto');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((e) => e.id === Number(req.params.id)));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res
      .status(400)
      .json({ message: 'day, seat, client and email are required' });
  }

  if (db.seats.some((s) => s.day === Number(day) && s.seat === Number(seat))) {
    return res.status(403).json({ message: 'The slot is already taken...' });
  }

  const newSeats = {
    id: randomUUID(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeats);

  res.status(201).json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = Number(req.params.id);

  if (!day || !seat || !client || !email) {
    return res
      .status(400)
      .json({ message: 'day, seat, client and email are required' });
  }

  const index = db.seats.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.seats[index] = {
    id,
    day,
    seat,
    client,
    email,
  };

  res.status(200).json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const id = Number(req.params.id);
  const index = db.seats.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.seats.splice(index, 1);

  return res.json({ message: 'OK' });
});

module.exports = router;