<template>
  <section class="products-section py-16" style="background: linear-gradient(to right, #071B57, #0A1AD1);">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-playfair text-white mb-4">Premium Products</h2>
        <p class="text-white/90 max-w-2xl mx-auto">Advanced solutions designed with precision and elegance for optimal performance.</p>
      </div>
      
      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Product 1 -->
        <div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300">
          <div class="relative aspect-video overflow-hidden">
            <img src="/images/tech-interface.jpg" alt="Analytics Dashboard" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-4">
              <h3 class="text-xl text-white font-medium">Analytics Dashboard Pro</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-white/80 mb-4">Advanced analytics platform with real-time data processing and interactive visualizations.</p>
            <div class="flex justify-between items-center">
              <span class="text-azure-lighter font-medium">$1,299</span>
              <button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <!-- Product 2 -->
        <div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300">
          <div class="relative aspect-video overflow-hidden">
            <img src="/images/tech-digital.jpg" alt="Optimization Engine" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-4">
              <h3 class="text-xl text-white font-medium">Optimization Engine</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-white/80 mb-4">High-performance optimization software for complex systems and resource allocation.</p>
            <div class="flex justify-between items-center">
              <span class="text-azure-lighter font-medium">$2,499</span>
              <button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        <!-- Product 3 -->
        <div class="bg-black/20 rounded-lg overflow-hidden group hover:bg-blue-darkest/40 transition-all duration-300">
          <div class="relative aspect-video overflow-hidden">
            <img src="/images/foto5.jpg" alt="Predictive Analytics Suite" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-darkest/80 to-transparent"></div>
            <div class="absolute bottom-0 left-0 w-full p-4">
              <h3 class="text-xl text-white font-medium">Predictive Analytics Suite</h3>
            </div>
          </div>
          <div class="p-6">
            <p class="text-white/80 mb-4">Comprehensive predictive modeling tools with machine learning capabilities.</p>
            <div class="flex justify-between items-center">
              <span class="text-azure-lighter font-medium">$1,899</span>
              <button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Featured Product -->
      <div class="mt-16 bg-gradient-to-r from-blue-darker to-blue-medium rounded-lg overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="p-8 lg:p-12 flex flex-col justify-center">
            <h3 class="text-2xl md:text-3xl font-playfair text-white mb-4">Enterprise AI Platform</h3>
            <p class="text-white/90 mb-6">Our flagship product combines advanced analytics, optimization algorithms, and machine learning in a unified platform designed for enterprise-scale deployment.</p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-white">Real-time data processing and analysis</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-white">Advanced predictive modeling capabilities</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-azure-lighter mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-white">Seamless integration with existing systems</span>
              </li>
            </ul>
            <div class="flex items-center space-x-4">
              <span class="text-2xl text-white font-playfair">$4,999</span>
              <button class="px-6 py-3 bg-white text-blue-dark font-medium rounded-lg hover:bg-white/90 transition-colors duration-300">
                Request Demo
              </button>
            </div>
          </div>
          <div class="relative">
            <img src="/images/hero-brain.jpg" alt="Enterprise AI Platform" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-blue-medium/30"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
</script>

<style scoped>
/* Additional styling if needed */
</style>
