const L = require('./layout.js');
const H = require('./helpers.js');

const { programs, brand, esc, icon } = L;
const { sectionHead, linkArrow, contactCta } = H;

const FILTERS = [
  {
    key: 'age',
    title: 'Возраст',
    options: [
      ['2-3', '2–3 года'],
      ['3-4', '3,5–4 года'],
      ['4-5', '4–5 лет'],
      ['5-6', '5–6 лет'],
      ['school', '1–4 класс']
    ]
  },
  {
    key: 'request',
    title: 'Запрос',
    options: [
      ['speech', 'Речь и звуки'],
      ['handwriting', 'Почерк и рука'],
      ['reading', 'Чтение'],
      ['school', 'Школьные трудности'],
      ['development', 'Общее развитие']
    ]
  },
  {
    key: 'format',
    title: 'Формат',
    options: [
      ['group', 'Группа'],
      ['individual', 'Индивидуально'],
      ['family', 'Семейный класс'],
      ['online', 'Онлайн']
    ]
  },
  {
    key: 'time',
    title: 'Время',
    options: [
      ['morning', 'Утро'],
      ['evening', 'Вечер'],
      ['saturday', 'Суббота']
    ]
  }
];

const filterSidebar = () => `
  <aside class="filters" id="catalog-filters" data-filters aria-label="Фильтры каталога">
    <div class="filters__head">
      <h2>Фильтры</h2>
      <div style="display:flex;align-items:center;gap:10px">
        <button class="filters__reset" type="button" data-filter-reset>Сбросить</button>
        <button class="filter-panel__close" type="button" data-filters-close aria-label="Закрыть фильтры">${icon('close')}</button>
      </div>
    </div>
    ${FILTERS.map(
      (g) => `
      <div class="filter-group" data-filter-group="${g.key}">
        <p class="filter-group__title">${g.title}</p>
        <div class="chips">
          ${g.options
            .map(
              ([value, label]) =>
                `<button class="chip" type="button" data-filter="${g.key}" data-value="${value}" aria-pressed="false">${label} <span class="chip__count" data-filter-count></span></button>`
            )
            .join('')}
        </div>
      </div>`
    ).join('')}
    <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line)">
      <p style="font-size:12px;line-height:1.5;color:var(--muted)">Не знаете, что выбрать? Позвоните: <a href="${brand.phoneHref}" style="color:var(--green-dark);text-decoration:underline">${brand.phone}</a></p>
    </div>
  </aside>`;

function catalogPage() {
  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Программы' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">Каталог · 13 программ</p>
      <h1>Программы для детей от 2 до 12 лет</h1>
      <p class="page-hero__lead">Речь, почерк, чтение, подготовка к школе, помощь с уроками и семейные классы. Отфильтруйте по возрасту, запросу, формату и времени — или позвоните, и мы подберём вместе.</p>
      <div class="page-hero__actions">
        <button class="btn btn--primary" type="button" data-lead-open data-form-type="Подобрать программу">Подобрать программу ${icon('arrow-right')}</button>
        <a class="btn btn--ghost" href="schedule.html">Расписание и стоимость</a>
      </div>
    </div>
  </div>
</section>

<div class="container catalog-layout" id="catalog">
  ${filterSidebar()}
  <div>
    <h2 class="visually-hidden">Подборка программ</h2>
    <div class="catalog-toolbar">
      <p class="catalog-count">Найдено программ: <b data-catalog-count>${programs.length}</b></p>
      <div class="catalog-toolbar__actions">
        <button class="btn btn--ghost btn--sm filters__mobile-toggle" type="button" data-filters-open>${icon('menu')} Фильтры</button>
        <a class="btn btn--primary btn--sm" href="#lead">Записаться</a>
      </div>
    </div>
    <div class="active-filters" data-active-filters hidden></div>
    <span id="intensives" aria-hidden="true"></span>
    <div class="program-grid" data-program-grid>
      ${H.programGrid(programs)}
    </div>
    <div class="empty-state" data-catalog-empty>
      <h3>По этим фильтрам ничего не нашлось</h3>
      <p>Попробуйте убрать часть условий или напишите нам — подберём программу вручную.</p>
      <button class="btn btn--primary" type="button" data-filter-reset>Сбросить фильтры</button>
    </div>
  </div>
</div>

<section class="section section--cream">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Помощь с выбором',
      title: 'Сомневаетесь между программами?',
      text: 'Это нормально: запросы часто пересекаются. Например, трудности письма могут быть и логопедической темой, и вопросом постановки руки. Администратор уточнит детали и предложит сначала диагностику.',
      link: linkArrow('specialists.html', 'Кто ведёт занятия')
    })}
    <div class="about-values">
      <article class="value-card"><p class="value-card__num">01</p><h3>Если ребёнок не говорит</h3><p>Начните с логопедии: диагностика покажет, нужен ли запуск речи, развитие понимания или другой формат.</p></article>
      <article class="value-card"><p class="value-card__num">02</p><h3>Если рука не слушается</h3><p>Для 4–5 лет — «Приключение Петельки», для школьников — интенсив «Пишу красиво и правильно».</p></article>
      <article class="value-card"><p class="value-card__num">03</p><h3>Если читает, но не понимает</h3><p>«Учимся читать» для 5–6 лет и интенсив «Чтение и распаковка текста» для 2–3 класса.</p></article>
      <article class="value-card"><p class="value-card__num">04</p><h3>Если тяжело в школе</h3><p>Посмотрите семейные классы, «Домашку» и логопедию — в зависимости от того, что именно происходит.</p></article>
    </div>
  </div>
