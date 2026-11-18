const L = require('./layout.js');
const H = require('./helpers.js');

const { programs, brand, enrollments, esc, icon } = L;
const { sectionHead, linkArrow, checkList } = H;

function homePage() {
  const featured = programs.filter((p) => p.featured).slice(0, 5);

  const ageCards = L.data.ages
    .map(
      (a) => `
      <a class="age-card" href="${a.href}" data-reveal>
        <span class="age-card__age">${esc(a.label)}</span>
        <span class="age-card__note">${esc(a.note)}</span>
        <span class="age-card__bottom">${icon('arrow-up-right')}</span>
      </a>`
    )
    .join('');

  const requestCards = L.data.requests
    .map(
      (r) => `
      <a class="request-card" href="${r.href}" data-reveal>
        <span class="request-card__icon">${icon(r.icon)}</span>
        <span class="request-card__body">
          <h3>${esc(r.label)}</h3>
          <p>${esc(r.note)}</p>
        </span>
        <span class="request-card__arrow">${icon('arrow-up-right')}</span>
      </a>`
    )
    .join('');

  const charCards = [
    { name: 'Петелька', file: 'char-petelka.webp', w: 502, h: 890, quote: 'Научу тебя аккуратности, и твои пальчики станут послушными.' },
    { name: 'Зигзаг', file: 'char-zigzag.webp', w: 569, h: 900, quote: 'Со мной твои линии станут чёткими и ровными.' },
    { name: 'Черточка', file: 'char-chertochka.webp', w: 416, h: 900, quote: 'Вместе с моими друзьями мы перейдём от хаотичных каляк к уверенным линиям!' }
  ]
    .map(
      (c) => `
      <article class="char-card" data-reveal>
        <div class="char-card__top"><span class="char-card__role">Герой курса «Приключение Петельки»</span></div>
        <div class="char-card__img"><img src="assets/img/${c.file}" alt="Персонаж курса ${esc(c.name)}" loading="lazy" width="${c.w}" height="${c.h}"></div>
        <h3 class="char-card__name">${esc(c.name)}</h3>
        <blockquote>«${esc(c.quote)}»</blockquote>
        <a class="char-card__link" href="programs/priklyuchenie-petelki.html">Познакомиться с курсом ${icon('arrow-right')}</a>
      </article>`
    )
    .join('');

  const enrollCards = enrollments
    .map(
      (e) => `
      <article class="enroll-card" data-reveal>
        <div class="enroll-card__top">
          <span class="enroll-card__date">${esc(e.date)}</span>
          <span class="status status--${e.status}">${esc(e.statusLabel)}</span>
        </div>
        <h3>${esc(e.title)}</h3>
        <p>${esc(e.text)}</p>
        <div class="enroll-card__foot">
          <a class="link-arrow" href="${e.href}">Узнать подробнее ${icon('arrow-right')}</a>
        </div>
      </article>`
    )
    .join('');

  const teamPreview = L.data.specialists
    .slice(0, 4)
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
<section class="hero">
  <div class="container hero__inner">
    <div class="hero__content">
      <p class="eyebrow">Центр речи, развития и семейного образования · ЮВАО Москвы</p>
      <h1>Помогаем ребёнку идти <span class="accent">своей траекторией</span></h1>
      <p class="hero__lead">Логопедия, подготовка к школе, семейные классы и бережные развивающие занятия для детей от 2 до 12 лет. Рядом с метро «Текстильщики» и «Кузьминки» — с 2015 года.</p>
      <div class="hero__actions">
        <button class="btn btn--primary" type="button" data-lead-open data-form-type="Записаться на консультацию">Записаться на консультацию ${icon('arrow-right')}</button>
        <a class="btn btn--ghost" href="programs.html">Подобрать программу ${icon('compass')}</a>
      </div>
      <div class="hero__meta">
        <div class="hero__meta-item"><b>с 2015 года</b><span>работаем с детьми и семьями</span></div>
        <div class="hero__meta-item"><b>2–12 лет</b><span>основной возраст детей</span></div>
        <div class="hero__meta-item"><b>13 программ</b><span>речь, школа, семья</span></div>
        <div class="hero__meta-item"><b>6–8 человек</b><span>мини-класс семейных классов</span></div>
      </div>
    </div>
    <div class="hero__media">
      <div class="hero__badge" aria-hidden="true"><b>2–12</b>лет —<br>основной возраст</div>
      <img class="hero__photo" src="assets/img/photo-kids-hands-up.webp" width="1500" height="1500" alt="Дети поднимают руки на занятии в центре «Своя траектория»" fetchpriority="high">
      <div class="hero__note">${icon('info')}<span>Занятия без заключения ПМПК — на индивидуальных занятиях и в семейных классах</span></div>
      <img class="hero__sign" src="assets/img/sign-only.webp" width="754" height="419" alt="" aria-hidden="true" loading="lazy">
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${sectionHead({
      eyebrow: 'С чего начать',
      title: 'Найдите программу по возрасту',
      text: 'Выберите возраст ребёнка — покажем подходящие занятия. Если сомневаетесь, администратор поможет подобрать формат по запросу.',
      link: linkArrow('programs.html', 'Весь каталог')
    })}
    <div class="age-grid">${ageCards}</div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    ${sectionHead({
      eyebrow: 'С каким запросом приходят',
      title: 'Сначала — понять, что происходит',
      text: 'Не ставим диагнозы и не обещаем результатов. Слушаем родителей, знакомимся с ребёнком и предлагаем путь, который подходит именно вашей семье.',
      link: linkArrow('programs.html', 'Подобрать по запросу')
    })}
    <div class="request-grid">${requestCards}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Программы',
      title: 'Речь, рука, чтение и школа — в своём темпе',
      text: 'От логоритмики для малышей до семейных классов и интенсивов для школьников. У каждой программы — понятный формат, возраст и стоимость или честное «по запросу».',
      link: linkArrow('programs.html', 'Все 13 программ')
    })}
    <div class="program-grid">
      ${H.programGrid(featured)}
      <article class="program-card program-card--more">
        <h3>Не нашли подходящее?</h3>
        <p>В каталоге есть ещё подготовка к школе, «Домашка», интенсивы и онлайн-программа. Можно отфильтровать по возрасту, запросу, формату и времени.</p>
        <a class="btn btn--ghost btn--sm" href="programs.html">Открыть каталог ${icon('arrow-right')}</a>
      </article>
    </div>
  </div>
