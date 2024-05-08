import "../styles/controller.css";
/**
 * Controller-Komponente zur Verwaltung der Joystick-Eingabe und zum Senden von Steuerdaten an einen entfernten Server.
 * @constructor
 */
function Controller(){

    let imgSrc = "http://10.10.31.11:5000/img";
    let controlSrc = "http://10.10.31.11:5000/controls";
    let piDataSrc = "http://10.10.31.11:5000/pidata";
    // my ip in Fuby's hotspog: 192.168.86.51

    var canvas, ctx;

    /**
     * Initialisiert das Canvas und richtet Event-Listener für Maus- und Touch-Eingaben ein.
     */
    window.addEventListener('load', () => {

        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        resize();

        document.addEventListener('mousedown', startDrawing);
        document.addEventListener('mouseup', stopDrawing);
        document.addEventListener('mousemove', Draw);

        document.addEventListener('touchstart', startDrawing);
        document.addEventListener('touchend', stopDrawing);
        document.addEventListener('touchcancel', stopDrawing);
        document.addEventListener('touchmove', Draw);
        window.addEventListener('resize', resize);

        document.getElementById("x_coordinate").innerText = 0;
        document.getElementById("y_coordinate").innerText = 0;
        document.getElementById("speed").innerText = 0;
        document.getElementById("angle").innerText = 0;
    });


    var width, height, radius, x_orig, y_orig;

    /**
     * Passt das Canvas und den Joystick-Radius basierend auf den Fensterabmessungen an.
     */
    function resize() {
        width = (window.innerWidth < window.innerHeight * 0.7) ? window.innerWidth : window.innerHeight * 0.7;
        radius = width / 4.5;
        height = width;
        ctx.canvas.width = width;
        ctx.canvas.height = height;
        background();
        joystick(width / 2, height / 2);
    }

    /**
     * Zeichnet den Hintergrundkreis.
     */
    function background() {
        x_orig = width / 2;
        y_orig = height / 2;

        ctx.beginPath();
        ctx.arc(x_orig, y_orig, radius + 20, 0, Math.PI * 2, true);
        ctx.fillStyle = '#E5E5EC';
        ctx.fill();
    }


    /**
     * Zeichnet den Joystick an den angegebenen Koordinaten.
     * @param {number} width - X-Koordinate des Joystick-Mittelpunkts.
     * @param {number} height - Y-Koordinate des Joystick-Mittelpunkts.
     */
    function joystick(width, height) {
        ctx.beginPath();
        ctx.arc(width, height, radius, 0, Math.PI * 2, true);
        ctx.fillStyle = '#46e8ac';
        ctx.fill();
        ctx.strokeStyle = '#17ad76';
        ctx.lineWidth = 8;
        ctx.stroke();
    }

    let coord = {x: 0, y: 0};
    let paint = false;

    /**
     * Ermittelt die Position des Cursors oder Touchs relativ zum Canvas.
     * @param {Event} event - Maus- oder Touch-Ereignis.
     */
    function getPosition(event) {
        var mouse_x = event.pageX || event.touches[0].pageX;
        var mouse_y = event.pageY || event.touches[0].pageY;
        coord.x = mouse_x - canvas.offsetLeft;
        coord.y = mouse_y - canvas.offsetTop;
    }


    /**
     * Überprüft, ob der Cursor oder Touch im Joystick-Bereich liegt.
     * @returns {boolean} True, wenn im Joystick-Bereich, sonst false.
     */
    function is_it_in_the_circle() {
        var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
        if (radius >= current_radius) return true
        else return false
    }

    /**
     * Startet das Zeichnen, wenn der Cursor oder Touch gedrückt wird.
     * @param {Event} event - Maus- oder Touch-Ereignis.
     */
    function startDrawing(event) {
        getPosition(event);
        if (is_it_in_the_circle()) {
            paint = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            joystick(coord.x, coord.y);
            Draw(event);
        }
    }


    var x_relative = 0, y_relative = 0, speed = 0, angle_in_degrees = 0;

    /**
     * Beendet das Zeichnen und sendet Steuerdaten, wenn der Cursor oder Touch losgelassen wird.
     */
    function stopDrawing() {
        paint = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background();
        joystick(width / 2, height / 2);
        x_relative = 0;
        y_relative = 0;

        setTimeout(sendData, 10);

        document.getElementById("x_coordinate").innerText = 0;
        document.getElementById("y_coordinate").innerText = 0;
        document.getElementById("speed").innerText = 0;
        document.getElementById("angle").innerText = 0;
    }
    let sendTimeout = 0;
    let prev_x_relative, prev_y_relative;

    /**
     * Zeichnet den Joystick und sendet Steuerdaten während des Zeichnens.
     * @param {Event} event - Maus- oder Touch-Ereignis.
     */
    function Draw(event) {

        if (paint) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            var x, y;
            var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

            if (Math.sign(angle) == -1) {
                angle_in_degrees = Math.round(-angle * 180 / Math.PI);
            }
            else {
                angle_in_degrees = Math.round(360 - angle * 180 / Math.PI);
            }


            if (is_it_in_the_circle()) {
                joystick(coord.x, coord.y);
                x = coord.x;
                y = coord.y;
            }
            else {
                x = radius * Math.cos(angle) + x_orig;
                y = radius * Math.sin(angle) + y_orig;
                joystick(x, y);
            }


            getPosition(event);

            var speed = Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

            x_relative = Math.round(100 * (x - x_orig) / radius);
            y_relative = Math.round(100 * (y - y_orig) / radius);

            if (Date.now() - sendTimeout > 100 && (prev_x_relative != x_relative || prev_y_relative != y_relative)) {
                sendTimeout = Date.now();
                sendData();
                prev_x_relative = x_relative;
                prev_y_relative = y_relative;
                document.getElementById("x_coordinate").innerText = x_relative;
                document.getElementById("y_coordinate").innerText = -y_relative;
                document.getElementById("speed").innerText = speed;
                document.getElementById("angle").innerText = angle_in_degrees;
            }
        }
    }


    function switchVisibility() {
        let state = document.getElementById("autopilotState").checked;
        let items = document.getElementsByClassName("ignoreWhenAuto");
        for (let i = 0; i < items.length; i++) {
            items[i].style.visibility = (state) ? 'hidden' : 'visible';
        }
    }

    function getPiData() {
        const distanceLeftSpan = document.getElementById('distance_left');
        const distanceRightSpan = document.getElementById('distance_right');
        const distanceBackSpan = document.getElementById('distance_back');
        const distanceFrontLeftSpan = document.getElementById('distance_front_left');
        const distanceFrontRightSpan = document.getElementById('distance_front_right');
        const brightnessSpan = document.getElementById('brightness');

        fetch(piDataSrc)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Update the spans with the corresponding data from the JSON object
                distanceLeftSpan.textContent = data.distanceLeft;
                distanceRightSpan.textContent = data.distanceRight;
                distanceBackSpan.textContent = data.distanceBack;
                distanceFrontLeftSpan.textContent = data.distanceFrontLeft;
                distanceFrontRightSpan.textContent = data.distanceFrontRight;
                brightnessSpan.textContent = data.brightness;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle errors, like displaying an error message
            });
    }

    function sendData() {
        let x_direction = -1;
        if (x_relative < 0) {
            x_direction = 1;
        }
        /*console.clear();
        console.log('{"verticalSpeed" :' + (-y_relative) +
            ', "rotationalSpeed" :' + (x_direction * x_relative * x_relative / 100) +
            ', "lightsState" : ' + document.getElementById("lightsState").checked +
            ', "doorState" :' + document.getElementById("doorState").checked +
            ', "autopilot" :' + document.getElementById("autopilotState").checked +
            '}');*/
        try {
            fetch(controlSrc, {
                method: 'POST',
                body: '{"verticalSpeed" :' + (-y_relative) +
                    ', "rotationalSpeed" :' + (x_direction * x_relative * x_relative / 100) +
                    ', "lightsState" : ' + document.getElementById("lightsState").checked +
                    ', "doorState" :' + document.getElementById("doorState").checked +
                    ', "autopilot" :' + document.getElementById("autopilotState").checked +
                    ', "ballColor" : "' + document.getElementById("ballColor").value + '"' +
                    ', "doorColor" : "' + document.getElementById("doorColor").value + '"' +
                    '}',
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        } catch (err) {
            console.log("test");
        }
    }

    function updateImage() {
        document.getElementById('camImage').src = imgSrc + '?' + Date.now();
    }
    //window.setInterval(sendData, 200);
    window.setInterval(updateImage, 50);
    window.setInterval(getPiData, 100);

    function handleMovement(e){
        if(e.key == 'w'){
            try {
                fetch(controlSrc, {
                    method: 'POST',
                    body: '{"verticalSpeed" :' + 100 +
                        ', "rotationalSpeed" :' + 0 +
                        ', "lightsState" : ' + document.getElementById("lightsState").checked +
                        ', "doorState" :' + document.getElementById("doorState").checked +
                        ', "autopilot" :' + document.getElementById("autopilotState").checked +
                        ', "ballColor" : "' + document.getElementById("ballColor").value + '"' +
                        '}',
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            } catch (err) {
                console.log("test");
            }
        }else if(e.key == 's'){
            try {
                fetch(controlSrc, {
                    method: 'POST',
                    body: '{"verticalSpeed" :' + -100 +
                        ', "rotationalSpeed" :' + 0 +
                        ', "lightsState" : ' + document.getElementById("lightsState").checked +
                        ', "doorState" :' + document.getElementById("doorState").checked +
                        ', "autopilot" :' + document.getElementById("autopilotState").checked +
                        ', "ballColor" : "' + document.getElementById("ballColor").value + '"' +
                        '}',
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            } catch (err) {
                console.log("test");
            }
        }

    }
    function handleMovement2(e){
        if(e.key == 'w'){
            try {
                fetch(controlSrc, {
                    method: 'POST',
                    body: '{"verticalSpeed" :' + 0 +
                        ', "rotationalSpeed" :' + 0 +
                        ', "lightsState" : ' + document.getElementById("lightsState").checked +
                        ', "doorState" :' + document.getElementById("doorState").checked +
                        ', "autopilot" :' + document.getElementById("autopilotState").checked +
                        ', "ballColor" : "' + document.getElementById("ballColor").value + '"' +
                        '}',
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            } catch (err) {
                console.log("test");
            }
        }else if(e.key == 's'){
            try {
                fetch(controlSrc, {
                    method: 'POST',
                    body: '{"verticalSpeed" :' + 0 +
                        ', "rotationalSpeed" :' + 0 +
                        ', "lightsState" : ' + document.getElementById("lightsState").checked +
                        ', "doorState" :' + document.getElementById("doorState").checked +
                        ', "autopilot" :' + document.getElementById("autopilotState").checked +
                        ', "ballColor" : "' + document.getElementById("ballColor").value + '"' +
                        '}',
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                });
            } catch (err) {
                console.log("test");
            }
        }

    }
    window.addEventListener('keydown', handleMovement);
    window.addEventListener('keyup', handleMovement2);

    return(
        <>
            <div className="controller">
                <div className="controllerPage">
                    <img id="camImage" alt="Camera Image"/>

                    <div className="valueList ignoreWhenAuto">
                        <div>X: <span id="x_coordinate"> </span></div>
                        <div>Y: <span id="y_coordinate"> </span></div>
                        <div>Speed: <span id="speed"> </span> %</div>
                        <div>Angle: <span id="angle"> </span></div>
                    </div>
                    <div className="valueLits">
                        <div>Distance left: <span id="distance_left"> </span></div>
                        <div>Distance right: <span id="distance_right"> </span></div>
                        <div>Distance back: <span id="distance_back"> </span></div>
                        <div>Distance left headlight: <span id="distance_front_left"> </span></div>
                        <div>Distance right headlight: <span id="distance_front_right"> </span></div>
                        <div>Brightness: <span id="brightness"> </span></div>

                    </div>
                    <div>
                        Color of the ball
                        <select id="ballColor">
                            <option value="red">red</option>
                            <option value="blue">blue</option>
                            <option value="pink">pink</option>
                            <option value="yellow">yellow</option>
                            <option value="orange">orange</option>
                        </select> <br/>
                        Color of the door
                        <select id="doorColor">
                            <option value="red">red</option>
                            <option value="blue">blue</option>
                            <option value="yellow">yellow</option>
                            <option value="green">green</option>
                        </select>
                    </div>
                    <div>
                        <label className="switchBox">
                            Autopilot:
                            <span className="switch">
                    <input type="checkbox" id="autopilotState" onClick="sendData();switchVisibility()" />
                    <span className="slider"></span>
                </span>
                        </label>
                        <div className="switchBox ignoreWhenAuto">
                            Lights:
                            <label className="switch">
                                <input type="checkbox" id="lightsState" onClick="sendData()" />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="switchBox ignoreWhenAuto">
                            Door:
                            <label className="switch">
                                <input type="checkbox" id="doorState" onClick="sendData()" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    <canvas id="canvas" className="ignoreWhenAuto" name="controls"></canvas>
                </div>

            </div>
        </>
    );
}

export default Controller;