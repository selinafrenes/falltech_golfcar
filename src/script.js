//Variablen initialisiert
const slides = document.getElementsByClassName("slide");
let currenSlide = 0;


export function openLoginWindow () {
    document.getElementById('loginWindow').style.display = 'block';
}


export function closeLoginWindow() {
    document.getElementById('loginWindow').style.display = 'none';
}

export function nextSlide() {
    slideChange(currenSlide + 1);
    console.log(currenSlide);
}

export function prevSlide() {
    slideChange(currenSlide - 1);
    console.log(currenSlide);
}

export function slideChange(n) {
    slides[currenSlide].style.display = "none";
    currenSlide = (n + slides.length) % slides.length;
    slides[currenSlide].style.display = "grid";
}


/*TODO --> Checken warum Media Query nicht funktioniert wenn das Fenster kleiner als 600px ist*/