const fs = require('fs');
const path = require('path');

// json 파일 열기
const filePath = path.join(__dirname, '..', 'data', 'restaurants.json');

// json 파일에 저장된 레스토랑의 리스트를 불러오는 코드
function getStoredRestaurants() {
  
  // 파일 시스템을 이용해 읽은 내용을
  const fileData = fs.readFileSync(filePath);  // fs는 이 파일에서 정의되지 않았던 것, require
  // 텍스트인 JSON 파일에서 자바스크립트 배열로 변환
  const storedRestaurants = JSON.parse(fileData);

  // 이 함수 안에서만 사용되지 않고,
  // 바깥에서 함수가 불러질 때마다 재사용될 수 있도록 return
  return storedRestaurants;
}

// 배열을 다시 텍스트로 저장
function storeRestaurants(storeableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storeableRestaurants));
}

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeRestaurants: storeRestaurants
};