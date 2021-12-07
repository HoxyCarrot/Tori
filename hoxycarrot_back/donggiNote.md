# BACK
 ## common
 - bin/www : `express`서버를 실행하는 코드
 - app.js : 서버가 어떻게 동작해야하는지를 규정하는 앱 코드
 
 ```bash
  pm2 start bin/www --watch
 ```
 `pm2` 로 하면편함

----------------------
 ## 환경변수
  ```javascript
  npm install dotenv
  ```
  > dotenv : 환경변수를 파일로 관리할 수 있도록 해줌

  프로젝트 폴더아래 [.env](.env) 파일 생성후 아래 코드 추가
  ```
  NODE_ENV=development
  DEBUG=express:*
  PORT=3000
  ```
 
  [bin/www](bin/www) 파일에 <code>require('dotenv').config();</code> 를 추가하여 `dotenv`로드

  `DEBUG=express:*` `express`에 모든값을 `DEBUG`를하면 콘솔창난리나니<br>
  `DEBUG=restapi:server`로 변경해주자

 ------------
 ## 라우터

  ### 스태틱 - images
  ```javascript
  app.use('/movies', express.static(__dirname + '/public/images/movies'));
  ```
  요청시 `~/movies/[파일명]` 으로 간결하게 호출할수있도록 `static`을 나눠줄예정<br>
  