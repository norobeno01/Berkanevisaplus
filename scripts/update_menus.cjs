const fs = require('fs');

const additions = {
  en: {
    visas: "Visas",
    blog: "Blog",
    searchCountry: "Search for a country...",
    changeCountry: "Change Destination",
    destination: "Destination"
  },
  ar: {
    visas: "التأشيرات",
    blog: "المدونة",
    searchCountry: "ابحث عن دولة...",
    changeCountry: "تغيير الوجهة",
    destination: "الوجهة"
  },
  fr: {
    visas: "Visas",
    blog: "Blog",
    searchCountry: "Rechercher un pays...",
    changeCountry: "Changer de destination",
    destination: "Destination"
  }
};

const langs = ['en', 'ar', 'fr'];
langs.forEach(lang => {
  const file = JSON.parse(fs.readFileSync(`./src/locales/${lang}/translation.json`, 'utf8'));
  Object.assign(file.common, additions[lang]);
  fs.writeFileSync(`./src/locales/${lang}/translation.json`, JSON.stringify(file, null, 2));
});
console.log('done');
