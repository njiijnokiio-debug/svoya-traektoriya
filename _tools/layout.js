const data = require('../assets/js/data.js');
const { programs, brand, ages, enrollments } = data;

const SITE = 'https://svoya-traektoriya.ru';

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

const socials = (base = '') => `
  <a class="social" href="${brand.vk}" target="_blank" rel="noopener">
    <span class="social__mark" aria-hidden="true">VK</span><span>ВКонтакте</span>${icon('arrow-up-right')}
  </a>
  <a class="social" href="${brand.max}" target="_blank" rel="noopener">
    <span class="social__mark" aria-hidden="true">MAX</span><span>MAX</span>${icon('arrow-up-right')}
  </a>
  <a class="social" href="${brand.telegram}" target="_blank" rel="noopener">
    <span class="social__mark" aria-hidden="true">${icon('send')}</span><span>Telegram</span>${icon('arrow-up-right')}
  </a>`;

const sprite = `
<svg class="sprite" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
  <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>
  <symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M6.6 3.5h2.9l1.5 3.8-2 1.5a12.4 12.4 0 0 0 6.2 6.2l1.5-2 3.8 1.5v2.9a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.6 5.5a2 2 0 0 1 2-2Z"/></symbol>
  <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L4 20l1.1-4.4A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><path d="M15.5 20v-1.6a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="8.8" cy="7.2" r="3.2"/><path d="M17 4.1a3.2 3.2 0 0 1 0 6.2M22 20v-1.6a4 4 0 0 0-3-3.8"/></symbol>
  <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 4h7a3 3 0 0 1 3 3v13a2.4 2.4 0 0 0-2.4-2H4Z"/><path d="M20 4h-3a3 3 0 0 0-3 3v13a2.4 2.4 0 0 1 2.4-2H20Z"/></symbol>
  <symbol id="i-speech" viewBox="0 0 24 24"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z"/><path d="M8 9h8M8 13h5"/></symbol>
  <symbol id="i-waves" viewBox="0 0 24 24"><path d="M3 12c1.8-5.5 3.2-5.5 5 0s3.2 5.5 5 0 3.2-5.5 5 0 3.2 5.5 5 0"/></symbol>
  <symbol id="i-school" viewBox="0 0 24 24"><path d="M3 10l9-6 9 6-9 6-9-6Z"/><path d="M6.5 12.2v4.6c0 1.7 2.5 3.2 5.5 3.2s5.5-1.5 5.5-3.2v-4.6"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
  <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 2.5l2.4 7.1 7.1 2.4-7.1 2.4-2.4 7.1-2.4-7.1-7.1-2.4 7.1-2.4Z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 5.5L20 7"/></symbol>
  <symbol id="i-route" viewBox="0 0 24 24"><path d="M4 19h5.5a3.5 3.5 0 0 0 0-7h-1a3.5 3.5 0 0 1 0-7H15"/><path d="M13 3l2 2-2 2M13 19l2 2-2 2" transform="translate(0 -1)"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="16" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/></symbol>
  <symbol id="i-rub" viewBox="0 0 24 24"><path d="M8 20V5h4.2a4 4 0 0 1 0 8H6.5M6.5 15.5h8.5"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v6M12 7.5h.01"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M21.5 2.5L10.8 13.2M21.5 2.5l-6.8 19.3-3.9-8.6-8.6-3.9 19.3-6.8Z"/></symbol>
  <symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/></symbol>
  <symbol id="i-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2.1 5-5 2.1 2.1-5Z"/></symbol>
</svg>`;

