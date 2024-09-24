(function (y, p) {
    typeof exports == "object" && typeof module < "u"
        ? p(exports, require("omi"))
        : typeof define == "function" && define.amd
        ? define(["exports", "omi"], p)
        : ((y = typeof globalThis < "u" ? globalThis : y || self),
          p((y.index = {}), y.Omi));
})(this, function (y, p) {
    "use strict";
    function I(e) {
        for (var t = [], r = 0; r < e.length; ) {
            var i = e[r];
            if (i === "*" || i === "+" || i === "?") {
                t.push({ type: "MODIFIER", index: r, value: e[r++] });
                continue;
            }
            if (i === "\\") {
                t.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
                continue;
            }
            if (i === "{") {
                t.push({ type: "OPEN", index: r, value: e[r++] });
                continue;
            }
            if (i === "}") {
                t.push({ type: "CLOSE", index: r, value: e[r++] });
                continue;
            }
            if (i === ":") {
                for (var s = "", a = r + 1; a < e.length; ) {
                    var n = e.charCodeAt(a);
                    if (
                        (n >= 48 && n <= 57) ||
                        (n >= 65 && n <= 90) ||
                        (n >= 97 && n <= 122) ||
                        n === 95
                    ) {
                        s += e[a++];
                        continue;
                    }
                    break;
                }
                if (!s)
                    throw new TypeError("Missing parameter name at ".concat(r));
                t.push({ type: "NAME", index: r, value: s }), (r = a);
                continue;
            }
            if (i === "(") {
                var o = 1,
                    g = "",
                    a = r + 1;
                if (e[a] === "?")
                    throw new TypeError(
                        'Pattern cannot start with "?" at '.concat(a),
                    );
                for (; a < e.length; ) {
                    if (e[a] === "\\") {
                        g += e[a++] + e[a++];
                        continue;
                    }
                    if (e[a] === ")") {
                        if ((o--, o === 0)) {
                            a++;
                            break;
                        }
                    } else if (e[a] === "(" && (o++, e[a + 1] !== "?"))
                        throw new TypeError(
                            "Capturing groups are not allowed at ".concat(a),
                        );
                    g += e[a++];
                }
                if (o) throw new TypeError("Unbalanced pattern at ".concat(r));
                if (!g) throw new TypeError("Missing pattern at ".concat(r));
                t.push({ type: "PATTERN", index: r, value: g }), (r = a);
                continue;
            }
            t.push({ type: "CHAR", index: r, value: e[r++] });
        }
        return t.push({ type: "END", index: r, value: "" }), t;
    }
    function q(e, t) {
        t === void 0 && (t = {});
        for (
            var r = I(e),
                i = t.prefixes,
                s = i === void 0 ? "./" : i,
                a = t.delimiter,
                n = a === void 0 ? "/#?" : a,
                o = [],
                g = 0,
                E = 0,
                d = "",
                u = function (l) {
                    if (E < r.length && r[E].type === l) return r[E++].value;
                },
                O = function (l) {
                    var h = u(l);
                    if (h !== void 0) return h;
                    var w = r[E],
                        S = w.type,
                        z = w.index;
                    throw new TypeError(
                        "Unexpected "
                            .concat(S, " at ")
                            .concat(z, ", expected ")
                            .concat(l),
                    );
                },
                T = function () {
                    for (var l = "", h; (h = u("CHAR") || u("ESCAPED_CHAR")); )
                        l += h;
                    return l;
                },
                H = function (l) {
                    for (var h = 0, w = n; h < w.length; h++) {
                        var S = w[h];
                        if (l.indexOf(S) > -1) return !0;
                    }
                    return !1;
                },
                P = function (l) {
                    var h = o[o.length - 1],
                        w = l || (h && typeof h == "string" ? h : "");
                    if (h && !w)
                        throw new TypeError(
                            'Must have text between two parameters, missing text after "'.concat(
                                h.name,
                                '"',
                            ),
                        );
                    return !w || H(w)
                        ? "[^".concat(m(n), "]+?")
                        : "(?:(?!".concat(m(w), ")[^").concat(m(n), "])+?");
                };
            E < r.length;

        ) {
            var R = u("CHAR"),
                f = u("NAME"),
                A = u("PATTERN");
            if (f || A) {
                var v = R || "";
                s.indexOf(v) === -1 && ((d += v), (v = "")),
                    d && (o.push(d), (d = "")),
                    o.push({
                        name: f || g++,
                        prefix: v,
                        suffix: "",
                        pattern: A || P(v),
                        modifier: u("MODIFIER") || "",
                    });
                continue;
            }
            var c = R || u("ESCAPED_CHAR");
            if (c) {
                d += c;
                continue;
            }
            d && (o.push(d), (d = ""));
            var b = u("OPEN");
            if (b) {
                var v = T(),
                    x = u("NAME") || "",
                    M = u("PATTERN") || "",
                    C = T();
                O("CLOSE"),
                    o.push({
                        name: x || (M ? g++ : ""),
                        pattern: x && !M ? P(v) : M,
                        prefix: v,
                        suffix: C,
                        modifier: u("MODIFIER") || "",
                    });
                continue;
            }
            O("END");
        }
        return o;
    }
    function m(e) {
        return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    }
    function D(e) {
        return e && e.sensitive ? "" : "i";
    }
    function $(e, t) {
        if (!t) return e;
        for (
            var r = /\((?:\?<(.*?)>)?(?!\?)/g, i = 0, s = r.exec(e.source);
            s;

        )
            t.push({
                name: s[1] || i++,
                prefix: "",
                suffix: "",
                modifier: "",
                pattern: "",
            }),
                (s = r.exec(e.source));
        return e;
    }
    function j(e, t, r) {
        var i = e.map(function (s) {
            return N(s, t, r).source;
        });
        return new RegExp("(?:".concat(i.join("|"), ")"), D(r));
    }
    function W(e, t, r) {
        return F(q(e, r), t, r);
    }
    function F(e, t, r) {
        r === void 0 && (r = {});
        for (
            var i = r.strict,
                s = i === void 0 ? !1 : i,
                a = r.start,
                n = a === void 0 ? !0 : a,
                o = r.end,
                g = o === void 0 ? !0 : o,
                E = r.encode,
                d =
                    E === void 0
                        ? function (h) {
                              return h;
                          }
                        : E,
                u = r.delimiter,
                O = u === void 0 ? "/#?" : u,
                T = r.endsWith,
                H = T === void 0 ? "" : T,
                P = "[".concat(m(H), "]|$"),
                R = "[".concat(m(O), "]"),
                f = n ? "^" : "",
                A = 0,
                v = e;
            A < v.length;
            A++
        ) {
            var c = v[A];
            if (typeof c == "string") f += m(d(c));
            else {
                var b = m(d(c.prefix)),
                    x = m(d(c.suffix));
                if (c.pattern)
                    if ((t && t.push(c), b || x))
                        if (c.modifier === "+" || c.modifier === "*") {
                            var M = c.modifier === "*" ? "?" : "";
                            f += "(?:"
                                .concat(b, "((?:")
                                .concat(c.pattern, ")(?:")
                                .concat(x)
                                .concat(b, "(?:")
                                .concat(c.pattern, "))*)")
                                .concat(x, ")")
                                .concat(M);
                        } else
                            f += "(?:"
                                .concat(b, "(")
                                .concat(c.pattern, ")")
                                .concat(x, ")")
                                .concat(c.modifier);
                    else {
                        if (c.modifier === "+" || c.modifier === "*")
                            throw new TypeError(
                                'Can not repeat "'.concat(
                                    c.name,
                                    '" without a prefix and suffix',
                                ),
                            );
                        f += "(".concat(c.pattern, ")").concat(c.modifier);
                    }
                else f += "(?:".concat(b).concat(x, ")").concat(c.modifier);
            }
        }
        if (g)
            s || (f += "".concat(R, "?")),
                (f += r.endsWith ? "(?=".concat(P, ")") : "$");
        else {
            var C = e[e.length - 1],
                l =
                    typeof C == "string"
                        ? R.indexOf(C[C.length - 1]) > -1
                        : C === void 0;
            s || (f += "(?:".concat(R, "(?=").concat(P, "))?")),
                l || (f += "(?=".concat(R, "|").concat(P, ")"));
        }
        return new RegExp(f, D(r));
    }
    function N(e, t, r) {
        return e instanceof RegExp
            ? $(e, t)
            : Array.isArray(e)
            ? j(e, t, r)
            : W(e, t, r);
    }
    var L = Object.defineProperty,
        U = Object.getOwnPropertyDescriptor,
        Q = (e, t, r, i) => {
            for (
                var s = i > 1 ? void 0 : i ? U(t, r) : t, a = e.length - 1, n;
                a >= 0;
                a--
            )
                (n = e[a]) && (s = (i ? n(t, r, s) : n(s)) || s);
            return i && s && L(t, r, s), s;
        };
    p.mixin({ router: null });
    let _ = class extends p.Component {
        constructor() {
            super(...arguments),
                (this.currentRoute = null),
                (this.routes = []),
                (this.isHashMode = !0),
                (this.params = {}),
                (this.query = {}),
                (this.hash = ""),
                (this.base = "");
        }
        install() {
            p.mixin({ router: this }),
                (this.base = this.props.base || ""),
                (this.isHashMode = this.props.hash !== !1),
                (this.routes = this.props.routes.map((e) => {
                    const t = [];
                    if (
                        (e.render && (e.render = e.render.bind(this)),
                        e.path === "*")
                    )
                        return { ...e, regex: /(.*)/ };
                    const r = N(e.path, t);
                    return { ...e, keys: t, regex: r };
                })),
                (window.onpopstate = (e) => {
                    this.matchAndRender(this.getRoutePath());
                }),
                this.matchAndRender(this.getRoutePath());
        }
        getRoutePath() {
            return this.isHashMode
                ? window.location.hash.split("?")[0].replace("#", "") || "/"
                : window.location.pathname;
        }
        getQueryPath() {
            return this.isHashMode
                ? window.location.hash.split("?")[1]
                : window.location.search;
        }
        beforeEach(e) {
            this.beforeEachCallback = e;
        }
        afterEach(e) {
            this.afterEachCallback = e;
        }
        push(e) {
            history.pushState({}, "", this.isHashMode ? `#${e}` : e),
                this.matchAndRender(e);
        }
        replace(e) {
            history.replaceState({}, "", e), this.matchAndRender(e);
        }
        go(e) {
            history.go(e);
        }
        back() {
            history.back();
        }
        forward() {
            history.forward();
        }
        matchAndRender(e) {
            var t, r;
            for (const i of this.routes) {
                const s = (t = i.regex) == null ? void 0 : t.exec(e);
                if (s) {
                    if (i.redirect) {
                        if (this.isHashMode) window.location.hash = i.redirect;
                        else {
                            const n = this.base + i.redirect;
                            window.location.href = window.location.origin + n;
                        }
                        return;
                    }
                    if (this.beforeEachCallback) {
                        const n = this.beforeEachCallback(
                            { path: e },
                            { path: window.location.pathname },
                        );
                        if (n === !1) return;
                        if (typeof n == "string") {
                            this.push(n);
                            return;
                        } else if (typeof n == "object") {
                            this.push(n.path);
                            return;
                        }
                    }
                    if (
                        i.beforeEnter &&
                        i.beforeEnter(
                            { path: e },
                            { path: window.location.pathname },
                        ) === !1
                    )
                        return;
                    (this.currentRoute = i),
                        (this.params = {}),
                        (r = i.keys) == null ||
                            r.forEach((n, o) => {
                                this.params[n.name] = s[o + 1];
                            });
                    const a = new URLSearchParams(this.getQueryPath());
                    (this.query = {}),
                        Array.from(a.entries()).forEach(([n, o]) => {
                            this.query[n] = o;
                        }),
                        (this.hash = window.location.hash),
                        this.afterEachCallback &&
                            this.afterEachCallback(
                                { path: e },
                                { path: window.location.pathname },
                            ),
                        this.update();
                    break;
                }
            }
        }
        render() {
            return this.currentRoute && this.currentRoute.render
                ? this.currentRoute.render(this)
                : null;
        }
    };
    _ = Q([p.tag("router-view")], _);
    class V {
        constructor(t) {
            (this.params = {}),
                (this.query = {}),
                (this.hash = ""),
                (this.currentRoute = null),
                (this.el = p.render(
                    p.h("router-view", {
                        onInstall: (r) => {
                            r.detail.constructor.css = t.css;
                        },
                        routes: t.routes,
                        base: t.base,
                        hash: t.hash,
                    }),
                    t.renderTo,
                ));
        }
        beforeEach(t) {
            this.el.beforeEach(t);
        }
        afterEach(t) {
            this.el.afterEach(t);
        }
        push(t) {
            this.el.push(t);
        }
        replace(t) {
            this.el.replace(t);
        }
        go(t) {
            this.el.go(t);
        }
        back() {
            this.el.back();
        }
        forward() {
            this.el.forward();
        }
    }
    (y.Router = V),
        Object.defineProperty(y, Symbol.toStringTag, { value: "Module" });
});
