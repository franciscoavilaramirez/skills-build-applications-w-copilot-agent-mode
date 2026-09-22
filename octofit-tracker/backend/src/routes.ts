import { Router } from 'express';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/teams/', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('members', 'username name').sort({ points: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/activities/', async (_request, response, next) => {
  try {
    response.json(await Activity.find().populate('user', 'username name').sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/leaderboard/', async (_request, response, next) => {
  try {
    response.json(
      await Leaderboard.find()
        .populate('user', 'username name')
        .populate('team', 'name')
        .sort({ rank: 1 }),
    );
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/workouts/', async (_request, response, next) => {
  try {
    response.json(await Workout.find().sort({ difficulty: 1, title: 1 }));
  } catch (error) {
    next(error);
  }
});

export default apiRouter;
