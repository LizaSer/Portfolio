class Account {
  constructor(owner, movements, pin, userName) {
    this.owner = owner;
    this.movements = movements;
    this.pin = pin;
    this.userName = userName;
  }
}

const account1 = new Account(
  "Daniel Lotus",
  [200, 450, -400, 3000, -650, -130, 70, 1300],
  1111,
  "dl"
);
const account2 = new Account(
  "Israel Boano",
  [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  2222,
  "ib"
);
const account3 = new Account(
  "Tal Mars",
  [200, -200, 340, -300, -20, 50, 400, -460],
  3333,
  "tm"
);
const account4 = new Account(
  "Gal Ferrero",
  [430, 1000, 700, 50, 90],
  4444,
  "gf"
);

const accounts = [account1, account2, account3, account4];

//index-page
const btnLogin = document.getElementById("login-btn");
const inputLoginUsername = document.getElementById("login-input-user");
const inputLoginPin = document.getElementById("login-input-pin");
const errorMessageEl = document.getElementById("error-message");
const loginPage = document.getElementById("login-page");
const currentAccountDisplayEl = document.getElementById("current-account-info");
const userNameEl = document.getElementById("user-name-label");

btnLogin.addEventListener("click", function () {
  const userName = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  for (let account of accounts) {
    if (account.userName == userName && account.pin == pin) {
      displayAccountPageInfo(account);
      return;
    } else
      errorMessageEl.innerHTML = "Incorrect login details please, try again";
  }
});

inputLoginUsername.addEventListener(
  "click",
  () => (errorMessageEl.innerHTML = "")
);

function displayAccountPageInfo(account) {
  currentAccountDisplayEl.classList.remove("display-none");
  loginPage.classList.add("display-none");
  userNameEl.innerHTML = account.owner.split(" ")[0];
  displayMovements(account.movements, account);
}

function getCurrentAccount() {
  const userName = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  for (let account of accounts) {
    if (account.userName == userName && account.pin == pin) {
      return account;
    }
  }
}

//account-user-page
const balanceValueEl = document.getElementById("balance-value");
const summaryValueInEl = document.getElementById("summary-value-in");
const summaryValueOutEl = document.getElementById("summary-value-out");

const containerMovements = document.querySelector(".movements");
const btnTransfer = document.getElementById("transfer-btn");
const btnDeposit = document.getElementById("deposit-btn");
const btnWithdrawal = document.getElementById("withdrawal-btn");
const btnLogOut = document.getElementById("logout-btn");

const inputTransPerTo = document.getElementById("transfer-to-input");
const inputTransPerAmount = document.getElementById("transfer-to-amount-input");
const inputDepositAmount = document.getElementById("deposit-amount-input");
const inputWithdrawalAmount = document.getElementById(
  "withdrawal-amount-input"
);
const depositFailedErrorMessage = document.getElementById("deposit-failed");
const withdrawalFailedErrorMessage =
  document.getElementById("withdrawal-failed");
const transferFailedErrorMessage = document.getElementById("transfer-failed");

const displayMovements = function (movements, account) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements-row">
    <div class="movements-type movements-type-${type}">${i + 1} ${type}</div>
    <div class="movements-value">${mov}₪</div>
    </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
  calcAndDisplayBalance(movements, account);
};

const calcAndDisplayBalance = function (movements, account) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  balanceValueEl.textContent = `${balance}₪`;
  calcDisplaySummary(movements, account);
};

const calcDisplaySummary = function (movements, account) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueInEl.textContent = `${incomes}₪`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueOutEl.textContent = `${Math.abs(out)}₪`;
};

const updateUI = function (account) {
  inputTransPerTo.value = "";
  inputTransPerAmount.value = "";
  transferFailedErrorMessage.innerHTML = "";
  displayMovements(account.movements, account);
};

