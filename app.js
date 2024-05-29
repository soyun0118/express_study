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