function header(active, base = '') {
  const megaGroup = (title, slugs) => `
    <div class="mega__col">
      <p class="mega__title">${title}</p>
      <ul class="mega__list">
        ${slugs
          .map((slug) => {
            const p = programs.find((x) => x.slug === slug);
            return `<li><a href="${base}programs/${p.slug}.html">${esc(p.cardTitle)}<span>${esc(p.ageShort)}</span></a></li>`;
          })
          .join('')}
      </ul>
    </div>`;

  const navLink = (href, label, key) =>
    `<li><a class="nav__link${active === key ? ' is-active' : ''}" href="${base}${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a></li>`;

  return `
  <a class="skip-link" href="#main">Перейти к содержанию</a>
  <header class="site-header" data-header>
    <div class="container header__inner">
      <a class="logo" href="${base}index.html" aria-label="Своя траектория — на главную">
        <img class="logo__full" src="${base}assets/img/logo-horizontal-color-mono.webp" width="1400" height="110" alt="Своя траектория — центр речи, развития и семейного образования">
        <span class="logo__compact" aria-hidden="true">
          <img src="${base}assets/img/sign-only.webp" width="754" height="419" alt="">
          <span class="logo__compact-text">своя<br>траектория</span>
        </span>
      </a>
      <nav class="nav" id="site-nav" aria-label="Основная навигация">
        <div class="nav__head">
          <span>Меню</span>
          <button class="nav__close" type="button" data-nav-close aria-label="Закрыть меню">${icon('close')}</button>
        </div>
        <ul class="nav__list">
          <li class="has-dropdown" data-dropdown>
            <button class="nav__link nav__link--button${active === 'programs' ? ' is-active' : ''}" type="button" aria-expanded="false" aria-controls="mega-programs">
              Программы ${icon('arrow-right', 'nav__chev')}
            </button>
            <div class="dropdown mega" id="mega-programs">
              <div class="mega__feature">
                <p class="eyebrow">Каталог</p>
                <h3>13 программ для детей от 2 до 12 лет</h3>
                <p>Речь, почерк, чтение, подготовка к школе и семейные классы. Подберите по возрасту или запросу.</p>
                <a class="btn btn--primary btn--sm" href="${base}programs.html">Все программы ${icon('arrow-right')}</a>
              </div>
              ${megaGroup('Речь и развитие', ['logopediya', 'nozhki-ladoshki', 'priklyuchenie-petelki', 'pesochnaya-skazka', 'poznavatelnye-igry', 'uchimsya-chitat', 'online-razvitie-rechi'])}
              ${megaGroup('Школа', ['podgotovka-k-shkole', 'nulevoy-klass', 'semeynye-klassy', 'domashka', 'intensiv-chtenie', 'intensiv-pismo'])}
            </div>
          </li>
          ${navLink('about.html', 'О центре', 'about')}
          <li class="has-dropdown has-dropdown--small" data-dropdown>
            <button class="nav__link nav__link--button" type="button" aria-expanded="false" aria-controls="mega-more">
              Ещё ${icon('arrow-right', 'nav__chev')}
            </button>
            <div class="dropdown dropdown--small" id="mega-more">
              <ul class="mega__simple">
                <li><a href="${base}schedule.html">Расписание и стоимость</a></li>
                <li><a href="${base}specialists.html">Специалисты</a></li>
                <li><a href="${base}stories.html">Истории и отзывы</a></li>
                <li><a href="${base}faq.html">Вопросы и ответы</a></li>
                <li><a href="${base}contacts.html">Контакты и карта</a></li>
              </ul>
            </div>
          </li>
          ${navLink('contacts.html', 'Контакты', 'contacts')}
        </ul>
        <div class="nav__footer">
          <a class="nav__phone" href="${brand.phoneHref}">${icon('phone')}${brand.phone}</a>
          <p>${brand.address}<br>${brand.metro}</p>
          <div class="nav__socials">${socials(base)}</div>
        </div>
      </nav>
      <div class="header__actions">
        <a class="header__phone" href="${brand.phoneHref}">
          <span class="header__phone-label">Позвонить</span>
          <span class="header__phone-value">${brand.phone}</span>
        </a>
        <button class="btn btn--primary btn--sm header__cta" type="button" data-lead-open data-form-type="Записаться">Записаться</button>
        <button class="burger" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Открыть меню" data-burger>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(base = '') {
  return `
  <footer class="footer">
    <div class="footer__pattern" aria-hidden="true"></div>
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="${base}index.html" aria-label="Своя траектория — на главную">
            <img class="footer__logo" src="${base}assets/img/logo-vertical-dark.webp" width="800" height="428" alt="Своя траектория — центр речи, развития и семейного образования">
          </a>
          <p>Центр речи, развития и семейного образования. Работаем с детьми от 2 до 12 лет с 2015 года.</p>
          <div class="socials">${socials(base)}</div>
        </div>
        <div>
          <h2 class="footer__title">Программы</h2>
          <ul class="footer__links">
            <li><a href="${base}programs/logopediya.html">Логопедия</a></li>
            <li><a href="${base}programs/podgotovka-k-shkole.html">Подготовка к школе</a></li>
            <li><a href="${base}programs/semeynye-klassy.html">Семейные классы</a></li>
            <li><a href="${base}programs/priklyuchenie-petelki.html">Приключение Петельки</a></li>
            <li><a href="${base}programs.html">Все программы ${icon('arrow-right')}</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer__title">Центр</h2>
          <ul class="footer__links">
            <li><a href="${base}about.html">О центре</a></li>
            <li><a href="${base}schedule.html">Расписание и стоимость</a></li>
            <li><a href="${base}specialists.html">Специалисты</a></li>
            <li><a href="${base}stories.html">Истории и отзывы</a></li>
            <li><a href="${base}faq.html">Вопросы и ответы</a></li>
            <li><a href="${base}contacts.html">Контакты</a></li>
          </ul>
        </div>
        <div>
          <h2 class="footer__title">Контакты</h2>
          <ul class="footer__contacts">
            <li><a class="footer__phone" href="${brand.phoneHref}">${brand.phone}</a></li>
            <li>${brand.address}</li>
            <li>Метро «Текстильщики» и «Кузьминки», ЮВАО</li>
            <li class="footer__hint">Часы работы уточняйте по телефону</li>
          </ul>
          <button class="btn btn--primary btn--sm footer__cta" type="button" data-lead-open data-form-type="Заказать звонок">Заказать звонок</button>
        </div>
      </div>
      <div class="footer__bottom">
        <div>
          <p>© 2015–2026 Центр «Своя траектория». Москва.</p>
          <p class="footer__org">Сведения об организации: ИНН/ОГРН уточняются. Образовательная лицензия: уточняется.</p>
        </div>
        <ul class="footer__legal">
          <li><a href="${base}privacy.html">Политика обработки персональных данных</a></li>
          <li><a href="${base}privacy.html#consent">Согласие на обработку</a></li>
          <li><a href="${base}terms.html">Договор и правила</a></li>
          <li><a href="${base}admin.html">Панель управления</a></li>
        </ul>
        <img class="footer__seal" src="${base}assets/img/badge-round.webp" width="902" height="902" alt="" loading="lazy">
      </div>
    </div>
  </footer>`;
}

const formOptions = () => `
  <option value="">Не выбрано</option>
  ${programs.map((p) => `<option value="${esc(p.title)}">${esc(p.title)} · ${esc(p.ageShort)}</option>`).join('')}`;

const ageOptions = () => `
  <option value="">Не указан</option>
  <option>2–3 года</option>
  <option>3,5–4 года</option>
  <option>4–5 лет</option>
  <option>5–6 лет</option>
  <option>1–2 класс</option>
  <option>3–4 класс</option>
  <option>Другой возраст</option>`;

function leadForm({ id, formType = 'Записаться', title = 'Записаться', light = false, program = '', compact = false, base = '' }) {
  return `
  <form class="lead-form${light ? ' lead-form--light' : ''}" data-lead-form data-form-type="${esc(formType)}" novalidate>
    <input type="hidden" name="formType" value="${esc(formType)}">
    <input type="hidden" name="page" value="" data-page-field>
    <input class="hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">
    <div class="field-row">
      <div class="field">
        <label for="${id}-name">Ваше имя</label>
        <input id="${id}-name" name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться" required aria-describedby="${id}-name-error">
        <span class="field__error" id="${id}-name-error" data-error-for="name"></span>
      </div>
      <div class="field">
        <label for="${id}-phone">Телефон</label>
        <input id="${id}-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 999 000-00-00" required data-phone aria-describedby="${id}-phone-error">
        <span class="field__error" id="${id}-phone-error" data-error-for="phone"></span>
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label for="${id}-age">Возраст ребёнка</label>
        <select id="${id}-age" name="age">${ageOptions()}</select>
      </div>
      <div class="field">
        <label for="${id}-program">Интересующая программа</label>
        <select id="${id}-program" name="program">${formOptions()}</select>
      </div>
    </div>
    <div class="field">
      <label for="${id}-comment">С чем пришли? <span>необязательно</span></label>
      <textarea id="${id}-comment" name="comment" rows="${compact ? 2 : 3}" placeholder="Например: ребёнок не выговаривает звуки, нужна подготовка к школе"></textarea>
    </div>
    <label class="consent">
      <input type="checkbox" name="consent" required aria-describedby="${id}-consent-error">
      <span>Согласен(на) на обработку персональных данных в соответствии с <a href="${base}privacy.html" target="_blank" rel="noopener">политикой</a>. Согласие можно отозвать в любой момент.</span>
    </label>
    <span class="field__error field__error--consent" id="${id}-consent-error" data-error-for="consent"></span>
    <button class="btn btn--primary lead-form__submit" type="submit">${title} ${icon('arrow-right')}</button>
    <p class="lead-form__note">Перезвоним в рабочее время. Без спама и рассылок.</p>
    <div class="form-success" role="status" aria-live="polite" hidden>
      <span class="form-success__icon">${icon('check')}</span>
      <div>
        <strong>Спасибо! Заявка отправлена.</strong>
        <p>Перезвоним в рабочее время, уточним детали и предложим удобное время.</p>
      </div>
    </div>
  </form>`;
}

function leadDialog(base = '') {
  return `
  <dialog class="lead-dialog" id="lead-dialog" aria-labelledby="lead-dialog-title">
    <div class="dialog__head">
      <p class="eyebrow" data-dialog-eyebrow>Заявка</p>
      <h2 id="lead-dialog-title" data-dialog-title>Записаться</h2>
      <p class="dialog__lead" data-dialog-lead>Оставьте имя и телефон — администратор перезвонит, уточнит запрос и предложит удобное время.</p>
      <button class="dialog__close" type="button" data-dialog-close aria-label="Закрыть">${icon('close')}</button>
    </div>
    ${leadForm({ id: 'modal', formType: 'Записаться', title: 'Отправить заявку', base })}
  </dialog>`;
}

const bottomBar = () => `
  <nav class="mobile-bar" aria-label="Быстрая связь">
    <a class="mobile-bar__item" href="${brand.phoneHref}">${icon('phone')}<span>Позвонить</span></a>
    <a class="mobile-bar__item" href="${brand.telegram}" target="_blank" rel="noopener">${icon('chat')}<span>Написать</span></a>
    <button class="mobile-bar__item mobile-bar__item--cta" type="button" data-lead-open data-form-type="Записаться">${icon('spark')}<span>Записаться</span></button>
  </nav>`;

const cookieBanner = (base = '') => `
  <div class="cookie" data-cookie-banner hidden role="dialog" aria-label="Использование cookie" aria-live="polite">
    <div class="cookie__text">
      <strong>Cookie и аналитика</strong>
      <p>Мы используем необходимые cookie для работы сайта и, с вашего согласия, Яндекс Метрику — чтобы понимать, какие страницы полезны. <a href="${base}privacy.html">Политика</a></p>
    </div>
    <div class="cookie__actions">
      <button class="btn btn--primary btn--sm" type="button" data-cookie="accept">Принять</button>
      <button class="btn btn--outline-light btn--sm" type="button" data-cookie="necessary">Только необходимые</button>
    </div>
  </div>`;

function layout({
  title,
  description,
  path = 'index.html',
  active = '',
  bodyClass = '',
  content = '',
  jsonLd = null,
  ogImage = 'assets/img/og-cover.jpg',
  base = '',
  noindex = false,
}) {
  const canonical = path === 'index.html' || path === '' ? SITE + '/' : SITE + '/' + path.replace(/^\/+/, '');
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  ${noindex ? '<meta name="robots" content="noindex, nofollow">' : ''}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Своя траектория">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE}/${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Своя траектория — центр речи, развития и семейного образования">
  <meta property="og:locale" content="ru_RU">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${SITE}/${ogImage}">
  <meta name="theme-color" content="#1c312c">
  <meta name="yandex-metrika-id" content="">
  <link rel="icon" href="${base}favicon.ico" sizes="any">
  <link rel="icon" type="image/png" href="${base}assets/img/favicon-32.png" sizes="32x32">
  <link rel="apple-touch-icon" href="${base}assets/img/apple-touch-icon.png">
  <link rel="manifest" href="${base}site.webmanifest">
  <link rel="preload" href="${base}assets/fonts/onest-cyrillic.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${base}assets/fonts/onest-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}assets/css/style.css">
  <script>document.documentElement.classList.add('js');</script>
  <script src="${base}assets/js/data.js" defer></script>
  <script src="${base}assets/js/site.js" defer></script>
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
</head>
<body class="${bodyClass}" data-page="${esc(path)}">
${sprite}
${header(active, base)}
<main id="main">
${content}
</main>
${footer(base)}
${bottomBar()}
${leadDialog(base)}
${cookieBanner(base)}
</body>
</html>`;
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: 'Своя траектория',
  alternateName: ['Центр речи, развития и семейного образования «Своя траектория»', 'кУМкват', 'Семь пядей'],
  description: 'Центр речи, развития и семейного образования в Москве: логопедия, подготовка к школе, семейные классы для детей от 2 до 12 лет.',
  url: SITE + '/',
  logo: SITE + '/assets/img/logo-horizontal-color-mono.png',
  image: SITE + '/assets/img/photo-kids-hands-up-16x9.webp',
  telephone: '+7 985 637-97-72',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Васильцовский стан, д. 5, к. 2',
    addressLocality: 'Москва',
    addressRegion: 'Москва',
    addressCountry: 'RU',
  },
  areaServed: ['Москва', 'Текстильщики', 'Кузьминки', 'ЮВАО'],
  sameAs: [brand.vk, brand.max, brand.telegram],
};

