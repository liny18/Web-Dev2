//write a function to get news items from NewsAPI.org
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
var num = 1;

function getNews(topic) {
  //create a new request
  var request = new XMLHttpRequest();
  //open a new connection, using the GET request on the URL endpoint
  const key = "f744a1ec5b1b440fa44933bd0d790d22";
  const articlenum = 5;
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${key}&pageSize=${articlenum}`;
  request.open('GET', url, true);

  request.onload = function () {
    // Begin accessing JSON data here
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(this.response);
      console.log(data.articles);
      data.articles.forEach(article => {
        const sourceContainer = document.createElement('div');
        sourceContainer.setAttribute('class', 'card-header text-center');
        const source = document.createElement('h5');
        source.setAttribute('class', 'card-title');
        const link = document.createElement('a');
        link.setAttribute('class', 'text-dark');
        const image = document.createElement('img');
        image.setAttribute('class', 'card-img-top');
        const CardBody = document.createElement('div');
        CardBody.setAttribute('class', 'card-body');
        const title = document.createElement('h5');
        const author = document.createElement('p');
        author.setAttribute('class', 'card-text mb-0');
        const small1 = document.createElement('small');
        small1.setAttribute('class', 'text-muted');
        small1.textContent = "Author: ";
        const date = document.createElement('p');
        date.setAttribute('class', 'card-text');
        const small2 = document.createElement('small');
        small2.setAttribute('class', 'text-muted');
        small2.textContent = "Date: ";
        title.textContent = article.title.substring(0, 50) + "...";
        small1.textContent += article.author;
        small2.textContent += article.publishedAt.substring(0, 10);
        image.src = article.urlToImage;
        link.href = article.url;
        link.textContent = article.source.name;
        source.appendChild(link);
        sourceContainer.appendChild(source);
        CardBody.appendChild(title);
        CardBody.appendChild(author);
        CardBody.appendChild(date);
        author.appendChild(small1);
        date.appendChild(small2);
        if (num == 1) {
          card1.appendChild(sourceContainer);
          card1.appendChild(image);
          card1.appendChild(CardBody);
          num++;
        }
        else if (num == 2) {
          card2.appendChild(sourceContainer);
          card2.appendChild(image);
          card2.appendChild(CardBody);
          num++;
        }
        else if (num == 3) {
          card3.appendChild(sourceContainer);
          card3.appendChild(image);
          card3.appendChild(CardBody);
          num++;
        }
        else if (num == 4) {
          card4.appendChild(sourceContainer);
          card4.appendChild(image);
          card4.appendChild(CardBody);
          num++;
        }
        else if (num == 5) {
          card5.appendChild(sourceContainer);
          card5.appendChild(image);
          card5.appendChild(CardBody);
          num = 1;
        }
      });
    } else {
      console.log('error');
    }
  }
  //send request
  request.send();
}

getNews("Anime");
// getNews("Dark Souls");
