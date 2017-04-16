const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.set('port', process.env.PORT || 5000);
app.locals.title = 'Garage Bin'


app.get('/', (request, response) => {
  response.sendFile("/build/" + "index.html" )
})

app.get('/api/v1/items/', (request, response) => {
  database('items').select()
  .then(function(items){
    response.status(200).json(items);
  })
  .catch(function(error) {
    console.error('somethings wrong with db')
  });
})

app.post('/api/v1/items/', (request, response) => {
  const {name, reason, cleanliness} = request.body
  const item = { name, reason, cleanliness, created_at: new Date }
  database('items').insert(item)
  .then(function(){
    database('items').select()
    .then(function(items){
      response.status(200).json(items);
    })
    .catch(function(error) {
      console.error('somethings wrong with db')
    });
  })
})

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app;
