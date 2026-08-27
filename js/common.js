// ═════════════════════════════════════════════════════════
// COMMON FUNCTIONS
// ═════════════════════════════════════════════════════════

// Theme Toggle
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('sp-theme', isDark ? 'dark' : 'light');
}

// Initialize theme on page load
(function() {
  const saved = localStorage.getItem('sp-theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  }
})();

// Popup Functions
function showPopup() {
  document.getElementById('confirmPopup')?.classList.add('show');
}

function closePopup() {
  document.getElementById('confirmPopup')?.classList.remove('show');
}

function confirmDownload() {
  closePopup();
  downloadVCard();
  setTimeout(showSuccessPopup, 400);
}

function showSuccessPopup() {
  document.getElementById('successPopup')?.classList.add('show');
  setTimeout(closeSuccessPopup, 3000);
}

function closeSuccessPopup() {
  document.getElementById('successPopup')?.classList.remove('show');
}

// Download vCard (contact)
function downloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Himmat Singh",
    "N:Singh;Himmat;;;",
    "ORG:Shekhawat Packers",
    "TITLE:Proprietor",
    "TEL;TYPE=CELL,VOICE:+919582392131",
    "EMAIL;TYPE=WORK:shekhawatpackers04@gmail.com",
    "ADR;TYPE=WORK:;;IX-6278 Jain Mandir Gali Gandhi Nagar;Dharampura;East Delhi;110031;India",
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Himmat_Singh_ShekhawatPackers.vcf";
  document.body.appendChild(link);
  link.click();
  
  setTimeout(function() {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
}

// Set active nav tab on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navTabs = document.querySelectorAll('.nav-tab');
  
  navTabs.forEach(tab => {
    // Remove active class from all tabs
    tab.classList.remove('active');
    
    // Add active class to current tab
    const href = tab.getAttribute('href');
    if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) {
      tab.classList.add('active');
    } else if (href && href !== '/' && currentPath.includes(href.replace('.html', ''))) {
      tab.classList.add('active');
    }
  });
});

// ═════════════════════════════════════════════════════════
// DECAP CMS INTEGRATION
// ═════════════════════════════════════════════════════════

// Decap CMS Configuration (embedded)
// The admin panel is at /admin/
// Blog posts are stored in collections/blog/

// For local development with Decap CMS:
// 1. Create admin/config.yml with your CMS configuration
// 2. Create collections/blog/ folder for blog posts
// 3. Posts will be in markdown format with frontmatter

// Example blog post structure in markdown:
// ---
// title: "Blog Post Title"
// date: 2024-08-20
// author: "Himmat Singh"
// category: "Packaging Tips"
// image: "/images/image.jpg"
// ---
// Your blog content here...

// Load blog posts from Decap CMS JSON export
async function loadBlogPostsFromDecap() {
  try {
    // Try to load from Decap's public JSON export
    // This file should be generated when you export/build
    const response = await fetch('/api/posts.json');
    
    if (response.ok) {
      const posts = await response.json();
      return Array.isArray(posts) ? posts : posts.posts || [];
    }
  } catch (error) {
    console.log('Could not load from Decap CMS, using fallback');
  }
  
  return null;
}

// Helper to format date
function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  
  try {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (error) {
    return dateString;
  }
}

// ═════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═════════════════════════════════════════════════════════

// Smooth scroll to element
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Debounce function for event handlers
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle function for event handlers
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ═════════════════════════════════════════════════════════
// ANALYTICS & TRACKING
// ═════════════════════════════════════════════════════════

// Track page view (if Google Analytics is loaded)
function trackPageView(pageName) {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      'page_title': pageName,
      'page_path': window.location.pathname
    });
  }
}

// Track button clicks
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// ═════════════════════════════════════════════════════════
// SEARCH FUNCTIONALITY
// ═════════════════════════════════════════════════════════

// Search in blog posts
function searchBlogPosts(query, posts) {
  if (!query || !posts) return posts;
  
  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title?.toLowerCase().includes(lowerQuery) ||
    post.excerpt?.toLowerCase().includes(lowerQuery) ||
    post.category?.toLowerCase().includes(lowerQuery) ||
    post.author?.toLowerCase().includes(lowerQuery)
  );
}

// Filter posts by category
function filterPostsByCategory(category, posts) {
  if (!category || !posts) return posts;
  return posts.filter(post => post.category === category);
}

// Sort posts by date
function sortPostsByDate(posts, order = 'desc') {
  if (!posts) return [];
  
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

// ═════════════════════════════════════════════════════════
// IMAGE OPTIMIZATION
// ═════════════════════════════════════════════════════════

// Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// ═════════════════════════════════════════════════════════
// CONTACT FORM UTILITIES
// ═════════════════════════════════════════════════════════

// Send WhatsApp message
function sendWhatsApp(phone, message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// Validate email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validate phone number (India)
function isValidPhone(phone) {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
}

// ═════════════════════════════════════════════════════════
// LOCAL STORAGE UTILITIES
// ═════════════════════════════════════════════════════════

// Save data to localStorage
function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

// Get data from localStorage
function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

// Remove data from localStorage
function removeFromLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
}

// ═════════════════════════════════════════════════════════
// DEVICE DETECTION
// ═════════════════════════════════════════════════════════

// Detect if device is mobile
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get device type
function getDeviceType() {
  if (isMobileDevice()) {
    return navigator.userAgent.indexOf('iPad') > -1 ? 'tablet' : 'mobile';
  }
  return 'desktop';
}

// ═════════════════════════════════════════════════════════
// INITIALIZATION
// ═════════════════════════════════════════════════════════

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize lazy loading
  lazyLoadImages();
  
  // Set active nav
  setActiveNavigation();
  
  // Track page view
  const pageName = document.querySelector('.page-header h1')?.textContent || document.title;
  trackPageView(pageName);
});

// Set active navigation
function setActiveNavigation() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-tab');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if ((href === '/' && currentPath === '/') ||
        (href !== '/' && currentPath.includes(href))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleTheme,
    showPopup,
    closePopup,
    downloadVCard,
    formatDate,
    searchBlogPosts,
    filterPostsByCategory,
    sortPostsByDate,
    lazyLoadImages,
    sendWhatsApp,
    isValidEmail,
    isValidPhone,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    isMobileDevice,
    getDeviceType
  };
}
