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

    const neverFailMovies = [
        {
            'query': 'My Man Godfrey',
            'year': '1936',
        },
    ];

    neverFailMovies.forEach(async (element, index) => {
        if (element !== 0) {
            const query = encodeURI(element.query);
            const { genre, country, year } = element;
            const uri = `https://openapi.naver.com/v1/search/movie.json?query=${query}&yearfrom=${year}&yearto=${year}`
            const options = {
                uri,
                method: 'GET',
                headers: { 
                    'X-Naver-Client-Id': '05I4wjbvKzQXhcfOlovZ',
                    'X-Naver-Client-Secret': 'cQQUrdvXX2'
                }
            };
            let response;
            try {
                response = await request(options)
            } catch (e) {
                // console.log(e);
            }
            if (response) {
                const movies = JSON.parse(response).items;
                console.log(movies[0].title);
            }
            
        }
    });
}

crawl();
