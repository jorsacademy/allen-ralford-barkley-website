<template>
  <main>
    <HeroSection />
    <AboutSection />
    <CoursesSection />
    <ConsultingSection />
    <GlobalTrustSection />
    <FooterSection />
    <CallToAction />
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize any global animations here
  const fadeUpElements = document.querySelectorAll('.fade-up');
  
  fadeUpElements.forEach(element => {
    gsap.from(element, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
});
</script>
