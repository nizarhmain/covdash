from flask import Flask
from flask import send_file, request, jsonify, abort
from flask_cors import CORS

import os

import time
import atexit

from apscheduler.schedulers.background import BackgroundScheduler

from crawling import crawling_script
from flask_compress import Compress

COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript']
COMPRESS_LEVEL = 6
COMPRESS_MIN_SIZE = 500


def configure_app(app):
    Compress(app)


app = Flask(__name__)
configure_app(app)
CORS(app)



crawling_script.crawl()

def print_date_time():
    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))
    crawling_script.crawl()


scheduler = BackgroundScheduler()
scheduler.add_job(func=print_date_time, trigger="interval", hours=6)
scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())



@app.route('/api')
def hello_world():
    return 'Hello, World!'


@app.route('/api/latest')
def latest():
    return send_file('data/geojson/dpc-covid19-ita-regioni-latest.csv.json')


@app.route('/api/all')
def all():

    csvs = os.listdir("data/geojson")
    print(csvs)
    return jsonify({'csvs': csvs})


@app.route('/api/geojson')
def get_geojson():
    date = request.args.get('date')
    file = f'data/geojson/dpc-covid19-ita-regioni-{date}.csv.json'
    try:
        return send_file(file)
    except FileNotFoundError:
        return abort(404)


