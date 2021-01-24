from flask import Flask
from flask import send_file, request, jsonify, abort
from flask_cors import CORS

import os


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/latest')
def latest():
    return send_file('data/geojson/dpc-covid19-ita-regioni-latest.csv.json')


@app.route('/all')
def all():

    csvs = os.listdir("data/geojson")
    print(csvs)
    return jsonify({'csvs': csvs})


@app.route('/geojson')
def get_geojson():
    date = request.args.get('date')
    file = f'data/geojson/dpc-covid19-ita-regioni-{date}.csv.json'
    try:
        return send_file(file)
    except FileNotFoundError:
        return abort(404)
