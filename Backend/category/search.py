import requests

# 카카오 API 클라이언트 정보
KAKAO_API_KEY = '62e7623741c4ca5419af27a3bb477eda'

def search_places(query, center_lat, center_lng, radius,page):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    headers = {
        'Authorization': f'KakaoAK {KAKAO_API_KEY}'
    }
    params = {
        'query': query,
        'x': center_lng,
        'y': center_lat,
        'radius': radius,
        'page': page,
        'size': 15,  # 최대 검색 결과 개수
        
    }
    
    response = requests.get(url, headers=headers, params=params)
   
    return response.json()

def fetch_all_places(query, center_lat, center_lng, radius):
    
    all_places = []
    seen_ids = set()
    page = 1
    while True:
        result = search_places(query, center_lat, center_lng, radius, page)
        print(result.get('meta',[]))
        documents = result.get('documents', [])
        # print(result.get('meta'))
        print(f"Page {page}:")
        # print(documents)  # 응답 확인
        
        if not documents:  # 결과가 없으면 종료
            break
        
        new_places = [place for place in documents if place['id'] not in seen_ids]
        if not new_places:  # 새 결과가 없으면 종료
            break
        
        seen_ids.update(place['id'] for place in new_places)
        all_places.extend(new_places)
        page += 1
        print(f"Fetched page {page - 1} with {len(new_places)} new results")
    filename = 'coordinates.txt'
    for place in all_places:
        print(place['x'],place['y'],place['category_name'])
    save_coordinates_to_file(all_places, filename)
    return all_places
    
def save_coordinates_to_file(places, filename):

    with open(filename, 'w') as file:
        for place in places:
            file.write(f"{place['x']}, {place['y']}\n")