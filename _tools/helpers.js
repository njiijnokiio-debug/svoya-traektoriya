const { programs, brand, esc, icon } = require('./layout.js');

const sectionHead = ({ eyebrow, title, text, link, dark = false, id = '' }) => `
  <div class="section-head${dark ? ' section-head--dark' : ''}"${id ? ` id="${id}"` : ''}>
    <div class="section-head__text">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
      <h2>${title}</h2>
      ${text ? `<p>${text}</p>` : ''}
    </div>
    ${link ? `<div class="section-head__link">${link}</div>` : ''}
  </div>`;

const linkArrow = (href, label) =>
  `<a class="link-arrow" href="${href}">${label} ${icon('arrow-right')}</a>`;

const checkList = (items, cls = 'check-list') => `
  <ul class="${cls}">
    ${items.map((t) => `<li>${icon('check')}<span>${t}</span></li>`).join('')}
  </ul>`;

const steps = (items) => `
  <ol class="steps">
    ${items.map((t) => `<li><p>${t}</p></li>`).join('')}
  </ol>`;

const faqList = (items, openFirst = false) => `
  <div class="faq-list">
    ${items
      .map(
        (f, i) => `
      <details class="faq-item"${openFirst && i === 0 ? ' open' : ''}>
        <summary>${esc(f.q)}<span class="faq-item__icon">${icon('plus')}</span></summary>
        <div class="faq-item__body"><p>${f.a}</p></div>
      </details>`
      )
      .join('')}
  </div>`;

const teamCards = () =>
  require('./layout.js').data.specialists
    .map(
      (s) => `
    <article class="team-card">
      <span class="team-card__avatar" aria-hidden="true">${esc(s.initials)}</span>
      <h3>${esc(s.name)}</h3>
      <p class="team-card__role">${esc(s.role)}</p>
      <p>${esc(s.text)}</p>
    </article>`
    )
    .join('');

const leadPanel = ({ title = 'Расскажите о ребёнке — подскажем, с чего начать', text = 'Оставьте имя и телефон. Администратор перезвонит в рабочее время, уточнит запрос и предложит удобное время для знакомства.', formTitle = 'Отправить заявку', formType = 'Записаться', id = 'lead' }) => `
  <div class="lead-panel" id="${id}">
    <p class="eyebrow">Заявка</p>
    <h2>${title}</h2>
    <p>${text}</p>
    ${require('./layout.js').leadForm({ id: id + '-form', formType, title: formTitle, light: true })}
  </div>`;

const contactCard = ({ title = 'Приходите знакомиться', button = 'Записаться на консультацию' } = {}) => `
  <div class="contact-card">
    <h2>${title}</h2>
    <ul class="contact-list">
      <li>${icon('pin')}<span><b>Адрес</b>${brand.address}<br><small>${brand.metro} · ${brand.district}</small></span></li>
      <li>${icon('phone')}<span><b>Телефон</b><a href="${brand.phoneHref}">${brand.phone}</a></span></li>
      <li>${icon('clock')}<span><b>Часы работы</b>Уточняйте по телефону — администратор подскажет удобное время</span></li>
      <li>${icon('route')}<span><b>Как добраться</b><a href="${brand.route}" target="_blank" rel="noopener">Построить маршрут в Яндекс Картах ${icon('arrow-up-right')}</a></span></li>
    </ul>
    <div class="contact-card__actions">
      <button class="btn btn--primary" type="button" data-lead-open data-form-type="Записаться">${button} ${icon('arrow-right')}</button>
    </div>
    <p class="contact-note">Не любите звонить? Напишите в <a href="${brand.telegram}" target="_blank" rel="noopener">Telegram</a> или <a href="${brand.vk}" target="_blank" rel="noopener">ВКонтакте</a>.</p>
  </div>`;

const pageHero = ({ eyebrow, title, lead, actions = '', center = false }) => `
  <section class="page-hero${center ? ' page-hero--center' : ''}">
    <div class="container">
      <div class="page-hero__inner">
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
        <h1>${title}</h1>
        ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
        ${actions ? `<div class="page-hero__actions">${actions}</div>` : ''}
      </div>
    </div>
  </section>`;

const contactCta = (opts = {}) => `
  <section class="section section--tight">
    <div class="container">
      <div class="contact-split">
        ${contactCard(opts)}
        ${leadPanel(opts)}
      </div>
    </div>
  </section>`;

const programGrid = (list, base = '') =>
  list.map((p) => require('./layout.js').programCard(p, base)).join('');

module.exports = {
  sectionHead,
  linkArrow,
  checkList,
  steps,
  faqList,
  teamCards,
  leadPanel,
  contactCard,
  pageHero,
  contactCta,
  programGrid,
  programs,
  brand,
  esc,
  icon,
};
