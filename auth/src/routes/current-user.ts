// import express from 'express';

// const router = express.Router();

// router.get('/api/users/currentuser', (req, res) => {
//   res.send('Hi there!');
// });

// export { router as currentUserRouter };

import { currentUser } from '@udemy-ticket/common';
import express from 'express';


const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
