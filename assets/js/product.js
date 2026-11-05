(() => {
  'use strict';

  const CONFIG = Object.freeze({
    singlePrice: 59.90,
    doublePrice: 99.90,
    shippingSingle: 3.90,
    shippingDouble: 0,
    codFee: 0
  });

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const t = (key, fallback) => (window.I18n ? window.I18n.t(key, fallback) : fallback);

  function money(value) {
    const locale = document.documentElement.lang === 'en' ? 'en-IE' : 'el-GR';
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
  }

  function getQuantity() {
    const checked = $('input[name="package"]:checked');
    return checked ? Number(checked.value) : 1;
  }

  function summary() {
    const q = getQuantity();
    return {
      q,
      subtotal: q === 1 ? CONFIG.singlePrice : CONFIG.doublePrice,
      shipping: q === 1 ? CONFIG.shippingSingle : CONFIG.shippingDouble,
      cod: CONFIG.codFee
    };
  }

  function renderSummary() {
    const s = summary();
    $('#sumProduct').textContent = `Solar Emergency Kit × ${s.q}`;
    $('#sumPrice').textContent = money(s.subtotal);
    $('#sumShipping').textContent = s.shipping ? money(s.shipping) : t('summary.free', 'ΔΩΡΕΑΝ');
    $('#sumTotal').textContent = money(s.subtotal + s.shipping + s.cod);
    $('#discountRow').hidden = s.q !== 2;
  }

  $$('input[name="package"]').forEach((input) => {
    input.addEventListener('change', renderSummary);
  });

  $$('.thumb').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.thumb').forEach((x) => {
        const active = x === btn;
        x.classList.toggle('active', active);
        x.setAttribute('aria-pressed', String(active));
      });
      const img = $('#mainImage');
      img.src = `../../assets/images/${btn.dataset.img}.svg`;
      const label = btn.querySelector('span');
      if (label) img.alt = label.textContent;
    });
  });

  const noteToggle = $('#noteToggle');
  const noteBox = $('#noteBox');
  noteToggle.addEventListener('click', () => {
    const open = noteBox.hidden;
    noteBox.hidden = !open;
    noteToggle.setAttribute('aria-expanded', String(open));
    const show = noteToggle.querySelector('[data-i18n="note.show"]');
    const hide = noteToggle.querySelector('[data-i18n="note.hide"]');
    if (show) show.hidden = open;
    if (hide) hide.hidden = !open;
  });

  const inputIds = ['phone', 'fullname', 'street', 'city', 'postcode'];

  function validate() {
    let firstInvalid = null;

    for (const id of inputIds) {
      const el = $('#' + id);
      const value = el.value.trim();
      let error = '';

      if (!value) {
        error = t('err.required', 'Συμπληρώστε αυτό το πεδίο.');
      } else if (id === 'phone' && !/^69\d{8}$/.test(value.replace(/\s|-/g, ''))) {
        error = t('err.phone', 'Συμπληρώστε ελληνικό κινητό 10 ψηφίων που αρχίζει από 69.');
      } else if (id === 'postcode' && !/^\d{5}$/.test(value)) {
        error = t('err.postcode', 'Ο Τ.Κ. πρέπει να έχει 5 ψηφία.');
      } else if (id === 'fullname' && value.length < 3) {
        error = t('err.name', 'Συμπληρώστε ονοματεπώνυμο.');
      }

      el.setCustomValidity(error);
      el.setAttribute('aria-invalid', error ? 'true' : 'false');
      if (error && !firstInvalid) firstInvalid = el;
    }

    if (firstInvalid) {
      firstInvalid.reportValidity();
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  inputIds.forEach((id) => {
    $('#' + id).addEventListener('input', function () {
      this.setCustomValidity('');
      this.setAttribute('aria-invalid', 'false');
    });
  });

  const previewDialog = $('#previewDialog');
  let previewText = '';

  $('#orderForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;

    const s = summary();
    const v = (id) => $('#' + id).value.trim();
    const total = s.subtotal + s.shipping + s.cod;
    const address = [v('street'), v('floor'), v('postcode'), v('city')].filter(Boolean).join(', ');

    const rows = [
      [t('preview.package', 'Πακέτο'), `${s.q} × Solar Emergency Kit`],
      [t('preview.subtotal', 'Ποσό προϊόντων'), money(s.subtotal)],
      [t('preview.shipping', 'Μεταφορικά'), s.shipping ? money(s.shipping) : t('summary.free', 'ΔΩΡΕΑΝ')],
      [t('preview.payment', 'Πληρωμή'), `${t('pay.title', 'Αντικαταβολή')} — ${money(total)}`],
      [t('preview.name', 'Ονοματεπώνυμο'), v('fullname')],
      [t('preview.phone', 'Κινητό'), `+30 ${v('phone')}`],
      [t('preview.address', 'Διεύθυνση'), address]
    ];

    const note = v('note');
    if (note) rows.push([t('preview.note', 'Σημείωση'), note]);

    const container = $('#previewRows');
    container.replaceChildren();
    for (const [label, value] of rows) {
      const row = document.createElement('div');
      row.className = 'review-line';
      const left = document.createElement('b');
      const right = document.createElement('span');
      left.textContent = label;
      right.textContent = value;
      row.append(left, right);
      container.append(row);
    }

    previewText = t('preview.header', 'DEMO ΠΡΟΕΠΙΣΚΟΠΗΣΗ — ΟΧΙ ΠΡΑΓΜΑΤΙΚΗ ΠΑΡΑΓΓΕΛΙΑ') + '\n' +
      rows.map(([a, b]) => `${a}: ${b}`).join('\n');

    previewDialog.showModal();
  });

  $('#closeDialog').addEventListener('click', () => previewDialog.close());
  $('#backToForm').addEventListener('click', () => previewDialog.close());

  const copyBtn = $('#copySummary');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(previewText);
      copyBtn.textContent = t('modal.copied', 'Αντιγράφηκε ✓');
      setTimeout(() => { copyBtn.textContent = t('modal.copy', 'Αντιγραφή σύνοψης'); }, 1800);
    } catch (e) {
      copyBtn.textContent = t('modal.copyFail', 'Αντιγραφή μη διαθέσιμη');
      setTimeout(() => { copyBtn.textContent = t('modal.copy', 'Αντιγραφή σύνοψης'); }, 2000);
    }
  });

  window.addEventListener('langchange', renderSummary);

  renderSummary();
})();
