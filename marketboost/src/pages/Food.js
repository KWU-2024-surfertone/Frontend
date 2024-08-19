// src/components/Food.js
import React, { useState, useEffect, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { loadGoogleMapScript, initializeMap } from './utils/googleMaps';
import { getColorForCategory, resetColorTracking } from './utils/colors';
import 'marketboost/src/css/food.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Food = () => {
  const [coordinatesByCategory, setCoordinatesByCategory] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '개수',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const mapRef = useRef(null);

  // JSON 파일에서 좌표 로드
  const loadCoordinates = async () => {
    try {
      const response = await fetch('/food_coordinates.json');
      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태: ${response.status}`);
      }
      const data = await response.json();
      setCoordinatesByCategory(data);
      console.log('좌표 로드 완료:', data);
      updateChartData(data);  // 차트 데이터 업데이트
      updateBarChartData(data); // 막대 그래프 데이터 업데이트
    } catch (error) {
      console.error('좌표 로드 중 오류 발생:', error);
    }
  };

  // 차트 데이터 업데이트
  const updateChartData = (data) => {
    const labels = Object.keys(data);
    const values = labels.map(category => data[category].length);
    const backgroundColors = labels.map(category => getColorForCategory(category));
    const borderColors = backgroundColors;  // 테두리 색상도 동일하게 설정

    setChartData({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  };

  // 막대 그래프 데이터 업데이트
  const updateBarChartData = (data) => {
    const labels = Object.keys(data);
    const values = labels.map(category => data[category].length);
    const backgroundColors = labels.map(category => getColorForCategory(category));
    const borderColors = backgroundColors;  // 테두리 색상도 동일하게 설정

    setBarChartData({
      labels: labels,
      datasets: [
        {
          label: '개수',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  };

  // 구글 맵 스크립트 로드 및 초기화
  useEffect(() => {
    const initMap = () => {
      loadCoordinates().then(() => {
        initializeMap(coordinatesByCategory, mapRef.current);
      });
    };

    loadGoogleMapScript()
      .then(() => {
        window.initMap = initMap;  // 콜백 함수 설정
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // 빈 배열로 한 번만 실행되도록 설정

  // 좌표가 변경되면 맵 재초기화
  useEffect(() => {
    if (Object.keys(coordinatesByCategory).length > 0) {
      resetColorTracking();  // 색상 초기화
      initializeMap(coordinatesByCategory, mapRef.current);
    }
  }, [coordinatesByCategory]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 2, padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
        >
          <p>지도를 로딩하는 중입니다...</p>
        </div>
      </div>
      <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', height: '50%' }}>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed) {
                        label += `${context.parsed}%`;
                      }
                      return label;
                    }
                  }
                }
              }
            }}
          />
        </div>
        <div style={{ width: '100%', height: '50%' }}>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                        label += ': ';
                      }
                      if (context.parsed) {
                        label += `${context.parsed.y}`;
                      }
                      return label;
                    }
                  }
                }
              },
              scales: {
                x: {
                  beginAtZero: true
                },
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Food;
