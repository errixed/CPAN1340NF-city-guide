document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eventForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const eventSelect = document.getElementById('event');
    const eventDateInput = document.getElementById('eventDate');
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const eventError = document.getElementById('eventError');
    const eventDateError = document.getElementById('eventDateError');
    const attendanceError = document.getElementById('attendanceError');

    const weatherBox = document.getElementById('weatherBox');
    const forecastBody = document.getElementById('forecastBody');

    const FORECAST_URL =
        'https://api.open-meteo.com/v1/forecast?latitude=43.6532&longitude=-79.3832&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=America%2FToronto';

    let dailyForecast = null;

    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        eventError.textContent = '';
        eventDateError.textContent = '';
        attendanceError.textContent = '';
    }

    function setError(element, message) {
        element.textContent = message;
    }

    function validateForm() {
        clearErrors();
        let isValid = true;

        if (!nameInput.value.trim()) {
            setError(nameError, 'Name is required.');
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            setError(emailError, 'Email is required.');
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailValue)) {
                setError(emailError, 'Email format is wrong.');
                isValid = false;
            }
        }

        if (!eventSelect.value) {
            setError(eventError, 'Please select an event.');
            isValid = false;
        }

        if (!eventDateInput.value) {
            setError(eventDateError, 'Event date is required.');
            isValid = false;
        }

        let attendanceSelected = false;
        attendanceRadios.forEach(radio => {
            if (radio.checked) {
                attendanceSelected = true;
            }
        });
        if (!attendanceSelected) {
            setError(attendanceError, 'Please choose an attendance type.');
            isValid = false;
        }

        return isValid;
    }

    function updateForecastTableError(message) {
        if (!forecastBody) return;
        forecastBody.innerHTML = `<tr><td colspan="4">${message}</td></tr>`;
    }

    // https://open-meteo.com/en/docs
    function mapWeatherCode(code) {
        if (code === 0) return 'Clear sky';
        if (code === 1 || code === 2 || code === 3) return 'Partly cloudy';
        if (code === 45 || code === 48) return 'Foggy';
        if (code === 51 || code === 53 || code === 55) return 'Drizzle';
        if (code === 56 || code === 57) return 'Freezing drizzle';
        if (code === 61 || code === 63 || code === 65) return 'Rain';
        if (code === 66 || code === 67) return 'Freezing rain';
        if (code === 71 || code === 73 || code === 75) return 'Snowfall';
        if (code === 77) return 'Snow grains';
        if (code === 80 || code === 81 || code === 82) return 'Rain showers';
        if (code === 85 || code === 86) return 'Snow showers';
        if (code === 95) return 'Thunderstorm';
        if (code === 96 || code === 99) return 'Thunderstorm with hail';
        return 'Unknown';
    }

    // https://open-meteo.com/en/docs
    function renderForecastTable(daily) {
        if (!forecastBody) return;

        if (!daily || !daily.time || daily.time.length === 0) {
            updateForecastTableError('No forecast data available.');
            return;
        }

        let rowsHtml = '';
        const count = Math.min(daily.time.length, 5);

        for (let i = 0; i < count; i++) {
            const date = daily.time[i];
            const tMax = Math.round(daily.temperature_2m_max[i]);
            const tMin = Math.round(daily.temperature_2m_min[i]);
            const code = daily.weathercode[i];
            const condition = mapWeatherCode(code);

            rowsHtml += `
                <tr>
                    <td>${date}</td>
                    <td>All day</td>
                    <td>${tMax} / ${tMin}</td>
                    <td>${condition}</td>
                </tr>
            `;
        }

        forecastBody.innerHTML = rowsHtml;
    }

    function fetchForecast() {
        fetch(FORECAST_URL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                dailyForecast = data.daily;
                renderForecastTable(dailyForecast);
                updateWeatherBox();
            })
            .catch(error => {
                console.error('Error fetching forecast:', error);
                updateForecastTableError('Unable to load forecast right now.');
            });
    }

    function updateWeatherBox() {
        if (!weatherBox) return;

        const dateValue = eventDateInput.value;

        if (!dateValue) {
            weatherBox.innerHTML = `
                <p class="weather-placeholder">
                    Select an event date to see the forecast for Toronto.
                </p>
            `;
            return;
        }

        if (!dailyForecast || !dailyForecast.time || dailyForecast.time.length === 0) {
            weatherBox.innerHTML = `
                <p class="weather-placeholder">
                    Weather forecast available for upcoming days only.
                </p>
            `;
            return;
        }

        const idx = dailyForecast.time.indexOf(dateValue);

        if (idx === -1) {
            weatherBox.innerHTML = `
                <p class="weather-placeholder">
                    Weather forecast available for upcoming days only.
                </p>
            `;
            return;
        }

        const tMax = Math.round(dailyForecast.temperature_2m_max[idx]);
        const tMin = Math.round(dailyForecast.temperature_2m_min[idx]);
        const code = dailyForecast.weathercode[idx];
        const condition = mapWeatherCode(code);

        weatherBox.innerHTML = `
            <strong>${dateValue}</strong>
            <p>High: ${tMax}&deg;C</p>
            <p>Low: ${tMin}&deg;C</p>
            <p>Condition: ${condition}</p>
        `;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            alert('Thank you for registering! We will email you event details.');
            form.reset();
            clearErrors();
            updateWeatherBox();
        }
    });

    eventDateInput.addEventListener('change', () => {
        updateWeatherBox();
    });

    fetchForecast();
});
