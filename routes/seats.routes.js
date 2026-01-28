const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.seats);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const seat = db.seats.find(s => s.id === id);

  if (!seat) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(seat);
});

router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      message: 'day, seat, client and email are required',
    });
  }

  const newSeat = {
    id: Math.floor(Math.random() * 1000000),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeat);

  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { day, seat, client, email } = req.body;

  const seatItem = db.seats.find(s => s.id === id);

  if (!seatItem) {
    return res.status(404).json({ message: 'Not found' });
  }

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      message: 'day, seat, client and email are required',
    });
  }

  seatItem.day = day;
  seatItem.seat = seat;
  seatItem.client = client;
  seatItem.email = email;

  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.seats.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.seats.splice(index, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