const breadcrumbs = (items = [], base = '') => `
  <nav class="breadcrumbs" aria-label="Хлебные крошки">
    <a href="${base}index.html">Главная</a>
    ${items
      .map(
        (it, i) =>
          `<span aria-hidden="true">/</span>${
            i === items.length - 1 || !it.href
              ? `<span aria-current="page">${esc(it.label)}</span>`
              : `<a href="${base}${it.href}">${esc(it.label)}</a>`
          }`
      )
      .join('')}
  </nav>`;

const statusBadge = (p) =>
  `<span class="status status--${p.status}">${esc(p.statusLabel)}</span>`;

const programCard = (p, base = '') => `
  <article class="program-card" data-program-card data-age="${p.ageBuckets.join(' ')}" data-format="${p.formats.join(' ')}" data-request="${p.requestTags.join(' ')}" data-time="${p.timeTags.join(' ')}" data-slug="${p.slug}">
    <div class="program-card__top">
      <span class="age-chip">${esc(p.ageShort)}</span>
      ${statusBadge(p)}
    </div>
    <h3><a href="${base}programs/${p.slug}.html">${esc(p.cardTitle)}</a></h3>
    <p class="program-card__summary">${esc(p.summary)}</p>
    <div class="program-card__meta">
      <span>${icon('clock')}${esc(p.duration)}</span>
      <span>${icon('users')}${esc(p.formatLabel)}</span>
    </div>
    <div class="program-card__foot">
      <p class="program-card__price">${esc(p.price)}${p.showPrice ? '<small>за занятие / абонемент</small>' : '<small>уточним при записи</small>'}</p>
      <a class="program-card__link" href="${base}programs/${p.slug}.html">Подробнее ${icon('arrow-right')}</a>
    </div>
  </article>`;

const relatedCards = (slugs, base = '../') => `
  <div class="program-grid program-grid--related">
    ${slugs
      .map((slug) => {
        const p = programs.find((x) => x.slug === slug);
        return p ? programCard(p, base) : '';
      })
      .join('')}
  </div>`;

module.exports = {
  data,
  programs,
  brand,
  ages,
  enrollments,
  SITE,
  esc,
  icon,
  socials,
  header,
  footer,
  leadForm,
  leadDialog,
  bottomBar,
  cookieBanner,
  layout,
  orgJsonLd,
  breadcrumbs,
  statusBadge,
  programCard,
  relatedCards,
};
