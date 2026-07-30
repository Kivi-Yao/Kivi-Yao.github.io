/*
 * Live2D waifu widget + cat-rope back-to-top, ported from the Aurora blog
 * (monstertail.github.io, theme by chanshiyu). Desktop only.
 * Requires /live2d/live2d.min.js (modified loader reading window.waifuModel).
 */
(function () {
  'use strict';

  if (window.matchMedia('(max-width: 767px)').matches) return;

  /* ---------------- Live2D model data (from the Aurora build) ---------------- */

  var MODEL_BASE = {
    version: '1.0.0',
    layout: { center_x: 0, center_y: -0.05, width: 2 },
    hit_areas_custom: {
      head_x: [-0.35, 0.6], head_y: [0.19, -0.2],
      body_x: [-0.3, -0.25], body_y: [0.3, -0.9]
    },
    textures: [],
    motions: {
      idle: [{ file: 'mtn/Breath1.mtn' }, { file: 'mtn/Breath2.mtn' }, { file: 'mtn/Breath3.mtn' },
             { file: 'mtn/Breath5.mtn' }, { file: 'mtn/Breath7.mtn' }, { file: 'mtn/Breath8.mtn' }],
      sleepy: [{ file: 'mtn/Sleeping.mtn' }],
      flick_head: [{ file: 'mtn/Touch Dere1.mtn' }, { file: 'mtn/Touch Dere2.mtn' },
                   { file: 'mtn/Touch Dere4.mtn' }, { file: 'mtn/Touch Dere6.mtn' }],
      tap_body: [{ file: 'mtn/Touch1.mtn' }, { file: 'mtn/Touch2.mtn' }, { file: 'mtn/Touch4.mtn' },
                 { file: 'mtn/Touch5.mtn' }, { file: 'mtn/Touch6.mtn' }]
    }
  };

  /* Self-hosted textures (the original hdslb.com CDN now blocks hotlinking).
   * Paths are resolved by the loader against the model home dir (/live2d/). */
  var TEXTURES = {
    pio: ['textures/pio-0.png', 'textures/pio-1.png', 'textures/pio-2.png', 'textures/pio-3.png'],
    tia: ['textures/tia-0.png', 'textures/tia-1.png', 'textures/tia-2.png', 'textures/tia-3.png']
  };

  var CLICK_LINES = [
    '是…是不小心碰到了吧',
    '萝莉控是什么呀',
    '你看到我的小熊了吗',
    '再摸的话我可要报警了！⌇●﹏●⌇',
    '110吗，这里有个变态一直在摸我(ó﹏ò｡)'
  ];

  var HOVER_TIPS = {
    switch: '想见见我的小伙伴嘛 (●\'◡\'●)',
    dressup: '要看看我的新衣服嘛 (●\'◡\'●)',
    takephoto: '要给我拍张照嘛 (d<ゝω・）☆',
    talk: '要听我讲故事么 ٩(๑•̀ω•́๑)۶',
    close: '到了说再见的时候了么 (｡ŏ_ŏ)'
  };

  var CLICK_TIPS = {
    dressup: '我的新衣服漂亮么 (●\'◡\'●)',
    takephoto: '我的照片要好好收藏哦 (<ゝω・）☆',
    close: '人生若只如初见，和你在一起的这段时间很开心 (▰˘◡˘▰)'
  };

  var HITOKOTOS = [
    { hitokoto: '我只是做了我能做的事，没有时间想将来。', from: '秒速五厘米' },
    { hitokoto: '就算是自私…我也希望那些人能够永远都有笑容…', from: '夏目友人帐' },
    { hitokoto: '我在时光斑驳深处，聆听到花开的声音。', from: '未闻花名' },
    { hitokoto: '不管是怎样的回忆，都是我们活过的人生。', from: 'angel beats' },
    { hitokoto: '你的那双手呢，是为了紧紧抓住什么而存在的哦。', from: '仰望半月的夜空' },
    { hitokoto: '即使从梦中醒来，还会有回忆留下。', from: 'AIR' },
    { hitokoto: '我们的心就像那天空一样，永不分离。', from: '缘之空' },
    { hitokoto: '时间是伟大的作家，总会写下完美的结局。', from: '秋之回忆' },
    { hitokoto: '正因为生来什么都没有，因此我们能拥有一切。', from: '游戏人生' },
    { hitokoto: '假如我们相遇，肯定一眼就能认出彼此', from: '你的名字' },
    { hitokoto: '即使你忘记了我，我也不会遗忘你。', from: 'Re：从零开始的异世界生活' },
    { hitokoto: '爱，其实很简单，困难的是去接受它。', from: '通灵王' },
    { hitokoto: '无论最终的结果是什么，只要这是自己选择的道路。', from: '龙与虎' },
    { hitokoto: '不论是过去还是未来，我都会保护你！', from: '旋风管家' }
  ];

  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  /* ---------------- Waifu widget ---------------- */

  var waifu = 'tia';
  var tipsTimer = null;
  var tipsLockedUntil = 0;

  var wrap = document.createElement('div');
  wrap.id = 'waifu-wrap';
  wrap.innerHTML =
    '<div class="waifu-tips"></div>' +
    '<canvas id="live2d" width="280" height="250"></canvas>' +
    '<div class="waifu-tool">' +
      '<button data-act="switch" title="换个小伙伴">♀</button>' +
      '<button data-act="dressup" title="换装">👗</button>' +
      '<button data-act="takephoto" title="拍照">📷</button>' +
      '<button data-act="talk" title="聊天">💬</button>' +
      '<button data-act="close" title="再见">✕</button>' +
    '</div>';

  var tipsEl, canvas;

  function showTips(text, force) {
    var now = Date.now();
    if (!force && now < tipsLockedUntil) return;
    tipsLockedUntil = now + 6000;
    tipsEl.innerHTML = text;
    tipsEl.classList.add('waifu-tips-active');
    clearTimeout(tipsTimer);
    tipsTimer = setTimeout(function () {
      tipsEl.classList.remove('waifu-tips-active');
    }, 5000);
  }

  function dressup(switchModel) {
    if (switchModel) waifu = waifu === 'tia' ? 'pio' : 'tia';
    var list = TEXTURES[waifu];
    var texture;
    while (!texture || texture === MODEL_BASE.textures[0]) {
      texture = list[rand(0, list.length - 1)];
    }
    MODEL_BASE.model = 'moc/' + waifu + '.moc';
    MODEL_BASE.textures = [texture];
    MODEL_BASE.layout.width = waifu === 'tia' ? 1.82 : 2;
    window.waifuModel = MODEL_BASE;
    window.loadlive2d('live2d', '/live2d/', '');
  }

  function loopTips() {
    setTimeout(loopTips, 16000);
    var line = HITOKOTOS[rand(0, HITOKOTOS.length - 1)];
    showTips(line.hitokoto + '<br><span class="waifu-tips-from">—— ' + line.from + '</span>');
  }

  function takephoto() {
    showTips(CLICK_TIPS.takephoto, true);
    // The loader exports the canvas inside its render loop on this flag.
    window.Live2D.captureName = 'waifu.png';
    window.Live2D.captureFrame = true;
  }

  function handleTool(act) {
    if (act === 'switch') {
      dressup(true);
    } else if (act === 'dressup') {
      dressup(false);
      showTips(CLICK_TIPS.dressup, true);
    } else if (act === 'takephoto') {
      takephoto();
    } else if (act === 'talk') {
      var line = HITOKOTOS[rand(0, HITOKOTOS.length - 1)];
      showTips(line.hitokoto + '<br><span class="waifu-tips-from">—— ' + line.from + '</span>', true);
    } else if (act === 'close') {
      showTips(CLICK_TIPS.close, true);
      setTimeout(function () {
        wrap.style.display = 'none';
        // Bring Kazusa (wa2.js) back into the left slot.
        if (window.wa2Left) window.wa2Left.show();
      }, 1600);
    }
  }

  /* Hidden by default — Kazusa (wa2.js) owns the left slot on load; her
   * switch button calls waifuWidget.show(). Model loads on first show. */
  var waifuLoaded = false;

  function initWaifu() {
    wrap.style.display = 'none';
    document.body.appendChild(wrap);
    tipsEl = wrap.querySelector('.waifu-tips');
    canvas = wrap.querySelector('#live2d');

    canvas.addEventListener('click', function () {
      showTips(CLICK_LINES[rand(0, CLICK_LINES.length - 1)], true);
    });

    wrap.querySelectorAll('.waifu-tool button').forEach(function (btn) {
      var act = btn.getAttribute('data-act');
      btn.addEventListener('mouseenter', function () { showTips(HOVER_TIPS[act]); });
      btn.addEventListener('click', function () { handleTool(act); });
    });

    window.waifuWidget = {
      show: function () {
        wrap.style.display = '';
        if (!waifuLoaded) {
          waifuLoaded = true;
          dressup(false);
          setTimeout(loopTips, 3000);
        }
      },
      hide: function () { wrap.style.display = 'none'; }
    };
  }

  /* ---------------- Cat-rope back-to-top ---------------- */

  var ROPE_H = 950;
  var rope = document.createElement('div');
  rope.id = 'cat-rope';
  rope.innerHTML = '<div class="cat-rope-inner" title="回到顶部"></div>';

  var lastScrollAt = 0;
  var lastScrollTimer = null;

  function handleRope() {
    var clientHeight = document.documentElement.clientHeight;
    var show = window.pageYOffset >= 200;
    // Hang the cat ~100px above the viewport bottom (clear of the mode toggle).
    var y = -ROPE_H + (show ? clientHeight - 100 : 0);
    rope.style.transform = 'translateY(' + y + 'px)';
  }

  function onScroll() {
    var now = Date.now();
    if (now - lastScrollAt <= 150) return;
    lastScrollAt = now;
    handleRope();
    clearTimeout(lastScrollTimer);
    lastScrollTimer = setTimeout(handleRope, 300);
  }

  function initRope() {
    document.body.appendChild(rope);
    rope.querySelector('.cat-rope-inner').addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    handleRope();
  }

  /* ---------------- boot ---------------- */

  function boot() {
    initRope();
    if (window.loadlive2d) initWaifu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
