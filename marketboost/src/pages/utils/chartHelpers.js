// src/utils/chartHelpers.js
import { getColorForCategory } from './colors';

export const updateChartData = (data, setChartData) => {
  const labels = Object.keys(data);
  const backgroundColor = labels.map(category => getColorForCategory(category));
  const dataValues = labels.map(category => data[category].length);

  setChartData({
    labels: labels,
    datasets: [{
      data: dataValues,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor.map(color => color.replace('0.6', '1')), // 약간의 수정
      borderWidth: 1,
    }],
  });
};

export const updateBarChartData = (data, setBarChartData) => {
  const labels = Object.keys(data);
  const backgroundColor = labels.map(category => getColorForCategory(category));
  const dataValues = labels.map(category => data[category].length);

  setBarChartData({
    labels: labels,
    datasets: [{
      label: '개수',
      data: dataValues,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor.map(color => color.replace('0.6', '1')), // 약간의 수정
      borderWidth: 1,
    }],
  });
};
