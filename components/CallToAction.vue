<template>
  <div>
    <!-- Floating Action Button -->
    <button 
      @click="showModal = true" 
      class="fixed bottom-8 right-8 z-40 bg-gold text-navy-dark rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gold-light transition-all duration-300 group"
      :class="{ 'scale-110': buttonHovered }"
      @mouseenter="buttonHovered = true"
      @mouseleave="buttonHovered = false"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span class="absolute right-full mr-3 bg-navy text-silver px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">Book Discovery Call</span>
    </button>
    
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-navy-dark/90 flex items-center justify-center z-50 p-4">
      <div class="bg-navy max-w-md w-full rounded-lg p-8 relative">
        <button @click="showModal = false" class="absolute top-4 right-4 text-silver hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 class="heading-md text-gold mb-4">Book Your Discovery Call</h2>
        <p class="text-silver mb-6">Schedule a complimentary 30-minute consultation to discuss your needs and how we can help elevate your business.</p>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="block text-silver mb-1">Full Name</label>
            <input type="text" id="name" v-model="form.name" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="email" class="block text-silver mb-1">Email Address</label>
            <input type="email" id="email" v-model="form.email" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="phone" class="block text-silver mb-1">Phone Number</label>
            <input type="tel" id="phone" v-model="form.phone" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="company" class="block text-silver mb-1">Company</label>
            <input type="text" id="company" v-model="form.company" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
          </div>
          <div>
            <label for="service" class="block text-silver mb-1">Service Interest</label>
            <select id="service" v-model="form.service" class="w-full bg-navy-light text-silver p-3 rounded border border-navy-light focus:border-gold outline-none" required>
              <option value="">Select a service</option>
              <option value="supply-chain">Supply Chain Optimization</option>
              <option value="ai-strategy">AI Strategy</option>
              <option value="industrial-analytics">Industrial Analytics</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button type="submit" class="btn-primary w-full">
            <span v-if="!submitting">Request Call</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-navy-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const buttonHovered = ref(false);
const submitting = ref(false);

const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: ''
});

const submitForm = () => {
  submitting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    submitting.value = false;
    showModal.value = false;
    alert('Thank you! We will contact you shortly to schedule your discovery call.');
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: ''
    };
  }, 1500);
};
</script>
