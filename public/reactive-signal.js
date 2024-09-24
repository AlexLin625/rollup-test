!(function (e, n) {
    "object" == typeof exports && "undefined" != typeof module
        ? n(exports)
        : "function" == typeof define && define.amd
        ? define(["exports"], n)
        : n(((e || self).ReactiveSignal = {}));
})(this, function (e) {
    function n(e, n) {
        for (var t = 0; t < n.length; t++) {
            var s = n[t];
            (s.enumerable = s.enumerable || !1),
                (s.configurable = !0),
                "value" in s && (s.writable = !0),
                Object.defineProperty(e, i(s.key), s);
        }
    }
    function t(e, t, i) {
        return (
            t && n(e.prototype, t),
            i && n(e, i),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
        );
    }
    function i(e) {
        var n = (function (e) {
            if ("object" != typeof e || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var t = n.call(e, "string");
                if ("object" != typeof t) return t;
                throw new TypeError(
                    "@@toPrimitive must return a primitive value.",
                );
            }
            return String(e);
        })(e);
        return "symbol" == typeof n ? n : n + "";
    }
    var s = null,
        o = !1,
        r = new Set(),
        u = null;
    function c() {
        return u;
    }
    var f = /*#__PURE__*/ (function () {
            function e(e) {
                (this._value = void 0),
                    (this.subscribers = new Set()),
                    (this.depsComponents = new Set()),
                    (this.notifying = !1),
                    (this._value = e);
            }
            var n = e.prototype;
            return (
                (n.peek = function () {
                    return this._value;
                }),
                (n.update = function () {
                    this.notify(),
                        this.depsComponents.forEach(function (e) {
                            var n;
                            return null == (n = e[e._tempActiveUpdateFnName])
                                ? void 0
                                : n.call(e);
                        }),
                        this.subscribers.forEach(function (e) {
                            e.computedInstance &&
                                e.computedInstance.subscribers.forEach(
                                    function (e) {
                                        e.done = !1;
                                    },
                                ),
                                (e.done = !1);
                        });
                }),
                (n.subscribe = function (e) {
                    this.subscribers.add(e);
                }),
                (n.unsubscribe = function (e) {
                    this.subscribers.delete(e);
                }),
                (n.notify = function () {
                    o
                        ? this.subscribers.forEach(function (e) {
                              return r.add(e);
                          })
                        : ((this.notifying = !0),
                          this.subscribers.forEach(function (e) {
                              "function" != typeof e ||
                                  e.done ||
                                  ((e.done = !0), e());
                          }),
                          (this.notifying = !1));
                }),
                t(e, [
                    {
                        key: "value",
                        get: function () {
                            this.notifying ||
                                (s &&
                                    (s.run && this.subscribe(s.run),
                                    s.addDependency(this)));
                            var e = c();
                            return e && this.depsComponents.add(e), this._value;
                        },
                        set: function (e) {
                            e !== this._value &&
                                ((this._value = e), this.update());
                        },
                    },
                ])
            );
        })(),
        a = /*#__PURE__*/ (function () {
            function e(e) {
                var n = this;
                (this.computeFn = void 0),
                    (this._value = void 0),
                    (this.dependencies = new Set()),
                    (this.subscribers = new Set()),
                    (this.depsComponents = new Set()),
                    (this.notifying = !1),
                    (this.recompute = function () {
                        var e = n.compute();
                        e !== n._value &&
                            ((n._value = e),
                            n.notify(),
                            n.depsComponents.forEach(function (e) {
                                var n;
                                return null ==
                                    (n = e[e._tempActiveUpdateFnName])
                                    ? void 0
                                    : n.call(e);
                            }));
                    }),
                    (this.computeFn = e),
                    (this._value = this.compute());
            }
            var n = e.prototype;
            return (
                (n.peek = function () {
                    return this._value;
                }),
                (n.compute = function () {
                    var e = s;
                    s = this;
                    var n = this.computeFn();
                    return (s = e), n;
                }),
                (n.subscribe = function (e) {
                    e && this.subscribers.add(e);
                }),
                (n.unsubscribe = function (e) {
                    this.subscribers.delete(e);
                }),
                (n.notify = function () {
                    o
                        ? this.subscribers.forEach(function (e) {
                              return r.add(e);
                          })
                        : ((this.notifying = !0),
                          this.subscribers.forEach(function (e) {
                              e.done || ((e.done = !0), e());
                          }),
                          (this.notifying = !1));
                }),
                (n.addDependency = function (e) {
                    this.dependencies.add(e),
                        e.subscribe(this.recompute),
                        (this.recompute.computedInstance = this);
                }),
                t(e, [
                    {
                        key: "value",
                        get: function () {
                            this.notifying ||
                                (s &&
                                    (this.subscribe(s.run),
                                    s.addDependency(this)));
                            var e = c();
                            return e && this.depsComponents.add(e), this._value;
                        },
                    },
                ])
            );
        })(),
        d = /*#__PURE__*/ (function () {
            function e(e) {
                var n = this;
                (this.effectFn = void 0),
                    (this.dependencies = new Set()),
                    (this.disposed = !1),
                    (this.run = function () {
                        if (!n.disposed) {
                            var e = s;
                            (s = n), n.effectFn(), (s = e);
                        }
                    }),
                    (this.effectFn = e),
                    this.run();
            }
            var n = e.prototype;
            return (
                (n.addDependency = function (e) {
                    this.disposed ||
                        (this.dependencies.add(e),
                        (this.run.effectInstance = this),
                        e.subscribe(this.run));
                }),
                (n.cleanup = function () {
                    var e = this;
                    this.dependencies.forEach(function (n) {
                        return n.unsubscribe(e.run);
                    }),
                        this.dependencies.clear();
                }),
                (n.dispose = function () {
                    this.cleanup(), (this.disposed = !0);
                }),
                e
            );
        })();
    function h(e) {
        return new f(e);
    }
    (e.batch = function (e) {
        o = !0;
        try {
            e();
        } finally {
            (o = !1),
                r.forEach(function (e) {
                    e.done || ((e.done = !0), e());
                }),
                r.forEach(function (e) {
                    e.done = !1;
                }),
                r.clear();
        }
    }),
        (e.clearActiveComponent = function () {
            u = null;
        }),
        (e.computed = function (e) {
            return new a(e);
        }),
        (e.effect = function (e) {
            var n = new d(e);
            return function () {
                return n.dispose();
            };
        }),
        (e.getActiveComponent = c),
        (e.setActiveComponent = function (e, n) {
            (u = e)._tempActiveUpdateFnName = n || "queuedUpdate";
        }),
        (e.signal = h),
        (e.signalObject = function (e) {
            return Object.entries(e).reduce(function (e, n) {
                return (e[n[0]] = h(n[1])), e;
            }, {});
        });
});
//# sourceMappingURL=index.umd.js.map
