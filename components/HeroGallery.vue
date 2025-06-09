<template>
  <section class="hero-gallery relative overflow-hidden">
    <!-- Main Hero Image with Overlay Text -->
    <div class="relative h-screen">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-darkest to-blue-medium opacity-80"></div>
      <img src="/images/hero-brain.jpg" alt="AI Technology" class="w-full h-full object-cover" />
      
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 class="text-4xl md:text-6xl font-playfair text-white mb-6 tracking-wide">Intelligence. Precision. Elegance.</h1>
        <p class="text-xl text-white/90 max-w-3xl mb-8">Transforming complex data challenges into elegant, efficient solutions</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#courses" class="px-6 py-3 bg-azure text-white rounded hover:bg-blue-medium transition-all duration-300">Explore Courses</a>
          <a href="#about" class="px-6 py-3 border border-white/70 text-white rounded hover:bg-white/10 transition-all duration-300">Learn More</a>
        </div>
      </div>
    </div>

    <!-- Image Gallery Grid -->
    <div class="bg-black py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-playfair text-white text-center mb-12">Advanced Technology Solutions</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Image 1 -->
          <div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10"></div>
            <!-- <img src="/images/tech-globe.jpg" alt="Global Technology" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> -->
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 class="text-xl text-white font-medium">Global Reach</h3>
              <p class="text-white/80 text-sm mt-1">Connecting solutions across continents</p>
            </div>
          </div>
          
          <!-- Image 2 -->
          <div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10"></div>
            <img src="/images/tech-digital.jpg" alt="Digital Technology" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 class="text-xl text-white font-medium">Digital Innovation</h3>
              <p class="text-white/80 text-sm mt-1">Pioneering the future of technology</p>
            </div>
          </div>
          
          <!-- Image 3 -->
          <div class="group relative overflow-hidden rounded-lg aspect-video cursor-pointer">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-blue-darkest/80 z-10"></div>
            <img src="/images/tech-interface.jpg" alt="Technology Interface" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 class="text-xl text-white font-medium">Intelligent Interfaces</h3>
              <p class="text-white/80 text-sm mt-1">Intuitive solutions for complex problems</p>
            </div>
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
