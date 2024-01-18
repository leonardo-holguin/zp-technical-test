import json

import requests
from flask import Flask, jsonify, request

app = Flask(__name__)
URL = 'http://pbiz.zonavirtual.com/api/Prueba/Consulta'

@app.get('/')
def index():
  response = requests.post(URL)
  response_data = response.json()
  return jsonify(response_data)

@app.after_request
def after(response):
  header = response.headers
  header['Access-Control-Allow-Credentials'] = 'true'
  header['Access-Control-Allow-Headers'] = 'authorization, content-type'
  header['Access-Control-Allow-Origin'] = request.environ.get('HTTP_ORIGIN')
  header['Access-Control-Allow-Methods'] = 'HEAD, PUT, OPTIONS, POST, GET, DELETE'
  header['Referrer-Policy'] = 'no-referrer'
  header['Strict-Transport-Security'] = 'max-age=31536000; includeSubdomains; preload'
  header['X-Content-Type-Options'] = 'nosniff'
  header['X-Frame-Options'] = 'DENY'
  header['X-XSS-Protection'] = '1; mode=block'

  return response

if __name__ == '__main__':
    app.run(debug=True, port=5001)