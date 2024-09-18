// Chat-GPT showed the following code and how to set up backend Express
// server to retrieve our secret keys.
// You can't use node modules to load in keys in Angular according to
// Chat-GPT and this site:
// https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility.

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: true}));

const secrets = {
  zillowkey: functions.config()["zillow"].key,
  apiKey: functions.config()["firekey"].apikey,
  authDomain: functions.config()["fire"].authdomain,
  projectId: functions.config()["fire"].projectid,
  storageBucket: functions.config()["fire"].storagebucket,
  messagingSenderId: functions.config()["fire"].messagingsenderid,
  appId: functions.config()["fire"].appid,
};

app.get("/gatherConfig", (req, res) => {
  res.json(secrets);
  console.log(secrets);
});

exports.api = functions.https.onRequest(app);
