// Sample data for customers
const customersData = [
    { id: 1, name: "Customer 1", email: "customer1@example.com", balance: 1000 },
    { id: 2, name: "Customer 2", email: "customer2@example.com", balance: 1500 },
    // Add more customers here...
];

// Sample data for transfers
const transfersData = [];

// Function to display all customers
function showCustomers() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>All Customers</h2>';

    const customersList = document.createElement('ul');
    customersData.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer.name} - Balance: $${customer.balance}`;
        customersList.appendChild(listItem);
    });

    mainContent.appendChild(customersList);
}

// Function to display transfer money form
function showTransferForm() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<h2>Transfer Money</h2>';

    const transferForm = document.createElement('form');
    transferForm.innerHTML = `
        <label for="sender">Sender:</label>
        <select id="sender">
            <!-- Populate sender dropdown with customer names -->
        </select>
        <br>
        <label for="receiver">Receiver:</label>
        <select id="receiver">
            <!-- Populate receiver dropdown with customer names -->
        </select>
        <br>
        <label for="amount">Amount:</label>
        <input type="number" id="amount" min="0" step="0.01">
        <br>
        <button type="button" onclick="transferMoney()">Transfer</button>
    `;

    mainContent.appendChild(transferForm);

    // Populate sender and receiver dropdowns with customer names
    const senderSelect = document.getElementById('sender');
    const receiverSelect = document.getElementById('receiver');
    customersData.forEach(customer => {
        senderSelect.innerHTML += `<option value="${customer.id}">${customer.name}</option>`;
        receiverSelect.innerHTML += `<option value="${customer.id}">${customer.name}</option>`;
    });
}

// Function to transfer money
function transferMoney() {
    const senderId = parseInt(document.getElementById('sender').value);
    const receiverId = parseInt(document.getElementById('receiver').value);
    const amount = parseFloat(document.getElementById('amount').value);

    // Find sender and receiver in the data
    const sender = customersData.find(customer => customer.id === senderId);
    const receiver = customersData.find(customer => customer.id === receiverId);

    if (!sender || !receiver || isNaN(amount) || amount <= 0 || sender.balance < amount) {
        alert('Invalid transaction');
        return;
    }

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;

    // Record the transfer
    const transfer = {
        sender: sender.name,
        receiver: receiver.name,
        amount: amount,
        date: new Date().toLocaleString(),
    };
    transfersData.push(transfer);

    // Show success message and reset form
    alert('Transaction successful');
    document.getElementById('amount').value = '';
}
