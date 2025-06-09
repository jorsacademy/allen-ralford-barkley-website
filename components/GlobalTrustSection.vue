<template>
  <section class="section relative overflow-hidden" style="background: linear-gradient(to right, #000000, #111827);">
    <div class="container relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 fade-up" ref="globalHeader">
        <h2 class="text-white text-3xl md:text-4xl font-playfair font-medium mb-4">Global Trust</h2>
        <p class="text-white max-w-2xl mx-auto">Our expertise transcends borders, serving elite organizations across industries and continents.</p>
      </div>
      
      <!-- World Map -->
      <div class="world-map-container relative h-[500px] fade-up" ref="worldMap">
        <!-- SVG World Map -->
        <svg class="world-map w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Map Path (simplified world map outline) -->
          <path class="map-outline" d="M150,100 Q200,50 250,100 T350,100 T450,100 T550,100 T650,100 T750,100 T850,100 Q900,150 850,200 T750,200 T650,200 T550,200 T450,200 T350,200 T250,200 Q200,250 250,300 T350,300 T450,300 T550,300 T650,300 T750,300 T850,300 Q900,350 850,400 T750,400 T650,400 T550,400 T450,400 T350,400 T250,400 Q200,450 150,400" stroke="rgba(255, 255, 255, 0.3)" stroke-width="1" fill="none" />
          
          <!-- Client Location Pins -->
          <circle class="client-pin" cx="220" cy="150" r="4" fill="#6366f1" ref="pin1" />
          <circle class="client-pin" cx="480" cy="140" r="4" fill="#6366f1" ref="pin2" />
          <circle class="client-pin" cx="300" cy="280" r="4" fill="#7c3aed" ref="pin3" />
          <circle class="client-pin" cx="650" cy="200" r="4" fill="#7c3aed" ref="pin4" />
          <circle class="client-pin" cx="750" cy="180" r="4" fill="#6366f1" ref="pin5" />
          <circle class="client-pin" cx="400" cy="170" r="4" fill="#9333ea" ref="pin6" />
          <circle class="client-pin" cx="580" cy="300" r="4" fill="#9333ea" ref="pin7" />
        </svg>
        
        <!-- Client Details on Hover -->
        <div v-if="activePin" class="client-tooltip absolute p-4 rounded shadow-lg border border-white/20 z-10 w-64" style="background: linear-gradient(to right, #6366f1, #9333ea);" :style="tooltipStyle">
          <h4 class="text-white font-playfair mb-1">{{ activePin.name }}</h4>
          <p class="text-white text-sm">{{ activePin.location }}</p>
          <p class="text-white/80 text-sm mt-2">{{ activePin.project }}</p>
        </div>
      </div>
      
      <!-- Client Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div class="text-center fade-up" ref="statItem1">
          <div class="text-4xl font-playfair text-white mb-2" ref="statCounter1">0</div>
          <p class="text-white">Global Clients</p>
        </div>
        <div class="text-center fade-up" ref="statItem2">
          <div class="text-4xl font-playfair text-white mb-2" ref="statCounter2">0</div>
          <p class="text-white">Countries</p>
        </div>
        <div class="text-center fade-up" ref="statItem3">
          <div class="text-4xl font-playfair text-white mb-2" ref="statCounter3">0</div>
          <p class="text-white">Success Rate</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const globalHeader = ref(null);
const worldMap = ref(null);
const statItem1 = ref(null);
const statItem2 = ref(null);
const statItem3 = ref(null);
const statCounter1 = ref(null);
const statCounter2 = ref(null);
const statCounter3 = ref(null);
const pin1 = ref(null);
const pin2 = ref(null);
const pin3 = ref(null);
const pin4 = ref(null);
const pin5 = ref(null);
const pin6 = ref(null);
const pin7 = ref(null);

const activePin = ref(null);
const tooltipPosition = ref({ x: 0, y: 0 });