</section>

<section class="section section--dark">
  <div class="container split">
    <div>
      <p class="eyebrow">Наш подход</p>
      <h2>Не «лечим», а помогаем развиваться</h2>
      <p class="split__lead">У каждого ребёнка своя скорость, свои сильные стороны и свой способ учиться. Наша задача — найти этот способ и идти рядом.</p>
      <p class="stat">11 <b>лет</b><small>работаем с детьми и семьями в ЮВАО Москвы. За это время центр прошёл путь от «Семи пядей» и «кУМквата» до «Своей траектории».</small></p>
    </div>
    <div class="approach-grid">
      <article class="approach-item"><span class="approach-item__num">01</span><div><h3>Сначала — знакомство</h3><p>Обсуждаем запрос, смотрим, как ребёнок включается в игру и задания. Без диагнозов и поспешных выводов.</p></div></article>
      <article class="approach-item"><span class="approach-item__num">02</span><div><h3>Свой темп и своя программа</h3><p>Не сравниваем со средним классом. Подбираем содержание и нагрузку под конкретного ребёнка.</p></div></article>
      <article class="approach-item"><span class="approach-item__num">03</span><div><h3>Маленькие группы</h3><p>В семейных классах 6–8 человек, в «Домашке» — не больше 6. Ребёнка видно, слышно и не теряют в толпе.</p></div></article>
      <article class="approach-item"><span class="approach-item__num">04</span><div><h3>Родитель — часть команды</h3><p>Рассказываем, что происходит на занятиях, что закрепляем и как поддерживать дома. Без закрытых дверей.</p></div></article>
    </div>
  </div>
</section>

