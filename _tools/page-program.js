const L = require('./layout.js');
const H = require('./helpers.js');

const { programs, brand, esc, icon } = L;
const { checkList, steps, faqList } = H;

const priceNumber = (p) => {
  if (!p.showPrice) return null;
  const digits = String(p.price).replace(/[^\d]/g, '');
  return digits ? Number(digits) : null;
};

function programFacts(p) {
  const row = (ic, label, value) =>
    `<div class="facts__row">${icon(ic)}<div><span class="facts__label">${label}</span><span class="facts__value">${value}</span></div></div>`;
  return `
  <aside class="facts" aria-label="Коротко о программе">
    <h2>Коротко</h2>
    <div class="facts__rows">
      ${row('users', 'Возраст', esc(p.age))}
      ${row('users', 'Формат', esc(p.formatLabel))}
      ${row('clock', 'Когда', esc(p.schedule))}
      ${row('calendar', 'Длительность', esc(p.duration))}
      ${row('route', 'Где', esc(brand.addressShort))}
    </div>
    <div class="facts__price" data-program-price="${p.slug}">
      <b data-price-value>${esc(p.price)}</b>
      <span data-price-note>${esc(p.priceNote)}</span>
    </div>
    <div class="facts__actions">
      <button class="btn btn--primary" type="button" data-lead-open data-form-type="${esc(p.title)}" data-program="${esc(p.title)}">Записаться ${icon('arrow-right')}</button>
      <a class="btn btn--ghost" href="../schedule.html">Расписание и стоимость</a>
    </div>
    <p class="facts__note">Перезвоним в рабочее время. Стоимость и время подтвердим до записи.</p>
  </aside>`;
}

function programHero(p) {
  return `
<section class="program-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Программы', href: 'programs.html' }, { label: p.title }], '../')}
    <div class="program-hero__grid">
      <div>
        <p class="eyebrow">${esc(p.formatLabel)} · ${esc(p.ageShort)}</p>
        <h1>${esc(p.h1)}</h1>
        <p class="program-hero__lead">${esc(p.summary)}</p>
        <div class="tag-row">
          <span class="tag">${icon('users')}${esc(p.ageShort)}</span>
          <span class="tag">${icon('clock')}${esc(p.duration)}</span>
          <span class="tag">${icon('book')}${esc(p.formatLabel)}</span>
          <span class="tag">${icon('pin')}${esc(brand.metro)}</span>
        </div>
        <div class="program-hero__media">
          ${
            p.image
              ? `<img class="program-hero__photo" src="../assets/img/${p.image}" width="${p.imageW || 1600}" height="${p.imageH || 1068}" alt="${esc(p.title)} — занятие в центре «Своя траектория»" loading="lazy">`
              : ''
          }
          <div class="program-hero__quote">
            <p>${p.slogan ? esc(p.slogan) : 'Сначала — знакомство и понимание запроса. Без диагнозов, сравнений и обещаний «исправить за месяц».'}</p>
            <span>${p.slogan ? 'О курсе' : 'Подход центра'}</span>
          </div>
          <div class="program-hero__numbers">
            <div><b>${esc(p.ageShort)}</b><span>возраст</span></div>
            <div data-program-hero-price="${p.slug}"><b>${esc(p.price)}</b><span>стоимость</span></div>
            <div><b>${esc(p.duration)}</b><span>формат занятия</span></div>
          </div>
        </div>
      </div>
      ${programFacts(p)}
    </div>
  </div>
</section>`;
}

