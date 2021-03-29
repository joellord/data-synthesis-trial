const mysql = require("mysql8");

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306
};
const pool = mysql.createPool(dbConfig);

const query = (sql, params = []) => {
  let p = new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
  return p;
};

const queryOne = async (sql, params = []) => {
  let result = await query(sql, params).catch(e => console.error(`Error fetching ${e}`, sql));
  // if (result.length === 0) console.log(sql, params);
  // console.log(result);
  return result[0];
};

const getObject = async (table, key, id) => {
  let sql = `SELECT * FROM ${table}`;
  if (id) sql += ` WHERE ${key} = ?`;
  else sql += " ORDER BY RAND() LIMIT 1";
  let result = await queryOne(sql, id);
  return rowToJSON(result);
}

const rowToJSON = row => {
  return JSON.parse(JSON.stringify(row));
}

const getABABanking = async id => {
  return await getObject("dataexisting_ababanking", "ABABankingID", id)
}

const getAreaCode = async id => {
  return await getObject("dataexisting_areacode", "AreaCodeID", id);
}

const getAreaCodeForState = async state => {
  let sql = `SELECT * FROM dataexisting_areacode WHERE StateCode = ?`;
  let result = await queryOne(sql, [state]);
  return rowToJSON(result);
}

const getCompany = async id => {
  return await getObject("dataexisting_companies", "CompaniesID", id);
}

const getNameFirst = async id => {
  return await getObject("dataexisting_namefirst", "FirstNameID", id);
}

const getNameLast = async id => {
  return await getObject("dataexisting_namelast", "LastNameID", id);
}

const getUPCCode = async id => {
  return await getObject("dataexisting_upccodes", "UPCCodeID", id);
}

const getZipCodeUS = async id => {
  return await getObject("dataexisting_zipcodeus", "ZipCodeID", id);
}

const getAddress = async id => {
  return await getObject("datagenerated_addresses", "AddressID", id);
}

const getBankAccount = async id => {
  return await getObject("datagenerated_bankaccount", "BankAccountsID", id);
}

const getCreditCard = async id => {
  return await getObject("datagenerated_creditcard", "CreditCardID", id);
}

const getDateOfBirth = async id => {
  return await getObject("datagenerated_dateofbirth", "DateofBirthsID", id);
}

const getDriversLicense = async id => {
  return await getObject("datagenerated_driverslicenses", "DriversLicensesID", id);
}

const getDriversLicenseForState = async state => {
  let sql = `SELECT * FROM datagenerated_driverslicenses WHERE StateCode = ?`;
  let result = await queryOne(sql, [state]);
  return rowToJSON(result);
}

const getPhoneNumbers = async id => {
  let data = await getObject("datagenerated_phonenumber", "PhoneNumberID", id);
  return data;
}

const getSocialSecurityNumber = async id => {
  let data = await getObject("datagenerated_socialsecuritynumber", "SocialSecurityNumberID", id);
  return data;
}

module.exports = {
  getABABanking,
  getAreaCode,
  getAreaCodeForState,
  getCompany,
  getNameFirst,
  getNameLast,
  getUPCCode,
  getZipCodeUS,
  getAddress,
  getBankAccount,
  getCreditCard,
  getDateOfBirth,
  getDriversLicense,
  getDriversLicenseForState,
  getPhoneNumbers,
  getSocialSecurityNumber
}