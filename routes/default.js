// express 불러오기import
const express = require('express');
// 라우터 함수 객체 참조
const router = express.Router();

// app 대신 router
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/about', function(req, res) {
  res.render('about');
});

// 이 파일의 함수를 app.js에서 사용하도록
module.exports = router;