// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the application
    initApp();
    
    // Highlight current day in schedule
    highlightCurrentDay();
    
    // Add smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add active class to current section in nav
    setupScrollSpy();
});

// Initialize the application
function initApp() {
    // Get current date
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('es-ES', options);
    
    // Create a welcome message with current date
    const main = document.querySelector('main');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <h2>Bienvenido al HUB CENTRAL</h2>
        <p>Hoy es ${formattedDate}</p>
    `;
    
    // Insert at the beginning of main content
    main.insertBefore(welcomeMessage, main.firstChild);
    
    // Add styles for welcome message
    const style = document.createElement('style');
    style.textContent = `
        .welcome-message {
            background-color: #050A30;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .welcome-message h2 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        .welcome-message p {
            color: #ffffff;
            font-size: 1.1rem;
        }
    `;
    document.head.appendChild(style);
}

// Highlight current day in schedule
function highlightCurrentDay() {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
    
    // Skip if today is weekend (0 = Sunday, 6 = Saturday)
    if (today === 0 || today === 6) return;
    
    // Adjust for our table (1 = Monday, 5 = Friday)
    const dayColumn = today;
    
    // Get all rows in the schedule table
    const scheduleTable = document.getElementById('schedule-table');
    if (!scheduleTable) return;
    
    const rows = scheduleTable.querySelectorAll('tbody tr');
    
    // Highlight cells for today
    rows.forEach(row => {
        const todayCell = row.querySelectorAll('td')[dayColumn];
        if (todayCell) {
            todayCell.style.backgroundColor = 'rgba(52, 152, 219, 0.3)';
            todayCell.style.fontWeight = 'bold';
        }
    });
    
    // Highlight header for today
    const headerRow = scheduleTable.querySelector('thead tr');
    if (headerRow) {
        const todayHeader = headerRow.querySelectorAll('th')[dayColumn];
        if (todayHeader) {
            todayHeader.style.backgroundColor = '#2980b9';
        }
    }
}

// Add smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the sticky nav height to offset the scroll position
                const navHeight = document.querySelector('nav').offsetHeight;
                
                // Calculate the target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // Scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add active class to current section in nav
function setupScrollSpy() {
    // Get all sections
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        // Get current scroll position
        let current = '';
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10; // 10px offset
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                
                // Add styles for active links if not already added
                if (!document.querySelector('style#active-nav-styles')) {
                    const style = document.createElement('style');
                    style.id = 'active-nav-styles';
                    style.textContent = `
                        nav a.active {
                            background-color: rgba(255, 255, 255, 0.2);
                            font-weight: bold;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        });
    });
}

// Add hover effect for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('nav li');
    
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});