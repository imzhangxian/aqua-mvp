const express = require('express');
const mongoose = require('mongoose');

const meters = require('./routes/api/meters.js')
const stations = require('./routes/api/stations.js')

const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

// db uri
const db = require('./config/keys.js').mongouri;

// connect db
mongoose
  .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("DB connected."))
  .catch(err => console.log(err));

// routes
app.use('/api/meters', meters);
app.use('/api/stations', stations);

const port = 5000;

// start server
app.listen(port, () => console.log(`Server started listening on port ${port}`));
