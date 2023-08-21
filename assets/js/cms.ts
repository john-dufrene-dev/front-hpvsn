import '../styles/cms.scss';

//function to activate carousel only on mobile
function changeCarouselMode() {
  const carousel = document.querySelector("#carouselHow") as HTMLElement;
  const carouselItem1 = document.querySelector(".carouselitem1") as HTMLElement;
  const carouselItem2 = document.querySelector(".carouselitem2") as HTMLElement;
  const carouselItem3 = document.querySelector(".carouselitem3") as HTMLElement;
  //carousel arrows
  const prevControl = document.querySelector(".carousel-control-prev") as HTMLElement;
  const nextControl = document.querySelector(".carousel-control-next") as HTMLElement;
    //carousel indicators
  const indicators = document.querySelector(".carousel-indicators") as HTMLElement;

  if (window.innerWidth > 767) {
    //carousel
    carousel.classList.remove("carousel", "slide", "carousel-slide", "pointer-event");
    //carousel items
    document.querySelectorAll('.carouselitem1, .carouselitem2, .carouselitem3').forEach(el => el.classList.remove('carousel-item'));
    //carousel inner
    document.querySelector(".how-bloc").classList.remove("carousel-inner");

    prevControl.style.display = "none";
    nextControl.style.display = "none";
    indicators.style.display = "none";

  } else {
    //carousel
    if (!carousel.classList.contains('container how-it-work carousel slide carousel-slide pointer-event')) {
      carousel.classList.add("carousel", "slide", "carousel-slide", "pointer-event");
    }
    //carousel items
    if (!carouselItem1.classList.contains('carousel-item')) {
      carouselItem1.classList.add('carousel-item');
    }
    if (!carouselItem2.classList.contains('carousel-item')) {
      carouselItem2.classList.add('carousel-item');
    }
    if (!carouselItem3.classList.contains('carousel-item')) {
      carouselItem3.classList.add('carousel-item');
    }
    //carousel inner
    if (!carousel.classList.contains('how-bloc mb-3 text-center carousel-inner')) {
      document.querySelector(".how-bloc").classList.add("carousel-inner");
    }
    //carousel arrows
    document.querySelector(".carousel-control-prev").removeAttribute("style");
    document.querySelector(".carousel-control-next").removeAttribute("style");
    //carousel indicators
    document.querySelector(".carousel-indicators").removeAttribute("style");
  }
}
// Calling the function for the first time 
document.addEventListener('DOMContentLoaded', changeCarouselMode);
// Calling the function on window resize
window.addEventListener("resize", changeCarouselMode);