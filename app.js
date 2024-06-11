//사용에 따라 바뀌는 동적 데이터를 사용하는 사이트

// 노드JS 내장된 경로 패키지 불러오기
const path = require('path');
// 내장된 파일 시스템 요청하기
const fs = require('fs');

// require() 으로 express 불러와 상수 또는 변수에 저장
const express = require('express');

// express는 실행할 수 있는 함수. 호출해준다
const app = express();

// express 내장된 템플릿 기능 활성화하기
// 처리할 템플릿 파일의 위치
app.set('vews', path.join(__dirname, 'views'));
// 처리할 템플릿 파일
app.set('view engine', 'ejs');
// views, view engine 은 express 가 이해할 수 있는 예약된 이름

// public 폴더 안의 스타일과 스크립트에 접근
// '수신 요청이 여기서 찾을 수 있는 파일에 대한 것인지 확인해라'
app.use(express.static('public'));
// 들어오는 데이터를 추출하도록 지시하는 미들웨어
app.use(express.urlencoded({ extende: false }));

// 작동을 위해선 하나 이상의 경로가 필요.
// 3000/ 경로에서 일어날 일을 함수로
// 이 함수는 요청, 응답 개체를 수신하고 
// app.get('/', function(req, res) {
  // 이런 응답을 보낸다.
//   res.send('<h1>Hello World</h1>'); 
// });

// 특정 경로에서 응답으로 html 파일을 보내기
// app.get('/restaurants', function(req, res) {
//   const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
  // 응답으로 파일을 보내는 메소드: 파일이 HTML 내용을 포함했는지 확인한 뒤 보낸다
//   res.sendFile(htmlFilePath);
// });

app.get('/restaurants', function(req, res) {
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  res.render('restaurants', { 
    numberOfRestaurants: storedRestaurants.length, 
    restaurants: storedRestaurants 
  });
});

// 동적 경로: restaruants/r1 주소를 사용해 id가 r1인 값에 접근한다
app.get('/restaurants/:id', function(req, res) {
  // params는 데이터에 접근하기 위한 키 - 사용하려면 json의 데이터도 id를 가지도록
  // id는 내가 id를 키로 사용했기 때문
  const restaurantId = req.params.id;
  // 상세 페이지를 렌더링할때 레스토랑 id를 전달, 템플릿에서 사용할 수 있도록 한다

  // 일치하는 id를 찾았다면 더 찾지 않고 저장된 데이터로 응답
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  for (const restaurant of storedRestaurants) {
    // 레스토랑의 id가 내가 지정한 const restaurantId와 일치한다면
    if (restaurant.id === restaurantId) {
      // 일치하는 레스토랑 디테일 페이지를 렌더링하고 끝냄
      // return을 사용하면 응답을 보낸 뒤의 코드는 실행되지 않음
      return res.render('restaurant-details', {restaurant: restaurant});
      // 앞의 restaurant: 템플릿 에서 지정한 키 이름, 
      // 뒤의 restaurant는 for문 안에서 const 지정한 것 = URL 에서 찾으려는 id와 일치하는 값
    }
  }
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.get('/confirm', function(req, res) {
  res.render('confirm');
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/recommend', function(req, res) {
  res.render('recommend');
});

app.post('/recommend', function (req, res) {
  // 레스토랑에 대한 데이터를 추출하고
  const restaurant = req.body;
  // restaurants.json 파일을 열어서
  const filePath = path.join(__dirname, 'data', 'restaurants.json');
  
  // 파일 시스템을 이용해 읽은 내용을
  const fileData = fs.readFileSync(filePath);
  // 텍스트인 JSON 파일에서 자바스크립트 배열로 변환
  const storedRestaurants = JSON.parse(fileData);

  // 배열에 새로운 데이터를 추가한다
  storedRestaurants.push(restaurant);
  // 데이터가 추가된 배열을 다시 텍스트로 저장
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  // 데이터가 제출되면 사용자를 다른 곳으로 보내기
  res.redirect('/confirm');
});

// listen() 으로 특정 포트에서 들어오는 네트워크 트래픽 요청을 수신.
app.listen(3000);



