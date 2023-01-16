const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const cards = [card1, card2, card3, card4, card5];

let topics = ["Movie", "Anime"];
let currentTopicIndex = 0;
let articles = [];

// Fetch the articles for the current topic and store them in the "articles" array
function fetchArticles(topic) {
  console.log("Fetching articles for topic: " + topic);
  //create a new request
  var request = new XMLHttpRequest();
  //open a new connection, using the GET request on the URL endpoint
  const key = "5fdd8ee8d5484e14a0ee36be12f2d8ee";
  const articlenum = 100;
  request.open(
    "GET",
    "https://newsapi.org/v2/everything?q=" +
      topic +
      "&apiKey=" +
      key +
      "&pageSize=" +
      articlenum,
    true
  );

  request.onload = function () {
    // Begin accessing JSON data here
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(this.response);
      articles = articles.concat(data.articles);
      if (topic == topics[topics.length - 1]) {
        displayNews();
        setInterval(displayNews, 5000);
      }
    } else {
      console.log("error");
    }
  };
  //send request
  request.send();
}

let currentArticleIndex = 0;
let randomIndexes = [];

// Display 5 random articles at a time from the "articles" array
function displayNews() {
  // for (let i = currentArticleIndex; i < currentArticleIndex + 5; i++) {
  //   if (i >= articles.length) {
  //     currentArticleIndex = 0;
  //     break;
  //   }
  for(let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * articles.length);
    while (randomIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * articles.length);
    }
    randomIndexes.push(randomIndex);
    const article = articles[randomIndex];
    cards[i].innerHTML = "";
    const sourceContainer = document.createElement("div");
    sourceContainer.setAttribute("class", "card-header text-center");
    const source = document.createElement("h5");
    source.setAttribute("class", "card-title");
    const link = document.createElement("a");
    link.setAttribute("class", "text-dark");
    link.setAttribute("target", "_blank");
    const imageLink = document.createElement("a");
    imageLink.setAttribute("target", "_blank");
    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top rounded-0");
    const CardBody = document.createElement("div");
    CardBody.setAttribute("class", "card-body");
    const title = document.createElement("h5");
    const CardFooter = document.createElement("div");
    CardFooter.setAttribute("class", "card-footer");
    const author = document.createElement("p");
    author.setAttribute("class", "card-text mb-0");
    const small1 = document.createElement("small");
    small1.setAttribute("class", "text-muted");
    small1.textContent = "Author: ";
    const date = document.createElement("p");
    date.setAttribute("class", "card-text");
    const small2 = document.createElement("small");
    small2.setAttribute("class", "text-muted");
    small2.textContent = "Date: ";
    title.textContent = article.title;
    small1.textContent += article.author ? (article.author.split(",").length >= 3 ?  article.author.split(",").slice(0, 1).concat(" et al.").join("") :  article.author) : "Unknown";
    small2.textContent += article.publishedAt.substring(0, 10);
    image.src = article.urlToImage;
    link.href = article.url;
    link.textContent = article.source.name.replace(/.com$/, "");
    imageLink.href = article.url;
    imageLink.appendChild(image);
    source.appendChild(link);
    sourceContainer.appendChild(source);
    CardBody.appendChild(title);
    CardFooter.appendChild(author);
    CardFooter.appendChild(date);
    author.appendChild(small1);
    date.appendChild(small2);
    cards[i].appendChild(sourceContainer);
    cards[i].appendChild(imageLink);
    cards[i].appendChild(CardBody);
    cards[i].appendChild(CardFooter);
  }
  randomIndexes = []; // reset the random indexes
  // currentArticleIndex += 5;
  // if (currentArticleIndex >= articles.length) {
  //   currentArticleIndex = 0;
  // }
}
fetchArticles(topics[currentTopicIndex++]);
fetchArticles(topics[currentTopicIndex]);
