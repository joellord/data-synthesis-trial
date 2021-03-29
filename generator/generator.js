const api = require("./api");

class DataGenerator {
  constructor() {
    
  }

  async generatePerson () {
    let person = {};
    const firstName = await api.getNameFirst();
    person.firstName = firstName.FirstName;
    person.gender = firstName.Gender;
    const lastName = await api.getNameLast();
    person.lastName = lastName.LastName;
    person.fullName = `${person.firstName} ${person.lastName}`;
    const dob = await api.getDateOfBirth();
    person.dob = dob.DateOfBirth;
    const zip = await api.getZipCodeUS();
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
    const address = await api.getAddress();
    person.address.address = address.AddressStreet
    const areaCode = await api.getAreaCodeForState(person.address.state);
    const phoneNumber1 = await api.getPhoneNumbers();
    const phoneNumber2 = await api.getPhoneNumbers();
    person.phone = {
      mobile: `(${areaCode.AreaCodeValue}) ${phoneNumber1.PhoneNumberValue}`,
      home: `(${areaCode.AreaCodeValue}) ${phoneNumber2.PhoneNumberValue}`
    };
    const ssn = await api.getSocialSecurityNumber();
    person.ssn = ssn.SocialSecurityNumberValue;
    const dln = await api.getDriversLicenseForState(person.address.state);
    person.driversLicense = dln.DLN;
    return person;
  }
}

module.exports = DataGenerator;