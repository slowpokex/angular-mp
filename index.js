const app = require('./server');

const PORT = process.env.PORT || 8080;

// Starting app point
app.listen(PORT, () => {
  console.log(`Starting on ${PORT} port!`);
});
