document.addEventListener('DOMContentLoaded', function () {
    const brandList = document.getElementById('brandList');
    const modelList = document.getElementById('modelList');

    fetch('result.json')
        .then(response => response.json())
        .then(data => {
            const uniqueBrands = {};

            data.forEach(carData => {
                const brand = carData["Марка"];
                uniqueBrands[brand] = true;
            });

            const brandDropdown = document.getElementById('brandDropdown');
            const modelDropdown = document.getElementById('modelDropdown');

            Object.keys(uniqueBrands).forEach(brand => {
                const li = document.createElement('li');
                li.id = brand.toLowerCase();
                li.textContent = brand;
                li.addEventListener('click', function () {
                    brandDropdown.querySelector('span').textContent = this.textContent;
                    brandDropdown.querySelector('input').setAttribute('value', this.id);

                    // Очистим и скроем предыдущие данные моделей
                    modelList.innerHTML = '';
                    modelList.style.display = 'none';

                    // Заполним список моделей для выбранной марки
                    const selectedBrandModels = data
                        .filter(carData => carData["Марка"] === brand)
                        .map(carData => carData["Данные"])
                        .flat();

                    selectedBrandModels.forEach(model => {
                        const modelLi = document.createElement('li');
                        modelLi.textContent = model;
                        modelLi.addEventListener('click', function () {
                            modelDropdown.querySelector('span').textContent = model;
                            modelDropdown.querySelector('input').setAttribute('value', model);
                        });

                        modelList.appendChild(modelLi);
                    });

                    modelList.style.display = 'block';
                });

                brandList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

