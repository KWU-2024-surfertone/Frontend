import React, { useState, useEffect, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { loadGoogleMapScript, initializeMap, updateMarkersVisibility } from './utils/googleMaps';
import { updateChartData, updateBarChartData } from './utils/chartHelpers';
import 'marketboost/src/css/food.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const Food = () => {
  const [coordinatesByCategory, setCoordinatesByCategory] = useState({});
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [{
      label: '개수',
      data: [],
      borderWidth: 1,
    }],
  });

  const mapRef = useRef(null);
  const chartContainerRef = useRef(null);

  const initMap = async () => {
    await loadCoordinates();
    initializeMap(coordinatesByCategory, mapRef.current);
  };

  useEffect(() => {
    loadGoogleMapScript()
      .then(() => {
        // Google Maps API가 로드되었을 때 initMap을 실행합니다.
        initMap();
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (Object.keys(coordinatesByCategory).length > 0) {
      initializeMap(coordinatesByCategory, mapRef.current);
    }
  }, [coordinatesByCategory]);

  const loadCoordinates = async () => {
    try {
      const response = await fetch('/cafe_coordinates.json');
      if (!response.ok) throw new Error(`HTTP 오류! 상태: ${response.status}`);
      const data = await response.json();
      setCoordinatesByCategory(data);
      updateChartData(data, setChartData);
      updateBarChartData(data, setBarChartData);
    } catch (error) {
      console.error('좌표 로드 중 오류 발생:', error);
    }
  };

  const handlePieChartHover = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const category = chartData.labels[index];
      updateMarkersVisibility(category);
    }
  };

  const handlePieChartClick = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const category = chartData.labels[index];
      updateMarkersVisibility(category);
    }
  };

  const handleBarChartHover = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const category = barChartData.labels[index];
      updateMarkersVisibility(category);
    }
  };

  const handleBarChartClick = (event, chartElement) => {
    if (chartElement.length > 0) {
      const index = chartElement[0].index;
      const category = barChartData.labels[index];
      updateMarkersVisibility(category);
    }
  };

  const handleMouseMove = (event) => {
    const chartContainer = chartContainerRef.current;

    if (chartContainer && !chartContainer.contains(event.target)) {
      // 마우스가 차트 외부로 이동했을 때 모든 마커를 표시
      updateMarkersVisibility('all');
    }
  };

  useEffect(() => {
    // 차트 외부에 마우스 이동 시 전체 마커 표시 핸들러 등록
    document.addEventListener('mousemove', handleMouseMove);

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      <div ref={chartContainerRef} style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', height: '50%' }}>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      let label = context.label || '';
                      if (label) label += ': ';
                      if (context.parsed) label += `${context.parsed}%`;
                      return label;
                    },
                  },
                },
              },
              onHover: handlePieChartHover,
              onClick: handlePieChartClick,
            }}
          />
        </div>
        <div style={{ width: '100%', height: '50%' }}>
          <Bar
            data={barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      let label = context.dataset.label || '';
                      if (label) label += ': ';
                      if (context.parsed) label += `${context.parsed.y}`;
                      return label;
                    },
                  },
                },
              },
              onHover: handleBarChartHover,
              onClick: handleBarChartClick,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Food;
