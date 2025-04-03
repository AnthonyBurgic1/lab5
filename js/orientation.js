/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the <range> element inside the <dd id="alpha"> element for displaying the alpha value
const alphaSlider = document.querySelector('#alpha input[type="range"]');
// STEP 1b: Grab the <output> element just after the previous element
const alphaValue = document.querySelector('#alpha output');
// STEP 1c: Grab the <range> element inside the <dd id="beta"> element for displaying the beta value
const betaSlider = document.querySelector('#beta input[type="range"]');
// STEP 1d: Grab the <output> element just after the previous element
const betaValue = document.querySelector('#beta output');
// STEP 1e: Grab the <range> element inside the <dd id="gamma"> element for displaying the gamma value
const gammaSlider = document.querySelector('#gamma input[type="range"]');
// STEP 1f: Grab the <output> element just after the previous element
const gammaValue = document.querySelector('#gamma output');
// STEP 1g: Grab the <p id="status"> to output error messages, if needed
const statusMsg = document.querySelector('#status');

/* Functions
-------------------------------------------------- */

// STEP 4a: Construct the error() function
function error() {
    // STEP 4b: Output a suitable error message
    statusMsg.textContent = "Device Orientation Event is not supported by the browser!";
}

// STEP 5a: Construct the updateOrientation function
function updateOrientation(event) {
    console.log(event); // Debugging: Log the event object

    // STEP 5b: Capture the alpha value (rotation) and set the textContent for the <output> element
    const alpha = Math.round(event.alpha) || 0;
    alphaValue.textContent = `${alpha}°`;
    // STEP 5c: Use the same value to update the position of the slider
    alphaSlider.value = alpha;

    // STEP 5d: Capture the beta value (tilt toward/away) and set the textContent for the <output> element
    const beta = Math.round(event.beta) || 0;
    betaValue.textContent = `${beta}°`;
    // STEP 5e: Use the same value to update the position of the slider
    betaSlider.value = beta;

    // STEP 5f: Capture the gamma value (tilt left/right) and set the textContent for the <output> element
    const gamma = Math.round(event.gamma) || 0;
    gammaValue.textContent = `${gamma}°`;
    // STEP 5g: Use the same value to update the position of the slider
    gammaSlider.value = gamma;
}

/* Script Logic
-------------------------------------------------- */

// STEP 2a: Check support for the DeviceOrientationEvent
if (!window.DeviceOrientationEvent) {
    // STEP 2b: Do something helpful if there is no support for the DeviceOrientationEvent
    error();
} else {
    // STEP 3a: Request permission for iOS devices
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then((permissionState) => {
            if (permissionState === 'granted') {
                // STEP 3b: Add event listener for the 'deviceorientation' event
                window.addEventListener("deviceorientation", updateOrientation);
            } else {
                error(); // If permission is denied, show an error
            }
        }).catch(error);
    } else {
        // STEP 3c: Add event listener for all non-iOS devices
        window.addEventListener("deviceorientation", updateOrientation);
    }
}

/* Learn more at https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent */
