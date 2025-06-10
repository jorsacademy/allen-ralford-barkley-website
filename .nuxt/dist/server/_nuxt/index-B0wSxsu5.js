import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, b as __nuxt_component_2, c as __nuxt_component_4 } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/hookable/dist/index.mjs";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/unctx/dist/index.mjs";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/radix3/dist/index.mjs";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/defu/dist/defu.mjs";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/ufo/dist/index.mjs";
import "C:/Users/Lenovo/CascadeProjects/allen-ralford-barkley/node_modules/klona/dist/index.mjs";
const _sfc_main$5 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "hero",
        class: "relative h-screen flex items-center justify-center overflow-hidden"
      }, _attrs))} data-v-29da16f6><div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 z-0" data-v-29da16f6></div><div class="particles-bg absolute inset-0 z-1" data-v-29da16f6></div><div class="container-custom relative z-10 text-center" data-v-29da16f6><h1 class="heading-xl text-silver mb-6 opacity-0" data-v-29da16f6><span class="block" data-v-29da16f6>Intelligence.</span><span class="block" data-v-29da16f6>Precision.</span><span class="block text-white" data-v-29da16f6>Elegance.</span></h1><p class="text-silver-light text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0" data-v-29da16f6> Premium consulting services and technical courses for those who demand excellence in optimization, AI, and analytics. </p><div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" data-v-29da16f6><button class="bg-blue-light hover:bg-blue text-white px-6 py-3 rounded transition-all duration-300 w-full sm:w-auto" data-v-29da16f6>Explore Courses</button><button class="border border-silver text-white px-6 py-3 rounded hover:bg-white/10 transition-all duration-300 w-full sm:w-auto" data-v-29da16f6>Book Consulting</button></div></div><div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-silver animate-bounce" data-v-29da16f6><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-29da16f6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-29da16f6></path></svg></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-29da16f6"]]);
const _sfc_main$4 = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "section bg-gradient-to-r from-indigo-700 to-purple-800 relative overflow-hidden"
      }, _attrs))} data-v-e10214bf><div class="container-custom relative z-10" data-v-e10214bf><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-v-e10214bf><div class="fade-up" data-v-e10214bf><h2 class="heading-lg text-white mb-6" data-v-e10214bf>About Allen Ralford Barkley</h2><p class="text-silver mb-6 text-lg leading-relaxed" data-v-e10214bf> Allen Ralford Barkley stands at the forefront of optimization science and artificial intelligence, guiding global enterprises through complex transformations with precision and elegance. </p><p class="text-silver mb-8 text-lg leading-relaxed" data-v-e10214bf> Our philosophy is simple: intelligence without precision is chaos; precision without elegance is inefficiency. We deliver all three in perfect harmony. </p><div class="mt-10" data-v-e10214bf><h3 class="text-silver-light text-sm uppercase tracking-wider mb-4" data-v-e10214bf>Trusted By Global Leaders</h3><div class="flex flex-wrap items-center gap-8" data-v-e10214bf><div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300" data-v-e10214bf><svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e10214bf><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" stroke-width="1.5" data-v-e10214bf></path><path d="M6 12H18" stroke="#FFFFFF" stroke-width="1.5" data-v-e10214bf></path><path d="M12 6V18" stroke="#FFFFFF" stroke-width="1.5" data-v-e10214bf></path></svg><span class="text-silver-light text-xs mt-1 block" data-v-e10214bf>Global Enterprise</span></div><div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300" data-v-e10214bf><svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e10214bf><path d="M3 6H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" data-v-e10214bf></path><path d="M3 12H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" data-v-e10214bf></path><path d="M3 18H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" data-v-e10214bf></path></svg><span class="text-silver-light text-xs mt-1 block" data-v-e10214bf>Industry Leaders</span></div><div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300" data-v-e10214bf><svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-e10214bf><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" stroke-width="1.5" data-v-e10214bf></path><path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" stroke="#FFFFFF" stroke-width="1.5" data-v-e10214bf></path></svg><span class="text-silver-light text-xs mt-1 block" data-v-e10214bf>Fortune 500</span></div></div></div></div><div class="relative" data-v-e10214bf><div class="aspect-[4/5] bg-navy-light rounded-lg overflow-hidden relative fade-up" data-v-e10214bf><div class="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -mr-20 -mt-20 blur-3xl" data-v-e10214bf></div><div class="absolute bottom-0 left-0 w-40 h-40 bg-gold/10 rounded-full -ml-20 -mb-20 blur-3xl" data-v-e10214bf></div><div class="absolute inset-0 flex flex-col justify-end p-8" data-v-e10214bf><div class="w-16 h-1 bg-gold mb-4" data-v-e10214bf></div><h3 class="text-gold text-2xl font-playfair mb-2" data-v-e10214bf>Allen Ralford Barkley</h3><p class="text-silver-light" data-v-e10214bf>Founder &amp; Principal Consultant</p></div></div><div class="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-gold/30 rounded-lg z-0" data-v-e10214bf></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AboutSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e10214bf"]]);
