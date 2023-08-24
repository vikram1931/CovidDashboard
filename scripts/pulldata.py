import requests
import pymysql

# Connect to your MySQL Database
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='helloworld',
    db='CovidDashboard'
)

cursor = connection.cursor()
create_table_query = """
CREATE TABLE IF NOT EXISTS covid_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    state VARCHAR(255),
    positive INT,
    negative INT,
    hospitalizedCurrently INT,
    ICUCurrently INT,
    Recovered INT,
    death INT
);
"""
cursor.execute(create_table_query)

# List of states
states = ["ca", "tx", "fl", "ny", "pa", "il", "oh", "ga", "nc", "mi"]

# Fetch and store data
for state in states:
    response = requests.get('https://api.covidtracking.com/v1/states/{state}/current.json')

    if response.status_code == 200:
        data = response.json()

        insert_update_query = """
        INSERT INTO covid_data (state, positive, negative, hospitalizedCurrently, ICUCurrently, Recovered, death)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE positive=%s, negative=%s, hospitalizedCurrently=%s, ICUCurrently=%s, Recovered=%s, death=%s;
        """

        cursor.execute(insert_update_query, (state, data.get("positive"), data.get("negative"), data.get("hospitalizedCurrently"), data.get("inIcuCurrently"), data.get("recovered"), data.get("death"), data.get("positive"), data.get("negative"), data.get("hospitalizedCurrently"), data.get("inIcuCurrently"), data.get("recovered"), data.get("death")))

        connection.commit()

cursor.close()
connection.close()
