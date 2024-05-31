require('dotenv').config({ path: './config/.env' });

module.exports = {
    port: process.env.PORT,
    dbURI: process.env.DBURI,
    secret_jwt: process.env.SECRET,
}