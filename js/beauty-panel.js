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
        var box = document.createElement('div');
        box.id = 'lemon-beauty-panel';
        box.style.cssText = 'position:fixed;right:18px;bottom:18px;z-index:10000;font-family:inherit;';

        var toggle = document.createElement('button');
        toggle.id = 'lemon-beauty-toggle';
        toggle.title = '美化设置';
        toggle.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>';
        toggle.style.cssText = 'width:44px;height:44px;border-radius:50%;border:none;background:var(--theme-color,#49B1F5);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.2);margin-left:auto;transition:transform .2s';
        box.appendChild(toggle);

        var panel = document.createElement('div');
        panel.id = 'lemon-beauty-card';
        panel.style.cssText = 'display:none;width:230px;margin-bottom:10px;padding:16px;border-radius:14px;background:rgba(255,255,255,.96);box-shadow:0 8px 30px rgba(0,0,0,.18);color:#333;font-size:13px;';
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
                toggle.style.background = c[0];
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
            var show = panel.style.display === 'none';
            panel.style.display = show ? 'block' : 'none';
            toggle.style.transform = show ? 'rotate(90deg)' : '';
        };

        box.insertBefore(panel, toggle);
        document.body.appendChild(box);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPanel);
    else buildPanel();
})();
