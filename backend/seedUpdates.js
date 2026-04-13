const mongoose = require('mongoose');
const Update = require('./models/Update');
const User = require('./models/User');

const seedUpdates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing
    await Update.deleteMany({});

    // Find or create dummy author
    let author = await User.findOne({ email: 'admin@college.com' });
    if (!author) {
      author = new User({
        name: 'Admin',
        email: 'admin@college.com',
        role: 'admin'
      });
      await author.save();
    }

    const updates = [
      {
        title: 'Meeting Tomorrow',
        content: 'Discuss upcoming events and club activities for the semester. All club presidents and coordinators are requested to attend. Agenda will be shared via email.',
        category: 'Meeting',
        date: '2024-12-19',
        author: author._id
      },
      {
        title: 'Annual Fest Registration',
        content: 'Register now for the biggest college fest of the year! Multiple competitions, workshops, and cultural events. Registration closes in 3 days.',
        category: 'Event',
        date: '2024-12-15',
        author: author._id
      },
      {
        title: 'New Club Inauguration',
        content: 'Photography club will be inaugurated by the Principal on Thursday. All members welcome. Free camera workshop will follow the ceremony.',
        category: 'Announcement',
        date: '2024-12-10',
        author: author._id
      },
      {
        title: 'Sports Day Registration',
        content: 'Participate in various sports events and win exciting prizes. Cricket, football, badminton, volleyball, and athletics. Teams forming now!',
        category: 'Event',
        date: '2024-12-05',
        author: author._id
      }
    ];

    await Update.insertMany(updates);
    console.log('✅ Seeded 4 updates successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
};

seedUpdates();

