'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// New school way
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

// Old school way
// for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookies message
let message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for imporved functionality and analytics. <button class= "btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('header');
header.before(message);
document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
    message.remove();
    message = null;
});

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// Smooth Scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',(e)=>{
    // old school way
    // window.scrollTo({
    //     left: section1.getBoundingClientRect().x+window.scrollX,
    //     top: section1.getBoundingClientRect().y+window.scrollY,
    //     behavior:'smooth',
    // }
    // )

    // new school way
    section1.scrollIntoView({behavior: 'smooth'});
})

// Smooth Nav Scroll
document.querySelector('.nav__links').addEventListener('click',(e)=>{
    e.preventDefault();
    if (e.target.className == "nav__link") {
        console.log(e.target.className);
        console.log(e.target.getAttribute("href"));
        document.querySelector(e.target.getAttribute("href")).scrollIntoView({behavior: 'smooth'});
    }
})

// Tap Component
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener('click',(e)=>{
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;

    tabs.forEach(t=>t.classList.remove('operations__tab--active'));
    tabContent.forEach(c=>c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
})

// Nav bar fade
const handleFadeHover = function(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        //Fading
        siblings.forEach(s=>{if (s != link) s.style.opacity = this});
        logo.style.opacity = this;
    }
}
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover',handleFadeHover.bind(0.5));
nav.addEventListener('mouseout',handleFadeHover.bind(1));

// Sticky nav bar

// Not good for performance
// const initialPoint = section1.getBoundingClientRect();
// window.addEventListener('scroll',()=>{
//     if (window.scrollY > initialPoint.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky')
// })

// Using IntersectionObserver API
const stickyNav = function(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        nav.classList.remove('sticky');
        if (message) header.before(message);
    }
    else {
        nav.classList.add('sticky')
        if (message) message.remove();
    };
}
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav,{
    root: null,
    threshold: 0,
    rootMargin: message.isConnected ? `${-Number.parseFloat(getComputedStyle(message).height)}px` : `${navHeight}px`
})
headerObserver.observe(header)

// Section Animation
const allSections = document.querySelectorAll(".section");
const sectionAnimate = function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        entry.target.classList.remove("section--hidden");
        sectionObserver.unobserve(entry.target);
    }
}

const sectionObserver = new IntersectionObserver(sectionAnimate,{
    root: null,
    threshold: 0.15,
});

allSections.forEach((s)=>{
    sectionObserver.observe(s);
    s.classList.add("section--hidden");
})
