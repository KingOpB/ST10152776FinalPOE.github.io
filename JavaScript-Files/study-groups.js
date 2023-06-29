document.addEventListener("DOMContentLoaded", function () {
  const studyGroupBlocks = document.getElementById('study-group-blocks');
  const showCreateFormButton = document.getElementById('show-create-form-button');
  const createGroupForm = document.querySelector('.create-group-form');

  function createStudyGroupBlock(groupName, description, startDate, endDate) {
    const studyGroupBlock = document.createElement('div');
    studyGroupBlock.classList.add('study-group-block');

    const studyGroupContent = `
        <h2>${groupName}</h2>
        <p>${description}</p>
        <p>Duration: ${startDate} - ${endDate}</p>
        <button class="delete-group-button">Delete Group</button>
      `;

    studyGroupBlock.innerHTML = studyGroupContent;

    studyGroupBlocks.appendChild(studyGroupBlock);
  }

  function loadStudyGroups() {
    let studyGroups = JSON.parse(localStorage.getItem('studyGroups')) || [];

    // Sort the study groups by start date
    studyGroups.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    studyGroupBlocks.innerHTML = '';

    studyGroups.forEach(group => {
      createStudyGroupBlock(group.groupName, group.description, group.startDate, group.endDate);
    });
  }

  loadStudyGroups();

  showCreateFormButton.addEventListener('click', function () {
    createGroupForm.classList.toggle('visible');
  });

  createGroupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const groupNameInput = document.getElementById('group-name-input');
    const descriptionInput = document.getElementById('description-input');
    const startDateInput = document.getElementById('start-date-input');
    const endDateInput = document.getElementById('end-date-input');

    const groupName = groupNameInput.value;
    const description = descriptionInput.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (groupName && description && startDate && endDate) {
      const studyGroup = {
        groupName,
        description,
        startDate,
        endDate
      };

      let studyGroups = JSON.parse(localStorage.getItem('studyGroups')) || [];
      studyGroups.push(studyGroup);
      localStorage.setItem('studyGroups', JSON.stringify(studyGroups));

      createStudyGroupBlock(groupName, description, startDate, endDate);

      // Reset form fields
      groupNameInput.value = '';
      descriptionInput.value = '';
      startDateInput.value = '';
      endDateInput.value = '';

      createGroupForm.classList.remove('visible');
    }
  });

  studyGroupBlocks.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('delete-group-button')) {
      const password = prompt('Enter password to delete the group');
      if (password === 'ST10152776') {
        const studyGroupBlock = target.closest('.study-group-block');
        studyGroupBlock.remove();

        // Update localStorage with the updated study groups
        const studyGroups = Array.from(studyGroupBlocks.querySelectorAll('.study-group-block')).map(block => {
          const groupName = block.querySelector('h2').textContent;
          const description = block.querySelector('p:nth-of-type(1)').textContent;
          const duration = block.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
          const [startDate, endDate] = duration.split(' - ');

          return {
            groupName,
            description,
            startDate,
            endDate
          };
        });

        localStorage.setItem('studyGroups', JSON.stringify(studyGroups));
      } else {
        alert('Incorrect password. Group deletion failed.');
      }
    }
  });
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