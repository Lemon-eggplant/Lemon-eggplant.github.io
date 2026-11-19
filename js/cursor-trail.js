(function () {
    'use strict';
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'cursor-trail-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;
    var particles = [];
    var mouse = { x: -100, y: -100 };
    var last = { x: -100, y: -100 };
    var colors = ['#FFD60A', '#FFC300', '#FFE66D', '#FFB703', '#FFD166'];

    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function spawn(x, y, n) {
        for (var i = 0; i < n; i++) {
            var a = Math.random() * Math.PI * 2;
            var s = Math.random() * 1.8;
            particles.push({
                x: x + (Math.random() - 0.5) * 8,
                y: y + (Math.random() - 0.5) * 8,
                vx: Math.cos(a) * s,
                vy: Math.sin(a) * s - 0.3,
                life: 1,
                decay: 0.018 + Math.random() * 0.02,
                size: 1.5 + Math.random() * 3,
                color: colors[(Math.random() * colors.length) | 0]
            });
        }
        if (particles.length > 220) particles.splice(0, particles.length - 220);
    }

    document.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        var dist = Math.hypot(mouse.x - last.x, mouse.y - last.y);
        if (dist > 4) {
            spawn(mouse.x, mouse.y, Math.min(4, Math.ceil(dist / 12)));
            last.x = mouse.x;
            last.y = mouse.y;
        }
    }, { passive: true });

    document.addEventListener('click', function (e) {
        spawn(e.clientX, e.clientY, 18);
    }, { passive: true });

    function loop() {
        ctx.clearRect(0, 0, w, h);
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.02;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.life -= p.decay;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            ctx.globalAlpha = p.life * 0.85;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
})();
