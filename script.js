// مصفوفة لتخزين النفقات
let expenses = [];
let chart;

// تهيئة Flatpickr لتواريخ البداية والنهاية
flatpickr("#startDate", {
    dateFormat: "Y-m-d", // تحديد التنسيق
    maxDate: "today", // تحديد أقصى تاريخ
    allowInput: true // السماح بإدخال التواريخ يدويًا
});

flatpickr("#endDate", {
    dateFormat: "Y-m-d", // تحديد التنسيق
    maxDate: "today", // تحديد أقصى تاريخ
    allowInput: true // السماح بإدخال التواريخ يدويًا
});

// دالة لإظهار رسالة الخطأ داخل الموقع
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block'; // عرض الرسالة
}

// دالة لإضافة النفقة
function addExpense() {
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const date = document.getElementById('expenseDate').value;
    const category = document.getElementById('expenseCategory').value;

    // إخفاء الرسالة إذا كانت موجودة
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    // التحقق من وجود البيانات المطلوبة
    if (amount && date && category && (category !== 'أخرى' || description)) {
        const expense = { description, amount, date, category };

        // إضافة النفقة إلى المصفوفة
        expenses.push(expense);

        // تحديث العرض
        displayExpenses();

        // مسح الحقول بعد الإضافة
        document.getElementById('expenseDescription').value = '';
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseDate').value = '';
        document.getElementById('expenseCategory').value = '';
    } else {
        let errorText = "يرجى ملء جميع الحقول المطلوبة.";

        // إذا كان الصنف هو "أخرى"، يجب أن يكون الوصف مملوءًا
        if (category === "أخرى" && !description) {
            errorText = "يرجى إدخال وصف النفقة عندما يكون الصنف 'أخرى'.";
        }

        // عرض الرسالة في الموقع
        showError(errorText);
    }
}

// دالة لعرض النفقات
function displayExpenses() {
    const expenseList = document.getElementById('expenseList');
    const totalAmount = document.getElementById('totalAmount');

    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - ${expense.amount} جنيه - ${expense.date} - ${expense.category}
            <button onclick="deleteExpense(${index})">حذف</button>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });

    totalAmount.textContent = total.toFixed(2);

    // تحديث الرسم البياني
    updateChart();
}

// دالة لحذف النفقة
function deleteExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
}

// دالة لتصفية النفقات حسب التاريخ
function filterByDate() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const filteredExpenses = expenses.filter(expense => {
        return (!startDate || expense.date >= startDate) && (!endDate || expense.date <= endDate);
    });

    displayFilteredExpenses(filteredExpenses);
}

// دالة لعرض النفقات بعد التصفية حسب التاريخ
function displayFilteredExpenses(filteredExpenses) {
    const expenseList = document.getElementById('expenseList');
    const totalAmount = document.getElementById('totalAmount');
//         Ahmed Mohammed Mohammed 

    expenseList.innerHTML = '';
    let total = 0;

    filteredExpenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - ${expense.amount} جنيه - ${expense.date} - ${expense.category}
            <button onclick="deleteExpense(${index})">حذف</button>
        `;
        expenseList.appendChild(li);
        total += expense.amount;
    });

    totalAmount.textContent = total.toFixed(2);

    // تحديث الرسم البياني
    updateChart();
}

// دالة لتحديث الرسم البياني
function updateChart() {
    const ctx = document.getElementById('expensesChart').getContext('2d');

    // تجميع النفقات حسب الصنف
    const categories = {};
    expenses.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
        return;
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'النفقات حسب الصنف',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} جنيه`;
                        }
                    }
                }
            }
        }
    });
}

// دالة لتفعيل أو تعطيل حقل وصف النفقة حسب الصنف
function toggleDescriptionField() {
    const category = document.getElementById('expenseCategory').value;
    const descriptionField = document.getElementById('expenseDescription');
    
    // إذا كان الصنف هو "أخرى"، يصبح وصف النفقة إجباريًا
    if (category === "أخرى") {
        descriptionField.required = true;
    } else {
        descriptionField.required = false;
    }
}
