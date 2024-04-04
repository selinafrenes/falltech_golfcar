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


/*TODO --> Checken warum Media Query nicht funktioniert wenn das Fenster kleiner als 600px ist*/