btnTransfer.addEventListener("click", function (e) {
  const balanceValueNum = balanceValueEl.innerHTML.split("₪")[0];
  const transferToAccountUserName = String(inputTransPerTo.value);
  const transferToAccountAmount = Number(inputTransPerAmount.value);
  const currentAccountDetails = getCurrentAccount();
  if (balanceValueNum < transferToAccountAmount) {
    transferFailedErrorMessage.innerHTML =
      "* Transfer amount is higher than the amount in the account";
  } else if (
    transferToAccountUserName != currentAccountDetails.userName &&
    transferToAccountAmount > 0
    // balanceValueNum > 0
  ) {
    for (let account of accounts) {
      if (account.userName == transferToAccountUserName) {
        account.movements.push(transferToAccountAmount);
        currentAccountDetails.movements.push(-transferToAccountAmount);
        updateUI(account);
        updateUI(currentAccountDetails);
      }
    }
  } else {
    transferFailedErrorMessage.innerHTML =
      "* transfer failed, please check the values";
  }
});

inputTransPerTo.addEventListener("click", () => {
  transferFailedErrorMessage.innerHTML = "";
});

inputTransPerAmount.addEventListener("click", () => {
  transferFailedErrorMessage.innerHTML = "";
});

btnDeposit.addEventListener("click", function () {
  const depositAmount = Number(inputDepositAmount.value);
  if (depositAmount > 0) {
    const currentAccountDetails = getCurrentAccount();
    currentAccountDetails.movements.push(depositAmount);
    inputDepositAmount.value = "";
    updateUI(currentAccountDetails);
  } else depositFailedErrorMessage.innerHTML = "* Please enter a number greater than 0";
});

inputDepositAmount.addEventListener(
  "click",
  () => (depositFailedErrorMessage.innerHTML = "")
);

btnWithdrawal.addEventListener("click", function () {
  const withdrawalAmount = Number(inputWithdrawalAmount.value);
  if (withdrawalAmount > 0) {
    const currentAccountDetails = getCurrentAccount();
    currentAccountDetails.movements.push(-withdrawalAmount);
    inputWithdrawalAmount.value = "";
    updateUI(currentAccountDetails);
  } else withdrawalFailedErrorMessage.innerHTML = "* Please enter a number greater than 0";
});

inputWithdrawalAmount.addEventListener(
  "click",
  () => (withdrawalFailedErrorMessage.innerHTML = "")
);

btnLogOut.addEventListener("click", () => {
  currentAccountDisplayEl.classList.add("display-none");
  loginPage.classList.remove("display-none");
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
});

//-----------------------------------------------------------

const showTransferOperation = document.getElementById(
  "show-transfer-operation"
);
const showDepositOperation = document.getElementById("show-deposit-operation");
const showWithdrawalOperation = document.getElementById(
  "show-withdrawal-operation"
);

showTransferOperation.addEventListener("click", () => {
  const transferContainerEl = document.getElementById("transfer-container");
  if (!transferContainerEl.matches(".display-none")) {
    transferContainerEl.classList.add("display-none");
  } else {
    transferContainerEl.classList.remove("display-none");
  }
  transferFailedErrorMessage.innerHTML = "";
});

showDepositOperation.addEventListener("click", () => {
  const depositContainerEl = document.getElementById("deposit-container");
  if (!depositContainerEl.matches(".display-none")) {
    depositContainerEl.classList.add("display-none");
  } else {
    depositContainerEl.classList.remove("display-none");
  }
  depositFailedErrorMessage.innerHTML = "";
});

showWithdrawalOperation.addEventListener("click", () => {
  const withdrawalContainerEl = document.getElementById("withdrawal-container");
  if (!withdrawalContainerEl.matches(".display-none")) {
    withdrawalContainerEl.classList.add("display-none");
  } else {
    withdrawalContainerEl.classList.remove("display-none");
  }
  withdrawalFailedErrorMessage.innerHTML = "";
});
