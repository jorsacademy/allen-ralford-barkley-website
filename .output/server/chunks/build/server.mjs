import { defineComponent, shallowRef, h, resolveComponent, hasInjectionContext, getCurrentInstance, computed, ref, mergeProps, createElementBlock, provide, cloneVNode, useSSRContext, inject, Suspense, Fragment, createApp, shallowReactive, toRef, onErrorCaptured, onServerPrefetch, unref, createVNode, resolveDynamicComponent, reactive, effectScope, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, getCurrentScope, markRaw, withCtx, createTextVNode } from 'vue';
import { p as parseQuery, k as hasProtocol, l as joinURL, m as getContext, w as withQuery, n as withTrailingSlash, o as withoutTrailingSlash, q as isScriptProtocol, r as sanitizeStatusCode, $ as $fetch, v as createHooks, x as executeAsync, h as createError$1, y as toRouteMatcher, z as createRouter$1, A as defu } from '../_/nitro.mjs';
import { b as baseURL, p as publicAssetsURL } from '../routes/renderer.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.17.5";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance || (nuxtAppInstance = getNuxtAppCtx(id).tryUse());
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to || (to = "/");
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value || (error2.value = nuxtError);
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-B0wSxsu5.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    let position = savedPosition || void 0;
    if (!position && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, "instant", position));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, "instant", position)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, scrollBehaviorType, position) {
  if (position) {
    return position;
  }
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: scrollBehaviorType
    };
  }
  return { left: 0, top: 0, behavior: scrollBehaviorType };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware || (nuxtApp._middleware = {
      global: [],
      named: {}
    });
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach(async (to, _from) => {
      if (to.matched.length === 0) {
        await nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && true) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      var _a;
      if (mounted.value) {
        const vnodes = (_a = slots.default) == null ? void 0 : _a.call(slots);
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a;
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return ((_a = router.resolve(to.value)) == null ? void 0 : _a.href) ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (link == null ? void 0 : link.isActive) ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (link == null ? void 0 : link.isExactActive) ?? computed(() => to.value === router.currentRoute.value.path),
      route: (link == null ? void 0 : link.route) ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
    // }) as unknown as DefineComponent<NuxtLinkProps, object, object, ComputedOptions, MethodOptions, object, object, EmitsOptions, string, object, NuxtLinkProps, object, SlotsType<NuxtLinkSlots>>
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const plugin = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin$1,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  plugin,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4
];
const _sfc_main$9 = {
  __name: "ProgressBar",
  __ssrInlineRender: true,
  setup(__props) {
    const progressBar = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "progress-bar",
        ref_key: "progressBar",
        ref: progressBar
      }, _attrs))}></div>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProgressBar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$8 = {
  __name: "NavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const scrolled = ref(false);
    const mobileMenuOpen = ref(false);
    const showBookingModal = ref(false);
    ref(null);
    const bookingForm = ref({
      name: "",
      email: "",
      service: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 w-full z-40" }, _attrs))} data-v-a2576078><div class="${ssrRenderClass([{ "py-2": scrolled.value, "py-3": !scrolled.value }, "bg-black transition-all duration-300"])}" data-v-a2576078><div class="container-custom flex items-center justify-between" data-v-a2576078><div class="logo" data-v-a2576078>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white text-xl md:text-2xl font-playfair tracking-wider" data-v-a2576078${_scopeId}>Allen Ralford Barkley</span>`);
          } else {
            return [
              createVNode("span", { class: "text-white text-xl md:text-2xl font-playfair tracking-wider" }, "Allen Ralford Barkley")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden md:flex items-center space-x-8" data-v-a2576078>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-silver hover:text-white transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/about",
        class: "text-silver hover:text-white transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/courses",
        class: "text-silver hover:text-white transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Courses`);
          } else {
            return [
              createTextVNode("Courses")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "text-silver hover:text-white transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Products`);
          } else {
            return [
              createTextVNode("Products")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/consulting",
        class: "text-silver hover:text-white transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Consulting`);
          } else {
            return [
              createTextVNode("Consulting")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="bg-azure hover:bg-blue text-white px-4 py-2 rounded transition-colors duration-300" data-v-a2576078>Book Discovery Call</button></div><button class="md:hidden text-silver hover:text-white" data-v-a2576078><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a2576078>`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-a2576078></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-a2576078></path>`);
      }
      _push(`</svg></button></div></div><div class="bg-gradient-to-r from-blue-medium to-azure py-3" style="${ssrRenderStyle({ "background": "linear-gradient(to right, #0918BF, #2C6EC7, #3E7CC8)" })}" data-v-a2576078><div class="container-custom flex justify-center" data-v-a2576078><div class="flex space-x-12" data-v-a2576078>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/gallery",
        class: "flex flex-col items-center group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white/80 group-hover:text-white transition-colors duration-300" data-v-a2576078${_scopeId}>Gallery</span><div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" data-v-a2576078${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "text-white/80 group-hover:text-white transition-colors duration-300" }, "Gallery"),
              createVNode("div", { class: "mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/models",
        class: "flex flex-col items-center group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white/80 group-hover:text-white transition-colors duration-300" data-v-a2576078${_scopeId}>Models</span><div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" data-v-a2576078${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "text-white/80 group-hover:text-white transition-colors duration-300" }, "Models"),
              createVNode("div", { class: "mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/premium",
        class: "flex flex-col items-center group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white/80 group-hover:text-white transition-colors duration-300" data-v-a2576078${_scopeId}>Premium Services</span><div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" data-v-a2576078${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "text-white/80 group-hover:text-white transition-colors duration-300" }, "Premium Services"),
              createVNode("div", { class: "mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/build",
        class: "flex flex-col items-center group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white/80 group-hover:text-white transition-colors duration-300" data-v-a2576078${_scopeId}>Build</span><div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" data-v-a2576078${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", { class: "text-white/80 group-hover:text-white transition-colors duration-300" }, "Build"),
              createVNode("div", { class: "mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if (mobileMenuOpen.value) {
        _push(`<div class="md:hidden bg-black-light absolute top-full left-0 w-full py-4 px-4 flex flex-col space-y-4" data-v-a2576078>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "text-silver hover:text-white transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Home`);
            } else {
              return [
                createTextVNode("Home")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/about",
          class: "text-silver hover:text-white transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`About`);
            } else {
              return [
                createTextVNode("About")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/courses",
          class: "text-silver hover:text-white transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Courses`);
            } else {
              return [
                createTextVNode("Courses")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/consulting",
          class: "text-silver hover:text-white transition-colors duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Consulting`);
            } else {
              return [
                createTextVNode("Consulting")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="bg-blue-light hover:bg-blue text-white px-4 py-2 rounded transition-colors duration-300 w-full" data-v-a2576078>Book Discovery Call</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-50" data-v-a2576078><a href="#hero" class="${ssrRenderClass([{ "bg-white": _ctx.activeSection === "hero" }, "w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300"])}" data-v-a2576078></a><a href="#about" class="${ssrRenderClass([{ "bg-white": _ctx.activeSection === "about" }, "w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300"])}" data-v-a2576078></a><a href="#courses" class="${ssrRenderClass([{ "bg-white": _ctx.activeSection === "courses" }, "w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300"])}" data-v-a2576078></a><a href="#consulting" class="${ssrRenderClass([{ "bg-white": _ctx.activeSection === "consulting" }, "w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300"])}" data-v-a2576078></a><a href="#global" class="${ssrRenderClass([{ "bg-white": _ctx.activeSection === "global" }, "w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300"])}" data-v-a2576078></a></div>`);
      if (showBookingModal.value) {
        _push(`<div class="fixed inset-0 bg-navy-dark/90 flex items-center justify-center z-50 p-4" data-v-a2576078><div class="bg-navy max-w-md w-full rounded-lg p-8 relative" data-v-a2576078><button class="absolute top-4 right-4 text-silver hover:text-gold" data-v-a2576078><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-a2576078><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-a2576078></path></svg></button><h2 class="heading-md text-gold mb-4" data-v-a2576078>Book Your Discovery Call</h2><p class="text-silver mb-6" data-v-a2576078>Schedule a complimentary 30-minute consultation to discuss your needs and how we can help elevate your business.</p><form class="space-y-4" data-v-a2576078><div data-v-a2576078><label for="name" class="block text-silver mb-1" data-v-a2576078>Full Name</label><input type="text" id="name"${ssrRenderAttr("value", bookingForm.value.name)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required data-v-a2576078></div><div data-v-a2576078><label for="email" class="block text-silver mb-1" data-v-a2576078>Email Address</label><input type="email" id="email"${ssrRenderAttr("value", bookingForm.value.email)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required data-v-a2576078></div><div data-v-a2576078><label for="service" class="block text-silver mb-1" data-v-a2576078>Service Interest</label><select id="service" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required data-v-a2576078><option value="" data-v-a2576078${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service) ? ssrLooseContain(bookingForm.value.service, "") : ssrLooseEqual(bookingForm.value.service, "")) ? " selected" : ""}>Select a service</option><option value="supply-chain" data-v-a2576078${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service) ? ssrLooseContain(bookingForm.value.service, "supply-chain") : ssrLooseEqual(bookingForm.value.service, "supply-chain")) ? " selected" : ""}>Supply Chain Optimization</option><option value="ai-strategy" data-v-a2576078${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service) ? ssrLooseContain(bookingForm.value.service, "ai-strategy") : ssrLooseEqual(bookingForm.value.service, "ai-strategy")) ? " selected" : ""}>AI Strategy</option><option value="industrial-analytics" data-v-a2576078${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service) ? ssrLooseContain(bookingForm.value.service, "industrial-analytics") : ssrLooseEqual(bookingForm.value.service, "industrial-analytics")) ? " selected" : ""}>Industrial Analytics</option><option value="other" data-v-a2576078${ssrIncludeBooleanAttr(Array.isArray(bookingForm.value.service) ? ssrLooseContain(bookingForm.value.service, "other") : ssrLooseEqual(bookingForm.value.service, "other")) ? " selected" : ""}>Other</option></select></div><button type="submit" class="btn-primary w-full" data-v-a2576078>Request Call</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NavBar.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a2576078"]]);
const _imports_3$1 = publicAssetsURL("/images/hero-brain.jpg");
const _imports_1$1 = publicAssetsURL("/images/foto1.jpg");
const _imports_2$1 = publicAssetsURL("/images/foto2.jpg");
const _imports_3 = publicAssetsURL("/images/foto3.jpg");
const _sfc_main$7 = {
  __name: "HeroGallery",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero-gallery relative overflow-hidden" }, _attrs))} data-v-79491ca9><div class="relative h-screen" data-v-79491ca9><div class="absolute inset-0 bg-gradient-to-r from-blue-darkest to-blue-medium opacity-80" data-v-79491ca9></div><img${ssrRenderAttr("src", _imports_3$1)} alt="AI Technology" class="w-full h-full object-cover" data-v-79491ca9><div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4" data-v-79491ca9><h1 class="text-4xl md:text-6xl font-playfair text-white mb-6 tracking-wide" data-v-79491ca9> Intelligence. Precision. Elegance. </h1><p class="text-xl text-white/90 max-w-3xl mb-8" data-v-79491ca9> Transforming complex data challenges into elegant, efficient solutions </p><div class="flex flex-wrap justify-center gap-4" data-v-79491ca9><a href="#courses" class="px-6 py-3 bg-azure text-white rounded hover:bg-blue-medium transition-all duration-300" data-v-79491ca9> Explore Courses </a><a href="#about" class="px-6 py-3 border border-white/70 text-white rounded hover:bg-white/10 transition-all duration-300" data-v-79491ca9> Learn More </a></div></div></div><div class="bg-black py-16" data-v-79491ca9><div class="container mx-auto px-4" data-v-79491ca9><h2 class="text-3xl font-playfair text-white text-center mb-12" data-v-79491ca9> Advanced Technology Solutions </h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-79491ca9><div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer" data-v-79491ca9><div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10" data-v-79491ca9></div><img${ssrRenderAttr("src", _imports_1$1)} alt="Global Technology" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-v-79491ca9><div class="absolute bottom-0 left-0 right-0 p-4 z-20" data-v-79491ca9><h3 class="text-xl text-white font-medium" data-v-79491ca9>Global Reach</h3><p class="text-white/80 text-sm mt-1" data-v-79491ca9> Connecting solutions across continents </p></div></div><div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer" data-v-79491ca9><div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10" data-v-79491ca9></div><img${ssrRenderAttr("src", _imports_2$1)} alt="Digital Technology" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-v-79491ca9><div class="absolute bottom-0 left-0 right-0 p-4 z-20" data-v-79491ca9><h3 class="text-xl text-white font-medium" data-v-79491ca9>Digital Innovation</h3><p class="text-white/80 text-sm mt-1" data-v-79491ca9> Pioneering the future of technology </p></div></div><div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer" data-v-79491ca9><div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10" data-v-79491ca9></div><img${ssrRenderAttr("src", _imports_3)} alt="Technology Interface" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-v-79491ca9><div class="absolute bottom-0 left-0 right-0 p-4 z-20" data-v-79491ca9><h3 class="text-xl text-white font-medium" data-v-79491ca9>Intelligent Interfaces</h3><p class="text-white/80 text-sm mt-1" data-v-79491ca9> Intuitive solutions for complex problems </p></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroGallery.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-79491ca9"]]);
const _imports_0$1 = publicAssetsURL("/images/logo-bg.jpg");
const _sfc_main$6 = {
  __name: "AboutUs",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "about-us py-16 bg-gradient-to-r from-blue-darkest to-blue-dark" }, _attrs))} data-v-6843184d><div class="container mx-auto px-4" data-v-6843184d><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-v-6843184d><div class="text-white" data-v-6843184d><h2 class="text-3xl md:text-4xl font-playfair mb-6" data-v-6843184d>About Allen Ralford Barkley</h2><p class="mb-4 text-lg leading-relaxed" data-v-6843184d> Allen Ralford Barkley has been at the forefront of optimization and analytics, delivering exceptional results for prestigious clients worldwide. </p><p class="mb-6 text-lg leading-relaxed" data-v-6843184d> With a unique blend of technical expertise and strategic insight, we transform complex data challenges into elegant, efficient solutions that drive measurable business outcomes. </p><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" data-v-6843184d><div class="bg-white/10 p-5 rounded-lg" data-v-6843184d><h3 class="text-xl font-medium mb-2 text-azure-lighter" data-v-6843184d>Excellence</h3><p data-v-6843184d>We maintain the highest standards in every aspect of our work, from analysis to implementation.</p></div><div class="bg-white/10 p-5 rounded-lg" data-v-6843184d><h3 class="text-xl font-medium mb-2 text-azure-lighter" data-v-6843184d>Innovation</h3><p data-v-6843184d>We constantly push boundaries to develop cutting-edge solutions for complex challenges.</p></div><div class="bg-white/10 p-5 rounded-lg" data-v-6843184d><h3 class="text-xl font-medium mb-2 text-azure-lighter" data-v-6843184d>Precision</h3><p data-v-6843184d>Our methodical approach ensures accurate, reliable results that clients can trust.</p></div><div class="bg-white/10 p-5 rounded-lg" data-v-6843184d><h3 class="text-xl font-medium mb-2 text-azure-lighter" data-v-6843184d>Partnership</h3><p data-v-6843184d>We work closely with clients to understand their unique needs and deliver tailored solutions.</p></div></div></div><div class="relative" data-v-6843184d><div class="rounded-lg overflow-hidden shadow-xl" data-v-6843184d><img${ssrRenderAttr("src", _imports_0$1)} alt="Allen Ralford Barkley" class="w-full h-auto" data-v-6843184d></div><div class="absolute inset-0 flex items-center justify-center bg-blue-darkest/60 rounded-lg" data-v-6843184d><div class="text-center p-8 bg-gradient-to-r from-blue-medium to-azure rounded-lg transform -rotate-3 shadow-lg" data-v-6843184d><h2 class="text-4xl font-playfair text-white mb-2" data-v-6843184d>Allen Ralford Barkley</h2><p class="text-white/80 text-lg" data-v-6843184d>Intelligence • Precision • Elegance</p></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutUs.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-6843184d"]]);
const _sfc_main$5 = {
  __name: "CoursesSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref([]);
    const tags = [
      { id: "all", name: "All Courses" },
      { id: "optimization", name: "Optimization" },
      { id: "ai", name: "Artificial Intelligence" },
      { id: "analytics", name: "Analytics" },
      { id: "python", name: "Python" },
      { id: "rl", name: "Reinforcement Learning" }
    ];
    const activeFilters = ref(["all"]);
    const findTagName = (tagId) => {
      const tag = tags.find((t) => t.id === tagId);
      return tag ? tag.name : "";
    };
    const courses = [
      {
        id: 1,
        title: "Advanced Supply Chain Optimization",
        description: "Master the art of supply chain optimization using cutting-edge algorithms and mathematical models to solve complex logistics problems.",
        price: 1299,
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "8 Weeks",
        level: "Advanced",
        tags: ["optimization", "analytics"]
      },
      {
        id: 2,
        title: "Reinforcement Learning for Decision Making",
        description: "Explore the frontier of AI with practical reinforcement learning techniques that can be applied to real-world decision-making scenarios.",
        price: 1499,
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "10 Weeks",
        level: "Expert",
        tags: ["ai", "rl", "python"]
      },
      {
        id: 3,
        title: "Industrial Analytics & Predictive Maintenance",
        description: "Learn how to implement predictive maintenance systems using advanced analytics to reduce downtime and optimize industrial operations.",
        price: 1199,
        image: "https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "6 Weeks",
        level: "Intermediate",
        tags: ["analytics", "python"]
      },
      {
        id: 4,
        title: "Python for Optimization Science",
        description: "A comprehensive course on using Python to solve complex optimization problems in various domains including logistics, finance, and manufacturing.",
        price: 999,
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "8 Weeks",
        level: "Intermediate",
        tags: ["optimization", "python"]
      },
      {
        id: 5,
        title: "Deep Learning for Time Series Analysis",
        description: "Master the application of deep learning techniques to time series data for forecasting, anomaly detection, and pattern recognition.",
        price: 1399,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "9 Weeks",
        level: "Advanced",
        tags: ["ai", "analytics", "python"]
      },
      {
        id: 6,
        title: "Column Generation for Large-Scale Optimization",
        description: "An advanced course on column generation techniques for solving large-scale linear and integer programming problems efficiently.",
        price: 1599,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        duration: "10 Weeks",
        level: "Expert",
        tags: ["optimization"]
      }
    ];
    const filteredCourses = computed(() => {
      if (activeFilters.value.includes("all")) {
        return courses;
      }
      return courses.filter((course) => {
        return course.tags.some((tag) => activeFilters.value.includes(tag));
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section relative overflow-hidden",
        style: { "background": "linear-gradient(to right, #022593, #071B57)" }
      }, _attrs))} data-v-d0ea7f29><div class="container mx-auto px-4 relative z-10" data-v-d0ea7f29><div class="text-center mb-16 fade-up" data-v-d0ea7f29><h2 class="text-3xl md:text-4xl font-playfair text-white mb-4" data-v-d0ea7f29>Premium Technical Courses</h2><p class="text-white/90 max-w-2xl mx-auto" data-v-d0ea7f29>Elevate your expertise with our meticulously crafted courses, designed for professionals who demand excellence.</p></div><div class="flex flex-wrap justify-center gap-3 mb-12 fade-up" data-v-d0ea7f29><!--[-->`);
      ssrRenderList(tags, (tag) => {
        _push(`<button class="${ssrRenderClass([activeFilters.value.includes(tag.id) ? "bg-azure text-white" : "bg-blue-darkest/50 text-white border border-blue-medium/30 hover:border-azure-light", "px-4 py-2 rounded-full text-sm transition-all duration-300"])}" data-v-d0ea7f29>${ssrInterpolate(tag.name)}</button>`);
      });
      _push(`<!--]--></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-d0ea7f29><!--[-->`);
      ssrRenderList(filteredCourses.value, (course) => {
        _push(`<div class="bg-black/30 rounded-lg p-6 group hover:bg-blue-darkest/50 transition-all duration-500 overflow-hidden fade-up course-card" data-v-d0ea7f29><div class="h-48 -mx-6 -mt-6 mb-6 overflow-hidden relative" data-v-d0ea7f29><div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="${ssrRenderStyle({ backgroundImage: `url(${course.image})` })}" data-v-d0ea7f29></div><div class="absolute inset-0 bg-gradient-to-t from-blue-darkest to-transparent" data-v-d0ea7f29></div><div class="absolute bottom-4 left-4 flex flex-wrap gap-2" data-v-d0ea7f29><!--[-->`);
        ssrRenderList(course.tags, (tagId) => {
          _push(`<span class="px-2 py-1 bg-blue-medium/80 text-white text-xs rounded" data-v-d0ea7f29>${ssrInterpolate(findTagName(tagId))}</span>`);
        });
        _push(`<!--]--></div></div><div data-v-d0ea7f29><h3 class="text-xl font-playfair text-white mb-2" data-v-d0ea7f29>${ssrInterpolate(course.title)}</h3><p class="text-white/80 mb-4" data-v-d0ea7f29>${ssrInterpolate(course.description)}</p><div class="flex items-center justify-between text-sm text-white/70 mb-4" data-v-d0ea7f29><div class="flex items-center" data-v-d0ea7f29><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d0ea7f29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d0ea7f29></path></svg> ${ssrInterpolate(course.duration)}</div><div class="flex items-center" data-v-d0ea7f29><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d0ea7f29><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-d0ea7f29></path></svg> ${ssrInterpolate(course.level)}</div></div><div class="flex items-center justify-between mt-6" data-v-d0ea7f29><div class="text-azure-lighter font-playfair text-xl" data-v-d0ea7f29>${ssrInterpolate(course.price)}</div><button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300" data-v-d0ea7f29> Enroll Now </button></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CoursesSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-d0ea7f29"]]);
const _imports_0 = publicAssetsURL("/images/tech-interface.jpg");
const _imports_1 = publicAssetsURL("/images/tech-digital.jpg");
const _imports_2 = publicAssetsURL("/images/foto5.jpg");
const _sfc_main$4 = {
  __name: "ProductsSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "products-section py-16",
        style: { "background": "linear-gradient(to right, #071B57, #0A1AD1)" }
      }, _attrs))} data-v-de967609><div class="container mx-auto px-4" data-v-de967609><div class="text-center mb-16" data-v-de967609><h2 class="text-3xl md:text-4xl font-playfair text-white mb-4" data-v-de967609>Premium Products</h2><p class="text-white/90 max-w-2xl mx-auto" data-v-de967609>Advanced solutions designed with precision and elegance for optimal performance.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-de967609><div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300" data-v-de967609><div class="relative aspect-video overflow-hidden" data-v-de967609><img${ssrRenderAttr("src", _imports_0)} alt="Analytics Dashboard" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-de967609><div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent" data-v-de967609></div><div class="absolute bottom-0 left-0 w-full p-4" data-v-de967609><h3 class="text-xl text-white font-medium" data-v-de967609>Analytics Dashboard Pro</h3></div></div><div class="p-6" data-v-de967609><p class="text-white/80 mb-4" data-v-de967609>Advanced analytics platform with real-time data processing and interactive visualizations.</p><div class="flex justify-between items-center" data-v-de967609><span class="text-azure-lighter font-medium" data-v-de967609>$1,299</span><button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300" data-v-de967609> Learn More </button></div></div></div><div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300" data-v-de967609><div class="relative aspect-video overflow-hidden" data-v-de967609><img${ssrRenderAttr("src", _imports_1)} alt="Optimization Engine" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-de967609><div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent" data-v-de967609></div><div class="absolute bottom-0 left-0 w-full p-4" data-v-de967609><h3 class="text-xl text-white font-medium" data-v-de967609>Optimization Engine</h3></div></div><div class="p-6" data-v-de967609><p class="text-white/80 mb-4" data-v-de967609>High-performance optimization software for complex systems and resource allocation.</p><div class="flex justify-between items-center" data-v-de967609><span class="text-azure-lighter font-medium" data-v-de967609>$2,499</span><button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300" data-v-de967609> Learn More </button></div></div></div><div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300" data-v-de967609><div class="relative aspect-video overflow-hidden" data-v-de967609><img${ssrRenderAttr("src", _imports_2)} alt="Predictive Analytics Suite" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-v-de967609><div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent" data-v-de967609></div><div class="absolute bottom-0 left-0 w-full p-4" data-v-de967609><h3 class="text-xl text-white font-medium" data-v-de967609>Predictive Analytics Suite</h3></div></div><div class="p-6" data-v-de967609><p class="text-white/80 mb-4" data-v-de967609>Comprehensive predictive modeling tools with machine learning capabilities.</p><div class="flex justify-between items-center" data-v-de967609><span class="text-azure-lighter font-medium" data-v-de967609>$1,899</span><button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300" data-v-de967609> Learn More </button></div></div></div></div><div class="mt-16 bg-gradient-to-r from-blue-darker to-blue-medium rounded-lg overflow-hidden" data-v-de967609><div class="grid grid-cols-1 lg:grid-cols-2" data-v-de967609><div class="p-8 lg:p-12 flex flex-col justify-center" data-v-de967609><h3 class="text-2xl md:text-3xl font-playfair text-white mb-4" data-v-de967609>Enterprise AI Platform</h3><p class="text-white/90 mb-6" data-v-de967609>Our flagship product combines advanced analytics, optimization algorithms, and machine learning in a unified platform designed for enterprise-scale deployment.</p><ul class="space-y-3 mb-8" data-v-de967609><li class="flex items-start" data-v-de967609><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor" data-v-de967609><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-de967609></path></svg><span class="text-white" data-v-de967609>Real-time data processing and analysis</span></li><li class="flex items-start" data-v-de967609><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor" data-v-de967609><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-de967609></path></svg><span class="text-white" data-v-de967609>Advanced predictive modeling capabilities</span></li><li class="flex items-start" data-v-de967609><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor" data-v-de967609><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-v-de967609></path></svg><span class="text-white" data-v-de967609>Seamless integration with existing systems</span></li></ul><div class="flex items-center space-x-4" data-v-de967609><span class="text-2xl text-white font-playfair" data-v-de967609>$4,999</span><button class="px-6 py-3 bg-white text-blue-dark font-medium rounded-lg hover:bg-white/90 transition-colors duration-300" data-v-de967609> Request Demo </button></div></div><div class="relative" data-v-de967609><img${ssrRenderAttr("src", _imports_3$1)} alt="Enterprise AI Platform" class="w-full h-full object-cover" data-v-de967609><div class="absolute inset-0 bg-blue-medium/30" data-v-de967609></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductsSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-de967609"]]);
const _sfc_main$3 = {
  __name: "GlobalTrustSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    const activePin = ref(null);
    const tooltipPosition = ref({ x: 0, y: 0 });
    const tooltipStyle = computed(() => {
      return {
        left: `${tooltipPosition.value.x}px`,
        top: `${tooltipPosition.value.y}px`,
        transform: "translate(-50%, -120%)"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "section relative overflow-hidden",
        style: { "background": "linear-gradient(to right, #000000, #111827)" }
      }, _attrs))} data-v-e63e979d><div class="container relative z-10" data-v-e63e979d><div class="text-center mb-16 fade-up" data-v-e63e979d><h2 class="text-white text-3xl md:text-4xl font-playfair font-medium mb-4" data-v-e63e979d>Global Trust</h2><p class="text-white max-w-2xl mx-auto" data-v-e63e979d>Our expertise transcends borders, serving elite organizations across industries and continents.</p></div><div class="world-map-container relative h-[500px] fade-up" data-v-e63e979d><svg class="world-map w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e63e979d><path class="map-outline" d="M150,100 Q200,50 250,100 T350,100 T450,100 T550,100 T650,100 T750,100 T850,100 Q900,150 850,200 T750,200 T650,200 T550,200 T450,200 T350,200 T250,200 Q200,250 250,300 T350,300 T450,300 T550,300 T650,300 T750,300 T850,300 Q900,350 850,400 T750,400 T650,400 T550,400 T450,400 T350,400 T250,400 Q200,450 150,400" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" fill="none" data-v-e63e979d></path><circle class="client-pin" cx="220" cy="150" r="4" fill="#6366f1" data-v-e63e979d></circle><circle class="client-pin" cx="480" cy="140" r="4" fill="#6366f1" data-v-e63e979d></circle><circle class="client-pin" cx="300" cy="280" r="4" fill="#7c3aed" data-v-e63e979d></circle><circle class="client-pin" cx="650" cy="200" r="4" fill="#7c3aed" data-v-e63e979d></circle><circle class="client-pin" cx="750" cy="180" r="4" fill="#6366f1" data-v-e63e979d></circle><circle class="client-pin" cx="400" cy="170" r="4" fill="#9333ea" data-v-e63e979d></circle><circle class="client-pin" cx="580" cy="300" r="4" fill="#9333ea" data-v-e63e979d></circle></svg>`);
      if (activePin.value) {
        _push(`<div class="client-tooltip absolute p-4 rounded shadow-lg border border-white/20 z-10 w-64" style="${ssrRenderStyle([{ "background": "linear-gradient(to right, #6366f1, #9333ea)" }, tooltipStyle.value])}" data-v-e63e979d><h4 class="text-white font-playfair mb-1" data-v-e63e979d>${ssrInterpolate(activePin.value.name)}</h4><p class="text-white text-sm" data-v-e63e979d>${ssrInterpolate(activePin.value.location)}</p><p class="text-white/80 text-sm mt-2" data-v-e63e979d>${ssrInterpolate(activePin.value.project)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" data-v-e63e979d><div class="text-center fade-up" data-v-e63e979d><div class="text-4xl font-playfair text-white mb-2" data-v-e63e979d>0</div><p class="text-white" data-v-e63e979d>Global Clients</p></div><div class="text-center fade-up" data-v-e63e979d><div class="text-4xl font-playfair text-white mb-2" data-v-e63e979d>0</div><p class="text-white" data-v-e63e979d>Countries</p></div><div class="text-center fade-up" data-v-e63e979d><div class="text-4xl font-playfair text-white mb-2" data-v-e63e979d>0</div><p class="text-white" data-v-e63e979d>Success Rate</p></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GlobalTrustSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e63e979d"]]);
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_7 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProgressBar = _sfc_main$9;
      const _component_NavBar = __nuxt_component_1;
      const _component_HeroGallery = __nuxt_component_2$1;
      const _component_AboutUs = __nuxt_component_3;
      const _component_CoursesSection = __nuxt_component_2;
      const _component_ProductsSection = __nuxt_component_5;
      const _component_GlobalTrustSection = __nuxt_component_4;
      const _component_NuxtPage = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ProgressBar, null, null, _parent));
      _push(ssrRenderComponent(_component_NavBar, null, null, _parent));
      _push(`<main>`);
      _push(ssrRenderComponent(_component_HeroGallery, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutUs, { id: "about" }, null, _parent));
      _push(ssrRenderComponent(_component_CoursesSection, { id: "courses" }, null, _parent));
      _push(ssrRenderComponent(_component_ProductsSection, { id: "products" }, null, _parent));
      _push(ssrRenderComponent(_component_GlobalTrustSection, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-Ck8lu97o.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-CTT6IXXw.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    var _a;
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      (_a = nuxt.payload).error || (_a.error = createError(error));
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, __nuxt_component_0 as a, __nuxt_component_2 as b, __nuxt_component_4 as c, entry$1 as default, tryUseNuxtApp as t };
//# sourceMappingURL=server.mjs.map
