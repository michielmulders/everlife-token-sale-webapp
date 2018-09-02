# EverLife.AI Token Sale Webb App

EverLife token sale web app.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
deploy /dist folder to the http server

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Build Configuration

|Variable               |Example Value|Description|
|-----------------------|-------------|-----------|
|CAPTCH_SITE_KEY        |6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI|Recapthca site key. (Generic dev key is shown as example.)|
|STELLAR_ENV            |development||
|IDM_PLUGIN_JS          |https://cd1st.identitymind.com/idm.min.js||
|IDM_PLUGIN_TOKEN       ||See `tools/getIdmAppToken.js` for how to authenticate and get the token.|

### Using IdentityMind integration for local testing

The IDM plugin integration is locked against the hostname used for the application.
