
        document.addEventListener('DOMContentLoaded', () => {
            // Mobile Menu Toggle Logic
            const toggleBtn = document.querySelector('.mobile-toggle');
            const navLinks = document.querySelector('.nav-links');

            toggleBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close Mobile Menu on Click
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });

            // Header Shadow on Scroll
            const header = document.querySelector('.site-header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                } else {
                    header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.03)';
                }
            });
        });