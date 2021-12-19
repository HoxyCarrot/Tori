var mysql = require('../config/mysql')
var db = mysql.init('DEV')

module.exports = {
    getDirector: (req, res, next) => {
        const directorName = req.params.directorName
        db.query(`select * from 427_kobis_movieList WHERE directors LIKE ?`, [`%${directorName}%`], (err, movieList) => {
            if (err) next(err)

            res.json({
                staus: '200',
                movieList
            })
        })
    }
}