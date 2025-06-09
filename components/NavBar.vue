<template>
  <!-- Main Navigation - Black Header -->
  <nav class="fixed top-0 left-0 w-full z-40">
    <!-- Top Black Header -->
    <div class="bg-black transition-all duration-300" :class="{ 'py-2': scrolled, 'py-3': !scrolled }">
      <div class="container-custom flex items-center justify-between">
        <!-- Logo -->
        <div class="logo">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-white text-xl md:text-2xl font-playfair tracking-wider">Allen Ralford Barkley</span>
          </NuxtLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-silver hover:text-white transition-colors duration-300">Home</NuxtLink>
          <NuxtLink to="/about" class="text-silver hover:text-white transition-colors duration-300">About</NuxtLink>
          <NuxtLink to="/courses" class="text-silver hover:text-white transition-colors duration-300">Courses</NuxtLink>
          <NuxtLink to="/products" class="text-silver hover:text-white transition-colors duration-300">Products</NuxtLink>
          <NuxtLink to="/consulting" class="text-silver hover:text-white transition-colors duration-300">Consulting</NuxtLink>
          <button @click="showBookingModal = true" class="bg-azure hover:bg-blue text-white px-4 py-2 rounded transition-colors duration-300">Book Discovery Call</button>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-silver hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Submenu with Blue Gradient Background -->
    <div class="bg-gradient-to-r from-blue-medium to-azure py-3" style="background: linear-gradient(to right, #0918BF, #2C6EC7, #3E7CC8);">
      <div class="container-custom flex justify-center">
        <div class="flex space-x-12">
          <NuxtLink to="/gallery" class="flex flex-col items-center group">
            <span class="text-white/80 group-hover:text-white transition-colors duration-300">Gallery</span>
            <div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"></div>
          </NuxtLink>
          <NuxtLink to="/models" class="flex flex-col items-center group">
            <span class="text-white/80 group-hover:text-white transition-colors duration-300">Models</span>
            <div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"></div>
          </NuxtLink>
          <NuxtLink to="/premium" class="flex flex-col items-center group">
            <span class="text-white/80 group-hover:text-white transition-colors duration-300">Premium Services</span>
            <div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"></div>
          </NuxtLink>
          <NuxtLink to="/build" class="flex flex-col items-center group">
            <span class="text-white/80 group-hover:text-white transition-colors duration-300">Build</span>
            <div class="mt-1 w-1.5 h-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors duration-300"></div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-black-light absolute top-full left-0 w-full py-4 px-4 flex flex-col space-y-4">
      <NuxtLink to="/" class="text-silver hover:text-white transition-colors duration-300">Home</NuxtLink>
      <NuxtLink to="/about" class="text-silver hover:text-white transition-colors duration-300">About</NuxtLink>
      <NuxtLink to="/courses" class="text-silver hover:text-white transition-colors duration-300">Courses</NuxtLink>
      <NuxtLink to="/consulting" class="text-silver hover:text-white transition-colors duration-300">Consulting</NuxtLink>
      <button @click="showBookingModal = true; mobileMenuOpen = false" class="bg-blue-light hover:bg-blue text-white px-4 py-2 rounded transition-colors duration-300 w-full">Book Discovery Call</button>
    </div>
    
    <!-- Side Navigation Dots (Mercedes style) -->
    <div class="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col space-y-4 z-50">
      <a href="#hero" class="w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300" :class="{ 'bg-white': activeSection === 'hero' }"></a>
      <a href="#about" class="w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300" :class="{ 'bg-white': activeSection === 'about' }"></a>
      <a href="#courses" class="w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300" :class="{ 'bg-white': activeSection === 'courses' }"></a>
      <a href="#consulting" class="w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300" :class="{ 'bg-white': activeSection === 'consulting' }"></a>
      <a href="#global" class="w-2 h-2 rounded-full bg-silver-light hover:bg-white transition-colors duration-300" :class="{ 'bg-white': activeSection === 'global' }"></a>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 bg-navy-dark/90 flex items-center justify-center z-50 p-4">
      <div class="bg-navy max-w-md w-full rounded-lg p-8 relative">
        <button @click="showBookingModal = false" class="absolute top-4 right-4 text-silver hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="heading-md text-gold mb-4">Book Your Discovery Call</h2>
        <p class="text-silver mb-6">Schedule a complimentary 30-minute consultation to discuss your needs and how we can help elevate your business.</p>
        <form @submit.prevent="submitBookingForm" class="space-y-4">
          <div>
            <label for="name" class="block text-silver mb-1">Full Name</label>
            <input type="text" id="name" v-model="bookingForm.name" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="email" class="block text-silver mb-1">Email Address</label>
            <input type="email" id="email" v-model="bookingForm.email" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="service" class="block text-silver mb-1">Service Interest</label>
            <select id="service" v-model="bookingForm.service" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
              <option value="">Select a service</option>
              <option value="supply-chain">Supply Chain Optimization</option>
              <option value="ai-strategy">AI Strategy</option>
              <option value="industrial-analytics">Industrial Analytics</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" class="btn-primary w-full">Request Call</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const showBookingModal = ref(false);
const progressIndicator = ref(null);

const bookingForm = ref({
  name: '',
  email: '',
  service: ''
});

const submitBookingForm = () => {
  // In a real app, you would send this data to your backend
  console.log('Form submitted:', bookingForm.value);
  alert('Thank you! We will contact you shortly to schedule your discovery call.');
  showBookingModal.value = false;
  bookingForm.value = { name: '', email: '', service: '' };
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
  
  // Update vertical progress bar
  if (progressIndicator.value) {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    gsap.to(progressIndicator.value, {
      height: `${scrollPercentage}%`,
      duration: 0.3,
      ease: 'power1.out'
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.progress-indicator {
  transition: height 0.3s ease;
}
</style>
