// Define Variables
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quiz-form");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const resultSection = document.getElementById("quiz-results");
  const overallResult = document.getElementById("overall-result");
  const totalScore = document.getElementById("total-score");
  const detailedResults = document.getElementById("detailed-results");

  // Define correct answers
  const answers = {
    q1: "HyperText Transfer Protocol", // Fill in the blank
    q2: "HTTP/0.9", // Multiple choice
    q3: "GET", // Multiple choice
    q4: "Low-latency streams & datagrams", // Multiple choice
    q5: ["HTTPS", "HTTP/2"], // Multi-select checkbox
  };

  // Handle Submit
  submitBtn.addEventListener("click", () => {
    let score = 0; // Initialize score counter
    let total = 5; // Total number of questions
    let outputHTML = "";

    // Question 1: Fill in the blank
    const q1Input = document.getElementById("q1").value.trim();
    if (q1Input.toLowerCase() === answers.q1.toLowerCase()) {
      score++; // Increment score if correct
      outputHTML += makeResultHTML(1, true, answers.q1);
    } else {
      outputHTML += makeResultHTML(1, false, answers.q1);
    }

    // Question 2: Multiple choice
    const q2 = form.q2.value;
    if (q2 === answers.q2) {
      score++;
      outputHTML += makeResultHTML(2, true, answers.q2);
    } else {
      outputHTML += makeResultHTML(2, false, answers.q2);
    }

    // Question 3: Multiple choice
    const q3 = form.q3.value;
    if (q3 === answers.q3) {
      score++;
      outputHTML += makeResultHTML(3, true, answers.q3);
    } else {
      outputHTML += makeResultHTML(3, false, answers.q3);
    }

    // Question 4: Multiple choice
    const q4 = form.q4.value;
    if (q4.toLowerCase().includes("low")) {
      // accept if answer contains "low"
      score++;
      outputHTML += makeResultHTML(4, true, answers.q4);
    } else {
      outputHTML += makeResultHTML(4, false, answers.q4);
    }

    // Question 5: Multi-select
    const q5Selected = Array.from(form.q5)
      .filter((chk) => chk.checked) // Only checked items
      .map((chk) => chk.value); // Extract values

    const isQ5Correct =
      q5Selected.length === answers.q5.length &&
      q5Selected.every((ans) => answers.q5.includes(ans)); // Ensure all correct selected

    if (isQ5Correct) {
      score++;
      outputHTML += makeResultHTML(5, true, answers.q5.join(", "));
    } else {
      outputHTML += makeResultHTML(5, false, answers.q5.join(", "));
    }

    // Calculate overall score percentage
    const percentage = Math.round((score / total) * 100);
    const pass = percentage >= 60; // 60% = passing grade

    // Display overall result
    overallResult.textContent = pass ? "✅ PASS" : "❌ FAIL";
    overallResult.style.color = pass ? "green" : "red";

    // Display total score
    totalScore.textContent = `Your Total Score: ${score} / ${total} (${percentage}%)`;
    totalScore.style.fontWeight = "bold";

    detailedResults.innerHTML = outputHTML;
    resultSection.style.display = "block"; // Show results
  });

  // Reset button click
  resetBtn.addEventListener("click", () => {
    // Clear displayed resulys + hide section
    resultSection.style.display = "none";
    overallResult.textContent = "";
    totalScore.textContent = "";
    detailedResults.innerHTML = "";
  });

  // Generate HTML for each question result
  function makeResultHTML(qNum, isCorrect, correctAnswer) {
    const color = isCorrect ? "green" : "red";
    const resultText = isCorrect ? "Correct" : "Incorrect";
    // Show result div
    return `
      <div class="question-result" style="color:${color}; margin-bottom: 10px;">
        <strong>Question ${qNum}:</strong> ${resultText}<br/>
        Answer: ${correctAnswer}
      </div>
    `;
  }
});
