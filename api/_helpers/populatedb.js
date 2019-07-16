var Animal = require('models/animal');
var Breed = require('models/breed');
var Specie = require('models/specie');
var Role = require('models/role');
var User = require('models/user');
var Roles = require('models/user');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {
    populate: function () {
        var roles = [{ title: "Admin" }, { title: "Vet" }, { title: "User" }];
        var dogBreeds = [{ name: "Bulldog", name_PT: "Bulldog" }, { name: "German Shepherd", name_PT: "Pastor Alemão" }];
        var species = [{ name: "Dog", name_PT: "Cão", breeds: dogBreeds }];

        Role.countDocuments({}, function (err, count) {
            if (count != 0 || err) return;
            Role.insertMany(roles, function (err) {
                if (err) return;
                User.findOne({ 'email': 'admin@adotaqui.cf' }, function (err, user) {
                    if (user || err) return;
                    Role.findOne({ 'title': "Admin" }, function (err, role) {
                        if (err || !role) return;
                        var adminUser = new User();
                        adminUser.email = 'admin@adotaqui.cf';
                        adminUser.password = adminUser.generateHash('Admin1!');
                        adminUser.name = 'Administrador';
                        adminUser.emailconfirmed = true;
                        adminUser.birthdate = null;
                        adminUser.phonenumber = null;
                        adminUser.role = role._id;
                        adminUser.save();
                    });
                });
            });
        });

        Specie.countDocuments({}, function (err, count) {
            if (count != 0 || err) return;
            Breed.countDocuments({}, function (err, count) {
                if (count == 0 && !err) {
                    species.forEach(specieElem => {
                        Breed.insertMany(specieElem.breeds, function (err, docs) {
                            if (err) return
                            var breedIds = [];
                            docs.forEach(doc => breedIds.push(doc._id));
                            var specie = new Specie();
                            specie.name = specieElem.name;
                            specie.name_PT = specieElem.name_PT;
                            specie.breeds = breedIds.map(it => new ObjectId(it));
                            specie.save();
                        });
                    });
                }
            });
        });

        Animal.countDocuments({}, function (err, count) {
            if (count != 0 || err) return;
            var animal = new Animal();
            animal.name = "Chubby";
            animal.gender = 1;
            animal.breed = new ObjectId(Breed.findOne({ 'name': "Bulldog" })._id);
            animal.height = 30;
            animal.weight = 150;
            animal.birthday = "02/06/1999";
            animal.save();
        });
    }
};