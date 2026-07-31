/*
 * Minimal pjax: intercept same-origin link clicks, fetch the target page,
 * swap only #navbar / .content / <title>, and update history. Everything
 * outside the content area (BGM player, Live2D waifu, WA2 sprites, cat
 * rope, theme toggle, star canvas) survives navigation untouched — no
 * white flash, no audio gap.
 *
 * Pages must keep working when loaded directly (pjax is an enhancement):
 * inline scripts inside .content are re-executed after each swap, and
 * 'pjax:done' fires so global per-page setup (progress bar, masonry,
 * tooltips, MathJax) can re-run.
 */
(function () {
  'use strict';

  if (!window.fetch || !window.DOMParser || !history.pushState) return;

  var SWAP_SELECTORS = ['#navbar', '.content'];
  var ASSET_RE = /\.(pdf|png|jpe?g|gif|svg|webp|zip|gz|mp3|mp4|ics|txt|xml|json)$/i;
  var busy = false;

  function execScripts(root) {
    var scripts = root.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      var old = scripts[i];
      var s = document.createElement('script');
      for (var a = 0; a < old.attributes.length; a++) {
        s.setAttribute(old.attributes[a].name, old.attributes[a].value);
      }
      if (!old.src) s.textContent = old.textContent;
      if (old.src) s.async = false;
      old.parentNode.replaceChild(s, old);
    }
  }

  function swap(doc, url, push) {
    for (var i = 0; i < SWAP_SELECTORS.length; i++) {
      var sel = SWAP_SELECTORS[i];
      var next = doc.querySelector(sel);
      var cur = document.querySelector(sel);
      if (!next || !cur) return false;
      cur.parentNode.replaceChild(document.adoptNode(next), cur);
    }
    document.title = doc.title;
    execScripts(document.querySelector('.content'));
    if (push) history.pushState({ pjax: true }, '', url);
    window.scrollTo(0, 0);
    document.dispatchEvent(new CustomEvent('pjax:done', { detail: { url: url } }));
    return true;
  }

  function load(url, push) {
    if (busy) return;
    busy = true;
    fetch(url, { headers: { 'X-Requested-With': 'pjax' } })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        busy = false;
        if (!swap(doc, url, push)) location.href = url;
      })
      .catch(function () {
        busy = false;
        location.href = url;
      });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a || !a.href) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.getAttribute('href').charAt(0) === '#') return;
    if (a.origin !== location.origin) return;
    if (ASSET_RE.test(a.pathname)) return;
    if (a.pathname === location.pathname && a.search === location.search) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    e.preventDefault();
    load(a.href, true);
  });

  window.addEventListener('popstate', function () {
    load(location.href, false);
  });

  // Seed a state entry so the first back-navigation lands here cleanly.
  history.replaceState({ pjax: true }, '', location.href);
})();
