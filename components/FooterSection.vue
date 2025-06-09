<template>
  <footer class="bg-navy-dark py-12 border-t border-navy">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row justify-between items-center mb-12">
        <!-- Logo -->
        <div class="mb-6 md:mb-0">
          <h2 class="text-gold text-2xl font-playfair tracking-wider">Allen Ralford Barkley</h2>
          <p class="text-silver-dark mt-2">Intelligence. Precision. Elegance.</p>
        </div>
        
        <!-- Contact -->
        <div class="flex flex-col items-center md:items-end">
          <a href="mailto:contact@allenralfordbarkley.com" class="text-silver hover:text-gold transition-colors duration-300 mb-2">contact@allenralfordbarkley.com</a>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-silver hover:text-gold transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" class="text-silver hover:text-gold transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-silver hover:text-gold transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Bottom Links -->
      <div class="border-t border-navy pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <div class="flex flex-wrap justify-center md:justify-start gap-6 mb-4 md:mb-0">
          <a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Privacy Policy</a>
          <a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Terms of Service</a>
          <a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">Cookie Policy</a>
          <a href="#" class="text-silver-dark hover:text-silver transition-colors duration-300">GDPR</a>
        </div>
        <div class="text-silver-dark">
          © {{ new Date().getFullYear() }} Allen Ralford Barkley. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>
