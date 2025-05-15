// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
    }
    
    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Rest of your existing JavaScript code
    // ...
});


document.addEventListener('DOMContentLoaded', function () {
    // Navigation functionality
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scrolling
            const targetId = this.getAttribute('href');
            if (targetId !== '#home') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    } else if (sectionId === 'home' && link.getAttribute('href') === '#home') {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Category filtering from sidebar
    document.querySelectorAll('.sidebar-widget ul li a').forEach(category => {
        category.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.dataset.category;
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                if (categoryName === 'all') {
                    post.style.display = 'block';
                } else if (post.dataset.category === categoryName) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Scroll to blog posts
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Category filtering from categories section
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                if (post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
            
            // Update active category in sidebar
            document.querySelectorAll('.sidebar-widget ul li a').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.category === category) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to blog posts
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Expand about section in sidebar
    const aboutWidget = document.querySelector('.sidebar-widget:first-child');
    const aboutText = aboutWidget.querySelector('p');
    const expandBtn = aboutWidget.querySelector('.expand-btn');
    
    expandBtn.addEventListener('click', function(e) {
        e.preventDefault();
        aboutText.classList.toggle('expanded');
        this.textContent = aboutText.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });

    // Social media sharing
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className.split(' ')[1];
            let shareUrl = '';
            
            const currentUrl = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            switch(platform) {
                case 'fa-twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`;
                    break;
                case 'fa-facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                    break;
                case 'fa-linkedin':
                    shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Comment form submission
    const commentForms = document.querySelectorAll('.comment-form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const commentInput = this.querySelector('textarea');
            
            // Clear previous errors
            this.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                const error = document.createElement('div');
                error.className = 'error';
                error.textContent = 'Please enter your name';
                error.style.color = 'red';
                error.style.fontSize = '0.8rem';
                error.style.marginTop = '-8px';
                error.style.marginBottom = '10px';
                nameInput.parentNode.insertBefore(error, nameInput.nextSibling);
                nameInput.focus();
                return;
            }
            
            // Validate comment
            if (!commentInput.value.trim()) {
                const error = document.createElement('div');
                error.className = 'error';
                error.textContent = 'Please enter your comment';
                error.style.color = 'red';
                error.style.fontSize = '0.8rem';
                error.style.marginTop = '-8px';
                error.style.marginBottom = '10px';
                commentInput.parentNode.insertBefore(error, commentInput.nextSibling);
                commentInput.focus();
                return;
            }
            
            // If validation passes, proceed with comment submission
            const commentsContainer = this.previousElementSibling;
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            
            const commentHeader = document.createElement('h4');
            commentHeader.textContent = nameInput.value;
            
            const commentText = document.createElement('p');
            commentText.textContent = commentInput.value;
            
            commentDiv.appendChild(commentHeader);
            commentDiv.appendChild(commentText);
            commentsContainer.appendChild(commentDiv);
            
            // Clear form
            nameInput.value = '';
            commentInput.value = '';
            
            // Show success message
            const success = document.createElement('div');
            success.className = 'success';
            success.textContent = 'Comment posted successfully!';
            success.style.color = 'green';
            success.style.fontSize = '0.9rem';
            success.style.marginTop = '10px';
            this.appendChild(success);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                success.remove();
            }, 3000);
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;
        
        // Clear previous errors
        this.querySelectorAll('.error').forEach(el => el.remove());
        
        // Validate form
        let isValid = true;
        
        if (!name.trim()) {
            showError(this.querySelector('#name'), 'Please enter your name');
            isValid = false;
        }
        
        if (!email.trim()) {
            showError(this.querySelector('#email'), 'Please enter your email');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(this.querySelector('#email'), 'Please enter a valid email');
            isValid = false;
        }
        
        if (!subject.trim()) {
            showError(this.querySelector('#subject'), 'Please enter a subject');
            isValid = false;
        }
        
        if (!message.trim()) {
            showError(this.querySelector('#message'), 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const success = document.createElement('div');
        success.className = 'success';
        success.textContent = 'Thank you for your message! I will get back to you soon.';
        success.style.color = 'green';
        success.style.fontSize = '0.9rem';
        success.style.marginTop = '10px';
        this.appendChild(success);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            success.remove();
        }, 5000);
    });

    // Read more functionality for blog posts
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const postContent = this.parentElement.querySelector('p');
            postContent.classList.toggle('expanded');
            
            if (postContent.classList.contains('expanded')) {
                this.textContent = 'Read Less';
                postContent.style.webkitLineClamp = 'unset';
            } else {
                this.textContent = 'Read More';
                postContent.style.webkitLineClamp = '3';
            }
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-container button');
    const searchInput = document.querySelector('.search-container input');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            const posts = document.querySelectorAll('.post-card');
            let found = false;
            
            posts.forEach(post => {
                const title = post.querySelector('h2').textContent.toLowerCase();
                const content = post.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    post.style.display = 'block';
                    found = true;
                } else {
                    post.style.display = 'none';
                }
            });
            
            if (!found) {
                alert('No posts found matching your search.');
            }
        } else {
            alert('Please enter a search term.');
        }
    });
    
    // Make search work on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Helper functions
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        input.parentNode.appendChild(error);
        input.focus();
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});