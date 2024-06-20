const express = require('express');

const resData = require('../utility/restaurant-data'); 
const router = express.Router();

router.get('/restaurants', function(req, res) {
  let order = req.query.order;
  let nextOrder = 'desc';

  if (order !== 'asc' && order !== 'desc') {
    order = 'asc';
  }

  if (order === 'desc') {
    nextOrder = 'asc';
  }

  const storedRestaurants = resData.getStoredRestaurants();

  // 이름 알파벳 순으로 데이터 순서 정렬하기
  // 모든 레스토랑을 둘씩 비교해 1, -1 값 부여
  storedRestaurants.sort(function(resA, resB) {
    // 두 개의 레스토랑 이름을 비교해
    // a가 더 길다면 1, 아니라면 -1값을 반환 - 이걸로 순서를 바꾼다
    if (
      (order === 'asc' && resA.name > resB.name) || 
      (order === 'desc' && resB.name > resA.name)
    ) {
      return 1
    }
    return -1
  });

  res.render('restaurants', { 
    numberOfRestaurants: storedRestaurants.length, 
    restaurants: storedRestaurants,
    nextOrder: nextOrder
  });
});

// 동적 경로: restaruants/r1 주소를 사용해 id가 r1인 값에 접근한다
router.get('/restaurants/:id', function(req, res) {
  // params는 데이터에 접근하기 위한 키 - 사용하려면 json의 데이터도 id를 가지도록
  // id는 내가 id를 키로 사용했기 때문
  const restaurantId = req.params.id;
  // 상세 페이지를 렌더링할때 레스토랑 id를 전달, 템플릿에서 사용할 수 있도록 한다

  // 일치하는 id를 찾았다면 더 찾지 않고 저장된 데이터로 응답
  const storedRestaurants = Data.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    // 레스토랑의 id가 내가 지정한 const restaurantId와 일치한다면
    if (restaurant.id === restaurantId) {
      // 일치하는 레스토랑 디테일 페이지를 렌더링하고 끝냄
      // return을 사용하면 응답을 보낸 뒤의 코드는 실행되지 않음
      return res.render('restaurant-details', {restaurant: restaurant});
      // 앞의 restaurant: 템플릿 에서 지정한 키 이름, 
      // 뒤의 restaurant는 for문 안에서 const 지정한 것 = URL 에서 찾으려는 id와 일치하는 값
    }

    // 모든 id를 검토하고 기다려도 매칭이 없다면, 404에러 띄우기
   res.status(404).render('404'); // 사용하는 동적 데이터는 없으므로 전달하는 데이터 없음.
  }
});

router.get('/confirm', function(req, res) {
  res.render('confirm');
});

router.get('/recommend', function(req, res) {
  res.render('recommend');
});

router.post('/recommend', function (req, res) {
  // 레스토랑에 대한 데이터를 추출하고
  const restaurant = req.body;
  // json파일 저장된 리스트 불러오는 함수 호출
  const storedRestaurants = resData.getStoredRestaurants();

  // 배열에 새로운 데이터를 추가한다
  storedRestaurants.push(restaurant);
  // 데이터 저장하는 함수를 호출, 업데이트된 데이터 전달하기
  resData.storeRestaurants(storedRestaurants);
  // 데이터가 제출되면 사용자를 다른 곳으로 보내기
  res.redirect('/confirm');
});

module.exports = router;