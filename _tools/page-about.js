const L = require('./layout.js');
const H = require('./helpers.js');

const { brand, esc, icon, orgJsonLd } = L;
const { sectionHead, linkArrow, checkList, contactCta } = H;

function aboutPage() {
  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'О центре' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">О центре</p>
      <h1>Центр, в котором ребёнка не торопят</h1>
      <p class="page-hero__lead">«Своя траектория» — центр речи, развития и семейного образования в Москве. С 2015 года мы работаем с детьми от 2 до 12 лет и с их семьями: помогаем речи, готовим к школе, поддерживаем школьников и собираем семейные классы.</p>
      <div class="page-hero__actions">
        <button class="btn btn--primary" type="button" data-lead-open data-form-type="Записаться на консультацию">Записаться на консультацию ${icon('arrow-right')}</button>
        <a class="btn btn--ghost" href="specialists.html">Познакомиться с командой</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container about-story">
    <div>
      <p class="eyebrow">Наша история</p>
      <h2 style="margin-top:14px">Один центр, несколько имён, та же команда</h2>
      <p style="margin-top:18px;color:var(--muted);font-size:16px">Центр начинался как «Семь пядей», затем много лет работал как семейный центр «кУМкват». С 2026 года мы называемся «Своя траектория» — центр речи, развития и семейного образования.</p>
      <p style="margin-top:12px;color:var(--muted);font-size:16px">Название изменилось, но адрес, специалисты и подход остались прежними. Мы по-прежнему принимаем детей в ЮВАО Москвы, рядом с метро «Текстильщики» и «Кузьминки».</p>
      <p style="margin-top:22px"><a class="link-arrow" href="#renaming">Почему мы сменили название ${icon('arrow-right')}</a></p>
    </div>
    <div class="timeline">
      <div class="timeline__item">
        <p class="timeline__year">2015</p>
        <h3>Начало работы</h3>
        <p>Центр открывается в Москве и начинает заниматься с детьми и семьями. Первые направления — речь и развитие.</p>
      </div>
      <div class="timeline__item">
        <p class="timeline__year">2015–2025</p>
        <h3>«Семь пядей» и «кУМкват»</h3>
        <p>Центр растёт: появляются логопедия, подготовка к школе, творческие и семейные форматы, а затем и семейные классы.</p>
      </div>
      <div class="timeline__item">
        <p class="timeline__year">2026</p>
        <h3>«Своя траектория»</h3>
        <p>Новое имя точнее описывает подход: у каждого ребёнка и каждой семьи — своя траектория. Команда и адрес остаются прежними.</p>
      </div>
      <div class="timeline__item">
        <p class="timeline__year">Сейчас</p>
        <h3>13 программ и семейные классы</h3>
        <p>Речь, рука и письмо, чтение, подготовка к школе, «Домашка», интенсивы для 2–3 класса и семейные классы 1–4 класс.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream" id="renaming">
  <div class="container">
    <div class="split">
      <div>
        <p class="eyebrow">Переименование</p>
        <h2 style="margin-top:14px">Почему «кУМкват» стал «Своей траекторией»</h2>
      </div>
      <div>
        <p style="font-size:16px;line-height:1.7;color:#45564f">Старое название было тёплым и узнаваемым, но перестало отражать то, чем центр стал сегодня. «Своя траектория» — это про главный принцип работы: не тянуть всех к одному стандарту, а помогать ребёнку двигаться в своём темпе и в своей точке старта.</p>
        <p style="margin-top:12px;font-size:16px;line-height:1.7;color:#45564f">Мы сохранили логотип-знак, зелёный и жёлтый цвета и главное — людей. Все специалисты, программы и традиции остались. Если вы искали «кУМкват» или «Семь пядей», вы пришли по адресу.</p>
        <div style="margin-top:24px">${checkList([
          'Тот же адрес: ул. Васильцовский стан, 5, к. 2',
          'Та же команда специалистов',
          'Те же программы и традиции',
          'Новое имя и обновлённый сайт'
        ])}</div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Принципы',
      title: 'На чём держится наша работа',
      text: 'Мы не обещаем «исправить за месяц» и не ставим диагнозы. Зато отвечаем за качество занятий, честную обратную связь и уважение к ребёнку.'
    })}
    <div class="about-values">
      <article class="value-card"><p class="value-card__num">01</p><h3>Уважение к темпу</h3><p>Не сравниваем ребёнка со средним классом и не торопим. Сначала смотрим, как он учится, затем подбираем нагрузку.</p></article>
      <article class="value-card"><p class="value-card__num">02</p><h3>Честность без обещаний</h3><p>Не публикуем неподтверждённые цены и не гарантируем результатов. Если стоимость зависит от диагностики — так и говорим.</p></article>
      <article class="value-card"><p class="value-card__num">03</p><h3>Семья в центре</h3><p>Родитель — часть команды. Обсуждаем динамику, объясняем, что закреплять дома, и не закрываем двери кабинета.</p></article>
      <article class="value-card"><p class="value-card__num">04</p><h3>Маленькие группы</h3><p>6–8 человек в семейных классах, до 6 — в «Домашке». Ребёнка видно, слышно и не теряют в толпе.</p></article>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="photo-grid" data-reveal>
      <img src="assets/img/photo-kids-hands-up-16x9.webp" width="1920" height="1080" alt="Дети на занятии в центре «Своя траектория»" loading="lazy">
      <img src="assets/img/photo-hands-together.webp" width="1600" height="1068" alt="Дети и взрослые держат руки в кругу" loading="lazy">
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container split">
    <div>
      <p class="eyebrow">Подход</p>
      <h2 style="margin-top:14px">Сначала понять, потом учить</h2>
      <p class="split__lead">Первая встреча — не экзамен. Это разговор с родителями и знакомство с ребёнком: что получается, что даётся тяжело, что хочется изменить.</p>
      <div style="margin-top:24px">${checkList([
        'Диагностика или консультация перед стартом',
        'Понятный план занятий и формат',
        'Обратная связь по динамике',
        'Рекомендации для дома'
      ])}</div>
      <p style="margin-top:26px"><a class="btn btn--primary" href="programs.html">Смотреть программы ${icon('arrow-right')}</a></p>
    </div>
    <div>
      <blockquote class="quote-block">«У каждого ребёнка своя скорость. Наша задача — не ускорять, а не мешать идти».
        <small>Принцип центра «Своя траектория»</small>
      </blockquote>
      <div class="map" style="min-height:0;margin-top:24px;border-radius:22px;overflow:hidden">
        <img src="assets/img/mockup-3d-sign.webp" width="1200" height="751" alt="Вывеска центра «Своя траектория»" loading="lazy" style="width:100%;height:auto">
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Команда',
      title: 'Специалисты, которые работают с детьми каждый день',
      text: 'Логопеды, педагоги дошкольного образования, психолог, тренер по двигательному развитию, репетиторы и педагоги семейных классов.',
      link: linkArrow('specialists.html', 'О команде')
    })}
    <div class="team-grid">${H.teamCards()}</div>
    <p class="team-note">${icon('info')}<span>Имена, образование и фотографии специалистов публикуем после согласования с командой. Направления работы уже можно посмотреть на странице «Специалисты».</span></p>
  </div>
</section>

${contactCta({ title: 'Приходите знакомиться', lead: true })}
`;
}

module.exports = { aboutPage, aboutJsonLd: { '@context': 'https://schema.org', ...orgJsonLd, '@type': ['EducationalOrganization', 'LocalBusiness', 'AboutPage'] } };
