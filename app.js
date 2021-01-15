const express = require("express");
const getRate = require('./controllers/rate.controller')

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome the Rate Exchanger main route.')
})

app.get('/api/rates', getRate);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  });

app.listen(port, () => console.log(`App listening on port: ${port}`));