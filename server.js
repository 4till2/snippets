require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const Snippet = require('./db/snippet');
const Tag = require('./db/tag');

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
console.log(process.env.NODE_ENV)

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@cluster0-jvgsl.mongodb.net/AB-SNIPPETS?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this is our get method
// this method fetches all available data in our database
router.get('/getSnippets', (req, res) => {
  Snippet.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateSnippet', (req, res) => { console.log('updating....')
  const { 
    objid,    
    title,
    description,
    tags,
    jscode,
    csscode,
    placement,
    author } = req.body;

  if ((!objid && objid !== 0) || !title || !description || !tags || (!jscode && !csscode) || !author) {
    console.log('Invalid Inputs')
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }

  Snippet.update(
    {_id: objid},
    {
      $set: {
        title : title,
        description : description,
        tags : tags,
        jscode : jscode,
        csscode : csscode,
        placement : placement,
        author : author
      }
    },
    (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteSnippet', (req, res) => {
  const { id } = req.body;
  Snippet.findByIdAndDelete(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create method
// this method adds new data in our database
router.post('/putSnippet', (req, res) => {
  let data = new Snippet();
  
  const   {
    id,
    title,
    description,
    tags,
    jscode,
    csscode,
    placement,
    author 
  } = req.body;
  if ((!id && id !== 0) || !title || !description || !tags || (!jscode && !csscode) || !author) {
    console.log('Invalid Inputs')
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.id = id;
  data.title = title;
  data.description = description;
  data.tags = tags;
  data.jscode = jscode;
  data.csscode = csscode;
  data.placement = placement;
  data.author = author;

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.get('/', function(req, res) {
  res.sendFile('index.html', {root: './client/public/'});
});

app.use('/api', router);

// launch our backend into a port
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});