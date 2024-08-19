// src/utils/colors.js
const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#FF5722', '#E91E63', '#9C27B0', '#3F51B5', '#009688', '#8BC34A',
    '#FFC107', '#FF9800', '#795548', '#9E9E9E', '#607D8B', '#00BCD4'
];

const usedColors = new Map(); // 색상과 카테고리 매핑

// 색상 생성 함수
export const getColorForCategory = (category) => {
    let index = Math.abs(category.hashCode()) % colors.length;
    let color = colors[index];

    // 색상이 이미 사용되었으면 다른 색상 선택
    while (usedColors.has(color) && usedColors.get(color) !== category) {
        index = (index + 1) % colors.length; // 다음 색상으로 이동
        color = colors[index];
    }

    usedColors.set(color, category); // 색상 사용
    return color;
};

// 문자열의 해시코드를 계산하는 유틸리티 함수
String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // 32비트 정수로 변환
    }
    return hash;
};

// 모든 색상 초기화
export const resetColorTracking = () => {
    usedColors.clear();
};
