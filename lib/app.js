const express = require('express');
const app = express();

app.use(
  require('cors')({
    origin: true,
    credentials: true,
  })
);

app.use(express.static(`${__dirname}/../public`));
app.use(require('cookie-parser')());
app.use(express.json());

// You can remove `Controller` from the filename since they're
// already in the `controllers/` directory
app.use('/api/v1/auth', require('./controllers/authController.js'));
app.use('/api/v1/users', require('./controllers/userController.js'));
app.use('/api/v1/artists', require('./controllers/artistsController'));
app.use('/api/v1/convos', require('./controllers/convoController'));

app.use(require('./middleware/not-found.js'));
app.use(require('./middleware/error.js'));

module.exports = app;
