const mongoose = require('mongoose');
const { db, env } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(db[env]);

const Bar      = require('../models/bar');
const User      = require('../models/user');

Bar.collection.drop();
User.collection.drop();

User.create([{
  username: 'Tony',
  email: 'tony@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
  // type: 'User'
}])
  .then((users) => {
    console.log(`${users.length} users created!`);
    return Bar.create([{
      name: 'George Payne',
      email: 'barry@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://media.timeout.com/images/102872216/image.jpg',
      addressLine1: '5 Plaza Urquinaona',
      city: 'Barcelona',
      postcode: '08010',
      location: {
        lat: 41.38955155924843,
        lng: 2.172895073890686
      },
      fixtures: [],
      description: 'The George Payne Irish Bar. The best party in Barcelona. We are open all day with the finest food and drink deals in Catalunya. Great pub food, fantastic music and a wide selection of beer. '
    },{
      name: 'Grizzly 72 Sports Bar',
      email: 'billy@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://static1.squarespace.com/static/586eccb6f5e23106781c0aba/t/5873e498c534a5d5acca4bbb/1483990213104/tvs+and+flags.jpg?format=2500w',
      addressLine1: 'Gran Via De Les Corts Catalans',
      city: 'Barcelona',
      postcode: '08011',
      location: {
        lat: 41.38495132876046,
        lng: 2.163032591342926
      },
      fixtures: [],
      description: 'Grizzly 72 Sports Bar. The best party in Barcelona. We are open all day with the finest food and drink deals in Catalunya. Great pub food, fantastic music and a wide selection of beer. '
    },{
      name: 'Shenanigans',
      email: 'gary@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://www.shenanigansbarcelona.com/blog/wp-content/uploads/2014/11/Quiet-Man-Pub-Barcelona-2-702x336.jpg',
      addressLine1: '11 Carrer Marques de Barbara',
      city: 'Barcelona',
      postcode: '08001',
      location: {
        lat: 41.37858774383501,
        lng: 2.1726885437965393
      },
      fixtures: [],
      description: 'Friendly family-owned Irish pub in the centre of Barcelona. Come and enjoy the great craic, live sports, friendly staff & our huge selection of beers.'
    },{
      name: 'Dunne\'s Irish Bar and Restaurant',
      email: 'roy@ga.co',
      password: 'password',
      passwordConfirmation: 'password',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/06/6b/8a/a5/caption.jpg',
      addressLine1: '19 Via Laietana',
      city: 'Barcelona',
      postcode: '08003',
      location: {
        lat: 41.383635192444245,
        lng: 2.178884446620941
      },
      fixtures: [],
      description: 'Dunne\'s Irish Pub and Restaurant is a replication of some of the authentic elements that make the great pubs of Ireland truly unique. This pub and restaurant has high vaulted ceilings with newly replicted authenticate wooden bars and a stunningly beautiful wooden floor. Born of painstaking attention to decorative detail and insistence on true craftsmanship, this Irish pub is pleasing to the eye as well as to the palette. We hope to provide you with a place of solace away from the hustle and bustle of Barcelona city life where you and your friends can enjoy the friendly, buzzing atmosphere.'
    }]);
  })
  .then((bars) => {
    console.log(`${bars.length} bars created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
