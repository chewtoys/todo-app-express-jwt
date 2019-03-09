const express = require('express');

const app = express();
const PORT = 8181;

// code formating shortcut ctrl+shift+I
// checking server works with giving server local time
app.get('/status',
  (req, res) => {
    const localTime = (new Date())
      .toLocaleDateString();
    res
      .status(200)
      .send(`Server time is ${localTime}.`);
  });

app.get('*',
  (req, res) => {
    res
      .sendStatus(404);
  });

app.listen(PORT, () => {
  console.log(`Server running port: ${PORT}.`);
});
//https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve