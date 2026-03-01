const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["./browserAll-BudiI0f5.js", "./webworkerAll-CSp3_19_.js", "./colorToUniform-BmEsojv1.js", "./WebGPURenderer-WrUk9cmm.js", "./SharedSystems-DaFJN6Ic.js", "./WebGLRenderer-CUGkgL0u.js"]))) => i.map(i => d[i]);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        i(r);
    new MutationObserver(r => {
        for (const n of r)
            if (n.type === "childList")
                for (const o of n.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && i(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function e(r) {
        const n = {};
        return r.integrity && (n.integrity = r.integrity),
            r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
            r.crossOrigin === "use-credentials" ? n.credentials = "include" : r.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin",
            n
    }
    function i(r) {
        if (r.ep)
            return;
        r.ep = !0;
        const n = e(r);
        fetch(r.href, n)
    }
}
)();
const Da = "modulepreload"
    , za = function (s, t) {
        return new URL(s, t).href
    }
    , Sr = {}
    , Hs = function (t, e, i) {
        let r = Promise.resolve();
        if (e && e.length > 0) {
            let o = function (c) {
                return Promise.all(c.map(u => Promise.resolve(u).then(f => ({
                    status: "fulfilled",
                    value: f
                }), f => ({
                    status: "rejected",
                    reason: f
                }))))
            };
            const a = document.getElementsByTagName("link")
                , h = document.querySelector("meta[property=csp-nonce]")
                , l = (h == null ? void 0 : h.nonce) || (h == null ? void 0 : h.getAttribute("nonce"));
            r = o(e.map(c => {
                if (c = za(c, i),
                    c in Sr)
                    return;
                Sr[c] = !0;
                const u = c.endsWith(".css")
                    , f = u ? '[rel="stylesheet"]' : "";
                if (!!i)
                    for (let g = a.length - 1; g >= 0; g--) {
                        const p = a[g];
                        if (p.href === c && (!u || p.rel === "stylesheet"))
                            return
                    }
                else if (document.querySelector(`link[href="${c}"]${f}`))
                    return;
                const m = document.createElement("link");
                if (m.rel = u ? "stylesheet" : Da,
                    u || (m.as = "script"),
                    m.crossOrigin = "",
                    m.href = c,
                    l && m.setAttribute("nonce", l),
                    document.head.appendChild(m),
                    u)
                    return new Promise((g, p) => {
                        m.addEventListener("load", g),
                            m.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${c}`)))
                    }
                    )
            }
            ))
        }
        function n(o) {
            const a = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (a.payload = o,
                window.dispatchEvent(a),
                !a.defaultPrevented)
                throw o
        }
        return r.then(o => {
            for (const a of o || [])
                a.status === "rejected" && n(a.reason);
            return t().catch(n)
        }
        )
    };
var B = (s => (s.Application = "application",
    s.WebGLPipes = "webgl-pipes",
    s.WebGLPipesAdaptor = "webgl-pipes-adaptor",
    s.WebGLSystem = "webgl-system",
    s.WebGPUPipes = "webgpu-pipes",
    s.WebGPUPipesAdaptor = "webgpu-pipes-adaptor",
    s.WebGPUSystem = "webgpu-system",
    s.CanvasSystem = "canvas-system",
    s.CanvasPipesAdaptor = "canvas-pipes-adaptor",
    s.CanvasPipes = "canvas-pipes",
    s.Asset = "asset",
    s.LoadParser = "load-parser",
    s.ResolveParser = "resolve-parser",
    s.CacheParser = "cache-parser",
    s.DetectionParser = "detection-parser",
    s.MaskEffect = "mask-effect",
    s.BlendMode = "blend-mode",
    s.TextureSource = "texture-source",
    s.Environment = "environment",
    s.ShapeBuilder = "shape-builder",
    s.Batcher = "batcher",
    s))(B || {});
const Li = s => {
    if (typeof s == "function" || typeof s == "object" && s.extension) {
        if (!s.extension)
            throw new Error("Extension class must have an extension object");
        s = {
            ...typeof s.extension != "object" ? {
                type: s.extension
            } : s.extension,
            ref: s
        }
    }
    if (typeof s == "object")
        s = {
            ...s
        };
    else
        throw new Error("Invalid extension type");
    return typeof s.type == "string" && (s.type = [s.type]),
        s
}
    , Cs = (s, t) => Li(s).priority ?? t
    , lt = {
        _addHandlers: {},
        _removeHandlers: {},
        _queue: {},
        remove(...s) {
            return s.map(Li).forEach(t => {
                t.type.forEach(e => {
                    var i, r;
                    return (r = (i = this._removeHandlers)[e]) == null ? void 0 : r.call(i, t)
                }
                )
            }
            ),
                this
        },
        add(...s) {
            return s.map(Li).forEach(t => {
                t.type.forEach(e => {
                    var n, o;
                    const i = this._addHandlers
                        , r = this._queue;
                    i[e] ? (o = i[e]) == null || o.call(i, t) : (r[e] = r[e] || [],
                        (n = r[e]) == null || n.push(t))
                }
                )
            }
            ),
                this
        },
        handle(s, t, e) {
            var o;
            const i = this._addHandlers
                , r = this._removeHandlers;
            if (i[s] || r[s])
                throw new Error(`Extension type ${s} already has a handler`);
            i[s] = t,
                r[s] = e;
            const n = this._queue;
            return n[s] && ((o = n[s]) == null || o.forEach(a => t(a)),
                delete n[s]),
                this
        },
        handleByMap(s, t) {
            return this.handle(s, e => {
                e.name && (t[e.name] = e.ref)
            }
                , e => {
                    e.name && delete t[e.name]
                }
            )
        },
        handleByNamedList(s, t, e = -1) {
            return this.handle(s, i => {
                t.findIndex(n => n.name === i.name) >= 0 || (t.push({
                    name: i.name,
                    value: i.ref
                }),
                    t.sort((n, o) => Cs(o.value, e) - Cs(n.value, e)))
            }
                , i => {
                    const r = t.findIndex(n => n.name === i.name);
                    r !== -1 && t.splice(r, 1)
                }
            )
        },
        handleByList(s, t, e = -1) {
            return this.handle(s, i => {
                t.includes(i.ref) || (t.push(i.ref),
                    t.sort((r, n) => Cs(n, e) - Cs(r, e)))
            }
                , i => {
                    const r = t.indexOf(i.ref);
                    r !== -1 && t.splice(r, 1)
                }
            )
        },
        mixin(s, ...t) {
            for (const e of t)
                Object.defineProperties(s.prototype, Object.getOwnPropertyDescriptors(e))
        }
    }
    , Ha = {
        extension: {
            type: B.Environment,
            name: "browser",
            priority: -1
        },
        test: () => !0,
        load: async () => {
            await Hs(() => import("./browserAll-BudiI0f5.js"), __vite__mapDeps([0, 1, 2]), import.meta.url)
        }
    }
    , Na = {
        extension: {
            type: B.Environment,
            name: "webworker",
            priority: 0
        },
        test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
        load: async () => {
            await Hs(() => import("./webworkerAll-CSp3_19_.js"), __vite__mapDeps([1, 2]), import.meta.url)
        }
    };
class at {
    constructor(t, e, i) {
        this._x = e || 0,
            this._y = i || 0,
            this._observer = t
    }
    clone(t) {
        return new at(t ?? this._observer, this._x, this._y)
    }
    set(t = 0, e = t) {
        return (this._x !== t || this._y !== e) && (this._x = t,
            this._y = e,
            this._observer._onUpdate(this)),
            this
    }
    copyFrom(t) {
        return (this._x !== t.x || this._y !== t.y) && (this._x = t.x,
            this._y = t.y,
            this._observer._onUpdate(this)),
            this
    }
    copyTo(t) {
        return t.set(this._x, this._y),
            t
    }
    equals(t) {
        return t.x === this._x && t.y === this._y
    }
    toString() {
        return `[pixi.js/math:ObservablePoint x=${this._x} y=${this._y} scope=${this._observer}]`
    }
    get x() {
        return this._x
    }
    set x(t) {
        this._x !== t && (this._x = t,
            this._observer._onUpdate(this))
    }
    get y() {
        return this._y
    }
    set y(t) {
        this._y !== t && (this._y = t,
            this._observer._onUpdate(this))
    }
}
function Hn(s) {
    return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s
}
var li = {
    exports: {}
}, vr;
function Va() {
    return vr || (vr = 1,
        (function (s) {
            var t = Object.prototype.hasOwnProperty
                , e = "~";
            function i() { }
            Object.create && (i.prototype = Object.create(null),
                new i().__proto__ || (e = !1));
            function r(h, l, c) {
                this.fn = h,
                    this.context = l,
                    this.once = c || !1
            }
            function n(h, l, c, u, f) {
                if (typeof c != "function")
                    throw new TypeError("The listener must be a function");
                var d = new r(c, u || h, f)
                    , m = e ? e + l : l;
                return h._events[m] ? h._events[m].fn ? h._events[m] = [h._events[m], d] : h._events[m].push(d) : (h._events[m] = d,
                    h._eventsCount++),
                    h
            }
            function o(h, l) {
                --h._eventsCount === 0 ? h._events = new i : delete h._events[l]
            }
            function a() {
                this._events = new i,
                    this._eventsCount = 0
            }
            a.prototype.eventNames = function () {
                var l = [], c, u;
                if (this._eventsCount === 0)
                    return l;
                for (u in c = this._events)
                    t.call(c, u) && l.push(e ? u.slice(1) : u);
                return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l
            }
                ,
                a.prototype.listeners = function (l) {
                    var c = e ? e + l : l
                        , u = this._events[c];
                    if (!u)
                        return [];
                    if (u.fn)
                        return [u.fn];
                    for (var f = 0, d = u.length, m = new Array(d); f < d; f++)
                        m[f] = u[f].fn;
                    return m
                }
                ,
                a.prototype.listenerCount = function (l) {
                    var c = e ? e + l : l
                        , u = this._events[c];
                    return u ? u.fn ? 1 : u.length : 0
                }
                ,
                a.prototype.emit = function (l, c, u, f, d, m) {
                    var g = e ? e + l : l;
                    if (!this._events[g])
                        return !1;
                    var p = this._events[g], _ = arguments.length, x, y;
                    if (p.fn) {
                        switch (p.once && this.removeListener(l, p.fn, void 0, !0),
                        _) {
                            case 1:
                                return p.fn.call(p.context),
                                    !0;
                            case 2:
                                return p.fn.call(p.context, c),
                                    !0;
                            case 3:
                                return p.fn.call(p.context, c, u),
                                    !0;
                            case 4:
                                return p.fn.call(p.context, c, u, f),
                                    !0;
                            case 5:
                                return p.fn.call(p.context, c, u, f, d),
                                    !0;
                            case 6:
                                return p.fn.call(p.context, c, u, f, d, m),
                                    !0
                        }
                        for (y = 1,
                            x = new Array(_ - 1); y < _; y++)
                            x[y - 1] = arguments[y];
                        p.fn.apply(p.context, x)
                    } else {
                        var b = p.length, S;
                        for (y = 0; y < b; y++)
                            switch (p[y].once && this.removeListener(l, p[y].fn, void 0, !0),
                            _) {
                                case 1:
                                    p[y].fn.call(p[y].context);
                                    break;
                                case 2:
                                    p[y].fn.call(p[y].context, c);
                                    break;
                                case 3:
                                    p[y].fn.call(p[y].context, c, u);
                                    break;
                                case 4:
                                    p[y].fn.call(p[y].context, c, u, f);
                                    break;
                                default:
                                    if (!x)
                                        for (S = 1,
                                            x = new Array(_ - 1); S < _; S++)
                                            x[S - 1] = arguments[S];
                                    p[y].fn.apply(p[y].context, x)
                            }
                    }
                    return !0
                }
                ,
                a.prototype.on = function (l, c, u) {
                    return n(this, l, c, u, !1)
                }
                ,
                a.prototype.once = function (l, c, u) {
                    return n(this, l, c, u, !0)
                }
                ,
                a.prototype.removeListener = function (l, c, u, f) {
                    var d = e ? e + l : l;
                    if (!this._events[d])
                        return this;
                    if (!c)
                        return o(this, d),
                            this;
                    var m = this._events[d];
                    if (m.fn)
                        m.fn === c && (!f || m.once) && (!u || m.context === u) && o(this, d);
                    else {
                        for (var g = 0, p = [], _ = m.length; g < _; g++)
                            (m[g].fn !== c || f && !m[g].once || u && m[g].context !== u) && p.push(m[g]);
                        p.length ? this._events[d] = p.length === 1 ? p[0] : p : o(this, d)
                    }
                    return this
                }
                ,
                a.prototype.removeAllListeners = function (l) {
                    var c;
                    return l ? (c = e ? e + l : l,
                        this._events[c] && o(this, c)) : (this._events = new i,
                            this._eventsCount = 0),
                        this
                }
                ,
                a.prototype.off = a.prototype.removeListener,
                a.prototype.addListener = a.prototype.on,
                a.prefixed = e,
                a.EventEmitter = a,
                s.exports = a
        }
        )(li)),
        li.exports
}
var $a = Va();
const mt = Hn($a)
    , Ya = Math.PI * 2
    , Xa = 180 / Math.PI
    , ja = Math.PI / 180;
class pt {
    constructor(t = 0, e = 0) {
        this.x = 0,
            this.y = 0,
            this.x = t,
            this.y = e
    }
    clone() {
        return new pt(this.x, this.y)
    }
    copyFrom(t) {
        return this.set(t.x, t.y),
            this
    }
    copyTo(t) {
        return t.set(this.x, this.y),
            t
    }
    equals(t) {
        return t.x === this.x && t.y === this.y
    }
    set(t = 0, e = t) {
        return this.x = t,
            this.y = e,
            this
    }
    toString() {
        return `[pixi.js/math:Point x=${this.x} y=${this.y}]`
    }
    static get shared() {
        return ci.x = 0,
            ci.y = 0,
            ci
    }
}
const ci = new pt;
class D {
    constructor(t = 1, e = 0, i = 0, r = 1, n = 0, o = 0) {
        this.array = null,
            this.a = t,
            this.b = e,
            this.c = i,
            this.d = r,
            this.tx = n,
            this.ty = o
    }
    fromArray(t) {
        this.a = t[0],
            this.b = t[1],
            this.c = t[3],
            this.d = t[4],
            this.tx = t[2],
            this.ty = t[5]
    }
    set(t, e, i, r, n, o) {
        return this.a = t,
            this.b = e,
            this.c = i,
            this.d = r,
            this.tx = n,
            this.ty = o,
            this
    }
    toArray(t, e) {
        this.array || (this.array = new Float32Array(9));
        const i = e || this.array;
        return t ? (i[0] = this.a,
            i[1] = this.b,
            i[2] = 0,
            i[3] = this.c,
            i[4] = this.d,
            i[5] = 0,
            i[6] = this.tx,
            i[7] = this.ty,
            i[8] = 1) : (i[0] = this.a,
                i[1] = this.c,
                i[2] = this.tx,
                i[3] = this.b,
                i[4] = this.d,
                i[5] = this.ty,
                i[6] = 0,
                i[7] = 0,
                i[8] = 1),
            i
    }
    apply(t, e) {
        e = e || new pt;
        const i = t.x
            , r = t.y;
        return e.x = this.a * i + this.c * r + this.tx,
            e.y = this.b * i + this.d * r + this.ty,
            e
    }
    applyInverse(t, e) {
        e = e || new pt;
        const i = this.a
            , r = this.b
            , n = this.c
            , o = this.d
            , a = this.tx
            , h = this.ty
            , l = 1 / (i * o + n * -r)
            , c = t.x
            , u = t.y;
        return e.x = o * l * c + -n * l * u + (h * n - a * o) * l,
            e.y = i * l * u + -r * l * c + (-h * i + a * r) * l,
            e
    }
    translate(t, e) {
        return this.tx += t,
            this.ty += e,
            this
    }
    scale(t, e) {
        return this.a *= t,
            this.d *= e,
            this.c *= t,
            this.b *= e,
            this.tx *= t,
            this.ty *= e,
            this
    }
    rotate(t) {
        const e = Math.cos(t)
            , i = Math.sin(t)
            , r = this.a
            , n = this.c
            , o = this.tx;
        return this.a = r * e - this.b * i,
            this.b = r * i + this.b * e,
            this.c = n * e - this.d * i,
            this.d = n * i + this.d * e,
            this.tx = o * e - this.ty * i,
            this.ty = o * i + this.ty * e,
            this
    }
    append(t) {
        const e = this.a
            , i = this.b
            , r = this.c
            , n = this.d;
        return this.a = t.a * e + t.b * r,
            this.b = t.a * i + t.b * n,
            this.c = t.c * e + t.d * r,
            this.d = t.c * i + t.d * n,
            this.tx = t.tx * e + t.ty * r + this.tx,
            this.ty = t.tx * i + t.ty * n + this.ty,
            this
    }
    appendFrom(t, e) {
        const i = t.a
            , r = t.b
            , n = t.c
            , o = t.d
            , a = t.tx
            , h = t.ty
            , l = e.a
            , c = e.b
            , u = e.c
            , f = e.d;
        return this.a = i * l + r * u,
            this.b = i * c + r * f,
            this.c = n * l + o * u,
            this.d = n * c + o * f,
            this.tx = a * l + h * u + e.tx,
            this.ty = a * c + h * f + e.ty,
            this
    }
    setTransform(t, e, i, r, n, o, a, h, l) {
        return this.a = Math.cos(a + l) * n,
            this.b = Math.sin(a + l) * n,
            this.c = -Math.sin(a - h) * o,
            this.d = Math.cos(a - h) * o,
            this.tx = t - (i * this.a + r * this.c),
            this.ty = e - (i * this.b + r * this.d),
            this
    }
    prepend(t) {
        const e = this.tx;
        if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
            const i = this.a
                , r = this.c;
            this.a = i * t.a + this.b * t.c,
                this.b = i * t.b + this.b * t.d,
                this.c = r * t.a + this.d * t.c,
                this.d = r * t.b + this.d * t.d
        }
        return this.tx = e * t.a + this.ty * t.c + t.tx,
            this.ty = e * t.b + this.ty * t.d + t.ty,
            this
    }
    decompose(t) {
        const e = this.a
            , i = this.b
            , r = this.c
            , n = this.d
            , o = t.pivot
            , a = -Math.atan2(-r, n)
            , h = Math.atan2(i, e)
            , l = Math.abs(a + h);
        return l < 1e-5 || Math.abs(Ya - l) < 1e-5 ? (t.rotation = h,
            t.skew.x = t.skew.y = 0) : (t.rotation = 0,
                t.skew.x = a,
                t.skew.y = h),
            t.scale.x = Math.sqrt(e * e + i * i),
            t.scale.y = Math.sqrt(r * r + n * n),
            t.position.x = this.tx + (o.x * e + o.y * r),
            t.position.y = this.ty + (o.x * i + o.y * n),
            t
    }
    invert() {
        const t = this.a
            , e = this.b
            , i = this.c
            , r = this.d
            , n = this.tx
            , o = t * r - e * i;
        return this.a = r / o,
            this.b = -e / o,
            this.c = -i / o,
            this.d = t / o,
            this.tx = (i * this.ty - r * n) / o,
            this.ty = -(t * this.ty - e * n) / o,
            this
    }
    isIdentity() {
        return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0
    }
    identity() {
        return this.a = 1,
            this.b = 0,
            this.c = 0,
            this.d = 1,
            this.tx = 0,
            this.ty = 0,
            this
    }
    clone() {
        const t = new D;
        return t.a = this.a,
            t.b = this.b,
            t.c = this.c,
            t.d = this.d,
            t.tx = this.tx,
            t.ty = this.ty,
            t
    }
    copyTo(t) {
        return t.a = this.a,
            t.b = this.b,
            t.c = this.c,
            t.d = this.d,
            t.tx = this.tx,
            t.ty = this.ty,
            t
    }
    copyFrom(t) {
        return this.a = t.a,
            this.b = t.b,
            this.c = t.c,
            this.d = t.d,
            this.tx = t.tx,
            this.ty = t.ty,
            this
    }
    equals(t) {
        return t.a === this.a && t.b === this.b && t.c === this.c && t.d === this.d && t.tx === this.tx && t.ty === this.ty
    }
    toString() {
        return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`
    }
    static get IDENTITY() {
        return Ka.identity()
    }
    static get shared() {
        return qa.identity()
    }
}
const qa = new D
    , Ka = new D
    , ue = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1]
    , de = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1]
    , fe = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1]
    , pe = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1]
    , Gi = []
    , Nn = []
    , Ps = Math.sign;
function Za() {
    for (let s = 0; s < 16; s++) {
        const t = [];
        Gi.push(t);
        for (let e = 0; e < 16; e++) {
            const i = Ps(ue[s] * ue[e] + fe[s] * de[e])
                , r = Ps(de[s] * ue[e] + pe[s] * de[e])
                , n = Ps(ue[s] * fe[e] + fe[s] * pe[e])
                , o = Ps(de[s] * fe[e] + pe[s] * pe[e]);
            for (let a = 0; a < 16; a++)
                if (ue[a] === i && de[a] === r && fe[a] === n && pe[a] === o) {
                    t.push(a);
                    break
                }
        }
    }
    for (let s = 0; s < 16; s++) {
        const t = new D;
        t.set(ue[s], de[s], fe[s], pe[s], 0, 0),
            Nn.push(t)
    }
}
Za();
const Y = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
    MIRROR_VERTICAL: 8,
    MAIN_DIAGONAL: 10,
    MIRROR_HORIZONTAL: 12,
    REVERSE_DIAGONAL: 14,
    uX: s => ue[s],
    uY: s => de[s],
    vX: s => fe[s],
    vY: s => pe[s],
    inv: s => s & 8 ? s & 15 : -s & 7,
    add: (s, t) => Gi[s][t],
    sub: (s, t) => Gi[s][Y.inv(t)],
    rotate180: s => s ^ 4,
    isVertical: s => (s & 3) === 2,
    byDirection: (s, t) => Math.abs(s) * 2 <= Math.abs(t) ? t >= 0 ? Y.S : Y.N : Math.abs(t) * 2 <= Math.abs(s) ? s > 0 ? Y.E : Y.W : t > 0 ? s > 0 ? Y.SE : Y.SW : s > 0 ? Y.NE : Y.NW,
    matrixAppendRotationInv: (s, t, e = 0, i = 0) => {
        const r = Nn[Y.inv(t)];
        r.tx = e,
            r.ty = i,
            s.append(r)
    }
    ,
    transformRectCoords: (s, t, e, i) => {
        const { x: r, y: n, width: o, height: a } = s
            , { x: h, y: l, width: c, height: u } = t;
        return e === Y.E ? (i.set(r + h, n + l, o, a),
            i) : e === Y.S ? i.set(c - n - a + h, r + l, a, o) : e === Y.W ? i.set(c - r - o + h, u - n - a + l, o, a) : e === Y.N ? i.set(n + h, u - r - o + l, a, o) : i.set(r + h, n + l, o, a)
    }
}
    , Ts = [new pt, new pt, new pt, new pt];
class K {
    constructor(t = 0, e = 0, i = 0, r = 0) {
        this.type = "rectangle",
            this.x = Number(t),
            this.y = Number(e),
            this.width = Number(i),
            this.height = Number(r)
    }
    get left() {
        return this.x
    }
    get right() {
        return this.x + this.width
    }
    get top() {
        return this.y
    }
    get bottom() {
        return this.y + this.height
    }
    isEmpty() {
        return this.left === this.right || this.top === this.bottom
    }
    static get EMPTY() {
        return new K(0, 0, 0, 0)
    }
    clone() {
        return new K(this.x, this.y, this.width, this.height)
    }
    copyFromBounds(t) {
        return this.x = t.minX,
            this.y = t.minY,
            this.width = t.maxX - t.minX,
            this.height = t.maxY - t.minY,
            this
    }
    copyFrom(t) {
        return this.x = t.x,
            this.y = t.y,
            this.width = t.width,
            this.height = t.height,
            this
    }
    copyTo(t) {
        return t.copyFrom(this),
            t
    }
    contains(t, e) {
        return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
    }
    strokeContains(t, e, i, r = .5) {
        const { width: n, height: o } = this;
        if (n <= 0 || o <= 0)
            return !1;
        const a = this.x
            , h = this.y
            , l = i * (1 - r)
            , c = i - l
            , u = a - l
            , f = a + n + l
            , d = h - l
            , m = h + o + l
            , g = a + c
            , p = a + n - c
            , _ = h + c
            , x = h + o - c;
        return t >= u && t <= f && e >= d && e <= m && !(t > g && t < p && e > _ && e < x)
    }
    intersects(t, e) {
        if (!e) {
            const L = this.x < t.x ? t.x : this.x;
            if ((this.right > t.right ? t.right : this.right) <= L)
                return !1;
            const C = this.y < t.y ? t.y : this.y;
            return (this.bottom > t.bottom ? t.bottom : this.bottom) > C
        }
        const i = this.left
            , r = this.right
            , n = this.top
            , o = this.bottom;
        if (r <= i || o <= n)
            return !1;
        const a = Ts[0].set(t.left, t.top)
            , h = Ts[1].set(t.left, t.bottom)
            , l = Ts[2].set(t.right, t.top)
            , c = Ts[3].set(t.right, t.bottom);
        if (l.x <= a.x || h.y <= a.y)
            return !1;
        const u = Math.sign(e.a * e.d - e.b * e.c);
        if (u === 0 || (e.apply(a, a),
            e.apply(h, h),
            e.apply(l, l),
            e.apply(c, c),
            Math.max(a.x, h.x, l.x, c.x) <= i || Math.min(a.x, h.x, l.x, c.x) >= r || Math.max(a.y, h.y, l.y, c.y) <= n || Math.min(a.y, h.y, l.y, c.y) >= o))
            return !1;
        const f = u * (h.y - a.y)
            , d = u * (a.x - h.x)
            , m = f * i + d * n
            , g = f * r + d * n
            , p = f * i + d * o
            , _ = f * r + d * o;
        if (Math.max(m, g, p, _) <= f * a.x + d * a.y || Math.min(m, g, p, _) >= f * c.x + d * c.y)
            return !1;
        const x = u * (a.y - l.y)
            , y = u * (l.x - a.x)
            , b = x * i + y * n
            , S = x * r + y * n
            , A = x * i + y * o
            , w = x * r + y * o;
        return !(Math.max(b, S, A, w) <= x * a.x + y * a.y || Math.min(b, S, A, w) >= x * c.x + y * c.y)
    }
    pad(t = 0, e = t) {
        return this.x -= t,
            this.y -= e,
            this.width += t * 2,
            this.height += e * 2,
            this
    }
    fit(t) {
        const e = Math.max(this.x, t.x)
            , i = Math.min(this.x + this.width, t.x + t.width)
            , r = Math.max(this.y, t.y)
            , n = Math.min(this.y + this.height, t.y + t.height);
        return this.x = e,
            this.width = Math.max(i - e, 0),
            this.y = r,
            this.height = Math.max(n - r, 0),
            this
    }
    ceil(t = 1, e = .001) {
        const i = Math.ceil((this.x + this.width - e) * t) / t
            , r = Math.ceil((this.y + this.height - e) * t) / t;
        return this.x = Math.floor((this.x + e) * t) / t,
            this.y = Math.floor((this.y + e) * t) / t,
            this.width = i - this.x,
            this.height = r - this.y,
            this
    }
    scale(t, e = t) {
        return this.x *= t,
            this.y *= e,
            this.width *= t,
            this.height *= e,
            this
    }
    enlarge(t) {
        const e = Math.min(this.x, t.x)
            , i = Math.max(this.x + this.width, t.x + t.width)
            , r = Math.min(this.y, t.y)
            , n = Math.max(this.y + this.height, t.y + t.height);
        return this.x = e,
            this.width = i - e,
            this.y = r,
            this.height = n - r,
            this
    }
    getBounds(t) {
        return t || (t = new K),
            t.copyFrom(this),
            t
    }
    containsRect(t) {
        if (this.width <= 0 || this.height <= 0)
            return !1;
        const e = t.x
            , i = t.y
            , r = t.x + t.width
            , n = t.y + t.height;
        return e >= this.x && e < this.x + this.width && i >= this.y && i < this.y + this.height && r >= this.x && r < this.x + this.width && n >= this.y && n < this.y + this.height
    }
    set(t, e, i, r) {
        return this.x = t,
            this.y = e,
            this.width = i,
            this.height = r,
            this
    }
    toString() {
        return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`
    }
}
const ui = {
    default: -1
};
function tt(s = "default") {
    return ui[s] === void 0 && (ui[s] = -1),
        ++ui[s]
}
const Cr = new Set
    , V = "8.0.0"
    , Qa = "8.3.4"
    , Me = {
        quiet: !1,
        noColor: !1
    }
    , U = (s, t, e = 3) => {
        if (Me.quiet || Cr.has(t))
            return;
        let i = new Error().stack;
        const r = `${t}
Deprecated since v${s}`
            , n = typeof console.groupCollapsed == "function" && !Me.noColor;
        typeof i > "u" ? console.warn("PixiJS Deprecation Warning: ", r) : (i = i.split(`
`).splice(e).join(`
`),
            n ? (console.groupCollapsed("%cPixiJS Deprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", r),
                console.warn(i),
                console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", r),
                    console.warn(i))),
            Cr.add(t)
    }
    ;
Object.defineProperties(U, {
    quiet: {
        get: () => Me.quiet,
        set: s => {
            Me.quiet = s
        }
        ,
        enumerable: !0,
        configurable: !1
    },
    noColor: {
        get: () => Me.noColor,
        set: s => {
            Me.noColor = s
        }
        ,
        enumerable: !0,
        configurable: !1
    }
});
const Vn = () => { }
    ;
function Ie(s) {
    return s += s === 0 ? 1 : 0,
        --s,
        s |= s >>> 1,
        s |= s >>> 2,
        s |= s >>> 4,
        s |= s >>> 8,
        s |= s >>> 16,
        s + 1
}
function Pr(s) {
    return !(s & s - 1) && !!s
}
function $n(s) {
    const t = {};
    for (const e in s)
        s[e] !== void 0 && (t[e] = s[e]);
    return t
}
const Tr = Object.create(null);
function Ja(s) {
    const t = Tr[s];
    return t === void 0 && (Tr[s] = tt("resource")),
        t
}
const Yn = class Xn extends mt {
    constructor(t = {}) {
        super(),
            this._resourceType = "textureSampler",
            this._touched = 0,
            this._maxAnisotropy = 1,
            this.destroyed = !1,
            t = {
                ...Xn.defaultOptions,
                ...t
            },
            this.addressMode = t.addressMode,
            this.addressModeU = t.addressModeU ?? this.addressModeU,
            this.addressModeV = t.addressModeV ?? this.addressModeV,
            this.addressModeW = t.addressModeW ?? this.addressModeW,
            this.scaleMode = t.scaleMode,
            this.magFilter = t.magFilter ?? this.magFilter,
            this.minFilter = t.minFilter ?? this.minFilter,
            this.mipmapFilter = t.mipmapFilter ?? this.mipmapFilter,
            this.lodMinClamp = t.lodMinClamp,
            this.lodMaxClamp = t.lodMaxClamp,
            this.compare = t.compare,
            this.maxAnisotropy = t.maxAnisotropy ?? 1
    }
    set addressMode(t) {
        this.addressModeU = t,
            this.addressModeV = t,
            this.addressModeW = t
    }
    get addressMode() {
        return this.addressModeU
    }
    set wrapMode(t) {
        U(V, "TextureStyle.wrapMode is now TextureStyle.addressMode"),
            this.addressMode = t
    }
    get wrapMode() {
        return this.addressMode
    }
    set scaleMode(t) {
        this.magFilter = t,
            this.minFilter = t,
            this.mipmapFilter = t
    }
    get scaleMode() {
        return this.magFilter
    }
    set maxAnisotropy(t) {
        this._maxAnisotropy = Math.min(t, 16),
            this._maxAnisotropy > 1 && (this.scaleMode = "linear")
    }
    get maxAnisotropy() {
        return this._maxAnisotropy
    }
    get _resourceId() {
        return this._sharedResourceId || this._generateResourceId()
    }
    update() {
        this._sharedResourceId = null,
            this.emit("change", this)
    }
    _generateResourceId() {
        const t = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
        return this._sharedResourceId = Ja(t),
            this._resourceId
    }
    destroy() {
        this.destroyed = !0,
            this.emit("destroy", this),
            this.emit("change", this),
            this.removeAllListeners()
    }
}
    ;
Yn.defaultOptions = {
    addressMode: "clamp-to-edge",
    scaleMode: "linear"
};
let Be = Yn;
const jn = class qn extends mt {
    constructor(t = {}) {
        super(),
            this.options = t,
            this._gpuData = Object.create(null),
            this._gcLastUsed = -1,
            this.uid = tt("textureSource"),
            this._resourceType = "textureSource",
            this._resourceId = tt("resource"),
            this.uploadMethodId = "unknown",
            this._resolution = 1,
            this.pixelWidth = 1,
            this.pixelHeight = 1,
            this.width = 1,
            this.height = 1,
            this.sampleCount = 1,
            this.mipLevelCount = 1,
            this.autoGenerateMipmaps = !1,
            this.format = "rgba8unorm",
            this.dimension = "2d",
            this.antialias = !1,
            this._touched = 0,
            this._batchTick = -1,
            this._textureBindLocation = -1,
            t = {
                ...qn.defaultOptions,
                ...t
            },
            this.label = t.label ?? "",
            this.resource = t.resource,
            this.autoGarbageCollect = t.autoGarbageCollect,
            this._resolution = t.resolution,
            t.width ? this.pixelWidth = t.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1,
            t.height ? this.pixelHeight = t.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1,
            this.width = this.pixelWidth / this._resolution,
            this.height = this.pixelHeight / this._resolution,
            this.format = t.format,
            this.dimension = t.dimensions,
            this.mipLevelCount = t.mipLevelCount,
            this.autoGenerateMipmaps = t.autoGenerateMipmaps,
            this.sampleCount = t.sampleCount,
            this.antialias = t.antialias,
            this.alphaMode = t.alphaMode,
            this.style = new Be($n(t)),
            this.destroyed = !1,
            this._refreshPOT()
    }
    get source() {
        return this
    }
    get style() {
        return this._style
    }
    set style(t) {
        var e, i;
        this.style !== t && ((e = this._style) == null || e.off("change", this._onStyleChange, this),
            this._style = t,
            (i = this._style) == null || i.on("change", this._onStyleChange, this),
            this._onStyleChange())
    }
    set maxAnisotropy(t) {
        this._style.maxAnisotropy = t
    }
    get maxAnisotropy() {
        return this._style.maxAnisotropy
    }
    get addressMode() {
        return this._style.addressMode
    }
    set addressMode(t) {
        this._style.addressMode = t
    }
    get repeatMode() {
        return this._style.addressMode
    }
    set repeatMode(t) {
        this._style.addressMode = t
    }
    get magFilter() {
        return this._style.magFilter
    }
    set magFilter(t) {
        this._style.magFilter = t
    }
    get minFilter() {
        return this._style.minFilter
    }
    set minFilter(t) {
        this._style.minFilter = t
    }
    get mipmapFilter() {
        return this._style.mipmapFilter
    }
    set mipmapFilter(t) {
        this._style.mipmapFilter = t
    }
    get lodMinClamp() {
        return this._style.lodMinClamp
    }
    set lodMinClamp(t) {
        this._style.lodMinClamp = t
    }
    get lodMaxClamp() {
        return this._style.lodMaxClamp
    }
    set lodMaxClamp(t) {
        this._style.lodMaxClamp = t
    }
    _onStyleChange() {
        this.emit("styleChange", this)
    }
    update() {
        if (this.resource) {
            const t = this._resolution;
            if (this.resize(this.resourceWidth / t, this.resourceHeight / t))
                return
        }
        this.emit("update", this)
    }
    destroy() {
        this.destroyed = !0,
            this.unload(),
            this.emit("destroy", this),
            this._style && (this._style.destroy(),
                this._style = null),
            this.uploadMethodId = null,
            this.resource = null,
            this.removeAllListeners()
    }
    unload() {
        var t, e;
        this._resourceId = tt("resource"),
            this.emit("change", this),
            this.emit("unload", this);
        for (const i in this._gpuData)
            (e = (t = this._gpuData[i]) == null ? void 0 : t.destroy) == null || e.call(t);
        this._gpuData = Object.create(null)
    }
    get resourceWidth() {
        const { resource: t } = this;
        return t.naturalWidth || t.videoWidth || t.displayWidth || t.width
    }
    get resourceHeight() {
        const { resource: t } = this;
        return t.naturalHeight || t.videoHeight || t.displayHeight || t.height
    }
    get resolution() {
        return this._resolution
    }
    set resolution(t) {
        this._resolution !== t && (this._resolution = t,
            this.width = this.pixelWidth / t,
            this.height = this.pixelHeight / t)
    }
    resize(t, e, i) {
        i || (i = this._resolution),
            t || (t = this.width),
            e || (e = this.height);
        const r = Math.round(t * i)
            , n = Math.round(e * i);
        return this.width = r / i,
            this.height = n / i,
            this._resolution = i,
            this.pixelWidth === r && this.pixelHeight === n ? !1 : (this._refreshPOT(),
                this.pixelWidth = r,
                this.pixelHeight = n,
                this.emit("resize", this),
                this._resourceId = tt("resource"),
                this.emit("change", this),
                !0)
    }
    updateMipmaps() {
        this.autoGenerateMipmaps && this.mipLevelCount > 1 && this.emit("updateMipmaps", this)
    }
    set wrapMode(t) {
        this._style.wrapMode = t
    }
    get wrapMode() {
        return this._style.wrapMode
    }
    set scaleMode(t) {
        this._style.scaleMode = t
    }
    get scaleMode() {
        return this._style.scaleMode
    }
    _refreshPOT() {
        this.isPowerOfTwo = Pr(this.pixelWidth) && Pr(this.pixelHeight)
    }
    static test(t) {
        throw new Error("Unimplemented")
    }
}
    ;
jn.defaultOptions = {
    resolution: 1,
    format: "bgra8unorm",
    alphaMode: "premultiply-alpha-on-upload",
    dimensions: "2d",
    mipLevelCount: 1,
    autoGenerateMipmaps: !1,
    sampleCount: 1,
    antialias: !1,
    autoGarbageCollect: !1
};
let Rt = jn;
class sr extends Rt {
    constructor(t) {
        const e = t.resource || new Float32Array(t.width * t.height * 4);
        let i = t.format;
        i || (e instanceof Float32Array ? i = "rgba32float" : e instanceof Int32Array || e instanceof Uint32Array ? i = "rgba32uint" : e instanceof Int16Array || e instanceof Uint16Array ? i = "rgba16uint" : (e instanceof Int8Array,
            i = "bgra8unorm")),
            super({
                ...t,
                resource: e,
                format: i
            }),
            this.uploadMethodId = "buffer"
    }
    static test(t) {
        return t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array
    }
}
sr.extension = B.TextureSource;
const Mr = new D;
class th {
    constructor(t, e) {
        this.mapCoord = new D,
            this.uClampFrame = new Float32Array(4),
            this.uClampOffset = new Float32Array(2),
            this._textureID = -1,
            this._updateID = 0,
            this.clampOffset = 0,
            typeof e > "u" ? this.clampMargin = t.width < 10 ? 0 : .5 : this.clampMargin = e,
            this.isSimple = !1,
            this.texture = t
    }
    get texture() {
        return this._texture
    }
    set texture(t) {
        var e;
        this.texture !== t && ((e = this._texture) == null || e.removeListener("update", this.update, this),
            this._texture = t,
            this._texture.addListener("update", this.update, this),
            this.update())
    }
    multiplyUvs(t, e) {
        e === void 0 && (e = t);
        const i = this.mapCoord;
        for (let r = 0; r < t.length; r += 2) {
            const n = t[r]
                , o = t[r + 1];
            e[r] = n * i.a + o * i.c + i.tx,
                e[r + 1] = n * i.b + o * i.d + i.ty
        }
        return e
    }
    update() {
        const t = this._texture;
        this._updateID++;
        const e = t.uvs;
        this.mapCoord.set(e.x1 - e.x0, e.y1 - e.y0, e.x3 - e.x0, e.y3 - e.y0, e.x0, e.y0);
        const i = t.orig
            , r = t.trim;
        r && (Mr.set(i.width / r.width, 0, 0, i.height / r.height, -r.x / r.width, -r.y / r.height),
            this.mapCoord.append(Mr));
        const n = t.source
            , o = this.uClampFrame
            , a = this.clampMargin / n._resolution
            , h = this.clampOffset / n._resolution;
        return o[0] = (t.frame.x + a + h) / n.width,
            o[1] = (t.frame.y + a + h) / n.height,
            o[2] = (t.frame.x + t.frame.width - a + h) / n.width,
            o[3] = (t.frame.y + t.frame.height - a + h) / n.height,
            this.uClampOffset[0] = this.clampOffset / n.pixelWidth,
            this.uClampOffset[1] = this.clampOffset / n.pixelHeight,
            this.isSimple = t.frame.width === n.width && t.frame.height === n.height && t.rotate === 0,
            !0
    }
}
class W extends mt {
    constructor({ source: t, label: e, frame: i, orig: r, trim: n, defaultAnchor: o, defaultBorders: a, rotate: h, dynamic: l } = {}) {
        if (super(),
            this.uid = tt("texture"),
            this.uvs = {
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                x3: 0,
                y3: 0
            },
            this.frame = new K,
            this.noFrame = !1,
            this.dynamic = !1,
            this.isTexture = !0,
            this.label = e,
            this.source = (t == null ? void 0 : t.source) ?? new Rt,
            this.noFrame = !i,
            i)
            this.frame.copyFrom(i);
        else {
            const { width: c, height: u } = this._source;
            this.frame.width = c,
                this.frame.height = u
        }
        this.orig = r || this.frame,
            this.trim = n,
            this.rotate = h ?? 0,
            this.defaultAnchor = o,
            this.defaultBorders = a,
            this.destroyed = !1,
            this.dynamic = l || !1,
            this.updateUvs()
    }
    set source(t) {
        this._source && this._source.off("resize", this.update, this),
            this._source = t,
            t.on("resize", this.update, this),
            this.emit("update", this)
    }
    get source() {
        return this._source
    }
    get textureMatrix() {
        return this._textureMatrix || (this._textureMatrix = new th(this)),
            this._textureMatrix
    }
    get width() {
        return this.orig.width
    }
    get height() {
        return this.orig.height
    }
    updateUvs() {
        const { uvs: t, frame: e } = this
            , { width: i, height: r } = this._source
            , n = e.x / i
            , o = e.y / r
            , a = e.width / i
            , h = e.height / r;
        let l = this.rotate;
        if (l) {
            const c = a / 2
                , u = h / 2
                , f = n + c
                , d = o + u;
            l = Y.add(l, Y.NW),
                t.x0 = f + c * Y.uX(l),
                t.y0 = d + u * Y.uY(l),
                l = Y.add(l, 2),
                t.x1 = f + c * Y.uX(l),
                t.y1 = d + u * Y.uY(l),
                l = Y.add(l, 2),
                t.x2 = f + c * Y.uX(l),
                t.y2 = d + u * Y.uY(l),
                l = Y.add(l, 2),
                t.x3 = f + c * Y.uX(l),
                t.y3 = d + u * Y.uY(l)
        } else
            t.x0 = n,
                t.y0 = o,
                t.x1 = n + a,
                t.y1 = o,
                t.x2 = n + a,
                t.y2 = o + h,
                t.x3 = n,
                t.y3 = o + h
    }
    destroy(t = !1) {
        this._source && (this._source.off("resize", this.update, this),
            t && (this._source.destroy(),
                this._source = null)),
            this._textureMatrix = null,
            this.destroyed = !0,
            this.emit("destroy", this),
            this.removeAllListeners()
    }
    update() {
        this.noFrame && (this.frame.width = this._source.width,
            this.frame.height = this._source.height),
            this.updateUvs(),
            this.emit("update", this)
    }
    get baseTexture() {
        return U(V, "Texture.baseTexture is now Texture.source"),
            this._source
    }
}
W.EMPTY = new W({
    label: "EMPTY",
    source: new Rt({
        label: "EMPTY"
    })
});
W.EMPTY.destroy = Vn;
W.WHITE = new W({
    source: new sr({
        resource: new Uint8Array([255, 255, 255, 255]),
        width: 1,
        height: 1,
        alphaMode: "premultiply-alpha-on-upload",
        label: "WHITE"
    }),
    label: "WHITE"
});
W.WHITE.destroy = Vn;
function eh(s, t, e) {
    const { width: i, height: r } = e.orig
        , n = e.trim;
    if (n) {
        const o = n.width
            , a = n.height;
        s.minX = n.x - t._x * i,
            s.maxX = s.minX + o,
            s.minY = n.y - t._y * r,
            s.maxY = s.minY + a
    } else
        s.minX = -t._x * i,
            s.maxX = s.minX + i,
            s.minY = -t._y * r,
            s.maxY = s.minY + r
}
const kr = new D;
class Ft {
    constructor(t = 1 / 0, e = 1 / 0, i = -1 / 0, r = -1 / 0) {
        this.minX = 1 / 0,
            this.minY = 1 / 0,
            this.maxX = -1 / 0,
            this.maxY = -1 / 0,
            this.matrix = kr,
            this.minX = t,
            this.minY = e,
            this.maxX = i,
            this.maxY = r
    }
    isEmpty() {
        return this.minX > this.maxX || this.minY > this.maxY
    }
    get rectangle() {
        this._rectangle || (this._rectangle = new K);
        const t = this._rectangle;
        return this.minX > this.maxX || this.minY > this.maxY ? (t.x = 0,
            t.y = 0,
            t.width = 0,
            t.height = 0) : t.copyFromBounds(this),
            t
    }
    clear() {
        return this.minX = 1 / 0,
            this.minY = 1 / 0,
            this.maxX = -1 / 0,
            this.maxY = -1 / 0,
            this.matrix = kr,
            this
    }
    set(t, e, i, r) {
        this.minX = t,
            this.minY = e,
            this.maxX = i,
            this.maxY = r
    }
    addFrame(t, e, i, r, n) {
        n || (n = this.matrix);
        const o = n.a
            , a = n.b
            , h = n.c
            , l = n.d
            , c = n.tx
            , u = n.ty;
        let f = this.minX
            , d = this.minY
            , m = this.maxX
            , g = this.maxY
            , p = o * t + h * e + c
            , _ = a * t + l * e + u;
        p < f && (f = p),
            _ < d && (d = _),
            p > m && (m = p),
            _ > g && (g = _),
            p = o * i + h * e + c,
            _ = a * i + l * e + u,
            p < f && (f = p),
            _ < d && (d = _),
            p > m && (m = p),
            _ > g && (g = _),
            p = o * t + h * r + c,
            _ = a * t + l * r + u,
            p < f && (f = p),
            _ < d && (d = _),
            p > m && (m = p),
            _ > g && (g = _),
            p = o * i + h * r + c,
            _ = a * i + l * r + u,
            p < f && (f = p),
            _ < d && (d = _),
            p > m && (m = p),
            _ > g && (g = _),
            this.minX = f,
            this.minY = d,
            this.maxX = m,
            this.maxY = g
    }
    addRect(t, e) {
        this.addFrame(t.x, t.y, t.x + t.width, t.y + t.height, e)
    }
    addBounds(t, e) {
        this.addFrame(t.minX, t.minY, t.maxX, t.maxY, e)
    }
    addBoundsMask(t) {
        this.minX = this.minX > t.minX ? this.minX : t.minX,
            this.minY = this.minY > t.minY ? this.minY : t.minY,
            this.maxX = this.maxX < t.maxX ? this.maxX : t.maxX,
            this.maxY = this.maxY < t.maxY ? this.maxY : t.maxY
    }
    applyMatrix(t) {
        const e = this.minX
            , i = this.minY
            , r = this.maxX
            , n = this.maxY
            , { a: o, b: a, c: h, d: l, tx: c, ty: u } = t;
        let f = o * e + h * i + c
            , d = a * e + l * i + u;
        this.minX = f,
            this.minY = d,
            this.maxX = f,
            this.maxY = d,
            f = o * r + h * i + c,
            d = a * r + l * i + u,
            this.minX = f < this.minX ? f : this.minX,
            this.minY = d < this.minY ? d : this.minY,
            this.maxX = f > this.maxX ? f : this.maxX,
            this.maxY = d > this.maxY ? d : this.maxY,
            f = o * e + h * n + c,
            d = a * e + l * n + u,
            this.minX = f < this.minX ? f : this.minX,
            this.minY = d < this.minY ? d : this.minY,
            this.maxX = f > this.maxX ? f : this.maxX,
            this.maxY = d > this.maxY ? d : this.maxY,
            f = o * r + h * n + c,
            d = a * r + l * n + u,
            this.minX = f < this.minX ? f : this.minX,
            this.minY = d < this.minY ? d : this.minY,
            this.maxX = f > this.maxX ? f : this.maxX,
            this.maxY = d > this.maxY ? d : this.maxY
    }
    fit(t) {
        return this.minX < t.left && (this.minX = t.left),
            this.maxX > t.right && (this.maxX = t.right),
            this.minY < t.top && (this.minY = t.top),
            this.maxY > t.bottom && (this.maxY = t.bottom),
            this
    }
    fitBounds(t, e, i, r) {
        return this.minX < t && (this.minX = t),
            this.maxX > e && (this.maxX = e),
            this.minY < i && (this.minY = i),
            this.maxY > r && (this.maxY = r),
            this
    }
    pad(t, e = t) {
        return this.minX -= t,
            this.maxX += t,
            this.minY -= e,
            this.maxY += e,
            this
    }
    ceil() {
        return this.minX = Math.floor(this.minX),
            this.minY = Math.floor(this.minY),
            this.maxX = Math.ceil(this.maxX),
            this.maxY = Math.ceil(this.maxY),
            this
    }
    clone() {
        return new Ft(this.minX, this.minY, this.maxX, this.maxY)
    }
    scale(t, e = t) {
        return this.minX *= t,
            this.minY *= e,
            this.maxX *= t,
            this.maxY *= e,
            this
    }
    get x() {
        return this.minX
    }
    set x(t) {
        const e = this.maxX - this.minX;
        this.minX = t,
            this.maxX = t + e
    }
    get y() {
        return this.minY
    }
    set y(t) {
        const e = this.maxY - this.minY;
        this.minY = t,
            this.maxY = t + e
    }
    get width() {
        return this.maxX - this.minX
    }
    set width(t) {
        this.maxX = this.minX + t
    }
    get height() {
        return this.maxY - this.minY
    }
    set height(t) {
        this.maxY = this.minY + t
    }
    get left() {
        return this.minX
    }
    get right() {
        return this.maxX
    }
    get top() {
        return this.minY
    }
    get bottom() {
        return this.maxY
    }
    get isPositive() {
        return this.maxX - this.minX > 0 && this.maxY - this.minY > 0
    }
    get isValid() {
        return this.minX + this.minY !== 1 / 0
    }
    addVertexData(t, e, i, r) {
        let n = this.minX
            , o = this.minY
            , a = this.maxX
            , h = this.maxY;
        r || (r = this.matrix);
        const l = r.a
            , c = r.b
            , u = r.c
            , f = r.d
            , d = r.tx
            , m = r.ty;
        for (let g = e; g < i; g += 2) {
            const p = t[g]
                , _ = t[g + 1]
                , x = l * p + u * _ + d
                , y = c * p + f * _ + m;
            n = x < n ? x : n,
                o = y < o ? y : o,
                a = x > a ? x : a,
                h = y > h ? y : h
        }
        this.minX = n,
            this.minY = o,
            this.maxX = a,
            this.maxY = h
    }
    containsPoint(t, e) {
        return this.minX <= t && this.minY <= e && this.maxX >= t && this.maxY >= e
    }
    toString() {
        return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`
    }
    copyFrom(t) {
        return this.minX = t.minX,
            this.minY = t.minY,
            this.maxX = t.maxX,
            this.maxY = t.maxY,
            this
    }
}
var sh = {
    grad: .9,
    turn: 360,
    rad: 360 / (2 * Math.PI)
}
    , qt = function (s) {
        return typeof s == "string" ? s.length > 0 : typeof s == "number"
    }
    , ht = function (s, t, e) {
        return t === void 0 && (t = 0),
            e === void 0 && (e = Math.pow(10, t)),
            Math.round(e * s) / e + 0
    }
    , kt = function (s, t, e) {
        return t === void 0 && (t = 0),
            e === void 0 && (e = 1),
            s > e ? e : s > t ? s : t
    }
    , Kn = function (s) {
        return (s = isFinite(s) ? s % 360 : 0) > 0 ? s : s + 360
    }
    , Er = function (s) {
        return {
            r: kt(s.r, 0, 255),
            g: kt(s.g, 0, 255),
            b: kt(s.b, 0, 255),
            a: kt(s.a)
        }
    }
    , di = function (s) {
        return {
            r: ht(s.r),
            g: ht(s.g),
            b: ht(s.b),
            a: ht(s.a, 3)
        }
    }
    , ih = /^#([0-9a-f]{3,8})$/i
    , Ms = function (s) {
        var t = s.toString(16);
        return t.length < 2 ? "0" + t : t
    }
    , Zn = function (s) {
        var t = s.r
            , e = s.g
            , i = s.b
            , r = s.a
            , n = Math.max(t, e, i)
            , o = n - Math.min(t, e, i)
            , a = o ? n === t ? (e - i) / o : n === e ? 2 + (i - t) / o : 4 + (t - e) / o : 0;
        return {
            h: 60 * (a < 0 ? a + 6 : a),
            s: n ? o / n * 100 : 0,
            v: n / 255 * 100,
            a: r
        }
    }
    , Qn = function (s) {
        var t = s.h
            , e = s.s
            , i = s.v
            , r = s.a;
        t = t / 360 * 6,
            e /= 100,
            i /= 100;
        var n = Math.floor(t)
            , o = i * (1 - e)
            , a = i * (1 - (t - n) * e)
            , h = i * (1 - (1 - t + n) * e)
            , l = n % 6;
        return {
            r: 255 * [i, a, o, o, h, i][l],
            g: 255 * [h, i, i, a, o, o][l],
            b: 255 * [o, o, h, i, i, a][l],
            a: r
        }
    }
    , Ir = function (s) {
        return {
            h: Kn(s.h),
            s: kt(s.s, 0, 100),
            l: kt(s.l, 0, 100),
            a: kt(s.a)
        }
    }
    , Br = function (s) {
        return {
            h: ht(s.h),
            s: ht(s.s),
            l: ht(s.l),
            a: ht(s.a, 3)
        }
    }
    , Fr = function (s) {
        return Qn((e = (t = s).s,
        {
            h: t.h,
            s: (e *= ((i = t.l) < 50 ? i : 100 - i) / 100) > 0 ? 2 * e / (i + e) * 100 : 0,
            v: i + e,
            a: t.a
        }));
        var t, e, i
    }
    , rs = function (s) {
        return {
            h: (t = Zn(s)).h,
            s: (r = (200 - (e = t.s)) * (i = t.v) / 100) > 0 && r < 200 ? e * i / 100 / (r <= 100 ? r : 200 - r) * 100 : 0,
            l: r / 2,
            a: t.a
        };
        var t, e, i, r
    }
    , rh = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i
    , nh = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i
    , oh = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i
    , ah = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i
    , Oi = {
        string: [[function (s) {
            var t = ih.exec(s);
            return t ? (s = t[1]).length <= 4 ? {
                r: parseInt(s[0] + s[0], 16),
                g: parseInt(s[1] + s[1], 16),
                b: parseInt(s[2] + s[2], 16),
                a: s.length === 4 ? ht(parseInt(s[3] + s[3], 16) / 255, 2) : 1
            } : s.length === 6 || s.length === 8 ? {
                r: parseInt(s.substr(0, 2), 16),
                g: parseInt(s.substr(2, 2), 16),
                b: parseInt(s.substr(4, 2), 16),
                a: s.length === 8 ? ht(parseInt(s.substr(6, 2), 16) / 255, 2) : 1
            } : null : null
        }
            , "hex"], [function (s) {
                var t = oh.exec(s) || ah.exec(s);
                return t ? t[2] !== t[4] || t[4] !== t[6] ? null : Er({
                    r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                    g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                    b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                    a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
                }) : null
            }
            , "rgb"], [function (s) {
                var t = rh.exec(s) || nh.exec(s);
                if (!t)
                    return null;
                var e, i, r = Ir({
                    h: (e = t[1],
                        i = t[2],
                        i === void 0 && (i = "deg"),
                        Number(e) * (sh[i] || 1)),
                    s: Number(t[3]),
                    l: Number(t[4]),
                    a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
                });
                return Fr(r)
            }
            , "hsl"]],
        object: [[function (s) {
            var t = s.r
                , e = s.g
                , i = s.b
                , r = s.a
                , n = r === void 0 ? 1 : r;
            return qt(t) && qt(e) && qt(i) ? Er({
                r: Number(t),
                g: Number(e),
                b: Number(i),
                a: Number(n)
            }) : null
        }
            , "rgb"], [function (s) {
                var t = s.h
                    , e = s.s
                    , i = s.l
                    , r = s.a
                    , n = r === void 0 ? 1 : r;
                if (!qt(t) || !qt(e) || !qt(i))
                    return null;
                var o = Ir({
                    h: Number(t),
                    s: Number(e),
                    l: Number(i),
                    a: Number(n)
                });
                return Fr(o)
            }
            , "hsl"], [function (s) {
                var t = s.h
                    , e = s.s
                    , i = s.v
                    , r = s.a
                    , n = r === void 0 ? 1 : r;
                if (!qt(t) || !qt(e) || !qt(i))
                    return null;
                var o = (function (a) {
                    return {
                        h: Kn(a.h),
                        s: kt(a.s, 0, 100),
                        v: kt(a.v, 0, 100),
                        a: kt(a.a)
                    }
                }
                )({
                    h: Number(t),
                    s: Number(e),
                    v: Number(i),
                    a: Number(n)
                });
                return Qn(o)
            }
            , "hsv"]]
    }
    , Rr = function (s, t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e][0](s);
            if (i)
                return [i, t[e][1]]
        }
        return [null, void 0]
    }
    , hh = function (s) {
        return typeof s == "string" ? Rr(s.trim(), Oi.string) : typeof s == "object" && s !== null ? Rr(s, Oi.object) : [null, void 0]
    }
    , fi = function (s, t) {
        var e = rs(s);
        return {
            h: e.h,
            s: kt(e.s + 100 * t, 0, 100),
            l: e.l,
            a: e.a
        }
    }
    , pi = function (s) {
        return (299 * s.r + 587 * s.g + 114 * s.b) / 1e3 / 255
    }
    , Lr = function (s, t) {
        var e = rs(s);
        return {
            h: e.h,
            s: e.s,
            l: kt(e.l + 100 * t, 0, 100),
            a: e.a
        }
    }
    , Wi = (function () {
        function s(t) {
            this.parsed = hh(t)[0],
                this.rgba = this.parsed || {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                }
        }
        return s.prototype.isValid = function () {
            return this.parsed !== null
        }
            ,
            s.prototype.brightness = function () {
                return ht(pi(this.rgba), 2)
            }
            ,
            s.prototype.isDark = function () {
                return pi(this.rgba) < .5
            }
            ,
            s.prototype.isLight = function () {
                return pi(this.rgba) >= .5
            }
            ,
            s.prototype.toHex = function () {
                return t = di(this.rgba),
                    e = t.r,
                    i = t.g,
                    r = t.b,
                    o = (n = t.a) < 1 ? Ms(ht(255 * n)) : "",
                    "#" + Ms(e) + Ms(i) + Ms(r) + o;
                var t, e, i, r, n, o
            }
            ,
            s.prototype.toRgb = function () {
                return di(this.rgba)
            }
            ,
            s.prototype.toRgbString = function () {
                return t = di(this.rgba),
                    e = t.r,
                    i = t.g,
                    r = t.b,
                    (n = t.a) < 1 ? "rgba(" + e + ", " + i + ", " + r + ", " + n + ")" : "rgb(" + e + ", " + i + ", " + r + ")";
                var t, e, i, r, n
            }
            ,
            s.prototype.toHsl = function () {
                return Br(rs(this.rgba))
            }
            ,
            s.prototype.toHslString = function () {
                return t = Br(rs(this.rgba)),
                    e = t.h,
                    i = t.s,
                    r = t.l,
                    (n = t.a) < 1 ? "hsla(" + e + ", " + i + "%, " + r + "%, " + n + ")" : "hsl(" + e + ", " + i + "%, " + r + "%)";
                var t, e, i, r, n
            }
            ,
            s.prototype.toHsv = function () {
                return t = Zn(this.rgba),
                {
                    h: ht(t.h),
                    s: ht(t.s),
                    v: ht(t.v),
                    a: ht(t.a, 3)
                };
                var t
            }
            ,
            s.prototype.invert = function () {
                return Dt({
                    r: 255 - (t = this.rgba).r,
                    g: 255 - t.g,
                    b: 255 - t.b,
                    a: t.a
                });
                var t
            }
            ,
            s.prototype.saturate = function (t) {
                return t === void 0 && (t = .1),
                    Dt(fi(this.rgba, t))
            }
            ,
            s.prototype.desaturate = function (t) {
                return t === void 0 && (t = .1),
                    Dt(fi(this.rgba, -t))
            }
            ,
            s.prototype.grayscale = function () {
                return Dt(fi(this.rgba, -1))
            }
            ,
            s.prototype.lighten = function (t) {
                return t === void 0 && (t = .1),
                    Dt(Lr(this.rgba, t))
            }
            ,
            s.prototype.darken = function (t) {
                return t === void 0 && (t = .1),
                    Dt(Lr(this.rgba, -t))
            }
            ,
            s.prototype.rotate = function (t) {
                return t === void 0 && (t = 15),
                    this.hue(this.hue() + t)
            }
            ,
            s.prototype.alpha = function (t) {
                return typeof t == "number" ? Dt({
                    r: (e = this.rgba).r,
                    g: e.g,
                    b: e.b,
                    a: t
                }) : ht(this.rgba.a, 3);
                var e
            }
            ,
            s.prototype.hue = function (t) {
                var e = rs(this.rgba);
                return typeof t == "number" ? Dt({
                    h: t,
                    s: e.s,
                    l: e.l,
                    a: e.a
                }) : ht(e.h)
            }
            ,
            s.prototype.isEqual = function (t) {
                return this.toHex() === Dt(t).toHex()
            }
            ,
            s
    }
    )()
    , Dt = function (s) {
        return s instanceof Wi ? s : new Wi(s)
    }
    , Gr = []
    , lh = function (s) {
        s.forEach(function (t) {
            Gr.indexOf(t) < 0 && (t(Wi, Oi),
                Gr.push(t))
        })
    };
function ch(s, t) {
    var e = {
        white: "#ffffff",
        bisque: "#ffe4c4",
        blue: "#0000ff",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        azure: "#f0ffff",
        whitesmoke: "#f5f5f5",
        papayawhip: "#ffefd5",
        plum: "#dda0dd",
        blanchedalmond: "#ffebcd",
        black: "#000000",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gainsboro: "#dcdcdc",
        cornsilk: "#fff8dc",
        cornflowerblue: "#6495ed",
        burlywood: "#deb887",
        aquamarine: "#7fffd4",
        beige: "#f5f5dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkkhaki: "#bdb76b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        peachpuff: "#ffdab9",
        darkmagenta: "#8b008b",
        darkred: "#8b0000",
        darkorchid: "#9932cc",
        darkorange: "#ff8c00",
        darkslateblue: "#483d8b",
        gray: "#808080",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        wheat: "#f5deb3",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        ghostwhite: "#f8f8ff",
        darkviolet: "#9400d3",
        magenta: "#ff00ff",
        green: "#008000",
        dodgerblue: "#1e90ff",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        blueviolet: "#8a2be2",
        forestgreen: "#228b22",
        lawngreen: "#7cfc00",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        fuchsia: "#ff00ff",
        brown: "#a52a2a",
        maroon: "#800000",
        mediumblue: "#0000cd",
        lightcoral: "#f08080",
        darkturquoise: "#00ced1",
        lightcyan: "#e0ffff",
        ivory: "#fffff0",
        lightyellow: "#ffffe0",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        linen: "#faf0e6",
        mediumaquamarine: "#66cdaa",
        lemonchiffon: "#fffacd",
        lime: "#00ff00",
        khaki: "#f0e68c",
        mediumseagreen: "#3cb371",
        limegreen: "#32cd32",
        mediumspringgreen: "#00fa9a",
        lightskyblue: "#87cefa",
        lightblue: "#add8e6",
        midnightblue: "#191970",
        lightpink: "#ffb6c1",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        mintcream: "#f5fffa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        navajowhite: "#ffdead",
        navy: "#000080",
        mediumvioletred: "#c71585",
        powderblue: "#b0e0e6",
        palegoldenrod: "#eee8aa",
        oldlace: "#fdf5e6",
        paleturquoise: "#afeeee",
        mediumturquoise: "#48d1cc",
        mediumorchid: "#ba55d3",
        rebeccapurple: "#663399",
        lightsteelblue: "#b0c4de",
        mediumslateblue: "#7b68ee",
        thistle: "#d8bfd8",
        tan: "#d2b48c",
        orchid: "#da70d6",
        mediumpurple: "#9370db",
        purple: "#800080",
        pink: "#ffc0cb",
        skyblue: "#87ceeb",
        springgreen: "#00ff7f",
        palegreen: "#98fb98",
        red: "#ff0000",
        yellow: "#ffff00",
        slateblue: "#6a5acd",
        lavenderblush: "#fff0f5",
        peru: "#cd853f",
        palevioletred: "#db7093",
        violet: "#ee82ee",
        teal: "#008080",
        slategray: "#708090",
        slategrey: "#708090",
        aliceblue: "#f0f8ff",
        darkseagreen: "#8fbc8f",
        darkolivegreen: "#556b2f",
        greenyellow: "#adff2f",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        tomato: "#ff6347",
        silver: "#c0c0c0",
        sienna: "#a0522d",
        lavender: "#e6e6fa",
        lightgreen: "#90ee90",
        orange: "#ffa500",
        orangered: "#ff4500",
        steelblue: "#4682b4",
        royalblue: "#4169e1",
        turquoise: "#40e0d0",
        yellowgreen: "#9acd32",
        salmon: "#fa8072",
        saddlebrown: "#8b4513",
        sandybrown: "#f4a460",
        rosybrown: "#bc8f8f",
        darksalmon: "#e9967a",
        lightgoldenrodyellow: "#fafad2",
        snow: "#fffafa",
        lightgrey: "#d3d3d3",
        lightgray: "#d3d3d3",
        dimgray: "#696969",
        dimgrey: "#696969",
        olivedrab: "#6b8e23",
        olive: "#808000"
    }
        , i = {};
    for (var r in e)
        i[e[r]] = r;
    var n = {};
    s.prototype.toName = function (o) {
        if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
            return "transparent";
        var a, h, l = i[this.toHex()];
        if (l)
            return l;
        if (o != null && o.closest) {
            var c = this.toRgb()
                , u = 1 / 0
                , f = "black";
            if (!n.length)
                for (var d in e)
                    n[d] = new s(e[d]).toRgb();
            for (var m in e) {
                var g = (a = c,
                    h = n[m],
                    Math.pow(a.r - h.r, 2) + Math.pow(a.g - h.g, 2) + Math.pow(a.b - h.b, 2));
                g < u && (u = g,
                    f = m)
            }
            return f
        }
    }
        ,
        t.string.push([function (o) {
            var a = o.toLowerCase()
                , h = a === "transparent" ? "#0000" : e[a];
            return h ? new s(h).toRgb() : null
        }
            , "name"])
}
lh([ch]);
const Fe = class ts {
    constructor(t = 16777215) {
        this._value = null,
            this._components = new Float32Array(4),
            this._components.fill(1),
            this._int = 16777215,
            this.value = t
    }
    get red() {
        return this._components[0]
    }
    get green() {
        return this._components[1]
    }
    get blue() {
        return this._components[2]
    }
    get alpha() {
        return this._components[3]
    }
    setValue(t) {
        return this.value = t,
            this
    }
    set value(t) {
        if (t instanceof ts)
            this._value = this._cloneSource(t._value),
                this._int = t._int,
                this._components.set(t._components);
        else {
            if (t === null)
                throw new Error("Cannot set Color#value to null");
            (this._value === null || !this._isSourceEqual(this._value, t)) && (this._value = this._cloneSource(t),
                this._normalize(this._value))
        }
    }
    get value() {
        return this._value
    }
    _cloneSource(t) {
        return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? {
            ...t
        } : t
    }
    _isSourceEqual(t, e) {
        const i = typeof t;
        if (i !== typeof e)
            return !1;
        if (i === "number" || i === "string" || t instanceof Number)
            return t === e;
        if (Array.isArray(t) && Array.isArray(e) || ArrayBuffer.isView(t) && ArrayBuffer.isView(e))
            return t.length !== e.length ? !1 : t.every((n, o) => n === e[o]);
        if (t !== null && e !== null) {
            const n = Object.keys(t)
                , o = Object.keys(e);
            return n.length !== o.length ? !1 : n.every(a => t[a] === e[a])
        }
        return t === e
    }
    toRgba() {
        const [t, e, i, r] = this._components;
        return {
            r: t,
            g: e,
            b: i,
            a: r
        }
    }
    toRgb() {
        const [t, e, i] = this._components;
        return {
            r: t,
            g: e,
            b: i
        }
    }
    toRgbaString() {
        const [t, e, i] = this.toUint8RgbArray();
        return `rgba(${t},${e},${i},${this.alpha})`
    }
    toUint8RgbArray(t) {
        const [e, i, r] = this._components;
        return this._arrayRgb || (this._arrayRgb = []),
            t || (t = this._arrayRgb),
            t[0] = Math.round(e * 255),
            t[1] = Math.round(i * 255),
            t[2] = Math.round(r * 255),
            t
    }
    toArray(t) {
        this._arrayRgba || (this._arrayRgba = []),
            t || (t = this._arrayRgba);
        const [e, i, r, n] = this._components;
        return t[0] = e,
            t[1] = i,
            t[2] = r,
            t[3] = n,
            t
    }
    toRgbArray(t) {
        this._arrayRgb || (this._arrayRgb = []),
            t || (t = this._arrayRgb);
        const [e, i, r] = this._components;
        return t[0] = e,
            t[1] = i,
            t[2] = r,
            t
    }
    toNumber() {
        return this._int
    }
    toBgrNumber() {
        const [t, e, i] = this.toUint8RgbArray();
        return (i << 16) + (e << 8) + t
    }
    toLittleEndianNumber() {
        const t = this._int;
        return (t >> 16) + (t & 65280) + ((t & 255) << 16)
    }
    multiply(t) {
        const [e, i, r, n] = ts._temp.setValue(t)._components;
        return this._components[0] *= e,
            this._components[1] *= i,
            this._components[2] *= r,
            this._components[3] *= n,
            this._refreshInt(),
            this._value = null,
            this
    }
    premultiply(t, e = !0) {
        return e && (this._components[0] *= t,
            this._components[1] *= t,
            this._components[2] *= t),
            this._components[3] = t,
            this._refreshInt(),
            this._value = null,
            this
    }
    toPremultiplied(t, e = !0) {
        if (t === 1)
            return (255 << 24) + this._int;
        if (t === 0)
            return e ? 0 : this._int;
        let i = this._int >> 16 & 255
            , r = this._int >> 8 & 255
            , n = this._int & 255;
        return e && (i = i * t + .5 | 0,
            r = r * t + .5 | 0,
            n = n * t + .5 | 0),
            (t * 255 << 24) + (i << 16) + (r << 8) + n
    }
    toHex() {
        const t = this._int.toString(16);
        return `#${"000000".substring(0, 6 - t.length) + t}`
    }
    toHexa() {
        const e = Math.round(this._components[3] * 255).toString(16);
        return this.toHex() + "00".substring(0, 2 - e.length) + e
    }
    setAlpha(t) {
        return this._components[3] = this._clamp(t),
            this
    }
    _normalize(t) {
        let e, i, r, n;
        if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
            const o = t;
            e = (o >> 16 & 255) / 255,
                i = (o >> 8 & 255) / 255,
                r = (o & 255) / 255,
                n = 1
        } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
            t = this._clamp(t),
                [e, i, r, n = 1] = t;
        else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
            t = this._clamp(t, 0, 255),
                [e, i, r, n = 255] = t,
                e /= 255,
                i /= 255,
                r /= 255,
                n /= 255;
        else if (typeof t == "string" || typeof t == "object") {
            if (typeof t == "string") {
                const a = ts.HEX_PATTERN.exec(t);
                a && (t = `#${a[2]}`)
            }
            const o = Dt(t);
            o.isValid() && ({ r: e, g: i, b: r, a: n } = o.rgba,
                e /= 255,
                i /= 255,
                r /= 255)
        }
        if (e !== void 0)
            this._components[0] = e,
                this._components[1] = i,
                this._components[2] = r,
                this._components[3] = n,
                this._refreshInt();
        else
            throw new Error(`Unable to convert color ${t}`)
    }
    _refreshInt() {
        this._clamp(this._components);
        const [t, e, i] = this._components;
        this._int = (t * 255 << 16) + (e * 255 << 8) + (i * 255 | 0)
    }
    _clamp(t, e = 0, i = 1) {
        return typeof t == "number" ? Math.min(Math.max(t, e), i) : (t.forEach((r, n) => {
            t[n] = Math.min(Math.max(r, e), i)
        }
        ),
            t)
    }
    static isColorLike(t) {
        return typeof t == "number" || typeof t == "string" || t instanceof Number || t instanceof ts || Array.isArray(t) || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0
    }
}
    ;
Fe.shared = new Fe;
Fe._temp = new Fe;
Fe.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let it = Fe;
const uh = {
    cullArea: null,
    cullable: !1,
    cullableChildren: !0
};
let mi = 0;
const Or = 500;
function q(...s) {
    mi !== Or && (mi++,
        mi === Or ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...s))
}
const _s = {
    _registeredResources: new Set,
    register(s) {
        this._registeredResources.add(s)
    },
    unregister(s) {
        this._registeredResources.delete(s)
    },
    release() {
        this._registeredResources.forEach(s => s.clear())
    },
    get registeredCount() {
        return this._registeredResources.size
    },
    isRegistered(s) {
        return this._registeredResources.has(s)
    },
    reset() {
        this._registeredResources.clear()
    }
};
class dh {
    constructor(t, e) {
        this._pool = [],
            this._count = 0,
            this._index = 0,
            this._classType = t,
            e && this.prepopulate(e)
    }
    prepopulate(t) {
        for (let e = 0; e < t; e++)
            this._pool[this._index++] = new this._classType;
        this._count += t
    }
    get(t) {
        var i;
        let e;
        return this._index > 0 ? e = this._pool[--this._index] : (e = new this._classType,
            this._count++),
            (i = e.init) == null || i.call(e, t),
            e
    }
    return(t) {
        var e;
        (e = t.reset) == null || e.call(t),
            this._pool[this._index++] = t
    }
    get totalSize() {
        return this._count
    }
    get totalFree() {
        return this._index
    }
    get totalUsed() {
        return this._count - this._index
    }
    clear() {
        if (this._pool.length > 0 && this._pool[0].destroy)
            for (let t = 0; t < this._index; t++)
                this._pool[t].destroy();
        this._pool.length = 0,
            this._count = 0,
            this._index = 0
    }
}
class fh {
    constructor() {
        this._poolsByClass = new Map
    }
    prepopulate(t, e) {
        this.getPool(t).prepopulate(e)
    }
    get(t, e) {
        return this.getPool(t).get(e)
    }
    return(t) {
        this.getPool(t.constructor).return(t)
    }
    getPool(t) {
        return this._poolsByClass.has(t) || this._poolsByClass.set(t, new dh(t)),
            this._poolsByClass.get(t)
    }
    stats() {
        const t = {};
        return this._poolsByClass.forEach(e => {
            const i = t[e._classType.name] ? e._classType.name + e._classType.ID : e._classType.name;
            t[i] = {
                free: e.totalFree,
                used: e.totalUsed,
                size: e.totalSize
            }
        }
        ),
            t
    }
    clear() {
        this._poolsByClass.forEach(t => t.clear()),
            this._poolsByClass.clear()
    }
}
const Et = new fh;
_s.register(Et);
const ph = {
    get isCachedAsTexture() {
        var s;
        return !!((s = this.renderGroup) != null && s.isCachedAsTexture)
    },
    cacheAsTexture(s) {
        typeof s == "boolean" && s === !1 ? this.disableRenderGroup() : (this.enableRenderGroup(),
            this.renderGroup.enableCacheAsTexture(s === !0 ? {} : s))
    },
    updateCacheTexture() {
        var s;
        (s = this.renderGroup) == null || s.updateCacheTexture()
    },
    get cacheAsBitmap() {
        return this.isCachedAsTexture
    },
    set cacheAsBitmap(s) {
        U("v8.6.0", "cacheAsBitmap is deprecated, use cacheAsTexture instead."),
            this.cacheAsTexture(s)
    }
};
function mh(s, t, e) {
    const i = s.length;
    let r;
    if (t >= i || e === 0)
        return;
    e = t + e > i ? i - t : e;
    const n = i - e;
    for (r = t; r < n; ++r)
        s[r] = s[r + e];
    s.length = n
}
const gh = {
    allowChildren: !0,
    removeChildren(s = 0, t) {
        var n;
        const e = t ?? this.children.length
            , i = e - s
            , r = [];
        if (i > 0 && i <= e) {
            for (let a = e - 1; a >= s; a--) {
                const h = this.children[a];
                h && (r.push(h),
                    h.parent = null)
            }
            mh(this.children, s, e);
            const o = this.renderGroup || this.parentRenderGroup;
            o && o.removeChildren(r);
            for (let a = 0; a < r.length; ++a) {
                const h = r[a];
                (n = h.parentRenderLayer) == null || n.detach(h),
                    this.emit("childRemoved", h, this, a),
                    r[a].emit("removed", this)
            }
            return r.length > 0 && this._didViewChangeTick++,
                r
        } else if (i === 0 && this.children.length === 0)
            return r;
        throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
    },
    removeChildAt(s) {
        const t = this.getChildAt(s);
        return this.removeChild(t)
    },
    getChildAt(s) {
        if (s < 0 || s >= this.children.length)
            throw new Error(`getChildAt: Index (${s}) does not exist.`);
        return this.children[s]
    },
    setChildIndex(s, t) {
        if (t < 0 || t >= this.children.length)
            throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);
        this.getChildIndex(s),
            this.addChildAt(s, t)
    },
    getChildIndex(s) {
        const t = this.children.indexOf(s);
        if (t === -1)
            throw new Error("The supplied Container must be a child of the caller");
        return t
    },
    addChildAt(s, t) {
        this.allowChildren || U(V, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
        const { children: e } = this;
        if (t < 0 || t > e.length)
            throw new Error(`${s}addChildAt: The index ${t} supplied is out of bounds ${e.length}`);
        if (s.parent) {
            const r = s.parent.children.indexOf(s);
            if (s.parent === this && r === t)
                return s;
            r !== -1 && s.parent.children.splice(r, 1)
        }
        t === e.length ? e.push(s) : e.splice(t, 0, s),
            s.parent = this,
            s.didChange = !0,
            s._updateFlags = 15;
        const i = this.renderGroup || this.parentRenderGroup;
        return i && i.addChild(s),
            this.sortableChildren && (this.sortDirty = !0),
            this.emit("childAdded", s, this, t),
            s.emit("added", this),
            s
    },
    swapChildren(s, t) {
        if (s === t)
            return;
        const e = this.getChildIndex(s)
            , i = this.getChildIndex(t);
        this.children[e] = t,
            this.children[i] = s;
        const r = this.renderGroup || this.parentRenderGroup;
        r && (r.structureDidChange = !0),
            this._didContainerChangeTick++
    },
    removeFromParent() {
        var s;
        (s = this.parent) == null || s.removeChild(this)
    },
    reparentChild(...s) {
        return s.length === 1 ? this.reparentChildAt(s[0], this.children.length) : (s.forEach(t => this.reparentChildAt(t, this.children.length)),
            s[0])
    },
    reparentChildAt(s, t) {
        if (s.parent === this)
            return this.setChildIndex(s, t),
                s;
        const e = s.worldTransform.clone();
        s.removeFromParent(),
            this.addChildAt(s, t);
        const i = this.worldTransform.clone();
        return i.invert(),
            e.prepend(i),
            s.setFromMatrix(e),
            s
    },
    replaceChild(s, t) {
        s.updateLocalTransform(),
            this.addChildAt(t, this.getChildIndex(s)),
            t.setFromMatrix(s.localTransform),
            t.updateLocalTransform(),
            this.removeChild(s)
    }
}
    , _h = {
        collectRenderables(s, t, e) {
            this.parentRenderLayer && this.parentRenderLayer !== e || this.globalDisplayStatus < 7 || !this.includeInBuild || (this.sortableChildren && this.sortChildren(),
                this.isSimple ? this.collectRenderablesSimple(s, t, e) : this.renderGroup ? t.renderPipes.renderGroup.addRenderGroup(this.renderGroup, s) : this.collectRenderablesWithEffects(s, t, e))
        },
        collectRenderablesSimple(s, t, e) {
            const i = this.children
                , r = i.length;
            for (let n = 0; n < r; n++)
                i[n].collectRenderables(s, t, e)
        },
        collectRenderablesWithEffects(s, t, e) {
            const { renderPipes: i } = t;
            for (let r = 0; r < this.effects.length; r++) {
                const n = this.effects[r];
                i[n.pipe].push(n, this, s)
            }
            this.collectRenderablesSimple(s, t, e);
            for (let r = this.effects.length - 1; r >= 0; r--) {
                const n = this.effects[r];
                i[n.pipe].pop(n, this, s)
            }
        }
    };
class Wr {
    constructor() {
        this.pipe = "filter",
            this.priority = 1
    }
    destroy() {
        for (let t = 0; t < this.filters.length; t++)
            this.filters[t].destroy();
        this.filters = null,
            this.filterArea = null
    }
}
class xh {
    constructor() {
        this._effectClasses = [],
            this._tests = [],
            this._initialized = !1
    }
    init() {
        this._initialized || (this._initialized = !0,
            this._effectClasses.forEach(t => {
                this.add({
                    test: t.test,
                    maskClass: t
                })
            }
            ))
    }
    add(t) {
        this._tests.push(t)
    }
    getMaskEffect(t) {
        this._initialized || this.init();
        for (let e = 0; e < this._tests.length; e++) {
            const i = this._tests[e];
            if (i.test(t))
                return Et.get(i.maskClass, t)
        }
        return t
    }
    returnMaskEffect(t) {
        Et.return(t)
    }
}
const Ui = new xh;
lt.handleByList(B.MaskEffect, Ui._effectClasses);
const yh = {
    _maskEffect: null,
    _maskOptions: {
        inverse: !1
    },
    _filterEffect: null,
    effects: [],
    _markStructureAsChanged() {
        const s = this.renderGroup || this.parentRenderGroup;
        s && (s.structureDidChange = !0)
    },
    addEffect(s) {
        this.effects.indexOf(s) === -1 && (this.effects.push(s),
            this.effects.sort((e, i) => e.priority - i.priority),
            this._markStructureAsChanged(),
            this._updateIsSimple())
    },
    removeEffect(s) {
        const t = this.effects.indexOf(s);
        t !== -1 && (this.effects.splice(t, 1),
            this._markStructureAsChanged(),
            this._updateIsSimple())
    },
    set mask(s) {
        const t = this._maskEffect;
        (t == null ? void 0 : t.mask) !== s && (t && (this.removeEffect(t),
            Ui.returnMaskEffect(t),
            this._maskEffect = null),
            s != null && (this._maskEffect = Ui.getMaskEffect(s),
                this.addEffect(this._maskEffect)))
    },
    get mask() {
        var s;
        return (s = this._maskEffect) == null ? void 0 : s.mask
    },
    setMask(s) {
        this._maskOptions = {
            ...this._maskOptions,
            ...s
        },
            s.mask && (this.mask = s.mask),
            this._markStructureAsChanged()
    },
    set filters(s) {
        var n;
        !Array.isArray(s) && s && (s = [s]);
        const t = this._filterEffect || (this._filterEffect = new Wr);
        s = s;
        const e = (s == null ? void 0 : s.length) > 0
            , i = ((n = t.filters) == null ? void 0 : n.length) > 0
            , r = e !== i;
        s = Array.isArray(s) ? s.slice(0) : s,
            t.filters = Object.freeze(s),
            r && (e ? this.addEffect(t) : (this.removeEffect(t),
                t.filters = s ?? null))
    },
    get filters() {
        var s;
        return (s = this._filterEffect) == null ? void 0 : s.filters
    },
    set filterArea(s) {
        this._filterEffect || (this._filterEffect = new Wr),
            this._filterEffect.filterArea = s
    },
    get filterArea() {
        var s;
        return (s = this._filterEffect) == null ? void 0 : s.filterArea
    }
}
    , bh = {
        label: null,
        get name() {
            return U(V, "Container.name property has been removed, use Container.label instead"),
                this.label
        },
        set name(s) {
            U(V, "Container.name property has been removed, use Container.label instead"),
                this.label = s
        },
        getChildByName(s, t = !1) {
            return this.getChildByLabel(s, t)
        },
        getChildByLabel(s, t = !1) {
            const e = this.children;
            for (let i = 0; i < e.length; i++) {
                const r = e[i];
                if (r.label === s || s instanceof RegExp && s.test(r.label))
                    return r
            }
            if (t)
                for (let i = 0; i < e.length; i++) {
                    const n = e[i].getChildByLabel(s, !0);
                    if (n)
                        return n
                }
            return null
        },
        getChildrenByLabel(s, t = !1, e = []) {
            const i = this.children;
            for (let r = 0; r < i.length; r++) {
                const n = i[r];
                (n.label === s || s instanceof RegExp && s.test(n.label)) && e.push(n)
            }
            if (t)
                for (let r = 0; r < i.length; r++)
                    i[r].getChildrenByLabel(s, !0, e);
            return e
        }
    }
    , _t = Et.getPool(D)
    , Qt = Et.getPool(Ft)
    , wh = new D
    , Ah = {
        getFastGlobalBounds(s, t) {
            t || (t = new Ft),
                t.clear(),
                this._getGlobalBoundsRecursive(!!s, t, this.parentRenderLayer),
                t.isValid || t.set(0, 0, 0, 0);
            const e = this.renderGroup || this.parentRenderGroup;
            return t.applyMatrix(e.worldTransform),
                t
        },
        _getGlobalBoundsRecursive(s, t, e) {
            let i = t;
            if (s && this.parentRenderLayer && this.parentRenderLayer !== e || this.localDisplayStatus !== 7 || !this.measurable)
                return;
            const r = !!this.effects.length;
            if ((this.renderGroup || r) && (i = Qt.get().clear()),
                this.boundsArea)
                t.addRect(this.boundsArea, this.worldTransform);
            else {
                if (this.renderPipeId) {
                    const o = this.bounds;
                    i.addFrame(o.minX, o.minY, o.maxX, o.maxY, this.groupTransform)
                }
                const n = this.children;
                for (let o = 0; o < n.length; o++)
                    n[o]._getGlobalBoundsRecursive(s, i, e)
            }
            if (r) {
                let n = !1;
                const o = this.renderGroup || this.parentRenderGroup;
                for (let a = 0; a < this.effects.length; a++)
                    this.effects[a].addBounds && (n || (n = !0,
                        i.applyMatrix(o.worldTransform)),
                        this.effects[a].addBounds(i, !0));
                n && i.applyMatrix(o.worldTransform.copyTo(wh).invert()),
                    t.addBounds(i),
                    Qt.return(i)
            } else
                this.renderGroup && (t.addBounds(i, this.relativeGroupTransform),
                    Qt.return(i))
        }
    };
function Jn(s, t, e) {
    e.clear();
    let i, r;
    return s.parent ? t ? i = s.parent.worldTransform : (r = _t.get().identity(),
        i = ir(s, r)) : i = D.IDENTITY,
        to(s, e, i, t),
        r && _t.return(r),
        e.isValid || e.set(0, 0, 0, 0),
        e
}
function to(s, t, e, i) {
    var a, h;
    if (!s.visible || !s.measurable)
        return;
    let r;
    i ? r = s.worldTransform : (s.updateLocalTransform(),
        r = _t.get(),
        r.appendFrom(s.localTransform, e));
    const n = t
        , o = !!s.effects.length;
    if (o && (t = Qt.get().clear()),
        s.boundsArea)
        t.addRect(s.boundsArea, r);
    else {
        const l = s.bounds;
        l && !l.isEmpty() && (t.matrix = r,
            t.addBounds(l));
        for (let c = 0; c < s.children.length; c++)
            to(s.children[c], t, r, i)
    }
    if (o) {
        for (let l = 0; l < s.effects.length; l++)
            (h = (a = s.effects[l]).addBounds) == null || h.call(a, t);
        n.addBounds(t, D.IDENTITY),
            Qt.return(t)
    }
    i || _t.return(r)
}
function ir(s, t) {
    const e = s.parent;
    return e && (ir(e, t),
        e.updateLocalTransform(),
        t.append(e.localTransform)),
        t
}
function eo(s, t) {
    if (s === 16777215 || !t)
        return t;
    if (t === 16777215 || !s)
        return s;
    const e = s >> 16 & 255
        , i = s >> 8 & 255
        , r = s & 255
        , n = t >> 16 & 255
        , o = t >> 8 & 255
        , a = t & 255
        , h = e * n / 255 | 0
        , l = i * o / 255 | 0
        , c = r * a / 255 | 0;
    return (h << 16) + (l << 8) + c
}
const Ur = 16777215;
function Dr(s, t) {
    return s === Ur ? t : t === Ur ? s : eo(s, t)
}
function Us(s) {
    return ((s & 255) << 16) + (s & 65280) + (s >> 16 & 255)
}
const Sh = {
    getGlobalAlpha(s) {
        if (s)
            return this.renderGroup ? this.renderGroup.worldAlpha : this.parentRenderGroup ? this.parentRenderGroup.worldAlpha * this.alpha : this.alpha;
        let t = this.alpha
            , e = this.parent;
        for (; e;)
            t *= e.alpha,
                e = e.parent;
        return t
    },
    getGlobalTransform(s = new D, t) {
        if (t)
            return s.copyFrom(this.worldTransform);
        this.updateLocalTransform();
        const e = ir(this, _t.get().identity());
        return s.appendFrom(this.localTransform, e),
            _t.return(e),
            s
    },
    getGlobalTint(s) {
        if (s)
            return this.renderGroup ? Us(this.renderGroup.worldColor) : this.parentRenderGroup ? Us(Dr(this.localColor, this.parentRenderGroup.worldColor)) : this.tint;
        let t = this.localColor
            , e = this.parent;
        for (; e;)
            t = Dr(t, e.localColor),
                e = e.parent;
        return Us(t)
    }
};
function so(s, t, e) {
    return t.clear(),
        e || (e = D.IDENTITY),
        io(s, t, e, s, !0),
        t.isValid || t.set(0, 0, 0, 0),
        t
}
function io(s, t, e, i, r) {
    var h, l;
    let n;
    if (r)
        n = _t.get(),
            n = e.copyTo(n);
    else {
        if (!s.visible || !s.measurable)
            return;
        s.updateLocalTransform();
        const c = s.localTransform;
        n = _t.get(),
            n.appendFrom(c, e)
    }
    const o = t
        , a = !!s.effects.length;
    if (a && (t = Qt.get().clear()),
        s.boundsArea)
        t.addRect(s.boundsArea, n);
    else {
        s.renderPipeId && (t.matrix = n,
            t.addBounds(s.bounds));
        const c = s.children;
        for (let u = 0; u < c.length; u++)
            io(c[u], t, n, i, !1)
    }
    if (a) {
        for (let c = 0; c < s.effects.length; c++)
            (l = (h = s.effects[c]).addLocalBounds) == null || l.call(h, t, i);
        o.addBounds(t, D.IDENTITY),
            Qt.return(t)
    }
    _t.return(n)
}
function ro(s, t) {
    const e = s.children;
    for (let i = 0; i < e.length; i++) {
        const r = e[i]
            , n = r.uid
            , o = (r._didViewChangeTick & 65535) << 16 | r._didContainerChangeTick & 65535
            , a = t.index;
        (t.data[a] !== n || t.data[a + 1] !== o) && (t.data[t.index] = n,
            t.data[t.index + 1] = o,
            t.didChange = !0),
            t.index = a + 2,
            r.children.length && ro(r, t)
    }
    return t.didChange
}
const vh = new D
    , Ch = {
        _localBoundsCacheId: -1,
        _localBoundsCacheData: null,
        _setWidth(s, t) {
            const e = Math.sign(this.scale.x) || 1;
            t !== 0 ? this.scale.x = s / t * e : this.scale.x = e
        },
        _setHeight(s, t) {
            const e = Math.sign(this.scale.y) || 1;
            t !== 0 ? this.scale.y = s / t * e : this.scale.y = e
        },
        getLocalBounds() {
            this._localBoundsCacheData || (this._localBoundsCacheData = {
                data: [],
                index: 1,
                didChange: !1,
                localBounds: new Ft
            });
            const s = this._localBoundsCacheData;
            return s.index = 1,
                s.didChange = !1,
                s.data[0] !== this._didViewChangeTick && (s.didChange = !0,
                    s.data[0] = this._didViewChangeTick),
                ro(this, s),
                s.didChange && so(this, s.localBounds, vh),
                s.localBounds
        },
        getBounds(s, t) {
            return Jn(this, s, t || new Ft)
        }
    }
    , Ph = {
        _onRender: null,
        set onRender(s) {
            const t = this.renderGroup || this.parentRenderGroup;
            if (!s) {
                this._onRender && (t == null || t.removeOnRender(this)),
                    this._onRender = null;
                return
            }
            this._onRender || t == null || t.addOnRender(this),
                this._onRender = s
        },
        get onRender() {
            return this._onRender
        }
    }
    , Th = {
        _zIndex: 0,
        sortDirty: !1,
        sortableChildren: !1,
        get zIndex() {
            return this._zIndex
        },
        set zIndex(s) {
            this._zIndex !== s && (this._zIndex = s,
                this.depthOfChildModified())
        },
        depthOfChildModified() {
            this.parent && (this.parent.sortableChildren = !0,
                this.parent.sortDirty = !0),
                this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0)
        },
        sortChildren() {
            this.sortDirty && (this.sortDirty = !1,
                this.children.sort(Mh))
        }
    };
function Mh(s, t) {
    return s._zIndex - t._zIndex
}
const kh = {
    getGlobalPosition(s = new pt, t = !1) {
        return this.parent ? this.parent.toGlobal(this._position, s, t) : (s.x = this._position.x,
            s.y = this._position.y),
            s
    },
    toGlobal(s, t, e = !1) {
        const i = this.getGlobalTransform(_t.get(), e);
        return t = i.apply(s, t),
            _t.return(i),
            t
    },
    toLocal(s, t, e, i) {
        t && (s = t.toGlobal(s, e, i));
        const r = this.getGlobalTransform(_t.get(), i);
        return e = r.applyInverse(s, e),
            _t.return(r),
            e
    }
};
class no {
    constructor() {
        this.uid = tt("instructionSet"),
            this.instructions = [],
            this.instructionSize = 0,
            this.renderables = [],
            this.gcTick = 0
    }
    reset() {
        this.instructionSize = 0
    }
    destroy() {
        this.instructions.length = 0,
            this.renderables.length = 0,
            this.renderPipes = null,
            this.gcTick = 0
    }
    add(t) {
        this.instructions[this.instructionSize++] = t
    }
    log() {
        this.instructions.length = this.instructionSize,
            console.table(this.instructions, ["type", "action"])
    }
}
let Eh = 0;
class Ih {
    constructor(t) {
        this._poolKeyHash = Object.create(null),
            this._texturePool = {},
            this.textureOptions = t || {},
            this.enableFullScreen = !1,
            this.textureStyle = new Be(this.textureOptions)
    }
    createTexture(t, e, i) {
        const r = new Rt({
            ...this.textureOptions,
            width: t,
            height: e,
            resolution: 1,
            antialias: i,
            autoGarbageCollect: !1
        });
        return new W({
            source: r,
            label: `texturePool_${Eh++}`
        })
    }
    getOptimalTexture(t, e, i = 1, r) {
        let n = Math.ceil(t * i - 1e-6)
            , o = Math.ceil(e * i - 1e-6);
        n = Ie(n),
            o = Ie(o);
        const a = (n << 17) + (o << 1) + (r ? 1 : 0);
        this._texturePool[a] || (this._texturePool[a] = []);
        let h = this._texturePool[a].pop();
        return h || (h = this.createTexture(n, o, r)),
            h.source._resolution = i,
            h.source.width = n / i,
            h.source.height = o / i,
            h.source.pixelWidth = n,
            h.source.pixelHeight = o,
            h.frame.x = 0,
            h.frame.y = 0,
            h.frame.width = t,
            h.frame.height = e,
            h.updateUvs(),
            this._poolKeyHash[h.uid] = a,
            h
    }
    getSameSizeTexture(t, e = !1) {
        const i = t.source;
        return this.getOptimalTexture(t.width, t.height, i._resolution, e)
    }
    returnTexture(t, e = !1) {
        const i = this._poolKeyHash[t.uid];
        e && (t.source.style = this.textureStyle),
            this._texturePool[i].push(t)
    }
    clear(t) {
        if (t = t !== !1,
            t)
            for (const e in this._texturePool) {
                const i = this._texturePool[e];
                if (i)
                    for (let r = 0; r < i.length; r++)
                        i[r].destroy(!0)
            }
        this._texturePool = {}
    }
}
const oo = new Ih;
_s.register(oo);
class Bh {
    constructor() {
        this.renderPipeId = "renderGroup",
            this.root = null,
            this.canBundle = !1,
            this.renderGroupParent = null,
            this.renderGroupChildren = [],
            this.worldTransform = new D,
            this.worldColorAlpha = 4294967295,
            this.worldColor = 16777215,
            this.worldAlpha = 1,
            this.childrenToUpdate = Object.create(null),
            this.updateTick = 0,
            this.gcTick = 0,
            this.childrenRenderablesToUpdate = {
                list: [],
                index: 0
            },
            this.structureDidChange = !0,
            this.instructionSet = new no,
            this._onRenderContainers = [],
            this.textureNeedsUpdate = !0,
            this.isCachedAsTexture = !1,
            this._matrixDirty = 7
    }
    init(t) {
        this.root = t,
            t._onRender && this.addOnRender(t),
            t.didChange = !0;
        const e = t.children;
        for (let i = 0; i < e.length; i++) {
            const r = e[i];
            r._updateFlags = 15,
                this.addChild(r)
        }
    }
    enableCacheAsTexture(t = {}) {
        this.textureOptions = t,
            this.isCachedAsTexture = !0,
            this.textureNeedsUpdate = !0
    }
    disableCacheAsTexture() {
        this.isCachedAsTexture = !1,
            this.texture && (oo.returnTexture(this.texture, !0),
                this.texture = null)
    }
    updateCacheTexture() {
        this.textureNeedsUpdate = !0;
        const t = this._parentCacheAsTextureRenderGroup;
        t && !t.textureNeedsUpdate && t.updateCacheTexture()
    }
    reset() {
        this.renderGroupChildren.length = 0;
        for (const t in this.childrenToUpdate) {
            const e = this.childrenToUpdate[t];
            e.list.fill(null),
                e.index = 0
        }
        this.childrenRenderablesToUpdate.index = 0,
            this.childrenRenderablesToUpdate.list.fill(null),
            this.root = null,
            this.updateTick = 0,
            this.structureDidChange = !0,
            this._onRenderContainers.length = 0,
            this.renderGroupParent = null,
            this.disableCacheAsTexture()
    }
    get localTransform() {
        return this.root.localTransform
    }
    addRenderGroupChild(t) {
        t.renderGroupParent && t.renderGroupParent._removeRenderGroupChild(t),
            t.renderGroupParent = this,
            this.renderGroupChildren.push(t)
    }
    _removeRenderGroupChild(t) {
        const e = this.renderGroupChildren.indexOf(t);
        e > -1 && this.renderGroupChildren.splice(e, 1),
            t.renderGroupParent = null
    }
    addChild(t) {
        if (this.structureDidChange = !0,
            t.parentRenderGroup = this,
            t.updateTick = -1,
            t.parent === this.root ? t.relativeRenderGroupDepth = 1 : t.relativeRenderGroupDepth = t.parent.relativeRenderGroupDepth + 1,
            t.didChange = !0,
            this.onChildUpdate(t),
            t.renderGroup) {
            this.addRenderGroupChild(t.renderGroup);
            return
        }
        t._onRender && this.addOnRender(t);
        const e = t.children;
        for (let i = 0; i < e.length; i++)
            this.addChild(e[i])
    }
    removeChild(t) {
        if (this.structureDidChange = !0,
            t._onRender && (t.renderGroup || this.removeOnRender(t)),
            t.parentRenderGroup = null,
            t.renderGroup) {
            this._removeRenderGroupChild(t.renderGroup);
            return
        }
        const e = t.children;
        for (let i = 0; i < e.length; i++)
            this.removeChild(e[i])
    }
    removeChildren(t) {
        for (let e = 0; e < t.length; e++)
            this.removeChild(t[e])
    }
    onChildUpdate(t) {
        let e = this.childrenToUpdate[t.relativeRenderGroupDepth];
        e || (e = this.childrenToUpdate[t.relativeRenderGroupDepth] = {
            index: 0,
            list: []
        }),
            e.list[e.index++] = t
    }
    updateRenderable(t) {
        t.globalDisplayStatus < 7 || (this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t),
            t.didViewUpdate = !1)
    }
    onChildViewUpdate(t) {
        this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = t
    }
    get isRenderable() {
        return this.root.localDisplayStatus === 7 && this.worldAlpha > 0
    }
    addOnRender(t) {
        this._onRenderContainers.push(t)
    }
    removeOnRender(t) {
        this._onRenderContainers.splice(this._onRenderContainers.indexOf(t), 1)
    }
    runOnRender(t) {
        for (let e = 0; e < this._onRenderContainers.length; e++)
            this._onRenderContainers[e]._onRender(t)
    }
    destroy() {
        this.disableCacheAsTexture(),
            this.renderGroupParent = null,
            this.root = null,
            this.childrenRenderablesToUpdate = null,
            this.childrenToUpdate = null,
            this.renderGroupChildren = null,
            this._onRenderContainers = null,
            this.instructionSet = null
    }
    getChildren(t = []) {
        const e = this.root.children;
        for (let i = 0; i < e.length; i++)
            this._getChildren(e[i], t);
        return t
    }
    _getChildren(t, e = []) {
        if (e.push(t),
            t.renderGroup)
            return e;
        const i = t.children;
        for (let r = 0; r < i.length; r++)
            this._getChildren(i[r], e);
        return e
    }
    invalidateMatrices() {
        this._matrixDirty = 7
    }
    get inverseWorldTransform() {
        return (this._matrixDirty & 1) === 0 ? this._inverseWorldTransform : (this._matrixDirty &= -2,
            this._inverseWorldTransform || (this._inverseWorldTransform = new D),
            this._inverseWorldTransform.copyFrom(this.worldTransform).invert())
    }
    get textureOffsetInverseTransform() {
        return (this._matrixDirty & 2) === 0 ? this._textureOffsetInverseTransform : (this._matrixDirty &= -3,
            this._textureOffsetInverseTransform || (this._textureOffsetInverseTransform = new D),
            this._textureOffsetInverseTransform.copyFrom(this.inverseWorldTransform).translate(-this._textureBounds.x, -this._textureBounds.y))
    }
    get inverseParentTextureTransform() {
        if ((this._matrixDirty & 4) === 0)
            return this._inverseParentTextureTransform;
        this._matrixDirty &= -5;
        const t = this._parentCacheAsTextureRenderGroup;
        return t ? (this._inverseParentTextureTransform || (this._inverseParentTextureTransform = new D),
            this._inverseParentTextureTransform.copyFrom(this.worldTransform).prepend(t.inverseWorldTransform).translate(-t._textureBounds.x, -t._textureBounds.y)) : this.worldTransform
    }
    get cacheToLocalTransform() {
        return this.isCachedAsTexture ? this.textureOffsetInverseTransform : this._parentCacheAsTextureRenderGroup ? this._parentCacheAsTextureRenderGroup.textureOffsetInverseTransform : null
    }
}
function Fh(s, t, e = {}) {
    for (const i in t)
        !e[i] && t[i] !== void 0 && (s[i] = t[i])
}
const gi = new at(null)
    , ks = new at(null)
    , _i = new at(null, 1, 1)
    , Es = new at(null)
    , zr = 1
    , Rh = 2
    , xi = 4;
class ut extends mt {
    constructor(t = {}) {
        var e, i;
        super(),
            this.uid = tt("renderable"),
            this._updateFlags = 15,
            this.renderGroup = null,
            this.parentRenderGroup = null,
            this.parentRenderGroupIndex = 0,
            this.didChange = !1,
            this.didViewUpdate = !1,
            this.relativeRenderGroupDepth = 0,
            this.children = [],
            this.parent = null,
            this.includeInBuild = !0,
            this.measurable = !0,
            this.isSimple = !0,
            this.parentRenderLayer = null,
            this.updateTick = -1,
            this.localTransform = new D,
            this.relativeGroupTransform = new D,
            this.groupTransform = this.relativeGroupTransform,
            this.destroyed = !1,
            this._position = new at(this, 0, 0),
            this._scale = _i,
            this._pivot = ks,
            this._origin = Es,
            this._skew = gi,
            this._cx = 1,
            this._sx = 0,
            this._cy = 0,
            this._sy = 1,
            this._rotation = 0,
            this.localColor = 16777215,
            this.localAlpha = 1,
            this.groupAlpha = 1,
            this.groupColor = 16777215,
            this.groupColorAlpha = 4294967295,
            this.localBlendMode = "inherit",
            this.groupBlendMode = "normal",
            this.localDisplayStatus = 7,
            this.globalDisplayStatus = 7,
            this._didContainerChangeTick = 0,
            this._didViewChangeTick = 0,
            this._didLocalTransformChangeId = -1,
            this.effects = [],
            Fh(this, t, {
                children: !0,
                parent: !0,
                effects: !0
            }),
            (e = t.children) == null || e.forEach(r => this.addChild(r)),
            (i = t.parent) == null || i.addChild(this)
    }
    static mixin(t) {
        U("8.8.0", "Container.mixin is deprecated, please use extensions.mixin instead."),
            lt.mixin(ut, t)
    }
    set _didChangeId(t) {
        this._didViewChangeTick = t >> 12 & 4095,
            this._didContainerChangeTick = t & 4095
    }
    get _didChangeId() {
        return this._didContainerChangeTick & 4095 | (this._didViewChangeTick & 4095) << 12
    }
    addChild(...t) {
        if (this.allowChildren || U(V, "addChild: Only Containers will be allowed to add children in v8.0.0"),
            t.length > 1) {
            for (let r = 0; r < t.length; r++)
                this.addChild(t[r]);
            return t[0]
        }
        const e = t[0]
            , i = this.renderGroup || this.parentRenderGroup;
        return e.parent === this ? (this.children.splice(this.children.indexOf(e), 1),
            this.children.push(e),
            i && (i.structureDidChange = !0),
            e) : (e.parent && e.parent.removeChild(e),
                this.children.push(e),
                this.sortableChildren && (this.sortDirty = !0),
                e.parent = this,
                e.didChange = !0,
                e._updateFlags = 15,
                i && i.addChild(e),
                this.emit("childAdded", e, this, this.children.length - 1),
                e.emit("added", this),
                this._didViewChangeTick++,
                e._zIndex !== 0 && e.depthOfChildModified(),
                e)
    }
    removeChild(...t) {
        if (t.length > 1) {
            for (let r = 0; r < t.length; r++)
                this.removeChild(t[r]);
            return t[0]
        }
        const e = t[0]
            , i = this.children.indexOf(e);
        return i > -1 && (this._didViewChangeTick++,
            this.children.splice(i, 1),
            this.renderGroup ? this.renderGroup.removeChild(e) : this.parentRenderGroup && this.parentRenderGroup.removeChild(e),
            e.parentRenderLayer && e.parentRenderLayer.detach(e),
            e.parent = null,
            this.emit("childRemoved", e, this, i),
            e.emit("removed", this)),
            e
    }
    _onUpdate(t) {
        t && t === this._skew && this._updateSkew(),
            this._didContainerChangeTick++,
            !this.didChange && (this.didChange = !0,
                this.parentRenderGroup && this.parentRenderGroup.onChildUpdate(this))
    }
    set isRenderGroup(t) {
        !!this.renderGroup !== t && (t ? this.enableRenderGroup() : this.disableRenderGroup())
    }
    get isRenderGroup() {
        return !!this.renderGroup
    }
    enableRenderGroup() {
        if (this.renderGroup)
            return;
        const t = this.parentRenderGroup;
        t == null || t.removeChild(this),
            this.renderGroup = Et.get(Bh, this),
            this.groupTransform = D.IDENTITY,
            t == null || t.addChild(this),
            this._updateIsSimple()
    }
    disableRenderGroup() {
        if (!this.renderGroup)
            return;
        const t = this.parentRenderGroup;
        t == null || t.removeChild(this),
            Et.return(this.renderGroup),
            this.renderGroup = null,
            this.groupTransform = this.relativeGroupTransform,
            t == null || t.addChild(this),
            this._updateIsSimple()
    }
    _updateIsSimple() {
        this.isSimple = !this.renderGroup && this.effects.length === 0
    }
    get worldTransform() {
        return this._worldTransform || (this._worldTransform = new D),
            this.renderGroup ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this.parentRenderGroup && this._worldTransform.appendFrom(this.relativeGroupTransform, this.parentRenderGroup.worldTransform),
            this._worldTransform
    }
    get x() {
        return this._position.x
    }
    set x(t) {
        this._position.x = t
    }
    get y() {
        return this._position.y
    }
    set y(t) {
        this._position.y = t
    }
    get position() {
        return this._position
    }
    set position(t) {
        this._position.copyFrom(t)
    }
    get rotation() {
        return this._rotation
    }
    set rotation(t) {
        this._rotation !== t && (this._rotation = t,
            this._onUpdate(this._skew))
    }
    get angle() {
        return this.rotation * Xa
    }
    set angle(t) {
        this.rotation = t * ja
    }
    get pivot() {
        return this._pivot === ks && (this._pivot = new at(this, 0, 0)),
            this._pivot
    }
    set pivot(t) {
        this._pivot === ks && (this._pivot = new at(this, 0, 0),
            this._origin !== Es && q("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),
            typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t)
    }
    get skew() {
        return this._skew === gi && (this._skew = new at(this, 0, 0)),
            this._skew
    }
    set skew(t) {
        this._skew === gi && (this._skew = new at(this, 0, 0)),
            this._skew.copyFrom(t)
    }
    get scale() {
        return this._scale === _i && (this._scale = new at(this, 1, 1)),
            this._scale
    }
    set scale(t) {
        this._scale === _i && (this._scale = new at(this, 0, 0)),
            typeof t == "string" && (t = parseFloat(t)),
            typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t)
    }
    get origin() {
        return this._origin === Es && (this._origin = new at(this, 0, 0)),
            this._origin
    }
    set origin(t) {
        this._origin === Es && (this._origin = new at(this, 0, 0),
            this._pivot !== ks && q("Setting both a pivot and origin on a Container is not recommended. This can lead to unexpected behavior if not handled carefully.")),
            typeof t == "number" ? this._origin.set(t) : this._origin.copyFrom(t)
    }
    get width() {
        return Math.abs(this.scale.x * this.getLocalBounds().width)
    }
    set width(t) {
        const e = this.getLocalBounds().width;
        this._setWidth(t, e)
    }
    get height() {
        return Math.abs(this.scale.y * this.getLocalBounds().height)
    }
    set height(t) {
        const e = this.getLocalBounds().height;
        this._setHeight(t, e)
    }
    getSize(t) {
        t || (t = {});
        const e = this.getLocalBounds();
        return t.width = Math.abs(this.scale.x * e.width),
            t.height = Math.abs(this.scale.y * e.height),
            t
    }
    setSize(t, e) {
        const i = this.getLocalBounds();
        typeof t == "object" ? (e = t.height ?? t.width,
            t = t.width) : e ?? (e = t),
            t !== void 0 && this._setWidth(t, i.width),
            e !== void 0 && this._setHeight(e, i.height)
    }
    _updateSkew() {
        const t = this._rotation
            , e = this._skew;
        this._cx = Math.cos(t + e._y),
            this._sx = Math.sin(t + e._y),
            this._cy = -Math.sin(t - e._x),
            this._sy = Math.cos(t - e._x)
    }
    updateTransform(t) {
        return this.position.set(typeof t.x == "number" ? t.x : this.position.x, typeof t.y == "number" ? t.y : this.position.y),
            this.scale.set(typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x, typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y),
            this.rotation = typeof t.rotation == "number" ? t.rotation : this.rotation,
            this.skew.set(typeof t.skewX == "number" ? t.skewX : this.skew.x, typeof t.skewY == "number" ? t.skewY : this.skew.y),
            this.pivot.set(typeof t.pivotX == "number" ? t.pivotX : this.pivot.x, typeof t.pivotY == "number" ? t.pivotY : this.pivot.y),
            this.origin.set(typeof t.originX == "number" ? t.originX : this.origin.x, typeof t.originY == "number" ? t.originY : this.origin.y),
            this
    }
    setFromMatrix(t) {
        t.decompose(this)
    }
    updateLocalTransform() {
        const t = this._didContainerChangeTick;
        if (this._didLocalTransformChangeId === t)
            return;
        this._didLocalTransformChangeId = t;
        const e = this.localTransform
            , i = this._scale
            , r = this._pivot
            , n = this._origin
            , o = this._position
            , a = i._x
            , h = i._y
            , l = r._x
            , c = r._y
            , u = -n._x
            , f = -n._y;
        e.a = this._cx * a,
            e.b = this._sx * a,
            e.c = this._cy * h,
            e.d = this._sy * h,
            e.tx = o._x - (l * e.a + c * e.c) + (u * e.a + f * e.c) - u,
            e.ty = o._y - (l * e.b + c * e.d) + (u * e.b + f * e.d) - f
    }
    set alpha(t) {
        t !== this.localAlpha && (this.localAlpha = t,
            this._updateFlags |= zr,
            this._onUpdate())
    }
    get alpha() {
        return this.localAlpha
    }
    set tint(t) {
        const i = it.shared.setValue(t ?? 16777215).toBgrNumber();
        i !== this.localColor && (this.localColor = i,
            this._updateFlags |= zr,
            this._onUpdate())
    }
    get tint() {
        return Us(this.localColor)
    }
    set blendMode(t) {
        this.localBlendMode !== t && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0),
            this._updateFlags |= Rh,
            this.localBlendMode = t,
            this._onUpdate())
    }
    get blendMode() {
        return this.localBlendMode
    }
    get visible() {
        return !!(this.localDisplayStatus & 2)
    }
    set visible(t) {
        const e = t ? 2 : 0;
        (this.localDisplayStatus & 2) !== e && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0),
            this._updateFlags |= xi,
            this.localDisplayStatus ^= 2,
            this._onUpdate())
    }
    get culled() {
        return !(this.localDisplayStatus & 4)
    }
    set culled(t) {
        const e = t ? 0 : 4;
        (this.localDisplayStatus & 4) !== e && (this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0),
            this._updateFlags |= xi,
            this.localDisplayStatus ^= 4,
            this._onUpdate())
    }
    get renderable() {
        return !!(this.localDisplayStatus & 1)
    }
    set renderable(t) {
        const e = t ? 1 : 0;
        (this.localDisplayStatus & 1) !== e && (this._updateFlags |= xi,
            this.localDisplayStatus ^= 1,
            this.parentRenderGroup && (this.parentRenderGroup.structureDidChange = !0),
            this._onUpdate())
    }
    get isRenderable() {
        return this.localDisplayStatus === 7 && this.groupAlpha > 0
    }
    destroy(t = !1) {
        var r;
        if (this.destroyed)
            return;
        this.destroyed = !0;
        let e;
        if (this.children.length && (e = this.removeChildren(0, this.children.length)),
            this.removeFromParent(),
            this.parent = null,
            this._maskEffect = null,
            this._filterEffect = null,
            this.effects = null,
            this._position = null,
            this._scale = null,
            this._pivot = null,
            this._origin = null,
            this._skew = null,
            this.emit("destroyed", this),
            this.removeAllListeners(),
            (typeof t == "boolean" ? t : t == null ? void 0 : t.children) && e)
            for (let n = 0; n < e.length; ++n)
                e[n].destroy(t);
        (r = this.renderGroup) == null || r.destroy(),
            this.renderGroup = null
    }
}
lt.mixin(ut, gh, Ah, kh, Ph, Ch, yh, bh, Th, uh, ph, Sh, _h);
class Js extends ut {
    constructor(t) {
        super(t),
            this.canBundle = !0,
            this.allowChildren = !1,
            this._roundPixels = 0,
            this._lastUsed = -1,
            this._gpuData = Object.create(null),
            this.autoGarbageCollect = !0,
            this._gcLastUsed = -1,
            this._bounds = new Ft(0, 1, 0, 0),
            this._boundsDirty = !0,
            this.autoGarbageCollect = t.autoGarbageCollect ?? !0
    }
    get bounds() {
        return this._boundsDirty ? (this.updateBounds(),
            this._boundsDirty = !1,
            this._bounds) : this._bounds
    }
    get roundPixels() {
        return !!this._roundPixels
    }
    set roundPixels(t) {
        this._roundPixels = t ? 1 : 0
    }
    containsPoint(t) {
        const e = this.bounds
            , { x: i, y: r } = t;
        return i >= e.minX && i <= e.maxX && r >= e.minY && r <= e.maxY
    }
    onViewUpdate() {
        if (this._didViewChangeTick++,
            this._boundsDirty = !0,
            this.didViewUpdate)
            return;
        this.didViewUpdate = !0;
        const t = this.renderGroup || this.parentRenderGroup;
        t && t.onChildViewUpdate(this)
    }
    unload() {
        var t;
        this.emit("unload", this);
        for (const e in this._gpuData)
            (t = this._gpuData[e]) == null || t.destroy();
        this._gpuData = Object.create(null),
            this.onViewUpdate()
    }
    destroy(t) {
        this.unload(),
            super.destroy(t),
            this._bounds = null
    }
    collectRenderablesSimple(t, e, i) {
        const { renderPipes: r } = e;
        r.blendMode.pushBlendMode(this, this.groupBlendMode, t),
            r[this.renderPipeId].addRenderable(this, t),
            this.didViewUpdate = !1;
        const o = this.children
            , a = o.length;
        for (let h = 0; h < a; h++)
            o[h].collectRenderables(t, e, i);
        r.blendMode.popBlendMode(t)
    }
}
class ot extends Js {
    constructor(t = W.EMPTY) {
        t instanceof W && (t = {
            texture: t
        });
        const { texture: e = W.EMPTY, anchor: i, roundPixels: r, width: n, height: o, ...a } = t;
        super({
            label: "Sprite",
            ...a
        }),
            this.renderPipeId = "sprite",
            this.batched = !0,
            this._visualBounds = {
                minX: 0,
                maxX: 1,
                minY: 0,
                maxY: 0
            },
            this._anchor = new at({
                _onUpdate: () => {
                    this.onViewUpdate()
                }
            }),
            i ? this.anchor = i : e.defaultAnchor && (this.anchor = e.defaultAnchor),
            this.texture = e,
            this.allowChildren = !1,
            this.roundPixels = r ?? !1,
            n !== void 0 && (this.width = n),
            o !== void 0 && (this.height = o)
    }
    static from(t, e = !1) {
        return t instanceof W ? new ot(t) : new ot(W.from(t, e))
    }
    set texture(t) {
        t || (t = W.EMPTY);
        const e = this._texture;
        e !== t && (e && e.dynamic && e.off("update", this.onViewUpdate, this),
            t.dynamic && t.on("update", this.onViewUpdate, this),
            this._texture = t,
            this._width && this._setWidth(this._width, this._texture.orig.width),
            this._height && this._setHeight(this._height, this._texture.orig.height),
            this.onViewUpdate())
    }
    get texture() {
        return this._texture
    }
    get visualBounds() {
        return eh(this._visualBounds, this._anchor, this._texture),
            this._visualBounds
    }
    get sourceBounds() {
        return U("8.6.1", "Sprite.sourceBounds is deprecated, use visualBounds instead."),
            this.visualBounds
    }
    updateBounds() {
        const t = this._anchor
            , e = this._texture
            , i = this._bounds
            , { width: r, height: n } = e.orig;
        i.minX = -t._x * r,
            i.maxX = i.minX + r,
            i.minY = -t._y * n,
            i.maxY = i.minY + n
    }
    destroy(t = !1) {
        if (super.destroy(t),
            typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
            const i = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
            this._texture.destroy(i)
        }
        this._texture = null,
            this._visualBounds = null,
            this._bounds = null,
            this._anchor = null
    }
    get anchor() {
        return this._anchor
    }
    set anchor(t) {
        typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t)
    }
    get width() {
        return Math.abs(this.scale.x) * this._texture.orig.width
    }
    set width(t) {
        this._setWidth(t, this._texture.orig.width),
            this._width = t
    }
    get height() {
        return Math.abs(this.scale.y) * this._texture.orig.height
    }
    set height(t) {
        this._setHeight(t, this._texture.orig.height),
            this._height = t
    }
    getSize(t) {
        return t || (t = {}),
            t.width = Math.abs(this.scale.x) * this._texture.orig.width,
            t.height = Math.abs(this.scale.y) * this._texture.orig.height,
            t
    }
    setSize(t, e) {
        typeof t == "object" ? (e = t.height ?? t.width,
            t = t.width) : e ?? (e = t),
            t !== void 0 && this._setWidth(t, this._texture.orig.width),
            e !== void 0 && this._setHeight(e, this._texture.orig.height)
    }
}
const Lh = new Ft;
function ao(s, t, e) {
    const i = Lh;
    s.measurable = !0,
        Jn(s, e, i),
        t.addBoundsMask(i),
        s.measurable = !1
}
function ho(s, t, e) {
    const i = Qt.get();
    s.measurable = !0;
    const r = _t.get().identity()
        , n = lo(s, e, r);
    so(s, i, n),
        s.measurable = !1,
        t.addBoundsMask(i),
        _t.return(r),
        Qt.return(i)
}
function lo(s, t, e) {
    return s ? (s !== t && (lo(s.parent, t, e),
        s.updateLocalTransform(),
        e.append(s.localTransform)),
        e) : (q("Mask bounds, renderable is not inside the root container"),
            e)
}
class co {
    constructor(t) {
        this.priority = 0,
            this.inverse = !1,
            this.pipe = "alphaMask",
            t != null && t.mask && this.init(t.mask)
    }
    init(t) {
        this.mask = t,
            this.renderMaskToTexture = !(t instanceof ot),
            this.mask.renderable = this.renderMaskToTexture,
            this.mask.includeInBuild = !this.renderMaskToTexture,
            this.mask.measurable = !1
    }
    reset() {
        this.mask !== null && (this.mask.measurable = !0,
            this.mask = null)
    }
    addBounds(t, e) {
        this.inverse || ao(this.mask, t, e)
    }
    addLocalBounds(t, e) {
        ho(this.mask, t, e)
    }
    containsPoint(t, e) {
        const i = this.mask;
        return e(i, t)
    }
    destroy() {
        this.reset()
    }
    static test(t) {
        return t instanceof ot
    }
}
co.extension = B.MaskEffect;
class uo {
    constructor(t) {
        this.priority = 0,
            this.pipe = "colorMask",
            t != null && t.mask && this.init(t.mask)
    }
    init(t) {
        this.mask = t
    }
    destroy() { }
    static test(t) {
        return typeof t == "number"
    }
}
uo.extension = B.MaskEffect;
class fo {
    constructor(t) {
        this.priority = 0,
            this.pipe = "stencilMask",
            t != null && t.mask && this.init(t.mask)
    }
    init(t) {
        this.mask = t,
            this.mask.includeInBuild = !1,
            this.mask.measurable = !1
    }
    reset() {
        this.mask !== null && (this.mask.measurable = !0,
            this.mask.includeInBuild = !0,
            this.mask = null)
    }
    addBounds(t, e) {
        ao(this.mask, t, e)
    }
    addLocalBounds(t, e) {
        ho(this.mask, t, e)
    }
    containsPoint(t, e) {
        const i = this.mask;
        return e(i, t)
    }
    destroy() {
        this.reset()
    }
    static test(t) {
        return t instanceof ut
    }
}
fo.extension = B.MaskEffect;
const Gh = {
    createCanvas: (s, t) => {
        const e = document.createElement("canvas");
        return e.width = s,
            e.height = t,
            e
    }
    ,
    createImage: () => new Image,
    getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
    getWebGLRenderingContext: () => WebGLRenderingContext,
    getNavigator: () => navigator,
    getBaseUrl: () => document.baseURI ?? window.location.href,
    getFontFaceSet: () => document.fonts,
    fetch: (s, t) => fetch(s, t),
    parseXML: s => new DOMParser().parseFromString(s, "text/xml")
};
let Hr = Gh;
const X = {
    get() {
        return Hr
    },
    set(s) {
        Hr = s
    }
};
class po extends Rt {
    constructor(t) {
        t.resource || (t.resource = X.get().createCanvas()),
            t.width || (t.width = t.resource.width,
                t.autoDensity || (t.width /= t.resolution)),
            t.height || (t.height = t.resource.height,
                t.autoDensity || (t.height /= t.resolution)),
            super(t),
            this.uploadMethodId = "image",
            this.autoDensity = t.autoDensity,
            this.resizeCanvas(),
            this.transparent = !!t.transparent
    }
    resizeCanvas() {
        this.autoDensity && "style" in this.resource && (this.resource.style.width = `${this.width}px`,
            this.resource.style.height = `${this.height}px`),
            (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth,
                this.resource.height = this.pixelHeight)
    }
    resize(t = this.width, e = this.height, i = this._resolution) {
        const r = super.resize(t, e, i);
        return r && this.resizeCanvas(),
            r
    }
    static test(t) {
        return globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && t instanceof OffscreenCanvas
    }
    get context2D() {
        return this._context2D || (this._context2D = this.resource.getContext("2d"))
    }
}
po.extension = B.TextureSource;
class ge extends Rt {
    constructor(t) {
        super(t),
            this.uploadMethodId = "image",
            this.autoGarbageCollect = !0
    }
    static test(t) {
        return globalThis.HTMLImageElement && t instanceof HTMLImageElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap || globalThis.VideoFrame && t instanceof VideoFrame
    }
}
ge.extension = B.TextureSource;
var Ns = (s => (s[s.INTERACTION = 50] = "INTERACTION",
    s[s.HIGH = 25] = "HIGH",
    s[s.NORMAL = 0] = "NORMAL",
    s[s.LOW = -25] = "LOW",
    s[s.UTILITY = -50] = "UTILITY",
    s))(Ns || {});
class yi {
    constructor(t, e = null, i = 0, r = !1) {
        this.next = null,
            this.previous = null,
            this._destroyed = !1,
            this._fn = t,
            this._context = e,
            this.priority = i,
            this._once = r
    }
    match(t, e = null) {
        return this._fn === t && this._context === e
    }
    emit(t) {
        this._fn && (this._context ? this._fn.call(this._context, t) : this._fn(t));
        const e = this.next;
        return this._once && this.destroy(!0),
            this._destroyed && (this.next = null),
            e
    }
    connect(t) {
        this.previous = t,
            t.next && (t.next.previous = this),
            this.next = t.next,
            t.next = this
    }
    destroy(t = !1) {
        this._destroyed = !0,
            this._fn = null,
            this._context = null,
            this.previous && (this.previous.next = this.next),
            this.next && (this.next.previous = this.previous);
        const e = this.next;
        return this.next = t ? null : e,
            this.previous = null,
            e
    }
}
const mo = class wt {
    constructor() {
        this.autoStart = !1,
            this.deltaTime = 1,
            this.lastTime = -1,
            this.speed = 1,
            this.started = !1,
            this._requestId = null,
            this._maxElapsedMS = 100,
            this._minElapsedMS = 0,
            this._protected = !1,
            this._lastFrame = -1,
            this._head = new yi(null, null, 1 / 0),
            this.deltaMS = 1 / wt.targetFPMS,
            this.elapsedMS = 1 / wt.targetFPMS,
            this._tick = t => {
                this._requestId = null,
                    this.started && (this.update(t),
                        this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)))
            }
    }
    _requestIfNeeded() {
        this._requestId === null && this._head.next && (this.lastTime = performance.now(),
            this._lastFrame = this.lastTime,
            this._requestId = requestAnimationFrame(this._tick))
    }
    _cancelIfNeeded() {
        this._requestId !== null && (cancelAnimationFrame(this._requestId),
            this._requestId = null)
    }
    _startIfPossible() {
        this.started ? this._requestIfNeeded() : this.autoStart && this.start()
    }
    add(t, e, i = Ns.NORMAL) {
        return this._addListener(new yi(t, e, i))
    }
    addOnce(t, e, i = Ns.NORMAL) {
        return this._addListener(new yi(t, e, i, !0))
    }
    _addListener(t) {
        let e = this._head.next
            , i = this._head;
        if (!e)
            t.connect(i);
        else {
            for (; e;) {
                if (t.priority > e.priority) {
                    t.connect(i);
                    break
                }
                i = e,
                    e = e.next
            }
            t.previous || t.connect(i)
        }
        return this._startIfPossible(),
            this
    }
    remove(t, e) {
        let i = this._head.next;
        for (; i;)
            i.match(t, e) ? i = i.destroy() : i = i.next;
        return this._head.next || this._cancelIfNeeded(),
            this
    }
    get count() {
        if (!this._head)
            return 0;
        let t = 0
            , e = this._head;
        for (; e = e.next;)
            t++;
        return t
    }
    start() {
        this.started || (this.started = !0,
            this._requestIfNeeded())
    }
    stop() {
        this.started && (this.started = !1,
            this._cancelIfNeeded())
    }
    destroy() {
        if (!this._protected) {
            this.stop();
            let t = this._head.next;
            for (; t;)
                t = t.destroy(!0);
            this._head.destroy(),
                this._head = null
        }
    }
    update(t = performance.now()) {
        let e;
        if (t > this.lastTime) {
            if (e = this.elapsedMS = t - this.lastTime,
                e > this._maxElapsedMS && (e = this._maxElapsedMS),
                e *= this.speed,
                this._minElapsedMS) {
                const n = t - this._lastFrame | 0;
                if (n < this._minElapsedMS)
                    return;
                this._lastFrame = t - n % this._minElapsedMS
            }
            this.deltaMS = e,
                this.deltaTime = this.deltaMS * wt.targetFPMS;
            const i = this._head;
            let r = i.next;
            for (; r;)
                r = r.emit(this);
            i.next || this._cancelIfNeeded()
        } else
            this.deltaTime = this.deltaMS = this.elapsedMS = 0;
        this.lastTime = t
    }
    get FPS() {
        return 1e3 / this.elapsedMS
    }
    get minFPS() {
        return 1e3 / this._maxElapsedMS
    }
    set minFPS(t) {
        const e = Math.min(this.maxFPS, t)
            , i = Math.min(Math.max(0, e) / 1e3, wt.targetFPMS);
        this._maxElapsedMS = 1 / i
    }
    get maxFPS() {
        return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
    }
    set maxFPS(t) {
        if (t === 0)
            this._minElapsedMS = 0;
        else {
            const e = Math.max(this.minFPS, t);
            this._minElapsedMS = 1 / (e / 1e3)
        }
    }
    static get shared() {
        if (!wt._shared) {
            const t = wt._shared = new wt;
            t.autoStart = !0,
                t._protected = !0
        }
        return wt._shared
    }
    static get system() {
        if (!wt._system) {
            const t = wt._system = new wt;
            t.autoStart = !0,
                t._protected = !0
        }
        return wt._system
    }
}
    ;
mo.targetFPMS = .06;
let At = mo, bi;
async function go() {
    return bi ?? (bi = (async () => {
        var o;
        const t = X.get().createCanvas(1, 1).getContext("webgl");
        if (!t)
            return "premultiply-alpha-on-upload";
        const e = await new Promise(a => {
            const h = document.createElement("video");
            h.onloadeddata = () => a(h),
                h.onerror = () => a(null),
                h.autoplay = !1,
                h.crossOrigin = "anonymous",
                h.preload = "auto",
                h.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=",
                h.load()
        }
        );
        if (!e)
            return "premultiply-alpha-on-upload";
        const i = t.createTexture();
        t.bindTexture(t.TEXTURE_2D, i);
        const r = t.createFramebuffer();
        t.bindFramebuffer(t.FRAMEBUFFER, r),
            t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, i, 0),
            t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
            t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE),
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, e);
        const n = new Uint8Array(4);
        return t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, n),
            t.deleteFramebuffer(r),
            t.deleteTexture(i),
            (o = t.getExtension("WEBGL_lose_context")) == null || o.loseContext(),
            n[0] <= n[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload"
    }
    )()),
        bi
}
const ti = class _o extends Rt {
    constructor(t) {
        super(t),
            this.isReady = !1,
            this.uploadMethodId = "video",
            t = {
                ..._o.defaultOptions,
                ...t
            },
            this._autoUpdate = !0,
            this._isConnectedToTicker = !1,
            this._updateFPS = t.updateFPS || 0,
            this._msToNextUpdate = 0,
            this.autoPlay = t.autoPlay !== !1,
            this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload",
            this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this),
            this._videoFrameRequestCallbackHandle = null,
            this._load = null,
            this._resolve = null,
            this._reject = null,
            this._onCanPlay = this._onCanPlay.bind(this),
            this._onCanPlayThrough = this._onCanPlayThrough.bind(this),
            this._onError = this._onError.bind(this),
            this._onPlayStart = this._onPlayStart.bind(this),
            this._onPlayStop = this._onPlayStop.bind(this),
            this._onSeeked = this._onSeeked.bind(this),
            t.autoLoad !== !1 && this.load()
    }
    updateFrame() {
        if (!this.destroyed) {
            if (this._updateFPS) {
                const t = At.shared.elapsedMS * this.resource.playbackRate;
                this._msToNextUpdate = Math.floor(this._msToNextUpdate - t)
            }
            (!this._updateFPS || this._msToNextUpdate <= 0) && (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0),
                this.isValid && this.update()
        }
    }
    _videoFrameRequestCallback() {
        this.updateFrame(),
            this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback)
    }
    get isValid() {
        return !!this.resource.videoWidth && !!this.resource.videoHeight
    }
    async load() {
        if (this._load)
            return this._load;
        const t = this.resource
            , e = this.options;
        return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0),
            t.addEventListener("play", this._onPlayStart),
            t.addEventListener("pause", this._onPlayStop),
            t.addEventListener("seeked", this._onSeeked),
            this._isSourceReady() ? this._mediaReady() : (e.preload || t.addEventListener("canplay", this._onCanPlay),
                t.addEventListener("canplaythrough", this._onCanPlayThrough),
                t.addEventListener("error", this._onError, !0)),
            this.alphaMode = await go(),
            this._load = new Promise((i, r) => {
                this.isValid ? i(this) : (this._resolve = i,
                    this._reject = r,
                    e.preloadTimeoutMs !== void 0 && (this._preloadTimeout = setTimeout(() => {
                        this._onError(new ErrorEvent(`Preload exceeded timeout of ${e.preloadTimeoutMs}ms`))
                    }
                    )),
                    t.load())
            }
            ),
            this._load
    }
    _onError(t) {
        this.resource.removeEventListener("error", this._onError, !0),
            this.emit("error", t),
            this._reject && (this._reject(t),
                this._reject = null,
                this._resolve = null)
    }
    _isSourcePlaying() {
        const t = this.resource;
        return !t.paused && !t.ended
    }
    _isSourceReady() {
        return this.resource.readyState > 2
    }
    _onPlayStart() {
        this.isValid || this._mediaReady(),
            this._configureAutoUpdate()
    }
    _onPlayStop() {
        this._configureAutoUpdate()
    }
    _onSeeked() {
        this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0,
            this.updateFrame(),
            this._msToNextUpdate = 0)
    }
    _onCanPlay() {
        this.resource.removeEventListener("canplay", this._onCanPlay),
            this._mediaReady()
    }
    _onCanPlayThrough() {
        this.resource.removeEventListener("canplaythrough", this._onCanPlay),
            this._preloadTimeout && (clearTimeout(this._preloadTimeout),
                this._preloadTimeout = void 0),
            this._mediaReady()
    }
    _mediaReady() {
        const t = this.resource;
        this.isValid && (this.isReady = !0,
            this.resize(t.videoWidth, t.videoHeight)),
            this._msToNextUpdate = 0,
            this.updateFrame(),
            this._msToNextUpdate = 0,
            this._resolve && (this._resolve(this),
                this._resolve = null,
                this._reject = null),
            this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.resource.play()
    }
    destroy() {
        this._configureAutoUpdate();
        const t = this.resource;
        t && (t.removeEventListener("play", this._onPlayStart),
            t.removeEventListener("pause", this._onPlayStop),
            t.removeEventListener("seeked", this._onSeeked),
            t.removeEventListener("canplay", this._onCanPlay),
            t.removeEventListener("canplaythrough", this._onCanPlayThrough),
            t.removeEventListener("error", this._onError, !0),
            t.pause(),
            t.src = "",
            t.load()),
            super.destroy()
    }
    get autoUpdate() {
        return this._autoUpdate
    }
    set autoUpdate(t) {
        t !== this._autoUpdate && (this._autoUpdate = t,
            this._configureAutoUpdate())
    }
    get updateFPS() {
        return this._updateFPS
    }
    set updateFPS(t) {
        t !== this._updateFPS && (this._updateFPS = t,
            this._configureAutoUpdate())
    }
    _configureAutoUpdate() {
        this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.resource.requestVideoFrameCallback ? (this._isConnectedToTicker && (At.shared.remove(this.updateFrame, this),
            this._isConnectedToTicker = !1,
            this._msToNextUpdate = 0),
            this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(this._videoFrameRequestCallback))) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),
                this._videoFrameRequestCallbackHandle = null),
                this._isConnectedToTicker || (At.shared.add(this.updateFrame, this),
                    this._isConnectedToTicker = !0,
                    this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),
                        this._videoFrameRequestCallbackHandle = null),
                        this._isConnectedToTicker && (At.shared.remove(this.updateFrame, this),
                            this._isConnectedToTicker = !1,
                            this._msToNextUpdate = 0))
    }
    static test(t) {
        return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement
    }
}
    ;
ti.extension = B.TextureSource;
ti.defaultOptions = {
    ...Rt.defaultOptions,
    autoLoad: !0,
    autoPlay: !0,
    updateFPS: 0,
    crossorigin: !0,
    loop: !1,
    muted: !0,
    playsinline: !0,
    preload: !1
};
ti.MIME_TYPES = {
    ogv: "video/ogg",
    mov: "video/quicktime",
    m4v: "video/mp4"
};
let ns = ti;
const Bt = (s, t, e = !1) => (Array.isArray(s) || (s = [s]),
    t ? s.map(i => typeof i == "string" || e ? t(i) : i) : s);
class Oh {
    constructor() {
        this._parsers = [],
            this._cache = new Map,
            this._cacheMap = new Map
    }
    reset() {
        this._cacheMap.clear(),
            this._cache.clear()
    }
    has(t) {
        return this._cache.has(t)
    }
    get(t) {
        const e = this._cache.get(t);
        return e || q(`[Assets] Asset id ${t} was not found in the Cache`),
            e
    }
    set(t, e) {
        const i = Bt(t);
        let r;
        for (let h = 0; h < this.parsers.length; h++) {
            const l = this.parsers[h];
            if (l.test(e)) {
                r = l.getCacheableAssets(i, e);
                break
            }
        }
        const n = new Map(Object.entries(r || {}));
        r || i.forEach(h => {
            n.set(h, e)
        }
        );
        const o = [...n.keys()]
            , a = {
                cacheKeys: o,
                keys: i
            };
        i.forEach(h => {
            this._cacheMap.set(h, a)
        }
        ),
            o.forEach(h => {
                const l = r ? r[h] : e;
                this._cache.has(h) && this._cache.get(h) !== l && q("[Cache] already has key:", h),
                    this._cache.set(h, n.get(h))
            }
            )
    }
    remove(t) {
        if (!this._cacheMap.has(t)) {
            q(`[Assets] Asset id ${t} was not found in the Cache`);
            return
        }
        const e = this._cacheMap.get(t);
        e.cacheKeys.forEach(r => {
            this._cache.delete(r)
        }
        ),
            e.keys.forEach(r => {
                this._cacheMap.delete(r)
            }
            )
    }
    get parsers() {
        return this._parsers
    }
}
const j = new Oh
    , Di = [];
lt.handleByList(B.TextureSource, Di);
function xo(s = {}) {
    const t = s && s.resource
        , e = t ? s.resource : s
        , i = t ? s : {
            resource: s
        };
    for (let r = 0; r < Di.length; r++) {
        const n = Di[r];
        if (n.test(e))
            return new n(i)
    }
    throw new Error(`Could not find a source type for resource: ${i.resource}`)
}
function Wh(s = {}, t = !1) {
    const e = s && s.resource
        , i = e ? s.resource : s
        , r = e ? s : {
            resource: s
        };
    if (!t && j.has(i))
        return j.get(i);
    const n = new W({
        source: xo(r)
    });
    return n.on("destroy", () => {
        j.has(i) && j.remove(i)
    }
    ),
        t || j.set(i, n),
        n
}
function Uh(s, t = !1) {
    return typeof s == "string" ? j.get(s) : s instanceof Rt ? new W({
        source: s
    }) : Wh(s, t)
}
W.from = Uh;
Rt.from = xo;
lt.add(co, uo, fo, ns, ge, po, sr);
var te = (s => (s[s.Low = 0] = "Low",
    s[s.Normal = 1] = "Normal",
    s[s.High = 2] = "High",
    s))(te || {});
function It(s) {
    if (typeof s != "string")
        throw new TypeError(`Path must be a string. Received ${JSON.stringify(s)}`)
}
function Xe(s) {
    return s.split("?")[0].split("#")[0]
}
function Dh(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
function zh(s, t, e) {
    return s.replace(new RegExp(Dh(t), "g"), e)
}
function Hh(s, t) {
    let e = ""
        , i = 0
        , r = -1
        , n = 0
        , o = -1;
    for (let a = 0; a <= s.length; ++a) {
        if (a < s.length)
            o = s.charCodeAt(a);
        else {
            if (o === 47)
                break;
            o = 47
        }
        if (o === 47) {
            if (!(r === a - 1 || n === 1))
                if (r !== a - 1 && n === 2) {
                    if (e.length < 2 || i !== 2 || e.charCodeAt(e.length - 1) !== 46 || e.charCodeAt(e.length - 2) !== 46) {
                        if (e.length > 2) {
                            const h = e.lastIndexOf("/");
                            if (h !== e.length - 1) {
                                h === -1 ? (e = "",
                                    i = 0) : (e = e.slice(0, h),
                                        i = e.length - 1 - e.lastIndexOf("/")),
                                    r = a,
                                    n = 0;
                                continue
                            }
                        } else if (e.length === 2 || e.length === 1) {
                            e = "",
                                i = 0,
                                r = a,
                                n = 0;
                            continue
                        }
                    }
                } else
                    e.length > 0 ? e += `/${s.slice(r + 1, a)}` : e = s.slice(r + 1, a),
                        i = a - r - 1;
            r = a,
                n = 0
        } else
            o === 46 && n !== -1 ? ++n : n = -1
    }
    return e
}
const dt = {
    toPosix(s) {
        return zh(s, "\\", "/")
    },
    isUrl(s) {
        return /^https?:/.test(this.toPosix(s))
    },
    isDataUrl(s) {
        return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(s)
    },
    isBlobUrl(s) {
        return s.startsWith("blob:")
    },
    hasProtocol(s) {
        return /^[^/:]+:/.test(this.toPosix(s))
    },
    getProtocol(s) {
        It(s),
            s = this.toPosix(s);
        const t = /^file:\/\/\//.exec(s);
        if (t)
            return t[0];
        const e = /^[^/:]+:\/{0,2}/.exec(s);
        return e ? e[0] : ""
    },
    toAbsolute(s, t, e) {
        if (It(s),
            this.isDataUrl(s) || this.isBlobUrl(s))
            return s;
        const i = Xe(this.toPosix(t ?? X.get().getBaseUrl()))
            , r = Xe(this.toPosix(e ?? this.rootname(i)));
        return s = this.toPosix(s),
            s.startsWith("/") ? dt.join(r, s.slice(1)) : this.isAbsolute(s) ? s : this.join(i, s)
    },
    normalize(s) {
        if (It(s),
            s.length === 0)
            return ".";
        if (this.isDataUrl(s) || this.isBlobUrl(s))
            return s;
        s = this.toPosix(s);
        let t = "";
        const e = s.startsWith("/");
        this.hasProtocol(s) && (t = this.rootname(s),
            s = s.slice(t.length));
        const i = s.endsWith("/");
        return s = Hh(s),
            s.length > 0 && i && (s += "/"),
            e ? `/${s}` : t + s
    },
    isAbsolute(s) {
        return It(s),
            s = this.toPosix(s),
            this.hasProtocol(s) ? !0 : s.startsWith("/")
    },
    join(...s) {
        if (s.length === 0)
            return ".";
        let t;
        for (let e = 0; e < s.length; ++e) {
            const i = s[e];
            if (It(i),
                i.length > 0)
                if (t === void 0)
                    t = i;
                else {
                    const r = s[e - 1] ?? "";
                    this.joinExtensions.includes(this.extname(r).toLowerCase()) ? t += `/../${i}` : t += `/${i}`
                }
        }
        return t === void 0 ? "." : this.normalize(t)
    },
    dirname(s) {
        if (It(s),
            s.length === 0)
            return ".";
        s = this.toPosix(s);
        let t = s.charCodeAt(0);
        const e = t === 47;
        let i = -1
            , r = !0;
        const n = this.getProtocol(s)
            , o = s;
        s = s.slice(n.length);
        for (let a = s.length - 1; a >= 1; --a)
            if (t = s.charCodeAt(a),
                t === 47) {
                if (!r) {
                    i = a;
                    break
                }
            } else
                r = !1;
        return i === -1 ? e ? "/" : this.isUrl(o) ? n + s : n : e && i === 1 ? "//" : n + s.slice(0, i)
    },
    rootname(s) {
        It(s),
            s = this.toPosix(s);
        let t = "";
        if (s.startsWith("/") ? t = "/" : t = this.getProtocol(s),
            this.isUrl(s)) {
            const e = s.indexOf("/", t.length);
            e !== -1 ? t = s.slice(0, e) : t = s,
                t.endsWith("/") || (t += "/")
        }
        return t
    },
    basename(s, t) {
        It(s),
            t && It(t),
            s = Xe(this.toPosix(s));
        let e = 0, i = -1, r = !0, n;
        if (t !== void 0 && t.length > 0 && t.length <= s.length) {
            if (t.length === s.length && t === s)
                return "";
            let o = t.length - 1
                , a = -1;
            for (n = s.length - 1; n >= 0; --n) {
                const h = s.charCodeAt(n);
                if (h === 47) {
                    if (!r) {
                        e = n + 1;
                        break
                    }
                } else
                    a === -1 && (r = !1,
                        a = n + 1),
                        o >= 0 && (h === t.charCodeAt(o) ? --o === -1 && (i = n) : (o = -1,
                            i = a))
            }
            return e === i ? i = a : i === -1 && (i = s.length),
                s.slice(e, i)
        }
        for (n = s.length - 1; n >= 0; --n)
            if (s.charCodeAt(n) === 47) {
                if (!r) {
                    e = n + 1;
                    break
                }
            } else
                i === -1 && (r = !1,
                    i = n + 1);
        return i === -1 ? "" : s.slice(e, i)
    },
    extname(s) {
        It(s),
            s = Xe(this.toPosix(s));
        let t = -1
            , e = 0
            , i = -1
            , r = !0
            , n = 0;
        for (let o = s.length - 1; o >= 0; --o) {
            const a = s.charCodeAt(o);
            if (a === 47) {
                if (!r) {
                    e = o + 1;
                    break
                }
                continue
            }
            i === -1 && (r = !1,
                i = o + 1),
                a === 46 ? t === -1 ? t = o : n !== 1 && (n = 1) : t !== -1 && (n = -1)
        }
        return t === -1 || i === -1 || n === 0 || n === 1 && t === i - 1 && t === e + 1 ? "" : s.slice(t, i)
    },
    parse(s) {
        It(s);
        const t = {
            root: "",
            dir: "",
            base: "",
            ext: "",
            name: ""
        };
        if (s.length === 0)
            return t;
        s = Xe(this.toPosix(s));
        let e = s.charCodeAt(0);
        const i = this.isAbsolute(s);
        let r;
        t.root = this.rootname(s),
            i || this.hasProtocol(s) ? r = 1 : r = 0;
        let n = -1
            , o = 0
            , a = -1
            , h = !0
            , l = s.length - 1
            , c = 0;
        for (; l >= r; --l) {
            if (e = s.charCodeAt(l),
                e === 47) {
                if (!h) {
                    o = l + 1;
                    break
                }
                continue
            }
            a === -1 && (h = !1,
                a = l + 1),
                e === 46 ? n === -1 ? n = l : c !== 1 && (c = 1) : n !== -1 && (c = -1)
        }
        return n === -1 || a === -1 || c === 0 || c === 1 && n === a - 1 && n === o + 1 ? a !== -1 && (o === 0 && i ? t.base = t.name = s.slice(1, a) : t.base = t.name = s.slice(o, a)) : (o === 0 && i ? (t.name = s.slice(1, n),
            t.base = s.slice(1, a)) : (t.name = s.slice(o, n),
                t.base = s.slice(o, a)),
            t.ext = s.slice(n, a)),
            t.dir = this.dirname(s),
            t
    },
    sep: "/",
    delimiter: ":",
    joinExtensions: [".html"]
};
function yo(s, t, e, i, r) {
    const n = t[e];
    for (let o = 0; o < n.length; o++) {
        const a = n[o];
        e < t.length - 1 ? yo(s.replace(i[e], a), t, e + 1, i, r) : r.push(s.replace(i[e], a))
    }
}
function Nh(s) {
    const t = /\{(.*?)\}/g
        , e = s.match(t)
        , i = [];
    if (e) {
        const r = [];
        e.forEach(n => {
            const o = n.substring(1, n.length - 1).split(",");
            r.push(o)
        }
        ),
            yo(s, r, 0, e, i)
    } else
        i.push(s);
    return i
}
const Vs = s => !Array.isArray(s);
class Le {
    constructor() {
        this._defaultBundleIdentifierOptions = {
            connector: "-",
            createBundleAssetId: (t, e) => `${t}${this._bundleIdConnector}${e}`,
            extractAssetIdFromBundle: (t, e) => e.replace(`${t}${this._bundleIdConnector}`, "")
        },
            this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector,
            this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId,
            this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle,
            this._assetMap = {},
            this._preferredOrder = [],
            this._parsers = [],
            this._resolverHash = {},
            this._bundles = {}
    }
    setBundleIdentifier(t) {
        if (this._bundleIdConnector = t.connector ?? this._bundleIdConnector,
            this._createBundleAssetId = t.createBundleAssetId ?? this._createBundleAssetId,
            this._extractAssetIdFromBundle = t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle,
            this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
            throw new Error("[Resolver] GenerateBundleAssetId are not working correctly")
    }
    prefer(...t) {
        t.forEach(e => {
            this._preferredOrder.push(e),
                e.priority || (e.priority = Object.keys(e.params))
        }
        ),
            this._resolverHash = {}
    }
    set basePath(t) {
        this._basePath = t
    }
    get basePath() {
        return this._basePath
    }
    set rootPath(t) {
        this._rootPath = t
    }
    get rootPath() {
        return this._rootPath
    }
    get parsers() {
        return this._parsers
    }
    reset() {
        this.setBundleIdentifier(this._defaultBundleIdentifierOptions),
            this._assetMap = {},
            this._preferredOrder = [],
            this._resolverHash = {},
            this._rootPath = null,
            this._basePath = null,
            this._manifest = null,
            this._bundles = {},
            this._defaultSearchParams = null
    }
    setDefaultSearchParams(t) {
        if (typeof t == "string")
            this._defaultSearchParams = t;
        else {
            const e = t;
            this._defaultSearchParams = Object.keys(e).map(i => `${encodeURIComponent(i)}=${encodeURIComponent(e[i])}`).join("&")
        }
    }
    getAlias(t) {
        const { alias: e, src: i } = t;
        return Bt(e || i, n => typeof n == "string" ? n : Array.isArray(n) ? n.map(o => (o == null ? void 0 : o.src) ?? o) : n != null && n.src ? n.src : n, !0)
    }
    addManifest(t) {
        this._manifest && q("[Resolver] Manifest already exists, this will be overwritten"),
            this._manifest = t,
            t.bundles.forEach(e => {
                this.addBundle(e.name, e.assets)
            }
            )
    }
    addBundle(t, e) {
        const i = [];
        let r = e;
        Array.isArray(e) || (r = Object.entries(e).map(([n, o]) => typeof o == "string" || Array.isArray(o) ? {
            alias: n,
            src: o
        } : {
            alias: n,
            ...o
        })),
            r.forEach(n => {
                const o = n.src
                    , a = n.alias;
                let h;
                if (typeof a == "string") {
                    const l = this._createBundleAssetId(t, a);
                    i.push(l),
                        h = [a, l]
                } else {
                    const l = a.map(c => this._createBundleAssetId(t, c));
                    i.push(...l),
                        h = [...a, ...l]
                }
                this.add({
                    ...n,
                    alias: h,
                    src: o
                })
            }
            ),
            this._bundles[t] = i
    }
    add(t) {
        const e = [];
        Array.isArray(t) ? e.push(...t) : e.push(t);
        let i;
        i = n => {
            this.hasKey(n) && q(`[Resolver] already has key: ${n} overwriting`)
        }
            ,
            Bt(e).forEach(n => {
                const { src: o } = n;
                let { data: a, format: h, loadParser: l, parser: c } = n;
                const u = Bt(o).map(g => typeof g == "string" ? Nh(g) : Array.isArray(g) ? g : [g])
                    , f = this.getAlias(n);
                Array.isArray(f) ? f.forEach(i) : i(f);
                const d = []
                    , m = g => {
                        const p = this._parsers.find(_ => _.test(g));
                        return {
                            ...p == null ? void 0 : p.parse(g),
                            src: g
                        }
                    }
                    ;
                u.forEach(g => {
                    g.forEach(p => {
                        let _ = {};
                        if (typeof p != "object" ? _ = m(p) : (a = p.data ?? a,
                            h = p.format ?? h,
                            (p.loadParser || p.parser) && (l = p.loadParser ?? l,
                                c = p.parser ?? c),
                            _ = {
                                ...m(p.src),
                                ...p
                            }),
                            !f)
                            throw new Error(`[Resolver] alias is undefined for this asset: ${_.src}`);
                        _ = this._buildResolvedAsset(_, {
                            aliases: f,
                            data: a,
                            format: h,
                            loadParser: l,
                            parser: c,
                            progressSize: n.progressSize
                        }),
                            d.push(_)
                    }
                    )
                }
                ),
                    f.forEach(g => {
                        this._assetMap[g] = d
                    }
                    )
            }
            )
    }
    resolveBundle(t) {
        const e = Vs(t);
        t = Bt(t);
        const i = {};
        return t.forEach(r => {
            const n = this._bundles[r];
            if (n) {
                const o = this.resolve(n)
                    , a = {};
                for (const h in o) {
                    const l = o[h];
                    a[this._extractAssetIdFromBundle(r, h)] = l
                }
                i[r] = a
            }
        }
        ),
            e ? i[t[0]] : i
    }
    resolveUrl(t) {
        const e = this.resolve(t);
        if (typeof t != "string") {
            const i = {};
            for (const r in e)
                i[r] = e[r].src;
            return i
        }
        return e.src
    }
    resolve(t) {
        const e = Vs(t);
        t = Bt(t);
        const i = {};
        return t.forEach(r => {
            if (!this._resolverHash[r])
                if (this._assetMap[r]) {
                    let n = this._assetMap[r];
                    const o = this._getPreferredOrder(n);
                    o == null || o.priority.forEach(a => {
                        o.params[a].forEach(h => {
                            const l = n.filter(c => c[a] ? c[a] === h : !1);
                            l.length && (n = l)
                        }
                        )
                    }
                    ),
                        this._resolverHash[r] = n[0]
                } else
                    this._resolverHash[r] = this._buildResolvedAsset({
                        alias: [r],
                        src: r
                    }, {});
            i[r] = this._resolverHash[r]
        }
        ),
            e ? i[t[0]] : i
    }
    hasKey(t) {
        return !!this._assetMap[t]
    }
    hasBundle(t) {
        return !!this._bundles[t]
    }
    _getPreferredOrder(t) {
        for (let e = 0; e < t.length; e++) {
            const i = t[e]
                , r = this._preferredOrder.find(n => n.params.format.includes(i.format));
            if (r)
                return r
        }
        return this._preferredOrder[0]
    }
    _appendDefaultSearchParams(t) {
        if (!this._defaultSearchParams)
            return t;
        const e = /\?/.test(t) ? "&" : "?";
        return `${t}${e}${this._defaultSearchParams}`
    }
    _buildResolvedAsset(t, e) {
        const { aliases: i, data: r, loadParser: n, parser: o, format: a, progressSize: h } = e;
        return (this._basePath || this._rootPath) && (t.src = dt.toAbsolute(t.src, this._basePath, this._rootPath)),
            t.alias = i ?? t.alias ?? [t.src],
            t.src = this._appendDefaultSearchParams(t.src),
            t.data = {
                ...r || {},
                ...t.data
            },
            t.loadParser = n ?? t.loadParser,
            t.parser = o ?? t.parser,
            t.format = a ?? t.format ?? Vh(t.src),
            h !== void 0 && (t.progressSize = h),
            t
    }
}
Le.RETINA_PREFIX = /@([0-9\.]+)x/;
function Vh(s) {
    return s.split(".").pop().split("?").shift().split("#").shift()
}
const zi = (s, t) => {
    const e = t.split("?")[1];
    return e && (s += `?${e}`),
        s
}
    , bo = class es {
        constructor(t, e) {
            this.linkedSheets = [];
            let i = t;
            (t == null ? void 0 : t.source) instanceof Rt && (i = {
                texture: t,
                data: e
            });
            const { texture: r, data: n, cachePrefix: o = "" } = i;
            this.cachePrefix = o,
                this._texture = r instanceof W ? r : null,
                this.textureSource = r.source,
                this.textures = {},
                this.animations = {},
                this.data = n;
            const a = parseFloat(n.meta.scale);
            a ? (this.resolution = a,
                r.source.resolution = this.resolution) : this.resolution = r.source._resolution,
                this._frames = this.data.frames,
                this._frameKeys = Object.keys(this._frames),
                this._batchIndex = 0,
                this._callback = null
        }
        parse() {
            return new Promise(t => {
                this._callback = t,
                    this._batchIndex = 0,
                    this._frameKeys.length <= es.BATCH_SIZE ? (this._processFrames(0),
                        this._processAnimations(),
                        this._parseComplete()) : this._nextBatch()
            }
            )
        }
        _processFrames(t) {
            let e = t;
            const i = es.BATCH_SIZE;
            for (; e - t < i && e < this._frameKeys.length;) {
                const r = this._frameKeys[e]
                    , n = this._frames[r]
                    , o = n.frame;
                if (o) {
                    let a = null
                        , h = null;
                    const l = n.trimmed !== !1 && n.sourceSize ? n.sourceSize : n.frame
                        , c = new K(0, 0, Math.floor(l.w) / this.resolution, Math.floor(l.h) / this.resolution);
                    n.rotated ? a = new K(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.h) / this.resolution, Math.floor(o.w) / this.resolution) : a = new K(Math.floor(o.x) / this.resolution, Math.floor(o.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution),
                        n.trimmed !== !1 && n.spriteSourceSize && (h = new K(Math.floor(n.spriteSourceSize.x) / this.resolution, Math.floor(n.spriteSourceSize.y) / this.resolution, Math.floor(o.w) / this.resolution, Math.floor(o.h) / this.resolution)),
                        this.textures[r] = new W({
                            source: this.textureSource,
                            frame: a,
                            orig: c,
                            trim: h,
                            rotate: n.rotated ? 2 : 0,
                            defaultAnchor: n.anchor,
                            defaultBorders: n.borders,
                            label: r.toString()
                        })
                }
                e++
            }
        }
        _processAnimations() {
            const t = this.data.animations || {};
            for (const e in t) {
                this.animations[e] = [];
                for (let i = 0; i < t[e].length; i++) {
                    const r = t[e][i];
                    this.animations[e].push(this.textures[r])
                }
            }
        }
        _parseComplete() {
            const t = this._callback;
            this._callback = null,
                this._batchIndex = 0,
                t.call(this, this.textures)
        }
        _nextBatch() {
            this._processFrames(this._batchIndex * es.BATCH_SIZE),
                this._batchIndex++,
                setTimeout(() => {
                    this._batchIndex * es.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(),
                        this._parseComplete())
                }
                    , 0)
        }
        destroy(t = !1) {
            var e;
            for (const i in this.textures)
                this.textures[i].destroy();
            this._frames = null,
                this._frameKeys = null,
                this.data = null,
                this.textures = null,
                t && ((e = this._texture) == null || e.destroy(),
                    this.textureSource.destroy()),
                this._texture = null,
                this.textureSource = null,
                this.linkedSheets = []
        }
    }
    ;
bo.BATCH_SIZE = 1e3;
let Nr = bo;
const $h = ["jpg", "png", "jpeg", "avif", "webp", "basis", "etc2", "bc7", "bc6h", "bc5", "bc4", "bc3", "bc2", "bc1", "eac", "astc"];
function wo(s, t, e) {
    const i = {};
    if (s.forEach(r => {
        i[r] = t
    }
    ),
        Object.keys(t.textures).forEach(r => {
            i[`${t.cachePrefix}${r}`] = t.textures[r]
        }
        ),
        !e) {
        const r = dt.dirname(s[0]);
        t.linkedSheets.forEach((n, o) => {
            const a = wo([`${r}/${t.data.meta.related_multi_packs[o]}`], n, !0);
            Object.assign(i, a)
        }
        )
    }
    return i
}
const Yh = {
    extension: B.Asset,
    cache: {
        test: s => s instanceof Nr,
        getCacheableAssets: (s, t) => wo(s, t, !1)
    },
    resolver: {
        extension: {
            type: B.ResolveParser,
            name: "resolveSpritesheet"
        },
        test: s => {
            const e = s.split("?")[0].split(".")
                , i = e.pop()
                , r = e.pop();
            return i === "json" && $h.includes(r)
        }
        ,
        parse: s => {
            var e;
            const t = s.split(".");
            return {
                resolution: parseFloat(((e = Le.RETINA_PREFIX.exec(s)) == null ? void 0 : e[1]) ?? "1"),
                format: t[t.length - 2],
                src: s
            }
        }
    },
    loader: {
        name: "spritesheetLoader",
        id: "spritesheet",
        extension: {
            type: B.LoadParser,
            priority: te.Normal,
            name: "spritesheetLoader"
        },
        async testParse(s, t) {
            return dt.extname(t.src).toLowerCase() === ".json" && !!s.frames
        },
        async parse(s, t, e) {
            var u, f;
            const { texture: i, imageFilename: r, textureOptions: n, cachePrefix: o } = (t == null ? void 0 : t.data) ?? {};
            let a = dt.dirname(t.src);
            a && a.lastIndexOf("/") !== a.length - 1 && (a += "/");
            let h;
            if (i instanceof W)
                h = i;
            else {
                const d = zi(a + (r ?? s.meta.image), t.src);
                h = (await e.load([{
                    src: d,
                    data: n
                }]))[d]
            }
            const l = new Nr({
                texture: h.source,
                data: s,
                cachePrefix: o
            });
            await l.parse();
            const c = (u = s == null ? void 0 : s.meta) == null ? void 0 : u.related_multi_packs;
            if (Array.isArray(c)) {
                const d = [];
                for (const g of c) {
                    if (typeof g != "string")
                        continue;
                    let p = a + g;
                    (f = t.data) != null && f.ignoreMultiPack || (p = zi(p, t.src),
                        d.push(e.load({
                            src: p,
                            data: {
                                textureOptions: n,
                                ignoreMultiPack: !0
                            }
                        })))
                }
                const m = await Promise.all(d);
                l.linkedSheets = m,
                    m.forEach(g => {
                        g.linkedSheets = [l].concat(l.linkedSheets.filter(p => p !== g))
                    }
                    )
            }
            return l
        },
        async unload(s, t, e) {
            await e.unload(s.textureSource._sourceOrigin),
                s.destroy(!1)
        }
    }
};
lt.add(Yh);
const wi = Object.create(null)
    , Vr = Object.create(null);
function rr(s, t) {
    let e = Vr[s];
    return e === void 0 && (wi[t] === void 0 && (wi[t] = 1),
        Vr[s] = e = wi[t]++),
        e
}
let Se;
function Ao() {
    return (!Se || Se != null && Se.isContextLost()) && (Se = X.get().createCanvas().getContext("webgl", {})),
        Se
}
let Is;
function Xh() {
    if (!Is) {
        Is = "mediump";
        const s = Ao();
        s && s.getShaderPrecisionFormat && (Is = s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.HIGH_FLOAT).precision ? "highp" : "mediump")
    }
    return Is
}
function jh(s, t, e) {
    return t ? s : e ? (s = s.replace("out vec4 finalColor;", ""),
        `

        #ifdef GL_ES // This checks if it is WebGL1
        #define in varying
        #define finalColor gl_FragColor
        #define texture texture2D
        #endif
        ${s}
        `) : `

        #ifdef GL_ES // This checks if it is WebGL1
        #define in attribute
        #define out varying
        #endif
        ${s}
        `
}
function qh(s, t, e) {
    const i = e ? t.maxSupportedFragmentPrecision : t.maxSupportedVertexPrecision;
    if (s.substring(0, 9) !== "precision") {
        let r = e ? t.requestedFragmentPrecision : t.requestedVertexPrecision;
        return r === "highp" && i !== "highp" && (r = "mediump"),
            `precision ${r} float;
${s}`
    } else if (i !== "highp" && s.substring(0, 15) === "precision highp")
        return s.replace("precision highp", "precision mediump");
    return s
}
function Kh(s, t) {
    return t ? `#version 300 es
${s}` : s
}
const Zh = {}
    , Qh = {};
function Jh(s, { name: t = "pixi-program" }, e = !0) {
    t = t.replace(/\s+/g, "-"),
        t += e ? "-fragment" : "-vertex";
    const i = e ? Zh : Qh;
    return i[t] ? (i[t]++,
        t += `-${i[t]}`) : i[t] = 1,
        s.indexOf("#define SHADER_NAME") !== -1 ? s : `${`#define SHADER_NAME ${t}`}
${s}`
}
function tl(s, t) {
    return t ? s.replace("#version 300 es", "") : s
}
const Ai = {
    stripVersion: tl,
    ensurePrecision: qh,
    addProgramDefines: jh,
    setProgramName: Jh,
    insertVersion: Kh
}
    , je = Object.create(null)
    , So = class Hi {
        constructor(t) {
            t = {
                ...Hi.defaultOptions,
                ...t
            };
            const e = t.fragment.indexOf("#version 300 es") !== -1
                , i = {
                    stripVersion: e,
                    ensurePrecision: {
                        requestedFragmentPrecision: t.preferredFragmentPrecision,
                        requestedVertexPrecision: t.preferredVertexPrecision,
                        maxSupportedVertexPrecision: "highp",
                        maxSupportedFragmentPrecision: Xh()
                    },
                    setProgramName: {
                        name: t.name
                    },
                    addProgramDefines: e,
                    insertVersion: e
                };
            let r = t.fragment
                , n = t.vertex;
            Object.keys(Ai).forEach(o => {
                const a = i[o];
                r = Ai[o](r, a, !0),
                    n = Ai[o](n, a, !1)
            }
            ),
                this.fragment = r,
                this.vertex = n,
                this.transformFeedbackVaryings = t.transformFeedbackVaryings,
                this._key = rr(`${this.vertex}:${this.fragment}`, "gl-program")
        }
        destroy() {
            this.fragment = null,
                this.vertex = null,
                this._attributeData = null,
                this._uniformData = null,
                this._uniformBlockData = null,
                this.transformFeedbackVaryings = null,
                je[this._cacheKey] = null
        }
        static from(t) {
            const e = `${t.vertex}:${t.fragment}`;
            return je[e] || (je[e] = new Hi(t),
                je[e]._cacheKey = e),
                je[e]
        }
    }
    ;
So.defaultOptions = {
    preferredVertexPrecision: "highp",
    preferredFragmentPrecision: "mediump"
};
let vo = So;
const $r = {
    uint8x2: {
        size: 2,
        stride: 2,
        normalised: !1
    },
    uint8x4: {
        size: 4,
        stride: 4,
        normalised: !1
    },
    sint8x2: {
        size: 2,
        stride: 2,
        normalised: !1
    },
    sint8x4: {
        size: 4,
        stride: 4,
        normalised: !1
    },
    unorm8x2: {
        size: 2,
        stride: 2,
        normalised: !0
    },
    unorm8x4: {
        size: 4,
        stride: 4,
        normalised: !0
    },
    snorm8x2: {
        size: 2,
        stride: 2,
        normalised: !0
    },
    snorm8x4: {
        size: 4,
        stride: 4,
        normalised: !0
    },
    uint16x2: {
        size: 2,
        stride: 4,
        normalised: !1
    },
    uint16x4: {
        size: 4,
        stride: 8,
        normalised: !1
    },
    sint16x2: {
        size: 2,
        stride: 4,
        normalised: !1
    },
    sint16x4: {
        size: 4,
        stride: 8,
        normalised: !1
    },
    unorm16x2: {
        size: 2,
        stride: 4,
        normalised: !0
    },
    unorm16x4: {
        size: 4,
        stride: 8,
        normalised: !0
    },
    snorm16x2: {
        size: 2,
        stride: 4,
        normalised: !0
    },
    snorm16x4: {
        size: 4,
        stride: 8,
        normalised: !0
    },
    float16x2: {
        size: 2,
        stride: 4,
        normalised: !1
    },
    float16x4: {
        size: 4,
        stride: 8,
        normalised: !1
    },
    float32: {
        size: 1,
        stride: 4,
        normalised: !1
    },
    float32x2: {
        size: 2,
        stride: 8,
        normalised: !1
    },
    float32x3: {
        size: 3,
        stride: 12,
        normalised: !1
    },
    float32x4: {
        size: 4,
        stride: 16,
        normalised: !1
    },
    uint32: {
        size: 1,
        stride: 4,
        normalised: !1
    },
    uint32x2: {
        size: 2,
        stride: 8,
        normalised: !1
    },
    uint32x3: {
        size: 3,
        stride: 12,
        normalised: !1
    },
    uint32x4: {
        size: 4,
        stride: 16,
        normalised: !1
    },
    sint32: {
        size: 1,
        stride: 4,
        normalised: !1
    },
    sint32x2: {
        size: 2,
        stride: 8,
        normalised: !1
    },
    sint32x3: {
        size: 3,
        stride: 12,
        normalised: !1
    },
    sint32x4: {
        size: 4,
        stride: 16,
        normalised: !1
    }
};
function el(s) {
    return $r[s] ?? $r.float32
}
const sl = {
    f32: "float32",
    "vec2<f32>": "float32x2",
    "vec3<f32>": "float32x3",
    "vec4<f32>": "float32x4",
    vec2f: "float32x2",
    vec3f: "float32x3",
    vec4f: "float32x4",
    i32: "sint32",
    "vec2<i32>": "sint32x2",
    "vec3<i32>": "sint32x3",
    "vec4<i32>": "sint32x4",
    u32: "uint32",
    "vec2<u32>": "uint32x2",
    "vec3<u32>": "uint32x3",
    "vec4<u32>": "uint32x4",
    bool: "uint32",
    "vec2<bool>": "uint32x2",
    "vec3<bool>": "uint32x3",
    "vec4<bool>": "uint32x4"
};
function il({ source: s, entryPoint: t }) {
    const e = {}
        , i = s.indexOf(`fn ${t}`);
    if (i !== -1) {
        const r = s.indexOf("->", i);
        if (r !== -1) {
            const n = s.substring(i, r)
                , o = /@location\((\d+)\)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>]+)(?:,|\s|$)/g;
            let a;
            for (; (a = o.exec(n)) !== null;) {
                const h = sl[a[3]] ?? "float32";
                e[a[2]] = {
                    location: parseInt(a[1], 10),
                    format: h,
                    stride: el(h).stride,
                    offset: 0,
                    instance: !1,
                    start: 0
                }
            }
        }
    }
    return e
}
function Si(s) {
    var u, f;
    const t = /(^|[^/])@(group|binding)\(\d+\)[^;]+;/g
        , e = /@group\((\d+)\)/
        , i = /@binding\((\d+)\)/
        , r = /var(<[^>]+>)? (\w+)/
        , n = /:\s*(\w+)/
        , o = /struct\s+(\w+)\s*{([^}]+)}/g
        , a = /(\w+)\s*:\s*([\w\<\>]+)/g
        , h = /struct\s+(\w+)/
        , l = (u = s.match(t)) == null ? void 0 : u.map(d => ({
            group: parseInt(d.match(e)[1], 10),
            binding: parseInt(d.match(i)[1], 10),
            name: d.match(r)[2],
            isUniform: d.match(r)[1] === "<uniform>",
            type: d.match(n)[1]
        }));
    if (!l)
        return {
            groups: [],
            structs: []
        };
    const c = ((f = s.match(o)) == null ? void 0 : f.map(d => {
        const m = d.match(h)[1]
            , g = d.match(a).reduce((p, _) => {
                const [x, y] = _.split(":");
                return p[x.trim()] = y.trim(),
                    p
            }
                , {});
        return g ? {
            name: m,
            members: g
        } : null
    }
    ).filter(({ name: d }) => l.some(m => m.type === d))) ?? [];
    return {
        groups: l,
        structs: c
    }
}
var ss = (s => (s[s.VERTEX = 1] = "VERTEX",
    s[s.FRAGMENT = 2] = "FRAGMENT",
    s[s.COMPUTE = 4] = "COMPUTE",
    s))(ss || {});
function rl({ groups: s }) {
    const t = [];
    for (let e = 0; e < s.length; e++) {
        const i = s[e];
        t[i.group] || (t[i.group] = []),
            i.isUniform ? t[i.group].push({
                binding: i.binding,
                visibility: ss.VERTEX | ss.FRAGMENT,
                buffer: {
                    type: "uniform"
                }
            }) : i.type === "sampler" ? t[i.group].push({
                binding: i.binding,
                visibility: ss.FRAGMENT,
                sampler: {
                    type: "filtering"
                }
            }) : i.type === "texture_2d" && t[i.group].push({
                binding: i.binding,
                visibility: ss.FRAGMENT,
                texture: {
                    sampleType: "float",
                    viewDimension: "2d",
                    multisampled: !1
                }
            })
    }
    return t
}
function nl({ groups: s }) {
    const t = [];
    for (let e = 0; e < s.length; e++) {
        const i = s[e];
        t[i.group] || (t[i.group] = {}),
            t[i.group][i.name] = i.binding
    }
    return t
}
function ol(s, t) {
    const e = new Set
        , i = new Set
        , r = [...s.structs, ...t.structs].filter(o => e.has(o.name) ? !1 : (e.add(o.name),
            !0))
        , n = [...s.groups, ...t.groups].filter(o => {
            const a = `${o.name}-${o.binding}`;
            return i.has(a) ? !1 : (i.add(a),
                !0)
        }
        );
    return {
        structs: r,
        groups: n
    }
}
const qe = Object.create(null);
class ei {
    constructor(t) {
        var a, h;
        this._layoutKey = 0,
            this._attributeLocationsKey = 0;
        const { fragment: e, vertex: i, layout: r, gpuLayout: n, name: o } = t;
        if (this.name = o,
            this.fragment = e,
            this.vertex = i,
            e.source === i.source) {
            const l = Si(e.source);
            this.structsAndGroups = l
        } else {
            const l = Si(i.source)
                , c = Si(e.source);
            this.structsAndGroups = ol(l, c)
        }
        this.layout = r ?? nl(this.structsAndGroups),
            this.gpuLayout = n ?? rl(this.structsAndGroups),
            this.autoAssignGlobalUniforms = ((a = this.layout[0]) == null ? void 0 : a.globalUniforms) !== void 0,
            this.autoAssignLocalUniforms = ((h = this.layout[1]) == null ? void 0 : h.localUniforms) !== void 0,
            this._generateProgramKey()
    }
    _generateProgramKey() {
        const { vertex: t, fragment: e } = this
            , i = t.source + e.source + t.entryPoint + e.entryPoint;
        this._layoutKey = rr(i, "program")
    }
    get attributeData() {
        return this._attributeData ?? (this._attributeData = il(this.vertex)),
            this._attributeData
    }
    destroy() {
        this.gpuLayout = null,
            this.layout = null,
            this.structsAndGroups = null,
            this.fragment = null,
            this.vertex = null,
            qe[this._cacheKey] = null
    }
    static from(t) {
        const e = `${t.vertex.source}:${t.fragment.source}:${t.fragment.entryPoint}:${t.vertex.entryPoint}`;
        return qe[e] || (qe[e] = new ei(t),
            qe[e]._cacheKey = e),
            qe[e]
    }
}
const Co = ["f32", "i32", "vec2<f32>", "vec3<f32>", "vec4<f32>", "mat2x2<f32>", "mat3x3<f32>", "mat4x4<f32>", "mat3x2<f32>", "mat4x2<f32>", "mat2x3<f32>", "mat4x3<f32>", "mat2x4<f32>", "mat3x4<f32>", "vec2<i32>", "vec3<i32>", "vec4<i32>"]
    , al = Co.reduce((s, t) => (s[t] = !0,
        s), {});
function hl(s, t) {
    switch (s) {
        case "f32":
            return 0;
        case "vec2<f32>":
            return new Float32Array(2 * t);
        case "vec3<f32>":
            return new Float32Array(3 * t);
        case "vec4<f32>":
            return new Float32Array(4 * t);
        case "mat2x2<f32>":
            return new Float32Array([1, 0, 0, 1]);
        case "mat3x3<f32>":
            return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
        case "mat4x4<f32>":
            return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    }
    return null
}
const Po = class To {
    constructor(t, e) {
        this._touched = 0,
            this.uid = tt("uniform"),
            this._resourceType = "uniformGroup",
            this._resourceId = tt("resource"),
            this.isUniformGroup = !0,
            this._dirtyId = 0,
            this.destroyed = !1,
            e = {
                ...To.defaultOptions,
                ...e
            },
            this.uniformStructures = t;
        const i = {};
        for (const r in t) {
            const n = t[r];
            if (n.name = r,
                n.size = n.size ?? 1,
                !al[n.type]) {
                const o = n.type.match(/^array<(\w+(?:<\w+>)?),\s*(\d+)>$/);
                if (o) {
                    const [, a, h] = o;
                    throw new Error(`Uniform type ${n.type} is not supported. Use type: '${a}', size: ${h} instead.`)
                }
                throw new Error(`Uniform type ${n.type} is not supported. Supported uniform types are: ${Co.join(", ")}`)
            }
            n.value ?? (n.value = hl(n.type, n.size)),
                i[r] = n.value
        }
        this.uniforms = i,
            this._dirtyId = 1,
            this.ubo = e.ubo,
            this.isStatic = e.isStatic,
            this._signature = rr(Object.keys(i).map(r => `${r}-${t[r].type}`).join("-"), "uniform-group")
    }
    update() {
        this._dirtyId++
    }
}
    ;
Po.defaultOptions = {
    ubo: !1,
    isStatic: !1
};
let Mo = Po;
class Ds {
    constructor(t) {
        this.resources = Object.create(null),
            this._dirty = !0;
        let e = 0;
        for (const i in t) {
            const r = t[i];
            this.setResource(r, e++)
        }
        this._updateKey()
    }
    _updateKey() {
        if (!this._dirty)
            return;
        this._dirty = !1;
        const t = [];
        let e = 0;
        for (const i in this.resources)
            t[e++] = this.resources[i]._resourceId;
        this._key = t.join("|")
    }
    setResource(t, e) {
        var r, n;
        const i = this.resources[e];
        t !== i && (i && ((r = t.off) == null || r.call(t, "change", this.onResourceChange, this)),
            (n = t.on) == null || n.call(t, "change", this.onResourceChange, this),
            this.resources[e] = t,
            this._dirty = !0)
    }
    getResource(t) {
        return this.resources[t]
    }
    _touch(t, e) {
        const i = this.resources;
        for (const r in i)
            i[r]._gcLastUsed = t,
                i[r]._touched = e
    }
    destroy() {
        var e;
        const t = this.resources;
        for (const i in t) {
            const r = t[i];
            (e = r == null ? void 0 : r.off) == null || e.call(r, "change", this.onResourceChange, this)
        }
        this.resources = null
    }
    onResourceChange(t) {
        if (this._dirty = !0,
            t.destroyed) {
            const e = this.resources;
            for (const i in e)
                e[i] === t && (e[i] = null)
        } else
            this._updateKey()
    }
}
var Ni = (s => (s[s.WEBGL = 1] = "WEBGL",
    s[s.WEBGPU = 2] = "WEBGPU",
    s[s.BOTH = 3] = "BOTH",
    s))(Ni || {});
class nr extends mt {
    constructor(t) {
        super(),
            this.uid = tt("shader"),
            this._uniformBindMap = Object.create(null),
            this._ownedBindGroups = [],
            this._destroyed = !1;
        let { gpuProgram: e, glProgram: i, groups: r, resources: n, compatibleRenderers: o, groupMap: a } = t;
        this.gpuProgram = e,
            this.glProgram = i,
            o === void 0 && (o = 0,
                e && (o |= Ni.WEBGPU),
                i && (o |= Ni.WEBGL)),
            this.compatibleRenderers = o;
        const h = {};
        if (!n && !r && (n = {}),
            n && r)
            throw new Error("[Shader] Cannot have both resources and groups");
        if (!e && r && !a)
            throw new Error("[Shader] No group map or WebGPU shader provided - consider using resources instead.");
        if (!e && r && a)
            for (const l in a)
                for (const c in a[l]) {
                    const u = a[l][c];
                    h[u] = {
                        group: l,
                        binding: c,
                        name: u
                    }
                }
        else if (e && r && !a) {
            const l = e.structsAndGroups.groups;
            a = {},
                l.forEach(c => {
                    a[c.group] = a[c.group] || {},
                        a[c.group][c.binding] = c.name,
                        h[c.name] = c
                }
                )
        } else if (n) {
            r = {},
                a = {},
                e && e.structsAndGroups.groups.forEach(u => {
                    a[u.group] = a[u.group] || {},
                        a[u.group][u.binding] = u.name,
                        h[u.name] = u
                }
                );
            let l = 0;
            for (const c in n)
                h[c] || (r[99] || (r[99] = new Ds,
                    this._ownedBindGroups.push(r[99])),
                    h[c] = {
                        group: 99,
                        binding: l,
                        name: c
                    },
                    a[99] = a[99] || {},
                    a[99][l] = c,
                    l++);
            for (const c in n) {
                const u = c;
                let f = n[c];
                !f.source && !f._resourceType && (f = new Mo(f));
                const d = h[u];
                d && (r[d.group] || (r[d.group] = new Ds,
                    this._ownedBindGroups.push(r[d.group])),
                    r[d.group].setResource(f, d.binding))
            }
        }
        this.groups = r,
            this._uniformBindMap = a,
            this.resources = this._buildResourceAccessor(r, h)
    }
    addResource(t, e, i) {
        var r, n;
        (r = this._uniformBindMap)[e] || (r[e] = {}),
            (n = this._uniformBindMap[e])[i] || (n[i] = t),
            this.groups[e] || (this.groups[e] = new Ds,
                this._ownedBindGroups.push(this.groups[e]))
    }
    _buildResourceAccessor(t, e) {
        const i = {};
        for (const r in e) {
            const n = e[r];
            Object.defineProperty(i, n.name, {
                get() {
                    return t[n.group].getResource(n.binding)
                },
                set(o) {
                    t[n.group].setResource(o, n.binding)
                }
            })
        }
        return i
    }
    destroy(t = !1) {
        var e, i;
        this._destroyed || (this._destroyed = !0,
            this.emit("destroy", this),
            t && ((e = this.gpuProgram) == null || e.destroy(),
                (i = this.glProgram) == null || i.destroy()),
            this.gpuProgram = null,
            this.glProgram = null,
            this.removeAllListeners(),
            this._uniformBindMap = null,
            this._ownedBindGroups.forEach(r => {
                r.destroy()
            }
            ),
            this._ownedBindGroups = null,
            this.resources = null,
            this.groups = null)
    }
    static from(t) {
        const { gpu: e, gl: i, ...r } = t;
        let n, o;
        return e && (n = ei.from(e)),
            i && (o = vo.from(i)),
            new nr({
                gpuProgram: n,
                glProgram: o,
                ...r
            })
    }
}
const Vi = [];
lt.handleByNamedList(B.Environment, Vi);
async function ll(s) {
    if (!s)
        for (let t = 0; t < Vi.length; t++) {
            const e = Vi[t];
            if (e.value.test()) {
                await e.value.load();
                return
            }
        }
}
let Ke;
function cl() {
    if (typeof Ke == "boolean")
        return Ke;
    try {
        Ke = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({
            a: "b"
        }, "a", "b") === !0
    } catch {
        Ke = !1
    }
    return Ke
}
function Yr(s, t, e = 2) {
    const i = t && t.length
        , r = i ? t[0] * e : s.length;
    let n = ko(s, 0, r, e, !0);
    const o = [];
    if (!n || n.next === n.prev)
        return o;
    let a, h, l;
    if (i && (n = ml(s, t, n, e)),
        s.length > 80 * e) {
        a = s[0],
            h = s[1];
        let c = a
            , u = h;
        for (let f = e; f < r; f += e) {
            const d = s[f]
                , m = s[f + 1];
            d < a && (a = d),
                m < h && (h = m),
                d > c && (c = d),
                m > u && (u = m)
        }
        l = Math.max(c - a, u - h),
            l = l !== 0 ? 32767 / l : 0
    }
    return ls(n, o, e, a, h, l, 0),
        o
}
function ko(s, t, e, i, r) {
    let n;
    if (r === Pl(s, t, e, i) > 0)
        for (let o = t; o < e; o += i)
            n = Xr(o / i | 0, s[o], s[o + 1], n);
    else
        for (let o = e - i; o >= t; o -= i)
            n = Xr(o / i | 0, s[o], s[o + 1], n);
    return n && Re(n, n.next) && (us(n),
        n = n.next),
        n
}
function _e(s, t) {
    if (!s)
        return s;
    t || (t = s);
    let e = s, i;
    do
        if (i = !1,
            !e.steiner && (Re(e, e.next) || Q(e.prev, e, e.next) === 0)) {
            if (us(e),
                e = t = e.prev,
                e === e.next)
                break;
            i = !0
        } else
            e = e.next;
    while (i || e !== t);
    return t
}
function ls(s, t, e, i, r, n, o) {
    if (!s)
        return;
    !o && n && bl(s, i, r, n);
    let a = s;
    for (; s.prev !== s.next;) {
        const h = s.prev
            , l = s.next;
        if (n ? dl(s, i, r, n) : ul(s)) {
            t.push(h.i, s.i, l.i),
                us(s),
                s = l.next,
                a = l.next;
            continue
        }
        if (s = l,
            s === a) {
            o ? o === 1 ? (s = fl(_e(s), t),
                ls(s, t, e, i, r, n, 2)) : o === 2 && pl(s, t, e, i, r, n) : ls(_e(s), t, e, i, r, n, 1);
            break
        }
    }
}
function ul(s) {
    const t = s.prev
        , e = s
        , i = s.next;
    if (Q(t, e, i) >= 0)
        return !1;
    const r = t.x
        , n = e.x
        , o = i.x
        , a = t.y
        , h = e.y
        , l = i.y
        , c = Math.min(r, n, o)
        , u = Math.min(a, h, l)
        , f = Math.max(r, n, o)
        , d = Math.max(a, h, l);
    let m = i.next;
    for (; m !== t;) {
        if (m.x >= c && m.x <= f && m.y >= u && m.y <= d && is(r, a, n, h, o, l, m.x, m.y) && Q(m.prev, m, m.next) >= 0)
            return !1;
        m = m.next
    }
    return !0
}
function dl(s, t, e, i) {
    const r = s.prev
        , n = s
        , o = s.next;
    if (Q(r, n, o) >= 0)
        return !1;
    const a = r.x
        , h = n.x
        , l = o.x
        , c = r.y
        , u = n.y
        , f = o.y
        , d = Math.min(a, h, l)
        , m = Math.min(c, u, f)
        , g = Math.max(a, h, l)
        , p = Math.max(c, u, f)
        , _ = $i(d, m, t, e, i)
        , x = $i(g, p, t, e, i);
    let y = s.prevZ
        , b = s.nextZ;
    for (; y && y.z >= _ && b && b.z <= x;) {
        if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && is(a, c, h, u, l, f, y.x, y.y) && Q(y.prev, y, y.next) >= 0 || (y = y.prevZ,
            b.x >= d && b.x <= g && b.y >= m && b.y <= p && b !== r && b !== o && is(a, c, h, u, l, f, b.x, b.y) && Q(b.prev, b, b.next) >= 0))
            return !1;
        b = b.nextZ
    }
    for (; y && y.z >= _;) {
        if (y.x >= d && y.x <= g && y.y >= m && y.y <= p && y !== r && y !== o && is(a, c, h, u, l, f, y.x, y.y) && Q(y.prev, y, y.next) >= 0)
            return !1;
        y = y.prevZ
    }
    for (; b && b.z <= x;) {
        if (b.x >= d && b.x <= g && b.y >= m && b.y <= p && b !== r && b !== o && is(a, c, h, u, l, f, b.x, b.y) && Q(b.prev, b, b.next) >= 0)
            return !1;
        b = b.nextZ
    }
    return !0
}
function fl(s, t) {
    let e = s;
    do {
        const i = e.prev
            , r = e.next.next;
        !Re(i, r) && Io(i, e, e.next, r) && cs(i, r) && cs(r, i) && (t.push(i.i, e.i, r.i),
            us(e),
            us(e.next),
            e = s = r),
            e = e.next
    } while (e !== s);
    return _e(e)
}
function pl(s, t, e, i, r, n) {
    let o = s;
    do {
        let a = o.next.next;
        for (; a !== o.prev;) {
            if (o.i !== a.i && Sl(o, a)) {
                let h = Bo(o, a);
                o = _e(o, o.next),
                    h = _e(h, h.next),
                    ls(o, t, e, i, r, n, 0),
                    ls(h, t, e, i, r, n, 0);
                return
            }
            a = a.next
        }
        o = o.next
    } while (o !== s)
}
function ml(s, t, e, i) {
    const r = [];
    for (let n = 0, o = t.length; n < o; n++) {
        const a = t[n] * i
            , h = n < o - 1 ? t[n + 1] * i : s.length
            , l = ko(s, a, h, i, !1);
        l === l.next && (l.steiner = !0),
            r.push(Al(l))
    }
    r.sort(gl);
    for (let n = 0; n < r.length; n++)
        e = _l(r[n], e);
    return e
}
function gl(s, t) {
    let e = s.x - t.x;
    if (e === 0 && (e = s.y - t.y,
        e === 0)) {
        const i = (s.next.y - s.y) / (s.next.x - s.x)
            , r = (t.next.y - t.y) / (t.next.x - t.x);
        e = i - r
    }
    return e
}
function _l(s, t) {
    const e = xl(s, t);
    if (!e)
        return t;
    const i = Bo(e, s);
    return _e(i, i.next),
        _e(e, e.next)
}
function xl(s, t) {
    let e = t;
    const i = s.x
        , r = s.y;
    let n = -1 / 0, o;
    if (Re(s, e))
        return e;
    do {
        if (Re(s, e.next))
            return e.next;
        if (r <= e.y && r >= e.next.y && e.next.y !== e.y) {
            const u = e.x + (r - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
            if (u <= i && u > n && (n = u,
                o = e.x < e.next.x ? e : e.next,
                u === i))
                return o
        }
        e = e.next
    } while (e !== t);
    if (!o)
        return null;
    const a = o
        , h = o.x
        , l = o.y;
    let c = 1 / 0;
    e = o;
    do {
        if (i >= e.x && e.x >= h && i !== e.x && Eo(r < l ? i : n, r, h, l, r < l ? n : i, r, e.x, e.y)) {
            const u = Math.abs(r - e.y) / (i - e.x);
            cs(e, s) && (u < c || u === c && (e.x > o.x || e.x === o.x && yl(o, e))) && (o = e,
                c = u)
        }
        e = e.next
    } while (e !== a);
    return o
}
function yl(s, t) {
    return Q(s.prev, s, t.prev) < 0 && Q(t.next, s, s.next) < 0
}
function bl(s, t, e, i) {
    let r = s;
    do
        r.z === 0 && (r.z = $i(r.x, r.y, t, e, i)),
            r.prevZ = r.prev,
            r.nextZ = r.next,
            r = r.next;
    while (r !== s);
    r.prevZ.nextZ = null,
        r.prevZ = null,
        wl(r)
}
function wl(s) {
    let t, e = 1;
    do {
        let i = s, r;
        s = null;
        let n = null;
        for (t = 0; i;) {
            t++;
            let o = i
                , a = 0;
            for (let l = 0; l < e && (a++,
                o = o.nextZ,
                !!o); l++)
                ;
            let h = e;
            for (; a > 0 || h > 0 && o;)
                a !== 0 && (h === 0 || !o || i.z <= o.z) ? (r = i,
                    i = i.nextZ,
                    a--) : (r = o,
                        o = o.nextZ,
                        h--),
                    n ? n.nextZ = r : s = r,
                    r.prevZ = n,
                    n = r;
            i = o
        }
        n.nextZ = null,
            e *= 2
    } while (t > 1);
    return s
}
function $i(s, t, e, i, r) {
    return s = (s - e) * r | 0,
        t = (t - i) * r | 0,
        s = (s | s << 8) & 16711935,
        s = (s | s << 4) & 252645135,
        s = (s | s << 2) & 858993459,
        s = (s | s << 1) & 1431655765,
        t = (t | t << 8) & 16711935,
        t = (t | t << 4) & 252645135,
        t = (t | t << 2) & 858993459,
        t = (t | t << 1) & 1431655765,
        s | t << 1
}
function Al(s) {
    let t = s
        , e = s;
    do
        (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t),
            t = t.next;
    while (t !== s);
    return e
}
function Eo(s, t, e, i, r, n, o, a) {
    return (r - o) * (t - a) >= (s - o) * (n - a) && (s - o) * (i - a) >= (e - o) * (t - a) && (e - o) * (n - a) >= (r - o) * (i - a)
}
function is(s, t, e, i, r, n, o, a) {
    return !(s === o && t === a) && Eo(s, t, e, i, r, n, o, a)
}
function Sl(s, t) {
    return s.next.i !== t.i && s.prev.i !== t.i && !vl(s, t) && (cs(s, t) && cs(t, s) && Cl(s, t) && (Q(s.prev, s, t.prev) || Q(s, t.prev, t)) || Re(s, t) && Q(s.prev, s, s.next) > 0 && Q(t.prev, t, t.next) > 0)
}
function Q(s, t, e) {
    return (t.y - s.y) * (e.x - t.x) - (t.x - s.x) * (e.y - t.y)
}
function Re(s, t) {
    return s.x === t.x && s.y === t.y
}
function Io(s, t, e, i) {
    const r = Fs(Q(s, t, e))
        , n = Fs(Q(s, t, i))
        , o = Fs(Q(e, i, s))
        , a = Fs(Q(e, i, t));
    return !!(r !== n && o !== a || r === 0 && Bs(s, e, t) || n === 0 && Bs(s, i, t) || o === 0 && Bs(e, s, i) || a === 0 && Bs(e, t, i))
}
function Bs(s, t, e) {
    return t.x <= Math.max(s.x, e.x) && t.x >= Math.min(s.x, e.x) && t.y <= Math.max(s.y, e.y) && t.y >= Math.min(s.y, e.y)
}
function Fs(s) {
    return s > 0 ? 1 : s < 0 ? -1 : 0
}
function vl(s, t) {
    let e = s;
    do {
        if (e.i !== s.i && e.next.i !== s.i && e.i !== t.i && e.next.i !== t.i && Io(e, e.next, s, t))
            return !0;
        e = e.next
    } while (e !== s);
    return !1
}
function cs(s, t) {
    return Q(s.prev, s, s.next) < 0 ? Q(s, t, s.next) >= 0 && Q(s, s.prev, t) >= 0 : Q(s, t, s.prev) < 0 || Q(s, s.next, t) < 0
}
function Cl(s, t) {
    let e = s
        , i = !1;
    const r = (s.x + t.x) / 2
        , n = (s.y + t.y) / 2;
    do
        e.y > n != e.next.y > n && e.next.y !== e.y && r < (e.next.x - e.x) * (n - e.y) / (e.next.y - e.y) + e.x && (i = !i),
            e = e.next;
    while (e !== s);
    return i
}
function Bo(s, t) {
    const e = Yi(s.i, s.x, s.y)
        , i = Yi(t.i, t.x, t.y)
        , r = s.next
        , n = t.prev;
    return s.next = t,
        t.prev = s,
        e.next = r,
        r.prev = e,
        i.next = e,
        e.prev = i,
        n.next = i,
        i.prev = n,
        i
}
function Xr(s, t, e, i) {
    const r = Yi(s, t, e);
    return i ? (r.next = i.next,
        r.prev = i,
        i.next.prev = r,
        i.next = r) : (r.prev = r,
            r.next = r),
        r
}
function us(s) {
    s.next.prev = s.prev,
        s.prev.next = s.next,
        s.prevZ && (s.prevZ.nextZ = s.nextZ),
        s.nextZ && (s.nextZ.prevZ = s.prevZ)
}
function Yi(s, t, e) {
    return {
        i: s,
        x: t,
        y: e,
        prev: null,
        next: null,
        z: 0,
        prevZ: null,
        nextZ: null,
        steiner: !1
    }
}
function Pl(s, t, e, i) {
    let r = 0;
    for (let n = t, o = e - i; n < e; n += i)
        r += (s[o] - s[n]) * (s[n + 1] + s[o + 1]),
            o = n;
    return r
}
const Tl = Yr.default || Yr;
var Fo = (s => (s[s.NONE = 0] = "NONE",
    s[s.COLOR = 16384] = "COLOR",
    s[s.STENCIL = 1024] = "STENCIL",
    s[s.DEPTH = 256] = "DEPTH",
    s[s.COLOR_DEPTH = 16640] = "COLOR_DEPTH",
    s[s.COLOR_STENCIL = 17408] = "COLOR_STENCIL",
    s[s.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL",
    s[s.ALL = 17664] = "ALL",
    s))(Fo || {});
class Ml {
    constructor(t) {
        this.items = [],
            this._name = t
    }
    emit(t, e, i, r, n, o, a, h) {
        const { name: l, items: c } = this;
        for (let u = 0, f = c.length; u < f; u++)
            c[u][l](t, e, i, r, n, o, a, h);
        return this
    }
    add(t) {
        return t[this._name] && (this.remove(t),
            this.items.push(t)),
            this
    }
    remove(t) {
        const e = this.items.indexOf(t);
        return e !== -1 && this.items.splice(e, 1),
            this
    }
    contains(t) {
        return this.items.indexOf(t) !== -1
    }
    removeAll() {
        return this.items.length = 0,
            this
    }
    destroy() {
        this.removeAll(),
            this.items = null,
            this._name = null
    }
    get empty() {
        return this.items.length === 0
    }
    get name() {
        return this._name
    }
}
const kl = ["init", "destroy", "contextChange", "resolutionChange", "resetState", "renderEnd", "renderStart", "render", "update", "postrender", "prerender"]
    , Ro = class Lo extends mt {
        constructor(t) {
            super(),
                this.tick = 0,
                this.uid = tt("renderer"),
                this.runners = Object.create(null),
                this.renderPipes = Object.create(null),
                this._initOptions = {},
                this._systemsHash = Object.create(null),
                this.type = t.type,
                this.name = t.name,
                this.config = t;
            const e = [...kl, ...this.config.runners ?? []];
            this._addRunners(...e),
                this._unsafeEvalCheck()
        }
        async init(t = {}) {
            const e = t.skipExtensionImports === !0 ? !0 : t.manageImports === !1;
            await ll(e),
                this._addSystems(this.config.systems),
                this._addPipes(this.config.renderPipes, this.config.renderPipeAdaptors);
            for (const i in this._systemsHash)
                t = {
                    ...this._systemsHash[i].constructor.defaultOptions,
                    ...t
                };
            t = {
                ...Lo.defaultOptions,
                ...t
            },
                this._roundPixels = t.roundPixels ? 1 : 0;
            for (let i = 0; i < this.runners.init.items.length; i++)
                await this.runners.init.items[i].init(t);
            this._initOptions = t
        }
        render(t, e) {
            this.tick++;
            let i = t;
            if (i instanceof ut && (i = {
                container: i
            },
                e && (U(V, "passing a second argument is deprecated, please use render options instead"),
                    i.target = e.renderTexture)),
                i.target || (i.target = this.view.renderTarget),
                i.target === this.view.renderTarget && (this._lastObjectRendered = i.container,
                    i.clearColor ?? (i.clearColor = this.background.colorRgba),
                    i.clear ?? (i.clear = this.background.clearBeforeRender)),
                i.clearColor) {
                const r = Array.isArray(i.clearColor) && i.clearColor.length === 4;
                i.clearColor = r ? i.clearColor : it.shared.setValue(i.clearColor).toArray()
            }
            i.transform || (i.container.updateLocalTransform(),
                i.transform = i.container.localTransform),
                i.container.visible && (i.container.enableRenderGroup(),
                    this.runners.prerender.emit(i),
                    this.runners.renderStart.emit(i),
                    this.runners.render.emit(i),
                    this.runners.renderEnd.emit(i),
                    this.runners.postrender.emit(i))
        }
        resize(t, e, i) {
            const r = this.view.resolution;
            this.view.resize(t, e, i),
                this.emit("resize", this.view.screen.width, this.view.screen.height, this.view.resolution),
                i !== void 0 && i !== r && this.runners.resolutionChange.emit(i)
        }
        clear(t = {}) {
            const e = this;
            t.target || (t.target = e.renderTarget.renderTarget),
                t.clearColor || (t.clearColor = this.background.colorRgba),
                t.clear ?? (t.clear = Fo.ALL);
            const { clear: i, clearColor: r, target: n } = t;
            it.shared.setValue(r ?? this.background.colorRgba),
                e.renderTarget.clear(n, i, it.shared.toArray())
        }
        get resolution() {
            return this.view.resolution
        }
        set resolution(t) {
            this.view.resolution = t,
                this.runners.resolutionChange.emit(t)
        }
        get width() {
            return this.view.texture.frame.width
        }
        get height() {
            return this.view.texture.frame.height
        }
        get canvas() {
            return this.view.canvas
        }
        get lastObjectRendered() {
            return this._lastObjectRendered
        }
        get renderingToScreen() {
            return this.renderTarget.renderingToScreen
        }
        get screen() {
            return this.view.screen
        }
        _addRunners(...t) {
            t.forEach(e => {
                this.runners[e] = new Ml(e)
            }
            )
        }
        _addSystems(t) {
            let e;
            for (e in t) {
                const i = t[e];
                this._addSystem(i.value, i.name)
            }
        }
        _addSystem(t, e) {
            const i = new t(this);
            if (this[e])
                throw new Error(`Whoops! The name "${e}" is already in use`);
            this[e] = i,
                this._systemsHash[e] = i;
            for (const r in this.runners)
                this.runners[r].add(i);
            return this
        }
        _addPipes(t, e) {
            const i = e.reduce((r, n) => (r[n.name] = n.value,
                r), {});
            t.forEach(r => {
                const n = r.value
                    , o = r.name
                    , a = i[o];
                this.renderPipes[o] = new n(this, a ? new a : null),
                    this.runners.destroy.add(this.renderPipes[o])
            }
            )
        }
        destroy(t = !1) {
            this.runners.destroy.items.reverse(),
                this.runners.destroy.emit(t),
                (t === !0 || typeof t == "object" && t.releaseGlobalResources) && _s.release(),
                Object.values(this.runners).forEach(e => {
                    e.destroy()
                }
                ),
                this._systemsHash = null,
                this.renderPipes = null
        }
        generateTexture(t) {
            return this.textureGenerator.generateTexture(t)
        }
        get roundPixels() {
            return !!this._roundPixels
        }
        _unsafeEvalCheck() {
            if (!cl())
                throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")
        }
        resetState() {
            this.runners.resetState.emit()
        }
    }
    ;
Ro.defaultOptions = {
    resolution: 1,
    failIfMajorPerformanceCaveat: !1,
    roundPixels: !1
};
let Go = Ro, Rs;
function El(s) {
    return Rs !== void 0 || (Rs = (() => {
        var e;
        const t = {
            stencil: !0,
            failIfMajorPerformanceCaveat: s ?? Go.defaultOptions.failIfMajorPerformanceCaveat
        };
        try {
            if (!X.get().getWebGLRenderingContext())
                return !1;
            let r = X.get().createCanvas().getContext("webgl", t);
            const n = !!((e = r == null ? void 0 : r.getContextAttributes()) != null && e.stencil);
            if (r) {
                const o = r.getExtension("WEBGL_lose_context");
                o && o.loseContext()
            }
            return r = null,
                n
        } catch {
            return !1
        }
    }
    )()),
        Rs
}
let Ls;
async function Il(s = {}) {
    return Ls !== void 0 || (Ls = await (async () => {
        const t = X.get().getNavigator().gpu;
        if (!t)
            return !1;
        try {
            return await (await t.requestAdapter(s)).requestDevice(),
                !0
        } catch {
            return !1
        }
    }
    )()),
        Ls
}
const jr = ["webgl", "webgpu", "canvas"];
async function Bl(s) {
    let t = [];
    s.preference ? (t.push(s.preference),
        jr.forEach(n => {
            n !== s.preference && t.push(n)
        }
        )) : t = jr.slice();
    let e, i = {};
    for (let n = 0; n < t.length; n++) {
        const o = t[n];
        if (o === "webgpu" && await Il()) {
            const { WebGPURenderer: a } = await Hs(async () => {
                const { WebGPURenderer: h } = await import("./WebGPURenderer-WrUk9cmm.js");
                return {
                    WebGPURenderer: h
                }
            }
                , __vite__mapDeps([3, 2, 4]), import.meta.url);
            e = a,
                i = {
                    ...s,
                    ...s.webgpu
                };
            break
        } else if (o === "webgl" && El(s.failIfMajorPerformanceCaveat ?? Go.defaultOptions.failIfMajorPerformanceCaveat)) {
            const { WebGLRenderer: a } = await Hs(async () => {
                const { WebGLRenderer: h } = await import("./WebGLRenderer-CUGkgL0u.js");
                return {
                    WebGLRenderer: h
                }
            }
                , __vite__mapDeps([5, 2, 4]), import.meta.url);
            e = a,
                i = {
                    ...s,
                    ...s.webgl
                };
            break
        } else if (o === "canvas")
            throw i = {
                ...s
            },
            new Error("CanvasRenderer is not yet implemented")
    }
    if (delete i.webgpu,
        delete i.webgl,
        !e)
        throw new Error("No available renderer for the current environment");
    const r = new e;
    return await r.init(i),
        r
}
const Oo = "8.15.0";
class Wo {
    static init() {
        var t;
        (t = globalThis.__PIXI_APP_INIT__) == null || t.call(globalThis, this, Oo)
    }
    static destroy() { }
}
Wo.extension = B.Application;
class Fl {
    constructor(t) {
        this._renderer = t
    }
    init() {
        var t;
        (t = globalThis.__PIXI_RENDERER_INIT__) == null || t.call(globalThis, this._renderer, Oo)
    }
    destroy() {
        this._renderer = null
    }
}
Fl.extension = {
    type: [B.WebGLSystem, B.WebGPUSystem],
    name: "initHook",
    priority: -10
};
const Uo = class Xi {
    constructor(...t) {
        this.stage = new ut,
            t[0] !== void 0 && U(V, "Application constructor options are deprecated, please use Application.init() instead.")
    }
    async init(t) {
        t = {
            ...t
        },
            this.stage || (this.stage = new ut),
            this.renderer = await Bl(t),
            Xi._plugins.forEach(e => {
                e.init.call(this, t)
            }
            )
    }
    render() {
        this.renderer.render({
            container: this.stage
        })
    }
    get canvas() {
        return this.renderer.canvas
    }
    get view() {
        return U(V, "Application.view is deprecated, please use Application.canvas instead."),
            this.renderer.canvas
    }
    get screen() {
        return this.renderer.screen
    }
    destroy(t = !1, e = !1) {
        const i = Xi._plugins.slice(0);
        i.reverse(),
            i.forEach(r => {
                r.destroy.call(this)
            }
            ),
            this.stage.destroy(e),
            this.stage = null,
            this.renderer.destroy(t),
            this.renderer = null
    }
}
    ;
Uo._plugins = [];
let Do = Uo;
lt.handleByList(B.Application, Do._plugins);
lt.add(Wo);
class zo extends mt {
    constructor() {
        super(...arguments),
            this.chars = Object.create(null),
            this.lineHeight = 0,
            this.fontFamily = "",
            this.fontMetrics = {
                fontSize: 0,
                ascent: 0,
                descent: 0
            },
            this.baseLineOffset = 0,
            this.distanceField = {
                type: "none",
                range: 0
            },
            this.pages = [],
            this.applyFillAsTint = !0,
            this.baseMeasurementFontSize = 100,
            this.baseRenderedFontSize = 100
    }
    get font() {
        return U(V, "BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),
            this.fontFamily
    }
    get pageTextures() {
        return U(V, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),
            this.pages
    }
    get size() {
        return U(V, "BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),
            this.fontMetrics.fontSize
    }
    get distanceFieldRange() {
        return U(V, "BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),
            this.distanceField.range
    }
    get distanceFieldType() {
        return U(V, "BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),
            this.distanceField.type
    }
    destroy(t = !1) {
        var e;
        this.emit("destroy", this),
            this.removeAllListeners();
        for (const i in this.chars)
            (e = this.chars[i].texture) == null || e.destroy();
        this.chars = null,
            t && (this.pages.forEach(i => i.texture.destroy(!0)),
                this.pages = null)
    }
}
/**
 * tiny-lru
 *
 * @copyright 2026 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 11.4.7
 */
class Rl {
    constructor(t = 0, e = 0, i = !1) {
        this.first = null,
            this.items = Object.create(null),
            this.last = null,
            this.max = t,
            this.resetTtl = i,
            this.size = 0,
            this.ttl = e
    }
    clear() {
        return this.first = null,
            this.items = Object.create(null),
            this.last = null,
            this.size = 0,
            this
    }
    delete(t) {
        if (this.has(t)) {
            const e = this.items[t];
            delete this.items[t],
                this.size--,
                e.prev !== null && (e.prev.next = e.next),
                e.next !== null && (e.next.prev = e.prev),
                this.first === e && (this.first = e.next),
                this.last === e && (this.last = e.prev)
        }
        return this
    }
    entries(t = this.keys()) {
        const e = new Array(t.length);
        for (let i = 0; i < t.length; i++) {
            const r = t[i];
            e[i] = [r, this.get(r)]
        }
        return e
    }
    evict(t = !1) {
        if (t || this.size > 0) {
            const e = this.first;
            delete this.items[e.key],
                --this.size === 0 ? (this.first = null,
                    this.last = null) : (this.first = e.next,
                        this.first.prev = null)
        }
        return this
    }
    expiresAt(t) {
        let e;
        return this.has(t) && (e = this.items[t].expiry),
            e
    }
    get(t) {
        const e = this.items[t];
        if (e !== void 0) {
            if (this.ttl > 0 && e.expiry <= Date.now()) {
                this.delete(t);
                return
            }
            return this.moveToEnd(e),
                e.value
        }
    }
    has(t) {
        return t in this.items
    }
    moveToEnd(t) {
        this.last !== t && (t.prev !== null && (t.prev.next = t.next),
            t.next !== null && (t.next.prev = t.prev),
            this.first === t && (this.first = t.next),
            t.prev = this.last,
            t.next = null,
            this.last !== null && (this.last.next = t),
            this.last = t,
            this.first === null && (this.first = t))
    }
    keys() {
        const t = new Array(this.size);
        let e = this.first
            , i = 0;
        for (; e !== null;)
            t[i++] = e.key,
                e = e.next;
        return t
    }
    setWithEvicted(t, e, i = this.resetTtl) {
        let r = null;
        if (this.has(t))
            this.set(t, e, !0, i);
        else {
            this.max > 0 && this.size === this.max && (r = {
                ...this.first
            },
                this.evict(!0));
            let n = this.items[t] = {
                expiry: this.ttl > 0 ? Date.now() + this.ttl : this.ttl,
                key: t,
                prev: this.last,
                next: null,
                value: e
            };
            ++this.size === 1 ? this.first = n : this.last.next = n,
                this.last = n
        }
        return r
    }
    set(t, e, i = !1, r = this.resetTtl) {
        let n = this.items[t];
        return i || n !== void 0 ? (n.value = e,
            i === !1 && r && (n.expiry = this.ttl > 0 ? Date.now() + this.ttl : this.ttl),
            this.moveToEnd(n)) : (this.max > 0 && this.size === this.max && this.evict(!0),
                n = this.items[t] = {
                    expiry: this.ttl > 0 ? Date.now() + this.ttl : this.ttl,
                    key: t,
                    prev: this.last,
                    next: null,
                    value: e
                },
                ++this.size === 1 ? this.first = n : this.last.next = n,
                this.last = n),
            this
    }
    values(t = this.keys()) {
        const e = new Array(t.length);
        for (let i = 0; i < t.length; i++)
            e[i] = this.get(t[i]);
        return e
    }
}
function Ho(s = 1e3, t = 0, e = !1) {
    if (isNaN(s) || s < 0)
        throw new TypeError("Invalid max value");
    if (isNaN(t) || t < 0)
        throw new TypeError("Invalid ttl value");
    if (typeof e != "boolean")
        throw new TypeError("Invalid resetTtl value");
    return new Rl(s, t, e)
}
const Ll = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"];
function $s(s) {
    const t = typeof s.fontSize == "number" ? `${s.fontSize}px` : s.fontSize;
    let e = s.fontFamily;
    Array.isArray(s.fontFamily) || (e = s.fontFamily.split(","));
    for (let i = e.length - 1; i >= 0; i--) {
        let r = e[i].trim();
        !/([\"\'])[^\'\"]+\1/.test(r) && !Ll.includes(r) && (r = `"${r}"`),
            e[i] = r
    }
    return `${s.fontStyle} ${s.fontVariant} ${s.fontWeight} ${t} ${e.join(",")}`
}
const vi = {
    willReadFrequently: !0
}
    , Lt = class E {
        static get experimentalLetterSpacingSupported() {
            let t = E._experimentalLetterSpacingSupported;
            if (t === void 0) {
                const e = X.get().getCanvasRenderingContext2D().prototype;
                t = E._experimentalLetterSpacingSupported = "letterSpacing" in e || "textLetterSpacing" in e
            }
            return t
        }
        constructor(t, e, i, r, n, o, a, h, l) {
            this.text = t,
                this.style = e,
                this.width = i,
                this.height = r,
                this.lines = n,
                this.lineWidths = o,
                this.lineHeight = a,
                this.maxLineWidth = h,
                this.fontProperties = l
        }
        static measureText(t = " ", e, i = E._canvas, r = e.wordWrap) {
            var x;
            const n = `${t}-${e.styleKey}-wordWrap-${r}`;
            if (E._measurementCache.has(n))
                return E._measurementCache.get(n);
            const o = $s(e)
                , a = E.measureFont(o);
            a.fontSize === 0 && (a.fontSize = e.fontSize,
                a.ascent = e.fontSize);
            const h = E.__context;
            h.font = o;
            const c = (r ? E._wordWrap(t, e, i) : t).split(/(?:\r\n|\r|\n)/)
                , u = new Array(c.length);
            let f = 0;
            for (let y = 0; y < c.length; y++) {
                const b = E._measureText(c[y], e.letterSpacing, h);
                u[y] = b,
                    f = Math.max(f, b)
            }
            const d = ((x = e._stroke) == null ? void 0 : x.width) || 0;
            let m = f + d;
            e.dropShadow && (m += e.dropShadow.distance);
            const g = e.lineHeight || a.fontSize;
            let p = Math.max(g, a.fontSize + d) + (c.length - 1) * (g + e.leading);
            e.dropShadow && (p += e.dropShadow.distance);
            const _ = new E(t, e, m, p, c, u, g + e.leading, f, a);
            return E._measurementCache.set(n, _),
                _
        }
        static _measureText(t, e, i) {
            let r = !1;
            E.experimentalLetterSpacingSupported && (E.experimentalLetterSpacing ? (i.letterSpacing = `${e}px`,
                i.textLetterSpacing = `${e}px`,
                r = !0) : (i.letterSpacing = "0px",
                    i.textLetterSpacing = "0px"));
            const n = i.measureText(t);
            let o = n.width;
            const a = -n.actualBoundingBoxLeft;
            let l = n.actualBoundingBoxRight - a;
            if (o > 0)
                if (r)
                    o -= e,
                        l -= e;
                else {
                    const c = (E.graphemeSegmenter(t).length - 1) * e;
                    o += c,
                        l += c
                }
            return Math.max(o, l)
        }
        static _wordWrap(t, e, i = E._canvas) {
            const r = i.getContext("2d", vi);
            let n = 0
                , o = ""
                , a = "";
            const h = Object.create(null)
                , { letterSpacing: l, whiteSpace: c } = e
                , u = E._collapseSpaces(c)
                , f = E._collapseNewlines(c);
            let d = !u;
            const m = e.wordWrapWidth + l
                , g = E._tokenize(t);
            for (let p = 0; p < g.length; p++) {
                let _ = g[p];
                if (E._isNewline(_)) {
                    if (!f) {
                        a += E._addLine(o),
                            d = !u,
                            o = "",
                            n = 0;
                        continue
                    }
                    _ = " "
                }
                if (u) {
                    const y = E.isBreakingSpace(_)
                        , b = E.isBreakingSpace(o[o.length - 1]);
                    if (y && b)
                        continue
                }
                const x = E._getFromCache(_, l, h, r);
                if (x > m)
                    if (o !== "" && (a += E._addLine(o),
                        o = "",
                        n = 0),
                        E.canBreakWords(_, e.breakWords)) {
                        const y = E.wordWrapSplit(_);
                        for (let b = 0; b < y.length; b++) {
                            let S = y[b]
                                , A = S
                                , w = 1;
                            for (; y[b + w];) {
                                const k = y[b + w];
                                if (!E.canBreakChars(A, k, _, b, e.breakWords))
                                    S += k;
                                else
                                    break;
                                A = k,
                                    w++
                            }
                            b += w - 1;
                            const L = E._getFromCache(S, l, h, r);
                            L + n > m && (a += E._addLine(o),
                                d = !1,
                                o = "",
                                n = 0),
                                o += S,
                                n += L
                        }
                    } else {
                        o.length > 0 && (a += E._addLine(o),
                            o = "",
                            n = 0);
                        const y = p === g.length - 1;
                        a += E._addLine(_, !y),
                            d = !1,
                            o = "",
                            n = 0
                    }
                else
                    x + n > m && (d = !1,
                        a += E._addLine(o),
                        o = "",
                        n = 0),
                        (o.length > 0 || !E.isBreakingSpace(_) || d) && (o += _,
                            n += x)
            }
            return a += E._addLine(o, !1),
                a
        }
        static _addLine(t, e = !0) {
            return t = E._trimRight(t),
                t = e ? `${t}
` : t,
                t
        }
        static _getFromCache(t, e, i, r) {
            let n = i[t];
            return typeof n != "number" && (n = E._measureText(t, e, r) + e,
                i[t] = n),
                n
        }
        static _collapseSpaces(t) {
            return t === "normal" || t === "pre-line"
        }
        static _collapseNewlines(t) {
            return t === "normal"
        }
        static _trimRight(t) {
            if (typeof t != "string")
                return "";
            for (let e = t.length - 1; e >= 0; e--) {
                const i = t[e];
                if (!E.isBreakingSpace(i))
                    break;
                t = t.slice(0, -1)
            }
            return t
        }
        static _isNewline(t) {
            return typeof t != "string" ? !1 : E._newlines.includes(t.charCodeAt(0))
        }
        static isBreakingSpace(t, e) {
            return typeof t != "string" ? !1 : E._breakingSpaces.includes(t.charCodeAt(0))
        }
        static _tokenize(t) {
            const e = [];
            let i = "";
            if (typeof t != "string")
                return e;
            for (let r = 0; r < t.length; r++) {
                const n = t[r]
                    , o = t[r + 1];
                if (E.isBreakingSpace(n, o) || E._isNewline(n)) {
                    i !== "" && (e.push(i),
                        i = ""),
                        n === "\r" && o === `
` ? (e.push(`\r
`),
                            r++) : e.push(n);
                    continue
                }
                i += n
            }
            return i !== "" && e.push(i),
                e
        }
        static canBreakWords(t, e) {
            return e
        }
        static canBreakChars(t, e, i, r, n) {
            return !0
        }
        static wordWrapSplit(t) {
            return E.graphemeSegmenter(t)
        }
        static measureFont(t) {
            if (E._fonts[t])
                return E._fonts[t];
            const e = E._context;
            e.font = t;
            const i = e.measureText(E.METRICS_STRING + E.BASELINE_SYMBOL)
                , r = {
                    ascent: i.actualBoundingBoxAscent,
                    descent: i.actualBoundingBoxDescent,
                    fontSize: i.actualBoundingBoxAscent + i.actualBoundingBoxDescent
                };
            return E._fonts[t] = r,
                r
        }
        static clearMetrics(t = "") {
            t ? delete E._fonts[t] : E._fonts = {}
        }
        static get _canvas() {
            if (!E.__canvas) {
                let t;
                try {
                    const e = new OffscreenCanvas(0, 0)
                        , i = e.getContext("2d", vi);
                    if (i != null && i.measureText)
                        return E.__canvas = e,
                            e;
                    t = X.get().createCanvas()
                } catch {
                    t = X.get().createCanvas()
                }
                t.width = t.height = 10,
                    E.__canvas = t
            }
            return E.__canvas
        }
        static get _context() {
            return E.__context || (E.__context = E._canvas.getContext("2d", vi)),
                E.__context
        }
    }
    ;
Lt.METRICS_STRING = "|ÉqÅ";
Lt.BASELINE_SYMBOL = "M";
Lt.BASELINE_MULTIPLIER = 1.4;
Lt.HEIGHT_MULTIPLIER = 2;
Lt.graphemeSegmenter = (() => {
    if (typeof (Intl == null ? void 0 : Intl.Segmenter) == "function") {
        const s = new Intl.Segmenter;
        return t => {
            const e = s.segment(t)
                , i = [];
            let r = 0;
            for (const n of e)
                i[r++] = n.segment;
            return i
        }
    }
    return s => [...s]
}
)();
Lt.experimentalLetterSpacing = !1;
Lt._fonts = {};
Lt._newlines = [10, 13];
Lt._breakingSpaces = [9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288];
Lt._measurementCache = Ho(1e3);
let Ht = Lt;
const qr = [{
    offset: 0,
    color: "white"
}, {
    offset: 1,
    color: "black"
}]
    , or = class ji {
        constructor(...t) {
            this.uid = tt("fillGradient"),
                this._tick = 0,
                this.type = "linear",
                this.colorStops = [];
            let e = Gl(t);
            e = {
                ...e.type === "radial" ? ji.defaultRadialOptions : ji.defaultLinearOptions,
                ...$n(e)
            },
                this._textureSize = e.textureSize,
                this._wrapMode = e.wrapMode,
                e.type === "radial" ? (this.center = e.center,
                    this.outerCenter = e.outerCenter ?? this.center,
                    this.innerRadius = e.innerRadius,
                    this.outerRadius = e.outerRadius,
                    this.scale = e.scale,
                    this.rotation = e.rotation) : (this.start = e.start,
                        this.end = e.end),
                this.textureSpace = e.textureSpace,
                this.type = e.type,
                e.colorStops.forEach(r => {
                    this.addColorStop(r.offset, r.color)
                }
                )
        }
        addColorStop(t, e) {
            return this.colorStops.push({
                offset: t,
                color: it.shared.setValue(e).toHexa()
            }),
                this
        }
        buildLinearGradient() {
            if (this.texture)
                return;
            let { x: t, y: e } = this.start
                , { x: i, y: r } = this.end
                , n = i - t
                , o = r - e;
            const a = n < 0 || o < 0;
            if (this._wrapMode === "clamp-to-edge") {
                if (n < 0) {
                    const p = t;
                    t = i,
                        i = p,
                        n *= -1
                }
                if (o < 0) {
                    const p = e;
                    e = r,
                        r = p,
                        o *= -1
                }
            }
            const h = this.colorStops.length ? this.colorStops : qr
                , l = this._textureSize
                , { canvas: c, context: u } = Zr(l, 1)
                , f = a ? u.createLinearGradient(this._textureSize, 0, 0, 0) : u.createLinearGradient(0, 0, this._textureSize, 0);
            Kr(f, h),
                u.fillStyle = f,
                u.fillRect(0, 0, l, 1),
                this.texture = new W({
                    source: new ge({
                        resource: c,
                        addressMode: this._wrapMode
                    })
                });
            const d = Math.sqrt(n * n + o * o)
                , m = Math.atan2(o, n)
                , g = new D;
            g.scale(d / l, 1),
                g.rotate(m),
                g.translate(t, e),
                this.textureSpace === "local" && g.scale(l, l),
                this.transform = g
        }
        buildGradient() {
            this.texture || this._tick++,
                this.type === "linear" ? this.buildLinearGradient() : this.buildRadialGradient()
        }
        buildRadialGradient() {
            if (this.texture)
                return;
            const t = this.colorStops.length ? this.colorStops : qr
                , e = this._textureSize
                , { canvas: i, context: r } = Zr(e, e)
                , { x: n, y: o } = this.center
                , { x: a, y: h } = this.outerCenter
                , l = this.innerRadius
                , c = this.outerRadius
                , u = a - c
                , f = h - c
                , d = e / (c * 2)
                , m = (n - u) * d
                , g = (o - f) * d
                , p = r.createRadialGradient(m, g, l * d, (a - u) * d, (h - f) * d, c * d);
            Kr(p, t),
                r.fillStyle = t[t.length - 1].color,
                r.fillRect(0, 0, e, e),
                r.fillStyle = p,
                r.translate(m, g),
                r.rotate(this.rotation),
                r.scale(1, this.scale),
                r.translate(-m, -g),
                r.fillRect(0, 0, e, e),
                this.texture = new W({
                    source: new ge({
                        resource: i,
                        addressMode: this._wrapMode
                    })
                });
            const _ = new D;
            _.scale(1 / d, 1 / d),
                _.translate(u, f),
                this.textureSpace === "local" && _.scale(e, e),
                this.transform = _
        }
        destroy() {
            var t;
            (t = this.texture) == null || t.destroy(!0),
                this.texture = null,
                this.transform = null,
                this.colorStops = [],
                this.start = null,
                this.end = null,
                this.center = null,
                this.outerCenter = null
        }
        get styleKey() {
            return `fill-gradient-${this.uid}-${this._tick}`
        }
    }
    ;
or.defaultLinearOptions = {
    start: {
        x: 0,
        y: 0
    },
    end: {
        x: 0,
        y: 1
    },
    colorStops: [],
    textureSpace: "local",
    type: "linear",
    textureSize: 256,
    wrapMode: "clamp-to-edge"
};
or.defaultRadialOptions = {
    center: {
        x: .5,
        y: .5
    },
    innerRadius: 0,
    outerRadius: .5,
    colorStops: [],
    scale: 1,
    textureSpace: "local",
    type: "radial",
    textureSize: 256,
    wrapMode: "clamp-to-edge"
};
let Nt = or;
function Kr(s, t) {
    for (let e = 0; e < t.length; e++) {
        const i = t[e];
        s.addColorStop(i.offset, i.color)
    }
}
function Zr(s, t) {
    const e = X.get().createCanvas(s, t)
        , i = e.getContext("2d");
    return {
        canvas: e,
        context: i
    }
}
function Gl(s) {
    let t = s[0] ?? {};
    return (typeof t == "number" || s[1]) && (U("8.5.2", "use options object instead"),
        t = {
            type: "linear",
            start: {
                x: s[0],
                y: s[1]
            },
            end: {
                x: s[2],
                y: s[3]
            },
            textureSpace: s[4],
            textureSize: s[5] ?? Nt.defaultLinearOptions.textureSize
        }),
        t
}
const Qr = {
    repeat: {
        addressModeU: "repeat",
        addressModeV: "repeat"
    },
    "repeat-x": {
        addressModeU: "repeat",
        addressModeV: "clamp-to-edge"
    },
    "repeat-y": {
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
    },
    "no-repeat": {
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge"
    }
};
class si {
    constructor(t, e) {
        this.uid = tt("fillPattern"),
            this._tick = 0,
            this.transform = new D,
            this.texture = t,
            this.transform.scale(1 / t.frame.width, 1 / t.frame.height),
            e && (t.source.style.addressModeU = Qr[e].addressModeU,
                t.source.style.addressModeV = Qr[e].addressModeV)
    }
    setTransform(t) {
        const e = this.texture;
        this.transform.copyFrom(t),
            this.transform.invert(),
            this.transform.scale(1 / e.frame.width, 1 / e.frame.height),
            this._tick++
    }
    get texture() {
        return this._texture
    }
    set texture(t) {
        this._texture !== t && (this._texture = t,
            this._tick++)
    }
    get styleKey() {
        return `fill-pattern-${this.uid}-${this._tick}`
    }
    destroy() {
        this.texture.destroy(!0),
            this.texture = null
    }
}
var Ci, Jr;
function Ol() {
    if (Jr)
        return Ci;
    Jr = 1,
        Ci = e;
    var s = {
        a: 7,
        c: 6,
        h: 1,
        l: 2,
        m: 2,
        q: 4,
        s: 4,
        t: 2,
        v: 1,
        z: 0
    }
        , t = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
    function e(n) {
        var o = [];
        return n.replace(t, function (a, h, l) {
            var c = h.toLowerCase();
            for (l = r(l),
                c == "m" && l.length > 2 && (o.push([h].concat(l.splice(0, 2))),
                    c = "l",
                    h = h == "m" ? "l" : "L"); ;) {
                if (l.length == s[c])
                    return l.unshift(h),
                        o.push(l);
                if (l.length < s[c])
                    throw new Error("malformed path data");
                o.push([h].concat(l.splice(0, s[c])))
            }
        }),
            o
    }
    var i = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
    function r(n) {
        var o = n.match(i);
        return o ? o.map(Number) : []
    }
    return Ci
}
var Wl = Ol();
const Ul = Hn(Wl);
function Dl(s, t) {
    const e = Ul(s)
        , i = [];
    let r = null
        , n = 0
        , o = 0;
    for (let a = 0; a < e.length; a++) {
        const h = e[a]
            , l = h[0]
            , c = h;
        switch (l) {
            case "M":
                n = c[1],
                    o = c[2],
                    t.moveTo(n, o);
                break;
            case "m":
                n += c[1],
                    o += c[2],
                    t.moveTo(n, o);
                break;
            case "H":
                n = c[1],
                    t.lineTo(n, o);
                break;
            case "h":
                n += c[1],
                    t.lineTo(n, o);
                break;
            case "V":
                o = c[1],
                    t.lineTo(n, o);
                break;
            case "v":
                o += c[1],
                    t.lineTo(n, o);
                break;
            case "L":
                n = c[1],
                    o = c[2],
                    t.lineTo(n, o);
                break;
            case "l":
                n += c[1],
                    o += c[2],
                    t.lineTo(n, o);
                break;
            case "C":
                n = c[5],
                    o = c[6],
                    t.bezierCurveTo(c[1], c[2], c[3], c[4], n, o);
                break;
            case "c":
                t.bezierCurveTo(n + c[1], o + c[2], n + c[3], o + c[4], n + c[5], o + c[6]),
                    n += c[5],
                    o += c[6];
                break;
            case "S":
                n = c[3],
                    o = c[4],
                    t.bezierCurveToShort(c[1], c[2], n, o);
                break;
            case "s":
                t.bezierCurveToShort(n + c[1], o + c[2], n + c[3], o + c[4]),
                    n += c[3],
                    o += c[4];
                break;
            case "Q":
                n = c[3],
                    o = c[4],
                    t.quadraticCurveTo(c[1], c[2], n, o);
                break;
            case "q":
                t.quadraticCurveTo(n + c[1], o + c[2], n + c[3], o + c[4]),
                    n += c[3],
                    o += c[4];
                break;
            case "T":
                n = c[1],
                    o = c[2],
                    t.quadraticCurveToShort(n, o);
                break;
            case "t":
                n += c[1],
                    o += c[2],
                    t.quadraticCurveToShort(n, o);
                break;
            case "A":
                n = c[6],
                    o = c[7],
                    t.arcToSvg(c[1], c[2], c[3], c[4], c[5], n, o);
                break;
            case "a":
                n += c[6],
                    o += c[7],
                    t.arcToSvg(c[1], c[2], c[3], c[4], c[5], n, o);
                break;
            case "Z":
            case "z":
                t.closePath(),
                    i.length > 0 && (r = i.pop(),
                        r ? (n = r.startX,
                            o = r.startY) : (n = 0,
                                o = 0)),
                    r = null;
                break;
            default:
                q(`Unknown SVG path command: ${l}`)
        }
        l !== "Z" && l !== "z" && r === null && (r = {
            startX: n,
            startY: o
        },
            i.push(r))
    }
    return t
}
class ar {
    constructor(t = 0, e = 0, i = 0) {
        this.type = "circle",
            this.x = t,
            this.y = e,
            this.radius = i
    }
    clone() {
        return new ar(this.x, this.y, this.radius)
    }
    contains(t, e) {
        if (this.radius <= 0)
            return !1;
        const i = this.radius * this.radius;
        let r = this.x - t
            , n = this.y - e;
        return r *= r,
            n *= n,
            r + n <= i
    }
    strokeContains(t, e, i, r = .5) {
        if (this.radius === 0)
            return !1;
        const n = this.x - t
            , o = this.y - e
            , a = this.radius
            , h = (1 - r) * i
            , l = Math.sqrt(n * n + o * o);
        return l <= a + h && l > a - (i - h)
    }
    getBounds(t) {
        return t || (t = new K),
            t.x = this.x - this.radius,
            t.y = this.y - this.radius,
            t.width = this.radius * 2,
            t.height = this.radius * 2,
            t
    }
    copyFrom(t) {
        return this.x = t.x,
            this.y = t.y,
            this.radius = t.radius,
            this
    }
    copyTo(t) {
        return t.copyFrom(this),
            t
    }
    toString() {
        return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`
    }
}
class hr {
    constructor(t = 0, e = 0, i = 0, r = 0) {
        this.type = "ellipse",
            this.x = t,
            this.y = e,
            this.halfWidth = i,
            this.halfHeight = r
    }
    clone() {
        return new hr(this.x, this.y, this.halfWidth, this.halfHeight)
    }
    contains(t, e) {
        if (this.halfWidth <= 0 || this.halfHeight <= 0)
            return !1;
        let i = (t - this.x) / this.halfWidth
            , r = (e - this.y) / this.halfHeight;
        return i *= i,
            r *= r,
            i + r <= 1
    }
    strokeContains(t, e, i, r = .5) {
        const { halfWidth: n, halfHeight: o } = this;
        if (n <= 0 || o <= 0)
            return !1;
        const a = i * (1 - r)
            , h = i - a
            , l = n - h
            , c = o - h
            , u = n + a
            , f = o + a
            , d = t - this.x
            , m = e - this.y
            , g = d * d / (l * l) + m * m / (c * c)
            , p = d * d / (u * u) + m * m / (f * f);
        return g > 1 && p <= 1
    }
    getBounds(t) {
        return t || (t = new K),
            t.x = this.x - this.halfWidth,
            t.y = this.y - this.halfHeight,
            t.width = this.halfWidth * 2,
            t.height = this.halfHeight * 2,
            t
    }
    copyFrom(t) {
        return this.x = t.x,
            this.y = t.y,
            this.halfWidth = t.halfWidth,
            this.halfHeight = t.halfHeight,
            this
    }
    copyTo(t) {
        return t.copyFrom(this),
            t
    }
    toString() {
        return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`
    }
}
function zl(s, t, e, i, r, n) {
    const o = s - e
        , a = t - i
        , h = r - e
        , l = n - i
        , c = o * h + a * l
        , u = h * h + l * l;
    let f = -1;
    u !== 0 && (f = c / u);
    let d, m;
    f < 0 ? (d = e,
        m = i) : f > 1 ? (d = r,
            m = n) : (d = e + f * h,
                m = i + f * l);
    const g = s - d
        , p = t - m;
    return g * g + p * p
}
let Hl, Nl;
class os {
    constructor(...t) {
        this.type = "polygon";
        let e = Array.isArray(t[0]) ? t[0] : t;
        if (typeof e[0] != "number") {
            const i = [];
            for (let r = 0, n = e.length; r < n; r++)
                i.push(e[r].x, e[r].y);
            e = i
        }
        this.points = e,
            this.closePath = !0
    }
    isClockwise() {
        let t = 0;
        const e = this.points
            , i = e.length;
        for (let r = 0; r < i; r += 2) {
            const n = e[r]
                , o = e[r + 1]
                , a = e[(r + 2) % i]
                , h = e[(r + 3) % i];
            t += (a - n) * (h + o)
        }
        return t < 0
    }
    containsPolygon(t) {
        const e = this.getBounds(Hl)
            , i = t.getBounds(Nl);
        if (!e.containsRect(i))
            return !1;
        const r = t.points;
        for (let n = 0; n < r.length; n += 2) {
            const o = r[n]
                , a = r[n + 1];
            if (!this.contains(o, a))
                return !1
        }
        return !0
    }
    clone() {
        const t = this.points.slice()
            , e = new os(t);
        return e.closePath = this.closePath,
            e
    }
    contains(t, e) {
        let i = !1;
        const r = this.points.length / 2;
        for (let n = 0, o = r - 1; n < r; o = n++) {
            const a = this.points[n * 2]
                , h = this.points[n * 2 + 1]
                , l = this.points[o * 2]
                , c = this.points[o * 2 + 1];
            h > e != c > e && t < (l - a) * ((e - h) / (c - h)) + a && (i = !i)
        }
        return i
    }
    strokeContains(t, e, i, r = .5) {
        const n = i * i
            , o = n * (1 - r)
            , a = n - o
            , { points: h } = this
            , l = h.length - (this.closePath ? 0 : 2);
        for (let c = 0; c < l; c += 2) {
            const u = h[c]
                , f = h[c + 1]
                , d = h[(c + 2) % h.length]
                , m = h[(c + 3) % h.length]
                , g = zl(t, e, u, f, d, m)
                , p = Math.sign((d - u) * (e - f) - (m - f) * (t - u));
            if (g <= (p < 0 ? a : o))
                return !0
        }
        return !1
    }
    getBounds(t) {
        t || (t = new K);
        const e = this.points;
        let i = 1 / 0
            , r = -1 / 0
            , n = 1 / 0
            , o = -1 / 0;
        for (let a = 0, h = e.length; a < h; a += 2) {
            const l = e[a]
                , c = e[a + 1];
            i = l < i ? l : i,
                r = l > r ? l : r,
                n = c < n ? c : n,
                o = c > o ? c : o
        }
        return t.x = i,
            t.width = r - i,
            t.y = n,
            t.height = o - n,
            t
    }
    copyFrom(t) {
        return this.points = t.points.slice(),
            this.closePath = t.closePath,
            this
    }
    copyTo(t) {
        return t.copyFrom(this),
            t
    }
    toString() {
        return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, e) => `${t}, ${e}`, "")}]`
    }
    get lastX() {
        return this.points[this.points.length - 2]
    }
    get lastY() {
        return this.points[this.points.length - 1]
    }
    get x() {
        return U("8.11.0", "Polygon.lastX is deprecated, please use Polygon.lastX instead."),
            this.points[this.points.length - 2]
    }
    get y() {
        return U("8.11.0", "Polygon.y is deprecated, please use Polygon.lastY instead."),
            this.points[this.points.length - 1]
    }
    get startX() {
        return this.points[0]
    }
    get startY() {
        return this.points[1]
    }
}
const Gs = (s, t, e, i, r, n, o) => {
    const a = s - e
        , h = t - i
        , l = Math.sqrt(a * a + h * h);
    return l >= r - n && l <= r + o
}
    ;
class lr {
    constructor(t = 0, e = 0, i = 0, r = 0, n = 20) {
        this.type = "roundedRectangle",
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = r,
            this.radius = n
    }
    getBounds(t) {
        return t || (t = new K),
            t.x = this.x,
            t.y = this.y,
            t.width = this.width,
            t.height = this.height,
            t
    }
    clone() {
        return new lr(this.x, this.y, this.width, this.height, this.radius)
    }
    copyFrom(t) {
        return this.x = t.x,
            this.y = t.y,
            this.width = t.width,
            this.height = t.height,
            this
    }
    copyTo(t) {
        return t.copyFrom(this),
            t
    }
    contains(t, e) {
        if (this.width <= 0 || this.height <= 0)
            return !1;
        if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
            const i = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
            if (e >= this.y + i && e <= this.y + this.height - i || t >= this.x + i && t <= this.x + this.width - i)
                return !0;
            let r = t - (this.x + i)
                , n = e - (this.y + i);
            const o = i * i;
            if (r * r + n * n <= o || (r = t - (this.x + this.width - i),
                r * r + n * n <= o) || (n = e - (this.y + this.height - i),
                    r * r + n * n <= o) || (r = t - (this.x + i),
                        r * r + n * n <= o))
                return !0
        }
        return !1
    }
    strokeContains(t, e, i, r = .5) {
        const { x: n, y: o, width: a, height: h, radius: l } = this
            , c = i * (1 - r)
            , u = i - c
            , f = n + l
            , d = o + l
            , m = a - l * 2
            , g = h - l * 2
            , p = n + a
            , _ = o + h;
        return (t >= n - c && t <= n + u || t >= p - u && t <= p + c) && e >= d && e <= d + g || (e >= o - c && e <= o + u || e >= _ - u && e <= _ + c) && t >= f && t <= f + m ? !0 : t < f && e < d && Gs(t, e, f, d, l, u, c) || t > p - l && e < d && Gs(t, e, p - l, d, l, u, c) || t > p - l && e > _ - l && Gs(t, e, p - l, _ - l, l, u, c) || t < f && e > _ - l && Gs(t, e, f, _ - l, l, u, c)
    }
    toString() {
        return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`
    }
}
const No = {};
function Vl(s, t, e) {
    let i = 2166136261;
    for (let r = 0; r < t; r++)
        i ^= s[r].uid,
            i = Math.imul(i, 16777619),
            i >>>= 0;
    return No[i] || $l(s, t, i, e)
}
function $l(s, t, e, i) {
    const r = {};
    let n = 0;
    for (let a = 0; a < i; a++) {
        const h = a < t ? s[a] : W.EMPTY.source;
        r[n++] = h.source,
            r[n++] = h.style
    }
    const o = new Ds(r);
    return No[e] = o,
        o
}
class tn {
    constructor(t) {
        typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t,
            this.uint32View = new Uint32Array(this.rawBinaryData),
            this.float32View = new Float32Array(this.rawBinaryData),
            this.size = this.rawBinaryData.byteLength
    }
    get int8View() {
        return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)),
            this._int8View
    }
    get uint8View() {
        return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)),
            this._uint8View
    }
    get int16View() {
        return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)),
            this._int16View
    }
    get int32View() {
        return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)),
            this._int32View
    }
    get float64View() {
        return this._float64Array || (this._float64Array = new Float64Array(this.rawBinaryData)),
            this._float64Array
    }
    get bigUint64View() {
        return this._bigUint64Array || (this._bigUint64Array = new BigUint64Array(this.rawBinaryData)),
            this._bigUint64Array
    }
    view(t) {
        return this[`${t}View`]
    }
    destroy() {
        this.rawBinaryData = null,
            this.uint32View = null,
            this.float32View = null,
            this.uint16View = null,
            this._int8View = null,
            this._uint8View = null,
            this._int16View = null,
            this._int32View = null,
            this._float64Array = null,
            this._bigUint64Array = null
    }
    static sizeOf(t) {
        switch (t) {
            case "int8":
            case "uint8":
                return 1;
            case "int16":
            case "uint16":
                return 2;
            case "int32":
            case "uint32":
            case "float32":
                return 4;
            default:
                throw new Error(`${t} isn't a valid view type`)
        }
    }
}
function en(s, t) {
    const e = s.byteLength / 8 | 0
        , i = new Float64Array(s, 0, e);
    new Float64Array(t, 0, e).set(i);
    const n = s.byteLength - e * 8;
    if (n > 0) {
        const o = new Uint8Array(s, e * 8, n);
        new Uint8Array(t, e * 8, n).set(o)
    }
}
const Yl = {
    normal: "normal-npm",
    add: "add-npm",
    screen: "screen-npm"
};
var Xl = (s => (s[s.DISABLED = 0] = "DISABLED",
    s[s.RENDERING_MASK_ADD = 1] = "RENDERING_MASK_ADD",
    s[s.MASK_ACTIVE = 2] = "MASK_ACTIVE",
    s[s.INVERSE_MASK_ACTIVE = 3] = "INVERSE_MASK_ACTIVE",
    s[s.RENDERING_MASK_REMOVE = 4] = "RENDERING_MASK_REMOVE",
    s[s.NONE = 5] = "NONE",
    s))(Xl || {});
function sn(s, t) {
    return t.alphaMode === "no-premultiply-alpha" && Yl[s] || s
}
const jl = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join(`
`);
function ql(s) {
    let t = "";
    for (let e = 0; e < s; ++e)
        e > 0 && (t += `
else `),
            e < s - 1 && (t += `if(test == ${e}.0){}`);
    return t
}
function Kl(s, t) {
    if (s === 0)
        throw new Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");
    const e = t.createShader(t.FRAGMENT_SHADER);
    try {
        for (; ;) {
            const i = jl.replace(/%forloop%/gi, ql(s));
            if (t.shaderSource(e, i),
                t.compileShader(e),
                !t.getShaderParameter(e, t.COMPILE_STATUS))
                s = s / 2 | 0;
            else
                break
        }
    } finally {
        t.deleteShader(e)
    }
    return s
}
let ve = null;
function Zl() {
    var t;
    if (ve)
        return ve;
    const s = Ao();
    return ve = s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),
        ve = Kl(ve, s),
        (t = s.getExtension("WEBGL_lose_context")) == null || t.loseContext(),
        ve
}
class Ql {
    constructor() {
        this.ids = Object.create(null),
            this.textures = [],
            this.count = 0
    }
    clear() {
        for (let t = 0; t < this.count; t++) {
            const e = this.textures[t];
            this.textures[t] = null,
                this.ids[e.uid] = null
        }
        this.count = 0
    }
}
class Jl {
    constructor() {
        this.renderPipeId = "batch",
            this.action = "startBatch",
            this.start = 0,
            this.size = 0,
            this.textures = new Ql,
            this.blendMode = "normal",
            this.topology = "triangle-strip",
            this.canBundle = !0
    }
    destroy() {
        this.textures = null,
            this.gpuBindGroup = null,
            this.bindGroup = null,
            this.batcher = null
    }
}
const as = [];
let Ys = 0;
_s.register({
    clear: () => {
        if (as.length > 0)
            for (const s of as)
                s && s.destroy();
        as.length = 0,
            Ys = 0
    }
});
function rn() {
    return Ys > 0 ? as[--Ys] : new Jl
}
function nn(s) {
    as[Ys++] = s
}
let Ze = 0;
const Vo = class $o {
    constructor(t) {
        this.uid = tt("batcher"),
            this.dirty = !0,
            this.batchIndex = 0,
            this.batches = [],
            this._elements = [],
            t = {
                ...$o.defaultOptions,
                ...t
            },
            t.maxTextures || (U("v8.8.0", "maxTextures is a required option for Batcher now, please pass it in the options"),
                t.maxTextures = Zl());
        const { maxTextures: e, attributesInitialSize: i, indicesInitialSize: r } = t;
        this.attributeBuffer = new tn(i * 4),
            this.indexBuffer = new Uint16Array(r),
            this.maxTextures = e
    }
    begin() {
        this.elementSize = 0,
            this.elementStart = 0,
            this.indexSize = 0,
            this.attributeSize = 0;
        for (let t = 0; t < this.batchIndex; t++)
            nn(this.batches[t]);
        this.batchIndex = 0,
            this._batchIndexStart = 0,
            this._batchIndexSize = 0,
            this.dirty = !0
    }
    add(t) {
        this._elements[this.elementSize++] = t,
            t._indexStart = this.indexSize,
            t._attributeStart = this.attributeSize,
            t._batcher = this,
            this.indexSize += t.indexSize,
            this.attributeSize += t.attributeSize * this.vertexSize
    }
    checkAndUpdateTexture(t, e) {
        const i = t._batch.textures.ids[e._source.uid];
        return !i && i !== 0 ? !1 : (t._textureId = i,
            t.texture = e,
            !0)
    }
    updateElement(t) {
        this.dirty = !0;
        const e = this.attributeBuffer;
        t.packAsQuad ? this.packQuadAttributes(t, e.float32View, e.uint32View, t._attributeStart, t._textureId) : this.packAttributes(t, e.float32View, e.uint32View, t._attributeStart, t._textureId)
    }
    break(t) {
        const e = this._elements;
        if (!e[this.elementStart])
            return;
        let i = rn()
            , r = i.textures;
        r.clear();
        const n = e[this.elementStart];
        let o = sn(n.blendMode, n.texture._source)
            , a = n.topology;
        this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4),
            this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
        const h = this.attributeBuffer.float32View
            , l = this.attributeBuffer.uint32View
            , c = this.indexBuffer;
        let u = this._batchIndexSize
            , f = this._batchIndexStart
            , d = "startBatch";
        const m = this.maxTextures;
        for (let g = this.elementStart; g < this.elementSize; ++g) {
            const p = e[g];
            e[g] = null;
            const x = p.texture._source
                , y = sn(p.blendMode, x)
                , b = o !== y || a !== p.topology;
            if (x._batchTick === Ze && !b) {
                p._textureId = x._textureBindLocation,
                    u += p.indexSize,
                    p.packAsQuad ? (this.packQuadAttributes(p, h, l, p._attributeStart, p._textureId),
                        this.packQuadIndex(c, p._indexStart, p._attributeStart / this.vertexSize)) : (this.packAttributes(p, h, l, p._attributeStart, p._textureId),
                            this.packIndex(p, c, p._indexStart, p._attributeStart / this.vertexSize)),
                    p._batch = i;
                continue
            }
            x._batchTick = Ze,
                (r.count >= m || b) && (this._finishBatch(i, f, u - f, r, o, a, t, d),
                    d = "renderBatch",
                    f = u,
                    o = y,
                    a = p.topology,
                    i = rn(),
                    r = i.textures,
                    r.clear(),
                    ++Ze),
                p._textureId = x._textureBindLocation = r.count,
                r.ids[x.uid] = r.count,
                r.textures[r.count++] = x,
                p._batch = i,
                u += p.indexSize,
                p.packAsQuad ? (this.packQuadAttributes(p, h, l, p._attributeStart, p._textureId),
                    this.packQuadIndex(c, p._indexStart, p._attributeStart / this.vertexSize)) : (this.packAttributes(p, h, l, p._attributeStart, p._textureId),
                        this.packIndex(p, c, p._indexStart, p._attributeStart / this.vertexSize))
        }
        r.count > 0 && (this._finishBatch(i, f, u - f, r, o, a, t, d),
            f = u,
            ++Ze),
            this.elementStart = this.elementSize,
            this._batchIndexStart = f,
            this._batchIndexSize = u
    }
    _finishBatch(t, e, i, r, n, o, a, h) {
        t.gpuBindGroup = null,
            t.bindGroup = null,
            t.action = h,
            t.batcher = this,
            t.textures = r,
            t.blendMode = n,
            t.topology = o,
            t.start = e,
            t.size = i,
            ++Ze,
            this.batches[this.batchIndex++] = t,
            a.add(t)
    }
    finish(t) {
        this.break(t)
    }
    ensureAttributeBuffer(t) {
        t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4)
    }
    ensureIndexBuffer(t) {
        t <= this.indexBuffer.length || this._resizeIndexBuffer(t)
    }
    _resizeAttributeBuffer(t) {
        const e = Math.max(t, this.attributeBuffer.size * 2)
            , i = new tn(e);
        en(this.attributeBuffer.rawBinaryData, i.rawBinaryData),
            this.attributeBuffer = i
    }
    _resizeIndexBuffer(t) {
        const e = this.indexBuffer;
        let i = Math.max(t, e.length * 1.5);
        i += i % 2;
        const r = i > 65535 ? new Uint32Array(i) : new Uint16Array(i);
        if (r.BYTES_PER_ELEMENT !== e.BYTES_PER_ELEMENT)
            for (let n = 0; n < e.length; n++)
                r[n] = e[n];
        else
            en(e.buffer, r.buffer);
        this.indexBuffer = r
    }
    packQuadIndex(t, e, i) {
        t[e] = i + 0,
            t[e + 1] = i + 1,
            t[e + 2] = i + 2,
            t[e + 3] = i + 0,
            t[e + 4] = i + 2,
            t[e + 5] = i + 3
    }
    packIndex(t, e, i, r) {
        const n = t.indices
            , o = t.indexSize
            , a = t.indexOffset
            , h = t.attributeOffset;
        for (let l = 0; l < o; l++)
            e[i++] = r + n[l + a] - h
    }
    destroy(t = {}) {
        var e;
        if (this.batches !== null) {
            for (let i = 0; i < this.batchIndex; i++)
                nn(this.batches[i]);
            this.batches = null,
                this.geometry.destroy(!0),
                this.geometry = null,
                t.shader && ((e = this.shader) == null || e.destroy(),
                    this.shader = null);
            for (let i = 0; i < this._elements.length; i++)
                this._elements[i] && (this._elements[i]._batch = null);
            this._elements = null,
                this.indexBuffer = null,
                this.attributeBuffer.destroy(),
                this.attributeBuffer = null
        }
    }
}
    ;
Vo.defaultOptions = {
    maxTextures: null,
    attributesInitialSize: 4,
    indicesInitialSize: 6
};
let tc = Vo;
var st = (s => (s[s.MAP_READ = 1] = "MAP_READ",
    s[s.MAP_WRITE = 2] = "MAP_WRITE",
    s[s.COPY_SRC = 4] = "COPY_SRC",
    s[s.COPY_DST = 8] = "COPY_DST",
    s[s.INDEX = 16] = "INDEX",
    s[s.VERTEX = 32] = "VERTEX",
    s[s.UNIFORM = 64] = "UNIFORM",
    s[s.STORAGE = 128] = "STORAGE",
    s[s.INDIRECT = 256] = "INDIRECT",
    s[s.QUERY_RESOLVE = 512] = "QUERY_RESOLVE",
    s[s.STATIC = 1024] = "STATIC",
    s))(st || {});
class re extends mt {
    constructor(t) {
        let { data: e, size: i } = t;
        const { usage: r, label: n, shrinkToFit: o } = t;
        super(),
            this._gpuData = Object.create(null),
            this._gcLastUsed = -1,
            this.autoGarbageCollect = !0,
            this.uid = tt("buffer"),
            this._resourceType = "buffer",
            this._resourceId = tt("resource"),
            this._touched = 0,
            this._updateID = 1,
            this._dataInt32 = null,
            this.shrinkToFit = !0,
            this.destroyed = !1,
            e instanceof Array && (e = new Float32Array(e)),
            this._data = e,
            i ?? (i = e == null ? void 0 : e.byteLength);
        const a = !!e;
        this.descriptor = {
            size: i,
            usage: r,
            mappedAtCreation: a,
            label: n
        },
            this.shrinkToFit = o ?? !0
    }
    get data() {
        return this._data
    }
    set data(t) {
        this.setDataWithSize(t, t.length, !0)
    }
    get dataInt32() {
        return this._dataInt32 || (this._dataInt32 = new Int32Array(this.data.buffer)),
            this._dataInt32
    }
    get static() {
        return !!(this.descriptor.usage & st.STATIC)
    }
    set static(t) {
        t ? this.descriptor.usage |= st.STATIC : this.descriptor.usage &= ~st.STATIC
    }
    setDataWithSize(t, e, i) {
        if (this._updateID++,
            this._updateSize = e * t.BYTES_PER_ELEMENT,
            this._data === t) {
            i && this.emit("update", this);
            return
        }
        const r = this._data;
        if (this._data = t,
            this._dataInt32 = null,
            !r || r.length !== t.length) {
            !this.shrinkToFit && r && t.byteLength < r.byteLength ? i && this.emit("update", this) : (this.descriptor.size = t.byteLength,
                this._resourceId = tt("resource"),
                this.emit("change", this));
            return
        }
        i && this.emit("update", this)
    }
    update(t) {
        this._updateSize = t ?? this._updateSize,
            this._updateID++,
            this.emit("update", this)
    }
    unload() {
        var t;
        this.emit("unload", this);
        for (const e in this._gpuData)
            (t = this._gpuData[e]) == null || t.destroy();
        this._gpuData = Object.create(null)
    }
    destroy() {
        this.destroyed = !0,
            this.unload(),
            this.emit("destroy", this),
            this.emit("change", this),
            this._data = null,
            this.descriptor = null,
            this.removeAllListeners()
    }
}
function Yo(s, t) {
    if (!(s instanceof re)) {
        let e = t ? st.INDEX : st.VERTEX;
        s instanceof Array && (t ? (s = new Uint32Array(s),
            e = st.INDEX | st.COPY_DST) : (s = new Float32Array(s),
                e = st.VERTEX | st.COPY_DST)),
            s = new re({
                data: s,
                label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
                usage: e
            })
    }
    return s
}
function ec(s, t, e) {
    const i = s.getAttribute(t);
    if (!i)
        return e.minX = 0,
            e.minY = 0,
            e.maxX = 0,
            e.maxY = 0,
            e;
    const r = i.buffer.data;
    let n = 1 / 0
        , o = 1 / 0
        , a = -1 / 0
        , h = -1 / 0;
    const l = r.BYTES_PER_ELEMENT
        , c = (i.offset || 0) / l
        , u = (i.stride || 8) / l;
    for (let f = c; f < r.length; f += u) {
        const d = r[f]
            , m = r[f + 1];
        d > a && (a = d),
            m > h && (h = m),
            d < n && (n = d),
            m < o && (o = m)
    }
    return e.minX = n,
        e.minY = o,
        e.maxX = a,
        e.maxY = h,
        e
}
function sc(s) {
    return (s instanceof re || Array.isArray(s) || s.BYTES_PER_ELEMENT) && (s = {
        buffer: s
    }),
        s.buffer = Yo(s.buffer, !1),
        s
}
class Xo extends mt {
    constructor(t = {}) {
        super(),
            this._gpuData = Object.create(null),
            this.autoGarbageCollect = !0,
            this._gcLastUsed = -1,
            this.uid = tt("geometry"),
            this._layoutKey = 0,
            this.instanceCount = 1,
            this._bounds = new Ft,
            this._boundsDirty = !0;
        const { attributes: e, indexBuffer: i, topology: r } = t;
        if (this.buffers = [],
            this.attributes = {},
            e)
            for (const n in e)
                this.addAttribute(n, e[n]);
        this.instanceCount = t.instanceCount ?? 1,
            i && this.addIndex(i),
            this.topology = r || "triangle-list"
    }
    onBufferUpdate() {
        this._boundsDirty = !0,
            this.emit("update", this)
    }
    getAttribute(t) {
        return this.attributes[t]
    }
    getIndex() {
        return this.indexBuffer
    }
    getBuffer(t) {
        return this.getAttribute(t).buffer
    }
    getSize() {
        for (const t in this.attributes) {
            const e = this.attributes[t];
            return e.buffer.data.length / (e.stride / 4 || e.size)
        }
        return 0
    }
    addAttribute(t, e) {
        const i = sc(e);
        this.buffers.indexOf(i.buffer) === -1 && (this.buffers.push(i.buffer),
            i.buffer.on("update", this.onBufferUpdate, this),
            i.buffer.on("change", this.onBufferUpdate, this)),
            this.attributes[t] = i
    }
    addIndex(t) {
        this.indexBuffer = Yo(t, !0),
            this.buffers.push(this.indexBuffer)
    }
    get bounds() {
        return this._boundsDirty ? (this._boundsDirty = !1,
            ec(this, "aPosition", this._bounds)) : this._bounds
    }
    unload() {
        var t;
        this.emit("unload", this);
        for (const e in this._gpuData)
            (t = this._gpuData[e]) == null || t.destroy();
        this._gpuData = Object.create(null)
    }
    destroy(t = !1) {
        var e;
        this.emit("destroy", this),
            this.removeAllListeners(),
            t && this.buffers.forEach(i => i.destroy()),
            this.unload(),
            (e = this.indexBuffer) == null || e.destroy(),
            this.attributes = null,
            this.buffers = null,
            this.indexBuffer = null,
            this._bounds = null
    }
}
const ic = new Float32Array(1)
    , rc = new Uint32Array(1);
class nc extends Xo {
    constructor() {
        const e = new re({
            data: ic,
            label: "attribute-batch-buffer",
            usage: st.VERTEX | st.COPY_DST,
            shrinkToFit: !1
        })
            , i = new re({
                data: rc,
                label: "index-batch-buffer",
                usage: st.INDEX | st.COPY_DST,
                shrinkToFit: !1
            })
            , r = 24;
        super({
            attributes: {
                aPosition: {
                    buffer: e,
                    format: "float32x2",
                    stride: r,
                    offset: 0
                },
                aUV: {
                    buffer: e,
                    format: "float32x2",
                    stride: r,
                    offset: 8
                },
                aColor: {
                    buffer: e,
                    format: "unorm8x4",
                    stride: r,
                    offset: 16
                },
                aTextureIdAndRound: {
                    buffer: e,
                    format: "uint16x2",
                    stride: r,
                    offset: 20
                }
            },
            indexBuffer: i
        })
    }
}
function on(s, t, e) {
    if (s)
        for (const i in s) {
            const r = i.toLocaleLowerCase()
                , n = t[r];
            if (n) {
                let o = s[i];
                i === "header" && (o = o.replace(/@in\s+[^;]+;\s*/g, "").replace(/@out\s+[^;]+;\s*/g, "")),
                    e && n.push(`//----${e}----//`),
                    n.push(o)
            } else
                q(`${i} placement hook does not exist in shader`)
        }
}
const oc = /\{\{(.*?)\}\}/g;
function an(s) {
    var i;
    const t = {};
    return (((i = s.match(oc)) == null ? void 0 : i.map(r => r.replace(/[{()}]/g, ""))) ?? []).forEach(r => {
        t[r] = []
    }
    ),
        t
}
function hn(s, t) {
    let e;
    const i = /@in\s+([^;]+);/g;
    for (; (e = i.exec(s)) !== null;)
        t.push(e[1])
}
function ln(s, t, e = !1) {
    const i = [];
    hn(t, i),
        s.forEach(a => {
            a.header && hn(a.header, i)
        }
        );
    const r = i;
    e && r.sort();
    const n = r.map((a, h) => `       @location(${h}) ${a},`).join(`
`);
    let o = t.replace(/@in\s+[^;]+;\s*/g, "");
    return o = o.replace("{{in}}", `
${n}
`),
        o
}
function cn(s, t) {
    let e;
    const i = /@out\s+([^;]+);/g;
    for (; (e = i.exec(s)) !== null;)
        t.push(e[1])
}
function ac(s) {
    const e = /\b(\w+)\s*:/g.exec(s);
    return e ? e[1] : ""
}
function hc(s) {
    const t = /@.*?\s+/g;
    return s.replace(t, "")
}
function lc(s, t) {
    const e = [];
    cn(t, e),
        s.forEach(h => {
            h.header && cn(h.header, e)
        }
        );
    let i = 0;
    const r = e.sort().map(h => h.indexOf("builtin") > -1 ? h : `@location(${i++}) ${h}`).join(`,
`)
        , n = e.sort().map(h => `       var ${hc(h)};`).join(`
`)
        , o = `return VSOutput(
            ${e.sort().map(h => ` ${ac(h)}`).join(`,
`)});`;
    let a = t.replace(/@out\s+[^;]+;\s*/g, "");
    return a = a.replace("{{struct}}", `
${r}
`),
        a = a.replace("{{start}}", `
${n}
`),
        a = a.replace("{{return}}", `
${o}
`),
        a
}
function un(s, t) {
    let e = s;
    for (const i in t) {
        const r = t[i];
        r.join(`
`).length ? e = e.replace(`{{${i}}}`, `//-----${i} START-----//
${r.join(`
`)}
//----${i} FINISH----//`) : e = e.replace(`{{${i}}}`, "")
    }
    return e
}
const ie = Object.create(null)
    , Pi = new Map;
let cc = 0;
function uc({ template: s, bits: t }) {
    const e = jo(s, t);
    if (ie[e])
        return ie[e];
    const { vertex: i, fragment: r } = fc(s, t);
    return ie[e] = qo(i, r, t),
        ie[e]
}
function dc({ template: s, bits: t }) {
    const e = jo(s, t);
    return ie[e] || (ie[e] = qo(s.vertex, s.fragment, t)),
        ie[e]
}
function fc(s, t) {
    const e = t.map(o => o.vertex).filter(o => !!o)
        , i = t.map(o => o.fragment).filter(o => !!o);
    let r = ln(e, s.vertex, !0);
    r = lc(e, r);
    const n = ln(i, s.fragment, !0);
    return {
        vertex: r,
        fragment: n
    }
}
function jo(s, t) {
    return t.map(e => (Pi.has(e) || Pi.set(e, cc++),
        Pi.get(e))).sort((e, i) => e - i).join("-") + s.vertex + s.fragment
}
function qo(s, t, e) {
    const i = an(s)
        , r = an(t);
    return e.forEach(n => {
        on(n.vertex, i, n.name),
            on(n.fragment, r, n.name)
    }
    ),
    {
        vertex: un(s, i),
        fragment: un(t, r)
    }
}
const pc = `
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`
    , mc = `
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`
    , gc = `
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`
    , _c = `

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`
    , xc = {
        name: "global-uniforms-bit",
        vertex: {
            header: `
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `
        }
    }
    , yc = {
        name: "global-uniforms-bit",
        vertex: {
            header: `
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `
        }
    };
function bc({ bits: s, name: t }) {
    const e = uc({
        template: {
            fragment: mc,
            vertex: pc
        },
        bits: [xc, ...s]
    });
    return ei.from({
        name: t,
        vertex: {
            source: e.vertex,
            entryPoint: "main"
        },
        fragment: {
            source: e.fragment,
            entryPoint: "main"
        }
    })
}
function wc({ bits: s, name: t }) {
    return new vo({
        name: t,
        ...dc({
            template: {
                vertex: gc,
                fragment: _c
            },
            bits: [yc, ...s]
        })
    })
}
const Ac = {
    name: "color-bit",
    vertex: {
        header: `
            @in aColor: vec4<f32>;
        `,
        main: `
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `
    }
}
    , Sc = {
        name: "color-bit",
        vertex: {
            header: `
            in vec4 aColor;
        `,
            main: `
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `
        }
    }
    , Ti = {};
function vc(s) {
    const t = [];
    if (s === 1)
        t.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),
            t.push("@group(1) @binding(1) var textureSampler1: sampler;");
    else {
        let e = 0;
        for (let i = 0; i < s; i++)
            t.push(`@group(1) @binding(${e++}) var textureSource${i + 1}: texture_2d<f32>;`),
                t.push(`@group(1) @binding(${e++}) var textureSampler${i + 1}: sampler;`)
    }
    return t.join(`
`)
}
function Cc(s) {
    const t = [];
    if (s === 1)
        t.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");
    else {
        t.push("switch vTextureId {");
        for (let e = 0; e < s; e++)
            e === s - 1 ? t.push("  default:{") : t.push(`  case ${e}:{`),
                t.push(`      outColor = textureSampleGrad(textureSource${e + 1}, textureSampler${e + 1}, vUV, uvDx, uvDy);`),
                t.push("      break;}");
        t.push("}")
    }
    return t.join(`
`)
}
function Pc(s) {
    return Ti[s] || (Ti[s] = {
        name: "texture-batch-bit",
        vertex: {
            header: `
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,
            main: `
                vTextureId = aTextureIdAndRound.y;
            `,
            end: `
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `
        },
        fragment: {
            header: `
                @in @interpolate(flat) vTextureId: u32;

                ${vc(s)}
            `,
            main: `
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${Cc(s)}
            `
        }
    }),
        Ti[s]
}
const Mi = {};
function Tc(s) {
    const t = [];
    for (let e = 0; e < s; e++)
        e > 0 && t.push("else"),
            e < s - 1 && t.push(`if(vTextureId < ${e}.5)`),
            t.push("{"),
            t.push(`	outColor = texture(uTextures[${e}], vUV);`),
            t.push("}");
    return t.join(`
`)
}
function Mc(s) {
    return Mi[s] || (Mi[s] = {
        name: "texture-batch-bit",
        vertex: {
            header: `
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,
            main: `
                vTextureId = aTextureIdAndRound.y;
            `,
            end: `
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `
        },
        fragment: {
            header: `
                in float vTextureId;

                uniform sampler2D uTextures[${s}];

            `,
            main: `

                ${Tc(s)}
            `
        }
    }),
        Mi[s]
}
const kc = {
    name: "round-pixels-bit",
    vertex: {
        header: `
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
    }
}
    , Ec = {
        name: "round-pixels-bit",
        vertex: {
            header: `
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `
        }
    }
    , dn = {};
function Ic(s) {
    let t = dn[s];
    if (t)
        return t;
    const e = new Int32Array(s);
    for (let i = 0; i < s; i++)
        e[i] = i;
    return t = dn[s] = new Mo({
        uTextures: {
            value: e,
            type: "i32",
            size: s
        }
    }, {
        isStatic: !0
    }),
        t
}
class fn extends nr {
    constructor(t) {
        const e = wc({
            name: "batch",
            bits: [Sc, Mc(t), Ec]
        })
            , i = bc({
                name: "batch",
                bits: [Ac, Pc(t), kc]
            });
        super({
            glProgram: e,
            gpuProgram: i,
            resources: {
                batchSamplers: Ic(t)
            }
        }),
            this.maxTextures = t
    }
}
let Qe = null;
const Ko = class Zo extends tc {
    constructor(t) {
        super(t),
            this.geometry = new nc,
            this.name = Zo.extension.name,
            this.vertexSize = 6,
            Qe ?? (Qe = new fn(t.maxTextures)),
            this.shader = Qe
    }
    packAttributes(t, e, i, r, n) {
        const o = n << 16 | t.roundPixels & 65535
            , a = t.transform
            , h = a.a
            , l = a.b
            , c = a.c
            , u = a.d
            , f = a.tx
            , d = a.ty
            , { positions: m, uvs: g } = t
            , p = t.color
            , _ = t.attributeOffset
            , x = _ + t.attributeSize;
        for (let y = _; y < x; y++) {
            const b = y * 2
                , S = m[b]
                , A = m[b + 1];
            e[r++] = h * S + c * A + f,
                e[r++] = u * A + l * S + d,
                e[r++] = g[b],
                e[r++] = g[b + 1],
                i[r++] = p,
                i[r++] = o
        }
    }
    packQuadAttributes(t, e, i, r, n) {
        const o = t.texture
            , a = t.transform
            , h = a.a
            , l = a.b
            , c = a.c
            , u = a.d
            , f = a.tx
            , d = a.ty
            , m = t.bounds
            , g = m.maxX
            , p = m.minX
            , _ = m.maxY
            , x = m.minY
            , y = o.uvs
            , b = t.color
            , S = n << 16 | t.roundPixels & 65535;
        e[r + 0] = h * p + c * x + f,
            e[r + 1] = u * x + l * p + d,
            e[r + 2] = y.x0,
            e[r + 3] = y.y0,
            i[r + 4] = b,
            i[r + 5] = S,
            e[r + 6] = h * g + c * x + f,
            e[r + 7] = u * x + l * g + d,
            e[r + 8] = y.x1,
            e[r + 9] = y.y1,
            i[r + 10] = b,
            i[r + 11] = S,
            e[r + 12] = h * g + c * _ + f,
            e[r + 13] = u * _ + l * g + d,
            e[r + 14] = y.x2,
            e[r + 15] = y.y2,
            i[r + 16] = b,
            i[r + 17] = S,
            e[r + 18] = h * p + c * _ + f,
            e[r + 19] = u * _ + l * p + d,
            e[r + 20] = y.x3,
            e[r + 21] = y.y3,
            i[r + 22] = b,
            i[r + 23] = S
    }
    _updateMaxTextures(t) {
        this.shader.maxTextures !== t && (Qe = new fn(t),
            this.shader = Qe)
    }
    destroy() {
        this.shader = null,
            super.destroy()
    }
}
    ;
Ko.extension = {
    type: [B.Batcher],
    name: "default"
};
let Bc = Ko;
class Fc {
    constructor(t) {
        this.items = Object.create(null);
        const { renderer: e, type: i, onUnload: r, priority: n, name: o } = t;
        this._renderer = e,
            e.gc.addResourceHash(this, "items", i, n ?? 0),
            this._onUnload = r,
            this.name = o
    }
    add(t) {
        return this.items[t.uid] ? !1 : (this.items[t.uid] = t,
            t.once("unload", this.remove, this),
            t._gcLastUsed = this._renderer.gc.now,
            !0)
    }
    remove(t, ...e) {
        var r;
        if (!this.items[t.uid])
            return;
        const i = t._gpuData[this._renderer.uid];
        i && ((r = this._onUnload) == null || r.call(this, t, ...e),
            i.destroy(),
            t._gpuData[this._renderer.uid] = null,
            this.items[t.uid] = null)
    }
    removeAll(...t) {
        Object.values(this.items).forEach(e => e && this.remove(e, ...t))
    }
    destroy(...t) {
        this.removeAll(...t),
            this.items = Object.create(null),
            this._renderer = null,
            this._onUnload = null
    }
}
function Rc(s, t, e, i, r, n, o, a = null) {
    let h = 0;
    e *= t,
        r *= n;
    const l = a.a
        , c = a.b
        , u = a.c
        , f = a.d
        , d = a.tx
        , m = a.ty;
    for (; h < o;) {
        const g = s[e]
            , p = s[e + 1];
        i[r] = l * g + u * p + d,
            i[r + 1] = c * g + f * p + m,
            r += n,
            e += t,
            h++
    }
}
function Lc(s, t, e, i) {
    let r = 0;
    for (t *= e; r < i;)
        s[t] = 0,
            s[t + 1] = 0,
            t += e,
            r++
}
function Qo(s, t, e, i, r) {
    const n = t.a
        , o = t.b
        , a = t.c
        , h = t.d
        , l = t.tx
        , c = t.ty;
    e || (e = 0),
        i || (i = 2),
        r || (r = s.length / i - e);
    let u = e * i;
    for (let f = 0; f < r; f++) {
        const d = s[u]
            , m = s[u + 1];
        s[u] = n * d + a * m + l,
            s[u + 1] = o * d + h * m + c,
            u += i
    }
}
const Gc = new D;
class Jo {
    constructor() {
        this.packAsQuad = !1,
            this.batcherName = "default",
            this.topology = "triangle-list",
            this.applyTransform = !0,
            this.roundPixels = 0,
            this._batcher = null,
            this._batch = null
    }
    get uvs() {
        return this.geometryData.uvs
    }
    get positions() {
        return this.geometryData.vertices
    }
    get indices() {
        return this.geometryData.indices
    }
    get blendMode() {
        return this.renderable && this.applyTransform ? this.renderable.groupBlendMode : "normal"
    }
    get color() {
        const t = this.baseColor
            , e = t >> 16 | t & 65280 | (t & 255) << 16
            , i = this.renderable;
        return i ? eo(e, i.groupColor) + (this.alpha * i.groupAlpha * 255 << 24) : e + (this.alpha * 255 << 24)
    }
    get transform() {
        var t;
        return ((t = this.renderable) == null ? void 0 : t.groupTransform) || Gc
    }
    copyTo(t) {
        t.indexOffset = this.indexOffset,
            t.indexSize = this.indexSize,
            t.attributeOffset = this.attributeOffset,
            t.attributeSize = this.attributeSize,
            t.baseColor = this.baseColor,
            t.alpha = this.alpha,
            t.texture = this.texture,
            t.geometryData = this.geometryData,
            t.topology = this.topology
    }
    reset() {
        this.applyTransform = !0,
            this.renderable = null,
            this.topology = "triangle-list"
    }
    destroy() {
        this.renderable = null,
            this.texture = null,
            this.geometryData = null,
            this._batcher = null,
            this._batch = null
    }
}
const ds = {
    extension: {
        type: B.ShapeBuilder,
        name: "circle"
    },
    build(s, t) {
        let e, i, r, n, o, a;
        if (s.type === "circle") {
            const b = s;
            if (o = a = b.radius,
                o <= 0)
                return !1;
            e = b.x,
                i = b.y,
                r = n = 0
        } else if (s.type === "ellipse") {
            const b = s;
            if (o = b.halfWidth,
                a = b.halfHeight,
                o <= 0 || a <= 0)
                return !1;
            e = b.x,
                i = b.y,
                r = n = 0
        } else {
            const b = s
                , S = b.width / 2
                , A = b.height / 2;
            e = b.x + S,
                i = b.y + A,
                o = a = Math.max(0, Math.min(b.radius, Math.min(S, A))),
                r = S - o,
                n = A - a
        }
        if (r < 0 || n < 0)
            return !1;
        const h = Math.ceil(2.3 * Math.sqrt(o + a))
            , l = h * 8 + (r ? 4 : 0) + (n ? 4 : 0);
        if (l === 0)
            return !1;
        if (h === 0)
            return t[0] = t[6] = e + r,
                t[1] = t[3] = i + n,
                t[2] = t[4] = e - r,
                t[5] = t[7] = i - n,
                !0;
        let c = 0
            , u = h * 4 + (r ? 2 : 0) + 2
            , f = u
            , d = l
            , m = r + o
            , g = n
            , p = e + m
            , _ = e - m
            , x = i + g;
        if (t[c++] = p,
            t[c++] = x,
            t[--u] = x,
            t[--u] = _,
            n) {
            const b = i - g;
            t[f++] = _,
                t[f++] = b,
                t[--d] = b,
                t[--d] = p
        }
        for (let b = 1; b < h; b++) {
            const S = Math.PI / 2 * (b / h)
                , A = r + Math.cos(S) * o
                , w = n + Math.sin(S) * a
                , L = e + A
                , k = e - A
                , C = i + w
                , P = i - w;
            t[c++] = L,
                t[c++] = C,
                t[--u] = C,
                t[--u] = k,
                t[f++] = k,
                t[f++] = P,
                t[--d] = P,
                t[--d] = L
        }
        m = r,
            g = n + a,
            p = e + m,
            _ = e - m,
            x = i + g;
        const y = i - g;
        return t[c++] = p,
            t[c++] = x,
            t[--d] = y,
            t[--d] = p,
            r && (t[c++] = _,
                t[c++] = x,
                t[--d] = y,
                t[--d] = _),
            !0
    },
    triangulate(s, t, e, i, r, n) {
        if (s.length === 0)
            return;
        let o = 0
            , a = 0;
        for (let c = 0; c < s.length; c += 2)
            o += s[c],
                a += s[c + 1];
        o /= s.length / 2,
            a /= s.length / 2;
        let h = i;
        t[h * e] = o,
            t[h * e + 1] = a;
        const l = h++;
        for (let c = 0; c < s.length; c += 2)
            t[h * e] = s[c],
                t[h * e + 1] = s[c + 1],
                c > 0 && (r[n++] = h,
                    r[n++] = l,
                    r[n++] = h - 1),
                h++;
        r[n++] = l + 1,
            r[n++] = l,
            r[n++] = h - 1
    }
}
    , Oc = {
        ...ds,
        extension: {
            ...ds.extension,
            name: "ellipse"
        }
    }
    , Wc = {
        ...ds,
        extension: {
            ...ds.extension,
            name: "roundedRectangle"
        }
    }
    , ta = 1e-4
    , pn = 1e-4;
function Uc(s) {
    const t = s.length;
    if (t < 6)
        return 1;
    let e = 0;
    for (let i = 0, r = s[t - 2], n = s[t - 1]; i < t; i += 2) {
        const o = s[i]
            , a = s[i + 1];
        e += (o - r) * (a + n),
            r = o,
            n = a
    }
    return e < 0 ? -1 : 1
}
function mn(s, t, e, i, r, n, o, a) {
    const h = s - e * r
        , l = t - i * r
        , c = s + e * n
        , u = t + i * n;
    let f, d;
    o ? (f = i,
        d = -e) : (f = -i,
            d = e);
    const m = h + f
        , g = l + d
        , p = c + f
        , _ = u + d;
    return a.push(m, g),
        a.push(p, _),
        2
}
function le(s, t, e, i, r, n, o, a) {
    const h = e - s
        , l = i - t;
    let c = Math.atan2(h, l)
        , u = Math.atan2(r - s, n - t);
    a && c < u ? c += Math.PI * 2 : !a && c > u && (u += Math.PI * 2);
    let f = c;
    const d = u - c
        , m = Math.abs(d)
        , g = Math.sqrt(h * h + l * l)
        , p = (15 * m * Math.sqrt(g) / Math.PI >> 0) + 1
        , _ = d / p;
    if (f += _,
        a) {
        o.push(s, t),
            o.push(e, i);
        for (let x = 1, y = f; x < p; x++,
            y += _)
            o.push(s, t),
                o.push(s + Math.sin(y) * g, t + Math.cos(y) * g);
        o.push(s, t),
            o.push(r, n)
    } else {
        o.push(e, i),
            o.push(s, t);
        for (let x = 1, y = f; x < p; x++,
            y += _)
            o.push(s + Math.sin(y) * g, t + Math.cos(y) * g),
                o.push(s, t);
        o.push(r, n),
            o.push(s, t)
    }
    return p * 2
}
function Dc(s, t, e, i, r, n) {
    const o = ta;
    if (s.length === 0)
        return;
    const a = t;
    let h = a.alignment;
    if (t.alignment !== .5) {
        let H = Uc(s);
        h = (h - .5) * H + .5
    }
    const l = new pt(s[0], s[1])
        , c = new pt(s[s.length - 2], s[s.length - 1])
        , u = i
        , f = Math.abs(l.x - c.x) < o && Math.abs(l.y - c.y) < o;
    if (u) {
        s = s.slice(),
            f && (s.pop(),
                s.pop(),
                c.set(s[s.length - 2], s[s.length - 1]));
        const H = (l.x + c.x) * .5
            , xt = (c.y + l.y) * .5;
        s.unshift(H, xt),
            s.push(H, xt)
    }
    const d = r
        , m = s.length / 2;
    let g = s.length;
    const p = d.length / 2
        , _ = a.width / 2
        , x = _ * _
        , y = a.miterLimit * a.miterLimit;
    let b = s[0]
        , S = s[1]
        , A = s[2]
        , w = s[3]
        , L = 0
        , k = 0
        , C = -(S - w)
        , P = b - A
        , z = 0
        , G = 0
        , $ = Math.sqrt(C * C + P * P);
    C /= $,
        P /= $,
        C *= _,
        P *= _;
    const Gt = h
        , T = (1 - Gt) * 2
        , F = Gt * 2;
    u || (a.cap === "round" ? g += le(b - C * (T - F) * .5, S - P * (T - F) * .5, b - C * T, S - P * T, b + C * F, S + P * F, d, !0) + 2 : a.cap === "square" && (g += mn(b, S, C, P, T, F, !0, d))),
        d.push(b - C * T, S - P * T),
        d.push(b + C * F, S + P * F);
    for (let H = 1; H < m - 1; ++H) {
        b = s[(H - 1) * 2],
            S = s[(H - 1) * 2 + 1],
            A = s[H * 2],
            w = s[H * 2 + 1],
            L = s[(H + 1) * 2],
            k = s[(H + 1) * 2 + 1],
            C = -(S - w),
            P = b - A,
            $ = Math.sqrt(C * C + P * P),
            C /= $,
            P /= $,
            C *= _,
            P *= _,
            z = -(w - k),
            G = A - L,
            $ = Math.sqrt(z * z + G * G),
            z /= $,
            G /= $,
            z *= _,
            G *= _;
        const xt = A - b
            , Vt = S - w
            , Ot = A - L
            , $t = k - w
            , xs = xt * Ot + Vt * $t
            , ee = Vt * Ot - $t * xt
            , St = ee < 0;
        if (Math.abs(ee) < .001 * Math.abs(xs)) {
            d.push(A - C * T, w - P * T),
                d.push(A + C * F, w + P * F),
                xs >= 0 && (a.join === "round" ? g += le(A, w, A - C * T, w - P * T, A - z * T, w - G * T, d, !1) + 4 : g += 2,
                    d.push(A - z * F, w - G * F),
                    d.push(A + z * T, w + G * T));
            continue
        }
        const vt = (-C + b) * (-P + w) - (-C + A) * (-P + S)
            , Yt = (-z + L) * (-G + w) - (-z + A) * (-G + k)
            , xe = (xt * Yt - Ot * vt) / ee
            , ye = ($t * vt - Vt * Yt) / ee
            , We = (xe - A) * (xe - A) + (ye - w) * (ye - w)
            , Xt = A + (xe - A) * T
            , Ct = w + (ye - w) * T
            , Pt = A - (xe - A) * F
            , yt = w - (ye - w) * F
            , ni = Math.min(xt * xt + Vt * Vt, Ot * Ot + $t * $t)
            , bt = St ? T : F
            , Ue = ni + bt * bt * x;
        We <= Ue ? a.join === "bevel" || We / x > y ? (St ? (d.push(Xt, Ct),
            d.push(A + C * F, w + P * F),
            d.push(Xt, Ct),
            d.push(A + z * F, w + G * F)) : (d.push(A - C * T, w - P * T),
                d.push(Pt, yt),
                d.push(A - z * T, w - G * T),
                d.push(Pt, yt)),
            g += 2) : a.join === "round" ? St ? (d.push(Xt, Ct),
                d.push(A + C * F, w + P * F),
                g += le(A, w, A + C * F, w + P * F, A + z * F, w + G * F, d, !0) + 4,
                d.push(Xt, Ct),
                d.push(A + z * F, w + G * F)) : (d.push(A - C * T, w - P * T),
                    d.push(Pt, yt),
                    g += le(A, w, A - C * T, w - P * T, A - z * T, w - G * T, d, !1) + 4,
                    d.push(A - z * T, w - G * T),
                    d.push(Pt, yt)) : (d.push(Xt, Ct),
                        d.push(Pt, yt)) : (d.push(A - C * T, w - P * T),
                            d.push(A + C * F, w + P * F),
                            a.join === "round" ? St ? g += le(A, w, A + C * F, w + P * F, A + z * F, w + G * F, d, !0) + 2 : g += le(A, w, A - C * T, w - P * T, A - z * T, w - G * T, d, !1) + 2 : a.join === "miter" && We / x <= y && (St ? (d.push(Pt, yt),
                                d.push(Pt, yt)) : (d.push(Xt, Ct),
                                    d.push(Xt, Ct)),
                                g += 2),
                            d.push(A - z * T, w - G * T),
                            d.push(A + z * F, w + G * F),
                            g += 2)
    }
    b = s[(m - 2) * 2],
        S = s[(m - 2) * 2 + 1],
        A = s[(m - 1) * 2],
        w = s[(m - 1) * 2 + 1],
        C = -(S - w),
        P = b - A,
        $ = Math.sqrt(C * C + P * P),
        C /= $,
        P /= $,
        C *= _,
        P *= _,
        d.push(A - C * T, w - P * T),
        d.push(A + C * F, w + P * F),
        u || (a.cap === "round" ? g += le(A - C * (T - F) * .5, w - P * (T - F) * .5, A - C * T, w - P * T, A + C * F, w + P * F, d, !1) + 2 : a.cap === "square" && (g += mn(A, w, C, P, T, F, !1, d)));
    const ne = pn * pn;
    for (let H = p; H < g + p - 2; ++H)
        b = d[H * 2],
            S = d[H * 2 + 1],
            A = d[(H + 1) * 2],
            w = d[(H + 1) * 2 + 1],
            L = d[(H + 2) * 2],
            k = d[(H + 2) * 2 + 1],
            !(Math.abs(b * (w - k) + A * (k - S) + L * (S - w)) < ne) && n.push(H, H + 1, H + 2)
}
function zc(s, t, e, i) {
    const r = ta;
    if (s.length === 0)
        return;
    const n = s[0]
        , o = s[1]
        , a = s[s.length - 2]
        , h = s[s.length - 1]
        , l = t || Math.abs(n - a) < r && Math.abs(o - h) < r
        , c = e
        , u = s.length / 2
        , f = c.length / 2;
    for (let d = 0; d < u; d++)
        c.push(s[d * 2]),
            c.push(s[d * 2 + 1]);
    for (let d = 0; d < u - 1; d++)
        i.push(f + d, f + d + 1);
    l && i.push(f + u - 1, f)
}
function ea(s, t, e, i, r, n, o) {
    const a = Tl(s, t, 2);
    if (!a)
        return;
    for (let l = 0; l < a.length; l += 3)
        n[o++] = a[l] + r,
            n[o++] = a[l + 1] + r,
            n[o++] = a[l + 2] + r;
    let h = r * i;
    for (let l = 0; l < s.length; l += 2)
        e[h] = s[l],
            e[h + 1] = s[l + 1],
            h += i
}
const Hc = []
    , Nc = {
        extension: {
            type: B.ShapeBuilder,
            name: "polygon"
        },
        build(s, t) {
            for (let e = 0; e < s.points.length; e++)
                t[e] = s.points[e];
            return !0
        },
        triangulate(s, t, e, i, r, n) {
            ea(s, Hc, t, e, i, r, n)
        }
    }
    , Vc = {
        extension: {
            type: B.ShapeBuilder,
            name: "rectangle"
        },
        build(s, t) {
            const e = s
                , i = e.x
                , r = e.y
                , n = e.width
                , o = e.height;
            return n > 0 && o > 0 ? (t[0] = i,
                t[1] = r,
                t[2] = i + n,
                t[3] = r,
                t[4] = i + n,
                t[5] = r + o,
                t[6] = i,
                t[7] = r + o,
                !0) : !1
        },
        triangulate(s, t, e, i, r, n) {
            let o = 0;
            i *= e,
                t[i + o] = s[0],
                t[i + o + 1] = s[1],
                o += e,
                t[i + o] = s[2],
                t[i + o + 1] = s[3],
                o += e,
                t[i + o] = s[6],
                t[i + o + 1] = s[7],
                o += e,
                t[i + o] = s[4],
                t[i + o + 1] = s[5],
                o += e;
            const a = i / e;
            r[n++] = a,
                r[n++] = a + 1,
                r[n++] = a + 2,
                r[n++] = a + 1,
                r[n++] = a + 3,
                r[n++] = a + 2
        }
    }
    , $c = {
        extension: {
            type: B.ShapeBuilder,
            name: "triangle"
        },
        build(s, t) {
            return t[0] = s.x,
                t[1] = s.y,
                t[2] = s.x2,
                t[3] = s.y2,
                t[4] = s.x3,
                t[5] = s.y3,
                !0
        },
        triangulate(s, t, e, i, r, n) {
            let o = 0;
            i *= e,
                t[i + o] = s[0],
                t[i + o + 1] = s[1],
                o += e,
                t[i + o] = s[2],
                t[i + o + 1] = s[3],
                o += e,
                t[i + o] = s[4],
                t[i + o + 1] = s[5];
            const a = i / e;
            r[n++] = a,
                r[n++] = a + 1,
                r[n++] = a + 2
        }
    }
    , Yc = new D
    , Xc = new K;
function jc(s, t, e, i) {
    const r = t.matrix ? s.copyFrom(t.matrix).invert() : s.identity();
    if (t.textureSpace === "local") {
        const o = e.getBounds(Xc);
        t.width && o.pad(t.width);
        const { x: a, y: h } = o
            , l = 1 / o.width
            , c = 1 / o.height
            , u = -a * l
            , f = -h * c
            , d = r.a
            , m = r.b
            , g = r.c
            , p = r.d;
        r.a *= l,
            r.b *= l,
            r.c *= c,
            r.d *= c,
            r.tx = u * d + f * g + r.tx,
            r.ty = u * m + f * p + r.ty
    } else
        r.translate(t.texture.frame.x, t.texture.frame.y),
            r.scale(1 / t.texture.source.width, 1 / t.texture.source.height);
    const n = t.texture.source.style;
    return !(t.fill instanceof Nt) && n.addressMode === "clamp-to-edge" && (n.addressMode = "repeat",
        n.update()),
        i && r.append(Yc.copyFrom(i).invert()),
        r
}
const ii = {};
lt.handleByMap(B.ShapeBuilder, ii);
lt.add(Vc, Nc, $c, ds, Oc, Wc);
const qc = new K
    , Kc = new D;
function Zc(s, t) {
    const { geometryData: e, batches: i } = t;
    i.length = 0,
        e.indices.length = 0,
        e.vertices.length = 0,
        e.uvs.length = 0;
    for (let r = 0; r < s.instructions.length; r++) {
        const n = s.instructions[r];
        if (n.action === "texture")
            Qc(n.data, i, e);
        else if (n.action === "fill" || n.action === "stroke") {
            const o = n.action === "stroke"
                , a = n.data.path.shapePath
                , h = n.data.style
                , l = n.data.hole;
            o && l && gn(l.shapePath, h, !0, i, e),
                l && (a.shapePrimitives[a.shapePrimitives.length - 1].holes = l.shapePath.shapePrimitives),
                gn(a, h, o, i, e)
        }
    }
}
function Qc(s, t, e) {
    const i = []
        , r = ii.rectangle
        , n = qc;
    n.x = s.dx,
        n.y = s.dy,
        n.width = s.dw,
        n.height = s.dh;
    const o = s.transform;
    if (!r.build(n, i))
        return;
    const { vertices: a, uvs: h, indices: l } = e
        , c = l.length
        , u = a.length / 2;
    o && Qo(i, o),
        r.triangulate(i, a, 2, u, l, c);
    const f = s.image
        , d = f.uvs;
    h.push(d.x0, d.y0, d.x1, d.y1, d.x3, d.y3, d.x2, d.y2);
    const m = Et.get(Jo);
    m.indexOffset = c,
        m.indexSize = l.length - c,
        m.attributeOffset = u,
        m.attributeSize = a.length / 2 - u,
        m.baseColor = s.style,
        m.alpha = s.alpha,
        m.texture = f,
        m.geometryData = e,
        t.push(m)
}
function gn(s, t, e, i, r) {
    const { vertices: n, uvs: o, indices: a } = r;
    s.shapePrimitives.forEach(({ shape: h, transform: l, holes: c }) => {
        const u = []
            , f = ii[h.type];
        if (!f.build(h, u))
            return;
        const d = a.length
            , m = n.length / 2;
        let g = "triangle-list";
        if (l && Qo(u, l),
            e) {
            const y = h.closePath ?? !0
                , b = t;
            b.pixelLine ? (zc(u, y, n, a),
                g = "line-list") : Dc(u, b, !1, y, n, a)
        } else if (c) {
            const y = []
                , b = u.slice();
            Jc(c).forEach(A => {
                y.push(b.length / 2),
                    b.push(...A)
            }
            ),
                ea(b, y, n, 2, m, a, d)
        } else
            f.triangulate(u, n, 2, m, a, d);
        const p = o.length / 2
            , _ = t.texture;
        if (_ !== W.WHITE) {
            const y = jc(Kc, t, h, l);
            Rc(n, 2, m, o, p, 2, n.length / 2 - m, y)
        } else
            Lc(o, p, 2, n.length / 2 - m);
        const x = Et.get(Jo);
        x.indexOffset = d,
            x.indexSize = a.length - d,
            x.attributeOffset = m,
            x.attributeSize = n.length / 2 - m,
            x.baseColor = t.color,
            x.alpha = t.alpha,
            x.texture = _,
            x.geometryData = r,
            x.topology = g,
            i.push(x)
    }
    )
}
function Jc(s) {
    const t = [];
    for (let e = 0; e < s.length; e++) {
        const i = s[e].shape
            , r = [];
        ii[i.type].build(i, r) && t.push(r)
    }
    return t
}
class tu {
    constructor() {
        this.batches = [],
            this.geometryData = {
                vertices: [],
                uvs: [],
                indices: []
            }
    }
    reset() {
        this.batches && this.batches.forEach(t => {
            Et.return(t)
        }
        ),
            this.graphicsData && Et.return(this.graphicsData),
            this.isBatchable = !1,
            this.context = null,
            this.batches.length = 0,
            this.geometryData.indices.length = 0,
            this.geometryData.vertices.length = 0,
            this.geometryData.uvs.length = 0,
            this.graphicsData = null
    }
    destroy() {
        this.reset(),
            this.batches = null,
            this.geometryData = null
    }
}
class eu {
    constructor() {
        this.instructions = new no
    }
    init(t) {
        const e = t.maxTextures;
        this.batcher ? this.batcher._updateMaxTextures(e) : this.batcher = new Bc({
            maxTextures: e
        }),
            this.instructions.reset()
    }
    get geometry() {
        return U(Qa, "GraphicsContextRenderData#geometry is deprecated, please use batcher.geometry instead."),
            this.batcher.geometry
    }
    destroy() {
        this.batcher.destroy(),
            this.instructions.destroy(),
            this.batcher = null,
            this.instructions = null
    }
}
const cr = class qi {
    constructor(t) {
        this._renderer = t,
            this._managedContexts = new Fc({
                renderer: t,
                type: "resource",
                name: "graphicsContext"
            })
    }
    init(t) {
        qi.defaultOptions.bezierSmoothness = (t == null ? void 0 : t.bezierSmoothness) ?? qi.defaultOptions.bezierSmoothness
    }
    getContextRenderData(t) {
        return t._gpuData[this._renderer.uid].graphicsData || this._initContextRenderData(t)
    }
    updateGpuContext(t) {
        const e = !!t._gpuData[this._renderer.uid]
            , i = t._gpuData[this._renderer.uid] || this._initContext(t);
        if (t.dirty || !e) {
            e && i.reset(),
                Zc(t, i);
            const r = t.batchMode;
            t.customShader || r === "no-batch" ? i.isBatchable = !1 : r === "auto" ? i.isBatchable = i.geometryData.vertices.length < 400 : i.isBatchable = !0,
                t.dirty = !1
        }
        return i
    }
    getGpuContext(t) {
        return t._gpuData[this._renderer.uid] || this._initContext(t)
    }
    _initContextRenderData(t) {
        const e = Et.get(eu, {
            maxTextures: this._renderer.limits.maxBatchableTextures
        })
            , i = t._gpuData[this._renderer.uid]
            , { batches: r, geometryData: n } = i;
        i.graphicsData = e;
        const o = n.vertices.length
            , a = n.indices.length;
        for (let u = 0; u < r.length; u++)
            r[u].applyTransform = !1;
        const h = e.batcher;
        h.ensureAttributeBuffer(o),
            h.ensureIndexBuffer(a),
            h.begin();
        for (let u = 0; u < r.length; u++) {
            const f = r[u];
            h.add(f)
        }
        h.finish(e.instructions);
        const l = h.geometry;
        l.indexBuffer.setDataWithSize(h.indexBuffer, h.indexSize, !0),
            l.buffers[0].setDataWithSize(h.attributeBuffer.float32View, h.attributeSize, !0);
        const c = h.batches;
        for (let u = 0; u < c.length; u++) {
            const f = c[u];
            f.bindGroup = Vl(f.textures.textures, f.textures.count, this._renderer.limits.maxBatchableTextures)
        }
        return e
    }
    _initContext(t) {
        const e = new tu;
        return e.context = t,
            t._gpuData[this._renderer.uid] = e,
            this._managedContexts.add(t),
            e
    }
    destroy() {
        this._managedContexts.destroy(),
            this._renderer = null
    }
}
    ;
cr.extension = {
    type: [B.WebGLSystem, B.WebGPUSystem, B.CanvasSystem],
    name: "graphicsContext"
};
cr.defaultOptions = {
    bezierSmoothness: .5
};
let sa = cr;
const su = 8
    , Os = 11920929e-14
    , iu = 1;
function ia(s, t, e, i, r, n, o, a, h, l) {
    const u = Math.min(.99, Math.max(0, l ?? sa.defaultOptions.bezierSmoothness));
    let f = (iu - u) / 1;
    return f *= f,
        ru(t, e, i, r, n, o, a, h, s, f),
        s
}
function ru(s, t, e, i, r, n, o, a, h, l) {
    Ki(s, t, e, i, r, n, o, a, h, l, 0),
        h.push(o, a)
}
function Ki(s, t, e, i, r, n, o, a, h, l, c) {
    if (c > su)
        return;
    const u = (s + e) / 2
        , f = (t + i) / 2
        , d = (e + r) / 2
        , m = (i + n) / 2
        , g = (r + o) / 2
        , p = (n + a) / 2
        , _ = (u + d) / 2
        , x = (f + m) / 2
        , y = (d + g) / 2
        , b = (m + p) / 2
        , S = (_ + y) / 2
        , A = (x + b) / 2;
    if (c > 0) {
        let w = o - s
            , L = a - t;
        const k = Math.abs((e - o) * L - (i - a) * w)
            , C = Math.abs((r - o) * L - (n - a) * w);
        if (k > Os && C > Os) {
            if ((k + C) * (k + C) <= l * (w * w + L * L)) {
                h.push(S, A);
                return
            }
        } else if (k > Os) {
            if (k * k <= l * (w * w + L * L)) {
                h.push(S, A);
                return
            }
        } else if (C > Os) {
            if (C * C <= l * (w * w + L * L)) {
                h.push(S, A);
                return
            }
        } else if (w = S - (s + o) / 2,
            L = A - (t + a) / 2,
            w * w + L * L <= l) {
            h.push(S, A);
            return
        }
    }
    Ki(s, t, u, f, _, x, S, A, h, l, c + 1),
        Ki(S, A, y, b, g, p, o, a, h, l, c + 1)
}
const nu = 8
    , ou = 11920929e-14
    , au = 1;
function hu(s, t, e, i, r, n, o, a) {
    const l = Math.min(.99, Math.max(0, a ?? sa.defaultOptions.bezierSmoothness));
    let c = (au - l) / 1;
    return c *= c,
        lu(t, e, i, r, n, o, s, c),
        s
}
function lu(s, t, e, i, r, n, o, a) {
    Zi(o, s, t, e, i, r, n, a, 0),
        o.push(r, n)
}
function Zi(s, t, e, i, r, n, o, a, h) {
    if (h > nu)
        return;
    const l = (t + i) / 2
        , c = (e + r) / 2
        , u = (i + n) / 2
        , f = (r + o) / 2
        , d = (l + u) / 2
        , m = (c + f) / 2;
    let g = n - t
        , p = o - e;
    const _ = Math.abs((i - n) * p - (r - o) * g);
    if (_ > ou) {
        if (_ * _ <= a * (g * g + p * p)) {
            s.push(d, m);
            return
        }
    } else if (g = d - (t + n) / 2,
        p = m - (e + o) / 2,
        g * g + p * p <= a) {
        s.push(d, m);
        return
    }
    Zi(s, t, e, l, c, d, m, a, h + 1),
        Zi(s, d, m, u, f, n, o, a, h + 1)
}
function ra(s, t, e, i, r, n, o, a) {
    let h = Math.abs(r - n);
    (!o && r > n || o && n > r) && (h = 2 * Math.PI - h),
        a || (a = Math.max(6, Math.floor(6 * Math.pow(i, 1 / 3) * (h / Math.PI)))),
        a = Math.max(a, 3);
    let l = h / a
        , c = r;
    l *= o ? -1 : 1;
    for (let u = 0; u < a + 1; u++) {
        const f = Math.cos(c)
            , d = Math.sin(c)
            , m = t + f * i
            , g = e + d * i;
        s.push(m, g),
            c += l
    }
}
function cu(s, t, e, i, r, n) {
    const o = s[s.length - 2]
        , h = s[s.length - 1] - e
        , l = o - t
        , c = r - e
        , u = i - t
        , f = Math.abs(h * u - l * c);
    if (f < 1e-8 || n === 0) {
        (s[s.length - 2] !== t || s[s.length - 1] !== e) && s.push(t, e);
        return
    }
    const d = h * h + l * l
        , m = c * c + u * u
        , g = h * c + l * u
        , p = n * Math.sqrt(d) / f
        , _ = n * Math.sqrt(m) / f
        , x = p * g / d
        , y = _ * g / m
        , b = p * u + _ * l
        , S = p * c + _ * h
        , A = l * (_ + x)
        , w = h * (_ + x)
        , L = u * (p + y)
        , k = c * (p + y)
        , C = Math.atan2(w - S, A - b)
        , P = Math.atan2(k - S, L - b);
    ra(s, b + t, S + e, n, C, P, l * c > u * h)
}
const hs = Math.PI * 2
    , ki = {
        centerX: 0,
        centerY: 0,
        ang1: 0,
        ang2: 0
    }
    , Ei = ({ x: s, y: t }, e, i, r, n, o, a, h) => {
        s *= e,
            t *= i;
        const l = r * s - n * t
            , c = n * s + r * t;
        return h.x = l + o,
            h.y = c + a,
            h
    }
    ;
function uu(s, t) {
    const e = t === -1.5707963267948966 ? -.551915024494 : 1.3333333333333333 * Math.tan(t / 4)
        , i = t === 1.5707963267948966 ? .551915024494 : e
        , r = Math.cos(s)
        , n = Math.sin(s)
        , o = Math.cos(s + t)
        , a = Math.sin(s + t);
    return [{
        x: r - n * i,
        y: n + r * i
    }, {
        x: o + a * i,
        y: a - o * i
    }, {
        x: o,
        y: a
    }]
}
const _n = (s, t, e, i) => {
    const r = s * i - t * e < 0 ? -1 : 1;
    let n = s * e + t * i;
    return n > 1 && (n = 1),
        n < -1 && (n = -1),
        r * Math.acos(n)
}
    , du = (s, t, e, i, r, n, o, a, h, l, c, u, f) => {
        const d = Math.pow(r, 2)
            , m = Math.pow(n, 2)
            , g = Math.pow(c, 2)
            , p = Math.pow(u, 2);
        let _ = d * m - d * p - m * g;
        _ < 0 && (_ = 0),
            _ /= d * p + m * g,
            _ = Math.sqrt(_) * (o === a ? -1 : 1);
        const x = _ * r / n * u
            , y = _ * -n / r * c
            , b = l * x - h * y + (s + e) / 2
            , S = h * x + l * y + (t + i) / 2
            , A = (c - x) / r
            , w = (u - y) / n
            , L = (-c - x) / r
            , k = (-u - y) / n
            , C = _n(1, 0, A, w);
        let P = _n(A, w, L, k);
        a === 0 && P > 0 && (P -= hs),
            a === 1 && P < 0 && (P += hs),
            f.centerX = b,
            f.centerY = S,
            f.ang1 = C,
            f.ang2 = P
    }
    ;
function fu(s, t, e, i, r, n, o, a = 0, h = 0, l = 0) {
    if (n === 0 || o === 0)
        return;
    const c = Math.sin(a * hs / 360)
        , u = Math.cos(a * hs / 360)
        , f = u * (t - i) / 2 + c * (e - r) / 2
        , d = -c * (t - i) / 2 + u * (e - r) / 2;
    if (f === 0 && d === 0)
        return;
    n = Math.abs(n),
        o = Math.abs(o);
    const m = Math.pow(f, 2) / Math.pow(n, 2) + Math.pow(d, 2) / Math.pow(o, 2);
    m > 1 && (n *= Math.sqrt(m),
        o *= Math.sqrt(m)),
        du(t, e, i, r, n, o, h, l, c, u, f, d, ki);
    let { ang1: g, ang2: p } = ki;
    const { centerX: _, centerY: x } = ki;
    let y = Math.abs(p) / (hs / 4);
    Math.abs(1 - y) < 1e-7 && (y = 1);
    const b = Math.max(Math.ceil(y), 1);
    p /= b;
    let S = s[s.length - 2]
        , A = s[s.length - 1];
    const w = {
        x: 0,
        y: 0
    };
    for (let L = 0; L < b; L++) {
        const k = uu(g, p)
            , { x: C, y: P } = Ei(k[0], n, o, u, c, _, x, w)
            , { x: z, y: G } = Ei(k[1], n, o, u, c, _, x, w)
            , { x: $, y: Gt } = Ei(k[2], n, o, u, c, _, x, w);
        ia(s, S, A, C, P, z, G, $, Gt),
            S = $,
            A = Gt,
            g += p
    }
}
function pu(s, t, e) {
    const i = (o, a) => {
        const h = a.x - o.x
            , l = a.y - o.y
            , c = Math.sqrt(h * h + l * l)
            , u = h / c
            , f = l / c;
        return {
            len: c,
            nx: u,
            ny: f
        }
    }
        , r = (o, a) => {
            o === 0 ? s.moveTo(a.x, a.y) : s.lineTo(a.x, a.y)
        }
        ;
    let n = t[t.length - 1];
    for (let o = 0; o < t.length; o++) {
        const a = t[o % t.length]
            , h = a.radius ?? e;
        if (h <= 0) {
            r(o, a),
                n = a;
            continue
        }
        const l = t[(o + 1) % t.length]
            , c = i(a, n)
            , u = i(a, l);
        if (c.len < 1e-4 || u.len < 1e-4) {
            r(o, a),
                n = a;
            continue
        }
        let f = Math.asin(c.nx * u.ny - c.ny * u.nx)
            , d = 1
            , m = !1;
        c.nx * u.nx - c.ny * -u.ny < 0 ? f < 0 ? f = Math.PI + f : (f = Math.PI - f,
            d = -1,
            m = !0) : f > 0 && (d = -1,
                m = !0);
        const g = f / 2;
        let p, _ = Math.abs(Math.cos(g) * h / Math.sin(g));
        _ > Math.min(c.len / 2, u.len / 2) ? (_ = Math.min(c.len / 2, u.len / 2),
            p = Math.abs(_ * Math.sin(g) / Math.cos(g))) : p = h;
        const x = a.x + u.nx * _ + -u.ny * p * d
            , y = a.y + u.ny * _ + u.nx * p * d
            , b = Math.atan2(c.ny, c.nx) + Math.PI / 2 * d
            , S = Math.atan2(u.ny, u.nx) - Math.PI / 2 * d;
        o === 0 && s.moveTo(x + Math.cos(b) * p, y + Math.sin(b) * p),
            s.arc(x, y, p, b, S, m),
            n = a
    }
}
function mu(s, t, e, i) {
    const r = (a, h) => Math.sqrt((a.x - h.x) ** 2 + (a.y - h.y) ** 2)
        , n = (a, h, l) => ({
            x: a.x + (h.x - a.x) * l,
            y: a.y + (h.y - a.y) * l
        })
        , o = t.length;
    for (let a = 0; a < o; a++) {
        const h = t[(a + 1) % o]
            , l = h.radius ?? e;
        if (l <= 0) {
            a === 0 ? s.moveTo(h.x, h.y) : s.lineTo(h.x, h.y);
            continue
        }
        const c = t[a]
            , u = t[(a + 2) % o]
            , f = r(c, h);
        let d;
        if (f < 1e-4)
            d = h;
        else {
            const p = Math.min(f / 2, l);
            d = n(h, c, p / f)
        }
        const m = r(u, h);
        let g;
        if (m < 1e-4)
            g = h;
        else {
            const p = Math.min(m / 2, l);
            g = n(h, u, p / m)
        }
        a === 0 ? s.moveTo(d.x, d.y) : s.lineTo(d.x, d.y),
            s.quadraticCurveTo(h.x, h.y, g.x, g.y, i)
    }
}
const gu = new K;
class _u {
    constructor(t) {
        this.shapePrimitives = [],
            this._currentPoly = null,
            this._bounds = new Ft,
            this._graphicsPath2D = t,
            this.signed = t.checkForHoles
    }
    moveTo(t, e) {
        return this.startPoly(t, e),
            this
    }
    lineTo(t, e) {
        this._ensurePoly();
        const i = this._currentPoly.points
            , r = i[i.length - 2]
            , n = i[i.length - 1];
        return (r !== t || n !== e) && i.push(t, e),
            this
    }
    arc(t, e, i, r, n, o) {
        this._ensurePoly(!1);
        const a = this._currentPoly.points;
        return ra(a, t, e, i, r, n, o),
            this
    }
    arcTo(t, e, i, r, n) {
        this._ensurePoly();
        const o = this._currentPoly.points;
        return cu(o, t, e, i, r, n),
            this
    }
    arcToSvg(t, e, i, r, n, o, a) {
        const h = this._currentPoly.points;
        return fu(h, this._currentPoly.lastX, this._currentPoly.lastY, o, a, t, e, i, r, n),
            this
    }
    bezierCurveTo(t, e, i, r, n, o, a) {
        this._ensurePoly();
        const h = this._currentPoly;
        return ia(this._currentPoly.points, h.lastX, h.lastY, t, e, i, r, n, o, a),
            this
    }
    quadraticCurveTo(t, e, i, r, n) {
        this._ensurePoly();
        const o = this._currentPoly;
        return hu(this._currentPoly.points, o.lastX, o.lastY, t, e, i, r, n),
            this
    }
    closePath() {
        return this.endPoly(!0),
            this
    }
    addPath(t, e) {
        this.endPoly(),
            e && !e.isIdentity() && (t = t.clone(!0),
                t.transform(e));
        const i = this.shapePrimitives
            , r = i.length;
        for (let n = 0; n < t.instructions.length; n++) {
            const o = t.instructions[n];
            this[o.action](...o.data)
        }
        if (t.checkForHoles && i.length - r > 1) {
            let n = null;
            for (let o = r; o < i.length; o++) {
                const a = i[o];
                if (a.shape.type === "polygon") {
                    const h = a.shape
                        , l = n == null ? void 0 : n.shape;
                    l && l.containsPolygon(h) ? (n.holes || (n.holes = []),
                        n.holes.push(a),
                        i.copyWithin(o, o + 1),
                        i.length--,
                        o--) : n = a
                }
            }
        }
        return this
    }
    finish(t = !1) {
        this.endPoly(t)
    }
    rect(t, e, i, r, n) {
        return this.drawShape(new K(t, e, i, r), n),
            this
    }
    circle(t, e, i, r) {
        return this.drawShape(new ar(t, e, i), r),
            this
    }
    poly(t, e, i) {
        const r = new os(t);
        return r.closePath = e,
            this.drawShape(r, i),
            this
    }
    regularPoly(t, e, i, r, n = 0, o) {
        r = Math.max(r | 0, 3);
        const a = -1 * Math.PI / 2 + n
            , h = Math.PI * 2 / r
            , l = [];
        for (let c = 0; c < r; c++) {
            const u = a - c * h;
            l.push(t + i * Math.cos(u), e + i * Math.sin(u))
        }
        return this.poly(l, !0, o),
            this
    }
    roundPoly(t, e, i, r, n, o = 0, a) {
        if (r = Math.max(r | 0, 3),
            n <= 0)
            return this.regularPoly(t, e, i, r, o);
        const h = i * Math.sin(Math.PI / r) - .001;
        n = Math.min(n, h);
        const l = -1 * Math.PI / 2 + o
            , c = Math.PI * 2 / r
            , u = (r - 2) * Math.PI / r / 2;
        for (let f = 0; f < r; f++) {
            const d = f * c + l
                , m = t + i * Math.cos(d)
                , g = e + i * Math.sin(d)
                , p = d + Math.PI + u
                , _ = d - Math.PI - u
                , x = m + n * Math.cos(p)
                , y = g + n * Math.sin(p)
                , b = m + n * Math.cos(_)
                , S = g + n * Math.sin(_);
            f === 0 ? this.moveTo(x, y) : this.lineTo(x, y),
                this.quadraticCurveTo(m, g, b, S, a)
        }
        return this.closePath()
    }
    roundShape(t, e, i = !1, r) {
        return t.length < 3 ? this : (i ? mu(this, t, e, r) : pu(this, t, e),
            this.closePath())
    }
    filletRect(t, e, i, r, n) {
        if (n === 0)
            return this.rect(t, e, i, r);
        const o = Math.min(i, r) / 2
            , a = Math.min(o, Math.max(-o, n))
            , h = t + i
            , l = e + r
            , c = a < 0 ? -a : 0
            , u = Math.abs(a);
        return this.moveTo(t, e + u).arcTo(t + c, e + c, t + u, e, u).lineTo(h - u, e).arcTo(h - c, e + c, h, e + u, u).lineTo(h, l - u).arcTo(h - c, l - c, t + i - u, l, u).lineTo(t + u, l).arcTo(t + c, l - c, t, l - u, u).closePath()
    }
    chamferRect(t, e, i, r, n, o) {
        if (n <= 0)
            return this.rect(t, e, i, r);
        const a = Math.min(n, Math.min(i, r) / 2)
            , h = t + i
            , l = e + r
            , c = [t + a, e, h - a, e, h, e + a, h, l - a, h - a, l, t + a, l, t, l - a, t, e + a];
        for (let u = c.length - 1; u >= 2; u -= 2)
            c[u] === c[u - 2] && c[u - 1] === c[u - 3] && c.splice(u - 1, 2);
        return this.poly(c, !0, o)
    }
    ellipse(t, e, i, r, n) {
        return this.drawShape(new hr(t, e, i, r), n),
            this
    }
    roundRect(t, e, i, r, n, o) {
        return this.drawShape(new lr(t, e, i, r, n), o),
            this
    }
    drawShape(t, e) {
        return this.endPoly(),
            this.shapePrimitives.push({
                shape: t,
                transform: e
            }),
            this
    }
    startPoly(t, e) {
        let i = this._currentPoly;
        return i && this.endPoly(),
            i = new os,
            i.points.push(t, e),
            this._currentPoly = i,
            this
    }
    endPoly(t = !1) {
        const e = this._currentPoly;
        return e && e.points.length > 2 && (e.closePath = t,
            this.shapePrimitives.push({
                shape: e
            })),
            this._currentPoly = null,
            this
    }
    _ensurePoly(t = !0) {
        if (!this._currentPoly && (this._currentPoly = new os,
            t)) {
            const e = this.shapePrimitives[this.shapePrimitives.length - 1];
            if (e) {
                let i = e.shape.x
                    , r = e.shape.y;
                if (e.transform && !e.transform.isIdentity()) {
                    const n = e.transform
                        , o = i;
                    i = n.a * i + n.c * r + n.tx,
                        r = n.b * o + n.d * r + n.ty
                }
                this._currentPoly.points.push(i, r)
            } else
                this._currentPoly.points.push(0, 0)
        }
    }
    buildPath() {
        const t = this._graphicsPath2D;
        this.shapePrimitives.length = 0,
            this._currentPoly = null;
        for (let e = 0; e < t.instructions.length; e++) {
            const i = t.instructions[e];
            this[i.action](...i.data)
        }
        this.finish()
    }
    get bounds() {
        const t = this._bounds;
        t.clear();
        const e = this.shapePrimitives;
        for (let i = 0; i < e.length; i++) {
            const r = e[i]
                , n = r.shape.getBounds(gu);
            r.transform ? t.addRect(n, r.transform) : t.addRect(n)
        }
        return t
    }
}
class Jt {
    constructor(t, e = !1) {
        this.instructions = [],
            this.uid = tt("graphicsPath"),
            this._dirty = !0,
            this.checkForHoles = e,
            typeof t == "string" ? Dl(t, this) : this.instructions = (t == null ? void 0 : t.slice()) ?? []
    }
    get shapePath() {
        return this._shapePath || (this._shapePath = new _u(this)),
            this._dirty && (this._dirty = !1,
                this._shapePath.buildPath()),
            this._shapePath
    }
    addPath(t, e) {
        return t = t.clone(),
            this.instructions.push({
                action: "addPath",
                data: [t, e]
            }),
            this._dirty = !0,
            this
    }
    arc(...t) {
        return this.instructions.push({
            action: "arc",
            data: t
        }),
            this._dirty = !0,
            this
    }
    arcTo(...t) {
        return this.instructions.push({
            action: "arcTo",
            data: t
        }),
            this._dirty = !0,
            this
    }
    arcToSvg(...t) {
        return this.instructions.push({
            action: "arcToSvg",
            data: t
        }),
            this._dirty = !0,
            this
    }
    bezierCurveTo(...t) {
        return this.instructions.push({
            action: "bezierCurveTo",
            data: t
        }),
            this._dirty = !0,
            this
    }
    bezierCurveToShort(t, e, i, r, n) {
        const o = this.instructions[this.instructions.length - 1]
            , a = this.getLastPoint(pt.shared);
        let h = 0
            , l = 0;
        if (!o || o.action !== "bezierCurveTo")
            h = a.x,
                l = a.y;
        else {
            h = o.data[2],
                l = o.data[3];
            const c = a.x
                , u = a.y;
            h = c + (c - h),
                l = u + (u - l)
        }
        return this.instructions.push({
            action: "bezierCurveTo",
            data: [h, l, t, e, i, r, n]
        }),
            this._dirty = !0,
            this
    }
    closePath() {
        return this.instructions.push({
            action: "closePath",
            data: []
        }),
            this._dirty = !0,
            this
    }
    ellipse(...t) {
        return this.instructions.push({
            action: "ellipse",
            data: t
        }),
            this._dirty = !0,
            this
    }
    lineTo(...t) {
        return this.instructions.push({
            action: "lineTo",
            data: t
        }),
            this._dirty = !0,
            this
    }
    moveTo(...t) {
        return this.instructions.push({
            action: "moveTo",
            data: t
        }),
            this
    }
    quadraticCurveTo(...t) {
        return this.instructions.push({
            action: "quadraticCurveTo",
            data: t
        }),
            this._dirty = !0,
            this
    }
    quadraticCurveToShort(t, e, i) {
        const r = this.instructions[this.instructions.length - 1]
            , n = this.getLastPoint(pt.shared);
        let o = 0
            , a = 0;
        if (!r || r.action !== "quadraticCurveTo")
            o = n.x,
                a = n.y;
        else {
            o = r.data[0],
                a = r.data[1];
            const h = n.x
                , l = n.y;
            o = h + (h - o),
                a = l + (l - a)
        }
        return this.instructions.push({
            action: "quadraticCurveTo",
            data: [o, a, t, e, i]
        }),
            this._dirty = !0,
            this
    }
    rect(t, e, i, r, n) {
        return this.instructions.push({
            action: "rect",
            data: [t, e, i, r, n]
        }),
            this._dirty = !0,
            this
    }
    circle(t, e, i, r) {
        return this.instructions.push({
            action: "circle",
            data: [t, e, i, r]
        }),
            this._dirty = !0,
            this
    }
    roundRect(...t) {
        return this.instructions.push({
            action: "roundRect",
            data: t
        }),
            this._dirty = !0,
            this
    }
    poly(...t) {
        return this.instructions.push({
            action: "poly",
            data: t
        }),
            this._dirty = !0,
            this
    }
    regularPoly(...t) {
        return this.instructions.push({
            action: "regularPoly",
            data: t
        }),
            this._dirty = !0,
            this
    }
    roundPoly(...t) {
        return this.instructions.push({
            action: "roundPoly",
            data: t
        }),
            this._dirty = !0,
            this
    }
    roundShape(...t) {
        return this.instructions.push({
            action: "roundShape",
            data: t
        }),
            this._dirty = !0,
            this
    }
    filletRect(...t) {
        return this.instructions.push({
            action: "filletRect",
            data: t
        }),
            this._dirty = !0,
            this
    }
    chamferRect(...t) {
        return this.instructions.push({
            action: "chamferRect",
            data: t
        }),
            this._dirty = !0,
            this
    }
    star(t, e, i, r, n, o, a) {
        n || (n = r / 2);
        const h = -1 * Math.PI / 2 + o
            , l = i * 2
            , c = Math.PI * 2 / l
            , u = [];
        for (let f = 0; f < l; f++) {
            const d = f % 2 ? n : r
                , m = f * c + h;
            u.push(t + d * Math.cos(m), e + d * Math.sin(m))
        }
        return this.poly(u, !0, a),
            this
    }
    clone(t = !1) {
        const e = new Jt;
        if (e.checkForHoles = this.checkForHoles,
            !t)
            e.instructions = this.instructions.slice();
        else
            for (let i = 0; i < this.instructions.length; i++) {
                const r = this.instructions[i];
                e.instructions.push({
                    action: r.action,
                    data: r.data.slice()
                })
            }
        return e
    }
    clear() {
        return this.instructions.length = 0,
            this._dirty = !0,
            this
    }
    transform(t) {
        if (t.isIdentity())
            return this;
        const e = t.a
            , i = t.b
            , r = t.c
            , n = t.d
            , o = t.tx
            , a = t.ty;
        let h = 0
            , l = 0
            , c = 0
            , u = 0
            , f = 0
            , d = 0
            , m = 0
            , g = 0;
        for (let p = 0; p < this.instructions.length; p++) {
            const _ = this.instructions[p]
                , x = _.data;
            switch (_.action) {
                case "moveTo":
                case "lineTo":
                    h = x[0],
                        l = x[1],
                        x[0] = e * h + r * l + o,
                        x[1] = i * h + n * l + a;
                    break;
                case "bezierCurveTo":
                    c = x[0],
                        u = x[1],
                        f = x[2],
                        d = x[3],
                        h = x[4],
                        l = x[5],
                        x[0] = e * c + r * u + o,
                        x[1] = i * c + n * u + a,
                        x[2] = e * f + r * d + o,
                        x[3] = i * f + n * d + a,
                        x[4] = e * h + r * l + o,
                        x[5] = i * h + n * l + a;
                    break;
                case "quadraticCurveTo":
                    c = x[0],
                        u = x[1],
                        h = x[2],
                        l = x[3],
                        x[0] = e * c + r * u + o,
                        x[1] = i * c + n * u + a,
                        x[2] = e * h + r * l + o,
                        x[3] = i * h + n * l + a;
                    break;
                case "arcToSvg":
                    h = x[5],
                        l = x[6],
                        m = x[0],
                        g = x[1],
                        x[0] = e * m + r * g,
                        x[1] = i * m + n * g,
                        x[5] = e * h + r * l + o,
                        x[6] = i * h + n * l + a;
                    break;
                case "circle":
                    x[4] = Je(x[3], t);
                    break;
                case "rect":
                    x[4] = Je(x[4], t);
                    break;
                case "ellipse":
                    x[8] = Je(x[8], t);
                    break;
                case "roundRect":
                    x[5] = Je(x[5], t);
                    break;
                case "addPath":
                    x[0].transform(t);
                    break;
                case "poly":
                    x[2] = Je(x[2], t);
                    break;
                default:
                    q("unknown transform action", _.action);
                    break
            }
        }
        return this._dirty = !0,
            this
    }
    get bounds() {
        return this.shapePath.bounds
    }
    getLastPoint(t) {
        let e = this.instructions.length - 1
            , i = this.instructions[e];
        if (!i)
            return t.x = 0,
                t.y = 0,
                t;
        for (; i.action === "closePath";) {
            if (e--,
                e < 0)
                return t.x = 0,
                    t.y = 0,
                    t;
            i = this.instructions[e]
        }
        switch (i.action) {
            case "moveTo":
            case "lineTo":
                t.x = i.data[0],
                    t.y = i.data[1];
                break;
            case "quadraticCurveTo":
                t.x = i.data[2],
                    t.y = i.data[3];
                break;
            case "bezierCurveTo":
                t.x = i.data[4],
                    t.y = i.data[5];
                break;
            case "arc":
            case "arcToSvg":
                t.x = i.data[5],
                    t.y = i.data[6];
                break;
            case "addPath":
                i.data[0].getLastPoint(t);
                break
        }
        return t
    }
}
function Je(s, t) {
    return s ? s.prepend(t) : t.clone()
}
function J(s, t, e) {
    const i = s.getAttribute(t);
    return i ? Number(i) : e
}
function xu(s, t) {
    const e = s.querySelectorAll("defs");
    for (let i = 0; i < e.length; i++) {
        const r = e[i];
        for (let n = 0; n < r.children.length; n++) {
            const o = r.children[n];
            switch (o.nodeName.toLowerCase()) {
                case "lineargradient":
                    t.defs[o.id] = yu(o);
                    break;
                case "radialgradient":
                    t.defs[o.id] = bu();
                    break
            }
        }
    }
}
function yu(s) {
    const t = J(s, "x1", 0)
        , e = J(s, "y1", 0)
        , i = J(s, "x2", 1)
        , r = J(s, "y2", 0)
        , n = s.getAttribute("gradientUnits") || "objectBoundingBox"
        , o = new Nt(t, e, i, r, n === "objectBoundingBox" ? "local" : "global");
    for (let a = 0; a < s.children.length; a++) {
        const h = s.children[a]
            , l = J(h, "offset", 0)
            , c = it.shared.setValue(h.getAttribute("stop-color")).toNumber();
        o.addColorStop(l, c)
    }
    return o
}
function bu(s) {
    return q("[SVG Parser] Radial gradients are not yet supported"),
        new Nt(0, 0, 1, 0)
}
function xn(s) {
    const t = s.match(/url\s*\(\s*['"]?\s*#([^'"\s)]+)\s*['"]?\s*\)/i);
    return t ? t[1] : ""
}
const yn = {
    fill: {
        type: "paint",
        default: 0
    },
    "fill-opacity": {
        type: "number",
        default: 1
    },
    stroke: {
        type: "paint",
        default: 0
    },
    "stroke-width": {
        type: "number",
        default: 1
    },
    "stroke-opacity": {
        type: "number",
        default: 1
    },
    "stroke-linecap": {
        type: "string",
        default: "butt"
    },
    "stroke-linejoin": {
        type: "string",
        default: "miter"
    },
    "stroke-miterlimit": {
        type: "number",
        default: 10
    },
    "stroke-dasharray": {
        type: "string",
        default: "none"
    },
    "stroke-dashoffset": {
        type: "number",
        default: 0
    },
    opacity: {
        type: "number",
        default: 1
    }
};
function na(s, t) {
    const e = s.getAttribute("style")
        , i = {}
        , r = {}
        , n = {
            strokeStyle: i,
            fillStyle: r,
            useFill: !1,
            useStroke: !1
        };
    for (const o in yn) {
        const a = s.getAttribute(o);
        a && bn(t, n, o, a.trim())
    }
    if (e) {
        const o = e.split(";");
        for (let a = 0; a < o.length; a++) {
            const h = o[a].trim()
                , [l, c] = h.split(":");
            yn[l] && bn(t, n, l, c.trim())
        }
    }
    return {
        strokeStyle: n.useStroke ? i : null,
        fillStyle: n.useFill ? r : null,
        useFill: n.useFill,
        useStroke: n.useStroke
    }
}
function bn(s, t, e, i) {
    switch (e) {
        case "stroke":
            if (i !== "none") {
                if (i.startsWith("url(")) {
                    const r = xn(i);
                    t.strokeStyle.fill = s.defs[r]
                } else
                    t.strokeStyle.color = it.shared.setValue(i).toNumber();
                t.useStroke = !0
            }
            break;
        case "stroke-width":
            t.strokeStyle.width = Number(i);
            break;
        case "fill":
            if (i !== "none") {
                if (i.startsWith("url(")) {
                    const r = xn(i);
                    t.fillStyle.fill = s.defs[r]
                } else
                    t.fillStyle.color = it.shared.setValue(i).toNumber();
                t.useFill = !0
            }
            break;
        case "fill-opacity":
            t.fillStyle.alpha = Number(i);
            break;
        case "stroke-opacity":
            t.strokeStyle.alpha = Number(i);
            break;
        case "opacity":
            t.fillStyle.alpha = Number(i),
                t.strokeStyle.alpha = Number(i);
            break
    }
}
function wu(s) {
    if (s.length <= 2)
        return !0;
    const t = s.map(a => a.area).sort((a, h) => h - a)
        , [e, i] = t
        , r = t[t.length - 1]
        , n = e / i
        , o = i / r;
    return !(n > 3 && o < 2)
}
function Au(s) {
    return s.split(/(?=[Mm])/).filter(i => i.trim().length > 0)
}
function Su(s) {
    const t = s.match(/[-+]?[0-9]*\.?[0-9]+/g);
    if (!t || t.length < 4)
        return 0;
    const e = t.map(Number)
        , i = []
        , r = [];
    for (let c = 0; c < e.length; c += 2)
        c + 1 < e.length && (i.push(e[c]),
            r.push(e[c + 1]));
    if (i.length === 0 || r.length === 0)
        return 0;
    const n = Math.min(...i)
        , o = Math.max(...i)
        , a = Math.min(...r)
        , h = Math.max(...r);
    return (o - n) * (h - a)
}
function wn(s, t) {
    const e = new Jt(s, !1);
    for (const i of e.instructions)
        t.instructions.push(i)
}
function vu(s, t) {
    if (typeof s == "string") {
        const o = document.createElement("div");
        o.innerHTML = s.trim(),
            s = o.querySelector("svg")
    }
    const e = {
        context: t,
        defs: {},
        path: new Jt
    };
    xu(s, e);
    const i = s.children
        , { fillStyle: r, strokeStyle: n } = na(s, e);
    for (let o = 0; o < i.length; o++) {
        const a = i[o];
        a.nodeName.toLowerCase() !== "defs" && oa(a, e, r, n)
    }
    return t
}
function oa(s, t, e, i) {
    const r = s.children
        , { fillStyle: n, strokeStyle: o } = na(s, t);
    n && e ? e = {
        ...e,
        ...n
    } : n && (e = n),
        o && i ? i = {
            ...i,
            ...o
        } : o && (i = o);
    const a = !e && !i;
    a && (e = {
        color: 0
    });
    let h, l, c, u, f, d, m, g, p, _, x, y, b, S, A, w, L;
    switch (s.nodeName.toLowerCase()) {
        case "path":
            {
                S = s.getAttribute("d");
                const k = s.getAttribute("fill-rule")
                    , C = Au(S)
                    , P = k === "evenodd"
                    , z = C.length > 1;
                if (P && z) {
                    const $ = C.map(T => ({
                        path: T,
                        area: Su(T)
                    }));
                    if ($.sort((T, F) => F.area - T.area),
                        C.length > 3 || !wu($))
                        for (let T = 0; T < $.length; T++) {
                            const F = $[T]
                                , ne = T === 0;
                            t.context.beginPath();
                            const H = new Jt(void 0, !0);
                            wn(F.path, H),
                                t.context.path(H),
                                ne ? (e && t.context.fill(e),
                                    i && t.context.stroke(i)) : t.context.cut()
                        }
                    else
                        for (let T = 0; T < $.length; T++) {
                            const F = $[T]
                                , ne = T % 2 === 1;
                            t.context.beginPath();
                            const H = new Jt(void 0, !0);
                            wn(F.path, H),
                                t.context.path(H),
                                ne ? t.context.cut() : (e && t.context.fill(e),
                                    i && t.context.stroke(i))
                        }
                } else {
                    const $ = k ? k === "evenodd" : !0;
                    A = new Jt(S, $),
                        t.context.path(A),
                        e && t.context.fill(e),
                        i && t.context.stroke(i)
                }
                break
            }
        case "circle":
            m = J(s, "cx", 0),
                g = J(s, "cy", 0),
                p = J(s, "r", 0),
                t.context.ellipse(m, g, p, p),
                e && t.context.fill(e),
                i && t.context.stroke(i);
            break;
        case "rect":
            h = J(s, "x", 0),
                l = J(s, "y", 0),
                w = J(s, "width", 0),
                L = J(s, "height", 0),
                _ = J(s, "rx", 0),
                x = J(s, "ry", 0),
                _ || x ? t.context.roundRect(h, l, w, L, _ || x) : t.context.rect(h, l, w, L),
                e && t.context.fill(e),
                i && t.context.stroke(i);
            break;
        case "ellipse":
            m = J(s, "cx", 0),
                g = J(s, "cy", 0),
                _ = J(s, "rx", 0),
                x = J(s, "ry", 0),
                t.context.beginPath(),
                t.context.ellipse(m, g, _, x),
                e && t.context.fill(e),
                i && t.context.stroke(i);
            break;
        case "line":
            c = J(s, "x1", 0),
                u = J(s, "y1", 0),
                f = J(s, "x2", 0),
                d = J(s, "y2", 0),
                t.context.beginPath(),
                t.context.moveTo(c, u),
                t.context.lineTo(f, d),
                i && t.context.stroke(i);
            break;
        case "polygon":
            b = s.getAttribute("points"),
                y = b.match(/-?\d+/g).map(k => parseInt(k, 10)),
                t.context.poly(y, !0),
                e && t.context.fill(e),
                i && t.context.stroke(i);
            break;
        case "polyline":
            b = s.getAttribute("points"),
                y = b.match(/-?\d+/g).map(k => parseInt(k, 10)),
                t.context.poly(y, !1),
                i && t.context.stroke(i);
            break;
        case "g":
        case "svg":
            break;
        default:
            {
                q(`[SVG parser] <${s.nodeName}> elements unsupported`);
                break
            }
    }
    a && (e = null);
    for (let k = 0; k < r.length; k++)
        oa(r[k], t, e, i)
}
function Cu(s) {
    return it.isColorLike(s)
}
function An(s) {
    return s instanceof si
}
function Sn(s) {
    return s instanceof Nt
}
function Pu(s) {
    return s instanceof W
}
function Tu(s, t, e) {
    const i = it.shared.setValue(t ?? 0);
    return s.color = i.toNumber(),
        s.alpha = i.alpha === 1 ? e.alpha : i.alpha,
        s.texture = W.WHITE,
    {
        ...e,
        ...s
    }
}
function Mu(s, t, e) {
    return s.texture = t,
    {
        ...e,
        ...s
    }
}
function vn(s, t, e) {
    return s.fill = t,
        s.color = 16777215,
        s.texture = t.texture,
        s.matrix = t.transform,
    {
        ...e,
        ...s
    }
}
function Cn(s, t, e) {
    return t.buildGradient(),
        s.fill = t,
        s.color = 16777215,
        s.texture = t.texture,
        s.matrix = t.transform,
        s.textureSpace = t.textureSpace,
    {
        ...e,
        ...s
    }
}
function ku(s, t) {
    const e = {
        ...t,
        ...s
    }
        , i = it.shared.setValue(e.color);
    return e.alpha *= i.alpha,
        e.color = i.toNumber(),
        e
}
function me(s, t) {
    if (s == null)
        return null;
    const e = {}
        , i = s;
    return Cu(s) ? Tu(e, s, t) : Pu(s) ? Mu(e, s, t) : An(s) ? vn(e, s, t) : Sn(s) ? Cn(e, s, t) : i.fill && An(i.fill) ? vn(i, i.fill, t) : i.fill && Sn(i.fill) ? Cn(i, i.fill, t) : ku(i, t)
}
function Xs(s, t) {
    const { width: e, alignment: i, miterLimit: r, cap: n, join: o, pixelLine: a, ...h } = t
        , l = me(s, h);
    return l ? {
        width: e,
        alignment: i,
        miterLimit: r,
        cap: n,
        join: o,
        pixelLine: a,
        ...l
    } : null
}
const Eu = new pt
    , Pn = new D
    , ur = class zt extends mt {
        constructor() {
            super(...arguments),
                this._gpuData = Object.create(null),
                this.autoGarbageCollect = !0,
                this._gcLastUsed = -1,
                this.uid = tt("graphicsContext"),
                this.dirty = !0,
                this.batchMode = "auto",
                this.instructions = [],
                this.destroyed = !1,
                this._activePath = new Jt,
                this._transform = new D,
                this._fillStyle = {
                    ...zt.defaultFillStyle
                },
                this._strokeStyle = {
                    ...zt.defaultStrokeStyle
                },
                this._stateStack = [],
                this._tick = 0,
                this._bounds = new Ft,
                this._boundsDirty = !0
        }
        clone() {
            const t = new zt;
            return t.batchMode = this.batchMode,
                t.instructions = this.instructions.slice(),
                t._activePath = this._activePath.clone(),
                t._transform = this._transform.clone(),
                t._fillStyle = {
                    ...this._fillStyle
                },
                t._strokeStyle = {
                    ...this._strokeStyle
                },
                t._stateStack = this._stateStack.slice(),
                t._bounds = this._bounds.clone(),
                t._boundsDirty = !0,
                t
        }
        get fillStyle() {
            return this._fillStyle
        }
        set fillStyle(t) {
            this._fillStyle = me(t, zt.defaultFillStyle)
        }
        get strokeStyle() {
            return this._strokeStyle
        }
        set strokeStyle(t) {
            this._strokeStyle = Xs(t, zt.defaultStrokeStyle)
        }
        setFillStyle(t) {
            return this._fillStyle = me(t, zt.defaultFillStyle),
                this
        }
        setStrokeStyle(t) {
            return this._strokeStyle = me(t, zt.defaultStrokeStyle),
                this
        }
        texture(t, e, i, r, n, o) {
            return this.instructions.push({
                action: "texture",
                data: {
                    image: t,
                    dx: i || 0,
                    dy: r || 0,
                    dw: n || t.frame.width,
                    dh: o || t.frame.height,
                    transform: this._transform.clone(),
                    alpha: this._fillStyle.alpha,
                    style: e ? it.shared.setValue(e).toNumber() : 16777215
                }
            }),
                this.onUpdate(),
                this
        }
        beginPath() {
            return this._activePath = new Jt,
                this
        }
        fill(t, e) {
            let i;
            const r = this.instructions[this.instructions.length - 1];
            return this._tick === 0 && (r == null ? void 0 : r.action) === "stroke" ? i = r.data.path : i = this._activePath.clone(),
                i ? (t != null && (e !== void 0 && typeof t == "number" && (U(V, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"),
                    t = {
                        color: t,
                        alpha: e
                    }),
                    this._fillStyle = me(t, zt.defaultFillStyle)),
                    this.instructions.push({
                        action: "fill",
                        data: {
                            style: this.fillStyle,
                            path: i
                        }
                    }),
                    this.onUpdate(),
                    this._initNextPathLocation(),
                    this._tick = 0,
                    this) : this
        }
        _initNextPathLocation() {
            const { x: t, y: e } = this._activePath.getLastPoint(pt.shared);
            this._activePath.clear(),
                this._activePath.moveTo(t, e)
        }
        stroke(t) {
            let e;
            const i = this.instructions[this.instructions.length - 1];
            return this._tick === 0 && (i == null ? void 0 : i.action) === "fill" ? e = i.data.path : e = this._activePath.clone(),
                e ? (t != null && (this._strokeStyle = Xs(t, zt.defaultStrokeStyle)),
                    this.instructions.push({
                        action: "stroke",
                        data: {
                            style: this.strokeStyle,
                            path: e
                        }
                    }),
                    this.onUpdate(),
                    this._initNextPathLocation(),
                    this._tick = 0,
                    this) : this
        }
        cut() {
            for (let t = 0; t < 2; t++) {
                const e = this.instructions[this.instructions.length - 1 - t]
                    , i = this._activePath.clone();
                if (e && (e.action === "stroke" || e.action === "fill"))
                    if (e.data.hole)
                        e.data.hole.addPath(i);
                    else {
                        e.data.hole = i;
                        break
                    }
            }
            return this._initNextPathLocation(),
                this
        }
        arc(t, e, i, r, n, o) {
            this._tick++;
            const a = this._transform;
            return this._activePath.arc(a.a * t + a.c * e + a.tx, a.b * t + a.d * e + a.ty, i, r, n, o),
                this
        }
        arcTo(t, e, i, r, n) {
            this._tick++;
            const o = this._transform;
            return this._activePath.arcTo(o.a * t + o.c * e + o.tx, o.b * t + o.d * e + o.ty, o.a * i + o.c * r + o.tx, o.b * i + o.d * r + o.ty, n),
                this
        }
        arcToSvg(t, e, i, r, n, o, a) {
            this._tick++;
            const h = this._transform;
            return this._activePath.arcToSvg(t, e, i, r, n, h.a * o + h.c * a + h.tx, h.b * o + h.d * a + h.ty),
                this
        }
        bezierCurveTo(t, e, i, r, n, o, a) {
            this._tick++;
            const h = this._transform;
            return this._activePath.bezierCurveTo(h.a * t + h.c * e + h.tx, h.b * t + h.d * e + h.ty, h.a * i + h.c * r + h.tx, h.b * i + h.d * r + h.ty, h.a * n + h.c * o + h.tx, h.b * n + h.d * o + h.ty, a),
                this
        }
        closePath() {
            var t;
            return this._tick++,
                (t = this._activePath) == null || t.closePath(),
                this
        }
        ellipse(t, e, i, r) {
            return this._tick++,
                this._activePath.ellipse(t, e, i, r, this._transform.clone()),
                this
        }
        circle(t, e, i) {
            return this._tick++,
                this._activePath.circle(t, e, i, this._transform.clone()),
                this
        }
        path(t) {
            return this._tick++,
                this._activePath.addPath(t, this._transform.clone()),
                this
        }
        lineTo(t, e) {
            this._tick++;
            const i = this._transform;
            return this._activePath.lineTo(i.a * t + i.c * e + i.tx, i.b * t + i.d * e + i.ty),
                this
        }
        moveTo(t, e) {
            this._tick++;
            const i = this._transform
                , r = this._activePath.instructions
                , n = i.a * t + i.c * e + i.tx
                , o = i.b * t + i.d * e + i.ty;
            return r.length === 1 && r[0].action === "moveTo" ? (r[0].data[0] = n,
                r[0].data[1] = o,
                this) : (this._activePath.moveTo(n, o),
                    this)
        }
        quadraticCurveTo(t, e, i, r, n) {
            this._tick++;
            const o = this._transform;
            return this._activePath.quadraticCurveTo(o.a * t + o.c * e + o.tx, o.b * t + o.d * e + o.ty, o.a * i + o.c * r + o.tx, o.b * i + o.d * r + o.ty, n),
                this
        }
        rect(t, e, i, r) {
            return this._tick++,
                this._activePath.rect(t, e, i, r, this._transform.clone()),
                this
        }
        roundRect(t, e, i, r, n) {
            return this._tick++,
                this._activePath.roundRect(t, e, i, r, n, this._transform.clone()),
                this
        }
        poly(t, e) {
            return this._tick++,
                this._activePath.poly(t, e, this._transform.clone()),
                this
        }
        regularPoly(t, e, i, r, n = 0, o) {
            return this._tick++,
                this._activePath.regularPoly(t, e, i, r, n, o),
                this
        }
        roundPoly(t, e, i, r, n, o) {
            return this._tick++,
                this._activePath.roundPoly(t, e, i, r, n, o),
                this
        }
        roundShape(t, e, i, r) {
            return this._tick++,
                this._activePath.roundShape(t, e, i, r),
                this
        }
        filletRect(t, e, i, r, n) {
            return this._tick++,
                this._activePath.filletRect(t, e, i, r, n),
                this
        }
        chamferRect(t, e, i, r, n, o) {
            return this._tick++,
                this._activePath.chamferRect(t, e, i, r, n, o),
                this
        }
        star(t, e, i, r, n = 0, o = 0) {
            return this._tick++,
                this._activePath.star(t, e, i, r, n, o, this._transform.clone()),
                this
        }
        svg(t) {
            return this._tick++,
                vu(t, this),
                this
        }
        restore() {
            const t = this._stateStack.pop();
            return t && (this._transform = t.transform,
                this._fillStyle = t.fillStyle,
                this._strokeStyle = t.strokeStyle),
                this
        }
        save() {
            return this._stateStack.push({
                transform: this._transform.clone(),
                fillStyle: {
                    ...this._fillStyle
                },
                strokeStyle: {
                    ...this._strokeStyle
                }
            }),
                this
        }
        getTransform() {
            return this._transform
        }
        resetTransform() {
            return this._transform.identity(),
                this
        }
        rotate(t) {
            return this._transform.rotate(t),
                this
        }
        scale(t, e = t) {
            return this._transform.scale(t, e),
                this
        }
        setTransform(t, e, i, r, n, o) {
            return t instanceof D ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty),
                this) : (this._transform.set(t, e, i, r, n, o),
                    this)
        }
        transform(t, e, i, r, n, o) {
            return t instanceof D ? (this._transform.append(t),
                this) : (Pn.set(t, e, i, r, n, o),
                    this._transform.append(Pn),
                    this)
        }
        translate(t, e = t) {
            return this._transform.translate(t, e),
                this
        }
        clear() {
            return this._activePath.clear(),
                this.instructions.length = 0,
                this.resetTransform(),
                this.onUpdate(),
                this
        }
        onUpdate() {
            this._boundsDirty = !0,
                !this.dirty && (this.emit("update", this, 16),
                    this.dirty = !0)
        }
        get bounds() {
            if (!this._boundsDirty)
                return this._bounds;
            this._boundsDirty = !1;
            const t = this._bounds;
            t.clear();
            for (let e = 0; e < this.instructions.length; e++) {
                const i = this.instructions[e]
                    , r = i.action;
                if (r === "fill") {
                    const n = i.data;
                    t.addBounds(n.path.bounds)
                } else if (r === "texture") {
                    const n = i.data;
                    t.addFrame(n.dx, n.dy, n.dx + n.dw, n.dy + n.dh, n.transform)
                }
                if (r === "stroke") {
                    const n = i.data
                        , o = n.style.alignment
                        , a = n.style.width * (1 - o)
                        , h = n.path.bounds;
                    t.addFrame(h.minX - a, h.minY - a, h.maxX + a, h.maxY + a)
                }
            }
            return t
        }
        containsPoint(t) {
            var r;
            if (!this.bounds.containsPoint(t.x, t.y))
                return !1;
            const e = this.instructions;
            let i = !1;
            for (let n = 0; n < e.length; n++) {
                const o = e[n]
                    , a = o.data
                    , h = a.path;
                if (!o.action || !h)
                    continue;
                const l = a.style
                    , c = h.shapePath.shapePrimitives;
                for (let u = 0; u < c.length; u++) {
                    const f = c[u].shape;
                    if (!l || !f)
                        continue;
                    const d = c[u].transform
                        , m = d ? d.applyInverse(t, Eu) : t;
                    if (o.action === "fill")
                        i = f.contains(m.x, m.y);
                    else {
                        const p = l;
                        i = f.strokeContains(m.x, m.y, p.width, p.alignment)
                    }
                    const g = a.hole;
                    if (g) {
                        const p = (r = g.shapePath) == null ? void 0 : r.shapePrimitives;
                        if (p)
                            for (let _ = 0; _ < p.length; _++)
                                p[_].shape.contains(m.x, m.y) && (i = !1)
                    }
                    if (i)
                        return !0
                }
            }
            return i
        }
        unload() {
            var t;
            this.emit("unload", this);
            for (const e in this._gpuData)
                (t = this._gpuData[e]) == null || t.destroy();
            this._gpuData = Object.create(null)
        }
        destroy(t = !1) {
            if (this.destroyed)
                return;
            if (this.destroyed = !0,
                this._stateStack.length = 0,
                this._transform = null,
                this.unload(),
                this.emit("destroy", this),
                this.removeAllListeners(),
                typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
                const i = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
                this._fillStyle.texture && (this._fillStyle.fill && "uid" in this._fillStyle.fill ? this._fillStyle.fill.destroy() : this._fillStyle.texture.destroy(i)),
                    this._strokeStyle.texture && (this._strokeStyle.fill && "uid" in this._strokeStyle.fill ? this._strokeStyle.fill.destroy() : this._strokeStyle.texture.destroy(i))
            }
            this._fillStyle = null,
                this._strokeStyle = null,
                this.instructions = null,
                this._activePath = null,
                this._bounds = null,
                this._stateStack = null,
                this.customShader = null,
                this._transform = null
        }
    }
    ;
ur.defaultFillStyle = {
    color: 16777215,
    alpha: 1,
    texture: W.WHITE,
    matrix: null,
    fill: null,
    textureSpace: "local"
};
ur.defaultStrokeStyle = {
    width: 1,
    color: 16777215,
    alpha: 1,
    alignment: .5,
    miterLimit: 10,
    cap: "butt",
    join: "miter",
    texture: W.WHITE,
    matrix: null,
    fill: null,
    textureSpace: "local",
    pixelLine: !1
};
let Mt = ur;
const dr = class Pe extends mt {
    constructor(t = {}) {
        super(),
            this.uid = tt("textStyle"),
            this._tick = 0,
            Iu(t);
        const e = {
            ...Pe.defaultTextStyle,
            ...t
        };
        for (const i in e) {
            const r = i;
            this[r] = e[i]
        }
        this.update(),
            this._tick = 0
    }
    get align() {
        return this._align
    }
    set align(t) {
        this._align !== t && (this._align = t,
            this.update())
    }
    get breakWords() {
        return this._breakWords
    }
    set breakWords(t) {
        this._breakWords !== t && (this._breakWords = t,
            this.update())
    }
    get dropShadow() {
        return this._dropShadow
    }
    set dropShadow(t) {
        this._dropShadow !== t && (t !== null && typeof t == "object" ? this._dropShadow = this._createProxy({
            ...Pe.defaultDropShadow,
            ...t
        }) : this._dropShadow = t ? this._createProxy({
            ...Pe.defaultDropShadow
        }) : null,
            this.update())
    }
    get fontFamily() {
        return this._fontFamily
    }
    set fontFamily(t) {
        this._fontFamily !== t && (this._fontFamily = t,
            this.update())
    }
    get fontSize() {
        return this._fontSize
    }
    set fontSize(t) {
        this._fontSize !== t && (typeof t == "string" ? this._fontSize = parseInt(t, 10) : this._fontSize = t,
            this.update())
    }
    get fontStyle() {
        return this._fontStyle
    }
    set fontStyle(t) {
        this._fontStyle !== t && (this._fontStyle = t.toLowerCase(),
            this.update())
    }
    get fontVariant() {
        return this._fontVariant
    }
    set fontVariant(t) {
        this._fontVariant !== t && (this._fontVariant = t,
            this.update())
    }
    get fontWeight() {
        return this._fontWeight
    }
    set fontWeight(t) {
        this._fontWeight !== t && (this._fontWeight = t,
            this.update())
    }
    get leading() {
        return this._leading
    }
    set leading(t) {
        this._leading !== t && (this._leading = t,
            this.update())
    }
    get letterSpacing() {
        return this._letterSpacing
    }
    set letterSpacing(t) {
        this._letterSpacing !== t && (this._letterSpacing = t,
            this.update())
    }
    get lineHeight() {
        return this._lineHeight
    }
    set lineHeight(t) {
        this._lineHeight !== t && (this._lineHeight = t,
            this.update())
    }
    get padding() {
        return this._padding
    }
    set padding(t) {
        this._padding !== t && (this._padding = t,
            this.update())
    }
    get filters() {
        return this._filters
    }
    set filters(t) {
        this._filters !== t && (this._filters = Object.freeze(t),
            this.update())
    }
    get trim() {
        return this._trim
    }
    set trim(t) {
        this._trim !== t && (this._trim = t,
            this.update())
    }
    get textBaseline() {
        return this._textBaseline
    }
    set textBaseline(t) {
        this._textBaseline !== t && (this._textBaseline = t,
            this.update())
    }
    get whiteSpace() {
        return this._whiteSpace
    }
    set whiteSpace(t) {
        this._whiteSpace !== t && (this._whiteSpace = t,
            this.update())
    }
    get wordWrap() {
        return this._wordWrap
    }
    set wordWrap(t) {
        this._wordWrap !== t && (this._wordWrap = t,
            this.update())
    }
    get wordWrapWidth() {
        return this._wordWrapWidth
    }
    set wordWrapWidth(t) {
        this._wordWrapWidth !== t && (this._wordWrapWidth = t,
            this.update())
    }
    get fill() {
        return this._originalFill
    }
    set fill(t) {
        t !== this._originalFill && (this._originalFill = t,
            this._isFillStyle(t) && (this._originalFill = this._createProxy({
                ...Mt.defaultFillStyle,
                ...t
            }, () => {
                this._fill = me({
                    ...this._originalFill
                }, Mt.defaultFillStyle)
            }
            )),
            this._fill = me(t === 0 ? "black" : t, Mt.defaultFillStyle),
            this.update())
    }
    get stroke() {
        return this._originalStroke
    }
    set stroke(t) {
        t !== this._originalStroke && (this._originalStroke = t,
            this._isFillStyle(t) && (this._originalStroke = this._createProxy({
                ...Mt.defaultStrokeStyle,
                ...t
            }, () => {
                this._stroke = Xs({
                    ...this._originalStroke
                }, Mt.defaultStrokeStyle)
            }
            )),
            this._stroke = Xs(t, Mt.defaultStrokeStyle),
            this.update())
    }
    update() {
        this._tick++,
            this.emit("update", this)
    }
    reset() {
        const t = Pe.defaultTextStyle;
        for (const e in t)
            this[e] = t[e]
    }
    get styleKey() {
        return `${this.uid}-${this._tick}`
    }
    clone() {
        return new Pe({
            align: this.align,
            breakWords: this.breakWords,
            dropShadow: this._dropShadow ? {
                ...this._dropShadow
            } : null,
            fill: this._fill,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            fontVariant: this.fontVariant,
            fontWeight: this.fontWeight,
            leading: this.leading,
            letterSpacing: this.letterSpacing,
            lineHeight: this.lineHeight,
            padding: this.padding,
            stroke: this._stroke,
            textBaseline: this.textBaseline,
            whiteSpace: this.whiteSpace,
            wordWrap: this.wordWrap,
            wordWrapWidth: this.wordWrapWidth,
            filters: this._filters ? [...this._filters] : void 0
        })
    }
    _getFinalPadding() {
        let t = 0;
        if (this._filters)
            for (let e = 0; e < this._filters.length; e++)
                t += this._filters[e].padding;
        return Math.max(this._padding, t)
    }
    destroy(t = !1) {
        var i, r, n, o;
        if (this.removeAllListeners(),
            typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
            const a = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
            (i = this._fill) != null && i.texture && this._fill.texture.destroy(a),
                (r = this._originalFill) != null && r.texture && this._originalFill.texture.destroy(a),
                (n = this._stroke) != null && n.texture && this._stroke.texture.destroy(a),
                (o = this._originalStroke) != null && o.texture && this._originalStroke.texture.destroy(a)
        }
        this._fill = null,
            this._stroke = null,
            this.dropShadow = null,
            this._originalStroke = null,
            this._originalFill = null
    }
    _createProxy(t, e) {
        return new Proxy(t, {
            set: (i, r, n) => (i[r] === n || (i[r] = n,
                e == null || e(r, n),
                this.update()),
                !0)
        })
    }
    _isFillStyle(t) {
        return (t ?? null) !== null && !(it.isColorLike(t) || t instanceof Nt || t instanceof si)
    }
}
    ;
dr.defaultDropShadow = {
    alpha: 1,
    angle: Math.PI / 6,
    blur: 0,
    color: "black",
    distance: 5
};
dr.defaultTextStyle = {
    align: "left",
    breakWords: !1,
    dropShadow: null,
    fill: "black",
    fontFamily: "Arial",
    fontSize: 26,
    fontStyle: "normal",
    fontVariant: "normal",
    fontWeight: "normal",
    leading: 0,
    letterSpacing: 0,
    lineHeight: 0,
    padding: 0,
    stroke: null,
    textBaseline: "alphabetic",
    trim: !1,
    whiteSpace: "pre",
    wordWrap: !1,
    wordWrapWidth: 100
};
let Tt = dr;
function Iu(s) {
    const t = s;
    if (typeof t.dropShadow == "boolean" && t.dropShadow) {
        const e = Tt.defaultDropShadow;
        s.dropShadow = {
            alpha: t.dropShadowAlpha ?? e.alpha,
            angle: t.dropShadowAngle ?? e.angle,
            blur: t.dropShadowBlur ?? e.blur,
            color: t.dropShadowColor ?? e.color,
            distance: t.dropShadowDistance ?? e.distance
        }
    }
    if (t.strokeThickness !== void 0) {
        U(V, "strokeThickness is now a part of stroke");
        const e = t.stroke;
        let i = {};
        if (it.isColorLike(e))
            i.color = e;
        else if (e instanceof Nt || e instanceof si)
            i.fill = e;
        else if (Object.hasOwnProperty.call(e, "color") || Object.hasOwnProperty.call(e, "fill"))
            i = e;
        else
            throw new Error("Invalid stroke value.");
        s.stroke = {
            ...i,
            width: t.strokeThickness
        }
    }
    if (Array.isArray(t.fillGradientStops)) {
        if (U(V, "gradient fill is now a fill pattern: `new FillGradient(...)`"),
            !Array.isArray(t.fill) || t.fill.length === 0)
            throw new Error("Invalid fill value. Expected an array of colors for gradient fill.");
        t.fill.length !== t.fillGradientStops.length && q("The number of fill colors must match the number of fill gradient stops.");
        const e = new Nt({
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 1
            },
            textureSpace: "local"
        })
            , i = t.fillGradientStops.slice()
            , r = t.fill.map(n => it.shared.setValue(n).toNumber());
        i.forEach((n, o) => {
            e.addColorStop(n, r[o])
        }
        ),
            s.fill = {
                fill: e
            }
    }
}
class Bu {
    constructor(t) {
        this._canvasPool = Object.create(null),
            this.canvasOptions = t || {},
            this.enableFullScreen = !1
    }
    _createCanvasAndContext(t, e) {
        const i = X.get().createCanvas();
        i.width = t,
            i.height = e;
        const r = i.getContext("2d");
        return {
            canvas: i,
            context: r
        }
    }
    getOptimalCanvasAndContext(t, e, i = 1) {
        t = Math.ceil(t * i - 1e-6),
            e = Math.ceil(e * i - 1e-6),
            t = Ie(t),
            e = Ie(e);
        const r = (t << 17) + (e << 1);
        this._canvasPool[r] || (this._canvasPool[r] = []);
        let n = this._canvasPool[r].pop();
        return n || (n = this._createCanvasAndContext(t, e)),
            n
    }
    returnCanvasAndContext(t) {
        const e = t.canvas
            , { width: i, height: r } = e
            , n = (i << 17) + (r << 1);
        t.context.resetTransform(),
            t.context.clearRect(0, 0, i, r),
            this._canvasPool[n].push(t)
    }
    clear() {
        this._canvasPool = {}
    }
}
const fs = new Bu;
_s.register(fs);
const Tn = 1e5;
function js(s, t, e, i = 0) {
    if (s.texture === W.WHITE && !s.fill)
        return it.shared.setValue(s.color).setAlpha(s.alpha ?? 1).toHexa();
    if (s.fill) {
        if (s.fill instanceof si) {
            const r = s.fill
                , n = t.createPattern(r.texture.source.resource, "repeat")
                , o = r.transform.copyTo(D.shared);
            return o.scale(r.texture.frame.width, r.texture.frame.height),
                n.setTransform(o),
                n
        } else if (s.fill instanceof Nt) {
            const r = s.fill
                , n = r.type === "linear"
                , o = r.textureSpace === "local";
            let a = 1
                , h = 1;
            o && e && (a = e.width + i,
                h = e.height + i);
            let l, c = !1;
            if (n) {
                const { start: u, end: f } = r;
                l = t.createLinearGradient(u.x * a, u.y * h, f.x * a, f.y * h),
                    c = Math.abs(f.x - u.x) < Math.abs((f.y - u.y) * .1)
            } else {
                const { center: u, innerRadius: f, outerCenter: d, outerRadius: m } = r;
                l = t.createRadialGradient(u.x * a, u.y * h, f * a, d.x * a, d.y * h, m * a)
            }
            if (c && o && e) {
                const u = e.lineHeight / h;
                for (let f = 0; f < e.lines.length; f++) {
                    const d = (f * e.lineHeight + i / 2) / h;
                    r.colorStops.forEach(m => {
                        const g = d + m.offset * u;
                        l.addColorStop(Math.floor(g * Tn) / Tn, it.shared.setValue(m.color).toHex())
                    }
                    )
                }
            } else
                r.colorStops.forEach(u => {
                    l.addColorStop(u.offset, it.shared.setValue(u.color).toHex())
                }
                );
            return l
        }
    } else {
        const r = t.createPattern(s.texture.source.resource, "repeat")
            , n = s.matrix.copyTo(D.shared);
        return n.scale(s.texture.frame.width, s.texture.frame.height),
            r.setTransform(n),
            r
    }
    return q("FillStyle not recognised", s),
        "red"
}
const aa = class ha extends zo {
    constructor(t) {
        super(),
            this.resolution = 1,
            this.pages = [],
            this._padding = 0,
            this._measureCache = Object.create(null),
            this._currentChars = [],
            this._currentX = 0,
            this._currentY = 0,
            this._currentMaxCharHeight = 0,
            this._currentPageIndex = -1,
            this._skipKerning = !1;
        const e = {
            ...ha.defaultOptions,
            ...t
        };
        this._textureSize = e.textureSize,
            this._mipmap = e.mipmap;
        const i = e.style.clone();
        e.overrideFill && (i._fill.color = 16777215,
            i._fill.alpha = 1,
            i._fill.texture = W.WHITE,
            i._fill.fill = null),
            this.applyFillAsTint = e.overrideFill;
        const r = i.fontSize;
        i.fontSize = this.baseMeasurementFontSize;
        const n = $s(i);
        e.overrideSize ? i._stroke && (i._stroke.width *= this.baseRenderedFontSize / r) : i.fontSize = this.baseRenderedFontSize = r,
            this._style = i,
            this._skipKerning = e.skipKerning ?? !1,
            this.resolution = e.resolution ?? 1,
            this._padding = e.padding ?? 4,
            e.textureStyle && (this._textureStyle = e.textureStyle instanceof Be ? e.textureStyle : new Be(e.textureStyle)),
            this.fontMetrics = Ht.measureFont(n),
            this.lineHeight = i.lineHeight || this.fontMetrics.fontSize || i.fontSize
    }
    ensureCharacters(t) {
        var p, _;
        const e = Ht.graphemeSegmenter(t).filter(x => !this._currentChars.includes(x)).filter((x, y, b) => b.indexOf(x) === y);
        if (!e.length)
            return;
        this._currentChars = [...this._currentChars, ...e];
        let i;
        this._currentPageIndex === -1 ? i = this._nextPage() : i = this.pages[this._currentPageIndex];
        let { canvas: r, context: n } = i.canvasAndContext
            , o = i.texture.source;
        const a = this._style;
        let h = this._currentX
            , l = this._currentY
            , c = this._currentMaxCharHeight;
        const u = this.baseRenderedFontSize / this.baseMeasurementFontSize
            , f = this._padding * u;
        let d = !1;
        const m = r.width / this.resolution
            , g = r.height / this.resolution;
        for (let x = 0; x < e.length; x++) {
            const y = e[x]
                , b = Ht.measureText(y, a, r, !1);
            b.lineHeight = b.height;
            const S = b.width * u
                , A = Math.ceil((a.fontStyle === "italic" ? 2 : 1) * S)
                , w = b.height * u
                , L = A + f * 2
                , k = w + f * 2;
            if (d = !1,
                y !== `
` && y !== "\r" && y !== "	" && y !== " " && (d = !0,
                    c = Math.ceil(Math.max(k, c))),
                h + L > m && (l += c,
                    c = k,
                    h = 0,
                    l + c > g)) {
                o.update();
                const P = this._nextPage();
                r = P.canvasAndContext.canvas,
                    n = P.canvasAndContext.context,
                    o = P.texture.source,
                    h = 0,
                    l = 0,
                    c = 0
            }
            const C = S / u - (((p = a.dropShadow) == null ? void 0 : p.distance) ?? 0) - (((_ = a._stroke) == null ? void 0 : _.width) ?? 0);
            if (this.chars[y] = {
                id: y.codePointAt(0),
                xOffset: -this._padding,
                yOffset: -this._padding,
                xAdvance: C,
                kerning: {}
            },
                d) {
                this._drawGlyph(n, b, h + f, l + f, u, a);
                const P = o.width * u
                    , z = o.height * u
                    , G = new K(h / P * o.width, l / z * o.height, L / P * o.width, k / z * o.height);
                this.chars[y].texture = new W({
                    source: o,
                    frame: G
                }),
                    h += Math.ceil(L)
            }
        }
        o.update(),
            this._currentX = h,
            this._currentY = l,
            this._currentMaxCharHeight = c,
            this._skipKerning && this._applyKerning(e, n)
    }
    get pageTextures() {
        return U(V, "BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),
            this.pages
    }
    _applyKerning(t, e) {
        const i = this._measureCache;
        for (let r = 0; r < t.length; r++) {
            const n = t[r];
            for (let o = 0; o < this._currentChars.length; o++) {
                const a = this._currentChars[o];
                let h = i[n];
                h || (h = i[n] = e.measureText(n).width);
                let l = i[a];
                l || (l = i[a] = e.measureText(a).width);
                let c = e.measureText(n + a).width
                    , u = c - (h + l);
                u && (this.chars[n].kerning[a] = u),
                    c = e.measureText(n + a).width,
                    u = c - (h + l),
                    u && (this.chars[a].kerning[n] = u)
            }
        }
    }
    _nextPage() {
        this._currentPageIndex++;
        const t = this.resolution
            , e = fs.getOptimalCanvasAndContext(this._textureSize, this._textureSize, t);
        this._setupContext(e.context, this._style, t);
        const i = t * (this.baseRenderedFontSize / this.baseMeasurementFontSize)
            , r = new W({
                source: new ge({
                    resource: e.canvas,
                    resolution: i,
                    alphaMode: "premultiply-alpha-on-upload",
                    autoGenerateMipmaps: this._mipmap
                })
            });
        this._textureStyle && (r.source.style = this._textureStyle);
        const n = {
            canvasAndContext: e,
            texture: r
        };
        return this.pages[this._currentPageIndex] = n,
            n
    }
    _setupContext(t, e, i) {
        e.fontSize = this.baseRenderedFontSize,
            t.scale(i, i),
            t.font = $s(e),
            e.fontSize = this.baseMeasurementFontSize,
            t.textBaseline = e.textBaseline;
        const r = e._stroke
            , n = (r == null ? void 0 : r.width) ?? 0;
        if (r && (t.lineWidth = n,
            t.lineJoin = r.join,
            t.miterLimit = r.miterLimit,
            t.strokeStyle = js(r, t)),
            e._fill && (t.fillStyle = js(e._fill, t)),
            e.dropShadow) {
            const o = e.dropShadow
                , a = it.shared.setValue(o.color).toArray()
                , h = o.blur * i
                , l = o.distance * i;
            t.shadowColor = `rgba(${a[0] * 255},${a[1] * 255},${a[2] * 255},${o.alpha})`,
                t.shadowBlur = h,
                t.shadowOffsetX = Math.cos(o.angle) * l,
                t.shadowOffsetY = Math.sin(o.angle) * l
        } else
            t.shadowColor = "black",
                t.shadowBlur = 0,
                t.shadowOffsetX = 0,
                t.shadowOffsetY = 0
    }
    _drawGlyph(t, e, i, r, n, o) {
        const a = e.text
            , h = e.fontProperties
            , l = o._stroke
            , c = ((l == null ? void 0 : l.width) ?? 0) * n
            , u = i + c / 2
            , f = r - c / 2
            , d = h.descent * n
            , m = e.lineHeight * n;
        let g = !1;
        o.stroke && c && (g = !0,
            t.strokeText(a, u, f + m - d));
        const { shadowBlur: p, shadowOffsetX: _, shadowOffsetY: x } = t;
        o._fill && (g && (t.shadowBlur = 0,
            t.shadowOffsetX = 0,
            t.shadowOffsetY = 0),
            t.fillText(a, u, f + m - d)),
            g && (t.shadowBlur = p,
                t.shadowOffsetX = _,
                t.shadowOffsetY = x)
    }
    destroy() {
        super.destroy();
        for (let t = 0; t < this.pages.length; t++) {
            const { canvasAndContext: e, texture: i } = this.pages[t];
            fs.returnCanvasAndContext(e),
                i.destroy(!0)
        }
        this.pages = null
    }
}
    ;
aa.defaultOptions = {
    textureSize: 512,
    style: new Tt,
    mipmap: !0
};
let Mn = aa;
function Fu(s, t, e, i) {
    const r = {
        width: 0,
        height: 0,
        offsetY: 0,
        scale: t.fontSize / e.baseMeasurementFontSize,
        lines: [{
            width: 0,
            charPositions: [],
            spaceWidth: 0,
            spacesIndex: [],
            chars: []
        }]
    };
    r.offsetY = e.baseLineOffset;
    let n = r.lines[0]
        , o = null
        , a = !0;
    const h = {
        width: 0,
        start: 0,
        index: 0,
        positions: [],
        chars: []
    }
        , l = e.baseMeasurementFontSize / t.fontSize
        , c = t.letterSpacing * l
        , u = t.wordWrapWidth * l
        , f = t.lineHeight ? t.lineHeight * l : e.lineHeight
        , d = t.wordWrap && t.breakWords
        , m = _ => {
            const x = n.width;
            for (let y = 0; y < h.index; y++) {
                const b = _.positions[y];
                n.chars.push(_.chars[y]),
                    n.charPositions.push(b + x)
            }
            n.width += _.width,
                a = !1,
                h.width = 0,
                h.index = 0,
                h.chars.length = 0
        }
        , g = () => {
            let _ = n.chars.length - 1;
            if (i) {
                let x = n.chars[_];
                for (; x === " ";)
                    n.width -= e.chars[x].xAdvance,
                        x = n.chars[--_]
            }
            r.width = Math.max(r.width, n.width),
                n = {
                    width: 0,
                    charPositions: [],
                    chars: [],
                    spaceWidth: 0,
                    spacesIndex: []
                },
                a = !0,
                r.lines.push(n),
                r.height += f
        }
        , p = _ => _ - c > u;
    for (let _ = 0; _ < s.length + 1; _++) {
        let x;
        const y = _ === s.length;
        y || (x = s[_]);
        const b = e.chars[x] || e.chars[" "];
        if (/(?:\s)/.test(x) || x === "\r" || x === `
` || y) {
            if (!a && t.wordWrap && p(n.width + h.width) ? (g(),
                m(h),
                y || n.charPositions.push(0)) : (h.start = n.width,
                    m(h),
                    y || n.charPositions.push(0)),
                x === "\r" || x === `
`)
                g();
            else if (!y) {
                const L = b.xAdvance + (b.kerning[o] || 0) + c;
                n.width += L,
                    n.spaceWidth = L,
                    n.spacesIndex.push(n.charPositions.length),
                    n.chars.push(x)
            }
        } else {
            const w = b.kerning[o] || 0
                , L = b.xAdvance + w + c;
            d && p(n.width + h.width + L) && (m(h),
                g()),
                h.positions[h.index++] = h.width + w,
                h.chars.push(x),
                h.width += L
        }
        o = x
    }
    return g(),
        t.align === "center" ? Ru(r) : t.align === "right" ? Lu(r) : t.align === "justify" && Gu(r),
        r
}
function Ru(s) {
    for (let t = 0; t < s.lines.length; t++) {
        const e = s.lines[t]
            , i = s.width / 2 - e.width / 2;
        for (let r = 0; r < e.charPositions.length; r++)
            e.charPositions[r] += i
    }
}
function Lu(s) {
    for (let t = 0; t < s.lines.length; t++) {
        const e = s.lines[t]
            , i = s.width - e.width;
        for (let r = 0; r < e.charPositions.length; r++)
            e.charPositions[r] += i
    }
}
function Gu(s) {
    const t = s.width;
    for (let e = 0; e < s.lines.length; e++) {
        const i = s.lines[e];
        let r = 0
            , n = i.spacesIndex[r++]
            , o = 0;
        const a = i.spacesIndex.length
            , l = (t - i.width) / a;
        for (let c = 0; c < i.charPositions.length; c++)
            c === n && (n = i.spacesIndex[r++],
                o += l),
                i.charPositions[c] += o
    }
}
function Ou(s) {
    if (s === "")
        return [];
    typeof s == "string" && (s = [s]);
    const t = [];
    for (let e = 0, i = s.length; e < i; e++) {
        const r = s[e];
        if (Array.isArray(r)) {
            if (r.length !== 2)
                throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${r.length}.`);
            if (r[0].length === 0 || r[1].length === 0)
                throw new Error("[BitmapFont]: Invalid character delimiter.");
            const n = r[0].charCodeAt(0)
                , o = r[1].charCodeAt(0);
            if (o < n)
                throw new Error("[BitmapFont]: Invalid character range.");
            for (let a = n, h = o; a <= h; a++)
                t.push(String.fromCharCode(a))
        } else
            t.push(...Array.from(r))
    }
    if (t.length === 0)
        throw new Error("[BitmapFont]: Empty set when resolving characters.");
    return t
}
let Ws = 0;
class Wu {
    constructor() {
        this.ALPHA = [["a", "z"], ["A", "Z"], " "],
            this.NUMERIC = [["0", "9"]],
            this.ALPHANUMERIC = [["a", "z"], ["A", "Z"], ["0", "9"], " "],
            this.ASCII = [[" ", "~"]],
            this.defaultOptions = {
                chars: this.ALPHANUMERIC,
                resolution: 1,
                padding: 4,
                skipKerning: !1,
                textureStyle: null
            },
            this.measureCache = Ho(1e3)
    }
    getFont(t, e) {
        var o;
        let i = `${e.fontFamily}-bitmap`
            , r = !0;
        if (e._fill.fill && !e._stroke ? (i += e._fill.fill.styleKey,
            r = !1) : (e._stroke || e.dropShadow) && (i = `${e.styleKey}-bitmap`,
                r = !1),
            !j.has(i)) {
            const a = Object.create(e);
            a.lineHeight = 0;
            const h = new Mn({
                style: a,
                overrideFill: r,
                overrideSize: !0,
                ...this.defaultOptions
            });
            Ws++,
                Ws > 50 && q("BitmapText", `You have dynamically created ${Ws} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``),
                h.once("destroy", () => {
                    Ws--,
                        j.remove(i)
                }
                ),
                j.set(i, h)
        }
        const n = j.get(i);
        return (o = n.ensureCharacters) == null || o.call(n, t),
            n
    }
    getLayout(t, e, i = !0) {
        const r = this.getFont(t, e)
            , n = `${t}-${e.styleKey}-${i}`;
        if (this.measureCache.has(n))
            return this.measureCache.get(n);
        const o = Ht.graphemeSegmenter(t)
            , a = Fu(o, e, r, i);
        return this.measureCache.set(n, a),
            a
    }
    measureText(t, e, i = !0) {
        return this.getLayout(t, e, i)
    }
    install(...t) {
        var l, c, u, f;
        let e = t[0];
        typeof e == "string" && (e = {
            name: e,
            style: t[1],
            chars: (l = t[2]) == null ? void 0 : l.chars,
            resolution: (c = t[2]) == null ? void 0 : c.resolution,
            padding: (u = t[2]) == null ? void 0 : u.padding,
            skipKerning: (f = t[2]) == null ? void 0 : f.skipKerning
        },
            U(V, "BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));
        const i = e == null ? void 0 : e.name;
        if (!i)
            throw new Error("[BitmapFontManager] Property `name` is required.");
        e = {
            ...this.defaultOptions,
            ...e
        };
        const r = e.style
            , n = r instanceof Tt ? r : new Tt(r)
            , o = e.dynamicFill ?? this._canUseTintForStyle(n)
            , a = new Mn({
                style: n,
                overrideFill: o,
                skipKerning: e.skipKerning,
                padding: e.padding,
                resolution: e.resolution,
                overrideSize: !1,
                textureStyle: e.textureStyle
            })
            , h = Ou(e.chars);
        return a.ensureCharacters(h.join("")),
            j.set(`${i}-bitmap`, a),
            a.once("destroy", () => j.remove(`${i}-bitmap`)),
            a
    }
    uninstall(t) {
        const e = `${t}-bitmap`
            , i = j.get(e);
        i && i.destroy()
    }
    _canUseTintForStyle(t) {
        return !t._stroke && (!t.dropShadow || t.dropShadow.color === 0) && !t._fill.fill && t._fill.color === 16777215
    }
}
const kn = new Wu;
class la extends zo {
    constructor(t, e) {
        super();
        const { textures: i, data: r } = t;
        Object.keys(r.pages).forEach(n => {
            const o = r.pages[parseInt(n, 10)]
                , a = i[o.id];
            this.pages.push({
                texture: a
            })
        }
        ),
            Object.keys(r.chars).forEach(n => {
                const o = r.chars[n]
                    , { frame: a, source: h, rotate: l } = i[o.page]
                    , c = Y.transformRectCoords(o, a, l, new K)
                    , u = new W({
                        frame: c,
                        orig: new K(0, 0, o.width, o.height),
                        source: h,
                        rotate: l
                    });
                this.chars[n] = {
                    id: n.codePointAt(0),
                    xOffset: o.xOffset,
                    yOffset: o.yOffset,
                    xAdvance: o.xAdvance,
                    kerning: o.kerning ?? {},
                    texture: u
                }
            }
            ),
            this.baseRenderedFontSize = r.fontSize,
            this.baseMeasurementFontSize = r.fontSize,
            this.fontMetrics = {
                ascent: 0,
                descent: 0,
                fontSize: r.fontSize
            },
            this.baseLineOffset = r.baseLineOffset,
            this.lineHeight = r.lineHeight,
            this.fontFamily = r.fontFamily,
            this.distanceField = r.distanceField ?? {
                type: "none",
                range: 0
            },
            this.url = e
    }
    destroy() {
        super.destroy();
        for (let t = 0; t < this.pages.length; t++) {
            const { texture: e } = this.pages[t];
            e.destroy(!0)
        }
        this.pages = null
    }
    static install(t) {
        kn.install(t)
    }
    static uninstall(t) {
        kn.uninstall(t)
    }
}
const Ii = {
    test(s) {
        return typeof s == "string" && s.startsWith("info face=")
    },
    parse(s) {
        const t = s.match(/^[a-z]+\s+.+$/gm)
            , e = {
                info: [],
                common: [],
                page: [],
                char: [],
                chars: [],
                kerning: [],
                kernings: [],
                distanceField: []
            };
        for (const u in t) {
            const f = t[u].match(/^[a-z]+/gm)[0]
                , d = t[u].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm)
                , m = {};
            for (const g in d) {
                const p = d[g].split("=")
                    , _ = p[0]
                    , x = p[1].replace(/"/gm, "")
                    , y = parseFloat(x)
                    , b = isNaN(y) ? x : y;
                m[_] = b
            }
            e[f].push(m)
        }
        const i = {
            chars: {},
            pages: [],
            lineHeight: 0,
            fontSize: 0,
            fontFamily: "",
            distanceField: null,
            baseLineOffset: 0
        }
            , [r] = e.info
            , [n] = e.common
            , [o] = e.distanceField ?? [];
        o && (i.distanceField = {
            range: parseInt(o.distanceRange, 10),
            type: o.fieldType
        }),
            i.fontSize = parseInt(r.size, 10),
            i.fontFamily = r.face,
            i.lineHeight = parseInt(n.lineHeight, 10);
        const a = e.page;
        for (let u = 0; u < a.length; u++)
            i.pages.push({
                id: parseInt(a[u].id, 10) || 0,
                file: a[u].file
            });
        const h = {};
        i.baseLineOffset = i.lineHeight - parseInt(n.base, 10);
        const l = e.char;
        for (let u = 0; u < l.length; u++) {
            const f = l[u]
                , d = parseInt(f.id, 10);
            let m = f.letter ?? f.char ?? String.fromCharCode(d);
            m === "space" && (m = " "),
                h[d] = m,
                i.chars[m] = {
                    id: d,
                    page: parseInt(f.page, 10) || 0,
                    x: parseInt(f.x, 10),
                    y: parseInt(f.y, 10),
                    width: parseInt(f.width, 10),
                    height: parseInt(f.height, 10),
                    xOffset: parseInt(f.xoffset, 10),
                    yOffset: parseInt(f.yoffset, 10),
                    xAdvance: parseInt(f.xadvance, 10),
                    kerning: {}
                }
        }
        const c = e.kerning || [];
        for (let u = 0; u < c.length; u++) {
            const f = parseInt(c[u].first, 10)
                , d = parseInt(c[u].second, 10)
                , m = parseInt(c[u].amount, 10);
            i.chars[h[d]].kerning[h[f]] = m
        }
        return i
    }
}
    , En = {
        test(s) {
            const t = s;
            return typeof t != "string" && "getElementsByTagName" in t && t.getElementsByTagName("page").length && t.getElementsByTagName("info")[0].getAttribute("face") !== null
        },
        parse(s) {
            const t = {
                chars: {},
                pages: [],
                lineHeight: 0,
                fontSize: 0,
                fontFamily: "",
                distanceField: null,
                baseLineOffset: 0
            }
                , e = s.getElementsByTagName("info")[0]
                , i = s.getElementsByTagName("common")[0]
                , r = s.getElementsByTagName("distanceField")[0];
            r && (t.distanceField = {
                type: r.getAttribute("fieldType"),
                range: parseInt(r.getAttribute("distanceRange"), 10)
            });
            const n = s.getElementsByTagName("page")
                , o = s.getElementsByTagName("char")
                , a = s.getElementsByTagName("kerning");
            t.fontSize = parseInt(e.getAttribute("size"), 10),
                t.fontFamily = e.getAttribute("face"),
                t.lineHeight = parseInt(i.getAttribute("lineHeight"), 10);
            for (let l = 0; l < n.length; l++)
                t.pages.push({
                    id: parseInt(n[l].getAttribute("id"), 10) || 0,
                    file: n[l].getAttribute("file")
                });
            const h = {};
            t.baseLineOffset = t.lineHeight - parseInt(i.getAttribute("base"), 10);
            for (let l = 0; l < o.length; l++) {
                const c = o[l]
                    , u = parseInt(c.getAttribute("id"), 10);
                let f = c.getAttribute("letter") ?? c.getAttribute("char") ?? String.fromCharCode(u);
                f === "space" && (f = " "),
                    h[u] = f,
                    t.chars[f] = {
                        id: u,
                        page: parseInt(c.getAttribute("page"), 10) || 0,
                        x: parseInt(c.getAttribute("x"), 10),
                        y: parseInt(c.getAttribute("y"), 10),
                        width: parseInt(c.getAttribute("width"), 10),
                        height: parseInt(c.getAttribute("height"), 10),
                        xOffset: parseInt(c.getAttribute("xoffset"), 10),
                        yOffset: parseInt(c.getAttribute("yoffset"), 10),
                        xAdvance: parseInt(c.getAttribute("xadvance"), 10),
                        kerning: {}
                    }
            }
            for (let l = 0; l < a.length; l++) {
                const c = parseInt(a[l].getAttribute("first"), 10)
                    , u = parseInt(a[l].getAttribute("second"), 10)
                    , f = parseInt(a[l].getAttribute("amount"), 10);
                t.chars[h[u]].kerning[h[c]] = f
            }
            return t
        }
    }
    , In = {
        test(s) {
            return typeof s == "string" && s.match(/<font(\s|>)/) ? En.test(X.get().parseXML(s)) : !1
        },
        parse(s) {
            return En.parse(X.get().parseXML(s))
        }
    }
    , Uu = [".xml", ".fnt"]
    , Du = {
        extension: {
            type: B.CacheParser,
            name: "cacheBitmapFont"
        },
        test: s => s instanceof la,
        getCacheableAssets(s, t) {
            const e = {};
            return s.forEach(i => {
                e[i] = t,
                    e[`${i}-bitmap`] = t
            }
            ),
                e[`${t.fontFamily}-bitmap`] = t,
                e
        }
    }
    , zu = {
        extension: {
            type: B.LoadParser,
            priority: te.Normal
        },
        name: "loadBitmapFont",
        id: "bitmap-font",
        test(s) {
            return Uu.includes(dt.extname(s).toLowerCase())
        },
        async testParse(s) {
            return Ii.test(s) || In.test(s)
        },
        async parse(s, t, e) {
            const i = Ii.test(s) ? Ii.parse(s) : In.parse(s)
                , { src: r } = t
                , { pages: n } = i
                , o = []
                , a = i.distanceField ? {
                    scaleMode: "linear",
                    alphaMode: "premultiply-alpha-on-upload",
                    autoGenerateMipmaps: !1,
                    resolution: 1
                } : {};
            for (let u = 0; u < n.length; ++u) {
                const f = n[u].file;
                let d = dt.join(dt.dirname(r), f);
                d = zi(d, r),
                    o.push({
                        src: d,
                        data: a
                    })
            }
            const h = await e.load(o)
                , l = o.map(u => h[u.src]);
            return new la({
                data: i,
                textures: l
            }, r)
        },
        async load(s, t) {
            return await (await X.get().fetch(s)).text()
        },
        async unload(s, t, e) {
            await Promise.all(s.pages.map(i => e.unload(i.texture.source._sourceOrigin))),
                s.destroy()
        }
    };
class Hu {
    constructor(t, e = !1) {
        this._loader = t,
            this._assetList = [],
            this._isLoading = !1,
            this._maxConcurrent = 1,
            this.verbose = e
    }
    add(t) {
        t.forEach(e => {
            this._assetList.push(e)
        }
        ),
            this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList),
            this._isActive && !this._isLoading && this._next()
    }
    async _next() {
        if (this._assetList.length && this._isActive) {
            this._isLoading = !0;
            const t = []
                , e = Math.min(this._assetList.length, this._maxConcurrent);
            for (let i = 0; i < e; i++)
                t.push(this._assetList.pop());
            await this._loader.load(t),
                this._isLoading = !1,
                this._next()
        }
    }
    get active() {
        return this._isActive
    }
    set active(t) {
        this._isActive !== t && (this._isActive = t,
            t && !this._isLoading && this._next())
    }
}
const Nu = {
    extension: {
        type: B.CacheParser,
        name: "cacheTextureArray"
    },
    test: s => Array.isArray(s) && s.every(t => t instanceof W),
    getCacheableAssets: (s, t) => {
        const e = {};
        return s.forEach(i => {
            t.forEach((r, n) => {
                e[i + (n === 0 ? "" : n + 1)] = r
            }
            )
        }
        ),
            e
    }
};
async function ca(s) {
    if ("Image" in globalThis)
        return new Promise(t => {
            const e = new Image;
            e.onload = () => {
                t(!0)
            }
                ,
                e.onerror = () => {
                    t(!1)
                }
                ,
                e.src = s
        }
        );
    if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
        try {
            const t = await (await fetch(s)).blob();
            await createImageBitmap(t)
        } catch {
            return !1
        }
        return !0
    }
    return !1
}
const Vu = {
    extension: {
        type: B.DetectionParser,
        priority: 1
    },
    test: async () => ca("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
    add: async s => [...s, "avif"],
    remove: async s => s.filter(t => t !== "avif")
}
    , Bn = ["png", "jpg", "jpeg"]
    , $u = {
        extension: {
            type: B.DetectionParser,
            priority: -1
        },
        test: () => Promise.resolve(!0),
        add: async s => [...s, ...Bn],
        remove: async s => s.filter(t => !Bn.includes(t))
    }
    , Yu = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function ri(s) {
    return Yu ? !1 : document.createElement("video").canPlayType(s) !== ""
}
const Xu = {
    extension: {
        type: B.DetectionParser,
        priority: 0
    },
    test: async () => ri("video/mp4"),
    add: async s => [...s, "mp4", "m4v"],
    remove: async s => s.filter(t => t !== "mp4" && t !== "m4v")
}
    , ju = {
        extension: {
            type: B.DetectionParser,
            priority: 0
        },
        test: async () => ri("video/ogg"),
        add: async s => [...s, "ogv"],
        remove: async s => s.filter(t => t !== "ogv")
    }
    , qu = {
        extension: {
            type: B.DetectionParser,
            priority: 0
        },
        test: async () => ri("video/webm"),
        add: async s => [...s, "webm"],
        remove: async s => s.filter(t => t !== "webm")
    }
    , Ku = {
        extension: {
            type: B.DetectionParser,
            priority: 0
        },
        test: async () => ca("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),
        add: async s => [...s, "webp"],
        remove: async s => s.filter(t => t !== "webp")
    }
    , ua = class zs {
        constructor() {
            this.loadOptions = {
                ...zs.defaultOptions
            },
                this._parsers = [],
                this._parsersValidated = !1,
                this.parsers = new Proxy(this._parsers, {
                    set: (t, e, i) => (this._parsersValidated = !1,
                        t[e] = i,
                        !0)
                }),
                this.promiseCache = {}
        }
        reset() {
            this._parsersValidated = !1,
                this.promiseCache = {}
        }
        _getLoadPromiseAndParser(t, e) {
            const i = {
                promise: null,
                parser: null
            };
            return i.promise = (async () => {
                var o, a;
                let r = null
                    , n = null;
                if ((e.parser || e.loadParser) && (n = this._parserHash[e.parser || e.loadParser],
                    e.loadParser && q(`[Assets] "loadParser" is deprecated, use "parser" instead for ${t}`),
                    n || q(`[Assets] specified load parser "${e.parser || e.loadParser}" not found while loading ${t}`)),
                    !n) {
                    for (let h = 0; h < this.parsers.length; h++) {
                        const l = this.parsers[h];
                        if (l.load && ((o = l.test) != null && o.call(l, t, e, this))) {
                            n = l;
                            break
                        }
                    }
                    if (!n)
                        return q(`[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`),
                            null
                }
                r = await n.load(t, e, this),
                    i.parser = n;
                for (let h = 0; h < this.parsers.length; h++) {
                    const l = this.parsers[h];
                    l.parse && l.parse && await ((a = l.testParse) == null ? void 0 : a.call(l, r, e, this)) && (r = await l.parse(r, e, this) || r,
                        i.parser = l)
                }
                return r
            }
            )(),
                i
        }
        async load(t, e) {
            this._parsersValidated || this._validateParsers();
            const i = typeof e == "function" ? {
                ...zs.defaultOptions,
                ...this.loadOptions,
                onProgress: e
            } : {
                ...zs.defaultOptions,
                ...this.loadOptions,
                ...e || {}
            }
                , { onProgress: r, onError: n, strategy: o, retryCount: a, retryDelay: h } = i;
            let l = 0;
            const c = {}
                , u = Vs(t)
                , f = Bt(t, g => ({
                    alias: [g],
                    src: g,
                    data: {}
                }))
                , d = f.reduce((g, p) => g + (p.progressSize || 1), 0)
                , m = f.map(async g => {
                    const p = dt.toAbsolute(g.src);
                    c[g.src] || (await this._loadAssetWithRetry(p, g, {
                        onProgress: r,
                        onError: n,
                        strategy: o,
                        retryCount: a,
                        retryDelay: h
                    }, c),
                        l += g.progressSize || 1,
                        r && r(l / d))
                }
                );
            return await Promise.all(m),
                u ? c[f[0].src] : c
        }
        async unload(t) {
            const i = Bt(t, r => ({
                alias: [r],
                src: r
            })).map(async r => {
                var a, h;
                const n = dt.toAbsolute(r.src)
                    , o = this.promiseCache[n];
                if (o) {
                    const l = await o.promise;
                    delete this.promiseCache[n],
                        await ((h = (a = o.parser) == null ? void 0 : a.unload) == null ? void 0 : h.call(a, l, r, this))
                }
            }
            );
            await Promise.all(i)
        }
        _validateParsers() {
            this._parsersValidated = !0,
                this._parserHash = this._parsers.filter(t => t.name || t.id).reduce((t, e) => (!e.name && !e.id ? q("[Assets] parser should have an id") : (t[e.name] || t[e.id]) && q(`[Assets] parser id conflict "${e.id}"`),
                    t[e.name] = e,
                    e.id && (t[e.id] = e),
                    t), {})
        }
        async _loadAssetWithRetry(t, e, i, r) {
            let n = 0;
            const { onError: o, strategy: a, retryCount: h, retryDelay: l } = i
                , c = u => new Promise(f => setTimeout(f, u));
            for (; ;)
                try {
                    this.promiseCache[t] || (this.promiseCache[t] = this._getLoadPromiseAndParser(t, e)),
                        r[e.src] = await this.promiseCache[t].promise;
                    return
                } catch (u) {
                    delete this.promiseCache[t],
                        delete r[e.src],
                        n++;
                    const f = a !== "retry" || n > h;
                    if (a === "retry" && !f) {
                        o && o(u, e),
                            await c(l);
                        continue
                    }
                    if (a === "skip") {
                        o && o(u, e);
                        return
                    }
                    o && o(u, e);
                    const d = new Error(`[Loader.load] Failed to load ${t}.
${u}`);
                    throw u instanceof Error && u.stack && (d.stack = u.stack),
                    d
                }
        }
    }
    ;
ua.defaultOptions = {
    onProgress: void 0,
    onError: void 0,
    strategy: "throw",
    retryCount: 3,
    retryDelay: 250
};
let Zu = ua;
function Ge(s, t) {
    if (Array.isArray(t)) {
        for (const e of t)
            if (s.startsWith(`data:${e}`))
                return !0;
        return !1
    }
    return s.startsWith(`data:${t}`)
}
function Oe(s, t) {
    const e = s.split("?")[0]
        , i = dt.extname(e).toLowerCase();
    return Array.isArray(t) ? t.includes(i) : i === t
}
const Qu = ".json"
    , Ju = "application/json"
    , td = {
        extension: {
            type: B.LoadParser,
            priority: te.Low
        },
        name: "loadJson",
        id: "json",
        test(s) {
            return Ge(s, Ju) || Oe(s, Qu)
        },
        async load(s) {
            return await (await X.get().fetch(s)).json()
        }
    }
    , ed = ".txt"
    , sd = "text/plain"
    , id = {
        name: "loadTxt",
        id: "text",
        extension: {
            type: B.LoadParser,
            priority: te.Low,
            name: "loadTxt"
        },
        test(s) {
            return Ge(s, sd) || Oe(s, ed)
        },
        async load(s) {
            return await (await X.get().fetch(s)).text()
        }
    }
    , rd = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
    , nd = [".ttf", ".otf", ".woff", ".woff2"]
    , od = ["font/ttf", "font/otf", "font/woff", "font/woff2"]
    , ad = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function hd(s) {
    const t = dt.extname(s)
        , r = dt.basename(s, t).replace(/(-|_)/g, " ").toLowerCase().split(" ").map(a => a.charAt(0).toUpperCase() + a.slice(1));
    let n = r.length > 0;
    for (const a of r)
        if (!a.match(ad)) {
            n = !1;
            break
        }
    let o = r.join(" ");
    return n || (o = `"${o.replace(/[\\"]/g, "\\$&")}"`),
        o
}
const ld = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function cd(s) {
    return ld.test(s) ? s : encodeURI(s)
}
const ud = {
    extension: {
        type: B.LoadParser,
        priority: te.Low
    },
    name: "loadWebFont",
    id: "web-font",
    test(s) {
        return Ge(s, od) || Oe(s, nd)
    },
    async load(s, t) {
        var i, r, n;
        const e = X.get().getFontFaceSet();
        if (e) {
            const o = []
                , a = ((i = t.data) == null ? void 0 : i.family) ?? hd(s)
                , h = ((n = (r = t.data) == null ? void 0 : r.weights) == null ? void 0 : n.filter(c => rd.includes(c))) ?? ["normal"]
                , l = t.data ?? {};
            for (let c = 0; c < h.length; c++) {
                const u = h[c]
                    , f = new FontFace(a, `url(${cd(s)})`, {
                        ...l,
                        weight: u
                    });
                await f.load(),
                    e.add(f),
                    o.push(f)
            }
            return j.has(`${a}-and-url`) ? j.get(`${a}-and-url`).entries.push({
                url: s,
                faces: o
            }) : j.set(`${a}-and-url`, {
                entries: [{
                    url: s,
                    faces: o
                }]
            }),
                o.length === 1 ? o[0] : o
        }
        return q("[loadWebFont] FontFace API is not supported. Skipping loading font"),
            null
    },
    unload(s) {
        const t = Array.isArray(s) ? s : [s]
            , e = t[0].family
            , i = j.get(`${e}-and-url`)
            , r = i.entries.find(n => n.faces.some(o => t.indexOf(o) !== -1));
        r.faces = r.faces.filter(n => t.indexOf(n) === -1),
            r.faces.length === 0 && (i.entries = i.entries.filter(n => n !== r)),
            t.forEach(n => {
                X.get().getFontFaceSet().delete(n)
            }
            ),
            i.entries.length === 0 && j.remove(`${e}-and-url`)
    }
};
function fr(s, t = 1) {
    var i;
    const e = (i = Le.RETINA_PREFIX) == null ? void 0 : i.exec(s);
    return e ? parseFloat(e[1]) : t
}
function pr(s, t, e) {
    s.label = e,
        s._sourceOrigin = e;
    const i = new W({
        source: s,
        label: e
    })
        , r = () => {
            delete t.promiseCache[e],
                j.has(e) && j.remove(e)
        }
        ;
    return i.source.once("destroy", () => {
        t.promiseCache[e] && (q("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."),
            r())
    }
    ),
        i.once("destroy", () => {
            s.destroyed || (q("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."),
                r())
        }
        ),
        i
}
const dd = ".svg"
    , fd = "image/svg+xml"
    , pd = {
        extension: {
            type: B.LoadParser,
            priority: te.Low,
            name: "loadSVG"
        },
        name: "loadSVG",
        id: "svg",
        config: {
            crossOrigin: "anonymous",
            parseAsGraphicsContext: !1
        },
        test(s) {
            return Ge(s, fd) || Oe(s, dd)
        },
        async load(s, t, e) {
            var i;
            return ((i = t.data) == null ? void 0 : i.parseAsGraphicsContext) ?? this.config.parseAsGraphicsContext ? gd(s) : md(s, t, e, this.config.crossOrigin)
        },
        unload(s) {
            s.destroy(!0)
        }
    };
async function md(s, t, e, i) {
    var p, _, x;
    const r = await X.get().fetch(s)
        , n = X.get().createImage();
    n.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(await r.text())}`,
        n.crossOrigin = i,
        await n.decode();
    const o = ((p = t.data) == null ? void 0 : p.width) ?? n.width
        , a = ((_ = t.data) == null ? void 0 : _.height) ?? n.height
        , h = ((x = t.data) == null ? void 0 : x.resolution) || fr(s)
        , l = Math.ceil(o * h)
        , c = Math.ceil(a * h)
        , u = X.get().createCanvas(l, c)
        , f = u.getContext("2d");
    f.imageSmoothingEnabled = !0,
        f.imageSmoothingQuality = "high",
        f.drawImage(n, 0, 0, o * h, a * h);
    const { parseAsGraphicsContext: d, ...m } = t.data ?? {}
        , g = new ge({
            resource: u,
            alphaMode: "premultiply-alpha-on-upload",
            resolution: h,
            ...m
        });
    return pr(g, e, s)
}
async function gd(s) {
    const e = await (await X.get().fetch(s)).text()
        , i = new Mt;
    return i.svg(e),
        i
}
const _d = `(function () {
    'use strict';

    const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
    async function checkImageBitmap() {
      try {
        if (typeof createImageBitmap !== "function")
          return false;
        const response = await fetch(WHITE_PNG);
        const imageBlob = await response.blob();
        const imageBitmap = await createImageBitmap(imageBlob);
        return imageBitmap.width === 1 && imageBitmap.height === 1;
      } catch (_e) {
        return false;
      }
    }
    void checkImageBitmap().then((result) => {
      self.postMessage(result);
    });

})();
`;
let ke = null
    , Qi = class {
        constructor() {
            ke || (ke = URL.createObjectURL(new Blob([_d], {
                type: "application/javascript"
            }))),
                this.worker = new Worker(ke)
        }
    }
    ;
Qi.revokeObjectURL = function () {
    ke && (URL.revokeObjectURL(ke),
        ke = null)
}
    ;
const xd = `(function () {
    'use strict';

    async function loadImageBitmap(url, alphaMode) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
      }
      const imageBlob = await response.blob();
      return alphaMode === "premultiplied-alpha" ? createImageBitmap(imageBlob, { premultiplyAlpha: "none" }) : createImageBitmap(imageBlob);
    }
    self.onmessage = async (event) => {
      try {
        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);
        self.postMessage({
          data: imageBitmap,
          uuid: event.data.uuid,
          id: event.data.id
        }, [imageBitmap]);
      } catch (e) {
        self.postMessage({
          error: e,
          uuid: event.data.uuid,
          id: event.data.id
        });
      }
    };

})();
`;
let Ee = null;
class da {
    constructor() {
        Ee || (Ee = URL.createObjectURL(new Blob([xd], {
            type: "application/javascript"
        }))),
            this.worker = new Worker(Ee)
    }
}
da.revokeObjectURL = function () {
    Ee && (URL.revokeObjectURL(Ee),
        Ee = null)
}
    ;
let Fn = 0, Bi;
class yd {
    constructor() {
        this._initialized = !1,
            this._createdWorkers = 0,
            this._workerPool = [],
            this._queue = [],
            this._resolveHash = {}
    }
    isImageBitmapSupported() {
        return this._isImageBitmapSupported !== void 0 ? this._isImageBitmapSupported : (this._isImageBitmapSupported = new Promise(t => {
            const { worker: e } = new Qi;
            e.addEventListener("message", i => {
                e.terminate(),
                    Qi.revokeObjectURL(),
                    t(i.data)
            }
            )
        }
        ),
            this._isImageBitmapSupported)
    }
    loadImageBitmap(t, e) {
        var i;
        return this._run("loadImageBitmap", [t, (i = e == null ? void 0 : e.data) == null ? void 0 : i.alphaMode])
    }
    async _initWorkers() {
        this._initialized || (this._initialized = !0)
    }
    _getWorker() {
        Bi === void 0 && (Bi = navigator.hardwareConcurrency || 4);
        let t = this._workerPool.pop();
        return !t && this._createdWorkers < Bi && (this._createdWorkers++,
            t = new da().worker,
            t.addEventListener("message", e => {
                this._complete(e.data),
                    this._returnWorker(e.target),
                    this._next()
            }
            )),
            t
    }
    _returnWorker(t) {
        this._workerPool.push(t)
    }
    _complete(t) {
        this._resolveHash[t.uuid] && (t.error !== void 0 ? this._resolveHash[t.uuid].reject(t.error) : this._resolveHash[t.uuid].resolve(t.data),
            delete this._resolveHash[t.uuid])
    }
    async _run(t, e) {
        await this._initWorkers();
        const i = new Promise((r, n) => {
            this._queue.push({
                id: t,
                arguments: e,
                resolve: r,
                reject: n
            })
        }
        );
        return this._next(),
            i
    }
    _next() {
        if (!this._queue.length)
            return;
        const t = this._getWorker();
        if (!t)
            return;
        const e = this._queue.pop()
            , i = e.id;
        this._resolveHash[Fn] = {
            resolve: e.resolve,
            reject: e.reject
        },
            t.postMessage({
                data: e.arguments,
                uuid: Fn++,
                id: i
            })
    }
    reset() {
        this._workerPool.forEach(t => t.terminate()),
            this._workerPool.length = 0,
            Object.values(this._resolveHash).forEach(({ reject: t }) => {
                t == null || t(new Error("WorkerManager has been reset before completion"))
            }
            ),
            this._resolveHash = {},
            this._queue.length = 0,
            this._initialized = !1,
            this._createdWorkers = 0
    }
}
const Rn = new yd
    , bd = [".jpeg", ".jpg", ".png", ".webp", ".avif"]
    , wd = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function Ad(s, t) {
    var r;
    const e = await X.get().fetch(s);
    if (!e.ok)
        throw new Error(`[loadImageBitmap] Failed to fetch ${s}: ${e.status} ${e.statusText}`);
    const i = await e.blob();
    return ((r = t == null ? void 0 : t.data) == null ? void 0 : r.alphaMode) === "premultiplied-alpha" ? createImageBitmap(i, {
        premultiplyAlpha: "none"
    }) : createImageBitmap(i)
}
const fa = {
    name: "loadTextures",
    id: "texture",
    extension: {
        type: B.LoadParser,
        priority: te.High,
        name: "loadTextures"
    },
    config: {
        preferWorkers: !0,
        preferCreateImageBitmap: !0,
        crossOrigin: "anonymous"
    },
    test(s) {
        return Ge(s, wd) || Oe(s, bd)
    },
    async load(s, t, e) {
        var n;
        let i = null;
        globalThis.createImageBitmap && this.config.preferCreateImageBitmap ? this.config.preferWorkers && await Rn.isImageBitmapSupported() ? i = await Rn.loadImageBitmap(s, t) : i = await Ad(s, t) : i = await new Promise((o, a) => {
            i = X.get().createImage(),
                i.crossOrigin = this.config.crossOrigin,
                i.src = s,
                i.complete ? o(i) : (i.onload = () => {
                    o(i)
                }
                    ,
                    i.onerror = a)
        }
        );
        const r = new ge({
            resource: i,
            alphaMode: "premultiply-alpha-on-upload",
            resolution: ((n = t.data) == null ? void 0 : n.resolution) || fr(s),
            ...t.data
        });
        return pr(r, e, s)
    },
    unload(s) {
        s.destroy(!0)
    }
}
    , Sd = [".mp4", ".m4v", ".webm", ".ogg", ".ogv", ".h264", ".avi", ".mov"];
let Fi, Ri;
function vd(s, t, e) {
    e === void 0 && !t.startsWith("data:") ? s.crossOrigin = Pd(t) : e !== !1 && (s.crossOrigin = typeof e == "string" ? e : "anonymous")
}
function Cd(s) {
    return new Promise((t, e) => {
        s.addEventListener("canplaythrough", i),
            s.addEventListener("error", r),
            s.load();
        function i() {
            n(),
                t()
        }
        function r(o) {
            n(),
                e(o)
        }
        function n() {
            s.removeEventListener("canplaythrough", i),
                s.removeEventListener("error", r)
        }
    }
    )
}
function Pd(s, t = globalThis.location) {
    if (s.startsWith("data:"))
        return "";
    t || (t = globalThis.location);
    const e = new URL(s, document.baseURI);
    return e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol ? "anonymous" : ""
}
function Td() {
    const s = []
        , t = [];
    for (const e of Sd) {
        const i = ns.MIME_TYPES[e.substring(1)] || `video/${e.substring(1)}`;
        ri(i) && (s.push(e),
            t.includes(i) || t.push(i))
    }
    return {
        validVideoExtensions: s,
        validVideoMime: t
    }
}
const Md = {
    name: "loadVideo",
    id: "video",
    extension: {
        type: B.LoadParser,
        name: "loadVideo"
    },
    test(s) {
        if (!Fi || !Ri) {
            const { validVideoExtensions: i, validVideoMime: r } = Td();
            Fi = i,
                Ri = r
        }
        const t = Ge(s, Ri)
            , e = Oe(s, Fi);
        return t || e
    },
    async load(s, t, e) {
        var h, l;
        const i = {
            ...ns.defaultOptions,
            resolution: ((h = t.data) == null ? void 0 : h.resolution) || fr(s),
            alphaMode: ((l = t.data) == null ? void 0 : l.alphaMode) || await go(),
            ...t.data
        }
            , r = document.createElement("video")
            , n = {
                preload: i.autoLoad !== !1 ? "auto" : void 0,
                "webkit-playsinline": i.playsinline !== !1 ? "" : void 0,
                playsinline: i.playsinline !== !1 ? "" : void 0,
                muted: i.muted === !0 ? "" : void 0,
                loop: i.loop === !0 ? "" : void 0,
                autoplay: i.autoPlay !== !1 ? "" : void 0
            };
        Object.keys(n).forEach(c => {
            const u = n[c];
            u !== void 0 && r.setAttribute(c, u)
        }
        ),
            i.muted === !0 && (r.muted = !0),
            vd(r, s, i.crossorigin);
        const o = document.createElement("source");
        let a;
        if (i.mime)
            a = i.mime;
        else if (s.startsWith("data:"))
            a = s.slice(5, s.indexOf(";"));
        else if (!s.startsWith("blob:")) {
            const c = s.split("?")[0].slice(s.lastIndexOf(".") + 1).toLowerCase();
            a = ns.MIME_TYPES[c] || `video/${c}`
        }
        return o.src = s,
            a && (o.type = a),
            new Promise(c => {
                const u = async () => {
                    const f = new ns({
                        ...i,
                        resource: r
                    });
                    r.removeEventListener("canplay", u),
                        t.data.preload && await Cd(r),
                        c(pr(f, e, s))
                }
                    ;
                i.preload && !i.autoPlay && r.load(),
                    r.addEventListener("canplay", u),
                    r.appendChild(o)
            }
            )
    },
    unload(s) {
        s.destroy(!0)
    }
}
    , pa = {
        extension: {
            type: B.ResolveParser,
            name: "resolveTexture"
        },
        test: fa.test,
        parse: s => {
            var t;
            return {
                resolution: parseFloat(((t = Le.RETINA_PREFIX.exec(s)) == null ? void 0 : t[1]) ?? "1"),
                format: s.split(".").pop(),
                src: s
            }
        }
    }
    , kd = {
        extension: {
            type: B.ResolveParser,
            priority: -2,
            name: "resolveJson"
        },
        test: s => Le.RETINA_PREFIX.test(s) && s.endsWith(".json"),
        parse: pa.parse
    };
class Ed {
    constructor() {
        this._detections = [],
            this._initialized = !1,
            this.resolver = new Le,
            this.loader = new Zu,
            this.cache = j,
            this._backgroundLoader = new Hu(this.loader),
            this._backgroundLoader.active = !0,
            this.reset()
    }
    async init(t = {}) {
        var n, o;
        if (this._initialized) {
            q("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
            return
        }
        if (this._initialized = !0,
            t.defaultSearchParams && this.resolver.setDefaultSearchParams(t.defaultSearchParams),
            t.basePath && (this.resolver.basePath = t.basePath),
            t.bundleIdentifier && this.resolver.setBundleIdentifier(t.bundleIdentifier),
            t.manifest) {
            let a = t.manifest;
            typeof a == "string" && (a = await this.load(a)),
                this.resolver.addManifest(a)
        }
        const e = ((n = t.texturePreference) == null ? void 0 : n.resolution) ?? 1
            , i = typeof e == "number" ? [e] : e
            , r = await this._detectFormats({
                preferredFormats: (o = t.texturePreference) == null ? void 0 : o.format,
                skipDetections: t.skipDetections,
                detections: this._detections
            });
        this.resolver.prefer({
            params: {
                format: r,
                resolution: i
            }
        }),
            t.preferences && this.setPreferences(t.preferences),
            t.loadOptions && (this.loader.loadOptions = {
                ...this.loader.loadOptions,
                ...t.loadOptions
            })
    }
    add(t) {
        this.resolver.add(t)
    }
    async load(t, e) {
        this._initialized || await this.init();
        const i = Vs(t)
            , r = Bt(t).map(a => {
                if (typeof a != "string") {
                    const h = this.resolver.getAlias(a);
                    return h.some(l => !this.resolver.hasKey(l)) && this.add(a),
                        Array.isArray(h) ? h[0] : h
                }
                return this.resolver.hasKey(a) || this.add({
                    alias: a,
                    src: a
                }),
                    a
            }
            )
            , n = this.resolver.resolve(r)
            , o = await this._mapLoadToResolve(n, e);
        return i ? o[r[0]] : o
    }
    addBundle(t, e) {
        this.resolver.addBundle(t, e)
    }
    async loadBundle(t, e) {
        this._initialized || await this.init();
        let i = !1;
        typeof t == "string" && (i = !0,
            t = [t]);
        const r = this.resolver.resolveBundle(t)
            , n = {}
            , o = Object.keys(r);
        let a = 0;
        const h = []
            , l = () => {
                e == null || e(h.reduce((u, f) => u + f, 0) / a)
            }
            , c = o.map((u, f) => {
                const d = r[u]
                    , m = Object.values(d)
                    , p = [...new Set(m.flat())].reduce((_, x) => _ + (x.progressSize || 1), 0);
                return h.push(0),
                    a += p,
                    this._mapLoadToResolve(d, _ => {
                        h[f] = _ * p,
                            l()
                    }
                    ).then(_ => {
                        n[u] = _
                    }
                    )
            }
            );
        return await Promise.all(c),
            i ? n[t[0]] : n
    }
    async backgroundLoad(t) {
        this._initialized || await this.init(),
            typeof t == "string" && (t = [t]);
        const e = this.resolver.resolve(t);
        this._backgroundLoader.add(Object.values(e))
    }
    async backgroundLoadBundle(t) {
        this._initialized || await this.init(),
            typeof t == "string" && (t = [t]);
        const e = this.resolver.resolveBundle(t);
        Object.values(e).forEach(i => {
            this._backgroundLoader.add(Object.values(i))
        }
        )
    }
    reset() {
        this.resolver.reset(),
            this.loader.reset(),
            this.cache.reset(),
            this._initialized = !1
    }
    get(t) {
        if (typeof t == "string")
            return j.get(t);
        const e = {};
        for (let i = 0; i < t.length; i++)
            e[i] = j.get(t[i]);
        return e
    }
    async _mapLoadToResolve(t, e) {
        const i = [...new Set(Object.values(t))];
        this._backgroundLoader.active = !1;
        const r = await this.loader.load(i, e);
        this._backgroundLoader.active = !0;
        const n = {};
        return i.forEach(o => {
            const a = r[o.src]
                , h = [o.src];
            o.alias && h.push(...o.alias),
                h.forEach(l => {
                    n[l] = a
                }
                ),
                j.set(h, a)
        }
        ),
            n
    }
    async unload(t) {
        this._initialized || await this.init();
        const e = Bt(t).map(r => typeof r != "string" ? r.src : r)
            , i = this.resolver.resolve(e);
        await this._unloadFromResolved(i)
    }
    async unloadBundle(t) {
        this._initialized || await this.init(),
            t = Bt(t);
        const e = this.resolver.resolveBundle(t)
            , i = Object.keys(e).map(r => this._unloadFromResolved(e[r]));
        await Promise.all(i)
    }
    async _unloadFromResolved(t) {
        const e = Object.values(t);
        e.forEach(i => {
            j.remove(i.src)
        }
        ),
            await this.loader.unload(e)
    }
    async _detectFormats(t) {
        let e = [];
        t.preferredFormats && (e = Array.isArray(t.preferredFormats) ? t.preferredFormats : [t.preferredFormats]);
        for (const i of t.detections)
            t.skipDetections || await i.test() ? e = await i.add(e) : t.skipDetections || (e = await i.remove(e));
        return e = e.filter((i, r) => e.indexOf(i) === r),
            e
    }
    get detections() {
        return this._detections
    }
    setPreferences(t) {
        this.loader.parsers.forEach(e => {
            e.config && Object.keys(e.config).filter(i => i in t).forEach(i => {
                e.config[i] = t[i]
            }
            )
        }
        )
    }
}
const et = new Ed;
lt.handleByList(B.LoadParser, et.loader.parsers).handleByList(B.ResolveParser, et.resolver.parsers).handleByList(B.CacheParser, et.cache.parsers).handleByList(B.DetectionParser, et.detections);
lt.add(Nu, $u, Vu, Ku, Xu, ju, qu, td, id, ud, pd, fa, Md, zu, Du, pa, kd);
const Ln = {
    loader: B.LoadParser,
    resolver: B.ResolveParser,
    cache: B.CacheParser,
    detection: B.DetectionParser
};
lt.handle(B.Asset, s => {
    const t = s.ref;
    Object.entries(Ln).filter(([e]) => !!t[e]).forEach(([e, i]) => lt.add(Object.assign(t[e], {
        extension: t[e].extension ?? i
    })))
}
    , s => {
        const t = s.ref;
        Object.keys(Ln).filter(e => !!t[e]).forEach(e => lt.remove(t[e]))
    }
);
class qs extends Js {
    constructor(t) {
        t instanceof Mt && (t = {
            context: t
        });
        const { context: e, roundPixels: i, ...r } = t || {};
        super({
            label: "Graphics",
            ...r
        }),
            this.renderPipeId = "graphics",
            e ? this.context = e : (this.context = this._ownedContext = new Mt,
                this.context.autoGarbageCollect = this.autoGarbageCollect),
            this.didViewUpdate = !0,
            this.allowChildren = !1,
            this.roundPixels = i ?? !1
    }
    set context(t) {
        t !== this._context && (this._context && (this._context.off("update", this.onViewUpdate, this),
            this._context.off("unload", this.unload, this)),
            this._context = t,
            this._context.on("update", this.onViewUpdate, this),
            this._context.on("unload", this.unload, this),
            this.onViewUpdate())
    }
    get context() {
        return this._context
    }
    get bounds() {
        return this._context.bounds
    }
    updateBounds() { }
    containsPoint(t) {
        return this._context.containsPoint(t)
    }
    destroy(t) {
        this._ownedContext && !t ? this._ownedContext.destroy(t) : (t === !0 || (t == null ? void 0 : t.context) === !0) && this._context.destroy(t),
            this._ownedContext = null,
            this._context = null,
            super.destroy(t)
    }
    _onTouch(t) {
        this._gcLastUsed = t,
            this._context._gcLastUsed = t
    }
    _callContextMethod(t, e) {
        return this.context[t](...e),
            this
    }
    setFillStyle(...t) {
        return this._callContextMethod("setFillStyle", t)
    }
    setStrokeStyle(...t) {
        return this._callContextMethod("setStrokeStyle", t)
    }
    fill(...t) {
        return this._callContextMethod("fill", t)
    }
    stroke(...t) {
        return this._callContextMethod("stroke", t)
    }
    texture(...t) {
        return this._callContextMethod("texture", t)
    }
    beginPath() {
        return this._callContextMethod("beginPath", [])
    }
    cut() {
        return this._callContextMethod("cut", [])
    }
    arc(...t) {
        return this._callContextMethod("arc", t)
    }
    arcTo(...t) {
        return this._callContextMethod("arcTo", t)
    }
    arcToSvg(...t) {
        return this._callContextMethod("arcToSvg", t)
    }
    bezierCurveTo(...t) {
        return this._callContextMethod("bezierCurveTo", t)
    }
    closePath() {
        return this._callContextMethod("closePath", [])
    }
    ellipse(...t) {
        return this._callContextMethod("ellipse", t)
    }
    circle(...t) {
        return this._callContextMethod("circle", t)
    }
    path(...t) {
        return this._callContextMethod("path", t)
    }
    lineTo(...t) {
        return this._callContextMethod("lineTo", t)
    }
    moveTo(...t) {
        return this._callContextMethod("moveTo", t)
    }
    quadraticCurveTo(...t) {
        return this._callContextMethod("quadraticCurveTo", t)
    }
    rect(...t) {
        return this._callContextMethod("rect", t)
    }
    roundRect(...t) {
        return this._callContextMethod("roundRect", t)
    }
    poly(...t) {
        return this._callContextMethod("poly", t)
    }
    regularPoly(...t) {
        return this._callContextMethod("regularPoly", t)
    }
    roundPoly(...t) {
        return this._callContextMethod("roundPoly", t)
    }
    roundShape(...t) {
        return this._callContextMethod("roundShape", t)
    }
    filletRect(...t) {
        return this._callContextMethod("filletRect", t)
    }
    chamferRect(...t) {
        return this._callContextMethod("chamferRect", t)
    }
    star(...t) {
        return this._callContextMethod("star", t)
    }
    svg(...t) {
        return this._callContextMethod("svg", t)
    }
    restore(...t) {
        return this._callContextMethod("restore", t)
    }
    save() {
        return this._callContextMethod("save", [])
    }
    getTransform() {
        return this.context.getTransform()
    }
    resetTransform() {
        return this._callContextMethod("resetTransform", [])
    }
    rotateTransform(...t) {
        return this._callContextMethod("rotate", t)
    }
    scaleTransform(...t) {
        return this._callContextMethod("scale", t)
    }
    setTransform(...t) {
        return this._callContextMethod("setTransform", t)
    }
    transform(...t) {
        return this._callContextMethod("transform", t)
    }
    translateTransform(...t) {
        return this._callContextMethod("translate", t)
    }
    clear() {
        return this._callContextMethod("clear", [])
    }
    get fillStyle() {
        return this._context.fillStyle
    }
    set fillStyle(t) {
        this._context.fillStyle = t
    }
    get strokeStyle() {
        return this._context.strokeStyle
    }
    set strokeStyle(t) {
        this._context.strokeStyle = t
    }
    clone(t = !1) {
        return t ? new qs(this._context.clone()) : (this._ownedContext = null,
            new qs(this._context))
    }
    lineStyle(t, e, i) {
        U(V, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
        const r = {};
        return t && (r.width = t),
            e && (r.color = e),
            i && (r.alpha = i),
            this.context.strokeStyle = r,
            this
    }
    beginFill(t, e) {
        U(V, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
        const i = {};
        return t !== void 0 && (i.color = t),
            e !== void 0 && (i.alpha = e),
            this.context.fillStyle = i,
            this
    }
    endFill() {
        U(V, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),
            this.context.fill();
        const t = this.context.strokeStyle;
        return (t.width !== Mt.defaultStrokeStyle.width || t.color !== Mt.defaultStrokeStyle.color || t.alpha !== Mt.defaultStrokeStyle.alpha) && this.context.stroke(),
            this
    }
    drawCircle(...t) {
        return U(V, "Graphics#drawCircle has been renamed to Graphics#circle"),
            this._callContextMethod("circle", t)
    }
    drawEllipse(...t) {
        return U(V, "Graphics#drawEllipse has been renamed to Graphics#ellipse"),
            this._callContextMethod("ellipse", t)
    }
    drawPolygon(...t) {
        return U(V, "Graphics#drawPolygon has been renamed to Graphics#poly"),
            this._callContextMethod("poly", t)
    }
    drawRect(...t) {
        return U(V, "Graphics#drawRect has been renamed to Graphics#rect"),
            this._callContextMethod("rect", t)
    }
    drawRoundedRect(...t) {
        return U(V, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),
            this._callContextMethod("roundRect", t)
    }
    drawStar(...t) {
        return U(V, "Graphics#drawStar has been renamed to Graphics#star"),
            this._callContextMethod("star", t)
    }
}
const ma = class ga extends Xo {
    constructor(...t) {
        let e = t[0] ?? {};
        e instanceof Float32Array && (U(V, "use new MeshGeometry({ positions, uvs, indices }) instead"),
            e = {
                positions: e,
                uvs: t[1],
                indices: t[2]
            }),
            e = {
                ...ga.defaultOptions,
                ...e
            };
        const i = e.positions || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
        let r = e.uvs;
        r || (e.positions ? r = new Float32Array(i.length) : r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]));
        const n = e.indices || new Uint32Array([0, 1, 2, 0, 2, 3])
            , o = e.shrinkBuffersToFit
            , a = new re({
                data: i,
                label: "attribute-mesh-positions",
                shrinkToFit: o,
                usage: st.VERTEX | st.COPY_DST
            })
            , h = new re({
                data: r,
                label: "attribute-mesh-uvs",
                shrinkToFit: o,
                usage: st.VERTEX | st.COPY_DST
            })
            , l = new re({
                data: n,
                label: "index-mesh-buffer",
                shrinkToFit: o,
                usage: st.INDEX | st.COPY_DST
            });
        super({
            attributes: {
                aPosition: {
                    buffer: a,
                    format: "float32x2",
                    stride: 8,
                    offset: 0
                },
                aUV: {
                    buffer: h,
                    format: "float32x2",
                    stride: 8,
                    offset: 0
                }
            },
            indexBuffer: l,
            topology: e.topology
        }),
            this.batchMode = "auto"
    }
    get positions() {
        return this.attributes.aPosition.buffer.data
    }
    set positions(t) {
        this.attributes.aPosition.buffer.data = t
    }
    get uvs() {
        return this.attributes.aUV.buffer.data
    }
    set uvs(t) {
        this.attributes.aUV.buffer.data = t
    }
    get indices() {
        return this.indexBuffer.data
    }
    set indices(t) {
        this.indexBuffer.data = t
    }
}
    ;
ma.defaultOptions = {
    topology: "triangle-list",
    shrinkBuffersToFit: !1
};
let Id = ma;
class ps extends ot {
    constructor(...t) {
        let e = t[0];
        Array.isArray(t[0]) && (e = {
            textures: t[0],
            autoUpdate: t[1]
        });
        const { animationSpeed: i = 1, autoPlay: r = !1, autoUpdate: n = !0, loop: o = !0, onComplete: a = null, onFrameChange: h = null, onLoop: l = null, textures: c, updateAnchor: u = !1, ...f } = e
            , [d] = c;
        super({
            ...f,
            texture: d instanceof W ? d : d.texture
        }),
            this._textures = null,
            this._durations = null,
            this._autoUpdate = n,
            this._isConnectedToTicker = !1,
            this.animationSpeed = i,
            this.loop = o,
            this.updateAnchor = u,
            this.onComplete = a,
            this.onFrameChange = h,
            this.onLoop = l,
            this._currentTime = 0,
            this._playing = !1,
            this._previousFrame = null,
            this.textures = c,
            r && this.play()
    }
    stop() {
        this._playing && (this._playing = !1,
            this._autoUpdate && this._isConnectedToTicker && (At.shared.remove(this.update, this),
                this._isConnectedToTicker = !1))
    }
    play() {
        this._playing || (this._playing = !0,
            this._autoUpdate && !this._isConnectedToTicker && (At.shared.add(this.update, this, Ns.HIGH),
                this._isConnectedToTicker = !0))
    }
    gotoAndStop(t) {
        this.stop(),
            this.currentFrame = t
    }
    gotoAndPlay(t) {
        this.currentFrame = t,
            this.play()
    }
    update(t) {
        if (!this._playing)
            return;
        const e = t.deltaTime
            , i = this.animationSpeed * e
            , r = this.currentFrame;
        if (this._durations !== null) {
            let n = this._currentTime % 1 * this._durations[this.currentFrame];
            for (n += i / 60 * 1e3; n < 0;)
                this._currentTime--,
                    n += this._durations[this.currentFrame];
            const o = Math.sign(this.animationSpeed * e);
            for (this._currentTime = Math.floor(this._currentTime); n >= this._durations[this.currentFrame];)
                n -= this._durations[this.currentFrame] * o,
                    this._currentTime += o;
            this._currentTime += n / this._durations[this.currentFrame]
        } else
            this._currentTime += i;
        this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0),
            this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1),
                this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < r || this.animationSpeed < 0 && this.currentFrame > r) && this.onLoop(),
                    this._updateTexture())
    }
    _updateTexture() {
        const t = this.currentFrame;
        this._previousFrame !== t && (this._previousFrame = t,
            this.texture = this._textures[t],
            this.updateAnchor && this.texture.defaultAnchor && this.anchor.copyFrom(this.texture.defaultAnchor),
            this.onFrameChange && this.onFrameChange(this.currentFrame))
    }
    destroy(t = !1) {
        if (typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
            const i = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
            this._textures.forEach(r => {
                this.texture !== r && r.destroy(i)
            }
            )
        }
        this._textures = [],
            this._durations = null,
            this.stop(),
            super.destroy(t),
            this.onComplete = null,
            this.onFrameChange = null,
            this.onLoop = null
    }
    static fromFrames(t) {
        const e = [];
        for (let i = 0; i < t.length; ++i)
            e.push(W.from(t[i]));
        return new ps(e)
    }
    static fromImages(t) {
        const e = [];
        for (let i = 0; i < t.length; ++i)
            e.push(W.from(t[i]));
        return new ps(e)
    }
    get totalFrames() {
        return this._textures.length
    }
    get textures() {
        return this._textures
    }
    set textures(t) {
        if (t[0] instanceof W)
            this._textures = t,
                this._durations = null;
        else {
            this._textures = [],
                this._durations = [];
            for (let e = 0; e < t.length; e++)
                this._textures.push(t[e].texture),
                    this._durations.push(t[e].time)
        }
        this._previousFrame = null,
            this.gotoAndStop(0),
            this._updateTexture()
    }
    get currentFrame() {
        let t = Math.floor(this._currentTime) % this._textures.length;
        return t < 0 && (t += this._textures.length),
            t
    }
    set currentFrame(t) {
        if (t < 0 || t > this.totalFrames - 1)
            throw new Error(`[AnimatedSprite]: Invalid frame index value ${t}, expected to be between 0 and totalFrames ${this.totalFrames}.`);
        const e = this.currentFrame;
        this._currentTime = t,
            e !== this.currentFrame && this._updateTexture()
    }
    get playing() {
        return this._playing
    }
    get autoUpdate() {
        return this._autoUpdate
    }
    set autoUpdate(t) {
        t !== this._autoUpdate && (this._autoUpdate = t,
            !this._autoUpdate && this._isConnectedToTicker ? (At.shared.remove(this.update, this),
                this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (At.shared.add(this.update, this),
                    this._isConnectedToTicker = !0))
    }
}
class Bd extends Js {
    constructor(t, e) {
        const { text: i, resolution: r, style: n, anchor: o, width: a, height: h, roundPixels: l, ...c } = t;
        super({
            ...c
        }),
            this.batched = !0,
            this._resolution = null,
            this._autoResolution = !0,
            this._didTextUpdate = !0,
            this._styleClass = e,
            this.text = i ?? "",
            this.style = n,
            this.resolution = r ?? null,
            this.allowChildren = !1,
            this._anchor = new at({
                _onUpdate: () => {
                    this.onViewUpdate()
                }
            }),
            o && (this.anchor = o),
            this.roundPixels = l ?? !1,
            a !== void 0 && (this.width = a),
            h !== void 0 && (this.height = h)
    }
    get anchor() {
        return this._anchor
    }
    set anchor(t) {
        typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t)
    }
    set text(t) {
        t = t.toString(),
            this._text !== t && (this._text = t,
                this.onViewUpdate())
    }
    get text() {
        return this._text
    }
    set resolution(t) {
        this._autoResolution = t === null,
            this._resolution = t,
            this.onViewUpdate()
    }
    get resolution() {
        return this._resolution
    }
    get style() {
        return this._style
    }
    set style(t) {
        var e;
        t || (t = {}),
            (e = this._style) == null || e.off("update", this.onViewUpdate, this),
            t instanceof this._styleClass ? this._style = t : this._style = new this._styleClass(t),
            this._style.on("update", this.onViewUpdate, this),
            this.onViewUpdate()
    }
    get width() {
        return Math.abs(this.scale.x) * this.bounds.width
    }
    set width(t) {
        this._setWidth(t, this.bounds.width)
    }
    get height() {
        return Math.abs(this.scale.y) * this.bounds.height
    }
    set height(t) {
        this._setHeight(t, this.bounds.height)
    }
    getSize(t) {
        return t || (t = {}),
            t.width = Math.abs(this.scale.x) * this.bounds.width,
            t.height = Math.abs(this.scale.y) * this.bounds.height,
            t
    }
    setSize(t, e) {
        typeof t == "object" ? (e = t.height ?? t.width,
            t = t.width) : e ?? (e = t),
            t !== void 0 && this._setWidth(t, this.bounds.width),
            e !== void 0 && this._setHeight(e, this.bounds.height)
    }
    containsPoint(t) {
        const e = this.bounds.width
            , i = this.bounds.height
            , r = -e * this.anchor.x;
        let n = 0;
        return t.x >= r && t.x <= r + e && (n = -i * this.anchor.y,
            t.y >= n && t.y <= n + i)
    }
    onViewUpdate() {
        this.didViewUpdate || (this._didTextUpdate = !0),
            super.onViewUpdate()
    }
    destroy(t = !1) {
        super.destroy(t),
            this.owner = null,
            this._bounds = null,
            this._anchor = null,
            (typeof t == "boolean" ? t : t != null && t.style) && this._style.destroy(t),
            this._style = null,
            this._text = null
    }
    get styleKey() {
        return `${this._text}:${this._style.styleKey}:${this._resolution}`
    }
}
function Fd(s, t) {
    let e = s[0] ?? {};
    return (typeof e == "string" || s[1]) && (U(V, `use new ${t}({ text: "hi!", style }) instead`),
        e = {
            text: e,
            style: s[1]
        }),
        e
}
let ce = null
    , Kt = null;
function Rd(s, t) {
    ce || (ce = X.get().createCanvas(256, 128),
        Kt = ce.getContext("2d", {
            willReadFrequently: !0
        }),
        Kt.globalCompositeOperation = "copy",
        Kt.globalAlpha = 1),
        (ce.width < s || ce.height < t) && (ce.width = Ie(s),
            ce.height = Ie(t))
}
function Gn(s, t, e) {
    for (let i = 0, r = 4 * e * t; i < t; ++i,
        r += 4)
        if (s[r + 3] !== 0)
            return !1;
    return !0
}
function On(s, t, e, i, r) {
    const n = 4 * t;
    for (let o = i, a = i * n + 4 * e; o <= r; ++o,
        a += n)
        if (s[a + 3] !== 0)
            return !1;
    return !0
}
function Ld(...s) {
    let t = s[0];
    t.canvas || (t = {
        canvas: s[0],
        resolution: s[1]
    });
    const { canvas: e } = t
        , i = Math.min(t.resolution ?? 1, 1)
        , r = t.width ?? e.width
        , n = t.height ?? e.height;
    let o = t.output;
    if (Rd(r, n),
        !Kt)
        throw new TypeError("Failed to get canvas 2D context");
    Kt.drawImage(e, 0, 0, r, n, 0, 0, r * i, n * i);
    const h = Kt.getImageData(0, 0, r, n).data;
    let l = 0
        , c = 0
        , u = r - 1
        , f = n - 1;
    for (; c < n && Gn(h, r, c);)
        ++c;
    if (c === n)
        return K.EMPTY;
    for (; Gn(h, r, f);)
        --f;
    for (; On(h, r, l, c, f);)
        ++l;
    for (; On(h, r, u, c, f);)
        --u;
    return ++u,
        ++f,
        Kt.globalCompositeOperation = "source-over",
        Kt.strokeRect(l, c, u - l, f - c),
        Kt.globalCompositeOperation = "copy",
        o ?? (o = new K),
        o.set(l / i, c / i, (u - l) / i, (f - c) / i),
        o
}
const Wn = new K;
class Gd {
    getCanvasAndContext(t) {
        const { text: e, style: i, resolution: r = 1 } = t
            , n = i._getFinalPadding()
            , o = Ht.measureText(e || " ", i)
            , a = Math.ceil(Math.ceil(Math.max(1, o.width) + n * 2) * r)
            , h = Math.ceil(Math.ceil(Math.max(1, o.height) + n * 2) * r)
            , l = fs.getOptimalCanvasAndContext(a, h);
        this._renderTextToCanvas(e, i, n, r, l);
        const c = i.trim ? Ld({
            canvas: l.canvas,
            width: a,
            height: h,
            resolution: 1,
            output: Wn
        }) : Wn.set(0, 0, a, h);
        return {
            canvasAndContext: l,
            frame: c
        }
    }
    returnCanvasAndContext(t) {
        fs.returnCanvasAndContext(t)
    }
    _renderTextToCanvas(t, e, i, r, n) {
        var y, b, S, A;
        const { canvas: o, context: a } = n
            , h = $s(e)
            , l = Ht.measureText(t || " ", e)
            , c = l.lines
            , u = l.lineHeight
            , f = l.lineWidths
            , d = l.maxLineWidth
            , m = l.fontProperties
            , g = o.height;
        if (a.resetTransform(),
            a.scale(r, r),
            a.textBaseline = e.textBaseline,
            (y = e._stroke) != null && y.width) {
            const w = e._stroke;
            a.lineWidth = w.width,
                a.miterLimit = w.miterLimit,
                a.lineJoin = w.join,
                a.lineCap = w.cap
        }
        a.font = h;
        let p, _;
        const x = e.dropShadow ? 2 : 1;
        for (let w = 0; w < x; ++w) {
            const L = e.dropShadow && w === 0
                , k = L ? Math.ceil(Math.max(1, g) + i * 2) : 0
                , C = k * r;
            if (L) {
                a.fillStyle = "black",
                    a.strokeStyle = "black";
                const G = e.dropShadow
                    , $ = G.color
                    , Gt = G.alpha;
                a.shadowColor = it.shared.setValue($).setAlpha(Gt).toRgbaString();
                const T = G.blur * r
                    , F = G.distance * r;
                a.shadowBlur = T,
                    a.shadowOffsetX = Math.cos(G.angle) * F,
                    a.shadowOffsetY = Math.sin(G.angle) * F + C
            } else {
                if (a.fillStyle = e._fill ? js(e._fill, a, l, i * 2) : null,
                    (b = e._stroke) != null && b.width) {
                    const G = e._stroke.width * .5 + i * 2;
                    a.strokeStyle = js(e._stroke, a, l, G)
                }
                a.shadowColor = "black"
            }
            let P = (u - m.fontSize) / 2;
            u - m.fontSize < 0 && (P = 0);
            const z = ((S = e._stroke) == null ? void 0 : S.width) ?? 0;
            for (let G = 0; G < c.length; G++)
                p = z / 2,
                    _ = z / 2 + G * u + m.ascent + P,
                    e.align === "right" ? p += d - f[G] : e.align === "center" && (p += (d - f[G]) / 2),
                    (A = e._stroke) != null && A.width && this._drawLetterSpacing(c[G], e, n, p + i, _ + i - k, !0),
                    e._fill !== void 0 && this._drawLetterSpacing(c[G], e, n, p + i, _ + i - k)
        }
    }
    _drawLetterSpacing(t, e, i, r, n, o = !1) {
        const { context: a } = i
            , h = e.letterSpacing;
        let l = !1;
        if (Ht.experimentalLetterSpacingSupported && (Ht.experimentalLetterSpacing ? (a.letterSpacing = `${h}px`,
            a.textLetterSpacing = `${h}px`,
            l = !0) : (a.letterSpacing = "0px",
                a.textLetterSpacing = "0px")),
            h === 0 || l) {
            o ? a.strokeText(t, r, n) : a.fillText(t, r, n);
            return
        }
        let c = r;
        const u = Ht.graphemeSegmenter(t);
        let f = a.measureText(t).width
            , d = 0;
        for (let m = 0; m < u.length; ++m) {
            const g = u[m];
            o ? a.strokeText(g, c, n) : a.fillText(g, c, n);
            let p = "";
            for (let _ = m + 1; _ < u.length; ++_)
                p += u[_];
            d = a.measureText(p).width,
                c += f - d + h,
                f = d
        }
    }
}
const Un = new Gd;
class se extends Bd {
    constructor(...t) {
        const e = Fd(t, "Text");
        super(e, Tt),
            this.renderPipeId = "text",
            e.textureStyle && (this.textureStyle = e.textureStyle instanceof Be ? e.textureStyle : new Be(e.textureStyle))
    }
    updateBounds() {
        const t = this._bounds
            , e = this._anchor;
        let i = 0
            , r = 0;
        if (this._style.trim) {
            const { frame: n, canvasAndContext: o } = Un.getCanvasAndContext({
                text: this.text,
                style: this._style,
                resolution: 1
            });
            Un.returnCanvasAndContext(o),
                i = n.width,
                r = n.height
        } else {
            const n = Ht.measureText(this._text, this._style);
            i = n.width,
                r = n.height
        }
        t.minX = -e._x * i,
            t.maxX = t.minX + i,
            t.minY = -e._y * r,
            t.maxY = t.minY + r
    }
}
const _a = class xa extends Id {
    constructor(...t) {
        super({});
        let e = t[0] ?? {};
        typeof e == "number" && (U(V, "PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),
            e = {
                width: e,
                height: t[1],
                verticesX: t[2],
                verticesY: t[3]
            }),
            this.build(e)
    }
    build(t) {
        t = {
            ...xa.defaultOptions,
            ...t
        },
            this.verticesX = this.verticesX ?? t.verticesX,
            this.verticesY = this.verticesY ?? t.verticesY,
            this.width = this.width ?? t.width,
            this.height = this.height ?? t.height;
        const e = this.verticesX * this.verticesY
            , i = []
            , r = []
            , n = []
            , o = this.verticesX - 1
            , a = this.verticesY - 1
            , h = this.width / o
            , l = this.height / a;
        for (let u = 0; u < e; u++) {
            const f = u % this.verticesX
                , d = u / this.verticesX | 0;
            i.push(f * h, d * l),
                r.push(f / o, d / a)
        }
        const c = o * a;
        for (let u = 0; u < c; u++) {
            const f = u % o
                , d = u / o | 0
                , m = d * this.verticesX + f
                , g = d * this.verticesX + f + 1
                , p = (d + 1) * this.verticesX + f
                , _ = (d + 1) * this.verticesX + f + 1;
            n.push(m, g, p, g, _, p)
        }
        this.buffers[0].data = new Float32Array(i),
            this.buffers[1].data = new Float32Array(r),
            this.indexBuffer.data = new Uint32Array(n),
            this.buffers[0].update(),
            this.buffers[1].update(),
            this.indexBuffer.update()
    }
}
    ;
_a.defaultOptions = {
    width: 100,
    height: 100,
    verticesX: 10,
    verticesY: 10
};
let Od = _a;
const ya = class ba extends Od {
    constructor(t = {}) {
        t = {
            ...ba.defaultOptions,
            ...t
        },
            super({
                width: t.width,
                height: t.height,
                verticesX: 4,
                verticesY: 4
            }),
            this.update(t)
    }
    update(t) {
        var e, i;
        this.width = t.width ?? this.width,
            this.height = t.height ?? this.height,
            this._originalWidth = t.originalWidth ?? this._originalWidth,
            this._originalHeight = t.originalHeight ?? this._originalHeight,
            this._leftWidth = t.leftWidth ?? this._leftWidth,
            this._rightWidth = t.rightWidth ?? this._rightWidth,
            this._topHeight = t.topHeight ?? this._topHeight,
            this._bottomHeight = t.bottomHeight ?? this._bottomHeight,
            this._anchorX = (e = t.anchor) == null ? void 0 : e.x,
            this._anchorY = (i = t.anchor) == null ? void 0 : i.y,
            this.updateUvs(),
            this.updatePositions()
    }
    updatePositions() {
        const t = this.positions
            , { width: e, height: i, _leftWidth: r, _rightWidth: n, _topHeight: o, _bottomHeight: a, _anchorX: h, _anchorY: l } = this
            , c = r + n
            , u = e > c ? 1 : e / c
            , f = o + a
            , d = i > f ? 1 : i / f
            , m = Math.min(u, d)
            , g = h * e
            , p = l * i;
        t[0] = t[8] = t[16] = t[24] = -g,
            t[2] = t[10] = t[18] = t[26] = r * m - g,
            t[4] = t[12] = t[20] = t[28] = e - n * m - g,
            t[6] = t[14] = t[22] = t[30] = e - g,
            t[1] = t[3] = t[5] = t[7] = -p,
            t[9] = t[11] = t[13] = t[15] = o * m - p,
            t[17] = t[19] = t[21] = t[23] = i - a * m - p,
            t[25] = t[27] = t[29] = t[31] = i - p,
            this.getBuffer("aPosition").update()
    }
    updateUvs() {
        const t = this.uvs;
        t[0] = t[8] = t[16] = t[24] = 0,
            t[1] = t[3] = t[5] = t[7] = 0,
            t[6] = t[14] = t[22] = t[30] = 1,
            t[25] = t[27] = t[29] = t[31] = 1;
        const e = 1 / this._originalWidth
            , i = 1 / this._originalHeight;
        t[2] = t[10] = t[18] = t[26] = e * this._leftWidth,
            t[9] = t[11] = t[13] = t[15] = i * this._topHeight,
            t[4] = t[12] = t[20] = t[28] = 1 - e * this._rightWidth,
            t[17] = t[19] = t[21] = t[23] = 1 - i * this._bottomHeight,
            this.getBuffer("aUV").update()
    }
}
    ;
ya.defaultOptions = {
    width: 100,
    height: 100,
    leftWidth: 10,
    topHeight: 10,
    rightWidth: 10,
    bottomHeight: 10,
    originalWidth: 100,
    originalHeight: 100
};
let Ce = ya;
const wa = class Aa extends Js {
    constructor(t) {
        var f, d, m, g;
        t instanceof W && (t = {
            texture: t
        });
        const { width: e, height: i, anchor: r, leftWidth: n, rightWidth: o, topHeight: a, bottomHeight: h, texture: l, roundPixels: c, ...u } = t;
        super({
            label: "NineSliceSprite",
            ...u
        }),
            this.renderPipeId = "nineSliceSprite",
            this.batched = !0,
            this._leftWidth = n ?? ((f = l == null ? void 0 : l.defaultBorders) == null ? void 0 : f.left) ?? Ce.defaultOptions.leftWidth,
            this._topHeight = a ?? ((d = l == null ? void 0 : l.defaultBorders) == null ? void 0 : d.top) ?? Ce.defaultOptions.topHeight,
            this._rightWidth = o ?? ((m = l == null ? void 0 : l.defaultBorders) == null ? void 0 : m.right) ?? Ce.defaultOptions.rightWidth,
            this._bottomHeight = h ?? ((g = l == null ? void 0 : l.defaultBorders) == null ? void 0 : g.bottom) ?? Ce.defaultOptions.bottomHeight,
            this._width = e ?? l.width ?? Ce.defaultOptions.width,
            this._height = i ?? l.height ?? Ce.defaultOptions.height,
            this.allowChildren = !1,
            this.texture = l ?? Aa.defaultOptions.texture,
            this.roundPixels = c ?? !1,
            this._anchor = new at({
                _onUpdate: () => {
                    this.onViewUpdate()
                }
            }),
            r ? this.anchor = r : this.texture.defaultAnchor && (this.anchor = this.texture.defaultAnchor)
    }
    get anchor() {
        return this._anchor
    }
    set anchor(t) {
        typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t)
    }
    get width() {
        return this._width
    }
    set width(t) {
        this._width = t,
            this.onViewUpdate()
    }
    get height() {
        return this._height
    }
    set height(t) {
        this._height = t,
            this.onViewUpdate()
    }
    setSize(t, e) {
        typeof t == "object" && (e = t.height ?? t.width,
            t = t.width),
            this._width = t,
            this._height = e ?? t,
            this.onViewUpdate()
    }
    getSize(t) {
        return t || (t = {}),
            t.width = this._width,
            t.height = this._height,
            t
    }
    get leftWidth() {
        return this._leftWidth
    }
    set leftWidth(t) {
        this._leftWidth = t,
            this.onViewUpdate()
    }
    get topHeight() {
        return this._topHeight
    }
    set topHeight(t) {
        this._topHeight = t,
            this.onViewUpdate()
    }
    get rightWidth() {
        return this._rightWidth
    }
    set rightWidth(t) {
        this._rightWidth = t,
            this.onViewUpdate()
    }
    get bottomHeight() {
        return this._bottomHeight
    }
    set bottomHeight(t) {
        this._bottomHeight = t,
            this.onViewUpdate()
    }
    get texture() {
        return this._texture
    }
    set texture(t) {
        t || (t = W.EMPTY);
        const e = this._texture;
        e !== t && (e && e.dynamic && e.off("update", this.onViewUpdate, this),
            t.dynamic && t.on("update", this.onViewUpdate, this),
            this._texture = t,
            this.onViewUpdate())
    }
    get originalWidth() {
        return this._texture.width
    }
    get originalHeight() {
        return this._texture.height
    }
    destroy(t) {
        if (super.destroy(t),
            typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
            const i = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
            this._texture.destroy(i)
        }
        this._texture = null
    }
    updateBounds() {
        const t = this._bounds
            , e = this._anchor
            , i = this._width
            , r = this._height;
        t.minX = -e._x * i,
            t.maxX = t.minX + i,
            t.minY = -e._y * r,
            t.maxY = t.minY + r
    }
}
    ;
wa.defaultOptions = {
    texture: W.EMPTY
};
let Wd = wa;
lt.add(Ha, Na);
let nt, Zt;
const Ud = typeof window < "u" && window.innerWidth ? window.innerWidth : 1280
    , Dd = Ud < 768;
nt = 1400,
    Zt = 2e3;
let Sa;
function zd(s) {
    return Sa = s,
        s
}
function ms() {
    return Sa
}
class Ji {
    static setParamValue(t, e) {
        if (t.setValueAtTime) {
            const i = ms().context;
            t.setValueAtTime(e, i.audioContext.currentTime)
        } else
            t.value = e;
        return e
    }
}
class Hd extends mt {
    constructor() {
        super(...arguments),
            this.speed = 1,
            this.muted = !1,
            this.volume = 1,
            this.paused = !1
    }
    refresh() {
        this.emit("refresh")
    }
    refreshPaused() {
        this.emit("refreshPaused")
    }
    get filters() {
        return console.warn("HTML Audio does not support filters"),
            null
    }
    set filters(t) {
        console.warn("HTML Audio does not support filters")
    }
    get audioContext() {
        return console.warn("HTML Audio does not support audioContext"),
            null
    }
    toggleMute() {
        return this.muted = !this.muted,
            this.refresh(),
            this.muted
    }
    togglePause() {
        return this.paused = !this.paused,
            this.refreshPaused(),
            this.paused
    }
    destroy() {
        this.removeAllListeners()
    }
}
let Nd = 0;
const tr = class extends mt {
    constructor(s) {
        super(),
            this.id = Nd++,
            this.init(s)
    }
    set(s, t) {
        if (this[s] === void 0)
            throw new Error(`Property with name ${s} does not exist.`);
        switch (s) {
            case "speed":
                this.speed = t;
                break;
            case "volume":
                this.volume = t;
                break;
            case "paused":
                this.paused = t;
                break;
            case "loop":
                this.loop = t;
                break;
            case "muted":
                this.muted = t;
                break
        }
        return this
    }
    get progress() {
        const { currentTime: s } = this._source;
        return s / this._duration
    }
    get paused() {
        return this._paused
    }
    set paused(s) {
        this._paused = s,
            this.refreshPaused()
    }
    _onPlay() {
        this._playing = !0
    }
    _onPause() {
        this._playing = !1
    }
    init(s) {
        this._playing = !1,
            this._duration = s.source.duration;
        const t = this._source = s.source.cloneNode(!1);
        t.src = s.parent.url,
            t.onplay = this._onPlay.bind(this),
            t.onpause = this._onPause.bind(this),
            s.context.on("refresh", this.refresh, this),
            s.context.on("refreshPaused", this.refreshPaused, this),
            this._media = s
    }
    _internalStop() {
        this._source && this._playing && (this._source.onended = null,
            this._source.pause())
    }
    stop() {
        this._internalStop(),
            this._source && this.emit("stop")
    }
    get speed() {
        return this._speed
    }
    set speed(s) {
        this._speed = s,
            this.refresh()
    }
    get volume() {
        return this._volume
    }
    set volume(s) {
        this._volume = s,
            this.refresh()
    }
    get loop() {
        return this._loop
    }
    set loop(s) {
        this._loop = s,
            this.refresh()
    }
    get muted() {
        return this._muted
    }
    set muted(s) {
        this._muted = s,
            this.refresh()
    }
    get filters() {
        return console.warn("HTML Audio does not support filters"),
            null
    }
    set filters(s) {
        console.warn("HTML Audio does not support filters")
    }
    refresh() {
        const s = this._media.context
            , t = this._media.parent;
        this._source.loop = this._loop || t.loop;
        const e = s.volume * (s.muted ? 0 : 1)
            , i = t.volume * (t.muted ? 0 : 1)
            , r = this._volume * (this._muted ? 0 : 1);
        this._source.volume = r * e * i,
            this._source.playbackRate = this._speed * s.speed * t.speed
    }
    refreshPaused() {
        const s = this._media.context
            , t = this._media.parent
            , e = this._paused || t.paused || s.paused;
        e !== this._pausedReal && (this._pausedReal = e,
            e ? (this._internalStop(),
                this.emit("paused")) : (this.emit("resumed"),
                    this.play({
                        start: this._source.currentTime,
                        end: this._end,
                        volume: this._volume,
                        speed: this._speed,
                        loop: this._loop
                    })),
            this.emit("pause", e))
    }
    play(s) {
        const { start: t, end: e, speed: i, loop: r, volume: n, muted: o } = s;
        e && console.assert(e > t, "End time is before start time"),
            this._speed = i,
            this._volume = n,
            this._loop = !!r,
            this._muted = o,
            this.refresh(),
            this.loop && e !== null && (console.warn('Looping not support when specifying an "end" time'),
                this.loop = !1),
            this._start = t,
            this._end = e || this._duration,
            this._start = Math.max(0, this._start - tr.PADDING),
            this._end = Math.min(this._end + tr.PADDING, this._duration),
            this._source.onloadedmetadata = () => {
                this._source && (this._source.currentTime = t,
                    this._source.onloadedmetadata = null,
                    this.emit("progress", t / this._duration, this._duration),
                    At.shared.add(this._onUpdate, this))
            }
            ,
            this._source.onended = this._onComplete.bind(this),
            this._source.play(),
            this.emit("start")
    }
    _onUpdate() {
        this.emit("progress", this.progress, this._duration),
            this._source.currentTime >= this._end && !this._source.loop && this._onComplete()
    }
    _onComplete() {
        At.shared.remove(this._onUpdate, this),
            this._internalStop(),
            this.emit("progress", 1, this._duration),
            this.emit("end", this)
    }
    destroy() {
        At.shared.remove(this._onUpdate, this),
            this.removeAllListeners();
        const s = this._source;
        s && (s.onended = null,
            s.onplay = null,
            s.onpause = null,
            this._internalStop()),
            this._source = null,
            this._speed = 1,
            this._volume = 1,
            this._loop = !1,
            this._end = null,
            this._start = 0,
            this._duration = 0,
            this._playing = !1,
            this._pausedReal = !1,
            this._paused = !1,
            this._muted = !1,
            this._media && (this._media.context.off("refresh", this.refresh, this),
                this._media.context.off("refreshPaused", this.refreshPaused, this),
                this._media = null)
    }
    toString() {
        return `[HTMLAudioInstance id=${this.id}]`
    }
}
    ;
let va = tr;
va.PADDING = .1;
class Vd extends mt {
    init(t) {
        this.parent = t,
            this._source = t.options.source || new Audio,
            t.url && (this._source.src = t.url)
    }
    create() {
        return new va(this)
    }
    get isPlayable() {
        return !!this._source && this._source.readyState === 4
    }
    get duration() {
        return this._source.duration
    }
    get context() {
        return this.parent.context
    }
    get filters() {
        return null
    }
    set filters(t) {
        console.warn("HTML Audio does not support filters")
    }
    destroy() {
        this.removeAllListeners(),
            this.parent = null,
            this._source && (this._source.src = "",
                this._source.load(),
                this._source = null)
    }
    get source() {
        return this._source
    }
    load(t) {
        const e = this._source
            , i = this.parent;
        if (e.readyState === 4) {
            i.isLoaded = !0;
            const h = i.autoPlayStart();
            t && setTimeout(() => {
                t(null, i, h)
            }
                , 0);
            return
        }
        if (!i.url) {
            t(new Error("sound.url or sound.source must be set"));
            return
        }
        e.src = i.url;
        const r = () => {
            a(),
                i.isLoaded = !0;
            const h = i.autoPlayStart();
            t && t(null, i, h)
        }
            , n = () => {
                a(),
                    t && t(new Error("Sound loading has been aborted"))
            }
            , o = () => {
                a();
                const h = `Failed to load audio element (code: ${e.error.code})`;
                t ? t(new Error(h)) : console.error(h)
            }
            , a = () => {
                e.removeEventListener("canplaythrough", r),
                    e.removeEventListener("load", r),
                    e.removeEventListener("abort", n),
                    e.removeEventListener("error", o)
            }
            ;
        e.addEventListener("canplaythrough", r, !1),
            e.addEventListener("load", r, !1),
            e.addEventListener("abort", n, !1),
            e.addEventListener("error", o, !1),
            e.load()
    }
}
class $d {
    constructor(t, e) {
        this.parent = t,
            Object.assign(this, e),
            this.duration = this.end - this.start,
            console.assert(this.duration > 0, "End time must be after start time")
    }
    play(t) {
        return this.parent.play({
            complete: t,
            speed: this.speed || this.parent.speed,
            end: this.end,
            start: this.start,
            loop: this.loop
        })
    }
    destroy() {
        this.parent = null
    }
}
const Ks = ["ogg", "oga", "opus", "m4a", "mp3", "mpeg", "wav", "aiff", "wma", "mid", "caf"]
    , Yd = ["audio/mpeg", "audio/ogg"]
    , Zs = {};
function Xd(s) {
    const t = {
        m4a: "audio/mp4",
        oga: "audio/ogg",
        opus: 'audio/ogg; codecs="opus"',
        caf: 'audio/x-caf; codecs="opus"'
    }
        , e = document.createElement("audio")
        , i = {}
        , r = /^no$/;
    Ks.forEach(n => {
        const o = e.canPlayType(`audio/${n}`).replace(r, "")
            , a = t[n] ? e.canPlayType(t[n]).replace(r, "") : "";
        i[n] = !!o || !!a
    }
    ),
        Object.assign(Zs, i)
}
Xd();
let jd = 0;
class qd extends mt {
    constructor(t) {
        super(),
            this.id = jd++,
            this._media = null,
            this._paused = !1,
            this._muted = !1,
            this._elapsed = 0,
            this.init(t)
    }
    set(t, e) {
        if (this[t] === void 0)
            throw new Error(`Property with name ${t} does not exist.`);
        switch (t) {
            case "speed":
                this.speed = e;
                break;
            case "volume":
                this.volume = e;
                break;
            case "muted":
                this.muted = e;
                break;
            case "loop":
                this.loop = e;
                break;
            case "paused":
                this.paused = e;
                break
        }
        return this
    }
    stop() {
        this._source && (this._internalStop(),
            this.emit("stop"))
    }
    get speed() {
        return this._speed
    }
    set speed(t) {
        this._speed = t,
            this.refresh(),
            this._update(!0)
    }
    get volume() {
        return this._volume
    }
    set volume(t) {
        this._volume = t,
            this.refresh()
    }
    get muted() {
        return this._muted
    }
    set muted(t) {
        this._muted = t,
            this.refresh()
    }
    get loop() {
        return this._loop
    }
    set loop(t) {
        this._loop = t,
            this.refresh()
    }
    get filters() {
        return this._filters
    }
    set filters(t) {
        var e;
        this._filters && ((e = this._filters) == null || e.filter(i => i).forEach(i => i.disconnect()),
            this._filters = null,
            this._source.connect(this._gain)),
            this._filters = t != null && t.length ? t.slice(0) : null,
            this.refresh()
    }
    refresh() {
        if (!this._source)
            return;
        const t = this._media.context
            , e = this._media.parent;
        this._source.loop = this._loop || e.loop;
        const i = t.volume * (t.muted ? 0 : 1)
            , r = e.volume * (e.muted ? 0 : 1)
            , n = this._volume * (this._muted ? 0 : 1);
        Ji.setParamValue(this._gain.gain, n * r * i),
            Ji.setParamValue(this._source.playbackRate, this._speed * e.speed * t.speed),
            this.applyFilters()
    }
    applyFilters() {
        var t;
        if ((t = this._filters) != null && t.length) {
            this._source.disconnect();
            let e = this._source;
            this._filters.forEach(i => {
                e.connect(i.destination),
                    e = i
            }
            ),
                e.connect(this._gain)
        }
    }
    refreshPaused() {
        const t = this._media.context
            , e = this._media.parent
            , i = this._paused || e.paused || t.paused;
        i !== this._pausedReal && (this._pausedReal = i,
            i ? (this._internalStop(),
                this.emit("paused")) : (this.emit("resumed"),
                    this.play({
                        start: this._elapsed % this._duration,
                        end: this._end,
                        speed: this._speed,
                        loop: this._loop,
                        volume: this._volume
                    })),
            this.emit("pause", i))
    }
    play(t) {
        const { start: e, end: i, speed: r, loop: n, volume: o, muted: a, filters: h } = t;
        i && console.assert(i > e, "End time is before start time"),
            this._paused = !1;
        const { source: l, gain: c } = this._media.nodes.cloneBufferSource();
        this._source = l,
            this._gain = c,
            this._speed = r,
            this._volume = o,
            this._loop = !!n,
            this._muted = a,
            this._filters = h,
            this.refresh();
        const u = this._source.buffer.duration;
        this._duration = u,
            this._end = i,
            this._lastUpdate = this._now(),
            this._elapsed = e,
            this._source.onended = this._onComplete.bind(this),
            this._loop ? (this._source.loopEnd = i,
                this._source.loopStart = e,
                this._source.start(0, e)) : i ? this._source.start(0, e, i - e) : this._source.start(0, e),
            this.emit("start"),
            this._update(!0),
            this.enableTicker(!0)
    }
    enableTicker(t) {
        At.shared.remove(this._updateListener, this),
            t && At.shared.add(this._updateListener, this)
    }
    get progress() {
        return this._progress
    }
    get paused() {
        return this._paused
    }
    set paused(t) {
        this._paused = t,
            this.refreshPaused()
    }
    destroy() {
        var t;
        this.removeAllListeners(),
            this._internalStop(),
            this._gain && (this._gain.disconnect(),
                this._gain = null),
            this._media && (this._media.context.events.off("refresh", this.refresh, this),
                this._media.context.events.off("refreshPaused", this.refreshPaused, this),
                this._media = null),
            (t = this._filters) == null || t.forEach(e => e.disconnect()),
            this._filters = null,
            this._end = null,
            this._speed = 1,
            this._volume = 1,
            this._loop = !1,
            this._elapsed = 0,
            this._duration = 0,
            this._paused = !1,
            this._muted = !1,
            this._pausedReal = !1
    }
    toString() {
        return `[WebAudioInstance id=${this.id}]`
    }
    _now() {
        return this._media.context.audioContext.currentTime
    }
    _updateListener() {
        this._update()
    }
    _update(t = !1) {
        if (this._source) {
            const e = this._now()
                , i = e - this._lastUpdate;
            if (i > 0 || t) {
                const r = this._source.playbackRate.value;
                this._elapsed += i * r,
                    this._lastUpdate = e;
                const n = this._duration;
                let o;
                if (this._source.loopStart) {
                    const a = this._source.loopEnd - this._source.loopStart;
                    o = (this._source.loopStart + this._elapsed % a) / n
                } else
                    o = this._elapsed % n / n;
                this._progress = o,
                    this.emit("progress", this._progress, n)
            }
        }
    }
    init(t) {
        this._media = t,
            t.context.events.on("refresh", this.refresh, this),
            t.context.events.on("refreshPaused", this.refreshPaused, this)
    }
    _internalStop() {
        if (this._source) {
            this.enableTicker(!1),
                this._source.onended = null,
                this._source.stop(0),
                this._source.disconnect();
            try {
                this._source.buffer = null
            } catch (t) {
                console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t)
            }
            this._source = null
        }
    }
    _onComplete() {
        if (this._source) {
            this.enableTicker(!1),
                this._source.onended = null,
                this._source.disconnect();
            try {
                this._source.buffer = null
            } catch (t) {
                console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t)
            }
        }
        this._source = null,
            this._progress = 1,
            this.emit("progress", 1, this._duration),
            this.emit("end", this)
    }
}
class Ca {
    constructor(t, e) {
        this._output = e,
            this._input = t
    }
    get destination() {
        return this._input
    }
    get filters() {
        return this._filters
    }
    set filters(t) {
        if (this._filters && (this._filters.forEach(e => {
            e && e.disconnect()
        }
        ),
            this._filters = null,
            this._input.connect(this._output)),
            t && t.length) {
            this._filters = t.slice(0),
                this._input.disconnect();
            let e = null;
            t.forEach(i => {
                e === null ? this._input.connect(i.destination) : e.connect(i.destination),
                    e = i
            }
            ),
                e.connect(this._output)
        }
    }
    destroy() {
        this.filters = null,
            this._input = null,
            this._output = null
    }
}
const Pa = class extends Ca {
    constructor(s) {
        const t = s.audioContext
            , e = t.createBufferSource()
            , i = t.createGain()
            , r = t.createAnalyser();
        e.connect(r),
            r.connect(i),
            i.connect(s.destination),
            super(r, i),
            this.context = s,
            this.bufferSource = e,
            this.gain = i,
            this.analyser = r
    }
    get script() {
        return this._script || (this._script = this.context.audioContext.createScriptProcessor(Pa.BUFFER_SIZE),
            this._script.connect(this.context.destination)),
            this._script
    }
    destroy() {
        super.destroy(),
            this.bufferSource.disconnect(),
            this._script && this._script.disconnect(),
            this.gain.disconnect(),
            this.analyser.disconnect(),
            this.bufferSource = null,
            this._script = null,
            this.gain = null,
            this.analyser = null,
            this.context = null
    }
    cloneBufferSource() {
        const s = this.bufferSource
            , t = this.context.audioContext.createBufferSource();
        t.buffer = s.buffer,
            Ji.setParamValue(t.playbackRate, s.playbackRate.value),
            t.loop = s.loop;
        const e = this.context.audioContext.createGain();
        return t.connect(e),
            e.connect(this.destination),
        {
            source: t,
            gain: e
        }
    }
    get bufferSize() {
        return this.script.bufferSize
    }
}
    ;
let Ta = Pa;
Ta.BUFFER_SIZE = 0;
class Kd {
    init(t) {
        this.parent = t,
            this._nodes = new Ta(this.context),
            this._source = this._nodes.bufferSource,
            this.source = t.options.source
    }
    destroy() {
        this.parent = null,
            this._nodes.destroy(),
            this._nodes = null;
        try {
            this._source.buffer = null
        } catch (t) {
            console.warn("Failed to set AudioBufferSourceNode.buffer to null:", t)
        }
        this._source = null,
            this.source = null
    }
    create() {
        return new qd(this)
    }
    get context() {
        return this.parent.context
    }
    get isPlayable() {
        return !!this._source && !!this._source.buffer
    }
    get filters() {
        return this._nodes.filters
    }
    set filters(t) {
        this._nodes.filters = t
    }
    get duration() {
        return console.assert(this.isPlayable, "Sound not yet playable, no duration"),
            this._source.buffer.duration
    }
    get buffer() {
        return this._source.buffer
    }
    set buffer(t) {
        this._source.buffer = t
    }
    get nodes() {
        return this._nodes
    }
    load(t) {
        this.source ? this._decode(this.source, t) : this.parent.url ? this._loadUrl(t) : t ? t(new Error("sound.url or sound.source must be set")) : console.error("sound.url or sound.source must be set")
    }
    async _loadUrl(t) {
        const e = this.parent.url
            , i = await X.get().fetch(e);
        this._decode(await i.arrayBuffer(), t)
    }
    _decode(t, e) {
        const i = (r, n) => {
            if (r)
                e && e(r);
            else {
                this.parent.isLoaded = !0,
                    this.buffer = n;
                const o = this.parent.autoPlayStart();
                e && e(null, this.parent, o)
            }
        }
            ;
        t instanceof AudioBuffer ? i(null, t) : this.parent.context.decode(t, i)
    }
}
const Te = class {
    static from(s) {
        let t = {};
        typeof s == "string" ? t.url = s : s instanceof ArrayBuffer || s instanceof AudioBuffer || s instanceof HTMLAudioElement ? t.source = s : Array.isArray(s) ? t.url = s : t = s,
            t = {
                autoPlay: !1,
                singleInstance: !1,
                url: null,
                source: null,
                preload: !1,
                volume: 1,
                speed: 1,
                complete: null,
                loaded: null,
                loop: !1,
                ...t
            },
            Object.freeze(t);
        const e = ms().useLegacy ? new Vd : new Kd;
        return new Te(e, t)
    }
    constructor(s, t) {
        this.media = s,
            this.options = t,
            this._instances = [],
            this._sprites = {},
            this.media.init(this);
        const e = t.complete;
        this._autoPlayOptions = e ? {
            complete: e
        } : null,
            this.isLoaded = !1,
            this._preloadQueue = null,
            this.isPlaying = !1,
            this.autoPlay = t.autoPlay,
            this.singleInstance = t.singleInstance,
            this.preload = t.preload || this.autoPlay,
            this.url = Array.isArray(t.url) ? this.preferUrl(t.url) : t.url,
            this.speed = t.speed,
            this.volume = t.volume,
            this.loop = t.loop,
            t.sprites && this.addSprites(t.sprites),
            this.preload && this._preload(t.loaded)
    }
    preferUrl(s) {
        const [t] = s.map(e => ({
            url: e,
            ext: dt.extname(e).slice(1)
        })).filter(({ ext: e }) => Zs[e]).sort((e, i) => Ks.indexOf(e.ext) - Ks.indexOf(i.ext));
        if (!t)
            throw new Error("No supported file type found");
        return t.url
    }
    get context() {
        return ms().context
    }
    pause() {
        return this.isPlaying = !1,
            this.paused = !0,
            this
    }
    resume() {
        return this.isPlaying = this._instances.length > 0,
            this.paused = !1,
            this
    }
    get paused() {
        return this._paused
    }
    set paused(s) {
        this._paused = s,
            this.refreshPaused()
    }
    get speed() {
        return this._speed
    }
    set speed(s) {
        this._speed = s,
            this.refresh()
    }
    get filters() {
        return this.media.filters
    }
    set filters(s) {
        this.media.filters = s
    }
    addSprites(s, t) {
        if (typeof s == "object") {
            const i = {};
            for (const r in s)
                i[r] = this.addSprites(r, s[r]);
            return i
        }
        console.assert(!this._sprites[s], `Alias ${s} is already taken`);
        const e = new $d(this, t);
        return this._sprites[s] = e,
            e
    }
    destroy() {
        this._removeInstances(),
            this.removeSprites(),
            this.media.destroy(),
            this.media = null,
            this._sprites = null,
            this._instances = null
    }
    removeSprites(s) {
        if (s) {
            const t = this._sprites[s];
            t !== void 0 && (t.destroy(),
                delete this._sprites[s])
        } else
            for (const t in this._sprites)
                this.removeSprites(t);
        return this
    }
    get isPlayable() {
        return this.isLoaded && this.media && this.media.isPlayable
    }
    stop() {
        if (!this.isPlayable)
            return this.autoPlay = !1,
                this._autoPlayOptions = null,
                this;
        this.isPlaying = !1;
        for (let s = this._instances.length - 1; s >= 0; s--)
            this._instances[s].stop();
        return this
    }
    play(s, t) {
        let e;
        if (typeof s == "string" ? e = {
            sprite: s,
            loop: this.loop,
            complete: t
        } : typeof s == "function" ? (e = {},
            e.complete = s) : e = s,
            e = {
                complete: null,
                loaded: null,
                sprite: null,
                end: null,
                start: 0,
                volume: 1,
                speed: 1,
                muted: !1,
                loop: !1,
                ...e || {}
            },
            e.sprite) {
            const r = e.sprite;
            console.assert(!!this._sprites[r], `Alias ${r} is not available`);
            const n = this._sprites[r];
            e.start = n.start + (e.start || 0),
                e.end = n.end,
                e.speed = n.speed || 1,
                e.loop = n.loop || e.loop,
                delete e.sprite
        }
        if (e.offset && (e.start = e.offset),
            !this.isLoaded)
            return this._preloadQueue ? new Promise(r => {
                this._preloadQueue.push(() => {
                    r(this.play(e))
                }
                )
            }
            ) : (this._preloadQueue = [],
                this.autoPlay = !0,
                this._autoPlayOptions = e,
                new Promise((r, n) => {
                    this._preload((o, a, h) => {
                        this._preloadQueue.forEach(l => l()),
                            this._preloadQueue = null,
                            o ? n(o) : (e.loaded && e.loaded(o, a, h),
                                r(h))
                    }
                    )
                }
                ));
        (this.singleInstance || e.singleInstance) && this._removeInstances();
        const i = this._createInstance();
        return this._instances.push(i),
            this.isPlaying = !0,
            i.once("end", () => {
                e.complete && e.complete(this),
                    this._onComplete(i)
            }
            ),
            i.once("stop", () => {
                this._onComplete(i)
            }
            ),
            i.play(e),
            i
    }
    refresh() {
        const s = this._instances.length;
        for (let t = 0; t < s; t++)
            this._instances[t].refresh()
    }
    refreshPaused() {
        const s = this._instances.length;
        for (let t = 0; t < s; t++)
            this._instances[t].refreshPaused()
    }
    get volume() {
        return this._volume
    }
    set volume(s) {
        this._volume = s,
            this.refresh()
    }
    get muted() {
        return this._muted
    }
    set muted(s) {
        this._muted = s,
            this.refresh()
    }
    get loop() {
        return this._loop
    }
    set loop(s) {
        this._loop = s,
            this.refresh()
    }
    _preload(s) {
        this.media.load(s)
    }
    get instances() {
        return this._instances
    }
    get sprites() {
        return this._sprites
    }
    get duration() {
        return this.media.duration
    }
    autoPlayStart() {
        let s;
        return this.autoPlay && (s = this.play(this._autoPlayOptions)),
            s
    }
    _removeInstances() {
        for (let s = this._instances.length - 1; s >= 0; s--)
            this._poolInstance(this._instances[s]);
        this._instances.length = 0
    }
    _onComplete(s) {
        if (this._instances) {
            const t = this._instances.indexOf(s);
            t > -1 && this._instances.splice(t, 1),
                this.isPlaying = this._instances.length > 0
        }
        this._poolInstance(s)
    }
    _createInstance() {
        if (Te._pool.length > 0) {
            const s = Te._pool.pop();
            return s.init(this.media),
                s
        }
        return this.media.create()
    }
    _poolInstance(s) {
        s.destroy(),
            Te._pool.indexOf(s) < 0 && Te._pool.push(s)
    }
}
    ;
let Qs = Te;
Qs._pool = [];
class gs extends Ca {
    constructor() {
        const t = window
            , e = new gs.AudioContext
            , i = e.createDynamicsCompressor()
            , r = e.createAnalyser();
        r.connect(i),
            i.connect(e.destination),
            super(r, i),
            this.autoPause = !0,
            this._ctx = e,
            this._offlineCtx = new gs.OfflineAudioContext(1, 2, t.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, e.sampleRate)) : 44100),
            this.compressor = i,
            this.analyser = r,
            this.events = new mt,
            this.volume = 1,
            this.speed = 1,
            this.muted = !1,
            this.paused = !1,
            this._locked = e.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis),
            this._locked && (this._unlock(),
                this._unlock = this._unlock.bind(this),
                document.addEventListener("mousedown", this._unlock, !0),
                document.addEventListener("touchstart", this._unlock, !0),
                document.addEventListener("touchend", this._unlock, !0)),
            this.onFocus = this.onFocus.bind(this),
            this.onBlur = this.onBlur.bind(this),
            globalThis.addEventListener("focus", this.onFocus),
            globalThis.addEventListener("blur", this.onBlur)
    }
    onFocus() {
        if (!this.autoPause)
            return;
        const t = this._ctx.state;
        (t === "suspended" || t === "interrupted" || !this._locked) && (this.paused = this._pausedOnBlur,
            this.refreshPaused())
    }
    onBlur() {
        this.autoPause && (this._locked || (this._pausedOnBlur = this._paused,
            this.paused = !0,
            this.refreshPaused()))
    }
    _unlock() {
        this._locked && (this.playEmptySound(),
            this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0),
                document.removeEventListener("touchend", this._unlock, !0),
                document.removeEventListener("touchstart", this._unlock, !0),
                this._locked = !1))
    }
    playEmptySound() {
        const t = this._ctx.createBufferSource();
        t.buffer = this._ctx.createBuffer(1, 1, 22050),
            t.connect(this._ctx.destination),
            t.start(0, 0, 0),
            t.context.state === "suspended" && t.context.resume()
    }
    static get AudioContext() {
        const t = window;
        return t.AudioContext || t.webkitAudioContext || null
    }
    static get OfflineAudioContext() {
        const t = window;
        return t.OfflineAudioContext || t.webkitOfflineAudioContext || null
    }
    destroy() {
        super.destroy();
        const t = this._ctx;
        typeof t.close < "u" && t.close(),
            globalThis.removeEventListener("focus", this.onFocus),
            globalThis.removeEventListener("blur", this.onBlur),
            this.events.removeAllListeners(),
            this.analyser.disconnect(),
            this.compressor.disconnect(),
            this.analyser = null,
            this.compressor = null,
            this.events = null,
            this._offlineCtx = null,
            this._ctx = null
    }
    get audioContext() {
        return this._ctx
    }
    get offlineContext() {
        return this._offlineCtx
    }
    set paused(t) {
        t && this._ctx.state === "running" ? this._ctx.suspend() : !t && this._ctx.state === "suspended" && this._ctx.resume(),
            this._paused = t
    }
    get paused() {
        return this._paused
    }
    refresh() {
        this.events.emit("refresh")
    }
    refreshPaused() {
        this.events.emit("refreshPaused")
    }
    toggleMute() {
        return this.muted = !this.muted,
            this.refresh(),
            this.muted
    }
    togglePause() {
        return this.paused = !this.paused,
            this.refreshPaused(),
            this._paused
    }
    decode(t, e) {
        const i = n => {
            e(new Error((n == null ? void 0 : n.message) || "Unable to decode file"))
        }
            , r = this._offlineCtx.decodeAudioData(t, n => {
                e(null, n)
            }
                , i);
        r && r.catch(i)
    }
}
class Zd {
    constructor() {
        this.init()
    }
    init() {
        return this.supported && (this._webAudioContext = new gs),
            this._htmlAudioContext = new Hd,
            this._sounds = {},
            this.useLegacy = !this.supported,
            this
    }
    get context() {
        return this._context
    }
    get filtersAll() {
        return this.useLegacy ? [] : this._context.filters
    }
    set filtersAll(t) {
        this.useLegacy || (this._context.filters = t)
    }
    get supported() {
        return gs.AudioContext !== null
    }
    add(t, e) {
        if (typeof t == "object") {
            const n = {};
            for (const o in t) {
                const a = this._getOptions(t[o], e);
                n[o] = this.add(o, a)
            }
            return n
        }
        if (console.assert(!this._sounds[t], `Sound with alias ${t} already exists.`),
            e instanceof Qs)
            return this._sounds[t] = e,
                e;
        const i = this._getOptions(e)
            , r = Qs.from(i);
        return this._sounds[t] = r,
            r
    }
    _getOptions(t, e) {
        let i;
        return typeof t == "string" ? i = {
            url: t
        } : Array.isArray(t) ? i = {
            url: t
        } : t instanceof ArrayBuffer || t instanceof AudioBuffer || t instanceof HTMLAudioElement ? i = {
            source: t
        } : i = t,
            i = {
                ...i,
                ...e || {}
            },
            i
    }
    get useLegacy() {
        return this._useLegacy
    }
    set useLegacy(t) {
        this._useLegacy = t,
            this._context = !t && this.supported ? this._webAudioContext : this._htmlAudioContext
    }
    get disableAutoPause() {
        return !this._webAudioContext.autoPause
    }
    set disableAutoPause(t) {
        this._webAudioContext.autoPause = !t
    }
    remove(t) {
        return this.exists(t, !0),
            this._sounds[t].destroy(),
            delete this._sounds[t],
            this
    }
    get volumeAll() {
        return this._context.volume
    }
    set volumeAll(t) {
        this._context.volume = t,
            this._context.refresh()
    }
    get speedAll() {
        return this._context.speed
    }
    set speedAll(t) {
        this._context.speed = t,
            this._context.refresh()
    }
    togglePauseAll() {
        return this._context.togglePause()
    }
    pauseAll() {
        return this._context.paused = !0,
            this._context.refreshPaused(),
            this
    }
    resumeAll() {
        return this._context.paused = !1,
            this._context.refreshPaused(),
            this
    }
    toggleMuteAll() {
        return this._context.toggleMute()
    }
    muteAll() {
        return this._context.muted = !0,
            this._context.refresh(),
            this
    }
    unmuteAll() {
        return this._context.muted = !1,
            this._context.refresh(),
            this
    }
    removeAll() {
        for (const t in this._sounds)
            this._sounds[t].destroy(),
                delete this._sounds[t];
        return this
    }
    stopAll() {
        for (const t in this._sounds)
            this._sounds[t].stop();
        return this
    }
    exists(t, e = !1) {
        const i = !!this._sounds[t];
        return e && console.assert(i, `No sound matching alias '${t}'.`),
            i
    }
    isPlaying() {
        for (const t in this._sounds)
            if (this._sounds[t].isPlaying)
                return !0;
        return !1
    }
    find(t) {
        return this.exists(t, !0),
            this._sounds[t]
    }
    play(t, e) {
        return this.find(t).play(e)
    }
    stop(t) {
        return this.find(t).stop()
    }
    pause(t) {
        return this.find(t).pause()
    }
    resume(t) {
        return this.find(t).resume()
    }
    volume(t, e) {
        const i = this.find(t);
        return e !== void 0 && (i.volume = e),
            i.volume
    }
    speed(t, e) {
        const i = this.find(t);
        return e !== void 0 && (i.speed = e),
            i.speed
    }
    duration(t) {
        return this.find(t).duration
    }
    close() {
        return this.removeAll(),
            this._sounds = null,
            this._webAudioContext && (this._webAudioContext.destroy(),
                this._webAudioContext = null),
            this._htmlAudioContext && (this._htmlAudioContext.destroy(),
                this._htmlAudioContext = null),
            this._context = null,
            this
    }
}
const Dn = s => {
    var i;
    const t = s.src;
    let e = (i = s == null ? void 0 : s.alias) == null ? void 0 : i[0];
    return (!e || s.src === e) && (e = dt.basename(t, dt.extname(t))),
        e
}
    , Qd = {
        extension: B.Asset,
        detection: {
            test: async () => !0,
            add: async s => [...s, ...Ks.filter(t => Zs[t])],
            remove: async s => s.filter(t => s.includes(t))
        },
        loader: {
            name: "sound",
            extension: {
                type: [B.LoadParser],
                priority: te.High
            },
            test(s) {
                const t = dt.extname(s).slice(1);
                return !!Zs[t] || Yd.some(e => s.startsWith(`data:${e}`))
            },
            async load(s, t) {
                const e = await new Promise((i, r) => Qs.from({
                    ...t.data,
                    url: s,
                    preload: !0,
                    loaded(n, o) {
                        var a, h;
                        n ? r(n) : i(o),
                            (h = (a = t.data) == null ? void 0 : a.loaded) == null || h.call(a, n, o)
                    }
                }));
                return ms().add(Dn(t), e),
                    e
            },
            async unload(s, t) {
                ms().remove(Dn(t))
            }
        }
    };
lt.add(Qd);
const Ma = zd(new Zd)
    , Jd = {
        drop: {
            start: 4.2,
            end: 5.8
        },
        last: {
            start: 6.2,
            end: 7.7
        },
        popup: {
            start: 36,
            end: 40
        }
    };
let er = !1;
function tf() {
    if (er)
        return;
    Ma.add("sfx", {
        url: "./assets/sound/sounds.ogg",
        sprites: Jd,
        preload: !0,
        loaded: () => {
            er = !0
        }
    })
}
function zn(s) {
    er && Ma.play("sfx", {
        sprite: s
    })
}
async function ef(s) {
    const t = new ot(await et.get("bg-tower"));
    return t.anchor.set(.5, 1),
        t.scale.set(2),
        t.position.set(nt / 2, Zt),
        s.addChild(t),
        t
}
async function sf(s) {
    const t = new ut;
    s.addChild(t);
    const e = new ot(await et.get("hook"));
    e.anchor.set(.5, 1),
        e.scale.set(.5),
        e.position.set(0, 0);
    const i = new ot(await et.get("rope"));
    return i.anchor.set(.5, 0),
        i.scale.set(1.4),
        i.position.set(10, -5),
        t.addChild(i),
        t.addChild(e),
        t.position.set(nt / 2, 150),
    {
        sprite: t,
        rope: i
    }
}
(async () => {
    const s = new Do;
    await s.init({
        background: "#87CEEB",
        resizeTo: window,
        antialias: !0,
        resolution: window.devicePixelRatio || 2,
        autoDensity: !0
    }),
        document.getElementById("pixi-container").appendChild(s.canvas);
    const t = new ut
        , e = new ut
        , i = new ut;
    s.stage.addChild(t),
        s.stage.addChild(e),
        s.stage.addChild(i),
        tf(),
        await et.load([{
            alias: "bg-tower",
            src: "./assets/static/tower-rush.webp"
        }, {
            alias: "hook",
            src: "./assets/static/hook.webp"
        }, {
            alias: "block1",
            src: "./assets/static/item-7.webp"
        }, {
            alias: "block2",
            src: "./assets/static/item-2.webp"
        }, {
            alias: "block3",
            src: "./assets/static/item-3.webp"
        }, {
            alias: "block4",
            src: "./assets/static/item-4.webp"
        }, {
            alias: "block5",
            src: "./assets/static/item-5.webp"
        }, {
            alias: "block6",
            src: "./assets/static/item-6.webp"
        }, {
            alias: "block7",
            src: "./assets/static/item-1.webp"
        }, {
            alias: "rope",
            src: "./assets/static/rope.webp"
        }, {
            alias: "cashout-btn",
            src: "./assets/static/button-1.webp"
        }, {
            alias: "build-btn",
            src: "./assets/static/button-2.webp"
        }, {
            alias: "cloud1",
            src: "./assets/static/cloud-1.webp"
        }, {
            alias: "cloud2",
            src: "./assets/static/cloud-2.webp"
        }, {
            alias: "bg-left",
            src: "./assets/static/background-front-road1.webp"
        }, {
            alias: "bg-right",
            src: "./assets/static/background-front-road2.webp"
        }, {
            alias: "smoke-boom",
            src: "./assets/anim-1/anim1.json"
        }, {
            alias: "smoke-drop",
            src: "./assets/anim-2/anim2.json"
        }, {
            alias: "sun",
            src: "./assets/static/sun.webp"
        }, {
            alias: "sun-bg",
            src: "./assets/static/sun-bg.webp"
        }, {
            alias: "sun-bg-big",
            src: "./assets/static/sun-bg1.webp"
        }, {
            alias: "panel",
            src: "./assets/static/panel.webp"
        }, {
            alias: "popup",
            src: "./assets/static/popup.webp"
        }, {
            alias: "font",
            src: "./assets/fonts/Rubik.ttf",
            data: {
                family: "Rubik",
                weights: ["bold"]
            }
        }]);
    const r = window.lndConfigData || {};
    function n(v) {
        return Array.isArray(v) ? v.map(String) : v && typeof v == "object" ? Object.keys(v).sort((M, R) => +M - +R).map(M => String(v[M])) : typeof v == "string" ? v.split(/[,\s;]+/).filter(M => M.trim()) : []
    }
    function o(v) {
        return n(v).map(R => {
            const O = Number(String(R).replace(",", "."));
            return Number.isFinite(O) ? O : void 0
        }
        )
    }
    const a = ["x2", "x3", "x4", "x5", "x10", "x15", "x30"]
        , h = [2, 3, 4, 5, 10, 15, 30]
        , l = n(r.multipliers)
        , c = o(r.rewardValues);
    function u(v, M, R, { minScale: O = .25 } = {}) {
        if (!v)
            return;
        const I = v.style;
        I.wordWrap = !1,
            I.breakWords = !1,
            I.align = "center",
            v.scale.set(1);
        const N = v.getLocalBounds()
            , ft = N.width || 1
            , gt = N.height || 1;
        let Z = 1;
        ft > M && (Z = Math.min(Z, M / ft)),
            gt > R && (Z = Math.min(Z, R / gt)),
            Z < O && (Z = O),
            v.scale.set(Z)
    }
    let f = Zt
        , d = 0;
    const m = 250
        , g = [1, 2, 6, 4, 3, 5, 7]
        , p = [];
    let _ = null
        , x = 0
        , y = 0;
    const b = [];
    let S = null;
    function A() {
        const v = s.stage.scale.x || 1
            , M = window.innerWidth / v
            , R = (nt - M) / 2
            , O = R + M;
        return {
            left: R,
            right: O,
            visibleW: M
        }
    }
    function w(v = [0, Zt]) {
        const { left: M, visibleW: R } = A()
            , O = Math.floor(Math.random() * 2) + 1
            , I = new ot(et.get(`cloud${O}`));
        I.anchor.set(.5),
            I.scale.set(.7 + Math.random() * .6),
            I.alpha = .4 + Math.random() * .4,
            I.x = M + Math.random() * R,
            I.y = v[0] + Math.random() * (v[1] - v[0]),
            I.speed = (1 + Math.random() * .5) * (Math.random() > .5 ? 1 : -1),
            t.addChild(I),
            b.push(I)
    }
    for (let v = 0; v < 30; v++)
        w([-4e3, Zt + 500]);
    function L(v) {
        const { left: M, right: R } = A()
            , O = 300;
        b.forEach(I => {
            I.x += I.speed * v.deltaTime,
                I.x > R + O && (I.x = M - O),
                I.x < M - O && (I.x = R + O)
        }
        ),
            t.y = e.y * .5
    }
    const k = new ut;
    i.addChild(k);
    const C = new ut;
    C.visible = !1,
        s.stage.addChild(C);
    const P = 150
        , z = a.map((v, M) => l[M] !== void 0 && String(l[M]).trim() !== "" ? String(l[M]) : v);
    let G = 0
        , $ = !1;
    const Gt = {
        active: !1
    }
        , T = [];
    let F = !1;
    const ne = .04
        , H = h.map((v, M) => Number.isFinite(c[M]) ? c[M] : v);
    let xt = 0
        , Vt = 0;
    const Ot = v => `${v.toFixed(2)} ${r.currency || "$"}`;
    let $t = null;
    const xs = new Tt({
        fontFamily: "Rubik",
        fontSize: 190,
        fontWeight: "900",
        fill: {
            fill: new Nt({
                x0: 0,
                y0: 0,
                x1: 0,
                y1: 190
            }).addColorStop(0, "#FFF3B0").addColorStop(.45, "#FFD35A").addColorStop(1, "#E3A01B")
        },
        stroke: {
            color: "#FFFFFF",
            width: 22,
            join: "round"
        },
        dropShadow: {
            color: "#000000",
            alpha: .35,
            blur: 6,
            distance: 4,
            angle: Math.PI / 4
        },
        padding: 30
    })
        , ee = new qs;
    C.addChild(ee);
    const St = new ot(et.get("sun-bg-big"));
    St.anchor.set(.5),
        St.alpha = .45,
        C.addChild(St);
    const vt = new ut;
    C.addChild(vt);
    const Yt = new ot(et.get("popup"));
    Yt.anchor.set(.5),
        vt.addChild(Yt),
        s.ticker.add(() => {
            C.visible && (St.rotation += .005)
        }
        );
    const xe = new Tt({
        fontFamily: "Rubik",
        fontSize: 80,
        fontWeight: "900",
        fill: "#ffffff",
        stroke: {
            color: "#000000",
            width: 14
        },
        dropShadow: {
            blur: 6,
            color: "#000000",
            distance: 4
        }
    })
        , ye = new Tt({
            fontFamily: "Rubik",
            fontSize: 100,
            fontWeight: "900",
            fill: "#ffffff",
            stroke: {
                color: "#000000",
                width: 14
            },
            dropShadow: {
                blur: 6,
                color: "#000000",
                distance: 4
            }
        })
        , We = new Tt({
            fontFamily: "Rubik",
            fontSize: 100,
            fontWeight: "900",
            fill: "#ffffffff",
            stroke: {
                color: "#000000",
                width: 14
            },
            dropShadow: {
                blur: 6,
                color: "#000000",
                distance: 4
            }
        })
        , Xt = new Tt({
            fontFamily: "Rubik",
            fontSize: 44,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: {
                color: "#4a3b00",
                width: 6
            },
            dropShadow: {
                blur: 6,
                color: "#000000",
                distance: 4
            }
        })
        , Ct = new se({
            text: r.popupTitle || "CONGRATULATIONS!",
            style: xe
        });
    Ct.anchor.set(.5),
        vt.addChild(Ct);
    const Pt = new se({
        text: r.popupText || "YOU WON",
        style: ye
    });
    Pt.anchor.set(.5),
        vt.addChild(Pt);
    const yt = new se({
        text: Ot(0),
        style: We
    });
    yt.anchor.set(.5),
        vt.addChild(yt);
    function ni() {
        yt.text = Ot(Vt),
            u(yt, Yt.texture.width * .82, Yt.texture.height * .18)
    }
    const bt = new ot(et.get("build-btn"));
    bt.anchor.set(.5),
        bt.scale.set(2),
        bt.interactive = !0,
        bt.cursor = "pointer",
        vt.addChild(bt),
        bt.on("pointerdown", () => {
            window.doWork && window.doWork()
        }
        );
    const Ue = new se({
        text: r.popupClaim || "CLAIM",
        style: Xt
    });
    Ue.anchor.set(.5),
        bt.addChild(Ue);
    function mr(v, M, { onComplete: R } = {}) {
        const O = Math.min(G, z.length - 1)
            , I = new se({
                text: z[O],
                style: xs
            });
        I.anchor.set(.5);
        const N = nt / 2
            , ft = Math.round(Zt * .5);
        I.position.set(N, ft),
            I.alpha = 0,
            I.scale.set(0),
            i.addChild(I),
            Fa(N, ft),
            G++;
        const gt = 260
            , Z = 500
            , ae = 260
            , he = 1.5
            , Ae = Ut => 1 - Math.pow(1 - Ut, 3)
            , vs = Ut => Ut * Ut * Ut
            , ai = Ut => Math.max(0, Math.min(1, Ut));
        let jt = 0;
        const Ne = Ut => {
            if (jt += Ut.deltaMS,
                jt <= gt) {
                const $e = ai(jt / gt)
                    , Ye = Ae($e)
                    , hi = Ye * he;
                I.scale.set(hi),
                    I.alpha = Ye;
                return
            }
            if (jt <= gt + Z) {
                I.scale.set(he),
                    I.alpha = 1;
                return
            }
            const Ve = jt - (gt + Z);
            if (Ve <= ae) {
                const $e = ai(Ve / ae)
                    , Ye = 1 - vs($e)
                    , hi = Ye * he;
                I.scale.set(hi),
                    I.alpha = Ye;
                return
            }
            s.ticker.remove(Ne),
                I.destroy(),
                R && R()
        }
            ;
        s.ticker.add(Ne)
    }
    function ka() {
        ni(),
            zn("popup"),
            C.visible = !0,
            C.alpha = 0;
        const v = M => {
            C.alpha += .08 * M.deltaTime,
                C.alpha >= 1 && (C.alpha = 1,
                    s.ticker.remove(v))
        }
            ;
        s.ticker.add(v)
    }
    async function Ea() {
        const v = new ut
            , M = new ot(et.get("sun-bg"));
        M.anchor.set(.5),
            v.addChild(M),
            v.scale.set(2),
            v.zIndex = -1,
            e.addChild(v),
            $t = {
                sunContainer: v,
                sunBg: M
            },
            s.ticker.add(() => {
                v.rotation += .005
            }
            )
    }
    await Ea();
    function Ia() {
        xt >= H.length || (Vt += H[xt],
            xt += 1,
            oe && (oe.text = Ot(Vt)))
    }
    function gr() {
        if (F)
            return;
        F = !0,
            ze(),
            De(!1),
            x = 0,
            ka();
        const v = T.slice();
        T.length = 0;
        const M = R => {
            let O = 0;
            for (let I = 0; I < v.length; I++) {
                const N = v[I];
                !N || !N.parent || (N.alpha -= ne * R.deltaTime,
                    N.alpha <= 0 ? (N.parent.removeChild(N),
                        N.destroy({
                            children: !0
                        })) : O += 1)
            }
            O === 0 && (s.ticker.remove(M),
                F = !1)
        }
            ;
        s.ticker.add(M)
    }
    function _r() {
        const v = window.innerWidth
            , M = window.innerHeight
            , R = Math.min(v / nt, M / (Zt + m + P))
            , O = v / R;
        s.stage.scale.set(R, R);
        const I = nt * R;
        s.stage.position.set((v - I) / 2, 0),
            k && (k.y = M / R - m - P);
        const N = k.y + m + P
            , ft = (nt - O) / 2;
        ee.clear(),
            ee.rect(ft, 0, O, N).fill({
                color: 0,
                alpha: .6
            }),
            vt.position.set(nt / 2, N / 2);
        const gt = Yt.texture.width
            , Z = Yt.texture.height
            , he = Math.min(O, nt) * .8
            , Ae = N * .85
            , vs = Math.min(he / gt, Ae / Z, 1);
        vt.scale.set(vs),
            St.position.copyFrom(vt.position),
            St.scale.set(vs * 2.35),
            Ct.position.set(0, -Z * .28),
            Pt.position.set(0, -Z * .09),
            yt.position.set(0, Z * .09),
            bt.position.set(0, Z * .7);
        const jt = gt * .82;
        u(Ct, jt, Z * .22),
            u(Pt, jt, Z * .17),
            u(yt, jt, Z * .18),
            u(Ue, bt.texture.width * .72, bt.texture.height * .55);
        const Ne = m + P;
        we.width = O,
            we.height = Ne,
            we.pivot.set(we.width / 2, 0),
            we.position.set(nt / 2, 0);
        const Ve = Math.round(Ne * .5) + 0;
        rt.y = Ve,
            ct.y = Ve,
            u(He, rt.texture.width * .78, rt.texture.height * .28),
            u(oe, rt.texture.width * .78, rt.texture.height * .36),
            u(bs, ct.texture.width * .78, ct.texture.height * .45);
        const $e = M / R - m - P;
        $t && $t.sunContainer.position.set(nt / 2, $e - 360)
    }
    function Ba() {
        e.y += (x - e.y) * .1
    }
    function Fa(v, M) {
        const R = et.get("smoke-boom");
        if (!R || !R.textures)
            return;
        const O = Object.entries(R.textures);
        if (O.length === 0)
            return;
        O.sort(([ft], [gt]) => {
            const Z = Number((ft.match(/\d+/g) || []).pop() || 0)
                , ae = Number((gt.match(/\d+/g) || []).pop() || 0);
            return Z - ae
        }
        );
        const I = O.map(([, ft]) => ft)
            , N = new ps(I);
        N.anchor.set(.5),
            N.position.set(v, M),
            N.scale.set(3),
            N.animationSpeed = 1,
            N.loop = !1,
            N.onComplete = () => N.destroy(),
            i.addChild(N),
            N.play()
    }
    function Ra(v, M) {
        const R = et.get("smoke-drop");
        if (!R)
            return;
        const O = Object.values(R.textures);
        if (O.length === 0)
            return;
        const I = new ps(O);
        I.anchor.set(.5, .5),
            I.position.set(v, M),
            I.scale.set(3),
            I.loop = !1,
            I.animationSpeed = .5,
            I.onComplete = () => {
                I.destroy()
            }
            ,
            e.addChild(I),
            I.play()
    }
    function xr() {
        if (d >= g.length) {
            _ = null;
            return
        }
        const v = g[d];
        d++;
        const M = new ut
            , R = new ot(et.get(`block${v}`));
        R.anchor.set(.5, 0),
            R.scale.set(1),
            M.addChild(R),
            M.mainBlock = R,
            M.alpha = 0,
            M.x = be.x,
            M.y = be.y + be.height - 30,
            Wt.addChild(M),
            _ = M,
            De(!0),
            ze()
    }
    function yr() {
        Wt.visible && (Wt.visible = !1,
            De(!1))
    }
    function La() {
        if (!(F || $) && !(xt <= 0) && !(p.length > 0)) {
            $ = !0,
                ze(),
                S && (clearTimeout(S),
                    S = null),
                yr(),
                _ && (_.parent && _.parent.removeChild(_),
                    _.destroy({
                        children: !0
                    }),
                    _ = null);
            for (let v = 0; v < p.length; v++) {
                const M = p[v];
                M && M.parent && !T.includes(M) && T.push(M)
            }
            p.length = 0,
                gr()
        }
    }
    function De(v) {
        ct.interactive = v,
            ct.alpha = v ? 1 : .5,
            ct.cursor = v ? "pointer" : "default"
    }
    function Ga() {
        const v = d >= g.length && !_;
        return xt > 0 && p.length === 0 && !F && !$ && !v
    }
    function br(v) {
        rt.interactive = v,
            rt.alpha = v ? 1 : .5,
            rt.cursor = v ? "pointer" : "default"
    }
    function ze() {
        br(Ga())
    }
    function Oa({ force: v = !1, nextDelayMs: M = 500 } = {}) {
        if (!_ || !v && _.alpha < .5)
            return !1;
        br(!1);
        const R = d >= g.length;
        zn(R ? "last" : "drop");
        const O = _;
        _ = null,
            O.alpha = 1,
            O.fallSpeed = v ? 70 : 35,
            O.autoDrop = Gt.active;
        const I = Wt.rotation
            , N = be.x
            , ft = be.y + be.height - 30
            , gt = N * Math.cos(I) - ft * Math.sin(I)
            , Z = N * Math.sin(I) + ft * Math.cos(I)
            , ae = Wt.x + gt
            , he = Wt.y + Z;
        Wt.removeChild(O),
            e.addChild(O),
            O.x = ae,
            O.y = -e.y + he;
        const Ae = O.mainBlock || O;
        return O.targetY = f - Ae.height,
            p.push(O),
            f -= Ae.height,
            S && clearTimeout(S),
            S = setTimeout(() => {
                S = null,
                    xr()
            }
                , M),
            d >= g.length && !_ && De(!1),
            !0
    }
    const wr = await sf(i)
        , Wt = wr.sprite
        , be = wr.rope
        , ys = 12
        , we = new Wd(et.get("panel"), ys, ys, ys, ys);
    k.addChild(we);
    const Wa = new Tt({
        fontFamily: "Rubik",
        fontSize: 44,
        fontWeight: "bold",
        fill: "#ffffff",
        stroke: {
            color: "#4a3b00",
            width: 6
        },
        dropShadow: {
            blur: 6,
            color: "#000000",
            distance: 4
        }
    })
        , Ar = 180
        , rt = new ot(et.get("cashout-btn"));
    rt.anchor.set(.5, .5),
        rt.scale.set(2),
        rt.position.set(nt * .25, Ar),
        k.addChild(rt);
    const oe = new se({
        text: Ot(0),
        style: {
            fontFamily: "Rubik",
            fontSize: 44,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: {
                color: "#4a3b00",
                width: 6
            },
            dropShadow: {
                blur: 6,
                color: "#000000",
                distance: 4
            }
        }
    });
    oe.anchor.set(.5, .5),
        oe.position.set(0, 15),
        rt.addChild(oe);
    const He = new se({
        text: r.cashoutText || "CASHOUT",
        style: new Tt({
            fontFamily: "Rubik",
            fontSize: 44,
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: {
                color: "#4a3b00",
                width: 6
            },
            dropShadow: {
                blur: 6,
                color: "#000000",
                distance: 4
            }
        })
    });
    He.anchor.set(.5, .5),
        He.position.set(0, -20),
        rt.addChild(He);
    const ct = new ot(et.get("build-btn"));
    ct.anchor.set(.5, .5),
        ct.scale.set(2),
        ct.position.set(nt * .75, Ar),
        ct.interactive = !0,
        ct.cursor = "pointer",
        k.addChild(ct);
    const bs = new se({
        text: r.buildText || "BUILD",
        style: Wa
    });
    bs.anchor.set(.5, .5),
        ct.addChild(bs),
        u(He, rt.texture.width * .78, rt.texture.height * .28),
        u(oe, rt.texture.width * .78, rt.texture.height * .36),
        u(bs, ct.texture.width * .78, ct.texture.height * .45),
        rt.on("pointerdown", () => {
            La()
        }
        ),
        ze();
    function Ua({ isAuto: v = !1 } = {}) {
        if (!ct.interactive || !_ || _.alpha < .5)
            return;
        Oa() && De(!1)
    }
    ct.on("pointerdown", () => {
        Ua({
            isAuto: !1
        })
    }
    );
    const oi = await ef(e);
    _r();
    const ws = window.innerHeight / s.stage.scale.y - m - P
        , As = new ot(et.get("bg-left"));
    As.anchor.set(1, 1),
        As.position.set(nt / 2 - 210, ws),
        As.zIndex = -1,
        e.addChild(As);
    const Ss = new ot(et.get("bg-right"));
    Ss.anchor.set(0, 1),
        Ss.position.set(nt / 2 + 210, ws),
        Ss.zIndex = -1,
        e.addChild(Ss),
        e.sortableChildren = !0,
        oi.x = nt / 2,
        oi.y = ws,
        f = ws - oi.height + 100,
        xr(),
        window.addEventListener("resize", _r),
        s.ticker.add(v => {
            Ba(),
                L(v),
                y += .05 * v.deltaTime,
                Wt.x = nt / 2 + Math.sin(y) * 180,
                Wt.y = 150 + Math.abs(Math.sin(y * 2)) * 30,
                Wt.rotation = Math.sin(y + .8) * .2,
                _ && _.alpha < 1 && (_.alpha += .08 * v.deltaTime);
            for (let M = p.length - 1; M >= 0; M--) {
                const R = p[M]
                    , O = R.mainBlock || R;
                if (R.y < R.targetY) {
                    const I = R.fallSpeed || 35;
                    if (R.y += I * v.deltaTime,
                        R.y >= R.targetY) {
                        R.y = R.targetY,
                            Ra(R.x, R.y + O.height);
                        const ft = G >= z.length - 1 ? () => {
                            yr(),
                                gr()
                        }
                            : void 0;
                        mr(R.x, R.y + O.height / 2, {
                            onComplete: ft
                        }),
                            T.push(R),
                            Ia(),
                            x = Zt - f - 530,
                            x < 0 && (x = 0),
                            p.splice(M, 1),
                            ze()
                    }
                }
            }
        }
        )
}
)();
export { it as $, Go as A, st as B, ut as C, X as D, B as E, Jn as F, ei as G, Ft as H, oo as I, Wr as J, ot as K, el as L, D as M, cl as N, _s as O, pt as P, K as Q, Ni as R, nr as S, At as T, Ns as U, Ml as V, Dr as W, xi as X, zr as Y, Rh as Z, Be as _, vo as a, Bh as a0, so as a1, Oo as a2, U as a3, V as a4, Fl as a5, Xo as a6, Kl as a7, wc as a8, Sc as a9, Ec as aa, Mc as ab, Ic as ac, Jo as ad, sn as ae, tn as af, Ce as ag, Id as ah, kn as ai, Ht as aj, Fu as ak, j as al, qs as am, eh as an, Tt as ao, Un as ap, sa as aq, mt as b, Fc as c, Xl as d, lt as e, en as f, Vl as g, re as h, Ds as i, rr as j, Fo as k, po as l, Rt as m, Mo as n, fs as o, bc as p, Ac as q, mh as r, kc as s, Pc as t, tt as u, W as v, q as w, th as x, Bc as y, Et as z };
