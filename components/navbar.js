document.addEventListener("DOMContentLoaded", () => {

    const navbarContainer = document.getElementById("navbar-container");

    if (!navbarContainer) return;

    navbarContainer.innerHTML = `
        <header class="ds-navbar">

            <div class="ds-navbar-logo" onclick="navigateTo('home')">
                <img id="header-logo" src="" alt="DO-SCI Science Centre">
            </div>

            <nav class="ds-navbar-menu">
                <ul class="ds-navbar-list">

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
});