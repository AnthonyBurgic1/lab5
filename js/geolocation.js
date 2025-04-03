/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the latitude
const latitude = document.querySelector('#latlong dd:nth-of-type(1)');
// STEP 1b: Grab the second <dd> element for displaying the longitude
const longitude = document.querySelector('#latlong dd:nth-of-type(2)');
// STEP 1c: Grab the <p> element for outputting geolocation status messages
const statusMsg = document.querySelector('#status');
// STEP 1d: Grab the <a> element to use as a link to OpenStreetMap if the geolocation was successful
const mapLink = document.querySelector('#mapLink');

/* Functions
-------------------------------------------------- */

// STEP 3b: Build out the success() function, receiving the position as a parameter
function success(position) {
    console.log(position); // Debugging: Log the position object

    // STEP 3c: Output the latitude and longitude coordinates to the <dd> elements in steps 1a and 1b
    const lat = position.coords.latitude.toFixed(6); // Limit decimal places for readability
    const long = position.coords.longitude.toFixed(6);

    latitude.textContent = `${lat}°`;
    longitude.textContent = `${long}°`;

    // STEP 3d: Build out the link to OpenStreetMap
    const url = `https://www.openstreetmap.org/#map=13/${lat}/${long}`;
    mapLink.setAttribute("href", url);
    mapLink.setAttribute("target", "_blank");
    mapLink.textContent = "Open on Maps";

    // STEP 3e: Update status message with success feedback
    statusMsg.textContent = "Location found!";
}

// STEP 4a: Construct the error() function
function error(err) {
    console.warn(`Geolocation error (${err.code}): ${err.message}`); // Log error details for debugging

    // STEP 4b: Output a suitable error message based on the error code
    switch (err.code) {
        case err.PERMISSION_DENIED:
            statusMsg.textContent = "Permission denied! Please allow location access.";
            break;
        case err.POSITION_UNAVAILABLE:
            statusMsg.textContent = "Location unavailable! Try again later.";
            break;
        case err.TIMEOUT:
            statusMsg.textContent = "Request timed out! Move to an open area and try again.";
            break;
        default:
            statusMsg.textContent = "Sorry! Unable to find you.";
            break;
    }
}

/* Script Logic
-------------------------------------------------- */

// STEP 2a: Check support for Geolocation API
if (!navigator.geolocation) {
    // STEP 2b: Geolocation is not supported, so output a useful message
    statusMsg.textContent = "Geolocation API is not supported by your browser!";
} else {
    // STEP 2c: Geolocation is supported, so let's give the user a useful message
    statusMsg.textContent = "Locating...";
    
    // STEP 2d: Let's have a look at the geolocation object
    console.log(navigator.geolocation);

    // STEP 3a: Use the getCurrentPosition() method, which passes the device position 
    // to a named callback function (if successful), or calls an error function if it fails
    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,  // Requests the most accurate location possible
        timeout: 10000,            // Wait up to 10 seconds before erroring out
        maximumAge: 60000          // Allow caching of position for 1 minute
    });
}

// STEP 5: Try out the script on your mobile device - be sure to walk somewhere else in your office or classroom, then refresh the page to see your position change

/* This script adapted from the excellent code examples found at:
   https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples
   with a tip of the hat to https://www.openstreetmap.org/ */
