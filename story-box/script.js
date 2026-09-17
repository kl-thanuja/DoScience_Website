const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navigation a");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const section = entry.target;

            // Sections 3–6 use data-nav="#story-box"
            // so Story Box stays highlighted while scrolling
            // through the complete Story Box page.
            const navTarget =
                section.getAttribute("data-nav") ||
                (section.id ? `#${section.id}` : null);

            if (!navTarget) return;

            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === navTarget
                );
            });

        });

    },
    {
        threshold: 0.4
    }
);

sections.forEach((section) => {
    observer.observe(section);
});
