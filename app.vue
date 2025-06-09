<template>
  <div class="app">
    <ProgressBar />
    <NavBar />
    <main>
      <HeroGallery />
      <AboutUs id="about" />
      <CoursesSection id="courses" />
      <ProductsSection id="products" />
      <GlobalTrustSection />
    </main>
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
});
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
