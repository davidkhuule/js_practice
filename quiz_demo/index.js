const form = document.querySelector(".quiz-form");
const result = document.querySelector(".result");
const tryAgainButton = document.querySelector(".reload");
const submitButton = document.querySelector(".submit");
const correctAnswers = ["A", "B", "C", "D", "A"];

// Get all questions using a common class
const questions = document.querySelectorAll(".question");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;
  questions.forEach((question, index) => {
    const userAnswer = form[`q${index + 1}`].value;
    const correctAnswer = correctAnswers[index];

    if (userAnswer === correctAnswer) {
      score += 1;
      question.classList.add("correct");
    } else {
      question.classList.add("wrong");
    }
  });

  scrollTo(0, 0);
  result.classList.remove("hide");
  result.querySelector(
    "p"
  ).textContent = `You scored ${score}/${questions.length}!`;

  submitButton.classList.add("hide");
});

tryAgainButton.addEventListener("click", () => {
  result.classList.add("hide");
  questions.forEach((question) => {
    question.classList.remove("correct", "wrong");
  });

  submitButton.classList.remove("hide");
});