const _sfc_main$3 = {
  __name: "ConsultingSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    ref([]);
    const consultingServices = ref([
      {
        id: 1,
        title: "Supply Chain Optimization",
        shortDescription: "Transform your supply chain with advanced mathematical optimization techniques and AI-driven insights.",
        fullDescription: "Our supply chain optimization service leverages cutting-edge algorithms and decades of industry expertise to redesign your logistics network for maximum efficiency and resilience.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>`,
        features: [
          "Network design and optimization",
          "Inventory management strategies",
          "Transportation route optimization",
          "Multi-echelon inventory optimization",
          "Demand forecasting with machine learning"
        ],
        expanded: false
      },
      {
        id: 2,
        title: "AI Strategy",
        shortDescription: "Develop a comprehensive AI roadmap that aligns with your business objectives and delivers measurable ROI.",
        fullDescription: "Our AI Strategy consulting service helps organizations identify high-value AI opportunities, develop implementation roadmaps, and build the necessary capabilities to succeed with artificial intelligence.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>`,
        features: [
          "AI opportunity assessment",
          "Technology selection and architecture",
          "Data strategy and governance",
          "AI talent and capability building",
          "Ethical AI framework development"
        ],
        expanded: false
      },
      {
        id: 3,
        title: "Industrial Analytics",
        shortDescription: "Harness the power of advanced analytics to optimize industrial operations and drive continuous improvement.",
        fullDescription: "Our Industrial Analytics service combines deep domain expertise with cutting-edge data science to help manufacturing and industrial organizations extract actionable insights from their operational data.",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>`,
        features: [
          "Predictive maintenance systems",
          "Quality analytics and optimization",
          "Energy consumption optimization",
          "Process mining and optimization",
          "Real-time monitoring dashboards"
        ],
        expanded: false
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section bg-navy relative overflow-hidden" }, _attrs))}><div class="container-custom relative z-10"><div class="text-center mb-16 fade-up"><h2 class="heading-lg text-gold mb-4">Premium Consulting Services</h2><p class="text-silver max-w-2xl mx-auto">Bespoke consulting solutions crafted with precision and elegance for organizations that demand excellence.</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(consultingServices.value, (service, index) => {
        _push(`<div class="card hover:bg-navy-light border border-navy-light hover:border-gold transition-all duration-500 group fade-up"><div class="mb-6 w-16 h-16 rounded-full bg-navy-light group-hover:bg-gold/20 flex items-center justify-center transition-all duration-500"><div class="text-gold">${service.icon ?? ""}</div></div><h3 class="heading-md text-silver group-hover:text-gold transition-colors duration-300 mb-4">${ssrInterpolate(service.title)}</h3><p class="text-silver-dark mb-6">${ssrInterpolate(service.shortDescription)}</p><div class="flex items-center text-gold"><span>${ssrInterpolate(service.expanded ? "View Less" : "Explore Service")}</span><svg xmlns="http://www.w3.org/2000/svg" class="${ssrRenderClass([{ "rotate-180": service.expanded }, "h-5 w-5 ml-2 transition-transform duration-300"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div><div class="overflow-hidden transition-all duration-500 mt-6" style="${ssrRenderStyle({ maxHeight: service.expanded ? "1000px" : "0px", opacity: service.expanded ? 1 : 0 })}"><div class="pt-4 border-t border-navy-light"><p class="text-silver mb-4">${ssrInterpolate(service.fullDescription)}</p><ul class="space-y-2 mb-6"><!--[-->`);
        ssrRenderList(service.features, (feature, i) => {
          _push(`<li class="flex items-start"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gold mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="text-silver-light">${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul><button class="btn-primary w-full"> Request Consultation </button></div></div></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConsultingSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-navy-dark py-12 border-t border-navy" }, _attrs))}><div class="container-custom"><div class="flex flex-col md:flex-row justify-between items-center mb-12"><div class="mb-6 md:mb-0"><h2 class="text-gold text-2xl font-playfair tracking-wider">Allen Ralford Barkley</h2><p class="text-silver-dark mt-2">Intelligence. Precision. Elegance.</p></div><div class="flex flex-col items-center md:items-end"><a href="mailto:contact@allenralfordbarkley.com" class="text-silver hover:text-gold transition-colors duration-300 mb-2">contact@allenralfordbarkley.com</a><div class="flex space-x-4 mt-4"><a href="#" class="text-silver hover:text-gold transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg></a><a href="#" class="text-silver hover:text-gold transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a><a href="#" class="text-silver hover:text-gold transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path></svg></a></div></div></div><div class="border-t border-navy pt-8 flex flex-col md:flex-row justify-between items-center text-sm"><div class="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0"><a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Privacy Policy</a><a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Terms of Service</a><a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Cookie Policy</a><a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">GDPR</a></div><div class="text-silver-dark"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Allen Ralford Barkley. All rights reserved. </div></div></div></footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FooterSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "CallToAction",
  __ssrInlineRender: true,
  setup(__props) {
    const showModal = ref(false);
    const buttonHovered = ref(false);
    const submitting = ref(false);
    const form = ref({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button class="${ssrRenderClass([{ "scale-110": buttonHovered.value }, "fixed bottom-8 right-8 z-40 bg-gold text-navy-dark rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gold-light transition-all duration-300 group"])}"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg><span class="absolute right-full mr-3 bg-navy text-silver px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Book Discovery Call</span></button>`);
      if (showModal.value) {
        _push(`<div class="fixed inset-0 bg-navy-dark/90 flex items-center justify-center z-50 p-4"><div class="bg-navy max-w-md w-full rounded-lg p-8 relative"><button class="absolute top-4 right-4 text-silver hover:text-gold"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button><h2 class="heading-md text-gold mb-4">Book Your Discovery Call</h2><p class="text-silver mb-6">Schedule a complimentary 30-minute consultation to discuss your needs and how we can help elevate your business.</p><form class="space-y-4"><div><label for="name" class="block text-silver mb-1">Full Name</label><input type="text" id="name"${ssrRenderAttr("value", form.value.name)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required></div><div><label for="email" class="block text-silver mb-1">Email Address</label><input type="email" id="email"${ssrRenderAttr("value", form.value.email)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required></div><div><label for="phone" class="block text-silver mb-1">Phone Number</label><input type="tel" id="phone"${ssrRenderAttr("value", form.value.phone)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required></div><div><label for="company" class="block text-silver mb-1">Company</label><input type="text" id="company"${ssrRenderAttr("value", form.value.company)} class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required></div><div><label for="service" class="block text-silver mb-1">Service Interest</label><select id="service" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "") : ssrLooseEqual(form.value.service, "")) ? " selected" : ""}>Select a service</option><option value="supply-chain"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "supply-chain") : ssrLooseEqual(form.value.service, "supply-chain")) ? " selected" : ""}>Supply Chain Optimization</option><option value="ai-strategy"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "ai-strategy") : ssrLooseEqual(form.value.service, "ai-strategy")) ? " selected" : ""}>AI Strategy</option><option value="industrial-analytics"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "industrial-analytics") : ssrLooseEqual(form.value.service, "industrial-analytics")) ? " selected" : ""}>Industrial Analytics</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "other") : ssrLooseEqual(form.value.service, "other")) ? " selected" : ""}>Other</option></select></div><button type="submit" class="btn-primary w-full">`);
        if (!submitting.value) {
          _push(`<span>Request Call</span>`);
        } else {
          _push(`<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-navy-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing... </span>`);
        }
        _push(`</button></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CallToAction.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSection = __nuxt_component_0;
      const _component_AboutSection = __nuxt_component_1;
      const _component_CoursesSection = __nuxt_component_2;
      const _component_ConsultingSection = _sfc_main$3;
      const _component_GlobalTrustSection = __nuxt_component_4;
      const _component_FooterSection = __nuxt_component_5;
      const _component_CallToAction = _sfc_main$1;
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_component_AboutSection, null, null, _parent));
      _push(ssrRenderComponent(_component_CoursesSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ConsultingSection, null, null, _parent));
      _push(ssrRenderComponent(_component_GlobalTrustSection, null, null, _parent));
      _push(ssrRenderComponent(_component_FooterSection, null, null, _parent));
      _push(ssrRenderComponent(_component_CallToAction, null, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-B0wSxsu5.js.map
