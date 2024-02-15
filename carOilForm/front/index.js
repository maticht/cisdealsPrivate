document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        dropdown.addEventListener('click', function () {
            this.classList.toggle('active');
            this.querySelector('.dropdown-menu').classList.toggle('show');
        });

        dropdown.querySelectorAll('.dropdown-menu li').forEach(function (item) {
            item.addEventListener('mousedown', function (event) {
                event.preventDefault();
                var parentDropdown = this.closest('.dropdown');
                parentDropdown.querySelector('span').textContent = this.textContent;
                parentDropdown.querySelector('input').setAttribute('value', this.id);

                if (parentDropdown.id === 'brandList') {
                    clearModelDropdown();
                    clearEngineDropdown();
                    updateModelDropdown(this.id);
                } else if (parentDropdown.id === 'dataList') {
                    clearEngineDropdown();
                    displayAdditionalDetails(this.data, this.id);
                    updateEngineList(this.data);
                } else if (parentDropdown.id === 'engineList') {
                    displayAdditionalDetails(this.data, this.id);
                }

                // Закрываем выпадающий список после выбора элемента
                parentDropdown.classList.remove('active');
                parentDropdown.querySelector('.dropdown-menu').classList.remove('show');
            });
        });
    });

    document.addEventListener('mousedown', function (event) {
        document.querySelectorAll('.dropdown').forEach(function (dropdown) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
                dropdown.querySelector('.dropdown-menu').classList.remove('show');
            }
        });
    });

    function updateModelDropdown(brandId) {
        clearModelDropdown();
        clearEngineDropdown();
        clearAdditionalDetails();
        clearPriceTable();
        fetch('result4.json')
            .then(response => response.json())
            .then(data => {
                const modelList = document.getElementById('dataList');
                modelList.innerHTML = '';

                const uniqueModels = {};

                data.forEach(carData => {
                    if (carData["Марка"].toLowerCase() === brandId.toLowerCase()) {
                        const models = carData["Модели"];
                        models.forEach(modelData => {
                            const modelLabel = modelData["Модель"];
                            const productionYear = modelData["Rok produkcji"];

                            if (modelData["Модификации"] && modelData["Модификации"].length > 0) {
                                if (!uniqueModels[modelLabel]) {
                                    uniqueModels[modelLabel] = {
                                        "Модель": modelLabel,
                                        "Модификации": modelData["Модификации"],
                                        "Rok produkcji": productionYear
                                    };
                                } else {
                                    uniqueModels[modelLabel]["Rok produkcji"] += `, ${productionYear}`;
                                }
                            }
                        });
                    }
                });

                Object.values(uniqueModels).forEach(modelData => {
                    const modelLabel = modelData["Модель"];
                    const productionYear = modelData["Rok produkcji"];

                    const li = document.createElement('li');
                    li.id = `${modelLabel}`.toLowerCase();
                    li.data = modelData;

                    const modelP = document.createElement('b');
                    modelP.textContent = modelLabel;

                    const yearP = document.createElement('p');
                    yearP.textContent = productionYear;
                    yearP.style.color = 'lightgrey'; // Устанавливаем светло-серый цвет

                    li.appendChild(modelP);
                    li.appendChild(yearP);

                    li.addEventListener('click', function () {
                        var parentDropdown = this.closest('.dropdown');
                        parentDropdown.querySelector('span').innerHTML = `${modelLabel}<br><span style="color: lightgrey">${productionYear}</span>`;

                        clearAdditionalDetails();

                        parentDropdown.querySelector('input').setAttribute('value', this.id);

                        updateEngineList(modelData);
                    });

                    modelList.appendChild(li);
                });

                document.querySelector('.dropdown-menu#dataList + input').value = '';
            })
            .catch(error => console.error('Error fetching data:', error));
    }


    function clearModelDropdown() {
        const modelDropdown = document.getElementById('dataListBlock');
        modelDropdown.querySelector('span').textContent = 'Wybierz model';
        modelDropdown.querySelector('input').setAttribute('value', '');
        modelDropdown.classList.remove('active');
        modelDropdown.querySelector('.dropdown-menu').classList.remove('show');
    }

    function clearEngineDropdown() {
        const engineDropdown = document.getElementById('engineListBlock');
        engineDropdown.querySelector('span').textContent = 'Wybierz silnik';
        engineDropdown.querySelector('input').setAttribute('value', '');
        engineDropdown.classList.remove('active');
        engineDropdown.querySelector('.dropdown-menu').classList.remove('show');
    }

    function clearPriceTable() {
        const priceTable = document.getElementById('priceTable');
        const rows = priceTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.cells[2].textContent = '';
            row.cells[3].textContent = '';
        });
    }

    function displayAdditionalDetails(modelData, modelTitle) {
        const additionalDetailsElement = document.getElementById('additionalDetails');
        additionalDetailsElement.innerHTML = '';

        if (modelData) {
            for (const [key, value] of Object.entries(modelData)) {
                if (key !== "Модификация") {
                    const detailP = document.createElement('p');
                    detailP.textContent = `${key}: ${value}`;
                    additionalDetailsElement.appendChild(detailP);

                    if (key === "Objętość oleju") {
                        updateVolumeAndSum(value);
                    }
                }
            }
        }

    }


    function updateVolumeAndSum(volume) {
        const priceTable = document.getElementById('priceTable');
        const rows = priceTable.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const coefficient = parseFloat(row.getAttribute('data-coefficient'));
            const calculatedVolume = parseFloat(volume.replace(',', '.')) || 0;
            const calculatedSum = (calculatedVolume * coefficient) + 123;

            row.cells[2].textContent = calculatedVolume.toFixed(1);
            row.cells[3].textContent = calculatedSum.toFixed(3);
        });

        calculateTotal();
    }

    function calculateTotal() {
        const priceTable = document.getElementById('priceTable');
        const rows = priceTable.querySelectorAll('tbody tr');

        let totalSum = 0;

        rows.forEach(row => {
            totalSum += parseFloat(row.cells[3].textContent);
        });

        document.getElementById('totalSum').textContent = totalSum.toFixed(3);
    }

    function updateEngineList(modelData) {
        clearEngineDropdown();
        clearAdditionalDetails();
        clearPriceTable();

        const engineList = document.getElementById('engineList');
        engineList.innerHTML = '';

        const modifications = modelData["Модификации"];

        modifications.forEach(modificationData => {
            const modificationLabel = modificationData["Модификация"];
            const productionYear = modificationData["Rok produkcji"];

            const li = document.createElement('li');
            li.id = `${modificationLabel}`.toLowerCase();
            li.data = modificationData;

            const modificationP = document.createElement('b');
            modificationP.textContent = modificationLabel;

            const yearP = document.createElement('p');
            yearP.textContent = productionYear;
            yearP.style.color = 'lightgrey';
            li.appendChild(modificationP);
            li.appendChild(yearP);

            li.addEventListener('click', function () {
                var parentDropdown = this.closest('.dropdown');
                parentDropdown.querySelector('span').innerHTML = `${modificationLabel}<br><span style="color: lightgrey">${productionYear}</span>`;
                parentDropdown.querySelector('input').setAttribute('value', modificationLabel);

                displayAdditionalDetails(modificationData);
            });

            engineList.appendChild(li);
        });
    }


    function clearAdditionalDetails() {
        const additionalDetailsElement = document.getElementById('additionalDetails');
        additionalDetailsElement.innerHTML = '';
    }

    fetch('result4.json')
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





