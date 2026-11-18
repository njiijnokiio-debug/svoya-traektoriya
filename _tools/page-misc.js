const L = require('./layout.js');
const H = require('./helpers.js');

const { brand, esc, icon } = L;
const { sectionHead, linkArrow, checkList, faqList, contactCta, pageHero } = H;

function specialistsPage() {
  const cards = L.data.specialists
    .map(
      (s) => `
      <article class="team-card" data-reveal>
        <span class="team-card__avatar" aria-hidden="true">${esc(s.initials)}</span>
        <h3>${esc(s.name)}</h3>
        <p class="team-card__role">${esc(s.role)}</p>
        <p>${esc(s.text)}</p>
      </article>`
    )
    .join('');

  return `
${pageHero({
  eyebrow: 'Специалисты',
  title: 'Команда, которая работает с детьми каждый день',
  lead: 'В центре работают логопеды, педагоги дошкольного образования, психолог, тренер по двигательному развитию, репетиторы и педагоги семейных классов. Ниже — направления работы команды.',
  actions: `<button class="btn btn--primary" type="button" data-lead-open data-form-type="Подобрать специалиста">Подобрать специалиста ${icon('arrow-right')}</button><a class="btn btn--ghost" href="programs.html">Смотреть программы</a>`
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Направления',
      title: 'Кто чем помогает',
      text: 'Один запрос может требовать разных специалистов. На первой встрече администратор и педагог помогают понять, с кого начать.'
    })}
    <div class="team-grid team-grid--six">${cards}</div>
    <p class="team-note">${icon('info')}<span>Персональные данные специалистов — имена, образование, фотографии и стаж — публикуются только после согласования с каждым членом команды. Сейчас на сайте указаны направления работы.</span></p>
  </div>
</section>

<section class="section section--cream">
  <div class="container split">
    <div>
      <p class="eyebrow">Как мы работаем</p>
      <h2 style="margin-top:14px">Специалист не «чинит» ребёнка</h2>
      <p class="split__lead">Задача педагога — понять, как ребёнок учится, и создать условия, в которых получается. Без давления, сравнений и обещаний, которых мы не можем выполнить.</p>
    </div>
    <div>
      ${checkList([
        'Сначала диагностика или консультация, затем программа',
        'Понятные цели и регулярная обратная связь родителям',
        'Работа в команде: логопед, психолог, педагоги',
        'Никаких диагнозов и медицинских обещаний',
        'Рекомендации, что делать дома между занятиями',
        'Уважение к темпу и возможностям ребёнка'
      ])}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Подбор',
      title: 'С чего начать, если не знаете, к кому идти',
      text: 'Опишите запрос в двух словах — этого достаточно для первого шага.'
    })}
    <div class="request-grid">
      ${L.data.requests
        .map(
          (r) => `
        <a class="request-card" href="${r.href}">
          <span class="request-card__icon">${icon(r.icon)}</span>
          <span class="request-card__body"><h3>${esc(r.label)}</h3><p>${esc(r.note)}</p></span>
          <span class="request-card__arrow">${icon('arrow-up-right')}</span>
        </a>`
        )
        .join('')}
    </div>
  </div>
</section>

${contactCta({ title: 'Подобрать специалиста' })}
`;
}

