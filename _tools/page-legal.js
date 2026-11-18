const L = require('./layout.js');
const H = require('./helpers.js');

const { brand, esc, icon } = L;

const updated = '17 ноября 2026 года';

function privacyPage() {
  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Политика обработки персональных данных' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">Документы</p>
      <h1>Политика обработки персональных данных</h1>
      <p class="page-hero__lead">Как центр «Своя траектория» собирает, использует и защищает данные посетителей сайта и родителей, которые оставляют заявки.</p>
    </div>
  </div>
</section>

<div class="container prose-page">
  <p class="updated">Редакция от ${updated}. Документ подготовлен по требованиям Федерального закона № 152-ФЗ «О персональных данных».</p>

  <div class="note">До публикации сайта необходимо указать полное наименование оператора, ИНН, ОГРН, адрес и контактные данные ответственного за обработку персональных данных. Сейчас эти сведения уточняются.</div>

  <h2>1. Общие положения</h2>
  <p>Настоящая Политика определяет порядок обработки персональных данных и меры по обеспечению их безопасности, применяемые оператором — центром «Своя траектория» (далее — Оператор) при использовании сайта и форм обратной связи.</p>
  <p>Политика применяется ко всей информации, которую Оператор может получить о посетителях сайта, а также о родителях и законных представителях детей, оставляющих заявки.</p>
  <p>Используя сайт и отправляя форму, пользователь подтверждает, что ознакомился с настоящей Политикой и действует от своего имени как законный представитель ребёнка.</p>

  <h2>2. Какие данные обрабатываются</h2>
  <ul>
    <li>имя, указанное в форме;</li>
    <li>номер телефона;</li>
    <li>возраст ребёнка и интересующая программа;</li>
    <li>комментарий, который пользователь оставляет добровольно;</li>
    <li>технические данные: IP-адрес, cookie, сведения о браузере и устройстве, страницы посещения — при согласии на аналитику.</li>
  </ul>
  <p>Оператор не запрашивает специальные категории персональных данных, данные о здоровье и диагнозы через формы сайта. Не указывайте в поле комментария сведения медицинского характера — для обсуждения запроса достаточно общего описания.</p>

  <h2>3. Цели обработки</h2>
  <ul>
    <li>связаться с пользователем по оставленной заявке;</li>
    <li>уточнить запрос, возраст ребёнка и подобрать программу;</li>
    <li>согласовать время консультации или занятия;</li>
    <li>ответить на обращение или вопрос;</li>
    <li>улучшать работу сайта при наличии согласия на аналитику.</li>
  </ul>
  <p>Данные не используются для автоматизированного принятия решений, не продаются и не передаются третьим лицам для рекламы.</p>

  <h2>4. Правовые основания</h2>
  <p>Обработка осуществляется на основании согласия пользователя, которое он даёт, отмечая соответствующий чекбокс перед отправкой формы, а также в целях исполнения договора об оказании услуг, если он заключён.</p>

  <h2>5. Порядок и сроки обработки</h2>
  <p>Обработка включает сбор, запись, систематизацию, накопление, хранение, уточнение, использование, обезличивание, блокирование, удаление и уничтожение данных.</p>
  <p>Данные заявок хранятся до достижения целей обработки или до отзыва согласия, если иной срок не установлен законом. Cookie хранятся в браузере пользователя в соответствии с его настройками.</p>

  <h2>6. Передача данных</h2>
  <p>Оператор может привлекать для работы сайта и связи с пользователем подрядчиков (хостинг, сервисы аналитики, мессенджеры), если это необходимо для указанных целей и если такие подрядчики обеспечивают конфиденциальность данных.</p>
  <p>Передача данных государственным органам возможна только в случаях, предусмотренных законодательством Российской Федерации.</p>

  <h2>7. Cookie и аналитика</h2>
  <p>Сайт использует необходимые cookie для работы интерфейса. Яндекс Метрика подключается только после согласия пользователя, данного в баннере cookie. До согласия аналитические скрипты не загружаются.</p>
  <p>Пользователь может отказаться от аналитических cookie, выбрав «Только необходимые», а также ограничить cookie в настройках браузера.</p>

  <h2>8. Права пользователя</h2>
  <ul>
    <li>получить информацию об обработке своих данных;</li>
    <li>требовать уточнения, блокирования или удаления данных;</li>
    <li>отозвать согласие на обработку в любой момент;</li>
    <li>обратиться в уполномоченный орган по защите прав субъектов персональных данных.</li>
  </ul>
  <p>Для реализации прав направьте обращение на контактный телефон <a href="${brand.phoneHref}">${brand.phone}</a> или через сообщество центра. Мы ответим в срок, установленный законом.</p>

  <h2>9. Меры защиты</h2>
  <p>Оператор принимает организационные и технические меры: ограничивает доступ сотрудников к данным, использует защищённые каналы передачи, хранит данные в защищённой инфраструктуре и регулярно проверяет настройки доступа.</p>

  <h2 id="consent">10. Согласие на обработку персональных данных</h2>
  <p>Отправляя форму на сайте, пользователь свободно, своей волей и в своём интересе даёт согласие на обработку указанных им персональных данных: имени, телефона, возраста ребёнка, выбранной программы и комментария.</p>
  <p>Согласие действует до его отзыва. Отзыв осуществляется путём обращения к Оператору по телефону или через сообщество центра. После отзыва данные удаляются, если закон не требует их дальнейшего хранения.</p>
  <p>Согласие не распространяется на данные, которые пользователь не указал, и не является согласием на получение рекламных рассылок.</p>

  <h2>11. Изменения Политики</h2>
  <p>Оператор вправе изменять Политику. Новая редакция вступает в силу с момента публикации на этой странице. Дата редакции указана в начале документа.</p>

  <h2>12. Контакты</h2>
  <p>Центр «Своя траектория», ${brand.address}. Телефон: <a href="${brand.phoneHref}">${brand.phone}</a>. Часы работы уточняйте по телефону.</p>

  <div class="note">Документ носит характер шаблона и требует проверки юристом после внесения полных реквизитов организации. Не является публичной офертой.</div>
</div>`;
}

function termsPage() {
  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Договор и правила' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">Документы</p>
      <h1>Договор и правила посещения</h1>
      <p class="page-hero__lead">Основные правила записи, оплаты и посещения занятий. Точные условия фиксируются в договоре, который заключается с родителем или законным представителем ребёнка.</p>
    </div>
  </div>
</section>

<div class="container prose-page">
  <p class="updated">Редакция от ${updated}. Текст является общей информацией и не заменяет договор.</p>

  <div class="note">Условия абонементов, переносов, возвратов и стоимости по конкретной программе уточняйте у администратора до оплаты. Стоимость, опубликованная на сайте, может меняться; актуальную цену подтверждают при записи.</div>

  <h2>1. Запись на занятия</h2>
  <p>Запись осуществляется по заявке на сайте, по телефону или через мессенджеры. Для подбора программы администратор уточняет возраст ребёнка, запрос и удобное время.</p>
  <p>Для некоторых программ перед началом рекомендуется диагностика или консультация. Это не экзамен и не медицинское обследование: специалист знакомится с ребёнком и обсуждает с родителями план работы.</p>

  <h2>2. Договор</h2>
  <p>Занятия оказываются на основании договора между центром и родителем (законным представителем). Договор содержит перечень услуг, стоимость, расписание, порядок оплаты и условия переносов.</p>
  <p>До оплаты родитель получает информацию о программе, формате, стоимости и правилах посещения.</p>

  <h2>3. Оплата и абонементы</h2>
  <p>Способы оплаты и размер абонемента зависят от программы. Оплата производится в порядке и сроки, указанные в договоре. Центр не публикует неподтверждённые цены: если стоимость указана как «по запросу», её называют до записи.</p>
  <p>Абонемент действует в течение согласованного периода. Количество занятий, срок действия и правила переноса фиксируются в договоре.</p>

  <h2>4. Пропуски и переносы</h2>
  <p>Если ребёнок пропускает занятие по уважительной причине, родителю следует заранее сообщить администратору. Возможность переноса и условия сохранения занятия определяются договором и форматом группы.</p>
  <p>Индивидуальные занятия переносятся по согласованию. В групповых программах место в группе сохраняется в соответствии с условиями договора.</p>

  <h2>5. Возврат средств</h2>
  <p>Возврат неиспользованных средств осуществляется в порядке, предусмотренном договором и законодательством Российской Федерации, на основании заявления родителя. Срок и способ возврата согласуются с администратором.</p>

  <h2>6. Правила посещения</h2>
  <ul>
    <li>Ребёнок приходит на занятие здоровым; при признаках заболевания занятие лучше перенести.</li>
    <li>Родитель обеспечивает сопровождение ребёнка до и после занятия, если иное не согласовано.</li>
    <li>В центре уважительно общаются со специалистами, детьми и другими родителями.</li>
    <li>Личные вещи остаются под ответственностью семьи; ценные предметы лучше не приносить.</li>
  </ul>

  <h2>7. Фото и видео</h2>
  <p>Центр может фотографировать занятия для внутренних материалов и публикаций только с отдельного согласия родителей. Отсутствие такого согласия означает, что ребёнок не будет узнаваем на публичных материалах.</p>

  <h2>8. Ответственность</h2>
  <p>Центр отвечает за качество занятий и соблюдение договора. Центр не ставит медицинские диагнозы и не гарантирует конкретный результат: динамика зависит от возраста, особенностей ребёнка и регулярности занятий.</p>
  <p>Родитель отвечает за достоверность сведений, указанных при записи, и за соблюдение правил посещения.</p>

  <h2>9. Изменение условий</h2>
  <p>Центр вправе изменять расписание и условия, предупреждая родителей заранее. Существенные изменения оформляются дополнительным соглашением к договору.</p>

  <h2>10. Контакты</h2>
  <p>По вопросам договора, оплаты и переносов: <a href="${brand.phoneHref}">${brand.phone}</a>. Адрес: ${brand.address}.</p>
</div>`;
}