<section class="section characters">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Герои курса',
      title: 'Петелька, Зигзаг и Черточка',
      text: 'Дети не любят «прописи через слёзы». Поэтому в курсе «Приключение Петельки» руку к письму готовят герои — с историями, играми и заданиями.',
      link: linkArrow('programs/priklyuchenie-petelki.html', 'О курсе')
    })}
    <div class="char-grid">${charCards}</div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="family-wrap" data-reveal>
      <div class="family__content">
        <p class="eyebrow">Семейные классы · 1–4 класс</p>
        <h2>Когда большому классу не место в жизни ребёнка</h2>
        <p>Мини-класс 6–8 человек для школьников, которым некомфортно в массовой школе. Каждый идёт в своём ритме, а рядом — помогающие специалисты.</p>
        <div class="family__triggers">
          <span class="trigger">${icon('check')}Не успевает на уроке</span>
          <span class="trigger">${icon('check')}Не хватает усидчивости</span>
          <span class="trigger">${icon('check')}Страшно в большом классе</span>
          <span class="trigger">${icon('check')}Не понимают сверстники</span>
        </div>
        <ul class="family__gains">
          <li>${icon('check')}<span>Ребёнок верит в свои силы</span></li>
          <li>${icon('check')}<span>Появляются друзья</span></li>
          <li>${icon('check')}<span>Родители нормализуют быт</span></li>
          <li>${icon('check')}<span>Готовность к аттестации</span></li>
        </ul>
        <div class="family__actions">
          <a class="btn btn--primary" href="programs/semeynye-klassy.html">О семейных классах ${icon('arrow-right')}</a>
          <button class="btn btn--outline-light" type="button" data-lead-open data-form-type="Семейные классы">Записаться на встречу</button>
        </div>
      </div>
      <div class="family__photo">
        <img src="assets/img/photo-hands-together.webp" width="1000" height="667" alt="Дети и взрослые вместе держат руки в кругу" loading="lazy">
        <span class="family__badge">6–8 человек в классе — каждого видно</span>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Наборы',
      title: 'Ближайшие наборы',
      text: 'Где-то группы уже идут, где-то набор только открывается. Оставьте заявку — администратор расскажет актуальные даты и условия.',
      link: linkArrow('schedule.html', 'Расписание и стоимость')
    })}
    <div class="enroll-grid">${enrollCards}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: 'Специалисты',
      title: 'Команда, которая остаётся рядом',
      text: 'Логопеды, педагоги дошкольного образования, психолог, тренер по двигательному развитию и репетиторы. Имена и фотографии специалистов публикуем после согласования с командой.',
      link: linkArrow('specialists.html', 'Все специалисты')
    })}
    <div class="team-grid">${teamPreview}</div>
    <p class="team-note">${icon('info')}<span>На странице «Специалисты» — направления работы команды. Персональные данные педагогов не публикуем без их согласия.</span></p>
  </div>
</section>

<section class="section section--cream">
  <div class="container book-wrap">
    <div class="book-visual">
      <div class="book" aria-hidden="true">
        <span class="book__label">Традиция центра</span>
        <span class="book__title">Книга выпускников</span>
        <img src="assets/img/logo-vertical-yellow.webp" width="800" height="504" alt="" loading="lazy">
        <span class="book__year">Каждый учебный год</span>
      </div>
    </div>
    <div>
      <p class="eyebrow">Истории и традиции</p>
      <h2>Дети сами придумывают, пишут и иллюстрируют книгу</h2>
      <p>В конце учебного года ребята создают собственные истории, а центр издаёт из них книгу. Это не про оценку и не про «правильный текст» — это про опыт автора, который держит в руках свою книгу.</p>
      <a class="btn btn--primary" href="stories.html">Как это устроено ${icon('arrow-right')}</a>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="review-card" data-reveal>
      <div>
        <h3>Отзывы родителей — в открытой группе центра</h3>
        <p>Мы не придумываем отзывы и не публикуем чужие слова без разрешения. Свежие впечатления, вопросы и ответы — в сообществе ВКонтакте.</p>
      </div>
      <div class="review-card__actions">
        <a class="btn btn--primary" href="${brand.vk}" target="_blank" rel="noopener">Смотреть во ВКонтакте ${icon('arrow-up-right')}</a>
        <a class="btn btn--ghost" href="stories.html">Истории центра</a>
      </div>
    </div>
  </div>
</section>

${H.contactCta()}
`;
}

module.exports = homePage;