function storiesPage() {
  return `
${pageHero({
  eyebrow: 'Истории и отзывы',
  title: 'Истории, которые остаются в памяти',
  lead: 'Мы не придумываем отзывы и не публикуем чужие слова без разрешения. Зато можем рассказать о традициях центра — и показать, где почитать настоящие впечатления родителей.',
  actions: `<a class="btn btn--primary" href="${brand.vk}" target="_blank" rel="noopener">Отзывы во ВКонтакте ${icon('arrow-up-right')}</a><a class="btn btn--ghost" href="#book">Книга выпускников</a>`
})}

<section class="section" id="book">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Традиция',
      title: '«Книга выпускников»',
      text: 'В конце учебного года дети центра придумывают истории, сами записывают и иллюстрируют их. Центр собирает работы и издаёт книгу — настоящую, которую можно держать в руках.'
    })}
    <div class="book-spread" data-reveal>
      <div class="book-spread__page">
        <h3>Не про оценку, а про авторство</h3>
        <p>Ребёнок проходит путь от идеи до готовой истории: придумать, записать, нарисовать, увидеть свою работу в книге. Это опыт, который остаётся с ним.</p>
        <p>В работе участвуют дети разных возрастов — от дошкольников до школьников. Истории получаются разными, как и их авторы.</p>
      </div>
      <div class="book-spread__page">
        <h3>Что остаётся после года</h3>
        <p>Книга, которую можно перечитать через десять лет. Привычка доводить начатое до конца. И ощущение, что твой голос важен.</p>
        <img src="assets/img/logo-vertical-yellow.webp" width="800" height="504" alt="" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Традиции',
      title: 'Три вещи, которые делают центр центром',
      text: 'Это не рекламные обещания, а то, что происходит из года в год.'
    })}
    <div class="stories-grid">
      <article class="story-card">
        <p class="story-card__year">Каждый год</p>
        <h3>Книга выпускников</h3>
        <p>Дети придумывают и иллюстрируют истории, а центр издаёт из них книгу.</p>
      </article>
      <article class="story-card">
        <p class="story-card__year">С 2015 года</p>
        <h3>Одна команда</h3>
        <p>Центр менял название, но специалисты и адрес оставались прежними.</p>
      </article>
      <article class="story-card">
        <p class="story-card__year">1–4 класс</p>
        <h3>Семейные классы</h3>
        <p>Мини-класс 6–8 человек, где каждый идёт в своём темпе и находит друзей.</p>
      </article>
      <article class="story-card story-card--empty">
        <p>Здесь может быть история вашей семьи</p>
      </article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="review-card">
      <div>
        <h3>Настоящие отзывы — в сообществе центра</h3>
        <p>В группе ВКонтакте родители делятся впечатлениями, задают вопросы и обсуждают занятия. Мы не переносим отзывы на сайт без согласия авторов.</p>
      </div>
      <div class="review-card__actions">
        <a class="btn btn--primary" href="${brand.vk}" target="_blank" rel="noopener">Открыть ВКонтакте ${icon('arrow-up-right')}</a>
        <a class="btn btn--ghost" href="${brand.telegram}" target="_blank" rel="noopener">Написать в Telegram</a>
      </div>
    </div>
  </div>
</section>

${contactCta()}
`;
}

function faqPage() {
  return `
${pageHero({
  eyebrow: 'Вопросы и ответы',
  title: 'Отвечаем на частые вопросы',
  lead: 'Собрали то, о чём спрашивают чаще всего: про возраст, ПМПК, диагностику, абонементы, группы и переименование центра. Если вашего вопроса нет — позвоните или напишите.',
  actions: `<button class="btn btn--primary" type="button" data-lead-open data-form-type="Задать вопрос">Задать вопрос ${icon('arrow-right')}</button><a class="btn btn--ghost" href="contacts.html">Контакты</a>`
})}

<section class="section">
  <div class="container">
    ${faqList(L.data.faq, true)}
    <p style="margin-top:24px;font-size:14px;color:var(--muted)">Не нашли ответ? Позвоните по телефону <a href="${brand.phoneHref}" style="color:var(--green-dark);text-decoration:underline">${brand.phone}</a> или оставьте заявку — администратор перезвонит.</p>
  </div>
</section>

${contactCta({ title: 'Остались вопросы?' })}
`;
}

