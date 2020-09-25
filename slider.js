let slideIndex = 1;

showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName('slides');

  let dots = document.getElementsByClassName('dot');

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (i = 0; i < slides.length; i++) slides[i].style.display = 'none';
  for (i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(' active', '');

  slides[slideIndex - 1].style.display = 'grid';
  dots[slideIndex - 1].className += ' active';
};

detectSwipe = (el, func) => {
  swipe_det = new Object();
  swipe_det.sX = 0;
  swipe_det.sY = 0;
  swipe_det.eX = 0;
  swipe_det.eY = 0;
  let min_x = 30; //min x swipe for horizontal swipe
  let max_y = 60; //max y difference for horizontal swipe
  let dir = '';
  ele = document.getElementById(el);
  ele.addEventListener(
    'touchstart',
    (e) => {
      let t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    },
    false
  );
  ele.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
      let t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    },
    false
  );
  ele.addEventListener(
    'touchend',
    (e) => {
      if (
        (swipe_det.eX - min_x > swipe_det.sX ||
          swipe_det.eX + min_x < swipe_det.sX) &&
        swipe_det.eY < swipe_det.sY + max_y &&
        swipe_det.sY > swipe_det.eY - max_y &&
        swipe_det.eX > 0
      ) {
        if (swipe_det.eX > swipe_det.sX) dir = 'right';
        else dir = 'left';
      }

      if (dir != '') {
        if (typeof func == 'function') func(el, dir);
      }
      dir = '';
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
    },
    false
  );
};

swipe = (el, dir) => {
  dir === 'left' ? changeSlide(1) : changeSlide(-1);
};

changeSlide = (n) => showSlides((slideIndex += n));

currentSlide = (n) => showSlides((slideIndex = n));

showSlides(slideIndex);

detectSwipe('slider', swipe);
