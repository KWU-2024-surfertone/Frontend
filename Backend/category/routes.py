from flask import Blueprint
from category.search import fetch_all_places
bp = Blueprint('category', __name__)

@bp.route('', methods=['GET'])
def get_category():
    center_lat = 37.619379687777  # 광운대의 위도
    center_lng = 127.05812045104  # 광운대의 경도
    radius = 200  # 반경 (미터 단위)
    query = '카페'  # 검색할 키워드
    all_places = fetch_all_places(query, center_lat, center_lng, radius)

    print(f"\n--- {query} 목록 ---")
    for place in all_places:
        name = place['place_name']
        address = place['road_address_name'] or place['address_name']
        # 별점 정보는 'rating' 필드로 제공되며, 제공되지 않는 경우 'N/A'로 표시
        print(f"이름: {name}\n주소: {address}\n")

    return all_places

