(function () {
    'use strict';

    var KEY = 'lemon_beauty';
    var defaults = { color: '#49B1F5', opacity: 100, blur: 0, bg: '' };
    var cfg = {};
    try { cfg = Object.assign({}, defaults, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { cfg = Object.assign({}, defaults); }

    var colors = [
        ['#49B1F5', '蓝'], ['#FF9800', '橙'], ['#F47466', '红'],
        ['#4CAF50', '绿'], ['#9C27B0', '紫'], ['#FFB703', '柠檬黄']
    ];
    var bgs = [
        ['', '默认'],
        ['https://lemon-eggplant.github.io/img/sky-lonely-silence.jpg', '天空'],
        ['https://bing.img.run/1920x1080.php', '必应每日']
    ];

    function save() { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch (e) {} }

    function apply() {
        var style = document.getElementById('lemon-beauty-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'lemon-beauty-style';
            document.head.appendChild(style);
        }
        var a = cfg.opacity / 100;
        var alphaDark = cfg.opacity >= 100 ? '#191919' : 'rgba(25,25,25,' + a + ')';
        var alphaLight = cfg.opacity >= 100 ? '#ffffff' : 'rgba(255,255,255,' + a + ')';
        var blur = cfg.blur ? 'blur(' + cfg.blur + 'px)' : 'none';
        style.textContent =
            ':root{--theme-color:' + cfg.color + ';--trans-light:' + alphaLight + ';--trans-dark:' + alphaDark + '}' +
            '#article-container,.card-widget,#sidebar,.post-card{background:' + alphaLight + '}' +
            '[data-theme="dark"] #article-container,[data-theme="dark"] .card-widget,[data-theme="dark"] #sidebar{background:' + alphaDark + '}' +
            (cfg.blur ? '.card-widget,#sidebar{backdrop-filter:' + blur + ';-webkit-backdrop-filter:' + blur + '}' : '') +
            (cfg.bg ? 'body::before{content:"";position:fixed;inset:0;z-index:-1;background:url("' + cfg.bg + '") center/cover no-repeat fixed;opacity:.85}' : '');
    }
    apply();

    function buildPanel() {
        if (document.getElementById('lemon-beauty-toggle')) return;

        var toggle = document.createElement('button');
        toggle.id = 'lemon-beauty-toggle';
        toggle.type = 'button';
        toggle.title = '美化设置';
        toggle.innerHTML = '<span class="lemon-beauty-icon" aria-hidden="true"></span>';

        var panel = document.createElement('div');
        panel.id = 'lemon-beauty-card';
        panel.innerHTML =
            '<div style="font-weight:600;margin-bottom:12px;text-align:center">🎨 美化设置</div>' +
            '<div style="margin-bottom:12px"><div style="margin-bottom:6px;color:#666">主题色</div><div id="lemon-colors" style="display:flex;gap:8px;flex-wrap:wrap"></div></div>' +
            '<div style="margin-bottom:12px"><div style="margin-bottom:6px;color:#666">卡片不透明度：<span id="lemon-op-val">' + cfg.opacity + '%</span></div><input id="lemon-op" type="range" min="40" max="100" value="' + cfg.opacity + '" style="width:100%"></div>' +
            '<div style="margin-bottom:12px"><div style="margin-bottom:6px;color:#666">毛玻璃模糊：<span id="lemon-blur-val">' + cfg.blur + 'px</span></div><input id="lemon-blur" type="range" min="0" max="12" value="' + cfg.blur + '" style="width:100%"></div>' +
            '<div style="margin-bottom:8px"><div style="margin-bottom:6px;color:#666">背景</div><select id="lemon-bg" style="width:100%;padding:4px;border-radius:6px;border:1px solid #ddd"></select></div>' +
            '<button id="lemon-reset" style="width:100%;padding:7px;border:none;border-radius:8px;background:#f0f0f0;cursor:pointer;color:#555">恢复默认</button>';

        var colorWrap = panel.querySelector('#lemon-colors');
        colors.forEach(function (c) {
            var b = document.createElement('button');
            b.title = c[1];
            b.style.cssText = 'width:24px;height:24px;border-radius:50%;border:2px solid ' + (cfg.color === c[0] ? '#333' : 'transparent') + ';background:' + c[0] + ';cursor:pointer';
            b.onclick = function () {
                cfg.color = c[0]; save(); apply();
                colorWrap.querySelectorAll('button').forEach(function (x) { x.style.borderColor = 'transparent'; });
                b.style.borderColor = '#333';
            };
            colorWrap.appendChild(b);
        });

        var op = panel.querySelector('#lemon-op');
        var opVal = panel.querySelector('#lemon-op-val');
        op.oninput = function () {
            cfg.opacity = +op.value; opVal.textContent = cfg.opacity + '%'; save(); apply();
        };

        var blur = panel.querySelector('#lemon-blur');
        var blurVal = panel.querySelector('#lemon-blur-val');
        blur.oninput = function () {
            cfg.blur = +blur.value; blurVal.textContent = cfg.blur + 'px'; save(); apply();
        };

        var bgSel = panel.querySelector('#lemon-bg');
        bgs.forEach(function (b) {
            var o = document.createElement('option');
            o.value = b[0]; o.textContent = b[1];
            if (cfg.bg === b[0]) o.selected = true;
            bgSel.appendChild(o);
        });
        bgSel.onchange = function () { cfg.bg = bgSel.value; save(); apply(); };

        panel.querySelector('#lemon-reset').onclick = function () {
            cfg = Object.assign({}, defaults); save(); apply(); location.reload();
        };

        toggle.onclick = function () {
            var show = !panel.classList.contains('show');
            panel.classList.toggle('show', show);
            toggle.classList.toggle('active', show);
        };

        var menus = document.getElementById('menus');
        var searchButton = document.getElementById('search-button');
        var toggleMenu = document.getElementById('toggle-menu');
        if (menus) {
            if (searchButton) menus.insertBefore(toggle, searchButton);
            else if (toggleMenu) menus.insertBefore(toggle, toggleMenu);
            else menus.appendChild(toggle);
        } else {
            toggle.classList.add('fallback');
            document.body.appendChild(toggle);
        }
        document.body.appendChild(panel);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPanel);
    else buildPanel();
})();
