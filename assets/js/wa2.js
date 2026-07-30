/*
 * White Album 2 corner widget (static sprite, breathing animation, quotes,
 * outfit switch) + background music via self-hosted APlayer.
 * Desktop only, same policy as the Live2D waifu.
 */
(function () {
  'use strict';

  if (window.matchMedia('(max-width: 767px)').matches) return;

  /* ---------------- Setsuna sprite widget ---------------- */

  var OUTFITS = [
    '/assets/img/wa2/setsuna-winter.png',
    '/assets/img/wa2/setsuna-uniform.png',
    '/assets/img/wa2/setsuna-dress.png',
    '/assets/img/wa2/setsuna-yukata.png'
  ];

  /* Short character lines & ambient phrases — no song lyrics. */
  var LINES = [
    '雪、降ってきたね。',
    '私、ずるいから。',
    'おかえりなさい。',
    '大好きだよ。',
    '三人で、また…',
    '届かない恋、か…',
    'コーヒー、淹れようか？'
  ];

  var outfitIdx = 0;
  var lineIdx = Math.floor(Math.random() * LINES.length);
  var tipsTimer = null;

  var wa2 = document.createElement('div');
  wa2.id = 'wa2-widget';
  wa2.innerHTML =
    '<div class="wa2-tips"></div>' +
    '<button class="wa2-dress" title="换装">👗</button>' +
    '<img class="wa2-chara" src="' + OUTFITS[0] + '" alt="Setsuna">';

  function wa2Tips(text) {
    var el = wa2.querySelector('.wa2-tips');
    el.textContent = text;
    el.classList.add('wa2-tips-active');
    clearTimeout(tipsTimer);
    tipsTimer = setTimeout(function () { el.classList.remove('wa2-tips-active'); }, 4000);
  }

  function initWa2() {
    document.body.appendChild(wa2);
    var img = wa2.querySelector('.wa2-chara');

    img.addEventListener('click', function () {
      wa2Tips(LINES[lineIdx]);
      lineIdx = (lineIdx + 1) % LINES.length;
    });

    wa2.querySelector('.wa2-dress').addEventListener('click', function (e) {
      e.stopPropagation();
      outfitIdx = (outfitIdx + 1) % OUTFITS.length;
      img.src = OUTFITS[outfitIdx];
      wa2Tips('この服、どうかな？');
    });

    // Preload remaining outfits after idle.
    setTimeout(function () {
      OUTFITS.slice(1).forEach(function (src) { (new Image()).src = src; });
    }, 4000);
  }

  /* ---------------- BGM (APlayer, fixed mini bar) ---------------- */

  function initBgm() {
    if (!window.APlayer) return;
    var host = document.createElement('div');
    host.id = 'bgm-player';
    document.body.appendChild(host);
    new window.APlayer({
      container: host,
      fixed: true,
      mini: true,
      loop: 'all',
      preload: 'none',
      volume: 0.6,
      mutex: true,
      audio: [{
        name: '届かない恋',
        artist: '上原れな',
        url: '/assets/audio/todokanai-koi.mp3',
        cover: '/assets/img/wa2/cover.jpg'
      }]
    });
  }

  function boot() {
    initWa2();
    initBgm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
