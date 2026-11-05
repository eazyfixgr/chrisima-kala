/*
 * Lightweight i18n layer.
 * Greek is the source language and lives inline in the HTML (progressive enhancement).
 * English translations are applied when the user switches to EN; any missing key
 * falls back to the original Greek text, so new content keeps working until translated.
 */
(() => {
  'use strict';

  const DEFAULT = 'el';
  const SUPPORTED = ['el', 'en'];
  const STORAGE_KEY = 'xk-lang';

  const dict = {
    en: {
      'demo.text': '<strong>DEMO WEBSITE</strong> · Sample products and prices · No real orders are placed',
      'brand.tag': 'Curated for your home',
      'doc.homeTitle': 'Χρήσιμα & Καλά — Practical products for the home',
      'doc.productTitle': 'Solar Emergency Power Kit — Χρήσιμα & Καλά',
      'nav.products': 'Products',
      'nav.how': 'How it works',
      'nav.contact': 'Contact',
      'header.cta': 'View products',
      'header.ctaPackages': 'View packages',
      'breadcrumb.home': 'Home',
      'breadcrumb.products': 'Products',

      'hero.eyebrow': 'Useful products for the home',
      'hero.title': 'Things that make life <em>a little easier.</em>',
      'hero.lead': 'Hand-picked products for the home, the holiday house and everyday needs — simple, practical and clearly priced. We start with a smart solar lighting and emergency power kit.',
      'hero.b1': 'Hand-picked, practical products',
      'hero.b2': 'Simple ordering with cash on delivery',
      'hero.b3': 'Respectful, clear customer service',
      'hero.cta': 'View products',
      'hero.cta2': 'How it works?',
      'hero.note': '* Sample website. Products, prices and descriptions will be finalised before commercial release.',
      'hero.mediaTag': '▧   SAMPLE IMAGE',
      'hero.badgeLabel': 'NEW PRODUCT',

      'strip1.title': 'Hand-picked products',
      'strip1.sub': 'Chosen with attention to detail',
      'strip2.title': 'Cash on delivery',
      'strip2.sub': 'Pay when it arrives',
      'strip3.title': 'Simple shopping',
      'strip3.sub': 'Without the hassle',

      'products.kicker': 'OUR PRODUCTS',
      'products.title': 'Chosen for practical use',
      'products.lead': 'A small but carefully curated catalogue. New products are added gradually.',
      'card1.badge': 'NEW',
      'card1.desc': 'Portable solar lighting and emergency power kit for the home, the holiday house and power cuts.',
      'card1.priceLabel': 'From',
      'card1.cta': 'View product',
      'soon.badge': 'SOON',
      'soon1.title': 'Portable LED torch',
      'soon1.desc': 'A bright, durable torch for every need. More information soon.',
      'soon2.title': 'First-aid kit',
      'soon2.desc': 'A practical kit with the essentials for home and car. More information soon.',
      'soon.priceLabel': 'Availability',
      'soon.price': 'Soon',

      'how.kicker': 'SIMPLE PROCESS',
      'how.title': 'Shop easily, in three steps',
      'how.lead': 'No sign-up or complicated steps. Just the essentials.',
      'step1.title': 'Choose a product',
      'step1.desc': 'Read the details and pick the package that suits you.',
      'step2.title': 'Enter your details',
      'step2.desc': 'Give your name, phone number and delivery address — quickly and simply.',
      'step3.title': 'Receive & pay',
      'step3.desc': 'Pay cash on delivery when your parcel arrives.',

      'contact.title': 'Have a question?',
      'contact.lead': 'We are here to help you choose with confidence.',

      'footer.text': 'Sample sales website. The name, images, prices and specifications are indicative. Real business details, full terms of sale and a privacy policy are required before going live.',

      'product.eyebrow': 'Lighting for every occasion',
      'product.title': 'When the lights go out, <em>be ready.</em>',
      'product.lead': 'A practical, portable solar lighting kit for the home, the holiday house and camping. All the essentials in one package, easy to use.',
      'product.b1': 'LED lighting in more than one place',
      'product.b2': 'Solar panel for charging under suitable conditions',
      'product.b3': 'Easy to carry and store',
      'product.cta': 'View available packages',
      'product.priceLabel': 'Indicative price from',
      'product.note': '* The kit composition and capabilities are indicative. Final technical specifications will be confirmed after testing the real product.',

      'gallery.tag': '▧   SAMPLE IMAGE',
      'gallery.full': 'Full kit',
      'gallery.panel': 'Solar panel',
      'gallery.power': 'Power unit',
      'gallery.lamps': 'LED lamps',

      'pstrip1.title': 'Alternative charging source',
      'pstrip1.sub': 'Using the solar panel',
      'pstrip2.title': 'Light where it is needed',
      'pstrip2.sub': 'With portable LED lamps',
      'pstrip3.title': 'Everything in one kit',
      'pstrip3.sub': 'Organised and easy to carry',

      'use.kicker': 'USEFUL EVERY DAY',
      'use.title': 'Small in size. Practical when you need it.',
      'use.lead': 'A supplementary lighting solution for moments when mains power is not easily available.',
      'use1.title': 'For the home',
      'use1.desc': 'Lighting in selected spots during a temporary power cut, depending on the actual battery autonomy.',
      'use2.title': 'For the holiday house',
      'use2.desc': 'A portable kit you can keep available in places with limited access to sockets.',
      'use3.title': 'For camping',
      'use3.desc': 'Lighting for outdoor activities, with the option of charging via the panel in suitable sunny conditions.',

      'contents.tag': 'SAMPLE CONTENTS',
      'contents.kicker': 'WHAT IS INCLUDED',
      'contents.title': 'Everything you need, in one practical package.',
      'contents.lead': 'Sample contents for the demo. It will be replaced by the manufacturer’s exact list.',
      'contents.i1': 'Central energy storage unit',
      'contents.i2': 'Solar panel',
      'contents.i3': 'External LED lamps',
      'contents.i4': 'Connection / charging cables',
      'contents.i4v': 'Set',
      'contents.i5': 'Instructions in Greek',
      'contents.fine': 'Panel power, battery capacity, charging times and output ports must only be stated once confirmed for the final product. The kit is not a full 72-hour readiness kit.',

      'order.kicker': 'EASY ORDER PROCESS',
      'order.title': 'Choose your package',
      'order.lead': 'Demo form · payment on delivery in the live version',
      'checkout.label': '1. Choose a package',
      'checkout.pill': '✓ Cash on delivery in the demo',
      'pkg1.name': '1× Solar Emergency Kit',
      'pkg1.desc': 'One complete sample kit',
      'pkg1.shipping': '+ €3.90 shipping',
      'pkg2.name': '2× Solar Emergency Kit',
      'pkg2.popular': '2-ITEM PACKAGE',
      'pkg2.desc': '<b>€19.90 less</b> than two separate kits · free shipping',
      'pkg2.note': 'instead of €119.80 separately',
      'info.callout': 'ℹ️ Indicative prices to demonstrate the design. Actual costs, delivery times and terms of sale are set before commercial use.',

      'form.heading': '2. Where should we send the order?',
      'form.phone': 'Mobile phone number *',
      'form.phoneHint': 'So the courier can contact you.',
      'form.name': 'Full name *',
      'form.street': 'Street and number *',
      'form.floor': 'Floor / Apartment (optional)',
      'form.city': 'City / Area *',
      'form.postcode': 'Postcode *',
      'form.note': 'Delivery note',
      'note.show': '+ Add a note for the courier (optional)',
      'note.hide': '− Hide note',

      'pay.title': 'Payment on delivery',
      'pay.sub': 'In the demo no data is sent and no order is created.',

      'side.tag': 'PLACEHOLDER',
      'side.sub': 'Sample solar lighting kit',
      'side.trust1': '☀ Solar panel',
      'side.trust2': '✦ LED lighting',
      'side.trust3': '◈ Cash on delivery',
      'summary.title': 'Order summary',
      'summary.discount': '2-item package saving',
      'summary.shipping': 'Shipping',
      'summary.cod': 'Cash on delivery',
      'summary.free': 'FREE',
      'summary.totalLabel': 'Pay on delivery',
      'summary.caption': 'VAT 24% included',
      'submit.text': 'Preview order',
      'submit.note': '🔒 Demo mode — there is no connection to a server or payment service. Your details are not stored.',

      'faq.kicker': 'USEFUL INFORMATION',
      'faq.title': 'Frequently asked questions',
      'faq.lead': 'Final answers must be based on the supplier’s confirmed specifications.',
      'faq.q1': 'How many hours does the kit run?',
      'faq.a1': 'Autonomy depends on battery capacity, the number of lamps switched on and their brightness. We do not quote specific hours before the final model is tested.',
      'faq.q2': 'Can I charge my phone?',
      'faq.a2': 'Only if the chosen model has a compatible USB output and sufficient power. The actual capabilities, limitations and compatible connections will be listed.',
      'faq.q3': 'Does it charge without sun?',
      'faq.a3': 'It depends on the charging inputs of the specific system. Solar charging is affected by weather, orientation and panel performance.',
      'faq.q4': 'Is it a complete 72-hour survival kit?',
      'faq.a4': 'No. It is an example of a supplementary lighting kit. A complete readiness plan also includes other essentials such as drinking water, food, medicines and communication.',
      'faq.q5': 'When will I receive it and how do I pay?',
      'faq.a5': 'The live commercial version will show verified shipping times, shipping costs, seller details, returns policy and payment methods. This form is for demo purposes only.',

      'float.text': 'View packages',
      'float.price': 'from €59.90 →',

      'modal.kicker': 'DEMO PREVIEW',
      'modal.previewTitle': 'Order summary',
      'modal.sub': 'See how an order would appear before it is submitted.',
      'modal.notice': 'This is a demo preview. <strong>No order was placed</strong> and no data was sent or stored.',
      'modal.edit': 'Edit',
      'modal.copy': 'Copy summary',
      'modal.copied': 'Copied ✓',
      'modal.copyFail': 'Copy unavailable',

      'preview.header': 'DEMO PREVIEW — NOT A REAL ORDER',
      'preview.package': 'Package',
      'preview.subtotal': 'Product total',
      'preview.shipping': 'Shipping',
      'preview.payment': 'Payment',
      'preview.name': 'Full name',
      'preview.phone': 'Mobile',
      'preview.address': 'Address',
      'preview.note': 'Note',

      'err.required': 'Please fill in this field.',
      'err.phone': 'Enter a 10-digit Greek mobile starting with 69.',
      'err.postcode': 'The postcode must be 5 digits.',
      'err.name': 'Please enter your full name.'
    }
  };

  const originals = new WeakMap();

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function writeStored(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  let lang = SUPPORTED.includes(readStored()) ? readStored() : DEFAULT;

  function translate(key) {
    if (lang !== DEFAULT && dict[lang] && Object.prototype.hasOwnProperty.call(dict[lang], key)) {
      return dict[lang][key];
    }
    return null;
  }

  function formatPrices() {
    const formatter = new Intl.NumberFormat(lang === 'en' ? 'en-IE' : 'el-GR', {
      style: 'currency',
      currency: 'EUR'
    });
    document.querySelectorAll('[data-price]').forEach((el) => {
      const value = Number(el.getAttribute('data-price'));
      if (!Number.isNaN(value)) el.textContent = formatter.format(value);
    });
  }

  function capture(el) {
    if (originals.has(el)) return originals.get(el);
    const record = {};
    if (el.hasAttribute('data-i18n')) record.text = el.textContent;
    if (el.hasAttribute('data-i18n-html')) record.html = el.innerHTML;
    if (el.hasAttribute('data-i18n-placeholder')) record.placeholder = el.getAttribute('placeholder');
    if (el.hasAttribute('data-i18n-aria')) record.aria = el.getAttribute('aria-label');
    if (el.hasAttribute('data-i18n-title')) record.title = el.getAttribute('title');
    originals.set(el, record);
    return record;
  }

  function apply(next) {
    if (SUPPORTED.includes(next)) lang = next;
    document.documentElement.lang = lang;

    const selector = '[data-i18n], [data-i18n-html], [data-i18n-placeholder], [data-i18n-aria], [data-i18n-title]';
    document.querySelectorAll(selector).forEach((el) => {
      const rec = capture(el);

      if ('text' in rec) {
        const value = translate(el.getAttribute('data-i18n'));
        el.textContent = value != null ? value : rec.text;
      }
      if ('html' in rec) {
        const value = translate(el.getAttribute('data-i18n-html'));
        el.innerHTML = value != null ? value : rec.html;
      }
      if ('placeholder' in rec) {
        const value = translate(el.getAttribute('data-i18n-placeholder'));
        el.setAttribute('placeholder', value != null ? value : rec.placeholder);
      }
      if ('aria' in rec) {
        const value = translate(el.getAttribute('data-i18n-aria'));
        el.setAttribute('aria-label', value != null ? value : rec.aria);
      }
      if ('title' in rec) {
        const value = translate(el.getAttribute('data-i18n-title'));
        el.setAttribute('title', value != null ? value : rec.title);
      }
    });

    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    formatPrices();
    writeStored(lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function t(key, fallback) {
    const value = translate(key);
    return value != null ? value : fallback;
  }

  window.I18n = { apply, t, current: () => lang };

  document.addEventListener('DOMContentLoaded', () => {
    apply(lang);
    document.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => apply(btn.getAttribute('data-lang')));
    });
  });
})();
