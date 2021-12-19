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

----------------

 ## Swagger API

  ### [설치]

   ```bash
    npm i swagger-jsdoc swagger-ui-express --save-dev
   ```
   > `swagger-jsdoc` 설치시 `7.0.0 이상 버전`으로 설치된다. 이러면 `ES6`를 반드시 써야하해서 `babel`을 쓰지않을거면` 6.0.0 버전`으로 다운그레이드 시켜서 설치해야한다.
   
   > `swagger`는 개발용 모듈이기 때문에 `devDependencies`에 추가
   - `swagger-ui-express` : API 문서 UI 렌더링을 위한 패키지
   - `swagger-jsdoc` : Swagger 태그 주석을 추가해 API 문서화를 위한 패키지
      
   [스웨거 설정파일](lib/swagger.js)

   swaggerDefinition 구성 요소
   - `openapi` : 사용하는 Open API의 버전
   - `info`: (Optional) API에 필요한 정보
     - `title`: API 제목
     - `version`: API 버전
     - `description`: API 상세정보
   - `servers`: API에 대한 기본 URL을 정의하며, 배열로 여러 URL 정의 가능 (host,basePath 등 으로도 사용가능)
   - `components`: (Optional) 모든 API에 사용할 공통 컴포넌트
   - `schemes`: (Optional) 가능한 통신 방식 ex) ["http"], ["https"], ["http", "https"]
   - `defomotopms`: (Optional) DB 모델 정의
   - `apis`: api들을 swagger가 찾을수있도록 경로 설정

 **Swagger `componets`**

  Swagger는 기본적으로 `YAML`포맷으로 `Docs`를 작성한다.<br> 설정은 `json`으로 하였지만 `compents`는 `YAML` 포맷으로 했다.

  >**YAML**: `Y`AML `A`in’t `M`arkup `L`anguage<br>
  YAML은 마크업이 아닌 데이터 자체를 중요시 여긴다는 뜻에서 지어진 이름이다.
  
  ### [YAML 문법]
  
  - 주석 : `#`
    - ex)
    - `# 여기는 주석`
  - 배열(list) : `-`
    - ex) 
    - `- test1`
    - `- test2`
    - `- test3`
    - **result : [ test1, test2 , test3 ]**
  - 객체(hash): `:`
    - ex)
    - name : donggi
    - birth : 2006
    - born : Korea
    - **result : { name :donggi, birth:2006,born : Korea }**
  - 분류 - 공백(space)을 이용해 각 데이터를 구분
    - `tab`은 사용하지 못한다. 시스템마다 `tab`을 표현하는 방법이 다르기때문에 `공백`만 사용
  
  ```yaml
  ---
  intro: Yeah bitch, check my profile. Perfect, but you are not.
  profile:
   name: beenzino
   birth: 1987
   sns:
    youtube: https://www.youtube.com/channel/UCyFkumV0dfLxSY602sIYNvw
    insta: https://www.instagram.com/realisshoman/
   song: single: [Nike Shoes, Aqua Man, Up All Night]
   crew: [연결고리, '11:11']
  ```

----------------

 ## Pagination
 1. offset- limit 방식
    - 웹 페이지에서의 `<, 1,2,3,4, >` 이런식으로 사용할때사용
 2. cursor
    - 무한스크롤 (SNS)에서 주로사용

 ### Offset Pagination
  

----------------
 ## **ERROR**
  
  ### E1. 
   ```
   npm ERR! code ELIFECYCLE 
   npm ERR! errno 1
   ```
   A1. `npm cache clean --force` -> `package-lock.json`과 `node_modules`를 제거하고 `npm install` ㄹㄹ ㄱㄱ
