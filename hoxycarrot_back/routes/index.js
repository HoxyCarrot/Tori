var express = require('express');
var router = express.Router();

const MoviceController = require('../controller/MovieController')
const PersonController = require('../controller/PersonController')

/**
 * @swagger
 *  /api-kobis:
 *    get:
 *      tags:
 *      - Movie
 *      description: Kobis 영화 정보 출력 ( 기본 5개 영화정보 )
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: limit
 *          required: false
 *          description: 출력할 영화 수
 *          schema:
 *           type: integer
 *           default: 5
 *      responses:
 *       200:
 *        description: status code
 *       movieList:
 *        description: 
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/Movies'
 */
router.get('/:limit?',MoviceController.getMain);

/**
 * @swagger
 *  /api-kobis/director:
 *    get:
 *      tags:
 *      - Person
 *      description: kobis 감독명 검색
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: directorName
 *          required: true
 *          description: 영화인(감독)명 (한글)
 *          schema:
 *           type: string
 *      responses:
 *       200:
 *        description: 상태코드
 *       movieList:
 *        description: 영화인(감독) 상세 조회
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/Persons'
 */
router.get('/director/:directorName',PersonController.getDirector)


/**
 * @swagger
 *  /api-kobis/latte:
 *    get:
 *      tags:
 *      - Movie&Person
 *      description: 라떼 영화 영화 및 감독 정보 랜덤 5개 출력
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: limit
 *          required: false
 *          description: 출력할 영화 수
 *          schema:
 *           type: integer
 *           default: 5
 *      responses:
 *       200:
 *        description: status code
 *       movieList:
 *        description: 
 *        content:
 *         application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Movie_join_Person'
 */
 router.get('/latte/:limit?',MoviceController.getLatte)

 /**
  * @swagger
  *  /api-kobis/latte_process:
  *    post:
  *      tags:
  *      - Movie&Person
  *      description: 라떼 영화 , 각 조건별 영화 및 감독 정보
  *      produces:
  *      - application/json
  *      parameters:
  *        - in: query
  *          name: type
  *          required: false
  *          description: 영화 유형 (장편 , 단편 , 옴니버스, 기타)
  *          schema:
  *           type: string
  *        - in: query
  *          name: openDt
  *          required: false
  *          description: 개봉년도 (YYYY)
  *          schema:
  *           type: integer
  *        - in: query
  *          name: nations
  *          required: false
  *          description: 제작 국가 (한국 , 미국 ,일본 , ... )
  *          schema:
  *           type: string
  *        - in: query
  *          name: genres
  *          required: false
  *          description: 장르 (SF, 드라마, 액션, 코미디 ... )
  *          schema:
  *           type: string
  *        - in: query
  *          name: directors
  *          required: false
  *          description: 감독 (크리스토퍼 놀란, 미야자키 하야오, 박찬욱, ... )
  *          schema:
  *           type: string
  *      responses:
  *       200:
  *        description: status code
  *       movieList:
  *        description: 
  *        content:
  *         application/json:
  *          schema:
  *            type: array
  *            items:
  *             $ref: '#/components/schemas/Movie_join_Person'
  * 
  */
 router.post('/latte_process',MoviceController.postLatteProcess)
 


module.exports = router;
