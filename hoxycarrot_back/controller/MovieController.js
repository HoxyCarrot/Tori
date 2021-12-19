var mysql = require('../config/mysql')
var db = mysql.init('DEV')

module.exports = {
    getMain: function (req, res, next) {
        const limitCount = req.params.limit || 5
        if (!/\d/.exec(req.params.limit)) next('route')
        db.query(`select * from 427_kobis_movieList ORDER BY RAND() LIMIT ${limitCount}`, (err, movieList) => {
            if (err) next(err)
            res.json({
                status: '200',
                movieList
            });
        })
    },
    getLatte: (req, res, next) => {
        const limitCount = req.params.limit || 5
        db.query(`SELECT * FROM 427_kobis_movieList a INNER JOIN 427_kobis_moviePerson b ON a.directors LIKE CONCAT('%',b.peopleNm,'%') ORDER BY RAND() LIMIT ${limitCount}`, (error, results) => {
            if (error) next(error);
            res.json(
                {
                    status: '200',
                    results
                }
            )
        })
    },
    postLatteProcess: (req, res, next) => {
        var sql = '';
        var value = [];
        var post = req.body;
        // 기본값 셋팅에서 가져올거면 || default를 정해주자

        for (let element in post) {

            sql += sql ? `AND a.${element} LIKE ? ` : `WHERE a.${element} LIKE ? `
            switch (element) {
                case 'type':
                    value.push(post[element])
                    break
                case 'openDt':
                    value.push(post[element])
                    break
                case 'nations':
                    value.push(`%${post[element]}%`)
                    break
                case 'genres':
                    value.push(`%${post[element]}%`)
                    break
                case 'directors':
                    value.push(`%${post[element]}%`)
                    break
            }
        }
        const PORST_SQL = `SELECT * FROM 427_kobis_movieList a INNER JOIN 427_kobis_moviePerson b ON a.directors LIKE CONCAT('%',b.peopleNm,'%') ${sql} ORDER BY RAND()`

        db.query(PORST_SQL, value, (err, result) => {
            if (err) next(err)
            res.json({
                status: 200,
                result
            })

        })
    }


}