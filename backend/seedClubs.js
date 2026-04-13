const mongoose = require('mongoose');
const Club = require('./models/Club');
const server = require('./server.js');

const seedClubs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing
    await Club.deleteMany({});
    
    const clubs = [
      {
        name: 'Coding Club',
        description: 'Learn programming, participate in hackathons, and build real projects with peers.',
        president: 'Alice Johnson',
        coordinators: 'Bob Smith, Carol Davis',
      },
      {
        name: 'Robotics Society',
        description: 'Build robots, compete in competitions, explore AI & automation technologies.',
        president: 'David Wilson',
        coordinators: 'Eve Brown, Frank Miller',
      },
      {
        name: 'Cultural Club',
        description: 'Celebrate traditions, organize festivals, promote cultural diversity on campus.',
        president: 'Grace Lee',
        coordinators: 'Henry Garcia, Ivy Martinez',
      },
      {
        name: 'Sports Committee',
        description: 'Organize tournaments, fitness drives, inter-club sports events.',
        president: 'Jack Rodriguez',
        coordinators: 'Karen White, Leo Hall',
      },
      {
        name: 'Music Society',
        description: 'Jam sessions, concerts, music workshops, band competitions.',
        president: 'Mia Scott',
        coordinators: 'Noah Green, Olivia Adams',
      },
      {
        name: 'Photography Committee',
        description: 'Learn photography, participate in contests, campus event coverage.',
        president: 'Paul Baker',
        coordinators: 'Quinn Clark, Rachel Evans',
      },
    ];

    await Club.insertMany(clubs);
    console.log('✅ Seeded 5 clubs successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seedClubs();

