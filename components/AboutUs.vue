<template>
  <section class="about-us py-16 bg-gradient-to-r from-blue-darkest to-blue-dark">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- About Text Content -->
        <div class="text-white">
          <h2 class="text-3xl md:text-4xl font-playfair mb-6">About Allen Ralford Barkley</h2>
          <p class="mb-4 text-lg leading-relaxed">
            Allen Ralford Barkley has been at the forefront of optimization and analytics, delivering exceptional results for prestigious clients worldwide.
          </p>
          <p class="mb-6 text-lg leading-relaxed">
            With a unique blend of technical expertise and strategic insight, we transform complex data challenges into elegant, efficient solutions that drive measurable business outcomes.
          </p>
          
          <!-- Key Values -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="bg-white/10 p-5 rounded-lg">
              <h3 class="text-xl font-medium mb-2 text-azure-lighter">Excellence</h3>
              <p>We maintain the highest standards in every aspect of our work, from analysis to implementation.</p>
            </div>
            <div class="bg-white/10 p-5 rounded-lg">
              <h3 class="text-xl font-medium mb-2 text-azure-lighter">Innovation</h3>
              <p>We constantly push boundaries to develop cutting-edge solutions for complex challenges.</p>
            </div>
            <div class="bg-white/10 p-5 rounded-lg">
              <h3 class="text-xl font-medium mb-2 text-azure-lighter">Precision</h3>
              <p>Our methodical approach ensures accurate, reliable results that clients can trust.</p>
            </div>
            <div class="bg-white/10 p-5 rounded-lg">
              <h3 class="text-xl font-medium mb-2 text-azure-lighter">Partnership</h3>
              <p>We work closely with clients to understand their unique needs and deliver tailored solutions.</p>
            </div>
          </div>
        </div>
        
        <!-- About Image with Logo Overlay -->
        <div class="relative">
          <div class="rounded-lg overflow-hidden shadow-xl">
            <img src="/images/logo-bg.jpg" alt="Allen Ralford Barkley" class="w-full h-auto" />
          </div>
          
          <!-- Logo Overlay -->
          <div class="absolute inset-0 flex items-center justify-center bg-blue-darkest/60 rounded-lg">
            <div class="text-center p-8 bg-gradient-to-r from-blue-medium to-azure rounded-lg transform -rotate-3 shadow-lg">
              <h2 class="text-4xl font-playfair text-white mb-2">Allen Ralford Barkley</h2>
              <p class="text-white/80 text-lg">Intelligence • Precision • Elegance</p>
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
