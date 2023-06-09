import { getAdditionEquations } from './equationFactory.js';
import { formatPlain } from './renderer.js';

import express from 'express';
import cors from 'cors';
//const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
router = express.Router();

app.use('/', router);

const withCarry = getAdditionEquations(50, 10000, {includeCarry: true, includeNoCarry: false});
const noCarry = getAdditionEquations(50, 10000, {includeCarry: false, includeNoCarry: true});
const mixedCarry = getAdditionEquations(50, 10000, {includeCarry: true, includeNoCarry: true});

console.log(formatPlain(withCarry, '+'));

app.listen(PORT, () => {
  console.log();
});
