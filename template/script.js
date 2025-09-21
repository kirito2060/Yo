document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const toggle = question.querySelector('.faq-toggle');

      answer.classList.toggle('open');

      toggle.textContent = answer.classList.contains('open') ? '-' : '+';
    });
  });
});