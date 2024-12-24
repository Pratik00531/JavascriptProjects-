const modelURL = "./model.json"; // Adjust based on your structure
const metadataURL = "./metadata.json"; // Adjust based on your structure

let model;
const uploadInput = document.getElementById("upload-image");
const resultElement = document.getElementById("result");
const uploadedImage = document.getElementById("uploaded-image");

// Load the Teachable Machine model
async function loadModel() {
    try {
        model = await tmImage.load(modelURL, metadataURL);
        console.log("Model loaded successfully.");
    } catch (error) {
        console.error("Error loading model:", error);
    }
}

// Classify the uploaded image
async function classifyImage() {
    if (!model) {
        resultElement.textContent = "Model not loaded yet. Please wait.";
        return;
    }

    const prediction = await model.predict(uploadedImage);
    const bestPrediction = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
    );

    resultElement.textContent = `Prediction: ${bestPrediction.className}, Confidence: ${(
        bestPrediction.probability * 100
    ).toFixed(2)}%`;
}

// Event listener for image upload
uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        uploadedImage.src = reader.result;
        uploadedImage.style.display = "block";
        uploadedImage.onload = classifyImage;
    };
    reader.readAsDataURL(file);
});

// Load the model when the page loads
window.addEventListener("load", loadModel);
