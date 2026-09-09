/* ============================================================
   LAKSHYA — main.js
   Vanilla JavaScript. No dependencies.
   1. Mobile navigation
   2. Header shadow on scroll
   3. Current year in footer
   4. Reveal-on-scroll animations
   5. Contact form (mailto fallback for a static site)
   ============================================================ */
(function () {
  'use strict';

  /* Flag that JS is available (used to enable reveal animations safely) */
  document.documentElement.classList.add('js');

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  /* ----------------------------------------------------------
     1. Mobile navigation
  ---------------------------------------------------------- */
  function closeNav() {
    if (!header) { return; }
    header.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    if (navToggle) { navToggle.setAttribute('aria-expanded', 'false'); }
  }

  if (header && navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });

    /* Close the menu when a link inside it is clicked */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeNav(); }
    });

    /* Close when clicking outside the header */
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        closeNav();
      }
    });

    /* Close if the viewport grows back to desktop size */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) { closeNav(); }
    });
  }

  /* ----------------------------------------------------------
     2. Header shadow on scroll
  ---------------------------------------------------------- */
  function onScroll() {
    if (header) { header.classList.toggle('scrolled', window.scrollY > 8); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     3. Current year in the footer
  ---------------------------------------------------------- */
  var yearEls = document.querySelectorAll('.js-year');
  if (yearEls.length) {
    var y = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = y; });
  }

  /* ----------------------------------------------------------
     4. Reveal-on-scroll animations
  ---------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------
     5. Contact form — mailto fallback
     This is a static website with no backend. The form opens
     the visitor's email application with the message
     pre-filled. To receive messages directly, connect a form
     service and update this handler.
  ---------------------------------------------------------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    var showStatus = function (msg, ok) {
      if (!status) { return; }
      status.textContent = msg;
      status.classList.remove('ok', 'err');
      status.classList.add(ok ? 'ok' : 'err');
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var recipient = (form.getAttribute('data-recipient') || '').trim();

      /* The support email must be replaced before the site goes live */
      if (!recipient || recipient.indexOf('INSERT') !== -1) {
        showStatus('The support email address has not been configured yet. ' +
          'Please use the contact details listed on this page instead.', false);
        return;
      }

      var val = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      var name = val('cf-name');
      var email = val('cf-email');
      var phone = val('cf-phone');
      var subject = val('cf-subject');
      var message = val('cf-message');

      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        phone ? 'Phone: ' + phone : 'Phone: (not provided)',
        '',
        'Subject: ' + subject,
        '',
        message,
        '',
        '— Sent from the Lakshya website contact form'
      ];

      var mailto = 'mailto:' + recipient +
        '?subject=' + encodeURIComponent('[Lakshya Website] ' + subject) +
        '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailto;
      showStatus('Your email application should open with the message ' +
        'pre-filled. If it does not open, please email us directly at ' +
        recipient + '.', true);
    });
  }
})();
