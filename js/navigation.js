// Centralized Navigation System - Unified across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if navigation container exists (for pages using centralized navigation)
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        // Navigation HTML structure matching homepage exactly
        const navigationHTML = `
            <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
              <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
                <div class="nav-wrapper" style="display: flex; justify-content: space-between; align-items: center; height: 70px;">
                  <div class="logo" style="display: flex; align-items: center;">
                    <a href="index.html" style="text-decoration: none; color: white; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700;">Allen Ralford Barkley</a>
                  </div>
                  <div class="nav-links" style="display: flex; align-items: center; gap: 30px;">
                    <a href="index.html" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">Home</a>
                    <div class="dropdown" style="position: relative; display: inline-block;">
                      <a href="#" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">Industries</a>
                      <div class="dropdown-content" style="display: none; position: absolute; background-color: white; min-width: 250px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 4px; padding: 10px 0; margin-top: 5px; opacity: 0; transform: translateY(-10px); transition: opacity 0.3s ease, transform 0.3s ease;">
                        <a href="manufacturing.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Manufacturing</a>
                        <a href="supply-chain-logistics.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Logistics & Supply Chain</a>
                        <a href="retail-ecommerce.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Retail & E-commerce</a>
                        <a href="automotive.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Automotive</a>
                        <a href="food-beverage.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Food & Beverage</a>
                        <a href="chemical-process-industries.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Chemical & Process Industries</a>
                        <a href="consumer-electronics-appliances.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Consumer Electronics & Appliances</a>
                        <a href="metal-machinery.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Metal & Machinery</a>
                        <a href="energy-utilities.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Energy & Utilities</a>
                      </div>
                    </div>
                    <div class="dropdown" style="position: relative; display: inline-block;">
                      <a href="#" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">Solutions</a>
                      <div class="dropdown-content" style="display: none; position: absolute; background-color: white; min-width: 250px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 4px; padding: 10px 0; margin-top: 5px; opacity: 0; transform: translateY(-10px); transition: opacity 0.3s ease, transform 0.3s ease;">
                        <a href="manufacturing-excellence.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Manufacturing Excellence</a>
                        <a href="manufacturing-excellence.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Manufacturing Excellence</a>
                        <a href="digital-operations.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Digital Operations</a>
                      </div>
                    </div>
                    <div class="dropdown" style="position: relative; display: inline-block;">
                      <a href="#" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">Services</a>
                      <div class="dropdown-content" style="display: none; position: absolute; background-color: white; min-width: 250px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; border-radius: 4px; padding: 10px 0; margin-top: 5px; opacity: 0; transform: translateY(-10px); transition: opacity 0.3s ease, transform 0.3s ease;">
                        <a href="strategy-consulting.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Strategy & Consulting</a>
                        <a href="implementation-delivery.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Implementation & Delivery</a>
                        <a href="analytics-intelligence.html" style="color: var(--blue-darkest); padding: 12px 16px; text-decoration: none; display: block; font-size: 14px; cursor: pointer;">Analytics & Intelligence</a>
                      </div>
                    </div>
                    <a href="#about" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">About</a>
                    <a href="#contact" class="nav-link" style="color: white; font-weight: 500; text-decoration: none;">Contact</a>
                  </div>
                </div>
              </div>
            </header>
        `;

        // Insert navigation HTML
        navContainer.innerHTML = navigationHTML;
    }
    
    // Initialize dropdown functionality for all pages
    setupDropdowns();
});

// Dropdown functionality
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (!dropdownContent) return;
        
        dropdown.addEventListener('mouseenter', () => {
            dropdownContent.style.display = 'block';
            setTimeout(() => {
                dropdownContent.style.opacity = '1';
                dropdownContent.style.transform = 'translateY(0)';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdownContent.style.opacity = '0';
            dropdownContent.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                dropdownContent.style.display = 'none';
            }, 300);
        });
    });
}
