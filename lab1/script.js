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
    topics.forEach(topic => fetchArticles(topic));
    modal.classList.remove("show");
    modal.style.display = "none";
});

// Fetch the articles for the current topic and store them in the "articles" array
function fetchArticles(topic) {
  console.log("Fetching articles for topic: " + topic);
  const key = "1c695ca439ca400fbe441d6de251b59f";
  const articlenum = 100;
  const language = "en";
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${key}&pageSize=${articlenum}&language=${language}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      articles = articles.concat(data.articles);
      articles = articles.filter(article => article.title && article.author && article.urlToImage);
      if (topic == topics[topics.length - 1]) {
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
    link.textContent = article.source.name;
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
    small1.textContent += article.author ? (article.author.split(",").length >= 3 ?  article.author.split(",").slice(0, 1).concat(" et al.").join("") :  article.author) : "Unknown";
    small2.textContent += article.publishedAt.substring(0, 10);
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