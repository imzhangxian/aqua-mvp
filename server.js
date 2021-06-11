const express = require('express');
const mongoose = require('mongoose');

const plants = require('./routes/api/plants.js');
const facilities = require('./routes/api/facilities.js');
const equipments = require('./routes/api/equipments.js');
const login = require('./routes/login.js');
const auth = require('./middleware/auth');

const path = require('path');

const app = express();

app.use(express.json());

// db uri
const db = require('./config/keys.js').mongouri;

// connect db
mongoose
  .connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("DB connected."))
  .catch(err => console.log(err));

// routes
app.use('/api', auth);
app.use('/api/plants', plants);
app.use('/api/facilities', facilities);
app.use('/api/equipments', equipments);
app.use('/login', login)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

// start server
app.listen(port, () => console.log(`Server started listening on port ${port}`));
