import cheerio from 'cheerio';
import request from 'request-promise';
import mysql from 'sync-mysql';


import db from './db';

const db_conn = new mysql({
    host: 'ec2-3-137-156-70.us-east-2.compute.amazonaws.com',
    port: '3306',
    user: 'carrot',
    password: 'carrot2021',
    database: 'Tori'
})

function crawl() {
    const neverFailMovies = [
        {
            'query': '인터스텔라',
            'genre': '18',
            'country': 'US',
            'year': '2014',
        },
        {
            'query': '인셉션',
            'country': 'US',
            'year': '2010',
        },
        {
            'query': '인타임',
            'country': 'US',
            'year': '2011',
        },
        {
            'query': '빠삐용',
            'country': 'FR',
            'year': '1973',
        },
    ];

    neverFailMovies.forEach((element, index) => {
        if (element !== 0) {
            const query = encodeURI(element.query);
            const { genre, country, year } = element;
            const uri = `https://openapi.naver.com/v1/search/movie.json?query='${query}'&display=1&country=${country}&genre=${genre}&yearfrom=${year}&yearto=${year}`
            const options = {
                uri,
                method: 'GET',
                headers: { 
                    'X-Naver-Client-Id': '05I4wjbvKzQXhcfOlovZ',
                    'X-Naver-Client-Secret': 'cQQUrdvXX2'
                }
            };
            request(options, function(error, response, body){
                const obj = JSON.parse(body);
                const title = obj.items[0].title;
                const link = obj.items[0].link;
                const image = obj.items[0].image;
                const subtitle = obj.items[0].subtitle;
                const pubDate = obj.items[0].pubDate;
                const director = obj.items[0].director;
                const actor = obj.items[0].actor;
                const params = [title, link, image, subtitle, pubDate, director, actor];
                db_conn.query("INSERT INTO test_naver(title, link, image, subtitle, pubDate, director, actor)  VALUES(?, ?, ?, ?, ?, ?, ?)",params, function(err) {
                    if(err) console.log('query is not excuted. insert fail...\n' + err);
                    else res.redirect('/list');
                });
                // console.log(body);
            })
        }
    });
}

setTimeout(() => crawl(), 3000);
// crawl();
