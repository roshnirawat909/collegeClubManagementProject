const express = require('express');
const Club = require('../models/Club');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all clubs (with demo data fallback)
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('members');
    if (clubs.length === 0) {
      // Demo data from seedClubs.js
      const demoClubs = [
        {
          name: 'Coding Club',
          description: 'Learn programming, participate in hackathons, and build real projects with peers.',
          president: 'Alice Johnson',
          coordinators: 'Bob Smith, Carol Davis',
          members: [],
          _id: 'demo-coding'
        },
        {
          name: 'Robotics Society',
          description: 'Build robots, compete in competitions, explore AI & automation technologies.',
          president: 'David Wilson',
          coordinators: 'Eve Brown, Frank Miller',
          members: [],
          _id: 'demo-robotics'
        },
        {
          name: 'Cultural Club',
          description: 'Celebrate traditions, organize festivals, promote cultural diversity on campus.',
          president: 'Grace Lee',
          coordinators: 'Henry Garcia, Ivy Martinez',
          members: [],
          _id: 'demo-cultural'
        },
        {
          name: 'Sports Committee',
          description: 'Organize tournaments, fitness drives, inter-club sports events.',
          president: 'Jack Rodriguez',
          coordinators: 'Karen White, Leo Hall',
          members: [],
          _id: 'demo-sports'
        },
        {
          name: 'Music Society',
          description: 'Jam sessions, concerts, music workshops, band competitions.',
          president: 'Mia Scott',
          coordinators: 'Noah Green, Olivia Adams',
          members: [],
          _id: 'demo-music'
        },
        {
          name: 'Photography Committee',
          description: 'Learn photography, participate in contests, campus event coverage.',
          president: 'Paul Baker',
          coordinators: 'Quinn Clark, Rachel Evans',
          members: [],
          _id: 'demo-photo'
        }
      ];
      res.json(demoClubs);
    } else {
      res.json(clubs);
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create club (admin)
router.post('/', auth, async (req, res) => {
  try {
    const club = new Club(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Join club
router.post('/:id/join', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ msg: 'Club not found' });
    
    const userId = req.user.id; // from auth middleware
    if (club.members.includes(userId)) {
      return res.status(400).json({ msg: 'Already joined' });
    }
    
    club.members.push(userId);
    await club.save();
    res.json(club);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Leave club
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ msg: 'Club not found' });
    
    const userId = req.user.id;
    club.members = club.members.filter(id => id.toString() !== userId);
    await club.save();
    res.json(club);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

