document.addEventListener('DOMContentLoaded', function () {
    const chatArea = document.getElementById('chat-area');

    // Array of questions about HCI
    const questions = [
        'What is Human-Computer Interaction (HCI)?',
        'What are the main goals of HCI?',
        'Why is user-centered design important in HCI?',
        // Add more questions...
    ];

    // Array of answers to the questions about HCI
    const answers = [
        'Human-Computer Interaction (HCI) is the study of how people interact with computers and technology.',
        'The main goals of HCI are to create usable, efficient, and enjoyable computer systems.',
        'User-centered design focuses on designing products and systems based on the needs, goals, and behaviors of the users.',
        // Add more answers...
    ];

    // Function to generate a random question and answer
    function getRandomQuestionAndAnswer() {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        const answer = answers[randomIndex];
        return { question, answer };
    }

    function displayRandomQuestionAndAnswer() {
        const { question, answer } = getRandomQuestionAndAnswer();
        const chatMessage = document.createElement('div');
        chatMessage.classList.add('message');
        chatMessage.innerHTML = `<strong><span style="color: lightblue;">Learner:</span></strong> ${question}<br><strong><span style="color: var(--color-cta);">Lecturer:</span></strong> ${answer}`;
        chatArea.appendChild(chatMessage);
    }

    // Generate and display random question and answer at regular intervals
    setInterval(displayRandomQuestionAndAnswer, 5000);
});
document.addEventListener("DOMContentLoaded", function () {
    const accountLink = document.querySelector(".navbar-links .dropdown");
    const dropdownContent = document.querySelector(".dropdown-content");
    const darkModeSwitch = document.getElementById("dark-mode-switch");
    const logoutButton = document.getElementById("logout");

    // Toggle dropdown menu
    accountLink.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });

    // Dark mode switch
    darkModeSwitch.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Logout overlay
    logoutButton.addEventListener("click", function () {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const countdown = document.createElement("div");
        countdown.classList.add("countdown");
        countdown.innerText = "Logging out in 5 seconds...";

        const cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.addEventListener("click", function () {
            overlay.remove();
        });

        overlay.appendChild(countdown);
        overlay.appendChild(cancelButton);
        document.body.appendChild(overlay);

        let timeLeft = 5;

        const countdownInterval = setInterval(function () {
            timeLeft--;
            countdown.innerText = `Logging out in ${timeLeft} seconds...`;

            if (timeLeft === 0) {
                clearInterval(countdownInterval);
                // Perform logout and redirect to homepage
                window.location.href = "../index.html";
            }
        }, 1000);
    });

    function loadStudyGroups() {
        let studyGroups = JSON.parse(localStorage.getItem("studyGroups")) || [];

        // Sort the study groups by start date
        studyGroups.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

        const upcomingEventsList = document.getElementById("upcoming-events");
        upcomingEventsList.innerHTML = ""; // Clear the list

        studyGroups.forEach((group) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            <strong>${group.groupName}</strong>
            <p>Start Date: ${group.startDate}</p>
            <p>End Date: ${group.endDate}</p>
          `;

            upcomingEventsList.appendChild(listItem);
        });
    }

    loadStudyGroups();
});