from flask import Flask, request, Response, jsonify, json
import requests
import config
from app import app  # Flask 애플리케이션 인스턴스를 import

NAVER_CLIENT_ID = config.CLIENT_ID
NAVER_CLIENT_SECRET = config.CLIENT_SECRET

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    latitude = 37.5665
    longitude = 126.97342
    start = 1

    headers = {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
    }

    params = {
        'query': '음식점',
        'coordinate': f'{longitude},{latitude}',  # 경도, 위도 순서
        'radius': 1000,  # 검색 반경 (미터 단위)
        'start': start,
        'display': 50  # 최대 50개의 항목 반환
    }

    response = requests.get('https://openapi.naver.com/v1/search/local.json', headers=headers, params=params)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data from Naver API'}), 500

    data = response.json()
    return Response(response=json.dumps(data, ensure_ascii=False), mimetype='application/json')
