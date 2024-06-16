//사용에 따라 바뀌는 동적 데이터를 사용하는 사이트

// 노드JS 내장된 경로 패키지 불러오기
const path = require('path');

// require() 으로 express 불러와 상수 또는 변수에 저장
const express = require('express');

// 분리한 디폴트 경로 js파일 불러오기
const defaultRoutes = require('./routes/default');
const restaruantRoutes = require('./routes/restaurants');

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

// 분리한 디폴트 경로 페이지를 사용해
// 들어오는 요청을 거르는 필터 역할
app.use('/', defaultRoutes); // '/'로 시작하는 모든 경로는 defaultRoutes로 처리하라
app.use('/', restaruantRoutes);

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



// 이때까지 처리되지 않은 모든 요청을 처리하는 미들웨어
app.use(function(req, res) {
  res.status(404).render('404');
});

// 서버 측 오류에 대한 500.ejs 페이지
// 이 때는 Express에게 특별한 에러 상황임을 알려야 하므로,
// 4개의 매개변수가 사용된다
app.use(function(error, req, res, next) {
  res.status(500).render('500');
});

// listen() 으로 특정 포트에서 들어오는 네트워크 트래픽 요청을 수신.
app.listen(3000);
