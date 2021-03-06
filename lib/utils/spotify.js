const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const encodeBody = require('./encodeBody.js');

const tokenExchange = async (code) => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeBody({
      grant_type: 'authorization_code',
      redirect_uri: 'https://vibn.herokuapp.com/api/v1/auth/login/callback',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  });

  const body = await res.json();
  return {
    token: body.access_token,
    refresh: body.refresh_token,
  };
};

const getProfile = async (token) => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const body = await res.json();
  return body;
};

module.exports = {
  tokenExchange,
  getProfile,
};
