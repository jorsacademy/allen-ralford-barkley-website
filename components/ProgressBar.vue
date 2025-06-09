<template>
  <div class="progress-bar" ref="progressBar"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const progressBar = ref(null);

const updateProgressBar = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = scrollTop / scrollHeight;

  gsap.to(progressBar.value, {
    scaleX: scrollPercentage,
    duration: 0.1,
    ease: 'none'
  });
};

onMounted(() => {
  window.addEventListener('scroll', updateProgressBar);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgressBar);
});
</script>
