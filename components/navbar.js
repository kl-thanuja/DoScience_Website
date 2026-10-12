document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Global Preloader Styles & Markup First
    if (!document.getElementById("global-preloader")) {
        const preloaderHTML = `
            <div id="global-preloader" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: #fafafa;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 99999;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 3px solid #e0e0e0;
                    border-top: 3px solid #000000;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                "></div>
                <p style="margin-top: 15px; font-family: 'Inter', sans-serif; font-size: 13px; color: #000; letter-spacing: -0.01em;">Loading DoScience...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.insertAdjacentHTML("afterbegin", preloaderHTML);
    }

    const navbarContainer = document.getElementById("navbar-container");

    if (!navbarContainer) return;

    navbarContainer.innerHTML = `
        <header class="ds-navbar">

            <div class="ds-navbar-logo" onclick="navigateTo('home')">
                <img id="header-logo" src="" alt="DO-SCI Science Centre">
            </div>

            <nav class="ds-navbar-menu">
                <ul class="ds-navbar-list" id="nav-list">

                    <li>
                        <a href="javascript:void(0)"
                           data-page="home"
                           onclick="navigateTo('home')">
                           Home
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="science-center"
                           onclick="navigateTo('science-center')">
                           Science Centre
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="story-box"
                           onclick="navigateTo('story-box')">
                           Story Box
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="installations"
                           onclick="navigateTo('installations')">
                           Science Installations
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="rolling-ball"
                           onclick="navigateTo('rolling-ball')">
                           Rolling Ball Sculptures
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="wind-sculptures"
                           onclick="navigateTo('wind-sculptures')">
                           Wind Sculptures
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="about"
                           onclick="navigateTo('about')">
                           About
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)"
                           data-page="contact"
                           onclick="navigateTo('contact')">
                           Contact
                        </a>
                    </li>

                </ul>
            </nav>

            <div class="ds-navbar-hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </header>
    `;

    setNavigationLogo();
    setActiveNavigation();

    // Hide preloader once window fully loads (images, styles, scripts)
    window.addEventListener("load", () => {
        const preloader = document.getElementById("global-preloader");
        if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            setTimeout(() => preloader.remove(), 500);
        }
    });
});
