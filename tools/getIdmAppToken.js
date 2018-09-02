/*
  Utility to retrieve the IDM plugin token given the API key and auth service URL.

  Usage example (staging):

    export IDM_API_KEY=xxx IDM_AUTH_URL=https://pluginst.identitymind.com/api/auth; node tools/getIdmAppToken.js

 */

const request = require("request");
const joi = require('joi');

const schema = joi.object({
  IDM_API_KEY: joi.string().required(),
  IDM_AUTH_URL: joi.string().required()
})
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, schema);
if (error) {
  throw new Error(`Configuration validation error: ${error}`)
}

const config = {
  idmApiKey: envVars.IDM_API_KEY,
  idmAuthUrl: envVars.IDM_AUTH_URL,
};

const options = { method: 'GET',
  url: config.idmAuthUrl,
  headers:
    { 'x-api-key': config.idmApiKey } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
