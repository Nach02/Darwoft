const server = require('./src/app.js');
const { conn } = require('./src/db.js');


conn.sync({ force: false }).then(() => {
  server.listen(3001, async() => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  })
}).catch((err)=>console.log(err)) 
