// 1. SOURCE-OF-TRUTH ARRAY
let students = [
    { name: "Victorious Praise", score: 85 },
    { name: "Bowale Havila", score: 92 },
    { name: "Elliot Adams", score: 76 }
];

// 2. GET HTML ELEMENTS
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentScore = document.getElementById("studentScore");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");

const nameError = document.getElementById("nameError");
const scoreError = document.getElementById("scoreError");

// 3. DISPLAY STUDENT CARDS
function displayStudents(studentArray) {
    studentList.innerHTML = "";

    if (studentArray.length === 0) {
        studentList.innerHTML =
            '<p class="empty-message">No students found.</p>';
        return;
    }

    studentArray.forEach(function(student) {
        const card = document.createElement("div");
        card.classList.add("student-card");

        const name = document.createElement("h3");
        name.textContent = student.name;

        const score = document.createElement("p");
        score.textContent = "Score: " + student.score + "/100";

        card.appendChild(name);
        card.appendChild(score);

        studentList.appendChild(card);
    });
}

// Display initial students
displayStudents(students);


// 4. FORM VALIDATION AND ADD STUDENT
studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const scoreValue = studentScore.value.trim();
    const score = Number(scoreValue);

    // Clear previous error messages
    nameError.textContent = "";
    scoreError.textContent = "";

    let isValid = true;

    // Validate name
    if (name.length < 2) {
        nameError.textContent =
            "Name must contain at least 2 characters.";
        isValid = false;
    }

    // Validate score
    if (
        scoreValue === "" ||
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
    ) {
        scoreError.textContent =
            "Score must be a number between 0 and 100.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Add student to the array
    students.push({
        name: name,
        score: score
    });

    // Update student cards
    displayStudents(students);

    // Clear form
    studentForm.reset();
});


// 5. LIVE SEARCH USING filter()
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filteredStudents = students.filter(function(student) {
        return student.name.toLowerCase().includes(searchTerm);
    });

    displayStudents(filteredStudents);
});


// 6. FETCH ANNOUNCEMENT FROM PUBLIC JSON API
async function fetchAnnouncement() {
    const announcement = document.getElementById("announcement");

    announcement.textContent = "Loading announcement...";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Failed to load announcement.");
        }

        const data = await response.json();

        // Display successful response
        announcement.textContent = "Welcome to Your Class Board!";

    } catch (error) {
        // Display friendly error message
        announcement.textContent =
            "Sorry, we couldn't load the announcement. Please try again later.";

        console.error("Announcement error:", error);
    }
}

// Run the API function
fetchAnnouncement();