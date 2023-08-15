
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const getGenres = require('./src/controllers/getGenres.js')
const port = process.env.PORT || 3001;

// sincroniza todos los modelos junto con el servidor al iniciar.
conn.sync({ force: true }).then(async () => {
  await getGenres();
  server.listen(port, () => {
    console.log(`Server listening at ${port}`); 
  });
});
