<template>
  <section class="section bg-navy relative overflow-hidden">
    <div class="container-custom relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 fade-up" ref="consultingHeader">
        <h2 class="heading-lg text-gold mb-4">Premium Consulting Services</h2>
        <p class="text-silver max-w-2xl mx-auto">Bespoke consulting solutions crafted with precision and elegance for organizations that demand excellence.</p>
      </div>
      
      <!-- Consulting Services Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in consultingServices" 
          :key="service.id"
          class="card hover:bg-navy-light border border-navy-light hover:border-gold transition-all duration-500 group fade-up"
          ref="serviceCards"
          @click="toggleService(index)"
        >
          <!-- Card Icon -->
          <div class="mb-6 w-16 h-16 rounded-full bg-navy-light group-hover:bg-gold/20 flex items-center justify-center transition-all duration-500">
            <div class="text-gold" v-html="service.icon"></div>
          </div>
          
          <!-- Card Content -->
          <h3 class="heading-md text-silver group-hover:text-gold transition-colors duration-300 mb-4">{{ service.title }}</h3>
          <p class="text-silver-dark mb-6">{{ service.shortDescription }}</p>
          
          <!-- Expand Button -->
          <div class="flex items-center text-gold">
            <span>{{ service.expanded ? 'View Less' : 'Explore Service' }}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5 ml-2 transition-transform duration-300" 
              :class="{ 'rotate-180': service.expanded }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <!-- Expanded Content -->
          <div 
            class="overflow-hidden transition-all duration-500 mt-6"
            :style="{ maxHeight: service.expanded ? '1000px' : '0px', opacity: service.expanded ? 1 : 0 }"
          >
            <div class="pt-4 border-t border-navy-light">
              <p class="text-silver mb-4">{{ service.fullDescription }}</p>
              
              <!-- Service Features -->
              <ul class="space-y-2 mb-6">
                <li 
                  v-for="(feature, i) in service.features" 
                  :key="i"
                  class="flex items-start"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gold mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-silver-light">{{ feature }}</span>
                </li>
              </ul>
              
              <!-- CTA Button -->
              <button class="btn-primary w-full">
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const consultingHeader = ref(null);
const serviceCards = ref([]);

// Consulting services data
const consultingServices = ref([
  {
    id: 1,
    title: 'Supply Chain Optimization',
    shortDescription: 'Transform your supply chain with advanced mathematical optimization techniques and AI-driven insights.',
    fullDescription: 'Our supply chain optimization service leverages cutting-edge algorithms and decades of industry expertise to redesign your logistics network for maximum efficiency and resilience.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>`,
    features: [
      'Network design and optimization',
      'Inventory management strategies',
      'Transportation route optimization',
      'Multi-echelon inventory optimization',
      'Demand forecasting with machine learning'
    ],
    expanded: false
  },
  {
    id: 2,
    title: 'AI Strategy',
    shortDescription: 'Develop a comprehensive AI roadmap that aligns with your business objectives and delivers measurable ROI.',
    fullDescription: 'Our AI Strategy consulting service helps organizations identify high-value AI opportunities, develop implementation roadmaps, and build the necessary capabilities to succeed with artificial intelligence.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>`,
    features: [
      'AI opportunity assessment',
      'Technology selection and architecture',
      'Data strategy and governance',
      'AI talent and capability building',
      'Ethical AI framework development'
    ],
    expanded: false
  },
  {
    id: 3,
    title: 'Industrial Analytics',
    shortDescription: 'Harness the power of advanced analytics to optimize industrial operations and drive continuous improvement.',
    fullDescription: 'Our Industrial Analytics service combines deep domain expertise with cutting-edge data science to help manufacturing and industrial organizations extract actionable insights from their operational data.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>`,
    features: [
      'Predictive maintenance systems',
      'Quality analytics and optimization',
      'Energy consumption optimization',
      'Process mining and optimization',
      'Real-time monitoring dashboards'
    ],
    expanded: false
  }
]);

const toggleService = (index) => {
  consultingServices.value[index].expanded = !consultingServices.value[index].expanded;
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate section header
  gsap.from(consultingHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: consultingHeader.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate service cards
  if (serviceCards.value.length) {
    gsap.from(serviceCards.value, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: serviceCards.value[0],
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
});
</script>
