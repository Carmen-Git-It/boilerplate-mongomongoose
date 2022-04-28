require('dotenv').config();
const { model } = require('mongoose');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) {
    console.log("Error connecting to database.");
  }
});

var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [ {type: String} ]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({name: "Billy Joel", age: 80, favoriteFoods: ["pizza", "chilli cheese fries"]});
  
  person.save((err, data) => {
    if (err) {
      return err;
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, (err, data) =>{
    if (err) {
      return err;
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err){
      return err;
    }
    else {
      done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) {
      return err;
    } else {
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) {
      return err;
    } else {
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({_id: personId}, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedPerson) => {
        if (err) {
          console.log(err);
        } else {
          done(null, updatedPerson);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true}, (err, person) => {
    if (err) {
      console.log(err);
    }
    else {
      done(null, person);
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) {
      console.log(err);
    } else {
      done(null, person);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      done(null, data);
    }
  });
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
