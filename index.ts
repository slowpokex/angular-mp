import app from './server';

const PORT: number = Number.parseInt(process.env.PORT) || 8080;

// Starting app point
app.listen(PORT, () => {
  console.log(`Starting on ${PORT} port!`);
});
