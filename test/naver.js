import { Cheerio } from 'cheerio';
import { json } from 'express';
import request from 'request';

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
async function crawl() {
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
            request(options,function(err,response,body){
                console.log(body);
            });
        }
    })
}

crawl();

