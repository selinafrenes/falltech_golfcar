
//Variablen initialisiert
/**
 * Array, das alle Slide-Elemente enthält.
 * @type {HTMLCollectionOf<HTMLElement>}
 */
const slides = document.getElementsByClassName("slide");

/**
 * Index der aktuellen Slide in Slides.
 * @type {number}
 * @see {@link slides}
 */
let currenSlide = 0;

/**
 * Öffnet das Login-Fenster, indem es dessen Anzeigeeigenschaft auf 'block' setzt.
 */
export function openLoginWindow () {
    document.getElementById('loginWindow').style.display = 'block';
}

/**
 * Schließt das Login-Fenster, indem es dessen Anzeigeeigenschaft auf 'none' setzt.
 */
export function closeLoginWindow() {
    document.getElementById('loginWindow').style.display = 'none';
}

/**
 * Wechselt zur nächsten Slide.
 */
export function nextSlide() {
    slideChange(currenSlide + 1);
    console.log(currenSlide);
}

/**
 * Wechselt zur vorherigen Slide.
 */
export function prevSlide() {
    slideChange(currenSlide - 1);
    console.log(currenSlide);
}

/**
 * Ändert die aktuell angezeigte Slide.
 * @param {number} n - Der Index der neuen Slide.
 */
export function slideChange(n) {
    slides[currenSlide].style.display = "none";
    currenSlide = (n + slides.length) % slides.length;
    slides[currenSlide].style.display = "grid";
}

/**
 * Gibt den Wert eines bestimmten Cookies zurück.
 * @param {string} cookieName - Der Name des Cookies, dessen Wert abgerufen werden soll.
 * @returns {?string} Der Wert des Cookies oder null, falls kein entsprechender Cookie gefunden wurde.
 */
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



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded ausgelöst");
    setTimeout(() => {
        console.log("Ausführen von alleSlidesAusblenden nach Timeout");
        const alleSlidesAusblenden = () => {
            console.log("allesSlideAusblenden");
            const slides = document.getElementsByClassName("slide");
            if (slides.length > 0) {
                console.log("Slides ist nicht 0");
            } else {
                console.log("Slides ist 0");
            }
            for(let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            if (slides.length > 0) {
                slides[0].style.display = "grid";
            }
        };

        /**
         * Eine Funktion, die das Layout der Slides basierend auf der Bildschirmgröße ändert.
         * @param {MediaQueryList} mediaQuery - Das Media-Query-Objekt, das den Status der Bildschirmgröße überwacht.
         */
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

        // Das Media-Query-Objekt für Bildschirme mit einer maximalen Breite von 600px.
        const mediaQuery600px = window.matchMedia("(max-width: 600px)");

        // Ein Event-Listener, der auf Änderungen in der Bildschirmgröße reagiert und die handleMediaQuery-Funktion aufruft.
        mediaQuery600px.addEventListener("change", () => {
            handleMediaQuery(mediaQuery600px);
        });

        // Initialer Aufruf der handleMediaQuery-Funktion, um das Layout entsprechend der Bildschirmgröße festzulegen.
        handleMediaQuery(mediaQuery600px);

        //alleSlidesAusblenden();  // Call the function with a delay

        //console.log("Windows.onload");

        // Navbar responsive
        let prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            console.log("SCROLLLLLL")
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
                console.log("Show Navbar");
                if (window.innerWidth < 600){
                    document.getElementById("content").style.marginTop = "200px";
                } else {
                    document.getElementById("content").style.marginTop = "150px";
                }
            } else {
                document.getElementById("navbar").style.top = "-250px"; // Höhe der Navigationsleiste
                document.getElementById("content").style.marginTop = "10px";
                console.log("Remove Navbar");

            }
            prevScrollpos = currentScrollPos;
        }

    }, 500);
});


