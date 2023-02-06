const express = require('express');
const app = express();
const port = 3001;

app.get('/api', (req, res) => {
  res.json({ "users": ["user1", "user2", "user3"] });
});

app.listen(port, () => console.log(`Listening on port ${port}`));