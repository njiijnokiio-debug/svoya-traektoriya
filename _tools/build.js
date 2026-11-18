const fs = require('fs');
const path = require('path');
const L = require('./layout.js');
const { programs, esc } = L;

const homePage = require('./page-home.js');
const { aboutPage, aboutJsonLd } = require('./page-about.js');
const { catalogPage, schedulePage } = require('./page-catalog.js');
const { specialistsPage, storiesPage, faqPage, contactsPage, errorPage } = require('./page-misc.js');
const { privacyPage, termsPage, organizationPage, adminPage } = require('./page-legal.js');
const { programPage, programJsonLd } = require('./page-program.js');

const ROOT = path.join(__dirname, '..');
const OUT = ROOT;

const write = (rel, html) => {
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  console.log('  ' + rel);
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Своя траектория',
  url: L.SITE + '/',
  inLanguage: 'ru-RU',
  publisher: { '@type': 'EducationalOrganization', name: 'Своя траектория' },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [{ ...L.orgJsonLd, '@context': undefined }, websiteJsonLd],
};

const programListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Программы центра «Своя траектория»',
  numberOfItems: programs.length,
  itemListElement: programs.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    url: `${L.SITE}/programs/${p.slug}.html`,
  })),
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: L.data.faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

console.log('Сборка страниц:');

write('index.html', L.layout({
  title: 'Центр «Своя траектория» — речь и развитие в Москве',
  description: 'Логопедия, подготовка к школе, семейные классы и развивающие занятия для детей 2–12 лет. ЮВАО Москвы, метро Текстильщики и Кузьминки. Запись на консультацию.',
  path: 'index.html',
  active: '',
  content: homePage(),
  jsonLd: homeJsonLd,
}));

write('about.html', L.layout({
  title: 'О центре «Своя траектория» — история и подход | Москва',
  description: 'Центр речи, развития и семейного образования с 2015 года. История «Семи пядей» и «кУМквата», переименование в 2026 году, принципы работы и команда.',
  path: 'about.html',
  active: 'about',
  content: aboutPage(),
  jsonLd: aboutJsonLd,
}));

write('programs.html', L.layout({
  title: 'Программы для детей 2–12 лет — каталог | Своя траектория',
  description: '13 программ центра: логопедия, логоритмика, почерк, чтение, подготовка к школе, семейные классы и интенсивы. Фильтры по возрасту, запросу и формату.',
  path: 'programs.html',
  active: 'programs',
  content: catalogPage(),
  jsonLd: programListJsonLd,
}));

write('schedule.html', L.layout({
  title: 'Расписание и стоимость занятий | Своя траектория',
  description: 'Расписание и цены всех программ центра: возраст, время, формат и стоимость. Актуальные данные и ближайшие наборы. Уточнение по телефону +7 985 637-97-72.',
  path: 'schedule.html',
  active: 'schedule',
  content: schedulePage(),
}));

write('specialists.html', L.layout({
  title: 'Специалисты центра — логопеды и психологи | Своя траектория',
  description: 'Команда центра: логопеды, педагоги дошкольного образования, психолог, тренер по двигательному развитию, репетиторы и педагоги семейных классов. Направления работы.',
  path: 'specialists.html',
  active: 'specialists',
  content: specialistsPage(),
}));

write('stories.html', L.layout({
  title: 'Истории и отзывы — «Книга выпускников» | Своя траектория',
  description: 'Традиции центра «Своя траектория»: «Книга выпускников», команда и семейные классы. Настоящие отзывы родителей — в открытой группе ВКонтакте.',
  path: 'stories.html',
  active: 'stories',
  content: storiesPage(),
}));

write('faq.html', L.layout({
  title: 'Вопросы и ответы о занятиях в центре | Своя траектория',
  description: 'Ответы на частые вопросы: с какого возраста, нужна ли ПМПК, как проходит диагностика, абонементы, размер групп, переименование центра и запись.',
  path: 'faq.html',
  active: 'faq',
  content: faqPage(),
  jsonLd: faqJsonLd,
}));

