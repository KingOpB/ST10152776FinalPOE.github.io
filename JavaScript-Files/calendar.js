document.addEventListener("DOMContentLoaded", function () {
  var currentDate = new Date();
  var currentMonth = currentDate.getMonth();
  var currentYear = currentDate.getFullYear();
  var events = [];

  var monthYearText = document.getElementById("month-year");
  var prevBtn = document.getElementById("prev-btn");
  var nextBtn = document.getElementById("next-btn");
  var datesContainer = document.querySelector(".calendar-dates");
  var studyPlanList = document.getElementById("study-plan");
  var upcomingEventsList = document.getElementById("upcoming-events");
  var eventModal = document.getElementById("event-modal");
  var eventForm = document.getElementById("event-form");
  var eventTitleInput = document.getElementById("event-title");
  var eventDateInput = document.getElementById("event-date");
  var eventDurationInput = document.getElementById("event-duration");
  var eventNotesInput = document.getElementById("event-notes");
  var eventTypeInput = document.getElementById("event-type");

  prevBtn.addEventListener("click", function () {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    renderCalendar(currentMonth, currentYear);
  });

  nextBtn.addEventListener("click", function () {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    renderCalendar(currentMonth, currentYear);
  });

  datesContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("date")) {
      var selectedDate = new Date(currentYear, currentMonth, parseInt(event.target.textContent));
      openEventModal(selectedDate);
    }
  });

  eventForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var eventTitle = eventTitleInput.value;
    var eventDate = eventDateInput.value;
    var eventDuration = eventDurationInput.value;
    var eventNotes = eventNotesInput.value;
    var eventType = eventTypeInput.value;

    var event = {
      title: eventTitle,
      date: eventDate,
      duration: eventDuration,
      notes: eventNotes,
      type: eventType
    };

    events.push(event);
    renderEvents();
    closeEventModal();
    clearEventForm();
  });

  eventModal.addEventListener("click", function (event) {
    if (event.target.classList.contains("close")) {
      closeEventModal();
    }
  });

  function renderCalendar(month, year) {
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var numDays = lastDay.getDate();
    var startOffset = firstDay.getDay();

    monthYearText.textContent = getMonthName(month) + " " + year;
    datesContainer.innerHTML = "";

    for (var i = 0; i < startOffset; i++) {
      var emptyDate = document.createElement("div");
      emptyDate.classList.add("date");
      datesContainer.appendChild(emptyDate);
    }

    for (var i = 1; i <= numDays; i++) {
      var date = document.createElement("div");
      date.classList.add("date");
      date.textContent = i;
      datesContainer.appendChild(date);
    }

    renderEvents();
  }

  function renderEvents() {
    studyPlanList.innerHTML = "";
    upcomingEventsList.innerHTML = "";

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var eventItem = document.createElement("li");
      eventItem.textContent = formatDate(event.date) + " - " + event.title + " - " + event.duration;

      if (event.type === "study") {
        studyPlanList.appendChild(eventItem);
      } else {
        var eventTag = document.createElement("span");
        eventTag.classList.add("personal-tag");
        eventTag.textContent = "(P)";
        eventItem.appendChild(eventTag);
        upcomingEventsList.appendChild(eventItem);
      }
    }

    highlightEventDates();
  }

  function formatDate(date) {
    var formattedDate = new Date(date);
    var options = { day: "numeric", month: "short" };
    return formattedDate.toLocaleDateString("en-US", options);
  }

  function highlightEventDates() {
    var dateElements = datesContainer.getElementsByClassName("date");

    for (var i = 0; i < dateElements.length; i++) {
      var dateElement = dateElements[i];
      var dateValue = parseInt(dateElement.textContent);
      var hasEvent = events.some(function (event) {
        return new Date(event.date).getDate() === dateValue;
      });

      if (hasEvent) {
        dateElement.classList.add("has-event");
      } else {
        dateElement.classList.remove("has-event");
      }
    }
  }

  function openEventModal(date) {
    eventDateInput.value = formatDate(date);
    eventModal.style.display = "block";
  }

  function closeEventModal() {
    eventModal.style.display = "none";
  }

  function clearEventForm() {
    eventForm.reset();
  }

  function getMonthName(month) {
    var monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
  }

  renderCalendar(currentMonth, currentYear);
});  