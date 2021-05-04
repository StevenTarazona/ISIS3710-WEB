import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import localEsMessages from "./locales/es";
import localEnMessages from "./locales/en";

const URL_ES = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
const URL_EN = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";

function getBrowserLang() {
  const lang = navigator.language || navigator.userLanguage;
  return lang;
}

function getLocale() {
  return getBrowserLang() === "en" ? localEnMessages : localEsMessages;
}

function getURL() {
  return getBrowserLang() === "en" ? URL_EN : URL_ES;
}

ReactDOM.render(
  <IntlProvider locale={getBrowserLang()} messages={getLocale()}>
    <App URL={getURL()}/>
  </IntlProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
