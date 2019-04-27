    
const Database = require('./Database');
const username = process.env.dbUser || 
    require('../../../credentials/credentialManager').dbUser;
const password = process.env.dbPassword || 
    require('../../../credentials/credentialManager').dbPassword;

const connectionstring = `mongodb://${username}:${password}@ds147926.mlab.com:47926/chatdb`;
const database = new Database(connectionstring);

module.exports = database;