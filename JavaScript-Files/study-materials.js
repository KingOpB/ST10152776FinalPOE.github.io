document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const fileInput = document.getElementById('file-upload');
    const documentTitleInput = document.getElementById('document-title');
    const documentsSection = document.getElementById('documents-section');

    // Load documents from local storage
    loadDocuments();

    // Event listener for the upload button
    uploadButton.addEventListener('click', function () {
        console.log('Upload button clicked');
        const file = fileInput.files[0];
        const title = documentTitleInput.value;

        if (file && title) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                saveDocument(title, reader.result);
                documentTitleInput.value = '';
                fileInput.value = '';
                loadDocuments();
            };
        }
    });

    function saveDocument(title, data) {
        let documents = JSON.parse(localStorage.getItem('studyMaterials')) || [];
        documents.push({ title, data, locked: true });
        localStorage.setItem('studyMaterials', JSON.stringify(documents));
    }

    function loadDocuments() {
        let documents = JSON.parse(localStorage.getItem('studyMaterials')) || [];
        documentsSection.innerHTML = '';
        documents.forEach((doc, index) => {
            const documentBlock = document.createElement('div');
            documentBlock.className = 'document-block';

            // determine icon based on file type
            let icon;
            if (doc.data.startsWith('data:application/pdf')) {
                icon = '📄';  // PDF icon
            } else if (doc.data.startsWith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document') || doc.data.startsWith('data:application/msword')) {
                icon = '📝';  // Word icon
            } else if (doc.data.startsWith('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || doc.data.startsWith('data:application/vnd.ms-excel')) {
                icon = '📊';  // Excel icon
            } else if (doc.data.startsWith('data:application/vnd.openxmlformats-officedocument.presentationml.presentation') || doc.data.startsWith('data:application/vnd.ms-powerpoint')) {
                icon = '📽️';  // PowerPoint icon
            } else {
                icon = '📁';  // Generic file icon
            }

            const documentContent = document.createElement('div');
            documentContent.innerHTML = `<strong>${icon} ${doc.title}</strong>`;
            documentContent.className = 'document-content';
            documentContent.addEventListener('click', function () {
                openDocument(doc);
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.style.backgroundColor = 'var(--color-cta)';
            deleteButton.addEventListener('click', function () {
                const password = prompt('Enter password to delete:');
                if (password === 'ST10152776') {
                    deleteDocument(index);
                    loadDocuments();
                } else {
                    alert('Incorrect password!');
                }
            });

            documentBlock.appendChild(documentContent);
            documentBlock.appendChild(deleteButton);

            documentsSection.appendChild(documentBlock);
        });
    }

    function openDocument(document) {
        const password = prompt('Enter password:');
        if (password === 'ST10152776') {
            const downloadLink = document.createElement('a');
            downloadLink.href = document.data;
            downloadLink.download = document.title;
            downloadLink.click();
        } else {
            alert('Incorrect password!');
        }
    }

    function deleteDocument(index) {
        let documents = JSON.parse(localStorage.getItem('studyMaterials')) || [];
        documents.splice(index, 1);
        localStorage.setItem('studyMaterials', JSON.stringify(documents));
    }
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