function organizationPage() {
  return `
<section class="page-hero">
  <div class="container">
    ${L.breadcrumbs([{ label: 'Сведения об организации' }])}
    <div class="page-hero__inner">
      <p class="eyebrow">Документы</p>
      <h1>Сведения об организации</h1>
      <p class="page-hero__lead">Информация о центре «Своя траектория»: реквизиты, адрес, режим работы, образовательные программы и контакты. Часть данных уточняется и будет опубликована до запуска рекламы.</p>
    </div>
  </div>
</section>

<div class="container prose-page">
  <p class="updated">Обновлено ${updated}.</p>

  <div class="note">Обязательные по закону сведения (полное наименование, ИНН, ОГРН, лицензия, руководитель) находятся на согласовании с заказчиком. Ниже — структура раздела и подтверждённые данные.</div>

  <h2>Основные сведения</h2>
  <ul>
    <li><strong>Наименование:</strong> центр «Своя траектория» (ранее — семейный центр «кУМкват», «Семь пядей»).</li>
    <li><strong>Полное наименование:</strong> уточняется.</li>
    <li><strong>ИНН / ОГРН:</strong> уточняются.</li>
    <li><strong>Адрес:</strong> ${brand.address}.</li>
    <li><strong>Режим работы:</strong> уточняется; уточняйте по телефону.</li>
    <li><strong>Телефон:</strong> <a href="${brand.phoneHref}">${brand.phone}</a>.</li>
    <li><strong>Метро:</strong> «Текстильщики», «Кузьминки» (ЮВАО Москвы).</li>
  </ul>

  <h2>Образовательная деятельность</h2>
  <p>Центр реализует программы дополнительного развития детей: логопедические занятия, логопедическую ритмику, подготовку руки к письму, песочную терапию, познавательные игры, обучение чтению, подготовку к школе, семейные классы 1–4 классов, помощь с домашними заданиями и интенсивы для школьников.</p>
  <p>Сведения о лицензии на образовательную деятельность: уточняются.</p>

  <h2>Руководство</h2>
  <p>Сведения о руководителе: уточняются.</p>

  <h2>Персональные данные</h2>
  <p>Обработка персональных данных ведётся в соответствии с <a href="privacy.html">Политикой обработки персональных данных</a>.</p>

  <h2>Контакты для обращений</h2>
  <p>Телефон: <a href="${brand.phoneHref}">${brand.phone}</a>. Сообщества: <a href="${brand.vk}" target="_blank" rel="noopener">ВКонтакте</a>, <a href="${brand.max}" target="_blank" rel="noopener">MAX</a>, <a href="${brand.telegram}" target="_blank" rel="noopener">Telegram</a>.</p>
</div>`;
}

