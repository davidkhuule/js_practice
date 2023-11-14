// Constants
const form = document.querySelector(".add");
const lists = {
  income: document.querySelector("ul.income-list"),
  expense: document.querySelector("ul.expense-list"),
};
const elements = {
  balance: document.getElementById("balance"),
  income: document.getElementById("income"),
  expense: document.getElementById("expense"),
};

// Initialize transactions array from localStorage or an empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Event listeners
lists.income.addEventListener("click", handleDeleteTransaction);
lists.expense.addEventListener("click", handleDeleteTransaction);
form.addEventListener("submit", handleFormSubmit);

// Functions
function handleDeleteTransaction(event) {
  if (event.target.classList.contains("delete")) {
    const id = event.target.parentElement.getAttribute("data-id");
    deleteTransaction(id);
    event.target.parentElement.remove();
    updateStatistics();
  }
}

function generateTemplate(id, source, amount, time) {
  return `
    <li data-id="${id}">
      <p>
        <span>${source}</span>
        <span id="time">${time}</span>
        <span>test</span>
      </p>
      $<span>${Math.abs(amount)}</span>
      <i class="bi bi-trash delete"></i>
    </li>`;
}

function addTransactionDOM(id, source, amount, time) {
  const list = amount > 0 ? lists.income : lists.expense;
  list.innerHTML += generateTemplate(id, source, amount, time);
}

function updateStatistics() {
  const updatedIncomes = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const updatedExpenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const updatedBalance = updatedIncomes - Math.abs(updatedExpenses);

  elements.balance.textContent = updatedBalance;
  elements.income.textContent = updatedIncomes;
  elements.expense.textContent = updatedExpenses;
}

function deleteTransaction(id) {
  transactions = transactions.filter(
    (transaction) => transaction.id !== Number(id)
  );
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function handleFormSubmit(event) {
  event.preventDefault();
  const source = form.source.value;
  const amount = Number(form.amount.value);
  if (source && !isNaN(amount)) {
    addTransaction(source, amount);
    updateStatistics();
  }
}

function addTransaction(source, amount) {
  const time = new Date();
  const transaction = {
    id: Math.floor(Math.random() * 100000),
    source,
    amount,
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionDOM(transaction.id, source, amount, transaction.time);
}

// Initial setup
init();
