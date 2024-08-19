// src/utils/chartHelpers.js
import { getColorForCategory } from './colors';

export const updateChartData = (data, setChartData) => {
  const labels = Object.keys(data);
  const values = labels.map(category => data[category].length);
  const backgroundColors = labels.map(category => getColorForCategory(category));
  const borderColors = labels.map(() => '#000');  // 검은색 테두리 설정

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

export const updateBarChartData = (data, setBarChartData) => {
  const labels = Object.keys(data);
  const values = labels.map(category => data[category].length);
  const backgroundColors = labels.map(category => getColorForCategory(category));
  const borderColors = labels.map(() => '#000');  // 검은색 테두리 설정

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
