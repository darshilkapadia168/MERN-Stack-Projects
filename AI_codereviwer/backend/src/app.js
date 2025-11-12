const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

const app = express();

app.use(cors())

app.use(express.json());

app.use('/', aiRoutes);

module.exports = app