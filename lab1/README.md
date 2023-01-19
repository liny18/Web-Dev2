    Specification guide for our news ticker:

        The program fetches data from published news articles.
        The program displays 5 articles at a time on the page.
        The program updates the displayed articles at a fixed interval(3-5 seconds).

    Properties of news articles displayed:

        Title
        Date
        Author
        Link to article
        News publisher
        Cover photo

    This news ticker will be implemented with the following technologies:

        HTML: to create the layout of the page.
        CSS: to style the page.
        JavaScript: to handle the interactions and logic of the program.
        (Optional) Bootstrap 5: to help with styling of the page.
        (Optional) Fetch: to make an HTTP request to API.

    Sketch:

        https://cdn.discordapp.com/attachments/1063494969815486505/1064360410968502272/Untitled_Notebook-2.jpg

Resources:

  https://stackoverflow.com/questions/10387740/five-equal-columns-in-twitter-bootstrap
  
  https://stackoverflow.com/questions/36157105/postman-how-to-make-multiple-requests-at-the-same-time
  
  https://stackoverflow.com/questions/37287153/how-to-get-images-in-bootstraps-card-to-be-the-same-height-width
  
  https://stackoverflow.com/questions/35617795/what-is-the-limit-query-of-google-news-api
  
  https://newsapi.org/docs
  
  https://chat.openai.com (For debugging and optimization)

Reflection:

  This lab reminded me just how bad I am at CSS. Even with Bootstrap, I still struggled to scale everything just right. I had lots of trouble trying to make all the cards on my page the same resize regardless of the text length and image size. After getting lots of help from the "gods" on StackOverflow I was able to implement this. It is certainly not perfect, as the scaling of things can still go off if the screen size is smaller, but it is good enough. It is also 100% mobile compatible thanks to Bootstrap. It also took me quite a bit to find a good API and understand it's usage. I failed to find an API that can get more than 200 news in just one API call, so I went with NewsAPI, which has a cap of 100 news per call, and made 2 separate API calls. Overall, this wasn't a hard lab, but still took me a couple of hours.
  Turns out newsapi does not work outside of local host so I had to spend hours looking for an alternative. I eventually went with new york times but have to make 20 API requests for 200 articles; and the API has 10 API request per minute rate limiting so I had to make the 10 requests a time in a one minute interval. :(

Design choices/creativity:

  Instead of having pre-defined topics, I allow the user to pick two topics of their choice. Onece their topics are submitted, every article on the page is dynamically generated in JavaScript and placed into also dynamically generated cards. The displayNews function displays 5 random news articles at a time instead of in order because I thought it was more interesting. This is done through the use of generating random index using the Math library. Every cycle, the old ones are removed and replaced with 5 new news articles. fetchArticles is only called 2 times during the entire program, which means only 2 API calls. Initially I had the program just repetitively making API calls to cycle back from the start after reaching the end of the list. I soon figured out this was a terrible idea as I quickly ran into rate limiting. To avoid this, I created an array to store all the news articles that filters out the ones without a title, author, or image after the initial API calls and just loop through the array instead. I also used setTimeout to accomplish a 5 second delay between cycles. Initially I used setInterval instead but chatGPT told me setTimeout is better because clearTimeout can be called to prevent multiple calls of the function to pile up and cause performance issues. In addition, I sanitized the news object to display cleaner information. For example, I removed ".com" from the news sources and shortened the authors' list if it had more than 2 authors.
