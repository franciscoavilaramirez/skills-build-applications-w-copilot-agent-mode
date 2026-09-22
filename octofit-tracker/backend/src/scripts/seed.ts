import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'ava.runner',
        email: 'ava@example.com',
        name: 'Ava Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'liam.lifts',
        email: 'liam@example.com',
        name: 'Liam Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'sofia.yoga',
        email: 'sofia@example.com',
        name: 'Sofia Patel',
        avatar: 'https://i.pravatar.cc/150?img=32',
      },
    ]);

    const teams = await Team.create([
      { name: 'Summit Striders', members: [users[0]._id, users[1]._id], points: 410 },
      { name: 'Mindful Motion', members: [users[2]._id], points: 275 },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 42,
        points: 120,
        completedAt: new Date('2026-09-20T07:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength training',
        durationMinutes: 50,
        points: 145,
        completedAt: new Date('2026-09-20T18:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Yoga',
        durationMinutes: 35,
        points: 95,
        completedAt: new Date('2026-09-21T08:00:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 185, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 155, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 95, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Trail-ready intervals',
        type: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 30,
        exercises: ['Warm-up jog', 'Four 400m intervals', 'Cool-down walk'],
      },
      {
        title: 'Foundations of strength',
        type: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Dead bugs'],
      },
      {
        title: 'Reset and restore',
        type: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Cat-cow', 'Low lunge', 'Seated forward fold'],
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
