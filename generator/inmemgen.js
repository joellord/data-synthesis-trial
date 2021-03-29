const firstNames = require("./jsondata/namefirst.json");
const lastNames = require("./jsondata/namelast.json");
const dateOfBirths = require("./jsondata/dateofbirth.json");
const zipCodes = require("./jsondata/zipcodeus.json");
const addresses = require("./jsondata/addresses.json");
const areaCodes = require("./jsondata/areacode.json");
const phoneNumbers = require("./jsondata/phonenumber.json");
const socialSecurityNumbers = require("./jsondata/socialsecuritynumber.json");
const driversLicenses = require("./jsondata/driverslicenses.json");

const getRandomItem = (table, criteria = {}) => {
  let keys = Object.keys(criteria);
  if (keys.length > 0) {
    table = table.find(i => {
      for (let i = 0; i < keys.length; i++) {
        if (i[keys[i]] !== criteria[keys[i]]) return false
      }
      return true;
    });
  }
  let max = table.length;
  let id = Math.round(Math.random()*max);
  return table[id];
}

class DataGenerator {
  constructor() {
    
  }

  async generatePerson () {
    let person = {};
    const firstName = getRandomItem(firstNames);
    person.firstName = firstName.FirstName;
    person.gender = firstName.Gender;
    const lastName = getRandomItem(lastNames);
    person.lastName = lastName.LastName;
    person.fullName = `${person.firstName} ${person.lastName}`;
    const dob = getRandomItem(dateOfBirths);
    person.dob = dob.DateOfBirth;
    const zip = getRandomItem(zipCodes);
    person.address = {
      zip: zip.ZipCode,
      city: zip.City,
      state: zip.State,
      coords: {
        lat: zip.Lattitude,
        lon: zip.Longitude
      },
      location: zip.Location
    }
    const address = getRandomItem(addresses);
    person.address.address = address.AddressStreet
    const areaCode = getRandomItem(areaCodes);
    const phoneNumber1 = getRandomItem(phoneNumbers);
    const phoneNumber2 = getRandomItem(phoneNumbers);
    person.phone = {
      mobile: `(${areaCode.AreaCodeValue}) ${phoneNumber1.PhoneNumberValue}`,
      home: `(${areaCode.AreaCodeValue}) ${phoneNumber2.PhoneNumberValue}`
    };
    const ssn = getRandomItem(socialSecurityNumbers);
    person.ssn = ssn.SocialSecurityNumberValue;
    const dln = getRandomItem(driversLicenses);
    person.driversLicense = dln.DLN;
    return person;
  }
}

module.exports = DataGenerator;