function contactsPage() {
  return `
${pageHero({
  eyebrow: 'Контакты',
  title: 'Как нас найти',
  lead: 'Москва, ул. Васильцовский стан, д. 5, к. 2. Это ЮВАО, рядом метро «Текстильщики» и «Кузьминки». Позвоните — администратор подскажет удобное время для визита.',
  actions: `<a class="btn btn--primary" href="${brand.route}" target="_blank" rel="noopener">Построить маршрут ${icon('route')}</a><a class="btn btn--ghost" href="${brand.phoneHref}">Позвонить</a>`
})}

<div class="container contacts-grid">
  <div class="contact-main">
    <div class="contact-block">
      <h2>Адрес и телефон</h2>
      <p>${brand.address}<br>${brand.metro} · ${brand.district}</p>
      <p style="margin-top:10px"><a href="${brand.phoneHref}" style="font-size:20px;font-weight:500;color:var(--ink)">${brand.phone}</a></p>
      <p style="margin-top:10px">Часы работы уточняйте по телефону — администратор подскажет актуальное время и свободные окна для консультации.</p>
      <div class="socials" style="margin-top:16px">${L.socials()}</div>
    </div>
    <div class="contact-block">
      <h2>Как добраться</h2>
      <p>Ближайшие станции метро — «Текстильщики» и «Кузьминки». Точный маршрут удобнее смотреть в Яндекс Картах: кнопка ниже открывает построение маршрута до центра.</p>
      <p style="margin-top:12px"><a class="link-arrow" href="${brand.route}" target="_blank" rel="noopener">Построить маршрут ${icon('arrow-up-right')}</a></p>
    </div>
    <div class="contact-block">
      <h2>Сведения об организации</h2>
      <p>Полное наименование, ИНН, ОГРН и данные образовательной лицензии уточняются и будут опубликованы до начала рекламной кампании.</p>
      <p style="margin-top:8px">Политика обработки персональных данных — <a href="privacy.html" style="color:var(--green-dark);text-decoration:underline">в отдельном разделе</a>.</p>
    </div>
  </div>
  <div class="map">
    <iframe src="${brand.mapEmbed}" title="Карта: центр «Своя траектория» на ул. Васильцовский стан, 5, к. 2" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe>
    <div class="map__bar">
      <p><strong>${esc(brand.addressShort)}</strong>${esc(brand.metro)} · ${esc(brand.district)}</p>
      <a class="btn btn--primary btn--sm" href="${brand.route}" target="_blank" rel="noopener">Маршрут ${icon('route')}</a>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="contact-split">
      <div class="contact-block">
        <h2>Как проходит запись</h2>
        ${H.steps([
          'Оставляете заявку или звоните. Администратор уточняет возраст ребёнка и запрос.',
          'Подбираем программу, специалиста и удобное время. Если нужна диагностика — предлагаем её.',
          'Приходите знакомиться. После встречи обсуждаем формат, стоимость и расписание.'
        ])}
        <p style="margin-top:16px;font-size:13px;color:var(--muted)">Без заключения ПМПК можно прийти на индивидуальные занятия и в семейные классы.</p>
      </div>
      ${H.leadPanel({ title: 'Оставьте заявку', text: 'Перезвоним в рабочее время, уточним детали и предложим удобное время для знакомства.' })}
    </div>
  </div>
</section>
`;
}

function errorPage() {
  return `
<section class="error-page">
  <div class="container">
    <p class="error-page__code">404</p>
    <h1>Такой страницы нет</h1>
    <p>Возможно, ссылка устарела или в адресе опечатка. Ничего страшного — вот несколько путей, куда можно пойти дальше.</p>
    <div class="page-hero__actions" style="justify-content:center">
      <a class="btn btn--primary" href="index.html">На главную ${icon('arrow-right')}</a>
      <a class="btn btn--ghost" href="programs.html">Каталог программ</a>
      <a class="btn btn--ghost" href="contacts.html">Контакты</a>
    </div>
  </div>
</section>`;
}

module.exports = { specialistsPage, storiesPage, faqPage, contactsPage, errorPage };
