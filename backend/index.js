const express = require('express');
const app = express();
const pool = require('./db');

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/stocks', async(req, res) => {
    try {
        const stocks = await pool.query('SELECT * FROM Stocks');
        res.json(stocks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/dates', async(req, res) => {
    try {
        const dates = await pool.query('SELECT DISTINCT date FROM Stocks');
        res.json(dates.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/:id/:startdate/:enddate', async(req, res) => {
    try {
        const { id, startdate, enddate } = req.params;
        const stocks = await pool.query('SELECT * FROM Stocks WHERE Stocks.SYMBOL = $1 AND DATE(Stocks.DATE) BETWEEN $2 AND $3', [id, startdate, enddate]);
        res.json(stocks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/:id/:date', async(req, res) => {
    try {
        const { id, date } = req.params;
        const stocks = await pool.query('SELECT * FROM Stocks WHERE DATE(Stocks.DATE)=$1 AND Stocks.SYMBOL IN (SELECT unnest(string_to_array($2, $3)))', [date, id, ',']);
        res.json(stocks.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/stocks/popular', async (req, res) => {
    try {
        const query = `
            SELECT t.SYMBOL FROM 
                (SELECT SYMBOL, SUM(TOTTRDQTY) AS total_traded_quantity
                FROM Stocks
                GROUP BY SYMBOL
                ORDER BY total_traded_quantity DESC
                LIMIT 10) as t;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(3000, (req, res) => {
    console.log('Node Server is running on port 3000');
});