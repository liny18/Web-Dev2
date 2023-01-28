Sources:

https://mdbootstrap.com/docs/standard/forms/search/

https://stackoverflow.com/questions/52813753/how-to-change-the-the-opacity-of-this-bootstrap-4-card-without-affecting-on-the

https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation

https://stackoverflow.com/questions/23968961/css-how-can-i-make-a-font-readable-over-any-color

https://stackoverflow.com/questions/17756649/disable-the-horizontal-scroll

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

https://dribbble.com/shots/14628486-Forecast-Weather-Website-Design/attachments/6322134?mode=media

https://stackoverflow.com/questions/18239430/cannot-set-property-innerhtml-of-null

https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript?page=1&tab=scoredesc#tab-top

https://pixabay.com/api/docs/

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Images

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

https://getbootstrap.com/docs/4.0/components/card/

https://www.tutorialspoint.com/html5/geolocation_getcurrentposition.htm

https://www.w3schools.com/html/html5_geolocation.asp

https://bobbyhadz.com/blog/javascript-cannot-read-property-style-of-null#:~:text=There%20are%202%20main%20reasons,the%20DOM%20elements%20are%20declared.

https://www.youtube.com/watch?v=GXrDEA3SIOQ

youtube.com/watch?v=Jyvffr3aCp0

https://www.w3schools.com/HOWTO/howto_js_trigger_button_enter.asp

Reflection:

I used lab 4 of WebSys as a starting point for my weather app because they were pretty similar. I spruced up the design a bit and made sure the APIs were working right. I also made sure to test it on different devices to ensure it looked good and worked smoothly on all of them.

To gain a deeper understanding of APIs, I utilized Postman and followed a tutorial(https://www.youtube.com/watch?v=VywxIQ2ZXw4) on interacting with the Simple Books API (https://github.com/vdespa/introduction-to-postman-course/blob/main/simple-books-api.md) using the tool. The tutorial provided valuable insight into request and response headers and bodies, and the Simple Books API itself simulates the reservation of a book. The API's response includes a list of JSON objects with fields such as "id", "name", "type", and "available" which, while simple, effectively organizes the data. However, for a more comprehensive book API, additional fields such as "published date" and "genre" would be beneficial.

I also studied the OpenWeather API, which is far more robust than the Simple Books API and accepts a wider range of query parameters, including location and temperature unit, as well as an API key. The JSON object returned by the OpenWeather API is organized in a hierarchical structure, with top-level fields such as "coord", "weather", and "main". The data is grouped by type, making it easy to locate specific information. Each field also utilizes different representations of data, for example, "weather" is represented as an array as a location may have multiple weather conditions, while "coord" is a JSON object with only "lon" and "lat" fields as those are the only pieces of information needed. Overall, the OpenWeather API has a clear and organized data structure. Additionally, the response headers include fields not present in the Simple Books API, such as "Server" with a value of "openresty" and "Access-Control-Allow-Methods" with a value of "GET, POST".

Lastly, I studied the Pixabay API, which I used in this lab to generate images based on weather data from the OpenWeather API. Like the OpenWeather API, the Pixabay API also allows for a variety of query parameters, including location and an API key. The main difference I noticed in the response body is that it includes only three fields: "total", "totalHits", and "hits". After researching the API documentation, I discovered that "total" represents the total number of images on Pixabay.com matching the search query, "totalHits" represents the total number of images returned in the search query, and "hits" is a list of data about each image in the search query. Each image in the "hits" list includes multiple fields such as "id", "pageURL", "type", and "tags", with some fields left empty for certain image objects. Additionally, the response included three cookies, which was not present in the previous two APIs studied. It is unclear to me what purpose these cookies serve, as their names do not provide much context. The response header also includes a larger number of key-value pairs than the previous APIs, with a total of 25, including standard fields such as "data" as well as others like "Transfer-Encoding", "Cache-Control", "X-RateLimit-Limit", "X-RateLimit-Remaining", etc. Two of the keys, "Vary", have the same name but different values.