</section>

${contactCta()}
`;
}

function schedulePage() {
  const rows = programs
    .map(
      (p) => `
      <tr data-schedule-row="${p.slug}">
        <td data-label="Программа"><a href="programs/${p.slug}.html">${esc(p.title)}</a></td>
        <td data-label="Возраст">${esc(p.ageShort)}</td>
        <td data-label="Когда">${esc(p.schedule)}</td>
        <td data-label="Формат">${esc(p.formatLabel)}</td>
        <td data-label="Стоимость" class="price-cell">${esc(p.price)}</td>
        <td data-label="Статус">${L.statusBadge(p)}</td>
      </tr>`
    )
    .join('');

  const enrollCards = L.data.enrollments
    .map(
      (e) => `
      <article class="enroll-card">
        <div class="enroll-card__top">
          <span class="enroll-card__date">${esc(e.date)}</span>
          <span class="status status--${e.status}">${esc(e.statusLabel)}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.text)}</p>
        <div class="enroll-card__foot"><a class="link-arrow" href="${e.href}">Подробнее ${icon('arrow-right')}</a></div>
      </article>`
    )
    .join('');

  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Расписание и стоимость' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">Расписание и стоимость</p>
      <h1>Когда занимаемся и сколько это стоит</h1>
      <p class="page-hero__lead">Собрали все программы в одной таблице: возраст, время, формат и стоимость. Там, где цена зависит от диагностики или абонемента, честно указано «по запросу».</p>
      <div class="page-hero__actions">
        <button class="btn btn--primary" type="button" data-lead-open data-form-type="Уточнить расписание">Уточнить расписание ${icon('arrow-right')}</button>
        <a class="btn btn--ghost" href="programs.html">Каталог программ</a>
      </div>
    </div>
  </div>
</section>

<div class="container schedule-wrap">
  <div class="schedule-note">${icon('info')}<span>Данные обновлены ${esc(L.data.scheduleUpdated)}. Расписание и стоимость могут меняться — актуальные условия администратор подтвердит при записи. Возможность переноса и условия абонемента фиксируются в договоре.</span></div>
  <div class="table-wrap">
    <table class="schedule-table">
      <caption class="visually-hidden" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Расписание и стоимость программ центра «Своя траектория»</caption>
      <thead>
        <tr><th scope="col">Программа</th><th scope="col">Возраст</th><th scope="col">Когда</th><th scope="col">Формат</th><th scope="col">Стоимость</th><th scope="col">Статус</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <div class="schedule-legend">
    <span>${icon('rub')} Стоимость указана за занятие или абонемент — уточняйте у администратора</span>
    <span>${icon('clock')} Время занятий может корректироваться по мере набора групп</span>
  </div>
</div>

<section class="section section--cream">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Наборы',
      title: 'Ближайшие наборы',
      text: 'Нулевой класс ждёт набор с января, интенсив по чтению — предварительную запись, а в подготовку к школе можно встать уже сейчас.'
    })}
    <div class="enroll-grid">${enrollCards}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="program-cta">
      <div>
        <h2>Не нашли свою программу в таблице?</h2>
        <p>В каталоге есть подробные страницы по каждому направлению: кому подходит, что входит, как проходят занятия и что уточнить перед стартом.</p>
      </div>
      <div class="program-cta__actions">
        <a class="btn" href="programs.html">Открыть каталог ${icon('arrow-right')}</a>
        <small>Или позвоните: <a href="${brand.phoneHref}">${brand.phone}</a></small>
      </div>
    </div>
  </div>
</section>

${contactCta({ title: 'Уточнить расписание и стоимость' })}
`;
}

module.exports = { catalogPage, schedulePage };
