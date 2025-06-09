<template>
  <section id="about" class="section bg-gradient-to-r from-indigo-700 to-purple-800 relative overflow-hidden">
    <div class="container-custom relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="fade-up" ref="aboutContent">
          <h2 class="heading-lg text-white mb-6">About Allen Ralford Barkley</h2>
          <p class="text-silver mb-6 text-lg leading-relaxed">
            Allen Ralford Barkley stands at the forefront of optimization science and artificial intelligence, guiding global enterprises through complex transformations with precision and elegance.
          </p>
          <p class="text-silver mb-8 text-lg leading-relaxed">
            Our philosophy is simple: intelligence without precision is chaos; precision without elegance is inefficiency. We deliver all three in perfect harmony.
          </p>
          
          <!-- Client Trust Badges -->
          <div class="mt-10">
            <h3 class="text-silver-light text-sm uppercase tracking-wider mb-4">Trusted By Global Leaders</h3>
            <div class="flex flex-wrap items-center gap-8">
              <div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300">
                <svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" stroke-width="1.5" />
                  <path d="M6 12H18" stroke="#FFFFFF" stroke-width="1.5" />
                  <path d="M12 6V18" stroke="#FFFFFF" stroke-width="1.5" />
                </svg>
                <span class="text-silver-light text-xs mt-1 block">Global Enterprise</span>
              </div>
              <div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300">
                <svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M3 12H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M3 18H21" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <span class="text-silver-light text-xs mt-1 block">Industry Leaders</span>
              </div>
              <div class="trust-badge opacity-70 hover:opacity-100 transition-opacity duration-300">
                <svg class="h-8 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FFFFFF" stroke-width="1.5" />
                  <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z" stroke="#FFFFFF" stroke-width="1.5" />
                </svg>
                <span class="text-silver-light text-xs mt-1 block">Fortune 500</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Image/Profile -->
        <div class="relative">
          <div class="aspect-[4/5] bg-navy-light rounded-lg overflow-hidden relative fade-up" ref="aboutImage">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-40 h-40 bg-gold/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
            
            <!-- Profile content -->
            <div class="absolute inset-0 flex flex-col justify-end p-8">
              <div class="w-16 h-1 bg-gold mb-4"></div>
              <h3 class="text-gold text-2xl font-playfair mb-2">Allen Ralford Barkley</h3>
              <p class="text-silver-light">Founder & Principal Consultant</p>
            </div>
          </div>
          
          <!-- Decorative element -->
          <div class="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-gold/30 rounded-lg z-0"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const aboutContent = ref(null);
const aboutImage = ref(null);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate content when scrolled into view
  gsap.from(aboutContent.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: aboutContent.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate image when scrolled into view
  gsap.from(aboutImage.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: aboutImage.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
});
</script>

<style scoped>
.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
