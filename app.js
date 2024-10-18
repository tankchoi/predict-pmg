document.getElementById('run-btn').addEventListener('click', function () {
    const algorithm = document.getElementById('algorithm').value;
    const cylinders = document.getElementById('cylinders').value;
    const displacement = document.getElementById('displacement').value;
    const horsepower = document.getElementById('horsepower').value;
    const weight = document.getElementById('weight').value;
    const acceleration = document.getElementById('acceleration').value;
    const modelYear = document.getElementById('model-year').value;
    const origin = document.getElementById('origin').value;

    const data = {
        cylinders: parseFloat(cylinders),
        displacement: parseFloat(displacement),
        horsepower: parseFloat(horsepower),
        weight: parseFloat(weight),
        acceleration: parseFloat(acceleration),
        model_year: parseInt(modelYear, 10),
        origin: parseInt(origin, 10)
    };

    let endpoint = '';
    if (algorithm === 'lr') {
        endpoint = 'https://machine-learning-wjhp.onrender.com/predict/linear';
    } else if (algorithm === 'ridge') {
        endpoint = 'https://machine-learning-wjhp.onrender.com/predict/ridge';
    } else if (algorithm === 'nn') {
        endpoint = 'https://machine-learning-wjhp.onrender.com/predict/nn';
    } else if (algorithm === 'stacking') {
        endpoint = 'https://machine-learning-wjhp.onrender.com/predict/stacking';
    }

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        const predictedPrice = result['result'];
        const roundedPrice = predictedPrice.toFixed(2); // Làm tròn đến 2 chữ số thập phân

        const resultTable = document.getElementById('result-table');
        resultTable.innerHTML = `
            <tr>
                <td>${cylinders}</td>
                <td>${displacement} in<sup>3</sup></td>
                <td>${horsepower}</td>
                <td>${weight} lbs</td>
                <td>${acceleration} s</td>
                <td>${modelYear}</td>
                <td>${origin}</td>
                <td id="result-value-bot">${roundedPrice} mpg</td>
            </tr>
        `;

        // Thông báo thành công và cuộn xuống cuối trang
        Swal.fire({
            title: 'Success!',
            text: 'Your prediction was successful.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.scrollTo({
                    top: document.body.scrollHeight, // Cuộn xuống cuối trang
                    behavior: 'smooth'
                });
            }
        });
    })
    .catch(error => {
        // Thông báo khi thất bại
        Swal.fire({
            title: 'Failed!',
            text: 'An error occurred during the prediction.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    });
});
