/*
 * White Album 2 corner widget (static sprite, breathing animation, quotes,
 * outfit switch) + background music via self-hosted APlayer.
 * Desktop only, same policy as the Live2D waifu.
 */
(function () {
  'use strict';

  if (window.matchMedia('(max-width: 767px)').matches) return;

  /* ---------------- Setsuna sprite widget ---------------- */

  /* Two heroines; short character lines & ambient phrases — no song lyrics. */
  var CHARACTERS = {
    setsuna: {
      name: 'Setsuna',
      greet: 'はーい、雪菜だよ☆',
      outfits: [
        '/assets/img/wa2/setsuna-winter.png',
        '/assets/img/wa2/setsuna-uniform.png',
        '/assets/img/wa2/setsuna-dress.png',
        '/assets/img/wa2/setsuna-yukata.png'
      ],
      lines: [
        '雪、降ってきたね。',
        '私、ずるいから。',
        'おかえりなさい。',
        '大好きだよ。',
        '三人で、また…',
        '届かない恋、か…',
        'コーヒー、淹れようか？'
      ]
    },
    kazusa: {
      name: 'Kazusa',
      greet: '……呼んだ？',
      outfits: [
        '/assets/img/wa2/kazusa-winter.png',
        '/assets/img/wa2/kazusa-uniform.png',
        '/assets/img/wa2/kazusa-dress.png',
        '/assets/img/wa2/kazusa-yukata.png'
      ],
      lines: [
        '……別に。',
        'バカ。',
        'ピアノ、聴いていく？',
        'なによ。',
        '……ありがと。',
        '雪の日は、嫌いじゃない。',
        '練習、邪魔しないで。'
      ]
    }
  };

  var charaKey = 'setsuna';
  var outfitIdx = 0;
  var lineIdx = 0;
  var tipsTimer = null;

  var wa2 = document.createElement('div');
  wa2.id = 'wa2-widget';
  wa2.innerHTML =
    '<div class="wa2-tips"></div>' +
    '<div class="wa2-tools">' +
      '<button class="wa2-switch" title="换人">⇄</button>' +
      '<button class="wa2-dress" title="换装">👗</button>' +
    '</div>' +
    '<img class="wa2-chara" src="' + CHARACTERS.setsuna.outfits[0] + '" alt="WA2 heroine">';

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

    function chara() { return CHARACTERS[charaKey]; }

    img.addEventListener('click', function () {
      wa2Tips(chara().lines[lineIdx % chara().lines.length]);
      lineIdx++;
    });

    wa2.querySelector('.wa2-dress').addEventListener('click', function (e) {
      e.stopPropagation();
      outfitIdx = (outfitIdx + 1) % chara().outfits.length;
      img.src = chara().outfits[outfitIdx];
      wa2Tips('この服、どうかな？');
    });

    wa2.querySelector('.wa2-switch').addEventListener('click', function (e) {
      e.stopPropagation();
      charaKey = charaKey === 'setsuna' ? 'kazusa' : 'setsuna';
      outfitIdx = 0;
      lineIdx = 0;
      img.src = chara().outfits[0];
      img.alt = chara().name;
      wa2Tips(chara().greet);
    });

    // Preload the other outfits and the other heroine after idle.
    setTimeout(function () {
      Object.keys(CHARACTERS).forEach(function (k) {
        CHARACTERS[k].outfits.forEach(function (src) { (new Image()).src = src; });
      });
    }, 4000);
  }

  /* ---------------- BGM (APlayer, fixed mini bar) ---------------- */

  function initBgm() {
    if (!window.APlayer) return;
    var host = document.createElement('div');
    host.id = 'bgm-player';
    document.body.appendChild(host);

    var COVER = '/assets/img/wa2/cover.jpg';
    var LOCAL_MP3 = '/assets/audio/todokanai-koi.mp3';
    /* Piano cover with an open outer link on NetEase Music; the original
     * song forbids hotlinking, so it only plays if a locally hosted file
     * exists (drop it into assets/audio/, see the README there). */
    var playlist = [{
      name: '届かない恋 (Piano Cover)',
      artist: '遥君',
      url: 'https://music.163.com/song/media/outer/url?id=1446912475.mp3',
      cover: COVER
    }];

    function start() {
      new window.APlayer({
        container: host,
        fixed: true,
        mini: true,
        loop: 'all',
        preload: 'none',
        volume: 0.6,
        mutex: true,
        audio: playlist
      });
    }

    fetch(LOCAL_MP3, { method: 'HEAD' }).then(function (res) {
      if (res.ok) {
        playlist.unshift({
          name: '届かない恋',
          artist: '上原れな',
          url: LOCAL_MP3,
          cover: COVER
        });
      }
      start();
    }).catch(start);
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
