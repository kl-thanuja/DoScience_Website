document.addEventListener("DOMContentLoaded", function () {
    // Determine relative path to root for the logo image based on your existing setup
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const isSubfolder = currentPath.includes("/sciencecenter/") || 
                        currentPath.includes("/story-box/") || 
                        currentPath.includes("/science-installations/") || 
                        currentPath.includes("/rolling-ball-sculptures/") || 
                        currentPath.includes("/wind-sculptures/");
    
    const rootPrefix = isSubfolder ? "../" : "./";

    // Inject Preloader HTML into body
    const preloaderHTML = `
        <div id="ds-preloader">
            <img src="${rootPrefix}images/Logo-transparent.png" alt="DoScience Logo" class="ds-preloader-logo">
        </div>
    `;
    document.body.insertAdjacentHTML("afterbegin", preloaderHTML);

    const preloader = document.getElementById("ds-preloader");

    // Logic: Find the main hero video or photo on the page
    // We check for a video inside a hero section or the first primary image/video
    const heroMedia = document.querySelector(".hero-section video, .home-hero video, .hero-bg-full video, .hero-section img, .home-hero img, .hero-bg-full img");

    let isLoaded = false;

    function dismissPreloader() {
        if (isLoaded) return;
        isLoaded = true;
        if (preloader) {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.remove();
            }, 500); // Matches CSS transition time
        }
    }

    if (heroMedia) {
        if (heroMedia.tagName.toLowerCase() === "video") {
            // Check if video is already ready/loaded enough
            if (heroMedia.readyState >= 3) {
                dismissPreloader();
            } else {
                heroMedia.addEventListener("loadeddata", dismissPreloader);
                heroMedia.addEventListener("canplaythrough", dismissPreloader);
            }
        } else if (heroMedia.tagName.toLowerCase() === "img") {
            if (heroMedia.complete) {
                dismissPreloader();
            } else {
                heroMedia.addEventListener("load", dismissPreloader);
            }
        }
    }

    // Fallback timer: Dismiss preloader after 3 seconds max even if media events stall
    setTimeout(dismissPreloader, 3000);

    // Also catch window load as a safety net
    window.addEventListener("load", dismissPreloader);
});