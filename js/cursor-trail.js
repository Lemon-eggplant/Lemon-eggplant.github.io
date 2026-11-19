(function () {
    'use strict';
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var POINTER_SEL = 'a[href],button,summary,label,[onclick],[role=button],[role=link],input,select,textarea';

    var layer = document.createElement('div');
    layer.id = 'cursor-position';
    layer.style.cssText = 'position:fixed;left:0;top:0;width:16px;height:16px;pointer-events:none;z-index:10086;';

    var cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.className = 'hidden';
    cursor.style.cssText = 'position:absolute;left:0;top:0;width:16px;height:16px;border-radius:8px;opacity:0;pointer-events:none;transition:background .2s ease-in-out,opacity .2s ease-in-out,transform .2s ease-in-out;';
    layer.appendChild(cursor);
    document.body.appendChild(layer);

    var styleTag = document.createElement('style');
    styleTag.id = 'cursor-style';
    document.head.appendChild(styleTag);

    function getColor() {
        var c = getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim();
        return c || '#39c5bb';
    }

    var lastColor = '';
    function applyColor() {
        var c = getColor();
        if (c === lastColor) return;
        lastColor = c;
        cursor.style.background = c;
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8px" height="8px"><circle cx="4" cy="4" r="4" fill="' + c + '"/></svg>';
        styleTag.textContent = '* { cursor: url("data:image/svg+xml,' + encodeURIComponent(svg) + '") 4 4, auto !important; }';
    }
    applyColor();

    // 主题色变化时同步光晕和光标颜色
    if (window.MutationObserver) {
        new MutationObserver(applyColor).observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    }

    var curr = null;
    var prev = null;
    var raf = null;
    var target = null;

    function isPointer(el) {
        if (!el || el.nodeType !== 1) return false;
        try { return !!el.closest(POINTER_SEL); } catch (e) { return false; }
    }

    function setClass(name, on) {
        if (cursor.classList.contains(name) !== on) cursor.classList.toggle(name, on);
    }

    function start() {
        if (raf === null) raf = requestAnimationFrame(render);
    }

    function render() {
        raf = null;
        if (!curr) return;
        if (!prev) prev = { x: curr.x, y: curr.y };
        var dx = curr.x - prev.x;
        var dy = curr.y - prev.y;
        var moving = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1;
        prev.x = moving ? prev.x + dx * 0.15 : curr.x;
        prev.y = moving ? prev.y + dy * 0.15 : curr.y;
        layer.style.transform = 'translate3d(' + prev.x + 'px,' + prev.y + 'px,0)';
        setClass('hover', isPointer(target));
        if (moving) start();
    }

    document.addEventListener('mousemove', function (e) {
        curr = { x: e.clientX - 8, y: e.clientY - 8 };
        target = e.target;
        setClass('hidden', false);
        start();
    }, { passive: true });

    document.addEventListener('mouseover', function (e) {
        target = e.target;
        if (curr) start();
    }, { passive: true });

    document.addEventListener('mousedown', function () { setClass('active', true); });
    document.addEventListener('mouseup', function () { setClass('active', false); });
    document.addEventListener('mouseleave', function () { setClass('hidden', true); setClass('active', false); });
    window.addEventListener('blur', function () { setClass('hidden', true); setClass('active', false); });
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) { setClass('hidden', true); setClass('active', false); }
    });
    window.addEventListener('resize', function () { applyColor(); }, { passive: true });
    document.addEventListener('pjax:complete', function () { applyColor(); setClass('hidden', true); });
})();
