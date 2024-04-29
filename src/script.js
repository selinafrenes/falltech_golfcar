
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

export function getCookieValue(cookieName) {
    // Zuerst die Cookies anhand ihres Namens suchen
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        // Prüfen, ob der Name des aktuellen Cookies dem gewünschten Namen entspricht
        if (cookie.startsWith(cookieName + '=')) {
            // Wenn ja, den Wert des Cookies zurückgeben
            return cookie.substring(cookieName.length + 1);
        }
    }
    // Wenn kein entsprechendes Cookie gefunden wird, wird null zurückgegeben
    return null;
}


window.onload = () => {


    const handleMediaQuery = (mediaQuery) => {
        const slidesSlides = document.getElementsByClassName('slides');
        const slide = document.getElementsByClassName("slide");

        if (mediaQuery.matches) {
            slidesSlides[0].style.flexDirection = 'column';
            console.log("Slide Lenght: "  + slide.length);
            //document.addEventListener('DOMContentLoaded', function() {
                for (let i = 0 ; i < slide.length; i++) {
                    slide[i].style.display = 'block';
                }
            //});

        } else {
            for (let i = 0 ; i < slide.length; i++) {
                slide[i].style.display = 'grid';
            }
            slidesSlides[0].style.flexDirection = 'row';
            slidesSlides[0].style.overflowX = 'hidden';

        }
    }



    const mediaQuery600px = window.matchMedia("(max-width: 600px)");
    mediaQuery600px.addEventListener("change", () => {
        handleMediaQuery(mediaQuery600px);
    }); //Event-Listener wegen Änderungen
    handleMediaQuery(mediaQuery600px); //Initialer Aufruf des Media Querys



}