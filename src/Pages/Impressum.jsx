import Login from "../Components/Login";

/**
 * Impressum-Komponente zeigt das Impressum der Webseite an.
 * @param {Object} props - Die Eigenschaften, die an die Impressum-Komponente übergeben werden.
 * @param {Function} props.onLogin - Rückruffunktion zur Behandlung von Anmeldeereignissen.
 * @returns {JSX.Element} Eine React-Komponente, die das Impressum der Webseite darstellt.
 */
function Impressum({onLogin}){
    return(
        <>
            <Login onLogin={onLogin}/>
            <div id="impressum">
                <h1>Impressum</h1>
                <p><span>Eigentümer der Webseite:</span></p><br/>
                <p>FallTech GmbH</p><br/>
                <p>Mayr | Mairhofer | Reifer | Frenes | Frener</p><br/>
                <p>Dantestraße 39E</p><br/>
                <p>I-39042 Brixen</p><br/>
                <p>Tel: +39 123 123 4567</p><br/>
                <p>Email: <a href="mailto:falltech.bx@gmail.com">falltech.bx@gmail.com</a></p><br/>
                <p>Webseite: <a href="http://185.5.199.33:8080">FallTech</a></p><br/>
                <p><span>Bildmaterial</span></p><br/>
                <p>© FallTech</p>
                <p><a href="https://www.amazon.it/Raspberry-PI-Model-Scheda-madre/dp/B01CD5VC92">Raspberry PI 3</a></p>
                <p><a href="https://www.amazon.it/Raspberry-Pi-Camera-Module-3/dp/B0BRY6MVXL">Raspberry Pi Camera Module 3</a></p>
                <p><a href="https://www.amazon.it/Hiletgo%C2%AE-hy-srf05-Ultrasonic-Distance-Arduino-R3-MEGA2560-due/dp/B0795F75XG">Abstandssensor</a></p>
                <p><a href="https://www.amazon.it/ANGEEK-28BYJ-48-ULN2003-Passo-Passo-modulare/dp/B07VGV1XFT/ref=sr_1_5?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2ODU7K9T7O2VF&dib=eyJ2IjoiMSJ9.Pv9144YV00B4UF0J5jL3GHzWYONmCyzHi2T7_ZihlNAnVNQ7bxYZ8PiVWn-aQoctt_nNrwxmNqWVUX9axoCtnIpVBdyj9fSJkVegNLTf_4OJxjid3_TMXKvfxZke8rl6eLvryeIVIhzdeU5Gs7hPB1QZsIwPXcb3CCbabpLo6_i0bS-RBn-3sLy-7h77RtPXcxZCdjGoTxLaKzV0OWG3mneHdoAQJoQC00xlnROdXIyRpDgNgd_d9CQ9GW0n4WAmAxz5-ny23hY7Sxi6h5_NlC22yYf1kpLznfw5LGjcgN4.uRXmKZ9j5DeiF_XeDPXTwJq6RIyXwBX7f5zI0Y9G7O8&dib_tag=se&keywords=28byj-48&qid=1712579839&sprefix=28byj-48%2Caps%2C237&sr=8-5">5pcs 28BYJ-48 Schrittmotor</a></p>
                <p><a href="https://www.ebay.de/itm/274426397949">DC Motor</a></p>
                <p><a href="https://www.amazon.it/DollaTek-controlador-m%C3%B3dulo-Puente-Arduino/dp/B07DK6Q8F9/ref=sr_1_6?dib=eyJ2IjoiMSJ9.SpKPMudMRgw-qNZ3JBGDhoOKXGHIn0_-BWPKnoNfbeYcNapskjL6kdvG41UMX-nD-LJKqLJ0omGK8dU2SrWAkxwIXRUrvuzt9mvF1cumEr1mRB0FI2zNVHXPYlliNt58e8lUIkYxvvvEllqLd55eaBz8tRZDiEKQqugxeyQsofAOLu5G7sGXw2XpZFckevfi3bm4Hvt0n2o_CKevDHFMQxEI5aRmTzWxaNU8CJtouPAcD0eBJ7GNJp-fDBeibMWlr5u6a39rditL-C3i_Y-3oB6VsqtyPPsA_WYfbp6L_yM.g_qOF8l4u2jsmmYNf_9IdXWWX8OQrPouG6J7rzMKNe4&dib_tag=se&keywords=L298N&qid=1712571235&sr=8-6">L298 Motor Drive Controller Board</a></p>
                <p><a href="https://www.amazon.com/-/de/dp/B0BRNB8J7G/ref=zg_bs_g_6925959011_d_sccl_5/135-5070084-2084500?psc=1">RC Headlight LEDs</a></p>
                <p><a href="https://www.amazon.it/Delyeepow-Batterie-Ricaricabili-USB-C-Batteria/dp/B09LL9F431/ref=sr_1_12?dib=eyJ2IjoiMSJ9.WnvQw_ds16rN8-NVFgxzk6B-CbzOUh074zCfu12OE6op0XiLMH4F2MS5aLrTYGkJQQasSl60C5uQwpqXJqMQFuc_IL-gm3__QrLiZxi3Y2YbtuZKdSlSDV9bSOrjpDjDoNaSJLzFNuMi4mZU68cF14OOsv-XqaUk9DuD3ijHO6FclVF3bKCuZAGRJiJyJGUPa7P9cwR3zkTQfBTz36UnoRNMLkhJrCqisdsW8bK803oE9lkT8pphprpbe1Q4wYxLM9McW7PxPtUrsgkPq4_3ImFYnrn5eaegNN_-pd20myY.1fg9NZJkq-Iqpk-TqTDqTK64CABuzvMSnOhYVBR9fzI&dib_tag=se&keywords=9v+Rechargeable+Battery+Pack&qid=1712580211&sr=8-12">9V 650mA wiederaufladbare Batterie</a></p>
                <p><a href="https://www.amazon.it/TecnoStore%C2%AE-CONNETTORI-BATTERIE-alimentazione-battery/dp/B01HPYBYD0/ref=sr_1_6?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2J71XGHBFCMG8&dib=eyJ2IjoiMSJ9.YomF_mKPFef0hy7nUwz9xe9sddV711Kp61n0Hnfgj2fJam1hrTymuARduUbPLw6xBn5SF_ZvwFBpJHJeARIdY04X0ayWUtAZFdsHwKCf8oHx_9AP5VSiCYqnocwQIa5vmWPzg-1F7lS7OkHxT4NB1uMDEQatEhPcNKCWP2_y8WljUDI8ga6KJcdvwFvLD85CxIquawgyuAjtUrZFz5I83sSEJWA8WaEXSNojb5Fi79b7s4P1ssQZWO4CSDN7ouIM7r7EwqLx-Ip8sneqL75EQjGl_2-UgKsA-3ro5RxP1Ic.ejfYWygfQzqOdyi4vNb5NCZufjvWU-gsY2Pv6yM1kw8&dib_tag=se&keywords=9V+Battery+adapter&qid=1712570402&sprefix=9v+battery+adapter%2Caps%2C341&sr=8-6">9V Batterie Adapter</a></p>
                <p><a href="https://www.amazon.it/Netac-Memoria-velocit%C3%A0-Telefono-Videocamera/dp/B0833XXLJR/ref=sr_1_5?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2DBZ6CJINCQCC&dib=eyJ2IjoiMSJ9.rRwxawdy61wjKM9Bdfn88ReJRsXYYQ3uEcjKvvpVSSdphUE1xtfi1qdWogDVX784H38rmJJ0fE_KVups315lGEHGgdWZAEEJZwyCwvEX_Rl9yvK5r4UKcw6Diw8lAYk-kI_T7OqERo4zCYYWvQpmHj1l6sS6ovC7YpjZkuHTeG425MIlAd9dcrzyI2tImyeGV9r3QH50XQq0OZ52ENK66bi0brasVUyIDxsmKDZzkoFdhJJVOdfRfPbfHHmQYT7QF_roCw5llRgHuaqyyWe5OWRJHbZF1URiJUYKNXZ0plw.uG921mz-5hkC4L_KyDEUNmN8Z6BLmJ5SQtCasig0cY0&dib_tag=se&keywords=32GB+Micro+SD&qid=1712569514&sprefix=32gb+micro+sd%2Caps%2C256&sr=8-5">Speicher</a></p>
                <p><a href="https://www.amazon.com/uxcell-Groove-Bearing-5mmx17mmx8mm-Bearings/dp/B082PP6SGR">Kugellager 5pcs 10x3x4 mm</a></p>
                <p><a href="https://www.amazon.it/Auskang-compatibile-batteria-Caricabatterie-Portatile/dp/B096FX9226">Power Bank</a></p>
            </div>
        </>
    );
}
export default Impressum;