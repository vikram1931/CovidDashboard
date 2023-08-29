import requests
import pymysql

# Configuration for the MySQL database
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'helloworld',
    'database': 'CovidDashboard'
}


# States for which we want to pull data
STATES = ['az', 'ca', 'fl', 'ga', 'il', 'ma', 'or', 'pa', 'tx', 'wa']

# Function to connect to the database
def db_connection():
    return pymysql.connect(
        host=DB_CONFIG['host'],
        user=DB_CONFIG['user'],
        password=DB_CONFIG['password'],
        database=DB_CONFIG['database']
    )

# Function to setup the database
def setup_database():
    connection = db_connection()
    cursor = connection.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS covid_data (
            id INT AUTO_INCREMENT PRIMARY KEY,
            state CHAR(2),
            positive INT,
            negative INT,
            Recovered INT,
            death INT
        );
    """)
    connection.commit()
    connection.close()

# Function to insert data into the database
def insert_data(data):
    connection = db_connection()
    cursor = connection.cursor()

    insert_query = """
        INSERT INTO covid_data (state, positive, negative,Recovered, death)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, data)
    connection.commit()
    connection.close()

# Function to fetch and store COVID data
def fetch_and_store_data():
    API_ENDPOINT = "https://api.covidtracking.com/v1/states/{}/current.json"
    for state in STATES:
        response = requests.get(API_ENDPOINT.format(state))
        data = response.json()

        data_to_insert = (
            data['state'],
            data['positive'],
            data['negative'],
            data.get('recovered', None),
            data['death']
        )

        insert_data(data_to_insert)
        print(f"Data for {state} inserted successfully!")

if __name__ == '__main__':
    setup_database()  # Create the table if not exists
    fetch_and_store_data()  # Fetch and store the data for the given states
