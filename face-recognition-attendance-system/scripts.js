const URL = "https://teachablemachine.withgoogle.com/models/SC0aoW5JV/"; // Hosted model link
let model, webcam, maxPredictions;

// Load the model and set up the webcam
async function init() {
  try {
    const modelURL = `${URL}model.json`;
    const metadataURL = `${URL}metadata.json`;

    // Load the model
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Set up the webcam
    const webcamElement = document.getElementById("webcam");
    webcam = new tmImage.Webcam(640, 480, true); // Width, height, and flip

    // Request access to the webcam
    const setupResult = await webcam.setup();
    console.log("Webcam setup result:", setupResult); // Log the result of the setup

    await webcam.play();

    // Log the webcam object to check its properties
    console.log("Webcam object:", webcam);

    // Set the srcObject to the webcam stream
    if (webcam.webcam instanceof MediaStream) {
      webcamElement.srcObject = webcam.webcam; // This should be correct if webcam is set up properly
      webcamElement.style.transform = "scaleX(-1)"; // Flip horizontally
      console.log("Webcam setup complete");
    } else {
      console.error("Webcam stream is not a valid MediaStream:", webcam.webcam);
    }

    window.requestAnimationFrame(loop);
  } catch (error) {
    console.error("Error initializing the model or webcam:", error);
  }
}

// Main loop to detect faces and update attendance
async function loop() {
  webcam.update(); // Update the webcam frame
  const predictions = await model.predict(webcam.canvas);

  // Update attendance based on predictions
  predictions.forEach((prediction) => {
    const name = prediction.className;
    const statusElement = document.getElementById(`${name}-status`);
    if (prediction.probability > 0.8) {
      statusElement.textContent = "Present";
      statusElement.style.color = "green";
    }
  });

  // Reset to "Absent" if not detected
  const attendees = ["Pratik", "Darsh", "Vishang", "Harsh"];
  attendees.forEach((name) => {
    const statusElement = document.getElementById(`${name}-status`);
    if (!predictions.some((p) => p.className === name && p.probability > 0.8)) {
      statusElement.textContent = "Absent";
      statusElement.style.color = "red";
    }
  });

  window.requestAnimationFrame(loop);
}

// Start the system
init();