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
        logo: "images/Logo-transparent.png"
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
                ".hamburger"
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
    function () {

        setActiveNavigation();

        setNavigationLogo();

    }
);
