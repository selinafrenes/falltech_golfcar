import React, { useEffect, useState } from 'react';

const ControlsPage = () => {
    const [controlsHtml, setControlsHtml] = useState(null);

    useEffect(() => {
        fetch('http://185.5.199.33:8080/controls')
            .then(response => response.text())
            .then(html => {
                setControlsHtml(html);
                console.log("HTMLLLLLL: " + html);
            })
            .catch(error => {
                console.error('Error fetching controls HTML:', error);
            });
    }, []);

    return (
        <>
            {controlsHtml && (
                <iframe
                    id="controlsFrame"
                    title="Controls"
                    width="100%"
                    height="100%"
                    srcDoc={controlsHtml} // Hier wird das heruntergeladene HTML-File eingebunden
                />
            )}
        </>
    );
};

export default ControlsPage;
