# Importing the library
import psycopg2 as pg2

# Create a connection with PostgreSQL
conn = pg2.connect(database='sql_challenge', user='postgres',password='Yajafarsadiq14!')

# Establish connection and start cursor to be ready to query
cur = conn.cursor()

# Pass in a PostgreSQL query as a string
cur.execute('SELECT * FROM departments')

# To save and index results, assign it to a variable
data = cur.fetchmany(10)

data