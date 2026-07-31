/*
 * White Album 2 corner widgets + BGM.
 * Default layout: Kazusa on the left, Setsuna on the right (both on screen).
 * The left slot toggles between Kazusa and the Live2D waifu (waifu.js):
 * Kazusa's switch button brings in the Live2D girl; closing her brings
 * Kazusa back. Desktop only.
 */
(function () {
  'use strict';

  if (window.matchMedia('(max-width: 767px)').matches) return;

  /* 12 numbered outfits per character (see assets/img/wa2/). */
  function outfitPaths(who) {
    var arr = [];
    for (var i = 1; i <= 12; i++) {
      arr.push('/assets/img/wa2/' + who + '-' + (i < 10 ? '0' : '') + i + '.png');
    }
    return arr;
  }

  /* Short character lines & ambient phrases — no song lyrics. */
  var CHARACTERS = {
    setsuna: {
      outfits: outfitPaths('setsuna'),
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
      outfits: outfitPaths('kazusa'),
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

  /* Sprite widget factory shared by both sides. */
  function makeWidget(id, charaKey, withSwitch, onSwitch) {
    var chara = CHARACTERS[charaKey];
    // Random outfit on every page load; the dress button cycles from there.
    var outfitIdx = Math.floor(Math.random() * chara.outfits.length);
    var lineIdx = 0;
    var tipsTimer = null;

    var el = document.createElement('div');
    el.id = id;
    el.className = 'wa2-box';
    el.innerHTML =
      '<div class="wa2-tips"></div>' +
      '<div class="wa2-tools">' +
        (withSwitch ? '<button class="wa2-switch" title="换成看板娘">⇄</button>' : '') +
        '<button class="wa2-dress" title="换装">👗</button>' +
      '</div>' +
      '<img class="wa2-chara" src="' + chara.outfits[outfitIdx] + '" alt="' + charaKey + '" draggable="false">';

    var img = el.querySelector('.wa2-chara');
    var tipsEl = el.querySelector('.wa2-tips');

    function tips(text) {
      tipsEl.textContent = text;
      tipsEl.classList.add('wa2-tips-active');
      clearTimeout(tipsTimer);
      tipsTimer = setTimeout(function () { tipsEl.classList.remove('wa2-tips-active'); }, 4000);
    }

    img.addEventListener('click', function () {
      tips(chara.lines[lineIdx % chara.lines.length]);
      lineIdx++;
    });

    el.querySelector('.wa2-dress').addEventListener('click', function (e) {
      e.stopPropagation();
      outfitIdx = (outfitIdx + 1) % chara.outfits.length;
      img.src = chara.outfits[outfitIdx];
      tips('この服、どうかな？');
    });

    if (withSwitch) {
      el.querySelector('.wa2-switch').addEventListener('click', function (e) {
        e.stopPropagation();
        onSwitch();
      });
    }

    document.body.appendChild(el);
    return {
      el: el,
      tips: tips,
      show: function () { el.style.display = ''; },
      hide: function () { el.style.display = 'none'; }
    };
  }

  var kazusaLeft, setsunaRight;

  function initWidgets() {
    // Right: Setsuna, always present.
    setsunaRight = makeWidget('wa2-widget', 'setsuna', false);

    // Left: Kazusa by default; her switch swaps in the Live2D waifu.
    kazusaLeft = makeWidget('wa2-widget-left', 'kazusa', true, function () {
      kazusaLeft.hide();
      if (window.waifuWidget) window.waifuWidget.show();
    });

    // waifu.js calls this when the Live2D girl is closed.
    window.wa2Left = {
      show: function () { kazusaLeft.show(); kazusaLeft.tips('……戻ったわよ。'); }
    };

    // Preload the other outfits after idle.
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
    /* Streamed via NetEase Music's outer-link API — only these versions
     * allow hotlinking. The official recordings (上原れな / 雪菜 Live
     * versions) forbid it and can only play from a locally hosted file
     * (drop it into assets/audio/, see the README there). */
    var playlist = [{
      name: '届かない恋 (冬马和纱 Ver.)',
      artist: '冬馬かずさ (生天目仁美)',
      url: 'https://music.163.com/song/media/outer/url?id=1834009426.mp3',
      cover: COVER
    }, {
      name: '届かない恋 (Piano Cover)',
      artist: '遥君',
      url: 'https://music.163.com/song/media/outer/url?id=1446912475.mp3',
      cover: COVER
    }];

    function start() {
      // Shuffle so a random track opens each visit; order stays random too.
      for (var i = playlist.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = playlist[i]; playlist[i] = playlist[j]; playlist[j] = tmp;
      }
      var ap = new window.APlayer({
        container: host,
        fixed: true,
        loop: 'all',
        order: 'random',
        preload: 'none',
        volume: 0.6,
        mutex: true,
        audio: playlist
      });
      // APlayer sizes the marquee title while the fixed bar is still
      // collapsed (width 0), leaving the song name blank until a track
      // switch — force one re-switch after init to render it.
      setTimeout(function () { ap.list.switch(0); }, 600);
    }

    fetch(LOCAL_MP3, { method: 'HEAD' }).then(function (res) {
      if (res.ok) {
        playlist.push({
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
    initWidgets();
    initBgm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
