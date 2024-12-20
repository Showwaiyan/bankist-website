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
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We use cookies for imporved functionality and analytics. <button class= "btn btn--close-cookie">Got it!</button>';

const header = document.querySelector('header');
header.before(message);
document.querySelector('.btn--close-cookie').addEventListener('click',()=>message.remove());

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
