import { Request, Response } from 'express'
import { resolve } from "path";

const sqlite3 = require('sqlite3').verbose();

class CheckConnection {
    async ping(request: Request, response: Response) {
        const absolutePath = resolve(__dirname, "database_zipcode.sqlite");

        let db = new sqlite3.Database(absolutePath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return response.status(500).json({ status: "Database not connected." });
            } else {
                return response.status(200).json({ status: "Connected to the database." });
            }
        });
        db.close();
    }
}

export default CheckConnection;