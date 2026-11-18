/* Демо-панель управления центром «Своя траектория».
   Все изменения хранятся в localStorage браузера. Продакшен требует backend. */
(function () {
  'use strict';

  var DATA = window.ST_DATA || {};
  var KEY = 'st_admin_data';
  var SESSION = 'st_admin_session';
  var SUBMISSIONS = 'st_submissions';

  var STATUS = {
    open: 'Идёт набор',
    january: 'Набор с января',
    soon: 'Скоро',
    announce: 'Анонс',
    full: 'Мест нет'
  };

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var clone = function (v) { return JSON.parse(JSON.stringify(v)); };

  function defaults() {
    var programs = {};
    (DATA.programs || []).forEach(function (p) {
      programs[p.slug] = {
        price: p.price,
        showPrice: !!p.showPrice,
        status: p.status,
        statusLabel: p.statusLabel,
        schedule: p.schedule
      };
    });
    return {
      programs: programs,
      enrollments: clone(DATA.enrollments || []),
      banner: { enabled: false, text: '', link: '', label: 'Подробнее' },
      specialists: clone(DATA.specialists || []),
      reviews: [],
      faq: clone(DATA.faq || []),
      contacts: {
        phone: DATA.brand ? DATA.brand.phone : '',
        address: DATA.brand ? DATA.brand.address : '',
        vk: DATA.brand ? DATA.brand.vk : '',
        telegram: DATA.brand ? DATA.brand.telegram : '',
        max: DATA.brand ? DATA.brand.max : '',
        hours: 'Уточняется'
      }
    };
  }

  var data = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var parsed = JSON.parse(raw);
      var base = defaults();
      return {
        programs: Object.assign(base.programs, parsed.programs || {}),
        enrollments: parsed.enrollments || base.enrollments,
        banner: Object.assign(base.banner, parsed.banner || {}),
        specialists: parsed.specialists || base.specialists,
        reviews: parsed.reviews || [],
        faq: parsed.faq || base.faq,
        contacts: Object.assign(base.contacts, parsed.contacts || {})
      };
    } catch (e) { return defaults(); }
  }

  function save(silent) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      if (!silent) toast('Сохранено');
    } catch (e) {
      toast('Не удалось сохранить: хранилище браузера недоступно');
    }
  }

  function toast(message) {
    var el = document.createElement('div');
    el.textContent = message;
    el.setAttribute('role', 'status');
    el.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#1c312c;color:#fff;padding:12px 18px;border-radius:12px;font-size:13px;z-index:9999;box-shadow:0 12px 30px rgba(0,0,0,.2)';
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 2600);
  }

  function session() {
    try { return JSON.parse(localStorage.getItem(SESSION) || 'null'); } catch (e) { return null; }
  }

  function submissions() {
    try { return JSON.parse(localStorage.getItem(SUBMISSIONS) || '[]'); } catch (e) { return []; }
  }

  function appCounts() {
    var list = submissions();
    return { total: list.length, fresh: list.filter(function (s) { return !s.status || s.status === 'new'; }).length };
  }

  /* ---------- Вход и роли ---------- */
  function initAuth() {
    var login = $('[data-admin-login]');
    var app = $('[data-admin-app]');
    var enter = $('[data-admin-enter]');
    var roleSelect = $('[data-admin-role]');
    var label = $('[data-admin-role-label]');
    var logout = $('[data-admin-logout]');
    var current = session();

    function show(role) {
      if (!login || !app) return;
      login.hidden = true;
      app.hidden = false;
      if (label) label.textContent = role === 'manager' ? 'Администратор' : 'Владелец';
      var managerTabs = ['overview', 'schedule', 'applications'];
      $$('.admin-tab').forEach(function (tab) {
        var id = tab.getAttribute('data-admin-tab');
        tab.hidden = role !== 'owner' && managerTabs.indexOf(id) === -1;
      });
      $$('[data-admin-panel]').forEach(function (panel) {
        var id = panel.getAttribute('data-admin-panel');
        if (role !== 'owner' && managerTabs.indexOf(id) === -1) panel.hidden = true;
      });
      var active = $('.admin-tab.is-active');
      if (active && active.hidden) {
        var first = $('.admin-tab:not([hidden])');
        if (first) first.click();
      }
      renderAll();
    }

    if (current && current.role) show(current.role);

    if (enter) {
      enter.addEventListener('click', function () {
        var role = roleSelect ? roleSelect.value : 'owner';
        localStorage.setItem(SESSION, JSON.stringify({ role: role, at: Date.now() }));
        show(role);
      });
    }

    if (logout) {
      logout.addEventListener('click', function () {
        localStorage.removeItem(SESSION);
        location.reload();
      });
    }
  }

  function initTabs() {
    var tabs = $$('.admin-tab');
    var panels = $$('[data-admin-panel]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-admin-tab');
        tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
        panels.forEach(function (p) {
          p.hidden = p.getAttribute('data-admin-panel') !== id;
        });
        if (id === 'overview') renderOverview();
      });
    });
  }

  /* ---------- Обзор ---------- */
  function renderOverview() {
    var wrap = $('[data-admin-overview]');
    if (!wrap) return;
    var counts = appCounts();
    var active = data.enrollments.filter(function (e) { return e.status === 'open' || e.status === 'january'; }).length;
    wrap.innerHTML = [
      card('Программ', Object.keys(data.programs).length + ' из ' + (DATA.programs || []).length),
      card('Новых заявок', counts.fresh + ' · всего ' + counts.total),
      card('Активных наборов', active),
      card('Вопросов в FAQ', data.faq.length)
    ].join('');
    var fresh = submissions().slice(0, 3);
    var list = $('.admin-list[data-admin-overview-list]');
    if (!list) {
      var holder = document.createElement('div');
      holder.className = 'admin-list';
      holder.setAttribute('data-admin-overview-list', '');
      wrap.parentNode.insertBefore(holder, wrap.nextSibling);
      holder.innerHTML = fresh.length
        ? fresh.map(function (s) {
            return '<div class="admin-app"><span><b>' + esc(s.name || 'Без имени') + '</b> · ' + esc(s.type || 'Заявка') + '<small>' + esc(s.phone || '') + ' · ' + esc(s.program || 'программа не выбрана') + '</small></span><span class="admin-badge">' + esc(statusName(s.status)) + '</span></div>';
          }).join('')
        : '<div class="admin-note" style="margin-top:0">Заявок пока нет. Отправьте тестовую заявку через форму на сайте — она появится здесь.</div>';
    }
  }

  function card(title, value) {
    return '<div class="contact-block" style="padding:18px"><p style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)">' + esc(title) + '</p><p style="font-size:24px;font-weight:400;margin-top:6px;color:var(--ink)">' + esc(value) + '</p></div>';
  }

  function statusName(status) {
    if (!status || status === 'new') return 'Новая';
    if (status === 'progress') return 'В работе';
    if (status === 'done') return 'Записана';
    return status;
  }

  /* ---------- Программы ---------- */
  function renderPrograms() {
    var body = $('[data-admin-programs]');
    if (!body) return;
    body.innerHTML = (DATA.programs || []).map(function (p) {
      var item = data.programs[p.slug] || {};
      return '<tr>' +
        '<td><b>' + esc(p.title) + '</b><br><small style="color:var(--muted)">' + esc(p.ageShort) + '</small></td>' +
        '<td><input type="text" data-p-slug="' + esc(p.slug) + '" data-p-field="price" value="' + esc(item.price || '') + '" aria-label="Цена: ' + esc(p.title) + '"></td>' +
        '<td><label class="admin-switch"><input type="checkbox" data-p-slug="' + esc(p.slug) + '" data-p-field="showPrice"' + (item.showPrice ? ' checked' : '') + ' aria-label="Показывать цену: ' + esc(p.title) + '"></label></td>' +
        '<td><select data-p-slug="' + esc(p.slug) + '" data-p-field="status" aria-label="Статус: ' + esc(p.title) + '">' +
          Object.keys(STATUS).map(function (key) {
            return '<option value="' + key + '"' + (item.status === key ? ' selected' : '') + '>' + STATUS[key] + '</option>';
          }).join('') +
        '</select></td>' +
        '<td><input type="text" data-p-slug="' + esc(p.slug) + '" data-p-field="schedule" value="' + esc(item.schedule || '') + '" aria-label="Расписание: ' + esc(p.title) + '"></td>' +
      '</tr>';
    }).join('');
  }

  function savePrograms() {
    (DATA.programs || []).forEach(function (p) {
      var price = $('[data-p-slug="' + p.slug + '"][data-p-field="price"]');
      var show = $('[data-p-slug="' + p.slug + '"][data-p-field="showPrice"]');
      var status = $('[data-p-slug="' + p.slug + '"][data-p-field="status"]');
      var schedule = $('[data-p-slug="' + p.slug + '"][data-p-field="schedule"]');
      data.programs[p.slug] = {
        price: price && price.value.trim() ? price.value.trim() : p.price,
        showPrice: show ? show.checked : false,
        status: status ? status.value : p.status,
        statusLabel: status ? STATUS[status.value] : p.statusLabel,
        schedule: schedule && schedule.value.trim() ? schedule.value.trim() : p.schedule
      };
    });
    save();
  }

  /* ---------- Наборы ---------- */
  function renderEnrollments() {
    var wrap = $('[data-admin-enrollments]');
    if (!wrap) return;
    wrap.innerHTML = data.enrollments.map(function (e, i) {
      return '<div class="admin-app" style="display:block" data-enr-index="' + i + '">' +
        '<div class="admin-row">' +
          '<div class="admin-field"><label>Название</label><input type="text" data-enr-field="title" value="' + esc(e.title) + '"></div>' +
          '<div class="admin-field"><label>Дата / период</label><input type="text" data-enr-field="date" value="' + esc(e.date) + '"></div>' +
        '</div>' +
        '<div class="admin-field"><label>Текст</label><textarea data-enr-field="text" rows="2">' + esc(e.text) + '</textarea></div>' +
        '<div class="admin-row">' +
          '<div class="admin-field"><label>Ссылка</label><input type="text" data-enr-field="href" value="' + esc(e.href) + '"></div>' +
          '<div class="admin-field"><label>Статус</label><select data-enr-field="status">' +
            Object.keys(STATUS).map(function (key) { return '<option value="' + key + '"' + (e.status === key ? ' selected' : '') + '>' + STATUS[key] + '</option>'; }).join('') +
          '</select></div>' +
        '</div>' +
        '<div class="admin-row-actions"><button class="admin-mini admin-mini--danger" type="button" data-enr-remove="' + i + '">Удалить</button></div>' +
      '</div>';
    }).join('') || '<div class="admin-note" style="margin-top:0">Наборов пока нет.</div>';
  }

  function collectEnrollments() {
    return $$('[data-enr-index]').map(function (row) {
      var get = function (f) { var el = row.querySelector('[data-enr-field="' + f + '"]'); return el ? el.value.trim() : ''; };
      return {
        title: get('title'), date: get('date'), text: get('text'), href: get('href'),
        status: get('status'), statusLabel: STATUS[get('status')] || 'Идёт набор'
      };
    });
  }

  /* ---------- Специалисты ---------- */
  function renderSpecialists() {
    var wrap = $('[data-admin-specialists]');
    if (!wrap) return;
    wrap.innerHTML = data.specialists.map(function (s, i) {
      return '<div class="admin-app" style="display:block" data-spec-index="' + i + '">' +
        '<div class="admin-row">' +
          '<div class="admin-field"><label>Направление / имя</label><input type="text" data-spec-field="name" value="' + esc(s.name) + '"></div>' +
          '<div class="admin-field"><label>Роль</label><input type="text" data-spec-field="role" value="' + esc(s.role) + '"></div>' +
        '</div>' +
        '<div class="admin-field"><label>Описание</label><textarea data-spec-field="text" rows="2">' + esc(s.text) + '</textarea></div>' +
        '<div class="admin-row">' +
          '<div class="admin-field"><label>Инициалы</label><input type="text" data-spec-field="initials" value="' + esc(s.initials || '') + '" maxlength="3"></div>' +
          '<div class="admin-field"><label>Фото (URL)</label><input type="text" data-spec-field="photo" value="' + esc(s.photo || '') + '" placeholder="Пока не публикуется"></div>' +
        '</div>' +
        '<div class="admin-row-actions"><button class="admin-mini admin-mini--danger" type="button" data-spec-remove="' + i + '">Удалить</button></div>' +
      '</div>';
    }).join('') || '<div class="admin-note" style="margin-top:0">Специалистов пока нет.</div>';
  }

  function collectSpecialists() {
    return $$('[data-spec-index]').map(function (row) {
      var get = function (f) { var el = row.querySelector('[data-spec-field="' + f + '"]'); return el ? el.value.trim() : ''; };
      return { name: get('name'), role: get('role'), text: get('text'), initials: get('initials'), photo: get('photo') };
    });
  }

  /* ---------- Отзывы ---------- */
  function renderReviews() {
    var wrap = $('[data-admin-reviews]');
    if (!wrap) return;
    wrap.innerHTML = data.reviews.length ? data.reviews.map(function (r, i) {
      return '<div class="admin-app" style="display:block" data-review-index="' + i + '">' +
        '<div class="admin-row">' +
          '<div class="admin-field"><label>Автор</label><input type="text" data-review-field="author" value="' + esc(r.author || '') + '"></div>' +
          '<div class="admin-field"><label>Источник (ссылка)</label><input type="text" data-review-field="source" value="' + esc(r.source || '') + '"></div>' +
        '</div>' +
        '<div class="admin-field"><label>Текст отзыва</label><textarea data-review-field="text" rows="3">' + esc(r.text || '') + '</textarea></div>' +
        '<div class="admin-row-actions">' +
          '<label class="admin-switch"><input type="checkbox" data-review-field="published"' + (r.published ? ' checked' : '') + '> Опубликован</label>' +
          '<button class="admin-mini admin-mini--danger" type="button" data-review-remove="' + i + '">Удалить</button>' +
        '</div>' +
      '</div>';
    }).join('') : '<div class="admin-note" style="margin-top:0">Отзывов нет. Публикуйте только реальные отзывы с согласия авторов.</div>';
  }

  function collectReviews() {
    return $$('[data-review-index]').map(function (row) {
      var get = function (f) { var el = row.querySelector('[data-review-field="' + f + '"]'); return el ? el.value.trim() : ''; };
      var pub = row.querySelector('[data-review-field="published"]');
      return { author: get('author'), source: get('source'), text: get('text'), published: pub ? pub.checked : false };
    });
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    var wrap = $('[data-admin-faq]');
    if (!wrap) return;
    wrap.innerHTML = data.faq.map(function (f, i) {
      return '<div class="admin-app" style="display:block" data-faq-index="' + i + '">' +
        '<div class="admin-field"><label>Вопрос</label><input type="text" data-faq-field="q" value="' + esc(f.q) + '"></div>' +
        '<div class="admin-field"><label>Ответ</label><textarea data-faq-field="a" rows="3">' + esc(f.a) + '</textarea></div>' +
        '<div class="admin-row-actions"><button class="admin-mini admin-mini--danger" type="button" data-faq-remove="' + i + '">Удалить</button></div>' +
      '</div>';
    }).join('') || '<div class="admin-note" style="margin-top:0">Вопросов пока нет.</div>';
  }

  function collectFaq() {
    return $$('[data-faq-index]').map(function (row) {
      var q = row.querySelector('[data-faq-field="q"]');
      var a = row.querySelector('[data-faq-field="a"]');
      return { q: q ? q.value.trim() : '', a: a ? a.value.trim() : '' };
    }).filter(function (f) { return f.q; });
  }

  /* ---------- Заявки ---------- */
  function renderApplications() {
    var wrap = $('[data-admin-applications]');
    if (!wrap) return;
    var list = submissions();
    wrap.innerHTML = list.length ? list.map(function (s) {
      return '<div class="admin-app" data-app-id="' + esc(s.id) + '">' +
        '<span><b>' + esc(s.name || 'Без имени') + '</b> — ' + esc(s.type || 'Заявка') +
          '<small>' + esc(s.phone || '') + ' · ' + esc(s.age || 'возраст не указан') + ' · ' + esc(s.program || 'программа не выбрана') + '</small>' +
          '<small>' + esc(s.comment || 'без комментария') + '</small>' +
          '<small>' + esc((s.date || '').slice(0, 16).replace('T', ' ')) + ' · ' + esc(s.page || '') + '</small>' +
        '</span>' +
        '<span style="display:flex;gap:6px;align-items:flex-start;flex-wrap:wrap">' +
          '<select data-app-status aria-label="Статус заявки">' +
            [['new', 'Новая'], ['progress', 'В работе'], ['done', 'Записана']].map(function (o) {
              return '<option value="' + o[0] + '"' + ((s.status || 'new') === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
            }).join('') +
          '</select>' +
          '<button class="admin-mini admin-mini--danger" type="button" data-app-remove>Удалить</button>' +
        '</span>' +
      '</div>';
    }).join('') : '<div class="admin-note" style="margin-top:0">Заявок пока нет. Отправьте тестовую заявку через форму на сайте.</div>';
    updateCounts();
  }

  function updateCounts() {
    var counts = appCounts();
    $$('[data-count-new]').forEach(function (el) { el.textContent = counts.fresh; });
    $$('[data-count-apps]').forEach(function (el) { el.textContent = counts.total; });
    var label = $('[data-count-apps-label]');
    if (label) label.textContent = counts.total + ' заявок';
  }

  /* ---------- Баннер и контакты ---------- */
  function fillBanner() {
    var enabled = $('[data-banner-enabled]');
    var text = $('[data-banner-text]');
    var link = $('[data-banner-link]');
    var label = $('[data-banner-label]');
    if (enabled) enabled.checked = !!data.banner.enabled;
    if (text) text.value = data.banner.text || '';
    if (link) link.value = data.banner.link || '';
    if (label) label.value = data.banner.label || 'Подробнее';
  }

  function saveBanner() {
    data.banner = {
      enabled: $('[data-banner-enabled]') ? $('[data-banner-enabled]').checked : false,
      text: $('[data-banner-text]') ? $('[data-banner-text]').value.trim() : '',
      link: $('[data-banner-link]') ? $('[data-banner-link]').value.trim() : '',
      label: $('[data-banner-label]') ? $('[data-banner-label]').value.trim() : 'Подробнее'
    };
    save();
  }

  function fillContacts() {
    $$('[data-contact]').forEach(function (input) {
      var key = input.getAttribute('data-contact');
      input.value = data.contacts[key] || '';
    });
  }

  function saveContacts() {
    $$('[data-contact]').forEach(function (input) {
      data.contacts[input.getAttribute('data-contact')] = input.value.trim();
    });
    save();
  }

  /* ---------- Экспорт / импорт ---------- */
  function initSettings() {
    var exportBtn = $('[data-admin-export]');
    var importBtn = $('[data-admin-import-btn]');
    var fileInput = $('[data-admin-import]');
    var resetBtn = $('[data-admin-reset]');

    if (exportBtn) {
      exportBtn.addEventListener('click', function () {
        var blob = new Blob([JSON.stringify({ data: data, submissions: submissions() }, null, 2)], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'svoya-traektoriya-admin.json';
        a.click();
        URL.revokeObjectURL(url);
        toast('Файл скачан');
      });
    }

    if (importBtn && fileInput) {
      importBtn.addEventListener('click', function () { fileInput.click(); });
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          try {
            var parsed = JSON.parse(reader.result);
            if (parsed.data) data = Object.assign(defaults(), parsed.data);
            else data = Object.assign(defaults(), parsed);
            if (parsed.submissions) localStorage.setItem(SUBMISSIONS, JSON.stringify(parsed.submissions));
            save(true);
            renderAll();
            toast('Данные загружены');
          } catch (e) {
            toast('Не удалось прочитать JSON');
          }
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (!confirm('Сбросить все демо-данные панели? Заявки останутся.')) return;
        localStorage.removeItem(KEY);
        data = defaults();
        renderAll();
        toast('Демо-данные сброшены');
      });
    }
  }

  /* ---------- События ---------- */
  function initEvents() {
    $$('[data-admin-save]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var what = btn.getAttribute('data-admin-save');
        if (what === 'programs') savePrograms();
        else if (what === 'enrollments') { data.enrollments = collectEnrollments(); save(); }
        else if (what === 'specialists') { data.specialists = collectSpecialists(); save(); }
        else if (what === 'reviews') { data.reviews = collectReviews(); save(); }
        else if (what === 'faq') { data.faq = collectFaq(); save(); }
        else if (what === 'banner') saveBanner();
        else if (what === 'contacts') saveContacts();
      });
    });

    var addEnr = $('[data-admin-add-enrollment]');
    if (addEnr) addEnr.addEventListener('click', function () {
      data.enrollments = collectEnrollments();
      data.enrollments.push({ title: 'Новый набор', text: 'Описание набора', status: 'open', statusLabel: STATUS.open, href: 'programs.html', date: 'Даты уточняются' });
      renderEnrollments();
    });

    var addSpec = $('[data-admin-add-specialist]');
    if (addSpec) addSpec.addEventListener('click', function () {
      data.specialists = collectSpecialists();
      data.specialists.push({ name: 'Новый специалист', role: 'Направление работы', text: 'Короткое описание', initials: 'Н' });
      renderSpecialists();
    });

    var addReview = $('[data-admin-add-review]');
    if (addReview) addReview.addEventListener('click', function () {
      data.reviews = collectReviews();
      data.reviews.push({ author: '', source: '', text: '', published: false });
      renderReviews();
    });

    var addFaq = $('[data-admin-add-faq]');
    if (addFaq) addFaq.addEventListener('click', function () {
      data.faq = collectFaq();
      data.faq.push({ q: 'Новый вопрос', a: 'Ответ' });
      renderFaq();
    });

    document.addEventListener('click', function (e) {
      var enr = e.target.closest('[data-enr-remove]');
      if (enr) {
        data.enrollments = collectEnrollments();
        data.enrollments.splice(Number(enr.getAttribute('data-enr-remove')), 1);
        renderEnrollments();
        save(true);
      }
      var spec = e.target.closest('[data-spec-remove]');
      if (spec) {
        data.specialists = collectSpecialists();
        data.specialists.splice(Number(spec.getAttribute('data-spec-remove')), 1);
        renderSpecialists();
        save(true);
      }
      var review = e.target.closest('[data-review-remove]');
      if (review) {
        data.reviews = collectReviews();
        data.reviews.splice(Number(review.getAttribute('data-review-remove')), 1);
        renderReviews();
        save(true);
      }
      var faq = e.target.closest('[data-faq-remove]');
      if (faq) {
        data.faq = collectFaq();
        data.faq.splice(Number(faq.getAttribute('data-faq-remove')), 1);
        renderFaq();
        save(true);
      }
      var appRemove = e.target.closest('[data-app-remove]');
      if (appRemove) {
        var item = appRemove.closest('[data-app-id]');
        var id = item ? item.getAttribute('data-app-id') : '';
        var list = submissions().filter(function (s) { return s.id !== id; });
        localStorage.setItem(SUBMISSIONS, JSON.stringify(list));
        renderApplications();
        toast('Заявка удалена');
      }
    });

    document.addEventListener('change', function (e) {
      if (e.target.matches('[data-app-status]')) {
        var row = e.target.closest('[data-app-id]');
        var id = row ? row.getAttribute('data-app-id') : '';
        var list = submissions().map(function (s) {
          if (s.id === id) s.status = e.target.value;
          return s;
        });
        localStorage.setItem(SUBMISSIONS, JSON.stringify(list));
        updateCounts();
        toast('Статус обновлён');
      }
    });

    var clear = $('[data-admin-clear-apps]');
    if (clear) clear.addEventListener('click', function () {
      if (!confirm('Удалить все заявки из этого браузера?')) return;
      localStorage.removeItem(SUBMISSIONS);
      renderApplications();
      toast('Список заявок очищен');
    });
  }

  function renderAll() {
    renderOverview();
    renderPrograms();
    renderEnrollments();
    renderSpecialists();
    renderReviews();
    renderFaq();
    renderApplications();
    fillBanner();
    fillContacts();
    updateCounts();
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    if (!$('[data-admin-login]')) return;
    initAuth();
    initTabs();
    initEvents();
    initSettings();
  });
})();
