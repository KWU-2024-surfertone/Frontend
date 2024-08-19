from flask import Flask, request, jsonify
import requests
import config
app = Flask(__name__)

if __name__ == '__main__':
    app.run(debug=True)
