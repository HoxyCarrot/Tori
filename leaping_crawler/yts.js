import cheerio from 'cheerio';
import request from 'request-promise';
import mysql from 'sync-mysql';

async function crawl() {
    const db_conn = await new mysql({
        host: 'ec2-3-137-156-70.us-east-2.compute.amazonaws.com',
        port: '3306',
        user: 'carrot',
        password: 'carrot2021',
        database: 'Tori'
    })

    // 1~759페이지 까지 존재
    // 현재 i=1~19 까지 완료
    const entries = [];
    for(var i = 1; i < 20; i++) {
		let response;
        try {
            response = await request({ url: `https://yts.mx/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=50&page=${i}` });
        } catch (e) {
            // console.log(e);
        }
        if (response) {
            const movies  = JSON.parse(response).data.movies
            movies.forEach(element => {
                const entry = [
                    element.id,
                    element.url,
                    element.title,
                    element.year,
                    element.rating,
                    element.genres === undefined ? null : element.genres.length > 1 ? element.genres.join(' | ') : element.genres[0],
                    element.runtime,
                    element.large_cover_image,
                ];
                // entries.push(entry);
                
                db_conn.query("INSERT INTO Tori_yts_movie_list(yts_id, url, title, year, rating, genres, runtime, cover)  VALUES(?, ?, ?, ?, ?, ?, ?, ?)", entry);
            });
        }  
    }
    // console.log(entries.length);
    
}

crawl();
