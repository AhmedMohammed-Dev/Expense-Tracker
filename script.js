
// استرجاع النفقات من localStorage أو تهيئتها كمصفوفة فارغة إذا لم تكن موجودة
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

// دالة لإضافة النفقة
function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;

    // التحقق من المدخلات
    if (!description || !amount || !date) {
        showMessage("يرجى ملء جميع الحقول.", "error");
        return;
    }

    if (amount <= 0) {
        showMessage("المبلغ يجب أن يكون أكبر من صفر.", "error");
        return;
    }

    // إضافة النفقة للمصفوفة
    const expense = { description, amount, date };
    expenses.push(expense);

    // حفظ النفقات في localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // تحديث النفقات المعروضة وحساب الإجمالي
    displayExpenses();
    showMessage("تم إضافة النفقة بنجاح.", "success");

    // مسح المدخلات بعد إضافة النفقة
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDate').value = '';
}

// دالة لعرض النفقات
function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    const totalAmount = document.getElementById('totalAmount');
    expenseList.innerHTML = '';  // مسح القائمة الحالية من النفقات
    total = 0;

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - ${expense.amount} جنيه - ${expense.date}
            <button onclick="deleteExpense(${index})">حذف</button>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });

    // تحديث الإجمالي
    totalAmount.textContent = total.toFixed(2);
}

// دالة لحذف النفقة
function deleteExpense(index) {
    expenses.splice(index, 1);  // حذف النفقة المحددة من المصفوفة
    localStorage.setItem("expenses", JSON.stringify(expenses));  // حفظ النفقات في localStorage
    displayExpenses();  // تحديث النفقات المعروضة
    showMessage("تم حذف النفقة بنجاح.", "success");
}

// دالة لعرض الرسائل للمستخدم (نجاح أو خطأ)
function showMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;

    // تعيين نوع الرسالة: نجاح أو خطأ
    if (type === "success") {
        messageElement.classList.remove("error");
        messageElement.classList.add("success");
    } else if (type === "error") {
        messageElement.classList.remove("success");
        messageElement.classList.add("error");
    }

    // إظهار الرسالة ثم إخفائها بعد 3 ثوانٍ
    messageElement.classList.remove("hidden");
    setTimeout(() => {
        messageElement.classList.add("hidden");
    }, 3000);
}

// عند تحميل الصفحة، نعرض النفقات المحفوظة
window.onload = displayExpenses;
