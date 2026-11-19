/* Своя траектория — клиентские сценарии сайта. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var store = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    },
    getRaw: function (key) {
      try { return localStorage.getItem(key); } catch (e) { return null; }
    },
    setRaw: function (key, value) {
      try { localStorage.setItem(key, value); } catch (e) {}
    }
  };

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  /* ---------- Шапка и мобильное меню ---------- */
  function initHeader() {
    var header = $('[data-header]');
    var burger = $('[data-burger]');
    var nav = $('#site-nav');
    var close = $('[data-nav-close]');

    var onScroll = function () {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (!burger || !nav) return;

    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('menu-open', open);
      if (open) {
        var first = nav.querySelector('a, button');
        if (first) first.focus({ preventScroll: true });
      }
    };

    burger.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    if (close) close.addEventListener('click', function () { setMenu(false); burger.focus(); });

    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        if (nav.classList.contains('is-open') && !a.closest('[data-dropdown] .dropdown')) setMenu(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && nav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---------- Выпадающие меню ---------- */
  function initDropdowns() {
    var items = $$('[data-dropdown]');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn = item.querySelector('button[aria-expanded]');
      if (!btn) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var open = !item.classList.contains('is-open');
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('is-open');
            var b = other.querySelector('button[aria-expanded]');
            if (b) b.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-dropdown]')) {
        items.forEach(function (item) {
          item.classList.remove('is-open');
          var b = item.querySelector('button[aria-expanded]');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      items.forEach(function (item) {
        item.classList.remove('is-open');
        var b = item.querySelector('button[aria-expanded]');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Телефонная маска ---------- */
  function formatPhone(value) {
    var digits = String(value).replace(/\D/g, '');
    if (digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    if (digits.charAt(0) !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);
    var out = '+7';
    if (digits.length > 1) out += ' ' + digits.slice(1, 4);
    if (digits.length >= 5) out += ' ' + digits.slice(4, 7);
    if (digits.length >= 8) out += '-' + digits.slice(7, 9);
    if (digits.length >= 10) out += '-' + digits.slice(9, 11);
    return out;
  }

  function initPhones() {
    $$('[data-phone]').forEach(function (input) {
      input.addEventListener('input', function () {
        input.value = formatPhone(input.value);
      });
      input.addEventListener('focus', function () {
        if (!input.value) input.value = '+7 ';
      });
      input.addEventListener('blur', function () {
        if (input.value.replace(/\D/g, '').length <= 1) input.value = '';
      });
    });
  }

  /* ---------- Модальное окно заявки ---------- */
  function initLeadDialog() {
    var dialog = $('#lead-dialog');
    if (!dialog) return;
    var lastFocus = null;
    var form = $('[data-lead-form]', dialog);
    var title = $('[data-dialog-title]', dialog);
    var lead = $('[data-dialog-lead]', dialog);
    var eyebrow = $('[data-dialog-eyebrow]', dialog);

    function resetForm() {
      if (!form) return;
      form.reset();
      form.dataset.sent = '';
      $$('.form-success', form).forEach(function (el) { el.hidden = true; });
      $$('.field-row, .field, .consent, .lead-form__submit, .lead-form__note', form).forEach(function (el) { el.hidden = false; });
      $$('[data-error-for]', form).forEach(function (el) { el.textContent = ''; });
      $$('[aria-invalid]', form).forEach(function (el) { el.removeAttribute('aria-invalid'); });
      var submit = $('.lead-form__submit', form);
      if (submit) submit.disabled = false;
      var programSelect = form.querySelector('[name="program"]');
      var typeSelect = form.querySelector('[name="formType"]');
      if (programSelect) programSelect.value = '';
      if (typeSelect) typeSelect.value = 'Записаться';
    }

    function openDialog(trigger) {
      lastFocus = trigger || document.activeElement;
      resetForm();
      var type = trigger && trigger.getAttribute('data-form-type') ? trigger.getAttribute('data-form-type') : 'Записаться';
      var program = trigger && trigger.getAttribute('data-program') ? trigger.getAttribute('data-program') : '';
      if (form) {
        var hiddenType = form.querySelector('[name="formType"]');
        if (hiddenType) hiddenType.value = type;
        if (program) {
          var select = form.querySelector('[name="program"]');
          if (select) select.value = program;
        }
        var pageField = form.querySelector('[data-page-field]');
        if (pageField) pageField.value = location.pathname + location.search;
      }
      if (title) title.textContent = type === 'Записаться' ? 'Записаться' : type;
      if (eyebrow) eyebrow.textContent = program ? 'Программа' : 'Заявка';
      if (lead) {
        lead.textContent = program
          ? 'Оставьте имя и телефон — администратор уточнит детали по программе «' + program + '» и предложит удобное время.'
          : 'Оставьте имя и телефон — администратор перезвонит, уточнит запрос и предложит удобное время.';
      }
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      document.body.classList.add('dialog-open');
      window.setTimeout(function () {
        var first = dialog.querySelector('input[name="name"]');
        if (first) first.focus();
      }, 60);
    }

    function restoreFocus() {
      var target = lastFocus;
      if (!target || typeof target.focus !== 'function') return;
      window.setTimeout(function () {
        try {
          target.focus();
        } catch (err) {
          /* элемент мог исчезнуть со страницы */
        }
      }, 0);
    }

    function closeDialog() {
      if (dialog.open && typeof dialog.close === 'function') dialog.close();
      else {
        dialog.removeAttribute('open');
        restoreFocus();
      }
      document.body.classList.remove('dialog-open');
    }

    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-lead-open]');
      if (trigger) {
        e.preventDefault();
        openDialog(trigger);
      }
    });

    $$('[data-dialog-close]', dialog).forEach(function (btn) {
      btn.addEventListener('click', closeDialog);
    });

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog();
    });

    dialog.addEventListener('close', function () {
      document.body.classList.remove('dialog-open');
      restoreFocus();
    });
  }

  /* ---------- Формы ---------- */
  function validateForm(form) {
    var errors = {};
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var consent = form.querySelector('[name="consent"]');
    var honeypot = form.querySelector('[name="company"]');
    var digits = phone ? phone.value.replace(/\D/g, '') : '';

    if (!name || name.value.trim().length < 2) errors.name = 'Напишите, как к вам обращаться.';
    if (!digits || digits.length < 11) errors.phone = 'Укажите телефон полностью — 11 цифр.';
    if (!consent || !consent.checked) errors.consent = 'Нужно согласие на обработку персональных данных.';
    if (honeypot && honeypot.value) errors.spam = 'Проверка не пройдена.';

    $$('[data-error-for]', form).forEach(function (el) {
      var key = el.getAttribute('data-error-for');
      el.textContent = errors[key] || '';
    });
    ['name', 'phone', 'consent'].forEach(function (key) {
      var field = form.querySelector('[name="' + key + '"]');
      if (!field) return;
      if (errors[key]) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    });
    return { ok: Object.keys(errors).length === 0, errors: errors };
  }

  function initForms() {
    $$('[data-lead-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.dataset.sent === '1') return;
        var result = validateForm(form);
        if (!result.ok) {
          var first = form.querySelector('[aria-invalid="true"]');
          if (first) first.focus();
          return;
        }

        var now = Date.now();
        var last = Number(store.getRaw('st_last_lead_at') || 0);
        if (now - last < 5000) {
          var err = form.querySelector('[data-error-for="consent"]');
          if (err) err.textContent = 'Заявка уже отправляется. Подождите несколько секунд.';
          return;
        }
        store.setRaw('st_last_lead_at', String(now));

        var data = {};
        new FormData(form).forEach(function (value, key) { data[key] = value; });
        data.id = 'lead_' + now.toString(36);
        data.date = new Date().toISOString();
        data.status = 'new';
        data.page = location.pathname;
        delete data.company;

        var list = store.get('st_submissions', []);
        if (!Array.isArray(list)) list = [];
        list.unshift(data);
        store.set('st_submissions', list.slice(0, 200));

        var submit = form.querySelector('.lead-form__submit');
        if (submit) { submit.disabled = true; submit.textContent = 'Отправляем…'; }

        var finish = function (ok) {
          if (!ok) {
            if (submit) { submit.disabled = false; submit.innerHTML = 'Попробовать снова'; }
            return;
          }
          form.dataset.sent = '1';
          $$('.field-row, .field, .consent, .lead-form__submit, .lead-form__note', form).forEach(function (el) { el.hidden = true; });
          var success = $('.form-success', form);
          if (success) {
            success.hidden = false;
            success.setAttribute('tabindex', '-1');
            success.focus({ preventScroll: true });
          }
        };

        var endpoint = form.getAttribute('data-endpoint') || window.ST_LEADS_ENDPOINT || '';
        if (endpoint) {
          fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          }).then(function (r) { finish(r.ok); }).catch(function () { finish(false); });
        } else {
          window.setTimeout(function () { finish(true); }, 450);
        }
      });
    });
  }

  /* ---------- Cookie и Метрика ---------- */
  function initCookies() {
    var banner = $('[data-cookie-banner]');
    var choice = store.getRaw('st_cookie_consent');
    var meta = document.querySelector('meta[name="yandex-metrika-id"]');
    var metrikaId = (meta && meta.content) || window.ST_METRIKA_ID || '';

    function loadMetrika() {
      if (!metrikaId || window.__stMetrikaLoaded) return;
      window.__stMetrikaLoaded = true;
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) return; }
        k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
      window.ym(Number(metrikaId), 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    }

    if (choice === 'accepted') loadMetrika();

    if (!banner) return;
    if (!choice) banner.hidden = false;

    $$('[data-cookie]', banner).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-cookie') === 'accept' ? 'accepted' : 'necessary';
        store.setRaw('st_cookie_consent', value);
        banner.hidden = true;
        if (value === 'accepted') loadMetrika();
      });
    });
  }

  /* ---------- Каталог ---------- */
  function initCatalog() {
    var grid = $('[data-program-grid]');
    if (!grid) return;
    var cards = $$('[data-program-card]', grid);
    var chips = $$('.chip[data-filter]');
    var countEl = $('[data-catalog-count]');
    var empty = $('[data-catalog-empty]');
    var activeWrap = $('[data-active-filters]');
    var filters = $('[data-filters]');
    var state = { age: [], request: [], format: [], time: [] };
    var labels = {};

    chips.forEach(function (chip) {
      var key = chip.getAttribute('data-filter');
      var value = chip.getAttribute('data-value');
      var text = chip.textContent.trim().replace(/\s+\d+$/, '');
      labels[key + ':' + value] = text;
    });

    function parseUrl() {
      var params = new URLSearchParams(location.search);
      ['age', 'request', 'format', 'time'].forEach(function (key) {
        var raw = params.get(key);
        if (!raw) return;
        raw.split(',').forEach(function (v) {
          if (v && state[key].indexOf(v) === -1) state[key].push(v);
        });
      });
    }

    function cardMatches(card, key, value) {
      return (card.getAttribute('data-' + key) || '').split(/\s+/).indexOf(value) !== -1;
    }

    function matches(card, excludeKey) {
      return ['age', 'request', 'format', 'time'].every(function (key) {
        if (key === excludeKey) return true;
        if (!state[key].length) return true;
        return state[key].some(function (value) { return cardMatches(card, key, value); });
      });
    }

    function updateUrl() {
      var params = new URLSearchParams(location.search);
      ['age', 'request', 'format', 'time'].forEach(function (key) {
        if (state[key].length) params.set(key, state[key].join(','));
        else params.delete(key);
      });
      var qs = params.toString();
      try {
        history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
      } catch (e) {}
    }

    function render() {
      var visible = 0;
      cards.forEach(function (card) {
        var show = matches(card);
        card.hidden = !show;
        if (show) visible++;
      });

      chips.forEach(function (chip) {
        var key = chip.getAttribute('data-filter');
        var value = chip.getAttribute('data-value');
        var pressed = state[key].indexOf(value) !== -1;
        chip.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        chip.classList.toggle('is-active', pressed);
        var count = cards.filter(function (card) {
          return cardMatches(card, key, value) && matches(card, key);
        }).length;
        var countElChip = chip.querySelector('[data-filter-count]');
        if (countElChip) countElChip.textContent = count;
        chip.hidden = count === 0 && !pressed;
      });

      if (countEl) countEl.textContent = visible;
      if (empty) empty.classList.toggle('is-visible', visible === 0);

      if (activeWrap) {
        var active = [];
        ['age', 'request', 'format', 'time'].forEach(function (key) {
          state[key].forEach(function (value) {
            active.push({ key: key, value: value, label: labels[key + ':' + value] || value });
          });
        });
        activeWrap.hidden = active.length === 0;
        activeWrap.innerHTML = active.map(function (item) {
          return '<button class="active-filter" type="button" data-remove-filter="' + item.key + '" data-remove-value="' + esc(item.value) + '">' +
            esc(item.label) + ' <span aria-hidden="true">×</span><span class="visually-hidden"> — убрать</span></button>';
        }).join('');
      }
      updateUrl();
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var key = chip.getAttribute('data-filter');
        var value = chip.getAttribute('data-value');
        var idx = state[key].indexOf(value);
        if (idx === -1) state[key].push(value);
        else state[key].splice(idx, 1);
        render();
      });
    });

    $$('[data-filter-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state = { age: [], request: [], format: [], time: [] };
        render();
      });
    });

    if (activeWrap) {
      activeWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-remove-filter]');
        if (!btn) return;
        var key = btn.getAttribute('data-remove-filter');
        var value = btn.getAttribute('data-remove-value');
        var idx = state[key].indexOf(value);
        if (idx !== -1) state[key].splice(idx, 1);
        render();
      });
    }

    $$('[data-filters-open]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!filters) return;
        filters.classList.add('is-open');
        document.body.classList.add('menu-open');
        var close = $('[data-filters-close]', filters);
        if (close) close.focus();
      });
    });
    $$('[data-filters-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!filters) return;
        filters.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && filters && filters.classList.contains('is-open')) {
        filters.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }
    });

    parseUrl();
    render();
  }

  /* ---------- Переопределения из демо-панели ---------- */
  function initOverrides() {
    var overrides = store.get('st_admin_data', null);
    if (!overrides || !overrides.programs) return;

    function publicPrice(item) {
      if (!item.price) return '';
      if (item.showPrice) return item.price;
      return /\d/.test(item.price) ? 'По запросу' : item.price;
    }

    $$('[data-program-card]').forEach(function (card) {
      var slug = card.getAttribute('data-slug');
      var item = overrides.programs[slug];
      if (!slug || !item) return;
      var price = $('.program-card__price', card);
      if (price && item.price) {
        price.innerHTML = esc(publicPrice(item)) + '<small>' + (item.showPrice ? 'за занятие / абонемент' : 'уточним при записи') + '</small>';
      }
      var status = $('.status', card);
      if (status && item.status && item.statusLabel) {
        status.className = 'status status--' + item.status;
        status.textContent = item.statusLabel;
      }
    });

    $$('[data-program-price]').forEach(function (box) {
      var slug = box.getAttribute('data-program-price');
      var item = overrides.programs[slug];
      if (!slug || !item || !item.price) return;
      var value = $('[data-price-value]', box);
      var note = $('[data-price-note]', box);
      if (value) value.textContent = publicPrice(item);
      if (note) {
        note.textContent = item.showPrice
          ? 'Точную стоимость и абонемент уточним при записи.'
          : 'Стоимость называем после диагностики — она зависит от запроса и программы занятий.';
      }
    });

    $$('[data-program-hero-price]').forEach(function (box) {
      var slug = box.getAttribute('data-program-hero-price');
      var item = overrides.programs[slug];
      var value = box.querySelector('b');
      if (slug && item && item.price && value) value.textContent = publicPrice(item);
    });

    $$('[data-schedule-row]').forEach(function (row) {
      var slug = row.getAttribute('data-schedule-row');
      var item = overrides.programs[slug];
      if (!item) return;
      var price = $('.price-cell', row);
      if (price && item.price) price.textContent = publicPrice(item);
      var status = $('.status', row);
      if (status && item.status && item.statusLabel) {
        status.className = 'status status--' + item.status;
        status.textContent = item.statusLabel;
      }
    });

    if (overrides.banner && overrides.banner.enabled && overrides.banner.text) {
      var key = 'st_banner_' + overrides.banner.text.slice(0, 40);
      if (store.getRaw(key) === '1') return;
      var header = $('.site-header');
      if (!header) return;
      var banner = $('[data-name-banner]');
      if (!banner) {
        banner = document.createElement('div');
        banner.className = 'name-banner';
        banner.setAttribute('data-name-banner', '');
        banner.innerHTML =
          '<div class="container name-banner__inner">' +
            '<p><svg class="icon" aria-hidden="true" focusable="false"><use href="#i-info"></use></svg><span></span></p>' +
            '<button class="name-banner__close" type="button" data-name-banner-close aria-label="Скрыть сообщение">' +
              '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-close"></use></svg>' +
            '</button>' +
          '</div>';
        header.parentNode.insertBefore(banner, header);
      }
      var textEl = banner.querySelector('p span');
      if (!textEl) return;
      textEl.innerHTML = esc(overrides.banner.text) +
        (overrides.banner.link ? ' <a href="' + esc(overrides.banner.link) + '">' + esc(overrides.banner.label || 'Подробнее') + '</a>' : '');
      var close = $('[data-name-banner-close]', banner);
      if (close) {
        close.addEventListener('click', function () {
          banner.hidden = true;
          store.setRaw(key, '1');
        });
      }
    }
  }

  /* ---------- Появление блоков ---------- */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  }

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    initHeader();
    initDropdowns();
    initPhones();
    initLeadDialog();
    initForms();
    initCookies();
    initCatalog();
    initOverrides();
    initReveal();
  });
})();
