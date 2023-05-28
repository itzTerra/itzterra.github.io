// ALL CREDIT FOR THIS SCRIPT GOES FOR: https://phrase.com/blog/posts/step-step-guide-javascript-localization/

// Turn localization off for debugging purposes
const localize = true;

// The locale our app first shows
const defaultLocale = "cs";

const supportedLocales = ["cs", "en"];

// The active locale
let locale;

// Gets filled with active locale translations
let translations = {};

if (localize){
    document.addEventListener("DOMContentLoaded", () => {
        // Translate the page to the default locale
        const initialLocale = supportedOrDefault(browserLocales(true));
        setLocale(initialLocale);
        
        const switcher = document.querySelector("[data-i18n-switcher]");
        switcher.value = initialLocale;
        switcher.onchange = (e) => {
          // Set the locale to the selected option[value]
          setLocale(e.target.value);
        };
      });
}

function isSupported(locale) {
  return supportedLocales.indexOf(locale) > -1;
}
// Retrieve the first locale we support from the given
// array, or return our default locale
function supportedOrDefault(locales) {
  return locales.find(isSupported) || defaultLocale;
}


function browserLocales(languageCodeOnly = false) {
  return navigator.languages.map((locale) =>
    languageCodeOnly ? locale.split("-")[0] : locale
  );
}

// Load translations for the given locale and translate
// the page to this locale

async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);

  locale = newLocale;

  translations = newTranslations;

  translatePage();
}

// Retrieve translations JSON object for the given

// locale over the network

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);

  return await response.json();
}

// Replace the inner text of each element that has a
// data-i18n attribute with the translation corresponding
// to its data-i18n

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(translateElement);
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n

function translateElement(element) {
  const key = element.getAttribute("data-i18n");

  const translation = translations[key];

  element.innerHTML = translation;
}