const tooltipStyle = computed(() => {
  return {
    left: `${tooltipPosition.value.x}px`,
    top: `${tooltipPosition.value.y}px`,
    transform: 'translate(-50%, -120%)'
  };
});

// Client data for pins
const clientData = [
  { id: 1, name: 'Premium Automotive Client', location: 'Munich, Germany', project: 'Supply Chain Optimization' },
  { id: 2, name: 'Global Beverage Corporation', location: 'Atlanta, USA', project: 'Distribution Network Optimization' },
  { id: 3, name: 'Energy Corporation', location: 'Rio de Janeiro, Brazil', project: 'Logistics Analytics Platform' },
  { id: 4, name: 'Automotive Manufacturer', location: 'Tokyo, Japan', project: 'Manufacturing AI Strategy' },
  { id: 5, name: 'Electronics Conglomerate', location: 'Seoul, South Korea', project: 'Smart Factory Implementation' },
  { id: 6, name: 'Home Appliance Leader', location: 'Berlin, Germany', project: 'Predictive Maintenance Systems' },
  { id: 7, name: 'Mining Corporation', location: 'Johannesburg, South Africa', project: 'Mining Operations Optimization' }
];

// Show client tooltip on pin hover
const showClientTooltip = (pinId, event) => {
  const clientId = parseInt(pinId.replace('pin', ''));
  activePin.value = clientData.find(client => client.id === clientId);
  
  // Get position from the event
  const rect = event.target.getBoundingClientRect();
  const mapRect = worldMap.value.getBoundingClientRect();
  
  tooltipPosition.value = {
    x: rect.left - mapRect.left + rect.width / 2,
    y: rect.top - mapRect.top
  };
};

const hideClientTooltip = () => {
  activePin.value = null;
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate section header
  gsap.from(globalHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: globalHeader.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate world map
  gsap.from(worldMap.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: worldMap.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate pins with glow effect
  const pins = [pin1.value, pin2.value, pin3.value, pin4.value, pin5.value, pin6.value, pin7.value];
  
  pins.forEach((pin, index) => {
    // Skip if pin ref is not available
    if (!pin) return;
    
    // Initial scale
    gsap.set(pin, { scale: 0, transformOrigin: 'center center' });
    
    // Animate pin appearance
    gsap.to(pin, {
      scale: 1,
      duration: 0.5,
      delay: 0.5 + index * 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: worldMap.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Pulsating animation
    gsap.to(pin, {
      scale: 1.5,
      opacity: 0.7,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1 + index * 0.1,
      scrollTrigger: {
        trigger: worldMap.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Add event listeners for tooltip
    pin.addEventListener('mouseenter', (e) => showClientTooltip(`pin${index + 1}`, e));
    pin.addEventListener('mouseleave', hideClientTooltip);
  });
  
  // Animate statistics counters
  const animateCounter = (target, endValue, duration, delay) => {
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration: duration,
      delay: delay,
      ease: 'power1.inOut',
      onUpdate: () => {
        target.textContent = Math.round(obj.value);
      },
      scrollTrigger: {
        trigger: target,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  };
  
  // Animate stat items
  [statItem1.value, statItem2.value, statItem3.value].forEach((item, index) => {
    gsap.from(item, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.2 * index,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Animate counters
  animateCounter(statCounter1.value, 120, 2, 0.5);
  animateCounter(statCounter2.value, 28, 2, 0.7);
  animateCounter(statCounter3.value, 99, 2, 0.9);
});
</script>

<style scoped>
.world-map-container {
  position: relative;
}

.map-outline {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawMap 3s ease forwards;
}

@keyframes drawMap {
  to {
    stroke-dashoffset: 0;
  }
}

.client-pin {
  cursor: pointer;
  filter: drop-shadow(0 0 5px rgba(99, 102, 241, 0.6));
}

.client-tooltip {
  pointer-events: none;
  transition: opacity 0.3s ease;
}
</style>
