// Show welcome message on specific pages
function showWelcomeMessage() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'shop.html' || currentPage === 'men.html') {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'fixed bottom-4 right-4 z-50 animate-fade-in';
        welcomeDiv.innerHTML = `
            <div class="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-xs">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold">Welcome to Deron</h3>
                    <button onclick="window.location.href='index.html';" 
                            class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <p class="text-sm text-gray-600 mb-2">Order via:</p>
                <div class="flex flex-col gap-2">
                    <a href="https://www.instagram.com/deron_clothing?igsh=MW05OTc2bDQwZTc2NQ==" 
                       target="_blank"
                       class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:opacity-90">
                        <i class="fab fa-instagram"></i>
                        Instagram
                    </a>
                    <a href="https://wa.me/254701593586" 
                       target="_blank"
                       class="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg">
                        <i class="fab fa-whatsapp text-lg"></i>
                        WhatsApp Us Now
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(welcomeDiv);
    }
}

// Enable copy and right-click functionality
function enableCopyAndRightClick() {
    // Allow right-click context menu
    document.oncontextmenu = function() {
        return false;
    };

    // Enable text selection and copying
    document.onselectstart = function() {
        return false;
    };

    // Enable image right-click save
    document.querySelectorAll('img').forEach(img => {
        img.oncontextmenu = function() {
            return false;
        };
    });
}

// Create floating social media buttons
function createFloatingSocialButtons() {
    const container = document.createElement('div');
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3';

    // WhatsApp Button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/254701593586';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp text-2xl"></i>';

    // Instagram Button
    const instagramBtn = document.createElement('a');
    instagramBtn.href = 'https://www.instagram.com/deron_clothing?igsh=MW05OTc2bDQwZTc2NQ==';
    instagramBtn.target = '_blank';
    instagramBtn.className = 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all';
    instagramBtn.innerHTML = '<i class="fab fa-instagram text-2xl"></i>';

    container.appendChild(whatsappBtn);
    container.appendChild(instagramBtn);
    document.body.appendChild(container);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showWelcomeMessage();
    enableCopyAndRightClick();
    createFloatingSocialButtons();
    
    // Preserve existing contact form functionality if present
    if (typeof sendEmail === 'function') {
        // Keep existing contact form code
    }
});

// Enhanced product sorting functionality for both shop and men pages
function setupProductSorting() {
    document.querySelectorAll('#sortProducts').forEach(sortSelect => {
        sortSelect.addEventListener('change', function() {
            const container = this.closest('section').querySelector('.grid');
            const products = Array.from(container.querySelectorAll('.product-card, .coming-soon-card'));
            const itemCount = products.length;
            
            // Update item count display
            const countDisplay = this.closest('section').querySelector('.item-count');
            if (countDisplay) {
                countDisplay.textContent = `Showing ${itemCount} products`;
            }

            // Sort products
            products.sort((a, b) => {
                const priceTextA = a.querySelector('p').textContent;
                const priceTextB = b.querySelector('p').textContent;
                
                // Handle both "Ksh" prefix and plain numbers
                const priceA = parseFloat(priceTextA.replace('Ksh ', '').split('-')[0]);
                const priceB = parseFloat(priceTextB.replace('Ksh ', '').split('-')[0]);
                
                if (this.value === 'price-low') {
                    return priceA - priceB;
                } else if (this.value === 'price-high') {
                    return priceB - priceA;
                }
                return 0;
            });

            // Re-append sorted products
            products.forEach(product => container.appendChild(product));
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    showWelcomeMessage();
    enableCopyAndRightClick();
    createFloatingSocialButtons();
    setupProductSorting();
    
    // Preserve existing contact form functionality if present
    if (typeof sendEmail === 'function') {
        // Keep existing contact form code
    }
});

// Contact form email function (preserved)
function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    window.location.href = `mailto:piusmuchui0@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
}