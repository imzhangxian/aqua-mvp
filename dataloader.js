const mongoose = require('mongoose');
const Plant = require('./models/Plant');

const db =
    "mongodb://localhost:27017/mvp";

mongoose
    .connect(db,
        { useNewUrlParser: true, useUnifiedTopology: true });
    // .then(() => console.log("DB connected."))
    // .catch(err => console.log(err));
console.log("DB connected.");

const plant = new Plant({
    name: "No.1 Sewage Treatment Plant",
    number: "P01",
    address: "No.90 Dongzhimen, Chaoyang, Beijing",
    location: {
      latitude: 31.33,
      longitude: 112.01,
    },
    stages: [
      {
        type: "pre-treatment",
        name: "Pre-treatment stage",
        sequence: 01,
        influent: {
          flow: 1.5,
          cod: 7.2,
          bod: 3.1,
          orp: 2.2,
          temperature: 15,
          ph: 6.2,
          ss: 9.3
        },
        processing: {
          volume: 1995,
          cod: 22,
          bod: 30
        },
        effluent: {
          flow: 0
        }
      },
      {
        type: "primary",
        name: "Primary stage",
        sequence: 02,
        influent: {
          flow: 0
        },
        processing: {
          volume: 3032,
          cod: 22,
          bod: 30
        },
        effluent: {
          flow: 3.2,
          cod: 3.2,
          bod: 0.3,
          orp: 0.1,
          temperature: 20,
          ph: 5.2
        }
      }
    ]
  });

plant.save()
  .then(console.log("sample plant loaded."))
  .catch(err => console.log(err));