function programBody(p) {
  const directions = p.directions
    ? `
    <section class="program-section">
      <h2>Направления работы</h2>
      <div class="directions-grid">
        ${p.directions.map((d) => `<article class="direction-card"><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p></article>`).join('')}
      </div>
    </section>`
    : '';

  const familyGains = p.familyGains
    ? `
    <section class="program-section">
      <h2>Что это даёт семье</h2>
      ${checkList(p.familyGains)}
    </section>`
    : '';

  const details = p.programDetails
    ? `
    <section class="program-section">
      <h2>Что входит в программу</h2>
      ${checkList(p.programDetails)}
    </section>`
    : '';

  const characters = p.characters
    ? `
    <section class="program-section">
      <h2>С кем занимается ребёнок</h2>
      <div class="character-strip">
        ${p.characters
          .map(
            (c) => `
          <div class="character-mini">
            <img src="../assets/img/${c.file}" width="${c.w || 502}" height="${c.h || 890}" alt="Персонаж ${esc(c.name)}" loading="lazy">
            <div><b>${esc(c.name)}</b><span>${esc(c.quote)}</span></div>
          </div>`
          )
          .join('')}
      </div>
    </section>`
    : '';

  const tradition = p.tradition
    ? `
    <section class="program-section">
      <h2>Традиция центра</h2>
      <p>В конце учебного года дети центра придумывают истории, сами записывают и иллюстрируют их, а центр издаёт «Книгу выпускников». Для многих ребят это первый опыт быть автором — и он остаётся на память.</p>
      <p><a class="link-arrow" href="../stories.html">Как проходит работа над книгой ${icon('arrow-right')}</a></p>
    </section>`
    : '';

  return `
  <div class="container program-content">
    <div class="program-sections">
      <section class="program-section">
        <h2>Кому подходит</h2>
        ${checkList(p.forWhom)}
      </section>

      <section class="program-section">
        <h2>Что меняется</h2>
        <p>Мы не обещаем гарантированных результатов: динамика зависит от возраста, запроса и регулярности занятий. Вот на что направлена работа:</p>
        ${checkList(p.outcomes)}
      </section>

      <section class="program-section">
        <h2>Как проходят занятия</h2>
        ${steps(p.how)}
      </section>

      ${directions}
      ${details}
      ${familyGains}
      ${characters}

      <section class="program-section">
        <h2>Расписание и стоимость</h2>
        <div class="schedule-cards">
          <div class="schedule-card">
            <div class="schedule-card__name">${esc(p.title)}<span>${esc(p.ageShort)}</span></div>
            <div class="schedule-card__body">${esc(p.schedule)}<small>${esc(p.duration)} · ${esc(p.formatLabel)}</small></div>
          </div>
          <div class="schedule-card">
            <div class="schedule-card__name">Стоимость<span>по данным центра</span></div>
            <div class="schedule-card__body">${esc(p.priceNote)}<small>${esc(p.price)}</small></div>
          </div>
        </div>
        <div class="price-box" style="margin-top:12px">
          <div class="price-box__item"><b>${esc(p.price)}</b><span>${p.showPrice ? 'цена по данным центра' : 'точную стоимость назовём до записи'}</span></div>
          <div class="price-box__item"><b>${esc(p.ageShort)}</b><span>${esc(p.formatLabel)} · ${esc(p.duration)}</span></div>
        </div>
      </section>

      ${tradition}

      <section class="program-section">
        <h2>Вопросы об этой программе</h2>
        ${faqList(p.faq)}
      </section>
    </div>
  </div>`;
}

function programRelated(p) {
  return `
<section class="section section--cream">
  <div class="container">
    ${H.sectionHead({
      eyebrow: 'Смотрите также',
      title: 'Похожие программы',
      text: 'Иногда подходящий формат — соседняя программа. Сравните возраст, формат и запрос.'
    })}
    ${L.relatedCards(p.related, '../')}
  </div>
</section>`;
}

function programCta(p) {
  return `
<section class="section section--tight">
  <div class="container">
    <div class="program-cta">
      <div>
        <h2>Обсудим, подходит ли ${esc(p.title)} вашему ребёнку</h2>
        <p>Оставьте имя и телефон — администратор перезвонит, уточнит возраст и запрос, расскажет про свободные места и стоимость.</p>
      </div>
      <div class="program-cta__actions">
        <button class="btn" type="button" data-lead-open data-form-type="${esc(p.title)}" data-program="${esc(p.title)}">Записаться ${icon('arrow-right')}</button>
        <small>Или позвоните: <a href="${brand.phoneHref}">${brand.phone}</a></small>
      </div>
    </div>
  </div>
</section>`;
}

function programPage(p) {
  return programHero(p) + programBody(p) + programRelated(p) + programCta(p);
}

function programJsonLd(p) {
  const price = priceNumber(p);
  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: p.title,
    description: p.summary,
    inLanguage: 'ru-RU',
    url: `${L.SITE}/programs/${p.slug}.html`,
    educationalLevel: p.age,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Своя траектория',
      url: L.SITE + '/',
      telephone: '+7 985 637-97-72',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Васильцовский стан, д. 5, к. 2',
        addressLocality: 'Москва',
        addressCountry: 'RU'
      }
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: p.formats.includes('online') ? 'online' : 'onsite',
      courseWorkload: p.duration
    }
  };
  if (price) {
    course.offers = {
      '@type': 'Offer',
      category: 'Оплата занятий',
      price,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `${L.SITE}/programs/${p.slug}.html`
    };
  }
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
  return { '@context': 'https://schema.org', '@graph': [course, faq] };
}

module.exports = { programPage, programJsonLd, programs };
