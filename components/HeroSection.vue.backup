<template>
  <section id="hero" class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 z-0"></div>
    
    <!-- Particle Overlay -->
    <div class="particles-bg absolute inset-0 z-1" ref="particlesContainer"></div>
    
    <!-- Content -->
    <div class="container-custom relative z-10 text-center">
      <h1 class="heading-xl text-silver mb-6 opacity-0" ref="heroTitle">
        <span class="block">Intelligence.</span>
        <span class="block">Precision.</span>
        <span class="block text-white">Elegance.</span>
      </h1>
      <p class="text-silver-light text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0" ref="heroSubtitle">
        Premium consulting services and technical courses for those who demand excellence in optimization, AI, and analytics.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" ref="heroButtons">
        <button class="bg-blue-light hover:bg-blue text-white px-6 py-3 rounded transition-all duration-300 w-full sm:w-auto">Explore Courses</button>
        <button class="border border-silver text-white px-6 py-3 rounded hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">Book Consulting</button>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-silver animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const particlesContainer = ref(null);
const heroTitle = ref(null);
const heroSubtitle = ref(null);
const heroButtons = ref(null);
let particles = [];

const createParticles = () => {
  const container = particlesContainer.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const x = Math.random() * containerWidth;
    const y = Math.random() * containerHeight;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random opacity
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    container.appendChild(particle);
    particles.push(particle);
    
    // Animate particle
    gsap.to(particle, {
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      duration: Math.random() * 20 + 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
};

const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.to(heroTitle.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  })
  .to(heroSubtitle.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5')
  .to(heroButtons.value, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.5');
};

onMounted(() => {
  createParticles();
  animateHero();
});

onUnmounted(() => {
  // Clean up particles
  particles.forEach(particle => {
    gsap.killTweensOf(particle);
  });
});
</script>

<style scoped>
.particles-bg {
  background: linear-gradient(to bottom, #0A1733, #060F24);
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.3);
  pointer-events: none;
}
</style>
