const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect(err => {
    if (err) {
        console.log(err.message);
    } else {
        // console.log(`db ${connection.state}`);
    }
})

let instance = null;

class DbService {

    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAll() {
        try {
            const response = await new Promise( (resolve, reject) => {
                const query = 'SELECT * FROM crud_data';
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        } catch (err) {
            console.log(err.message);
        }
    }
}

module.exports = DbService;