import '../styles/home.scss';

window.onscroll = function () { scrollNav() };

function scrollNav() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("navbar_top").classList.add("scrolled");
  } else {
    document.getElementById("navbar_top").classList.remove("scrolled");
  }
}