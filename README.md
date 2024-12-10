<h1 style="font-size: 50px; text-align: center;">Expense Tracker System</h1>

A simple, user-friendly **Expense Tracker** application built using **HTML**, **CSS**, and **JavaScript**. This project helps you keep track of your daily expenses, add new entries, and view your spending summary in a clear and organized manner.

## 📝 **Overview**

The **Expense Tracker** allows users to:
- **Add descriptions, amounts, and dates** for their expenses.
- **View a list of all recorded expenses**.
- Automatically calculate the **total spending**.
- Display **notifications** for empty fields or invalid entries.

This project is designed to be lightweight, easy to use, and a great starting point for beginners learning **JavaScript** and working with the **DOM**.

## 🚀 **Features**

- **Add Expenses**: Easily add expenses with descriptions, amounts, and dates.
- **Expense Summary**: Displays a list of all recorded expenses along with the total sum.
- **Input Validation**: Alerts the user if required fields are missing or if the entered amount is not valid.
- **Responsive Design**: Mobile-friendly interface to track expenses on the go.
- **Notifications**: Real-time feedback when the user interacts with the app (e.g., successful addition, missing fields).

## 🔧 **Technologies Used**

- **HTML5**: Markup language for structuring the webpage.
- **CSS3**: Styling the page to ensure a clean and modern look.
- **JavaScript**: Logic for handling user input, managing expenses, and validating data.
- **LocalStorage**: To store expenses persistently across page reloads.

## 🖥️ **Installation**

### **Prerequisites**

To run this project locally, you will need the following:
- A modern web browser (e.g., **Chrome**, **Firefox**, **Edge**).

### **Steps to Run the Project**

1. Clone this repository to your local machine using:
   bash
    ```
    git clone https://github.com/YourUsername/Expense-Tracker.git
    ```

3. Navigate to the project directory:
 bash
    ```
    cd Expense-Tracker
    ```

4. Open `index.html` in your web browser.

5. Start adding your expenses!

## 🔍 **Usage**

1. **Add a Description**: Enter a short description of your expense (e.g., "Lunch", "Taxi", etc.).
2. **Enter the Amount**: Add the amount of the expense in numerical form.
3. **Pick a Date**: Select the date of the expense from the date picker.
4. Click the **"Add Expense"** button to save your expense.

Your expenses will be listed in order with their total calculated at the bottom.

## ⚙️ **Code Example**

Here is a small snippet of how the expenses are added and validated using **JavaScript**:

```javascript
function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const category = document.getElementById('expenseCategory').value;

    // Hide the error message if it exists
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    // Check if the required data is provided
    if (amount && date && category && (category !== 'Other' || description)) {
        const expense = { description, amount, date, category };

        // Add the expense to the array
        expenses.push(expense);

        // Update the display
        displayExpenses();

        // Clear the fields after adding the expense
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDate').value = '';
        document.getElementById('expenseCategory').value = '';
    } else {
        let errorText = "Please fill in all the required fields.";

        // If the category is "Other", the description must be filled in
        if (category === "Other" && !description) {
            errorText = "Please enter a description when the category is 'Other'.";
        }

        // Display the error message on the site
        showError(errorText);
    }
}

```
## 📸 Screenshots
Here are a few screenshots of the app in action:


## 💬 Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. Here are a few ways you can contribute:

Report bugs or issues.
Suggest new features.
Improve documentation.
