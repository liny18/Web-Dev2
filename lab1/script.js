const cardsContainer = document.getElementById("cardsContainer");
const prevButton = document.getElementById("prev-button");
const modal = document.getElementById("topic-modal");
let cards = [];
let topics = [];
let currentTopicIndex = 0;
let articles = [];
let timeoutId;
let currentArticleIndex = 0;
let randomIndexes = [];
let lastDisplayedArticles = [];
let currentArticles = [];

for (let i = 0; i < 5; i++) {
  const col = document.createElement("div");
  col.setAttribute("class", "col");
  const card = document.createElement("div");
  card.setAttribute("class", "card h-100 rounded-3 border-dark border-3");
  col.appendChild(card);
  cardsContainer.appendChild(col);
  cards.push(card);
}

window.onload = function() {
  modal.classList.add("show");
  modal.style.display = "block";
};

const submitButton = document.getElementById("submit-topics");
submitButton.addEventListener("click", function() {
    const topic1 = document.getElementById("topic1").value;
    const topic2 = document.getElementById("topic2").value;
    if (topic1.toLowerCase() === topic2.toLowerCase() || topic1 === "" || topic2 === "") {
      alert("Please enter two different topics");
      return;
    }
    topics = [topic1, topic2];
    topics.forEach(topic => {
      for (let i = 1; i <= 5; i++) {
        fetchArticles(topic, i);
      }
    });
    modal.classList.remove("show");
    modal.style.display = "none";
    setTimeout(() => {
      topics.forEach(topic => {
        for (let i = 1; i <= 5; i++) {
          fetchArticles(topic, i);
        }
      });
  }, 60000);
});


// Fetch the articles for the current topic and store them in the "articles" array
function fetchArticles(topic, page) {
  // use nytimes api
  const key = "XeMT0MNnxGp62eLSwkiAfJg2gVZZMhm7";
  const language = "en";
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&page=${page}&language=${language}&api-key=${key}`
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.response.docs.length; i++) {
        const article = data.response.docs[i];
        // get the source, title, author, date, url, and image url of the article
        articles.push({
          source: article.source,
          title: article.headline.main,
          author: article.byline.original,
          date: article.pub_date,
          url: article.web_url,
          urlToImage: article.multimedia.length > 0 ? "https://static01.nyt.com/" + article.multimedia[0].url : "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
        });
      }
      if (topic === topics[1] && page === 5) {
        displayNews();
      }
  })
    .catch(error => console.log(error));
}


function updateCard(article, card) {
    card.innerHTML = "";
    const sourceContainer = document.createElement("div");
    sourceContainer.setAttribute("class", "card-header text-center rounded-1");
    const source = document.createElement("h5");
    source.setAttribute("class", "card-title");
    const link = document.createElement("a");
    link.setAttribute("class", "text-dark text-decoration-none");
    link.setAttribute("target", "_blank");
    link.href = article.url;
    link.textContent = article.source;
    source.appendChild(link);
    sourceContainer.appendChild(source);
    card.appendChild(sourceContainer);

    const imageLink = document.createElement("a");
    imageLink.setAttribute("class", "imageWrapper")
    imageLink.setAttribute("target", "_blank");
    imageLink.href = article.url;
    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top shadow rounded-4 p-2");
    image.src = article.urlToImage;
    imageLink.appendChild(image);
    card.appendChild(imageLink);

    const CardBody = document.createElement("div");
    CardBody.setAttribute("class", "card-body text-center overflow-y-scroll");
    const title = document.createElement("h5");
    title.textContent = article.title;
    CardBody.appendChild(title);
    card.appendChild(CardBody);

    const CardFooter = document.createElement("div");
    CardFooter.setAttribute("class", "card-footer rounded-1 overflow-y-scroll");
    const author = document.createElement("p");
    author.setAttribute("class", "card-text mb-0");
    const small1 = document.createElement("small");
    small1.setAttribute("class", "text-muted");
    small1.textContent = "Author: ";
    author.appendChild(small1);
    CardFooter.appendChild(author);
    const date = document.createElement("p");
    date.setAttribute("class", "card-text");
    const small2 = document.createElement("small");
    small2.setAttribute("class", "text-muted");
    small2.textContent = "Date: ";
    title.textContent = article.title;
    small1.textContent += article.author ? article.author.substring(3) : "Unknown";
    small2.textContent += article.date ? article.date.substring(0, 10) : "Unknown";
    date.appendChild(small2);
    CardFooter.appendChild(date);
    card.appendChild(CardFooter);
}
// Display 5 random articles at a time from the "articles" array
function displayNews() {
  // for (let i = currentArticleIndex; i < currentArticleIndex + 5; i++) {
  //   if (i >= articles.length) {
  //     currentArticleIndex = 0;
  //     break;
  //   }
  lastDisplayedArticles = currentArticles;
  currentArticles = [];
  for (let i = 0; i < 5; i++) {
    let randomIndex = Math.floor(Math.random() * articles.length);
    while (randomIndexes.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * articles.length);
    }
    randomIndexes.push(randomIndex);
    const article = articles[randomIndex];
    currentArticles.push(article);
    // const article = articles[i];
    const card = cards[i];
    updateCard(article, card);
  }
  prevButton.style.display = "block";
  randomIndexes = []; // reset the random indexes
  clearTimeout(timeoutId);
  timeoutId = setTimeout(displayNews, 5000);
  // currentArticleIndex += 5;
  // if (currentArticleIndex >= articles.length) {
  //   currentArticleIndex = 0;
  // }
}

prevButton.addEventListener("click", function() {
  if (lastDisplayedArticles.length > 0) {
    prevButton.style.display = "none";
    currentArticles = lastDisplayedArticles;
    for(let i = 0; i < 5; i++) {
      const article = currentArticles[i];
      const card = cards[i];
      updateCard(article, card);
    }
  }
});