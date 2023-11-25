// Navigation button onclick event & change active button

window.addEventListener('load', () => {
    let navList = document.querySelectorAll('.nav-btn')
    navList.forEach(nav =>
        nav.addEventListener('click', function (e) {
            e.preventDefault()
            navList.forEach(function (el) {
                el.classList.remove('active')
            })
            this.classList.add('active')
        })
    )
})

// Function to hide title attribut from a tag
window.onload = function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        link.onmouseover = function () {
            this.setAttribute("org_title", this.title);
            this.title = "";
        };
        link.onmouseout = function () {
            this.title = this.getAttribute("org_title");
        };
    }
};

// Back To Top
const scrollToTop = () => {
    window.scrollTo(0, 0)
}

// Show Back to Top button on page scroll
const selectHeader = document.querySelector('#header')
const backToTop = document.querySelector('.back-to-top')
if (selectHeader) {
    const headerScrolled = () => {
        window.scrollY > 100 ? backToTop.classList.add('active') : backToTop.classList.remove('active')
    }
    window.addEventListener('load', headerScrolled)
    document.addEventListener('scroll', headerScrolled)
}

// Animation on scroll - Initialization
window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    })
})