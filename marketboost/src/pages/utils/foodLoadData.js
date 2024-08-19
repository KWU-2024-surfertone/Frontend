// // src/utils/loadData.js

// export const loadCoordinates = async () => {
//   try {
//     const response = await fetch('/food_coordinates.json');
//     if (!response.ok) {
//       throw new Error(`HTTP 오류! 상태: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('좌표 로드 중 오류 발생:', error);
//     throw error; // 오류를 다시 던져서 호출자에게 전달
//   }
// };
