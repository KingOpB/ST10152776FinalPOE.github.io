// document.addEventListener("DOMContentLoaded", function() {
//   const faqItems = document.querySelectorAll('.faq');

//   faqItems.forEach(function(item) {
//     const question = item.querySelector('.question');

//     question.addEventListener('click', function() {
//       item.classList.toggle('open');
//     });
//   });
// });
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