function adminPage() {
  return `
<div class="container admin-wrap">
  <section class="admin-login" data-admin-login>
    <p class="eyebrow" style="justify-content:center">Демо-панель</p>
    <h1>Панель управления сайтом</h1>
    <p>Это демонстрационный интерфейс. Данные сохраняются в браузере (localStorage) и не отправляются на сервер. Для рабочей версии нужен backend с авторизацией и ролями.</p>
    <div class="admin-field" style="margin-top:20px;text-align:left">
      <label for="admin-role">Войти как</label>
      <select id="admin-role" data-admin-role>
        <option value="owner">Владелец — полный доступ</option>
        <option value="manager">Администратор — заявки и расписание</option>
      </select>
    </div>
    <button class="btn btn--primary" type="button" data-admin-enter>Войти в демо-режим ${icon('arrow-right')}</button>
    <p class="admin-note" style="text-align:left">В рабочей версии здесь будет вход по e-mail и паролю с двухфакторной защитой. Пароль в демо не запрашивается намеренно.</p>
  </section>

  <div data-admin-app hidden>
    <div class="admin-head">
      <div>
        <p class="eyebrow">Управление</p>
        <p class="admin-head__title">Панель центра</p>
        <p>Демо-режим: изменения сохраняются только в этом браузере. Нажмите «Сохранить» в разделе, чтобы применить правки. Перед публикацией данные нужно перенести в CMS или backend.</p>
      </div>
      <div class="admin-row-actions">
        <span class="admin-badge" data-admin-role-label>Владелец</span>
        <button class="btn btn--ghost btn--sm" type="button" data-admin-logout>Выйти</button>
      </div>
    </div>

    <div class="admin-grid">
      <nav class="admin-tabs" aria-label="Разделы панели">
        <button class="admin-tab is-active" type="button" data-admin-tab="overview">Обзор <span data-count-apps>0</span></button>
        <button class="admin-tab" type="button" data-admin-tab="programs">Программы и цены</button>
        <button class="admin-tab" type="button" data-admin-tab="schedule">Расписание и наборы</button>
        <button class="admin-tab" type="button" data-admin-tab="applications">Заявки <span data-count-new>0</span></button>
        <button class="admin-tab" type="button" data-admin-tab="banner">Баннер и объявления</button>
        <button class="admin-tab" type="button" data-admin-tab="specialists">Специалисты</button>
        <button class="admin-tab" type="button" data-admin-tab="reviews">Отзывы</button>
        <button class="admin-tab" type="button" data-admin-tab="faq">Вопросы</button>
        <button class="admin-tab" type="button" data-admin-tab="contacts">Контакты</button>
        <button class="admin-tab" type="button" data-admin-tab="settings">Экспорт и сброс</button>
      </nav>

      <div>
        <section class="admin-panel" data-admin-panel="overview">
          <h2>Обзор</h2>
          <p>Коротко о том, что происходит в центре и на сайте.</p>
          <div class="admin-toolbar"></div>
          <div class="admin-row" data-admin-overview></div>
          <div class="admin-note">Демо-данные: записи заявок хранятся в этом браузере. В рабочей версии заявки приходят на e-mail и в Telegram, а статусы хранятся на сервере.</div>
        </section>

        <section class="admin-panel" data-admin-panel="programs" hidden>
          <h2>Программы и цены</h2>
          <p>Измените стоимость, переключите показ цены на сайте и обновите статус набора. Названия и описания меняются в файле данных или CMS.</p>
          <div class="admin-toolbar">
            <span class="admin-badge">13 программ</span>
            <button class="btn btn--primary btn--sm" type="button" data-admin-save="programs">Сохранить изменения</button>
          </div>
          <div style="overflow-x:auto"><table class="admin-table"><thead><tr><th>Программа</th><th>Цена</th><th>Показывать</th><th>Статус</th><th>Расписание</th></tr></thead><tbody data-admin-programs></tbody></table></div>
          <div class="admin-note">Если цена не подтверждена, оставьте «По запросу» и выключите показ цены. Сайт не должен публиковать неподтверждённые суммы.</div>
        </section>

        <section class="admin-panel" data-admin-panel="schedule" hidden>
          <h2>Расписание и ближайшие наборы</h2>
          <p>Карточки наборов показываются на главной и на странице расписания.</p>
          <div class="admin-toolbar">
            <button class="btn btn--ghost btn--sm" type="button" data-admin-add-enrollment>${icon('plus')} Добавить набор</button>
            <button class="btn btn--primary btn--sm" type="button" data-admin-save="enrollments">Сохранить</button>
          </div>
          <div class="admin-list" data-admin-enrollments></div>
          <div class="admin-note">Статус «Набор с января», «Скоро», «Идёт набор» и «Мест нет» отображается цветным бейджем.</div>
        </section>

        <section class="admin-panel" data-admin-panel="applications" hidden>
          <h2>Заявки</h2>
          <p>Заявки, отправленные через формы на сайте в этом браузере. В рабочей версии здесь будут все обращения с сервера.</p>
          <div class="admin-toolbar">
            <span class="admin-badge" data-count-apps-label>0 заявок</span>
            <button class="btn btn--ghost btn--sm" type="button" data-admin-clear-apps>Очистить список</button>
          </div>
          <div class="admin-list" data-admin-applications></div>
          <div class="admin-note">Статусы: «Новая» → «В работе» → «Записана». В демо они сохраняются в localStorage.</div>
        </section>

        <section class="admin-panel" data-admin-panel="banner" hidden>
          <h2>Баннер и объявления</h2>
          <p>Верхняя полоса на всех страницах. Используйте для важных объявлений: набора, переезда, изменения расписания.</p>
          <div class="admin-toolbar"><button class="btn btn--primary btn--sm" type="button" data-admin-save="banner">Сохранить</button></div>
          <div class="admin-field"><label><span class="admin-switch"><input type="checkbox" data-banner-enabled> Показывать баннер</span></label></div>
          <div class="admin-field"><label for="banner-text">Текст баннера</label><textarea id="banner-text" data-banner-text rows="3"></textarea></div>
          <div class="admin-row">
            <div class="admin-field"><label for="banner-link">Ссылка</label><input id="banner-link" type="text" data-banner-link placeholder="programs.html"></div>
            <div class="admin-field"><label for="banner-label">Текст ссылки</label><input id="banner-label" type="text" data-banner-label placeholder="Подробнее"></div>
          </div>
          <div class="admin-note">Баннер закрывается посетителем и больше не показывается, пока вы не измените его текст.</div>
        </section>

        <section class="admin-panel" data-admin-panel="specialists" hidden>
          <h2>Специалисты</h2>
          <p>Роли и направления работы. Имена и фотографии добавляйте только после согласия специалистов.</p>
          <div class="admin-toolbar">
            <button class="btn btn--ghost btn--sm" type="button" data-admin-add-specialist>${icon('plus')} Добавить</button>
            <button class="btn btn--primary btn--sm" type="button" data-admin-save="specialists">Сохранить</button>
          </div>
          <div class="admin-list" data-admin-specialists></div>
        </section>

        <section class="admin-panel" data-admin-panel="reviews" hidden>
          <h2>Отзывы</h2>
          <p>Публикуйте только реальные отзывы с согласия автора. Ссылка на источник обязательна.</p>
          <div class="admin-toolbar">
            <button class="btn btn--ghost btn--sm" type="button" data-admin-add-review>${icon('plus')} Добавить отзыв</button>
            <button class="btn btn--primary btn--sm" type="button" data-admin-save="reviews">Сохранить</button>
          </div>
          <div class="admin-list" data-admin-reviews></div>
          <div class="admin-note">Сейчас на сайте отзывы не публикуются — вместо них ссылка на открытую группу ВКонтакте. Добавляйте отзывы выборочно.</div>
        </section>

        <section class="admin-panel" data-admin-panel="faq" hidden>
          <h2>Вопросы и ответы</h2>
          <p>Вопросы со страницы FAQ и разметка FAQPage для поиска.</p>
          <div class="admin-toolbar">
            <button class="btn btn--ghost btn--sm" type="button" data-admin-add-faq>${icon('plus')} Добавить вопрос</button>
            <button class="btn btn--primary btn--sm" type="button" data-admin-save="faq">Сохранить</button>
          </div>
          <div class="admin-list" data-admin-faq></div>
        </section>

        <section class="admin-panel" data-admin-panel="contacts" hidden>
          <h2>Контакты</h2>
          <p>Телефон, адрес и ссылки на сообщества. После изменения проверьте их на всех страницах.</p>
          <div class="admin-toolbar"><button class="btn btn--primary btn--sm" type="button" data-admin-save="contacts">Сохранить</button></div>
          <div class="admin-row">
            <div class="admin-field"><label for="c-phone">Телефон</label><input id="c-phone" type="text" data-contact="phone"></div>
            <div class="admin-field"><label for="c-address">Адрес</label><input id="c-address" type="text" data-contact="address"></div>
            <div class="admin-field"><label for="c-vk">ВКонтакте</label><input id="c-vk" type="text" data-contact="vk"></div>
            <div class="admin-field"><label for="c-tg">Telegram</label><input id="c-tg" type="text" data-contact="telegram"></div>
            <div class="admin-field"><label for="c-max">MAX</label><input id="c-max" type="text" data-contact="max"></div>
            <div class="admin-field"><label for="c-hours">Часы работы</label><input id="c-hours" type="text" data-contact="hours" placeholder="Уточняется"></div>
          </div>
          <div class="admin-note">Демо-сохранение не меняет HTML-файлы: для публикации перенесите данные в assets/js/data.js.</div>
        </section>

        <section class="admin-panel" data-admin-panel="settings" hidden>
          <h2>Экспорт и сброс</h2>
          <p>Скачайте резервную копию демо-данных или перенесите её на другой компьютер.</p>
          <div class="admin-toolbar">
            <button class="btn btn--primary btn--sm" type="button" data-admin-export>Скачать JSON</button>
            <button class="btn btn--ghost btn--sm" type="button" data-admin-import-btn>Загрузить JSON</button>
            <input type="file" accept="application/json" data-admin-import hidden>
            <button class="btn btn--ghost btn--sm" type="button" data-admin-reset>Сбросить демо-данные</button>
          </div>
          <div class="admin-note">Для рабочей версии нужен сервер: авторизация с ролями, хранение заявок, журнал изменений и резервные копии. Демо-панель не является средством управления продакшеном.</div>
        </section>
      </div>
    </div>
  </div>
</div>
<script src="assets/js/admin.js" defer></script>`;
}

module.exports = { privacyPage, termsPage, organizationPage, adminPage };
