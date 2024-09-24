!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? t(exports, require("weakmap-polyfill"), require("reactive-signal"))
        : "function" == typeof define && define.amd
        ? define(["exports", "weakmap-polyfill", "reactive-signal"], t)
        : t(((e || self).Omi = {}), 0, e.reactiveSignal);
})(this, function (e, t, n) {
    function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
        return r;
    }
    function o(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(e, l(r.key), r);
        }
    }
    function i() {
        return (
            (i = Object.assign
                ? Object.assign.bind()
                : function (e) {
                      for (var t = 1; t < arguments.length; t++) {
                          var n = arguments[t];
                          for (var r in n)
                              ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
                      }
                      return e;
                  }),
            i.apply(null, arguments)
        );
    }
    function s(e) {
        return (
            (s = Object.setPrototypeOf
                ? Object.getPrototypeOf.bind()
                : function (e) {
                      return e.__proto__ || Object.getPrototypeOf(e);
                  }),
            s(e)
        );
    }
    function c(e, t) {
        (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            u(e, t);
    }
    function a() {
        try {
            var e = !Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {}),
            );
        } catch (e) {}
        return (a = function () {
            return !!e;
        })();
    }
    function u(e, t) {
        return (
            (u = Object.setPrototypeOf
                ? Object.setPrototypeOf.bind()
                : function (e, t) {
                      return (e.__proto__ = t), e;
                  }),
            u(e, t)
        );
    }
    function l(e) {
        var t = (function (e, t) {
            if ("object" != typeof e || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(e, "string");
                if ("object" != typeof r) return r;
                throw new TypeError(
                    "@@toPrimitive must return a primitive value.",
                );
            }
            return String(e);
        })(e);
        return "symbol" == typeof t ? t : t + "";
    }
    function f(e) {
        var t = "function" == typeof Map ? new Map() : void 0;
        return (
            (f = function (e) {
                if (
                    null === e ||
                    !(function (e) {
                        try {
                            return (
                                -1 !==
                                Function.toString
                                    .call(e)
                                    .indexOf("[native code]")
                            );
                        } catch (t) {
                            return "function" == typeof e;
                        }
                    })(e)
                )
                    return e;
                if ("function" != typeof e)
                    throw new TypeError(
                        "Super expression must either be null or a function",
                    );
                if (void 0 !== t) {
                    if (t.has(e)) return t.get(e);
                    t.set(e, n);
                }
                function n() {
                    return (function (e, t, n) {
                        if (a())
                            return Reflect.construct.apply(null, arguments);
                        var r = [null];
                        r.push.apply(r, t);
                        var o = new (e.bind.apply(e, r))();
                        return n && u(o, n.prototype), o;
                    })(e, arguments, s(this).constructor);
                }
                return (
                    (n.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: n,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0,
                        },
                    })),
                    u(n, e)
                );
            }),
            f(e)
        );
    }
    function p(e) {
        return e.replace(/-(\w)/g, function (e, t) {
            return t.toUpperCase();
        });
    }
    function d(e) {
        return e.children;
    }
    function h(e, t) {
        null != e && ("function" == typeof e ? e(t) : (e.current = t));
    }
    function v(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    }
    !(function () {
        if (
            "undefined" != typeof document &&
            !("adoptedStyleSheets" in document)
        ) {
            var e = "ShadyCSS" in window && !ShadyCSS.nativeShadow,
                t = document.implementation.createHTMLDocument("boot"),
                n = new WeakMap(),
                r = "object" == typeof DOMException ? Error : DOMException,
                o = Object.defineProperty,
                i = Array.prototype.forEach,
                s = /@import.+?;?$/gm,
                c = CSSStyleSheet.prototype;
            (c.replace = function () {
                return Promise.reject(
                    new r(
                        "Can't call replace on non-constructed CSSStyleSheets.",
                    ),
                );
            }),
                (c.replaceSync = function () {
                    throw new r(
                        "Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.",
                    );
                });
            var a = new WeakMap(),
                u = new WeakMap(),
                l = new WeakMap(),
                f = j.prototype;
            (f.replace = function (e) {
                try {
                    return this.replaceSync(e), Promise.resolve(this);
                } catch (e) {
                    return Promise.reject(e);
                }
            }),
                (f.replaceSync = function (e) {
                    if ((A(this), "string" == typeof e)) {
                        var t = this,
                            n = a.get(t).ownerNode;
                        (n.textContent = (function (e) {
                            var t = e.replace(s, "");
                            return (
                                t !== e &&
                                    console.warn(
                                        "@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418",
                                    ),
                                t.trim()
                            );
                        })(e)),
                            a.set(t, n.sheet),
                            u.get(t).forEach(function (e) {
                                e.isConnected() && P(t, O(t, e));
                            });
                    }
                }),
                o(f, "cssRules", {
                    configurable: !0,
                    enumerable: !0,
                    get: function () {
                        return A(this), a.get(this).cssRules;
                    },
                }),
                [
                    "addImport",
                    "addPageRule",
                    "addRule",
                    "deleteRule",
                    "insertRule",
                    "removeImport",
                    "removeRule",
                ].forEach(function (e) {
                    f[e] = function () {
                        var t = this;
                        A(t);
                        var n = arguments,
                            r = a.get(t),
                            o = u.get(t),
                            i = r[e].apply(r, n);
                        return (
                            o.forEach(function (r) {
                                if (r.isConnected()) {
                                    var o = O(t, r).sheet;
                                    o[e].apply(o, n);
                                }
                            }),
                            i
                        );
                    };
                }),
                o(j, Symbol.hasInstance, { configurable: !0, value: C });
            var p = { childList: !0, subtree: !0 },
                d = new WeakMap(),
                h = new WeakMap(),
                v = new WeakMap(),
                y = new WeakMap(),
                m = _.prototype;
            if (
                ((m.isConnected = function () {
                    var e = h.get(this);
                    return e instanceof Document
                        ? "loading" !== e.readyState
                        : (function (e) {
                              return "isConnected" in e
                                  ? e.isConnected
                                  : document.contains(e);
                          })(e.host);
                }),
                (m.connect = function () {
                    var e = T(this);
                    y.get(this).observe(e, p),
                        v.get(this).length > 0 && x(this),
                        R(e, function (e) {
                            k(e).connect();
                        });
                }),
                (m.disconnect = function () {
                    y.get(this).disconnect();
                }),
                (m.update = function (e) {
                    var t = this,
                        n = h.get(t) === document ? "Document" : "ShadowRoot";
                    if (!Array.isArray(e))
                        throw new TypeError(
                            "Failed to set the 'adoptedStyleSheets' property on " +
                                n +
                                ": Iterator getter is not callable.",
                        );
                    if (!e.every(C))
                        throw new TypeError(
                            "Failed to set the 'adoptedStyleSheets' property on " +
                                n +
                                ": Failed to convert value to 'CSSStyleSheet'",
                        );
                    if (e.some(E))
                        throw new TypeError(
                            "Failed to set the 'adoptedStyleSheets' property on " +
                                n +
                                ": Can't adopt non-constructed stylesheets",
                        );
                    t.sheets = e;
                    var r,
                        o,
                        i = v.get(t),
                        s = (r = e).filter(function (e, t) {
                            return r.indexOf(e) === t;
                        });
                    ((o = s),
                    i.filter(function (e) {
                        return -1 === o.indexOf(e);
                    })).forEach(function (e) {
                        var n;
                        (n = O(e, t)).parentNode.removeChild(n),
                            (function (e, t) {
                                l.get(e).delete(t),
                                    u.set(
                                        e,
                                        u.get(e).filter(function (e) {
                                            return e !== t;
                                        }),
                                    );
                            })(e, t);
                    }),
                        v.set(t, s),
                        t.isConnected() && s.length > 0 && x(t);
                }),
                (window.CSSStyleSheet = j),
                N(Document),
                "ShadowRoot" in window)
            ) {
                N(ShadowRoot);
                var b = Element.prototype,
                    g = b.attachShadow;
                b.attachShadow = function (e) {
                    var t = g.call(this, e);
                    return "closed" === e.mode && n.set(this, t), t;
                };
            }
            var S = k(document);
            S.isConnected()
                ? S.connect()
                : document.addEventListener(
                      "DOMContentLoaded",
                      S.connect.bind(S),
                  );
        }
        function w(e) {
            return e.shadowRoot || n.get(e);
        }
        function C(e) {
            return (
                "object" == typeof e &&
                (f.isPrototypeOf(e) || c.isPrototypeOf(e))
            );
        }
        function E(e) {
            return "object" == typeof e && c.isPrototypeOf(e);
        }
        function O(e, t) {
            return l.get(e).get(t);
        }
        function P(e, t) {
            requestAnimationFrame(function () {
                var n, r;
                !(function (e) {
                    for (var t = 0; t < e.cssRules.length; t++) e.deleteRule(0);
                })(t.sheet),
                    (n = a.get(e)),
                    (r = t.sheet),
                    i.call(n.cssRules, function (e, t) {
                        r.insertRule(e.cssText, t);
                    });
            });
        }
        function A(e) {
            if (!a.has(e)) throw new TypeError("Illegal invocation");
        }
        function j() {
            var e = this,
                n = document.createElement("style");
            t.body.appendChild(n),
                a.set(e, n.sheet),
                u.set(e, []),
                l.set(e, new WeakMap());
        }
        function k(e) {
            var t = d.get(e);
            return t || ((t = new _(e)), d.set(e, t)), t;
        }
        function N(e) {
            o(e.prototype, "adoptedStyleSheets", {
                configurable: !0,
                enumerable: !0,
                get: function () {
                    return k(this).sheets;
                },
                set: function (e) {
                    k(this).update(e);
                },
            });
        }
        function R(e, t) {
            for (
                var n = document.createNodeIterator(
                        e,
                        NodeFilter.SHOW_ELEMENT,
                        function (e) {
                            return w(e)
                                ? NodeFilter.FILTER_ACCEPT
                                : NodeFilter.FILTER_REJECT;
                        },
                        null,
                        !1,
                    ),
                    r = void 0;
                (r = n.nextNode());

            )
                t(w(r));
        }
        function T(e) {
            var t = h.get(e);
            return t instanceof Document ? t.body : t;
        }
        function x(e) {
            var t = document.createDocumentFragment(),
                n = v.get(e),
                r = y.get(e),
                o = T(e);
            r.disconnect(),
                n.forEach(function (n) {
                    t.appendChild(
                        O(n, e) ||
                            (function (e, t) {
                                var n = document.createElement("style");
                                return l.get(e).set(t, n), u.get(e).push(t), n;
                            })(n, e),
                    );
                }),
                o.insertBefore(t, null),
                r.observe(o, p),
                n.forEach(function (t) {
                    P(t, O(t, e));
                });
        }
        function _(t) {
            var n = this;
            (n.sheets = []),
                h.set(n, t),
                v.set(n, []),
                y.set(
                    n,
                    new MutationObserver(function (t, r) {
                        document
                            ? t.forEach(function (t) {
                                  e ||
                                      i.call(t.addedNodes, function (e) {
                                          e instanceof Element &&
                                              R(e, function (e) {
                                                  k(e).connect();
                                              });
                                      }),
                                      i.call(t.removedNodes, function (t) {
                                          t instanceof Element &&
                                              ((function (e, t) {
                                                  return (
                                                      t instanceof
                                                          HTMLStyleElement &&
                                                      v
                                                          .get(e)
                                                          .some(function (t) {
                                                              return O(t, e);
                                                          })
                                                  );
                                              })(n, t) && x(n),
                                              e ||
                                                  R(t, function (e) {
                                                      k(e).disconnect();
                                                  }));
                                      });
                              })
                            : r.disconnect();
                    }),
                );
        }
    })(),
        (function () {
            var e = "undefined" != typeof window ? window : global;
            if (
                void 0 !== e.Reflect &&
                void 0 !== e.customElements &&
                !e.customElements.hasOwnProperty("polyfillWrapFlushCallback")
            ) {
                var t = e.HTMLElement;
                (e.HTMLElement = function () {
                    return Reflect.construct(t, [], this.constructor);
                }),
                    (HTMLElement.prototype = t.prototype),
                    (HTMLElement.prototype.constructor = HTMLElement),
                    Object.setPrototypeOf(HTMLElement, t);
            }
        })();
    var y = /\B([A-Z])/g;
    function m(e) {
        var t = new CSSStyleSheet();
        return t.replaceSync(e), t;
    }
    function b(e, t) {
        return (
            e.normalizedNodeName === t ||
            e.nodeName.toLowerCase() === t.toLowerCase()
        );
    }
    function g(e) {
        return "object" == typeof e && !Array.isArray(e) && null !== e;
    }
    function S(e) {
        return !!/^class\s/.test(e.toString()) || !1;
    }
    function w(e, t, n) {
        var r = Object.assign({ merge: "uniqueMerge", default: null }, n),
            o = S(e) ? e : e.constructor,
            i = o[t],
            s = g(i) ? 0 : Array.isArray(i) ? 1 : 2;
        if ("none" === r.merge || 2 === s) return i;
        for (
            var c = 0 === s ? Object.assign({}, r.default) : r.default, a = [i];
            o && (o = o.__proto__)[t];

        )
            a.push(o[t]);
        var u = i;
        return (
            (u =
                0 === s
                    ? a.reduce(function (e, t) {
                          return g(t) ? Object.assign({}, c, t, e) : e;
                      }, {})
                    : a.reduce(function (e, t) {
                          return Array.isArray(t) && e.push.apply(e, t), e;
                      }, [])),
            Array.isArray(u) &&
                "uniqueMerge" === r.merge &&
                ((u = Array.from(new Set(u))),
                g(c) &&
                    u.forEach(function (e, t) {
                        g(e) && (u[t] = Object.assign({}, c, e));
                    })),
            u || c
        );
    }
    function C(e, t) {
        e.hooks || (e.hooks = {}),
            Object.entries(t).forEach(function (t) {
                var n = t[0],
                    r = t[1];
                e.hooks[n] || (e.hooks[n] = []), e.hooks[n].push(r);
            });
    }
    function E(e, t) {
        var n;
        if (
            (t ? (t.ignoreAttrs = !0) : (t = { ignoreAttrs: !0 }),
            arguments.length > 2
                ? (n = [].slice.call(arguments, 2).flat())
                : null != t.children && ((n = t.children), delete t.children),
            e === d)
        )
            return n;
        if ("function" == typeof e) {
            if (!e.tagName) return n && (t.children = n), e(t);
            e = e.tagName;
        }
        return { nodeName: e, children: n, attributes: t, key: t.key };
    }
    Array.prototype.flat ||
        (Array.prototype.flat = function (e) {
            void 0 === e && (e = 1);
            var t = [];
            return (
                (function n(o, i) {
                    for (
                        var s,
                            c = (function (e, t) {
                                var n =
                                    ("undefined" != typeof Symbol &&
                                        e[Symbol.iterator]) ||
                                    e["@@iterator"];
                                if (n) return (n = n.call(e)).next.bind(n);
                                if (
                                    Array.isArray(e) ||
                                    (n = (function (e, t) {
                                        if (e) {
                                            if ("string" == typeof e)
                                                return r(e, t);
                                            var n = {}.toString
                                                .call(e)
                                                .slice(8, -1);
                                            return (
                                                "Object" === n &&
                                                    e.constructor &&
                                                    (n = e.constructor.name),
                                                "Map" === n || "Set" === n
                                                    ? Array.from(e)
                                                    : "Arguments" === n ||
                                                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                                          n,
                                                      )
                                                    ? r(e, t)
                                                    : void 0
                                            );
                                        }
                                    })(e))
                                ) {
                                    n && (e = n);
                                    var o = 0;
                                    return function () {
                                        return o >= e.length
                                            ? { done: !0 }
                                            : { done: !1, value: e[o++] };
                                    };
                                }
                                throw new TypeError(
                                    "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
                                );
                            })(o);
                        !(s = c()).done;

                    ) {
                        var a = s.value;
                        Array.isArray(a) && i < e ? n(a, i + 1) : t.push(a);
                    }
                })(this, 0),
                t
            );
        }),
        (E.f = d);
    var O = {
            onanimationcancel: 1,
            oncompositionend: 1,
            oncompositionstart: 1,
            oncompositionupdate: 1,
            onfocusin: 1,
            onfocusout: 1,
            onscrollend: 1,
            ontouchcancel: 1,
            ontouchend: 1,
            ontouchmove: 1,
            ontouchstart: 1,
        },
        P = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
        A = {};
    function j(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function k(e, t, n, r, o) {
        if (
            ("className" === t && (t = "class"),
            "o" == t[0] &&
                "-" == t[1] &&
                Promise.resolve().then(function () {
                    var n;
                    null == (n = A[t]) || n.call(A, e, r);
                }),
            "key" === t || "ignoreAttrs" === t)
        );
        else if ("ref" === t) h(n, null), h(r, e);
        else if ("class" !== t || o)
            if ("style" === t)
                if ("string" == typeof r) e.style.cssText = r;
                else {
                    if (("string" == typeof n && (e.style.cssText = n = ""), n))
                        for (t in n) (r && t in r) || R(e.style, t, "");
                    if (r)
                        for (t in r)
                            (n && r[t] === n[t]) || R(e.style, t, r[t]);
                }
            else if ("unsafeHTML" === t) r && (e.innerHTML = r.html || r || "");
            else if ("o" == t[0] && "n" == t[1])
                !(function (e, t, n, r) {
                    var o = t !== (t = t.replace(/Capture$/, "")),
                        i = t.toLowerCase();
                    (t = (O[i] || i in e ? i : t).slice(2)),
                        n
                            ? r || e.addEventListener(t, N, o)
                            : e.removeEventListener(t, N, o),
                        ((e._listeners || (e._listeners = {}))[t] = n);
                })(e, t, r, n);
            else if ("INPUT" === e.nodeName && "value" === t)
                e.value = null == r ? "" : r;
            else if (
                "list" !== t &&
                "type" !== t &&
                "css" !== t &&
                !o &&
                t in e
            ) {
                try {
                    e[t] = null == r ? "" : r;
                } catch (e) {}
                (null != r && !1 !== r) ||
                    "spellcheck" == t ||
                    e.removeAttribute(t);
            } else {
                var i = o && t !== (t = t.replace(/^xlink:?/, ""));
                if (null == r || !1 === r)
                    i
                        ? e.removeAttributeNS(
                              "http://www.w3.org/1999/xlink",
                              t.toLowerCase(),
                          )
                        : e.removeAttribute(t);
                else if ("function" != typeof r)
                    if (i)
                        e.setAttributeNS(
                            "http://www.w3.org/1999/xlink",
                            t.toLowerCase(),
                            r,
                        );
                    else if ("Component" === e.constructor.is) {
                        var s,
                            c =
                                null == (s = e.constructor.reflectProps)
                                    ? void 0
                                    : s[t];
                        c &&
                            e.setAttribute(
                                t,
                                "function" == typeof c ? c(r) : r,
                            );
                    } else e.setAttribute(t, r);
            }
        else e.className = r || "";
    }
    function N(e) {
        return this._listeners[e.type](e);
    }
    function R(e, t, n) {
        "-" === t[0]
            ? e.setProperty(t, null == n ? "" : n.toString())
            : (e[t] =
                  null == n
                      ? ""
                      : "number" != typeof n || P.test(t)
                      ? n.toString()
                      : n + "px");
    }
    var T = 0,
        x = !1,
        _ = !1,
        M = !1;
    function L(e, t, n, r, o) {
        return e || t
            ? (r && r.constructor.isLightDOM && (r.innerHTML = ""),
              T++ ||
                  ((x = null != n && void 0 !== n.ownerSVGElement), (M = !1)),
              v(t)
                  ? n
                      ? (I(n, t, M, r, o), (i = n.childNodes))
                      : ((i = []),
                        t.forEach(function (t, n) {
                            var s = F(0 === n ? e : null, t, r, o);
                            i.push(s);
                        }))
                  : (v(e) || e instanceof NodeList
                        ? [].concat(e).forEach(function (e, n) {
                              0 === n ? (i = F(e, t, r, o)) : D(e, !1);
                          })
                        : (i = F(e, t, r, o)),
                    n &&
                        (null == (s = i) ? void 0 : s.parentNode) !== n &&
                        n.appendChild(i)),
              --T || (M = !1),
              i)
            : null;
        var i, s;
    }
    function F(e, t, n, r) {
        e && t && e.props && (e.props.children = t.children);
        var o,
            i = e,
            s = x,
            c = _;
        if (
            ((null != t && "boolean" != typeof t) || (t = ""),
            "string" == typeof t || "number" == typeof t)
        )
            return (
                e &&
                void 0 !== e.splitText &&
                e.parentNode &&
                (!e._component || n)
                    ? e.nodeValue != t && (e.nodeValue = String(t))
                    : ((i = document.createTextNode(String(t))),
                      e &&
                          (e.parentNode &&
                              (null == (o = e.parentNode) ||
                                  o.replaceChild(i, e)),
                          D(e, !0))),
                i && (i.prevProps = {}),
                i
            );
        var a,
            u,
            l,
            f = t.nodeName;
        if (
            ((_ = "foreignObject" === f),
            (x = "svg" === f || (!_ && x)),
            (f = String(f)),
            (!e || !b(e, f)) &&
                ((u = f),
                ((l =
                    _ || x
                        ? document.createElementNS(
                              "http://www.w3.org/2000/svg",
                              u,
                          )
                        : document.createElement(u)).normalizedNodeName = u),
                "Component" ===
                    (null == (a = (i = l).constructor) ? void 0 : a.is) &&
                    Object.assign(i.props, t.attributes),
                e))
        ) {
            for (var d; e.firstChild; ) i.appendChild(e.firstChild);
            e.parentNode &&
                (null == (d = e.parentNode) || d.replaceChild(i, e)),
                D(e, !0);
        }
        var h = i.firstChild,
            v = i.prevProps,
            y = t.children;
        if (null == v) {
            v = i.prevProps = {};
            for (var m = i.attributes, g = m.length; g--; )
                v[m[g].name] = m[g].value;
        }
        return (
            !M &&
            y &&
            1 === y.length &&
            "string" == typeof y[0] &&
            null != h &&
            void 0 !== h.splitText &&
            null == h.nextSibling
                ? h.nodeValue != y[0] && (h.nodeValue = y[0])
                : ((y && y.length) || null != h) &&
                  (("Component" == i.constructor.is && i.constructor.noSlot) ||
                      I(i, y, M || null != v.unsafeHTML, n, r)),
            (function (e, t, n, r, o) {
                var i,
                    s,
                    c = e.update;
                for (i in (e.receiveProps && (s = Object.assign({}, n)), n))
                    (t && null != t[i]) ||
                        null == n[i] ||
                        (k(e, i, n[i], (n[i] = void 0), _ || x),
                        c && delete e.props[i]);
                for (i in t)
                    if (c && "object" == typeof t[i] && "ref" !== i) {
                        ("style" === i || ("o" === i[0] && "-" === i[1])) &&
                            k(e, i, n[i], (n[i] = t[i]), _ || x);
                        var a = p(i);
                        e.props[a] = n[a] = t[i];
                    } else if (
                        "children" !== i &&
                        (!(i in n) ||
                            t[i] !==
                                ("value" === i || "checked" === i
                                    ? e[i]
                                    : n[i]))
                    )
                        if (
                            (k(e, i, n[i], t[i], _ || x),
                            -1 !== e.nodeName.indexOf("-"))
                        ) {
                            e.props = e.props || {};
                            var u = p(i);
                            e.props[u] = n[u] = t[i];
                        } else n[i] = t[i];
                c &&
                    !o &&
                    e.parentNode &&
                    !1 !== e.receiveProps(e.props, s) &&
                    e.queuedUpdate();
            })(i, t.attributes, v, 0, r),
            i.props && (i.props.children = t.children),
            (x = s),
            (_ = c),
            i
        );
    }
    function I(e, t, n, r, o) {
        var i,
            s,
            c,
            a,
            u,
            l,
            f,
            p = e.childNodes,
            d = [],
            h = {},
            v = 0,
            y = 0,
            m = p.length,
            g = 0,
            S = t ? t.length : 0;
        if (0 !== m)
            for (var w = 0; w < m; w++) {
                var C,
                    E = p[w],
                    O = E.prevProps,
                    P = S && O ? O.key : null;
                null != P
                    ? (v++, (h[P] = E))
                    : (O ||
                          (void 0 !== E.splitText
                              ? !n ||
                                (null == (C = E.nodeValue) ? void 0 : C.trim())
                              : n)) &&
                      (d[g++] = E);
            }
        if (0 !== S)
            for (var A = 0; A < S; A++) {
                if (((u = null), (a = t[A]))) {
                    var k = a.key;
                    if (null != k)
                        v &&
                            void 0 !== h[k] &&
                            ((u = h[k]), (h[k] = void 0), v--);
                    else if (y < g)
                        for (i = y; i < g; i++)
                            if (
                                void 0 !== d[i] &&
                                ((l = s = d[i]),
                                "string" == typeof (f = a) ||
                                "number" == typeof f
                                    ? void 0 !== l.splitText
                                    : b(l, f.nodeName))
                            ) {
                                (u = s),
                                    (d[i] = void 0),
                                    i === g - 1 && g--,
                                    i === y && y++;
                                break;
                            }
                }
                (u = F(u, a, r, o)),
                    (c = p[A]),
                    u &&
                        u !== e &&
                        u !== c &&
                        (null == c
                            ? e.appendChild(u)
                            : u === c.nextSibling
                            ? j(c)
                            : e.insertBefore(u, c));
            }
        if (v) for (var N in h) void 0 !== h[N] && D(h[N], !1);
        for (; y <= g; ) void 0 !== (u = d[g--]) && D(u, !1);
    }
    function D(e, t) {
        null != e.prevProps &&
            e.prevProps.ref &&
            ("function" == typeof e.prevProps.ref
                ? e.prevProps.ref(null)
                : e.prevProps.ref.current && (e.prevProps.ref.current = null)),
            (!1 !== t && null != e.prevProps) || j(e),
            (function (e) {
                var t;
                for (e = null == (t = e) ? void 0 : t.lastChild; e; ) {
                    var n = e.previousSibling;
                    D(e, !0), (e = n);
                }
            })(e);
    }
    var V = { mixin: {}, globalCSS: [] },
        H = {
            define: function (e) {
                e.prototype.formAssociatedCallback = function (e) {
                    (this._form = e),
                        this._form &&
                            this._form.addEventListener(
                                "formdata",
                                this.handleFormData.bind(this),
                            );
                };
            },
            initial: function (e) {
                e.getFieldValue ||
                    (e.getFieldValue = function () {
                        var t,
                            n = {};
                        return (
                            (e._inputs =
                                null == (t = e.shadowRoot)
                                    ? void 0
                                    : t.querySelectorAll("input")),
                            e._inputs.forEach(function (e) {
                                n[e.name] = e.value;
                            }),
                            n
                        );
                    }),
                    e.resetFieldValue ||
                        (e.resetFieldValue = function () {
                            var t;
                            (e._inputs =
                                null == (t = e.shadowRoot)
                                    ? void 0
                                    : t.querySelectorAll("input")),
                                e._inputs.forEach(function (e) {
                                    e.value = "";
                                });
                        }),
                    e.handleFormData ||
                        (e.handleFormData = function (t) {
                            var n = t.formData;
                            if (n) {
                                var r = e.getFieldValue();
                                Object.entries(r).forEach(function (e) {
                                    n.append(e[0], e[1]);
                                });
                            }
                        }),
                    (e._internals = e.attachInternals());
            },
            connected: function (e) {},
        };
    function W(e, t) {
        Object.defineProperty(t, "tagName", { value: e, writable: !1 }),
            customElements.get(e)
                ? console.warn(
                      "Failed to execute 'define' on 'CustomElementRegistry': the tag name \"" +
                          e +
                          '" has already been used with this registry',
                  )
                : customElements.define(e, t);
    }
    function q(e, t) {
        var n = Object.assign({ formAssociated: !1 }, t).formAssociated;
        return function (t) {
            n &&
                (n && (C(t, H), (t.formAssociated = !0)),
                (function (e, t) {
                    var n = e._hooks ? e._hooks : w(e, "hooks") || {};
                    if ((S(e) || (e._hooks = n), t in n)) {
                        var r = n[t];
                        Array.isArray(r) &&
                            r.forEach(function (n) {
                                try {
                                    n.call(e, e);
                                } catch (n) {
                                    console.warn(
                                        "Error occurred while executing hook function " +
                                            (S(e)
                                                ? e.constructor.name
                                                : e.name) +
                                            "/" +
                                            t +
                                            ":",
                                        n,
                                    );
                                }
                            });
                    }
                })(t, "define")),
                W(e, t);
        };
    }
    var U = q,
        B = {
            initial: function (e) {
                Object.defineProperty(e, "ref", {
                    get: function () {
                        return (
                            e._ref ||
                                (e._ref = new Proxy(
                                    { current: void 0 },
                                    {
                                        set: function (t, n, r, o) {
                                            return (
                                                "current" === n &&
                                                    e.fire(
                                                        "refAttached",
                                                        { ref: r, target: e },
                                                        {
                                                            bubbles: !0,
                                                            composed: !0,
                                                        },
                                                    ),
                                                Reflect.set(t, n, r, o)
                                            );
                                        },
                                    },
                                )),
                            e._ref
                        );
                    },
                }),
                    (e._onRefAttached = function (t) {
                        var n = t.detail;
                        n.target !== e &&
                            e.props.ref &&
                            (e.props.ref.current = n.ref);
                    }),
                    e.addEventListener("refAttached", e._onRefAttached);
            },
            disconnected: function (e) {
                e.removeEventListener("refAttached", e._onRefAttached);
            },
        },
        $ = 0,
        J = new WeakMap(),
        Q = /*#__PURE__*/ (function (e) {
            function t() {
                var t;
                return (
                    ((t = e.call(this) || this).elementId = void 0),
                    (t.isInstalled = void 0),
                    (t.inject = void 0),
                    (t.injection = void 0),
                    (t.renderRoot = void 0),
                    (t.rootElement = void 0),
                    (t._hooks = void 0),
                    (t._ref = null),
                    (t.state = void 0),
                    (t.updateQueued = !1),
                    t.handleProps(),
                    C(t, B),
                    t.executeHooks("initial"),
                    (t.elementId = $++),
                    (t.isInstalled = !1),
                    (t.rootElement = null),
                    t
                );
            }
            c(t, e),
                (t.define = function (e) {
                    W(e, this);
                });
            var r,
                i,
                s,
                a = t.prototype;
            return (
                (a.executeHooks = function (e) {
                    var t = this;
                    if (e in this.hooks) {
                        var n = this.hooks[e];
                        Array.isArray(n) &&
                            n.forEach(function (n) {
                                try {
                                    n.call(t, t);
                                } catch (n) {
                                    console.warn(
                                        "Error occurred while executing hook function " +
                                            t.constructor.name +
                                            "/" +
                                            e +
                                            ":",
                                        n,
                                    );
                                }
                            });
                    }
                }),
                (a.handleProps = function () {
                    (this.constructor.defaultProps =
                        w(this, "defaultProps", { default: {} }) || {}),
                        (this.constructor.propTypes =
                            w(this, "propTypes", { default: {} }) || {}),
                        (this.constructor.reflectProps =
                            w(this, "reflectProps", { default: {} }) || {});
                    var e = w(this, "props", {
                        default: {},
                        merge: "uniqueMerge",
                    });
                    if (this.constructor.props)
                        for (var t in e) {
                            var n = e[t];
                            (this.constructor.defaultProps[t] = n.default),
                                (this.constructor.propTypes[t] = n.type),
                                (this.constructor.reflectProps[t] = n.reflect);
                        }
                    this.props = Object.assign(
                        {},
                        this.constructor.defaultProps,
                        this.props,
                    );
                }),
                (a.attributeChangedCallback = function (e, t, n) {
                    if (this.constructor.props && this.constructor.props[e]) {
                        var r = this.constructor.props[e];
                        if (r.changed) {
                            var o = this.getTypeValueOfProp(e, n),
                                i = this.getTypeValueOfProp(e, t);
                            r.changed.call(this, o, i);
                        }
                    }
                }),
                (a.setState = function (e, t) {
                    var n = this;
                    if ((void 0 === t && (t = !1), "object" != typeof e))
                        throw new Error(
                            "takes an object of state variables to update",
                        );
                    Object.keys(e).forEach(function (t) {
                        return (n.state[t] = e[t]);
                    }),
                        t || this.queuedUpdate();
                }),
                (a.injectObject = function () {
                    for (
                        var e = this, t = this.parentNode;
                        t && !this.store && !V.mixin.store;

                    )
                        (this.store = t.store), (t = t.parentNode || t.host);
                    if (this.inject) {
                        var n;
                        for (
                            this.injection = {}, t = this.parentNode;
                            t && !n;

                        )
                            (n = t.provide), (t = t.parentNode || t.host);
                        n &&
                            this.inject.forEach(function (t) {
                                e.injection[t] = n[t];
                            });
                    }
                    var r = function (t) {
                        e.hasOwnProperty(t) ||
                            Object.defineProperty(e, t, {
                                get: function () {
                                    return V.mixin[t];
                                },
                            });
                    };
                    for (var o in V.mixin) r(o);
                }),
                (a.createRenderRoot = function () {
                    if (this.constructor.isLightDOM) return this;
                    if (this.shadowRoot) {
                        for (var e; (e = this.shadowRoot.firstChild); )
                            this.shadowRoot.removeChild(e);
                        return this.shadowRoot;
                    }
                    return this.attachShadow({ mode: "open" });
                }),
                (a.applyAdoptedStyleSheets = function () {
                    if (this.constructor.isLightDOM || J.has(this.constructor))
                        this.renderRoot.adoptedStyleSheets = J.get(
                            this.constructor,
                        );
                    else {
                        var e = this.constructor.css;
                        if (e) {
                            var t = [];
                            (t =
                                "string" == typeof e
                                    ? [m(e)]
                                    : v(e)
                                    ? e.map(function (e) {
                                          return "string" == typeof e
                                              ? m(e)
                                              : e.default &&
                                                "string" == typeof e.default
                                              ? m(e.default)
                                              : e;
                                      })
                                    : e.default && "string" == typeof e.default
                                    ? [m(e.default)]
                                    : [e]),
                                (t = [].concat(V.globalCSS, t)),
                                (this.renderRoot.adoptedStyleSheets = t),
                                J.set(this.constructor, t);
                        } else
                            V.globalCSS.length &&
                                (this.renderRoot.adoptedStyleSheets =
                                    V.globalCSS);
                    }
                }),
                (a.appendStyleVNode = function (e) {
                    if (this.props.css && e) {
                        var t = {
                            nodeName: "style",
                            attributes: {},
                            children: [this.props.css],
                        };
                        e.push ? e.push(t) : e.children.push(t);
                    }
                }),
                (a.connectedCallback = function () {
                    var e = this;
                    this.injectObject(),
                        this.attrsToProps(),
                        this.install(),
                        this.fire("install", this),
                        (this.renderRoot = this.createRenderRoot()),
                        this.applyAdoptedStyleSheets(),
                        n.setActiveComponent(this),
                        this.beforeRender(),
                        this.fire("beforeRender", this);
                    var t,
                        r = this.render(this.props, this.store);
                    this.appendStyleVNode(r),
                        this.rendered(r),
                        n.clearActiveComponent(),
                        (this.rootElement = L(null, r, null, this, !1)),
                        v(this.rootElement)
                            ? this.rootElement.forEach(function (t) {
                                  var n;
                                  null == (n = e.renderRoot) ||
                                      n.appendChild(t);
                              })
                            : this.rootElement &&
                              (null == (t = this.renderRoot) ||
                                  t.appendChild(this.rootElement)),
                        this.installed(),
                        this.fire("installed", this),
                        (this.isInstalled = !0),
                        Promise.resolve().then(function () {
                            e.ready(), e.fire("ready", e);
                        }),
                        this.executeHooks("connected");
                }),
                (a.disconnectedCallback = function () {
                    this.uninstall(),
                        this.fire("uninstall", this),
                        (this.isInstalled = !1),
                        this.executeHooks("disconnected");
                }),
                (a.update = function (e) {
                    this.beforeUpdate(),
                        this.fire("beforeUpdate", this),
                        this.attrsToProps(),
                        n.setActiveComponent(this),
                        this.beforeRender(),
                        this.fire("beforeRender", this);
                    var t = this.render(this.props, this.store);
                    this.appendStyleVNode(t),
                        this.rendered(t),
                        n.clearActiveComponent(null),
                        (this.rootElement = L(
                            this.rootElement,
                            t,
                            this.renderRoot,
                            this,
                            !!e,
                        )),
                        this.updated(),
                        this.fire("updated", this);
                }),
                (a.queuedUpdate = function () {
                    var e = this;
                    this.updateQueued ||
                        ((this.updateQueued = !0),
                        Promise.resolve().then(function () {
                            e.update(), (e.updateQueued = !1);
                        }));
                }),
                (a.updateProps = function (e) {
                    var t = this;
                    Object.keys(e).forEach(function (n) {
                        (t.props[n] = e[n]),
                            t.prevProps && (t.prevProps[n] = e[n]);
                    }),
                        this.update();
                }),
                (a.updateSelf = function () {
                    this.update(!0);
                }),
                (a.removeProp = function (e) {
                    this.removeAttribute(e), this.isInstalled && this.update();
                }),
                (a.setProp = function (e, t) {
                    this.setAttribute(
                        e,
                        t && "object" == typeof t ? JSON.stringify(t) : t,
                    ),
                        this.isInstalled && this.update();
                }),
                (a.attrsToProps = function () {
                    var e = this;
                    if (!this.props.ignoreAttrs) {
                        var t = this;
                        t.props.css = t.getAttribute("css");
                        var n = this.constructor.propTypes;
                        n &&
                            Object.keys(n).forEach(function (n) {
                                var r = t.getAttribute(
                                    n.replace(y, "-$1").toLowerCase(),
                                );
                                t.props[n] =
                                    null !== r
                                        ? e.getTypeValueOfProp(n, r)
                                        : t.constructor.defaultProps &&
                                          t.constructor.defaultProps.hasOwnProperty(
                                              n,
                                          )
                                        ? t.constructor.defaultProps[n]
                                        : null;
                            });
                    }
                }),
                (a.getTypeValueOfProp = function (e, t) {
                    for (
                        var n = this.constructor.propTypes,
                            r = v(n[e]) ? n[e] : [n[e]],
                            o = 0;
                        o < r.length;
                        o++
                    )
                        switch (r[o]) {
                            case String:
                                return t;
                            case Number:
                                return Number(t);
                            case Boolean:
                                return Boolean("false" !== t && "0" !== t);
                            case Array:
                            case Object:
                                try {
                                    return JSON.parse(t);
                                } catch (n) {
                                    console.warn(
                                        "The " +
                                            e +
                                            " object prop does not comply with the JSON specification, the incorrect string is [" +
                                            t +
                                            "].",
                                    );
                                }
                        }
                }),
                (a.fire = function (e, t, n) {
                    var r = Object.assign({ bubbles: !1, composed: !1 }, n),
                        o = r.bubbles,
                        i = r.composed,
                        s =
                            this.props[
                                "on" +
                                    (function (e) {
                                        return e
                                            .replace(
                                                /\-(\w)/g,
                                                function (e, t) {
                                                    return t.toUpperCase();
                                                },
                                            )
                                            .replace(/^\S/, function (e) {
                                                return e.toUpperCase();
                                            });
                                    })(e)
                            ];
                    s
                        ? s(
                              new CustomEvent(e, {
                                  detail: t,
                                  bubbles: o,
                                  composed: i,
                              }),
                          )
                        : this.dispatchEvent(
                              new CustomEvent(e, {
                                  detail: t,
                                  bubbles: o,
                                  composed: i,
                              }),
                          );
                }),
                (a.install = function () {}),
                (a.installed = function () {}),
                (a.ready = function () {}),
                (a.uninstall = function () {}),
                (a.beforeUpdate = function () {}),
                (a.updated = function () {}),
                (a.beforeRender = function () {}),
                (a.rendered = function (e) {}),
                (a.receiveProps = function () {}),
                (r = t),
                (s = [
                    {
                        key: "observedAttributes",
                        get: function () {
                            return this.props ? Object.keys(this.props) : [];
                        },
                    },
                ]),
                (i = [
                    { key: "ref", get: function () {} },
                    {
                        key: "hooks",
                        get: function () {
                            return (
                                this._hooks ||
                                    (this._hooks = w(this, "hooks") || {}),
                                this._hooks
                            );
                        },
                    },
                ]) && o(r.prototype, i),
                s && o(r, s),
                Object.defineProperty(r, "prototype", { writable: !1 }),
                r
            );
        })(/*#__PURE__*/ f(HTMLElement));
    (Q.is = "Component"),
        (Q.defaultProps = void 0),
        (Q.reflectProps = void 0),
        (Q.propTypes = void 0),
        (Q.css = void 0),
        (Q.isLightDOM = void 0),
        (Q.noSlot = void 0),
        (Q.hooks = void 0),
        (Q.props = {}),
        (Q.formAssociated = !0);
    var z = /*#__PURE__*/ (function (e) {
        function t() {
            for (
                var t, n = arguments.length, r = new Array(n), o = 0;
                o < n;
                o++
            )
                r[o] = arguments[o];
            return (
                ((t = e.call.apply(e, [this].concat(r)) || this)._form = null),
                (t._inputs = []),
                (t._internals = null),
                t
            );
        }
        c(t, e);
        var n = t.prototype;
        return (
            (n.formAssociatedCallback = function (e) {}),
            (n.handleFormData = function (e) {}),
            (n.getFieldValue = function () {}),
            (n.handleField = function (e) {}),
            (n.formDisabledCallback = function () {}),
            (n.formResetCallback = function () {}),
            (n.formStateRestoreCallback = function (e, t) {}),
            t
        );
    })(Q);
    z.formAssociated = !1;
    var G = {}.hasOwnProperty;
    function Z() {
        for (
            var e = [].slice.call(arguments), t = [], n = 0;
            n < e.length;
            n++
        ) {
            var r = e[n];
            if (r) {
                var o = typeof r;
                if ("string" === o || "number" === o) t.push(r);
                else if (Array.isArray(r) && r.length) {
                    var i = Z.apply(void 0, r);
                    i && t.push(i);
                } else if ("object" === o)
                    for (var s in r) G.call(r, s) && r[s] && t.push(s);
            }
        }
        return t.join(" ");
    }
    var K = {};
    Object.defineProperty(e, "batch", {
        enumerable: !0,
        get: function () {
            return n.batch;
        },
    }),
        Object.defineProperty(e, "clearActiveComponent", {
            enumerable: !0,
            get: function () {
                return n.clearActiveComponent;
            },
        }),
        Object.defineProperty(e, "computed", {
            enumerable: !0,
            get: function () {
                return n.computed;
            },
        }),
        Object.defineProperty(e, "effect", {
            enumerable: !0,
            get: function () {
                return n.effect;
            },
        }),
        Object.defineProperty(e, "getActiveComponent", {
            enumerable: !0,
            get: function () {
                return n.getActiveComponent;
            },
        }),
        Object.defineProperty(e, "setActiveComponent", {
            enumerable: !0,
            get: function () {
                return n.setActiveComponent;
            },
        }),
        Object.defineProperty(e, "signal", {
            enumerable: !0,
            get: function () {
                return n.signal;
            },
        }),
        Object.defineProperty(e, "signalObject", {
            enumerable: !0,
            get: function () {
                return n.signalObject;
            },
        }),
        (e.Component = Q),
        (e.FormAssociatedComponent = z),
        (e.WeElement = Q),
        (e.bind = function (e, t, n) {
            return {
                configurable: !0,
                get: function () {
                    var e = n.value.bind(this);
                    return (
                        Object.defineProperty(this, t, {
                            value: e,
                            configurable: !0,
                            writable: !0,
                        }),
                        e
                    );
                },
            };
        }),
        (e.classNames = Z),
        (e.cloneElement = function (e, t) {
            var n = [].slice.call(arguments, 2);
            return E(
                e.nodeName,
                i({}, e.attributes, t),
                n.length > 0 ? n.flat() : e.children,
            );
        }),
        (e.createElement = E),
        (e.createRef = function () {
            return {};
        }),
        (e.css = function (e) {
            var t = [].slice.call(arguments, 1),
                n = "";
            if (
                (e.forEach(function (e, r) {
                    if (
                        void 0 !== t[r] &&
                        "string" != typeof t[r] &&
                        "number" != typeof t[r]
                    )
                        throw new Error("Unsupported value in CSS: " + t[r]);
                    n += e + (t[r] || "");
                }),
                K[n])
            )
                return K[n];
            var r = new CSSStyleSheet();
            return r.replaceSync(n), (K[n] = r), r;
        }),
        (e.define = W),
        (e.defineElement = W),
        (e.extractClass = function (e) {
            var t = [].slice.call(arguments, 1);
            if (
                (e.class
                    ? (t.unshift(e.class), delete e.class)
                    : e.className &&
                      (t.unshift(e.className), delete e.className),
                t.length > 0)
            )
                return { class: Z.apply(void 0, t) };
        }),
        (e.globalCSS = function (e) {
            V.globalCSS.includes(e) || V.globalCSS.push(e);
        }),
        (e.h = E),
        (e.mixin = function (e) {
            Object.assign(V.mixin, e);
        }),
        (e.registerDirective = function (e, t) {
            A["o-" + e] = t;
        }),
        (e.render = function (e, t, n) {
            return (
                (t = "string" == typeof t ? document.querySelector(t) : t),
                n && t && (t.store = n),
                L(null, e, t, null, !1)
            );
        }),
        (e.tag = q),
        (e.version = "7.7.1"),
        (e.webcomponent = U);

        if (typeof window !== "undefined") {
            window.omi = window.Omi;
        }
});

//# sourceMappingURL=omi.umd.js.map
