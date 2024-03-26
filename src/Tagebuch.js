const loadEnters = (/*dataEnters, dataEntry*/) => {

    fetch("/tagebuch.html/submit")
        .then(data => {
            console.log("DATA: " + data);
        })
    // for (const entry of dataEntry) {
    //     console.log("Entry: " + JSON.stringify(entry));
    //     // const id = entry.id;
    // }
}


document.getElementById("searchButton").addEventListener("click", () => {
    loadEnters();
});



