from nsepy.history import get_price_list
import argparse
import datetime
import pandas as pd
import psycopg2
import psycopg2.extras
import random

# Argument Parser
parser = argparse.ArgumentParser(description='NSE data downloader')
parser.add_argument('--start', type=str, default='2021-01-01', help='Start date')
parser.add_argument('--end', type=str, default='2021-01-10', help='End date')
args = parser.parse_args()

# Generate date range
dates = pd.date_range(start=args.start, end=args.end, freq='D')
num_dates = len(dates)

# Define stock symbols
symbols = [f"STOCK{i}" for i in range(1, 101)]  # 100 unique stock symbols
num_symbols = len(symbols)

# Calculate total records
total_records = num_dates * num_symbols

# Adjust number of symbols if total records exceed 500
if total_records > 500:
    num_symbols = 500 // num_dates
    symbols = symbols[:num_symbols]

# Generate dummy data
dummy_data = []
for date in dates:
    for symbol in symbols:
        open_price = round(random.uniform(100, 500), 2)
        high_price = round(open_price * random.uniform(1.01, 1.05), 2)
        low_price = round(open_price * random.uniform(0.95, 0.99), 2)
        close_price = round(random.uniform(low_price, high_price), 2)
        last_price = close_price
        prev_close = round(open_price * random.uniform(0.95, 1.05), 2)
        tot_trd_qty = random.randint(1000, 50000)
        tot_trd_val = round(tot_trd_qty * close_price, 2)
        total_trades = random.randint(10, 500)
        isin = f"INE{random.randint(100000, 999999)}010"
        dummy_data.append([
            symbol, 'EQ', open_price, high_price, low_price, close_price,
            last_price, prev_close, tot_trd_qty, tot_trd_val,
            date.strftime('%Y-%m-%d'), total_trades, isin,
            date.strftime('%Y-%m-%d')
        ])

# Convert to DataFrame
columns = [
    'SYMBOL', 'SERIES', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'LAST', 'PREVCLOSE',
    'TOTTRDQTY', 'TOTTRDVAL', 'TIMESTAMP', 'TOTALTRADES', 'ISIN', 'DATE'
]
data = pd.DataFrame(dummy_data, columns=columns)

# Print data summary
print("Dummy data generated successfully")
print(f"Total records: {len(data)}")

# Database connection
conn = psycopg2.connect(
    dbname='postgres', user='postgres.ughbgtesbumlnuztzafs', password='',
    host='aws-0-ap-south-1.pooler.supabase.com', port='5432'
)
cur = conn.cursor()

# Create table
ddl = '''
DROP TABLE IF EXISTS Stocks;
CREATE TABLE Stocks (
    SYMBOL varchar(255),
    SERIES varchar(255),
    OPEN float,
    HIGH float,
    LOW float,
    CLOSE float,
    LAST float,
    PREVCLOSE float,
    TOTTRDQTY int,
    TOTTRDVAL float,
    TIMESTAMP varchar(255),
    TOTALTRADES int,
    ISIN varchar(255),
    DATE varchar(255)
);
'''
cur.execute(ddl)

# Insert data
vals = [tuple(x) for x in data.to_numpy()]
psycopg2.extras.execute_values(cur, "INSERT INTO Stocks VALUES %s", vals)

# Commit & close
conn.commit()
conn.close()
print("Data inserted into database successfully!")


