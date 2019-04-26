    
const Database = require('./Database');
const credentialManager = require('../../../credentials/credentialManager');
const username = process.env.dbUser || credentialManager.dbUser;
const password = process.env.dbPassword || credentialManager.dbPassword;

const connectionstring = `mongodb://${username}:${password}@ds147926.mlab.com:47926/chatdb`;
const database = new Database(connectionstring);

module.exports = database;