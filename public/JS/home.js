const sentences = ["Unlock Your Productivity Potential in the Taskverse!", 
"Supercharge your productivity with Taskverse!", 
"Unleash your potential in the world of Taskverse!", 
"Task management made easy with Taskverse: your productivity ally!",
 "Elevate your efficiency and achieve greatness with Taskverse!"];
const changingText = document.getElementById("changing-text");
let currentIndex = 0;

function animateText() {
  changingText.innerText = sentences[currentIndex];
  currentIndex = (currentIndex + 1) % sentences.length;
}

// Initial text assignment
animateText();

// Start animation loop to change the text every 3 seconds
setInterval(animateText, 3000);

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}