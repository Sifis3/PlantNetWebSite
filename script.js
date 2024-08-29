document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('income-form');
    const message = document.getElementById('message');
    const incomeList = document.getElementById('income-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const plantId = document.getElementById('plant-id').value;
        const amount = document.getElementById('amount').value;
        const year = document.getElementById('year').value;
        const comments = document.getElementById('comments').value;

        const data = new FormData();
        data.append('plantId', plantId);
        data.append('amount', amount);
        data.append('year', year);
        data.append('comments', comments);

        fetch('submit_income.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                message.innerText = 'Income recorded successfully!';
                form.reset();
                fetchIncomes();
            } else {
                message.innerText = 'An error occurred. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.innerText = 'An error occurred. Please try again.';
        });
    });

    function fetchIncomes() {
        fetch('fetch_incomes.php')
            .then(response => response.json())
            .then(data => {
                incomeList.innerHTML = '';
                data.forEach(income => {
                    const li = document.createElement('li');
                    li.textContent = `Plant ID: ${income.plant_id}, Amount: ${income.amount}, Year: ${income.year}, Comments: ${income.comments}`;
                    incomeList.appendChild(li);
                });
            });
    }

    fetchIncomes();
});