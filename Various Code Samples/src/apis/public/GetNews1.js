function getNews() {
  return fetch('Your URL to fetch data from')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.news;
    })
    .catch((error) => {
      console.error(error);
    });
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com',
  },
};

const newsJson = fetch('https://crypto-news-live3.p.rapidapi.com/news', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
