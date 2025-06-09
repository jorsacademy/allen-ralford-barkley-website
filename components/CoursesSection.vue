<template>
  <section class="section relative overflow-hidden" style="background: linear-gradient(to right, #022593, #071B57);">
    <div class="container mx-auto px-4 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 fade-up" ref="coursesHeader">
        <h2 class="text-3xl md:text-4xl font-playfair text-white mb-4">Premium Technical Courses</h2>
        <p class="text-white/90 max-w-2xl mx-auto">Elevate your expertise with our meticulously crafted courses, designed for professionals who demand excellence.</p>
      </div>
      
      <!-- Filter Tags -->
      <div class="flex flex-wrap justify-center gap-3 mb-12 fade-up" ref="filterTags">
        <button 
          v-for="tag in tags" 
          :key="tag.id" 
          @click="toggleFilter(tag.id)" 
          class="px-4 py-2 rounded-full text-sm transition-all duration-300"
          :class="activeFilters.includes(tag.id) ? 'bg-azure text-white' : 'bg-blue-darkest/50 text-white border border-blue-medium/30 hover:border-azure-light'"
        >
          {{ tag.name }}
        </button>
      </div>
      
      <!-- Course Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="course in filteredCourses" 
          :key="course.id" 
          class="bg-black/30 rounded-lg p-6 group hover:bg-blue-darkest/50 transition-all duration-500 overflow-hidden fade-up course-card"
          ref="courseCards"
        >
          <!-- Card Top Section with Image -->
          <div class="h-48 -mx-6 -mt-6 mb-6 overflow-hidden relative">
            <div 
              class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              :style="{ backgroundImage: `url(${course.image})` }"
            ></div>
            <div class="absolute inset-0 bg-gradient-to-t from-blue-darkest to-transparent"></div>
            
            <!-- Course Tags -->
            <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <span 
                v-for="tagId in course.tags" 
                :key="tagId" 
                class="px-2 py-1 bg-blue-medium/80 text-white text-xs rounded"
              >
                {{ findTagName(tagId) }}
              </span>
            </div>
          </div>
          
          <!-- Course Content -->
          <div>
            <h3 class="text-xl font-playfair text-white mb-2">{{ course.title }}</h3>
            <p class="text-white/80 mb-4">{{ course.description }}</p>
            
            <!-- Course Details -->
            <div class="flex items-center justify-between text-sm text-white/70 mb-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ course.duration }}
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {{ course.level }}
              </div>
            </div>
            
            <!-- Price and Button -->
            <div class="flex items-center justify-between mt-6">
              <div class="text-azure-lighter font-playfair text-xl">{{ course.price }}</div>
              <button class="px-4 py-2 bg-azure hover:bg-blue-medium text-white rounded transition-colors duration-300">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const coursesHeader = ref(null);
const filterTags = ref(null);
const courseCards = ref([]);

// Filter tags
const tags = [
  { id: 'all', name: 'All Courses' },
  { id: 'optimization', name: 'Optimization' },
  { id: 'ai', name: 'Artificial Intelligence' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'python', name: 'Python' },
  { id: 'rl', name: 'Reinforcement Learning' }
];

const activeFilters = ref(['all']);

const toggleFilter = (tagId) => {
  if (tagId === 'all') {
    activeFilters.value = ['all'];
    return;
  }
  
  // Remove 'all' if it's active
  if (activeFilters.value.includes('all')) {
    activeFilters.value = activeFilters.value.filter(id => id !== 'all');
  }
  
  // Toggle the selected filter
  if (activeFilters.value.includes(tagId)) {
    activeFilters.value = activeFilters.value.filter(id => id !== tagId);
    // If no filters are active, activate 'all'
    if (activeFilters.value.length === 0) {
      activeFilters.value = ['all'];
    }
  } else {
    activeFilters.value.push(tagId);
  }
};

const findTagName = (tagId) => {
  const tag = tags.find(t => t.id === tagId);
  return tag ? tag.name : '';
};

// Course data
const courses = [
  {
    id: 1,
    title: 'Advanced Supply Chain Optimization',
    description: 'Master the art of supply chain optimization using cutting-edge algorithms and mathematical models to solve complex logistics problems.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '8 Weeks',
    level: 'Advanced',
    tags: ['optimization', 'analytics']
  },
  {
    id: 2,
    title: 'Reinforcement Learning for Decision Making',
    description: 'Explore the frontier of AI with practical reinforcement learning techniques that can be applied to real-world decision-making scenarios.',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '10 Weeks',
    level: 'Expert',
    tags: ['ai', 'rl', 'python']
  },
  {
    id: 3,
    title: 'Industrial Analytics & Predictive Maintenance',
    description: 'Learn how to implement predictive maintenance systems using advanced analytics to reduce downtime and optimize industrial operations.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '6 Weeks',
    level: 'Intermediate',
    tags: ['analytics', 'python']
  },
  {
    id: 4,
    title: 'Python for Optimization Science',
    description: 'A comprehensive course on using Python to solve complex optimization problems in various domains including logistics, finance, and manufacturing.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '8 Weeks',
    level: 'Intermediate',
    tags: ['optimization', 'python']
  },
  {
    id: 5,
    title: 'Deep Learning for Time Series Analysis',
    description: 'Master the application of deep learning techniques to time series data for forecasting, anomaly detection, and pattern recognition.',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '9 Weeks',
    level: 'Advanced',
    tags: ['ai', 'analytics', 'python']
  },
  {
    id: 6,
    title: 'Column Generation for Large-Scale Optimization',
    description: 'An advanced course on column generation techniques for solving large-scale linear and integer programming problems efficiently.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    duration: '10 Weeks',
    level: 'Expert',
    tags: ['optimization']
  }
];

const filteredCourses = computed(() => {
  if (activeFilters.value.includes('all')) {
    return courses;
  }
  
  return courses.filter(course => {
    return course.tags.some(tag => activeFilters.value.includes(tag));
  });
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate section header
  gsap.from(coursesHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: coursesHeader.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate filter tags
  gsap.from(filterTags.value, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: filterTags.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Animate course cards
  if (courseCards.value.length) {
    gsap.from(courseCards.value, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: courseCards.value[0],
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }
});
</script>

<style scoped>
.course-card {
  transform: translateY(0);
  transition: transform 0.5s ease;
}

.course-card:hover {
  transform: translateY(-10px);
}
</style>
