import fetch from "node-fetch";

export const getToken = async (req,res,next) => {

  const {USERNAME, PASSWORD, GRANT_TYPE, CLIENT_ID, URI_HTTP} = process.env;
  const body = new URLSearchParams({
    username: USERNAME,
    password: PASSWORD,
    grant_type: GRANT_TYPE,
    client_id: CLIENT_ID
  });
  const response = await fetch(`${URI_HTTP}/identity/realms/fintatech/protocol/openid-connect/token`, {
    method: 'post',
    body
  });
  const tokens = await response.text();
  res.locals.token = extractAccessToken(tokens)
  next()
}

export const extractAccessToken = (tokens) => {
  tokens = JSON.parse(tokens)
  try {
    return tokens['access_token']
  } catch (e) {
    return null
  }
}
