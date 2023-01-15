//write a function to get news items from NewsAPI.org

const container = document.getElementById('container');
function getNews() {
  //create a new request
  var request = new XMLHttpRequest();
  //open a new connection, using the GET request on the URL endpoint
  const topic = "Technology";
  const key = "f744a1ec5b1b440fa44933bd0d790d22";
  const url = 'https://newsapi.org/v2/everything?q=' + topic + '&pageSize=100&apiKey=' + key;
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(this.response);
      console.log(data.articles);
      //create elements
      const title = document.createElement('h1');
      const date = document.createElement('p');
      const author = document.createElement('p');
      const description = document.createElement('p');
      const image = document.createElement('img');
      const link = document.createElement('a');
      const source = document.createElement('p');
      data.articles.forEach(article => {
        title.textContent = article.title;
        date.textContent = article.publishedAt.substring(0, 10);
        author.textContent = article.author;
        description.textContent = article.description;
        image.src = article.urlToImage;
        link.textContent = "Read More";
        link.href = article.url;
        source.textContent = article.source.name;
      });
    } else {
      console.log('error');
    }
  }
  //send request
  request.send();
}

getNews();
