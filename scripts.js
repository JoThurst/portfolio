document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleAboutMe");
    const aboutMeText = document.getElementById("aboutMeText");

    toggleButton.addEventListener("click", function() {
        aboutMeText.classList.toggle("hidden");
        toggleButton.textContent = aboutMeText.classList.contains("hidden") ? "Read more" : "Read less";
    });
});

// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    const jobTitles = ["Software Engineer", "Developer", "Life-Long Learner", "Lover of Sports, Movies, Videogames, & Outdoors", "Project Manager", "Leader"];
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 100; // Speed of typing
    const erasingSpeed = 50; // Speed of erasing
    const delayBetweenTitles = 2000; // Delay between typing next job title

    const jobTitleElement = document.querySelector(".job-title-typing");

    function type() {
        if (currentCharIndex < jobTitles[currentTitleIndex].length) {
            jobTitleElement.textContent += jobTitles[currentTitleIndex].charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, delayBetweenTitles);
        }
    }

    function erase() {
        if (currentCharIndex > 0) {
            jobTitleElement.textContent = jobTitles[currentTitleIndex].substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
            setTimeout(type, typingSpeed);
        }
    }

    type();
});
