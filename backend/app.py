from flask import Flask
from flask import jsonify
from flask import send_file

from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'



@app.route('/latest')
def latest():

    return send_file('./geojson/replayScript.json')

    

