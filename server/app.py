#!/usr/bin/python3

import models

from json import dumps

from os import getcwd
from os.path import realpath, join
from time import sleep

from configparser import ConfigParser
from flask import Flask, render_template, make_response

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/poll_sensors', methods=['GET'])
def poll_sensors():
    return render_template('sensors.html', sensors=[])


@app.route('/switch_button', methods=['GET'])
def switch_button():
    return make_response("<h2>200 OK</h2>", 200)


if __name__ == "__main__":
    config_parser = ConfigParser()
    config = realpath(join(getcwd(), 'api.conf'))
    config_parser.read(config)

    app.run(host='0.0.0.0', threaded=True, debug=True, use_reloader=True)
