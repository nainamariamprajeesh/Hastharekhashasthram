document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const dropZone = document.getElementById("dropZone");
    const fileInput = document.getElementById("fileInput");
    const previewImage = document.getElementById("previewImage");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const resultsDiv = document.getElementById("results");
    const uploadText = document.getElementById("uploadText");
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Sound effects
    const mysticSound = new Audio("audio/mystic-sound.mp3");
    const laughSound = new Audio("audio/laugh.mp3");

    // ====== IMAGE UPLOAD ====== //
    dropZone.addEventListener("click", () => fileInput.click());
    
    fileInput.addEventListener("change", handleImageUpload);
    
    // Drag and drop
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });
    
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("dragover");
    });
    
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        if (e.dataTransfer.files.length) {
            handleImageUpload({ target: { files: e.dataTransfer.files } });
        }
    });

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match("image.*")) {
            alert("Please upload an image file (JPEG, PNG)");
            return;
        }

        uploadText.textContent = "Uploading...";
        loadingSpinner.style.display = "block";

        const reader = new FileReader();
        reader.onload = (event) => {
            previewImage.src = event.target.result;
            previewImage.style.display = "block";
            uploadText.textContent = "Image ready!";
            loadingSpinner.style.display = "none";
            analyzeBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // ====== PALM READING ROASTS ====== //
    analyzeBtn.addEventListener("click", function() {
        if (!previewImage.src) {
            alert("Upload an image first!");
            return;
        }

        // Play mystic sound
        mysticSound.currentTime = 0;
        mysticSound.play();

        // Show loading
        analyzeBtn.disabled = true;
        resultsDiv.innerHTML = `
            <div class="loading">
                <div class="spinner big"></div>
                <p>ഒരു Minutee...</p>
            </div>
        `;

        // Simulate palm reading delay
        setTimeout(() => {
            showRoast();
            laughSound.play();
            analyzeBtn.disabled = false;
        }, 3000);
    });

    function showRoast() {
        const roasts = [
          "Nalla lakshnam ketta kai aanu....!!",
"Aazhchayil 4 divasangal nalathala....baaki 3 divasangal mosham aanu",
"Saturday,Sunday avadhi divasangal aayirikum",
"Aduthu varsham oru vaysu koodum",
"1 inteyum 3 inteyum yil edayil oru number vichariku....vicharicho? 2 alle vichariche....!!",
"Kalyanna rekha missing aato....!!",
"Pranaya bandangal undel odane thanne poti paalees aavum....",
"Montha kanda patti velam kudikila"
        ];

        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
        
        resultsDiv.innerHTML = `
            <div class="roast-box">
                <div class="roast-header">
                    <img src="images/fire.png" alt="Fire" class="fire-icon">
                    <h3>Ollathe parayulu...... illathathu parayan madi kannikila</h3>
                    <img src="images/fire.png" alt="Fire" class="fire-icon">
                </div>
                <p class="roast-text">"${randomRoast}"</p>
                <button id="tryAgainBtn">Dosham ilaa mone nalath thanne... Onnuda nokikoo🔮</button>
            </div>
        `;

        document.getElementById("tryAgainBtn").addEventListener("click", resetApp);
    }

    function resetApp() {
        previewImage.src = "";
        previewImage.style.display = "none";
        fileInput.value = "";
        resultsDiv.innerHTML = "";
        uploadText.textContent = "Drag & drop or click to upload";
        analyzeBtn.disabled = true;
    }
});