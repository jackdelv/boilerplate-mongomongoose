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
  });
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

var findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    });
  });
};

var findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

var removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person) {
    if (err) return console.error(err);
    done(null, person);
  });
};

var removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

var queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: "asc"}).limit(2).select("-age").exec(
    function(err, data) {
      if (err) return console.error(err);
      done(err, data);
    });
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