write('contacts.html', L.layout({
  title: 'Контакты и карта — центр на Васильцовском стане | Своя траектория',
  description: 'Адрес центра «Своя траектория»: Москва, ул. Васильцовский стан, д. 5, к. 2. Метро Текстильщики и Кузьминки. Телефон, карта, маршрут и запись.',
  path: 'contacts.html',
  active: 'contacts',
  content: contactsPage(),
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Контакты центра «Своя траектория»',
    url: L.SITE + '/contacts.html',
    mainEntity: { ...L.orgJsonLd, '@context': undefined },
  },
}));

write('privacy.html', L.layout({
  title: 'Политика обработки персональных данных | Своя траектория',
  description: 'Политика обработки персональных данных центра «Своя траектория»: какие данные собираются, цели, сроки, cookie и Яндекс Метрика, права пользователя и отзыв согласия.',
  path: 'privacy.html',
  content: privacyPage(),
}));

write('terms.html', L.layout({
  title: 'Договор и правила посещения занятий | Своя траектория',
  description: 'Правила записи, оплаты, абонементов, переносов и посещения занятий в центре «Своя траектория». Условия фиксируются в договоре.',
  path: 'terms.html',
  content: termsPage(),
}));

write('organization.html', L.layout({
  title: 'Сведения об организации | Своя траектория',
  description: 'Сведения о центре «Своя траектория»: адрес, контакты, образовательные программы, реквизиты и лицензия (уточняются), режим работы.',
  path: 'organization.html',
  content: organizationPage(),
}));

write('admin.html', L.layout({
  title: 'Панель управления — демо | Своя траектория',
  description: 'Демонстрационная панель управления сайтом центра «Своя траектория».',
  path: 'admin.html',
  bodyClass: 'admin-body',
  content: adminPage(),
  noindex: true,
}));

write('404.html', L.layout({
  title: 'Страница не найдена | Своя траектория',
  description: 'Страница не найдена. Перейдите на главную, в каталог программ или в контакты центра «Своя траектория».',
  path: '404.html',
  content: errorPage(),
  noindex: true,
}));

programs.forEach((p) => {
  write(`programs/${p.slug}.html`, L.layout({
    title: p.seo.title,
    description: p.seo.description,
    path: `programs/${p.slug}.html`,
    active: 'programs',
    base: '../',
    content: programPage(p),
    jsonLd: programJsonLd(p),
  }));
});

write('robots.txt', `User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /_tools/
Disallow: /_qa/
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content&yclid&fbclid

Sitemap: ${L.SITE}/sitemap.xml
Host: svoya-traektoriya.ru
`);

const staticPages = [
  ['index.html', '1.0', 'weekly'],
  ['programs.html', '0.9', 'weekly'],
  ['schedule.html', '0.9', 'weekly'],
  ['about.html', '0.8', 'monthly'],
  ['specialists.html', '0.7', 'monthly'],
  ['stories.html', '0.6', 'monthly'],
  ['faq.html', '0.7', 'monthly'],
  ['contacts.html', '0.8', 'monthly'],
  ['privacy.html', '0.3', 'yearly'],
  ['terms.html', '0.3', 'yearly'],
  ['organization.html', '0.3', 'yearly'],
];

const urls = staticPages
  .map(([p, pr, freq]) => {
    const loc = p === 'index.html' ? L.SITE + '/' : `${L.SITE}/${p}`;
    return `  <url><loc>${loc}</loc><lastmod>2026-11-17</lastmod><changefreq>${freq}</changefreq><priority>${pr}</priority></url>`;
  })
  .concat(
    programs.map(
      (p) =>
        `  <url><loc>${L.SITE}/programs/${p.slug}.html</loc><lastmod>2026-11-17</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    )
  )
  .join('\n');

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

write('site.webmanifest', JSON.stringify({
  name: 'Своя траектория',
  short_name: 'Своя траектория',
  description: 'Центр речи, развития и семейного образования в Москве',
  lang: 'ru',
  start_url: '/',
  display: 'standalone',
  background_color: '#fbf9f4',
  theme_color: '#1c312c',
  icons: [
    { src: '/assets/img/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}, null, 2) + '\n');

console.log(`\nГотово: ${programs.length + 12} страниц, sitemap, robots, manifest.`);
