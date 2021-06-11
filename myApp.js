require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String]
});

var Person =  mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var person = new Person({name: "Jack", age: 21, favoriteFoods: ["pizza", "ice cream", "cake"]});
  
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  })
};

var findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
};

var findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if(err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
