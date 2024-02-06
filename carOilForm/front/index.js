document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        dropdown.addEventListener('click', function () {
            this.classList.toggle('active');
            this.querySelector('.dropdown-menu').classList.toggle('show');
        });

        dropdown.addEventListener('focusout', function () {
            this.classList.remove('active');
            this.querySelector('.dropdown-menu').classList.remove('show');
        });

        dropdown.querySelectorAll('.dropdown-menu li').forEach(function (item) {
            item.addEventListener('click', function () {
                var parentDropdown = this.closest('.dropdown');
                parentDropdown.querySelector('span').textContent = this.textContent;
                parentDropdown.querySelector('input').setAttribute('value', this.id);
                if (parentDropdown.id === 'brandList') {
                    updateModelDropdown(this.id);
                }
            });
        });
    });

    function updateModelDropdown(brandId) {
        fetch('result.json')
            .then(response => response.json())
            .then(data => {
                const modelList = document.getElementById('dataList');
                modelList.innerHTML = '';

                data.forEach(carData => {
                    if (carData["Марка"].toLowerCase() === brandId.toLowerCase()) {
                        const models = carData["Данные"];
                        models.forEach(modelData => {
                            const modelLabel = modelData["Модель"];
                            const modificationLabel = modelData["Модификация"];

                            const li = document.createElement('li');
                            li.id = `${modelLabel}-${modificationLabel}`.toLowerCase();

                            const modelP = document.createElement('b');
                            modelP.textContent = modelLabel;

                            const modificationP = document.createElement('p');
                            modificationP.textContent = modificationLabel;

                            li.appendChild(modelP);
                            li.appendChild(modificationP);

                            li.addEventListener('click', function () {
                                var parentDropdown = this.closest('.dropdown');
                                parentDropdown.querySelector('span').textContent = `${modelLabel}`;

                                // Display additional details
                                displayAdditionalDetails(modelData);

                                parentDropdown.querySelector('input').setAttribute('value', this.id);
                            });

                            modelList.appendChild(li);
                        });
                    }
                });

                document.querySelector('.dropdown-menu#dataList + input').value = '';
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayAdditionalDetails(modelData) {
        const additionalDetailsElement = document.getElementById('additionalDetails');
        additionalDetailsElement.innerHTML = '';
        for (const [key, value] of Object.entries(modelData)) {
            const detailP = document.createElement('p');
            detailP.textContent = `${key}: ${value}`;
            additionalDetailsElement.appendChild(detailP);
        }
    }

    fetch('result.json')
        .then(response => response.json())
        .then(data => {
            const uniqueBrands = {};

            data.forEach(carData => {
                const brand = carData["Марка"];
                uniqueBrands[brand] = true;
            });

            const brandList = document.getElementById('brandList');

            Object.keys(uniqueBrands).forEach(brand => {
                const li = document.createElement('li');
                li.id = brand;
                li.textContent = brand;
                li.addEventListener('click', function () {
                    var parentDropdown = this.closest('.dropdown');
                    parentDropdown.querySelector('span').textContent = this.textContent;
                    parentDropdown.querySelector('input').setAttribute('value', this.id);

                    updateModelDropdown(this.id);
                });

                brandList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});




