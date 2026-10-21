/*
Global Navigation

Handles:

1. Page navigation
2. Active navigation item
3. Mobile menu
4. Navbar logo
5. Closing mobile menu
6. Correct paths from every folder

*/


const NAVIGATION_CONFIG = {

    "home": {
        path: "index.html",
        logo: "images/Logo-transparent.png"
    },

    "science-center": {
        path: "sciencecenter/index.html",
        logo: "images/Logo-transparent.png"
    },

    "story-box": {
        path: "story-box/index.html",
        logo: "images/Story_box-transparent-background.png"
    },

    "installations": {
        path: "science-installations/index.html",
        logo: "images/Logo-transparent.png"
    },

    "rolling-ball": {
        path: "rolling-ball-sculptures/index.html",
        logo: "images/Logo-transparent.png"
    },

    "wind-sculptures": {
        path: "wind-sculptures/index.html",
        logo: "images/Logo-transparent.png"
    },

    "about": {
        path: "aboutus.html",
        logo: "images/Logo-transparent.png"
    },

    "contact": {
        path: "contactUs.html",
        logo: "images/Logo-transparent.png"
    }

};



function getProjectRoot() {
    const currentPath = window.location.pathname.replace(/\\/g, "/");

    const isSubfolder = Object.keys(NAVIGATION_CONFIG).some((key) => {
        if (key === "home") return false;
        const pagePath = NAVIGATION_CONFIG[key].path;
        if (pagePath.includes("/")) {
            const folder = pagePath.split("/")[0];
            return currentPath.includes("/" + folder + "/");
        }
        return false;
    });

    return isSubfolder ? "../" : "./";
}

/*
=========================================================
NAVIGATE TO PAGE
=========================================================
*/

function navigateTo(pageId) {

    const page =
        NAVIGATION_CONFIG[pageId];

    if (!page) {
        console.warn(
            "Navigation page not found:",
            pageId
        );

        return;
    }


    /*
    Close mobile menu
    */

    closeMenu();


    /*
    Page does not exist yet
    */

    if (!page.path) {

        console.log(
            `${pageId} page is not created yet.`
        );

        return;
    }


    /*
    Build correct path
    */

    const root =
        getProjectRoot();

    const destination =
        root + page.path;


    /*
    Navigate
    */

    window.location.href = destination;
}


/*
=========================================================
MOBILE MENU
=========================================================
*/

function toggleMenu() {

    const navList =
        document.getElementById("nav-list");

    if (!navList) {
        return;
    }

    navList.classList.toggle("open");
}


/*
=========================================================
CLOSE MOBILE MENU
=========================================================
*/

function closeMenu() {

    const navList =
        document.getElementById("nav-list");

    if (!navList) {
        return;
    }

    navList.classList.remove("open");
}


/*
=========================================================
SET ACTIVE NAVIGATION ITEM
=========================================================
*/

function setActiveNavigation() {
    const currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    const links = document.querySelectorAll("#nav-list a[data-page]");

    links.forEach(function (link) {
        const pageId = link.getAttribute("data-page");
        link.classList.remove("active-link");

        const page = NAVIGATION_CONFIG[pageId];
        if (!page || !page.path) return;

        const configuredPath = page.path.replace(/\\/g, "/").toLowerCase();

        if (pageId === "home") {
            const isRootIndex = currentPath.endsWith("/index.html") && !currentPath.split("/").slice(0, -1).some(segment => segment.length > 0 && !segment.includes(":"));
            const isBareRoot = currentPath.endsWith("/") || currentPath === "" || currentPath.endsWith("/index.html") && currentPath.split("/").length <= 3;

            const isSubpage = Object.keys(NAVIGATION_CONFIG).some(key => {
                if (key === "home") return false;
                const subPath = NAVIGATION_CONFIG[key].path.replace(/\\/g, "/").toLowerCase();
                const folder = subPath.split("/")[0];
                return folder && currentPath.includes("/" + folder + "/");
            });

            if (!isSubpage && (isRootIndex || isBareRoot || currentPath.endsWith("/" + configuredPath))) {
                link.classList.add("active-link");
            }
        } else {
            const pathSegments = configuredPath.split("/");
            const folderOrFile = pathSegments[0].includes(".html") ? pathSegments[0] : pathSegments[0] + "/";

            if (currentPath.includes("/" + folderOrFile)) {
                link.classList.add("active-link");
            }
        }
    });
}

/*
=========================================================
SET CORRECT LOGO
=========================================================
*/

function setNavigationLogo() {
    const logo = document.getElementById("header-logo");
    const tagline = document.getElementById("header-tagline");
    const logoWrapper = document.getElementById("ds-logo-wrapper");
    if (!logo) return;

    const currentPath = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    let currentPage = "home";

    Object.keys(NAVIGATION_CONFIG).forEach(function (pageId) {
        if (pageId === "home") return;

        const page = NAVIGATION_CONFIG[pageId];
        if (!page.path) return;

        const configuredPath = page.path.replace(/\\/g, "/").toLowerCase();
        const pathSegments = configuredPath.split("/");
        const folderOrFile = pathSegments[0].includes(".html") ? pathSegments[0] : pathSegments[0] + "/";

        if (currentPath.includes("/" + folderOrFile)) {
            currentPage = pageId;
        }
    });

    const page = NAVIGATION_CONFIG[currentPage];
    if (!page || !page.logo) return;

    const root = getProjectRoot();
    logo.src = root + page.logo;

    // Apply Story Box specific layout and tagline exclusively
    if (tagline && logoWrapper) {
        if (currentPage === "story-box") {
            logoWrapper.classList.add("is-story-box");
            tagline.textContent = "An initiative of Library Solutions";
        } else {
            logoWrapper.classList.remove("is-story-box");
            tagline.textContent = "";
        }
    }
}

/*
=========================================================
CLOSE MENU WHEN CLICKING OUTSIDE
=========================================================
*/

document.addEventListener(
    "click",
    function (event) {

        const nav =
            document.querySelector("nav");

        const hamburger =
            document.querySelector(
                ".ds-navbar-hamburger"
            );

        const navList =
            document.getElementById(
                "nav-list"
            );


        if (
            !nav ||
            !hamburger ||
            !navList
        ) {
            return;
        }


        if (
            !nav.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {

            closeMenu();

        }

    }
);


/*
=========================================================
INITIALIZE NAVIGATION
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {
        const navbarContainer = document.getElementById("navbar-container");

        if (!navbarContainer) return;

        navbarContainer.innerHTML = `
            <header class="ds-navbar">

                <div class="ds-navbar-logo" onclick="navigateTo('home')">
                    <div id="ds-logo-wrapper" class="ds-logo-wrapper">
                        <img id="header-logo" src="" alt="DO-SCI Science Centre">
                        <span id="header-tagline" class="ds-tagline"></span>
                    </div>
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

        setActiveNavigation();
        setNavigationLogo();
    }
);