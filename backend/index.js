import express from 'express';
import cors from 'cors';
import sql from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/stocks', async(req, res) => {
    try {
        const stocks = await sql`SELECT * FROM Stocks`;
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/dates', async(req, res) => {
    try {
        const dates = await sql`SELECT DISTINCT date FROM Stocks`;
        res.json(dates);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/:id/:startdate/:enddate', async(req, res) => {
    try {
        const { id, startdate, enddate } = req.params;
        const stocks = await sql`SELECT * FROM Stocks WHERE Stocks.SYMBOL = ${id} AND DATE(Stocks.DATE) BETWEEN ${startdate} AND ${enddate}`;
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/:id/:date', async(req, res) => {
    try {
        const { id, date } = req.params;
        const stocks = await sql`SELECT * FROM Stocks WHERE DATE(Stocks.DATE)=${date} AND Stocks.SYMBOL IN (SELECT unnest(string_to_array(${id}, ',')))`;
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/popular', async (req, res) => {
    try {
        const result = await sql`
            SELECT t.SYMBOL FROM 
                (SELECT SYMBOL, SUM(TOTTRDQTY) AS total_traded_quantity
                FROM Stocks
                GROUP BY SYMBOL
                ORDER BY total_traded_quantity DESC
                LIMIT 10) as t
        `;
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node Server is running on port ${PORT}`);
});