from flask import Flask, jsonify
import pyodbc
from flask_cors import CORS

app = Flask(__name__, static_folder='workorder', static_url_path='/app')
CORS(app, resources={r"/*": {"origins": "*"}})

connection_string = 'DRIVER={Pervasive ODBC Interface};SERVERNAME=DDM-SERVER;DBQ=GLOBALTRA;UID=Master;PWD=master'
conn = pyodbc.connect(connection_string)

# Create a cursor
cursor = conn.cursor()

@app.route('/welcome', methods=['GET'])
def read_records():
    return ('Welcome!')   
    
@app.route('/dt/dict/job', methods=['GET'])
def dt_dict_job():
    try:
        # SQL statement
        sql = "SELECT * FROM V_MT_DT_DICT LIMIT 200"
        # Execute the SQL statement
        cursor.execute(sql)
        rows = cursor.fetchall()
        result = []
        for row in rows:
            result.append({'JOB': row[0], 'SUFFIX': row[1], 'PART': row[2], 'DESCRIPTION': row[3], 'QTY_ORDER': row[4], 'WORKCENTER': row[5], 'LMO': row[6], 'WC_NAME': row[7], 'FLOW_SEQ': row[8], 'JOB_FLOW_WC_$': row[9], 'JOB_WC_$': row[10], 'LATEST_ET': row[11], 'PCSORDER_1': row[12], 'PCSCOMPLTD_1': row[13], 'PERCENT_COMPLTD': row[14], 'L_STATUS': row[15]})
        
        return jsonify(result)
    except Exception as e:
        return "Error reading records: " + str(e)

dt_dict_job()

if __name__ == '__main__':
    app.run(debug=True, port=8000)

    conn.close()


    