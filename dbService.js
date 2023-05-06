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

    async insertNewRow(name) {
        try {
            let dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = `INSERT INTO crud_data (Name, Date)
                                VALUES (?, ?)`;
                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            return {
                ID: insertId,
                Name: name,
                Date: dateAdded,
            };
        } catch (err) {
            console.log(err.message);
        }
    }

    async deleteRow(id) {

    }
}

module.exports = DbService;