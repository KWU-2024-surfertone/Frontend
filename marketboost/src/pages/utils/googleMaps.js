// src/utils/googleMaps.js
import { getColorForCategory } from './colors'; // 색상 가져오기

let markersByCategory = {}; // 카테고리별 마커를 저장할 객체
let mapInstance; // 현재 지도 인스턴스

export const loadGoogleMapScript = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById('google-map-script');
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-map-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBaPa0izjey8tCKqLJx7ux81QWxPKhOIzg&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject('구글 맵 API 스크립트를 로드하는 중 오류 발생');
    document.body.appendChild(script);
  });
};

export const initializeMap = (coordinatesByCategory, mapElement) => {
  if (window.google && window.google.maps && mapElement) {
    const mapOptions = {
      center: new window.google.maps.LatLng(37.619379687777, 127.05812045104),
      zoom: 17,
    };
    mapInstance = new window.google.maps.Map(mapElement, mapOptions);

    markersByCategory = {}; // 이전 마커를 초기화

    Object.keys(coordinatesByCategory).forEach(category => {
      const colorHex = getColorForCategory(category);
      const markerIcon = createCustomMarkerImage(colorHex);
      markersByCategory[category] = [];

      coordinatesByCategory[category].forEach(coord => {
        const marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(coord.lat, coord.lng),
          map: mapInstance,
          title: category,
          icon: markerIcon,
          category: category,
        });
        markersByCategory[category].push(marker);
      });
    });

    console.log('지도 초기화 및 마커 추가 완료.');
  } else {
    console.error('구글 맵 API를 로드할 수 없습니다.');
  }
};

// Canvas를 사용하여 커스텀 마커 이미지를 생성하는 함수
const createCustomMarkerImage = (colorHex) => {
  const size = 20; // 마커 크기
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // 원 그리기
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 2, 0, 2 * Math.PI);
  ctx.fillStyle = colorHex;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // Data URL 반환
  return canvas.toDataURL();
};

// 카테고리별로 마커를 필터링하거나 전체 마커를 표시
export const updateMarkersVisibility = (category) => {
  Object.keys(markersByCategory).forEach(cat => {
    markersByCategory[cat].forEach(marker => {
      marker.setMap(cat === category || category === 'all' ? mapInstance : null);
    });
  });
};
