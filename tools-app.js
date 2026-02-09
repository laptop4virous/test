// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('themeBtn').textContent = newTheme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('themeBtn').textContent = savedTheme === 'light' ? '☀️' : '🌙';

// Modal Functions
function openTool(toolName) {
    const modal = document.getElementById('toolModal');
    const content = document.getElementById('toolContent');
    
    modal.classList.add('active');
    content.innerHTML = getToolContent(toolName);
    
    // Initialize tool-specific functionality
    if (toolName === 'quran') initQuran();
    if (toolName === 'prayer') initPrayer();
    if (toolName === 'speedTest') initSpeedTest();
}

function closeModal() {
    document.getElementById('toolModal').classList.remove('active');
}

// Get Tool Content
function getToolContent(toolName) {
    const tools = {
        age: getAgeCalculator(),
        dateDiff: getDateDiff(),
        personality: getPersonalityTest(),
        zodiac: getZodiacCalculator(),
        pregnancy: getPregnancyCalculator(),
        childStage: getChildStage(),
        speedTest: getSpeedTest(),
        weather: getWeather(),
        prayer: getPrayerTimes(),
        quran: getQuran(),
        bmi: getBMICalculator(),
        currency: getCurrencyConverter(),
        password: getPasswordGenerator(),
        percentage: getPercentageCalculator()
    };
    
    return tools[toolName] || '<p>الأداة قيد التطوير...</p>';
}

// 1. Age Calculator
function getAgeCalculator() {
    return `
        <h2>🎂 حاسبة العمر</h2>
        <div class="input-group">
            <label>تاريخ الميلاد:</label>
            <input type="date" id="birthDate" max="${new Date().toISOString().split('T')[0]}">
        </div>
        <button class="btn" onclick="calculateAge()">احسب العمر</button>
        <div id="ageResult"></div>
    `;
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const today = new Date();
    
    if (!birthDate || isNaN(birthDate)) {
        alert('الرجاء إدخال تاريخ ميلاد صحيح');
        return;
    }
    
    const diff = today - birthDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    document.getElementById('ageResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">العمر بالسنوات:</span>
                <span class="result-value">${years} سنة و ${months} شهر</span>
            </div>
            <div class="result-item">
                <span class="result-label">العمر بالأشهر:</span>
                <span class="result-value">${years * 12 + months} شهر</span>
            </div>
            <div class="result-item">
                <span class="result-label">العمر بالأسابيع:</span>
                <span class="result-value">${weeks} أسبوع</span>
            </div>
            <div class="result-item">
                <span class="result-label">العمر بالأيام:</span>
                <span class="result-value">${days} يوم</span>
            </div>
            <div class="result-item">
                <span class="result-label">العمر بالساعات:</span>
                <span class="result-value">${hours.toLocaleString()} ساعة</span>
            </div>
        </div>
    `;
}

// 2. Date Difference
function getDateDiff() {
    return `
        <h2>📅 حساب الفرق بين تاريخين</h2>
        <div class="input-group">
            <label>التاريخ الأول:</label>
            <input type="date" id="date1">
        </div>
        <div class="input-group">
            <label>التاريخ الثاني:</label>
            <input type="date" id="date2">
        </div>
        <button class="btn" onclick="calculateDateDiff()">احسب الفرق</button>
        <div id="dateDiffResult"></div>
    `;
}

function calculateDateDiff() {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);
    
    if (!date1 || !date2 || isNaN(date1) || isNaN(date2)) {
        alert('الرجاء إدخال تاريخين صحيحين');
        return;
    }
    
    const diff = Math.abs(date2 - date1);
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    document.getElementById('dateDiffResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">الفرق:</span>
                <span class="result-value">${years} سنة و ${months} شهر</span>
            </div>
            <div class="result-item">
                <span class="result-label">بالأيام:</span>
                <span class="result-value">${days} يوم</span>
            </div>
        </div>
    `;
}

// 3. Personality Test
function getPersonalityTest() {
    return `
        <h2>🧠 محلل الشخصية</h2>
        <p style="margin-bottom: 20px;">أجب على الأسئلة التالية لتحليل شخصيتك:</p>
        
        <div class="input-group">
            <label>1. كم مرة تشعر بالطاقة في اليوم؟</label>
            <select id="q1">
                <option value="5">دائماً</option>
                <option value="4">غالباً</option>
                <option value="3">أحياناً</option>
                <option value="2">نادراً</option>
                <option value="1">أبداً</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>2. هل تفضل العمل الجماعي أم الفردي؟</label>
            <select id="q2">
                <option value="5">جماعي جداً</option>
                <option value="4">جماعي</option>
                <option value="3">متوسط</option>
                <option value="2">فردي</option>
                <option value="1">فردي جداً</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>3. كم مرة تتخذ قرارات سريعة؟</label>
            <select id="q3">
                <option value="5">دائماً</option>
                <option value="4">غالباً</option>
                <option value="3">أحياناً</option>
                <option value="2">نادراً</option>
                <option value="1">أبداً</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>4. مدى اهتمامك بالتفاصيل:</label>
            <select id="q4">
                <option value="5">كبير جداً</option>
                <option value="4">كبير</option>
                <option value="3">متوسط</option>
                <option value="2">قليل</option>
                <option value="1">قليل جداً</option>
            </select>
        </div>
        
        <div class="input-group">
            <label>5. مدى انفتاحك على التجارب الجديدة:</label>
            <select id="q5">
                <option value="5">كبير جداً</option>
                <option value="4">كبير</option>
                <option value="3">متوسط</option>
                <option value="2">قليل</option>
                <option value="1">قليل جداً</option>
            </select>
        </div>
        
        <button class="btn" onclick="analyzePersonality()">تحليل الشخصية</button>
        <div id="personalityResult"></div>
    `;
}

function analyzePersonality() {
    const q1 = parseInt(document.getElementById('q1').value);
    const q2 = parseInt(document.getElementById('q2').value);
    const q3 = parseInt(document.getElementById('q3').value);
    const q4 = parseInt(document.getElementById('q4').value);
    const q5 = parseInt(document.getElementById('q5').value);
    
    const energy = (q1 * 20);
    const social = (q2 * 20);
    const decisiveness = (q3 * 20);
    const attention = (q4 * 20);
    const openness = (q5 * 20);
    
    let type = '';
    if (energy >= 70 && social >= 70) type = 'شخصية قيادية واجتماعية';
    else if (energy >= 70 && social < 50) type = 'شخصية مستقلة ونشطة';
    else if (social >= 70) type = 'شخصية اجتماعية ودودة';
    else if (attention >= 70) type = 'شخصية دقيقة ومنظمة';
    else if (openness >= 70) type = 'شخصية مغامرة ومبدعة';
    else type = 'شخصية متوازنة';
    
    document.getElementById('personalityResult').innerHTML = `
        <div class="personality-result">
            <h3 style="text-align: center; color: var(--accent-light); margin-bottom: 20px;">تحليل شخصيتك: ${type}</h3>
            
            <div class="personality-trait">
                <div class="trait-label">مستوى الطاقة</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${energy}%">${energy}%</div>
                </div>
            </div>
            
            <div class="personality-trait">
                <div class="trait-label">الميول الاجتماعية</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${social}%">${social}%</div>
                </div>
            </div>
            
            <div class="personality-trait">
                <div class="trait-label">سرعة اتخاذ القرار</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${decisiveness}%">${decisiveness}%</div>
                </div>
            </div>
            
            <div class="personality-trait">
                <div class="trait-label">الاهتمام بالتفاصيل</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${attention}%">${attention}%</div>
                </div>
            </div>
            
            <div class="personality-trait">
                <div class="trait-label">الانفتاح على التجارب</div>
                <div class="trait-bar">
                    <div class="trait-fill" style="width: ${openness}%">${openness}%</div>
                </div>
            </div>
        </div>
    `;
}

// 4. Zodiac Calculator
function getZodiacCalculator() {
    return `
        <h2>♈ معرفة البرج</h2>
        <div class="input-group">
            <label>تاريخ الميلاد:</label>
            <input type="date" id="zodiacDate">
        </div>
        <button class="btn" onclick="calculateZodiac()">اعرف برجك</button>
        <div id="zodiacResult"></div>
    `;
}

function calculateZodiac() {
    const date = new Date(document.getElementById('zodiacDate').value);
    if (!date || isNaN(date)) {
        alert('الرجاء إدخال تاريخ صحيح');
        return;
    }
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Western Zodiac
    let zodiac = '';
    let zodiacIcon = '';
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) { zodiac = 'الحمل'; zodiacIcon = '♈'; }
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) { zodiac = 'الثور'; zodiacIcon = '♉'; }
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) { zodiac = 'الجوزاء'; zodiacIcon = '♊'; }
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) { zodiac = 'السرطان'; zodiacIcon = '♋'; }
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) { zodiac = 'الأسد'; zodiacIcon = '♌'; }
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) { zodiac = 'العذراء'; zodiacIcon = '♍'; }
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) { zodiac = 'الميزان'; zodiacIcon = '♎'; }
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) { zodiac = 'العقرب'; zodiacIcon = '♏'; }
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) { zodiac = 'القوس'; zodiacIcon = '♐'; }
    else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) { zodiac = 'الجدي'; zodiacIcon = '♑'; }
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) { zodiac = 'الدلو'; zodiacIcon = '♒'; }
    else { zodiac = 'الحوت'; zodiacIcon = '♓'; }
    
    // Chinese Zodiac
    const chineseZodiacs = ['القرد', 'الديك', 'الكلب', 'الخنزير', 'الفأر', 'الثور', 'النمر', 'الأرنب', 'التنين', 'الأفعى', 'الحصان', 'الماعز'];
    const chineseZodiac = chineseZodiacs[year % 12];
    
    document.getElementById('zodiacResult').innerHTML = `
        <div class="zodiac-card">
            <div class="zodiac-icon">${zodiacIcon}</div>
            <h3>برجك الفلكي</h3>
            <h2>${zodiac}</h2>
        </div>
        <div class="zodiac-card" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
            <div class="zodiac-icon">🐉</div>
            <h3>برجك الصيني</h3>
            <h2>${chineseZodiac}</h2>
        </div>
    `;
}

// 5. Pregnancy Calculator
function getPregnancyCalculator() {
    return `
        <h2>👶 حاسبة الحمل</h2>
        <div class="input-group">
            <label>تاريخ آخر دورة شهرية:</label>
            <input type="date" id="lmpDate" max="${new Date().toISOString().split('T')[0]}">
        </div>
        <button class="btn" onclick="calculatePregnancy()">احسب موعد الولادة</button>
        <div id="pregnancyResult"></div>
    `;
}

function calculatePregnancy() {
    const lmpDate = new Date(document.getElementById('lmpDate').value);
    if (!lmpDate || isNaN(lmpDate)) {
        alert('الرجاء إدخال تاريخ صحيح');
        return;
    }
    
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    const today = new Date();
    const weeksPassed = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    const trimester = weeksPassed <= 12 ? 'الأول' : weeksPassed <= 26 ? 'الثاني' : 'الثالث';
    
    document.getElementById('pregnancyResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">موعد الولادة المتوقع:</span>
                <span class="result-value">${dueDate.toLocaleDateString('ar-SA')}</span>
            </div>
            <div class="result-item">
                <span class="result-label">الأسبوع الحالي:</span>
                <span class="result-value">${weeksPassed > 40 ? 'مكتمل' : weeksPassed} أسبوع</span>
            </div>
            <div class="result-item">
                <span class="result-label">الفصل الحالي:</span>
                <span class="result-value">الثلث ${trimester}</span>
            </div>
            <div class="result-item">
                <span class="result-label">الأيام المتبقية:</span>
                <span class="result-value">${Math.max(0, Math.floor((dueDate - today) / (1000 * 60 * 60 * 24)))} يوم</span>
            </div>
        </div>
    `;
}

// 6. Child Stage
function getChildStage() {
    return `
        <h2>🍼 مراحل نمو الطفل</h2>
        <div class="input-group">
            <label>تاريخ ميلاد الطفل:</label>
            <input type="date" id="childDate" max="${new Date().toISOString().split('T')[0]}">
        </div>
        <button class="btn" onclick="calculateChildStage()">معرفة المرحلة</button>
        <div id="childStageResult"></div>
    `;
}

function calculateChildStage() {
    const birthDate = new Date(document.getElementById('childDate').value);
    const today = new Date();
    
    if (!birthDate || isNaN(birthDate)) {
        alert('الرجاء إدخال تاريخ صحيح');
        return;
    }
    
    const months = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(months / 12);
    
    let stage = '';
    let description = '';
    let tips = '';
    
    if (months < 12) {
        stage = 'مرحلة الرضاعة';
        description = 'طفلك في مرحلة النمو السريع والتطور المستمر';
        tips = 'احرص على الرضاعة الطبيعية والنوم الكافي واللقاحات في مواعيدها';
    } else if (years < 3) {
        stage = 'مرحلة الطفولة المبكرة';
        description = 'طفلك يتعلم المشي والكلام واستكشاف العالم';
        tips = 'شجع على الحركة واللعب وتطوير المهارات الحركية';
    } else if (years < 6) {
        stage = 'مرحلة ما قبل المدرسة';
        description = 'طفلك يطور مهارات اجتماعية وإبداعية';
        tips = 'اللعب الجماعي والقصص والأنشطة التعليمية مهمة';
    } else if (years < 12) {
        stage = 'مرحلة الطفولة المتوسطة';
        description = 'طفلك في مرحلة التعلم والاستقلالية';
        tips = 'دعم التعليم والهوايات والصداقات';
    } else {
        stage = 'مرحلة المراهقة';
        description = 'مرحلة التحولات الجسدية والنفسية';
        tips = 'التواصل المفتوح والدعم العاطفي والاستقلالية المسؤولة';
    }
    
    document.getElementById('childStageResult').innerHTML = `
        <div class="result-box">
            <h3 style="text-align: center; color: var(--accent-light); margin-bottom: 15px;">${stage}</h3>
            <div class="result-item">
                <span class="result-label">العمر:</span>
                <span class="result-value">${years} سنة و ${months % 12} شهر</span>
            </div>
            <div style="margin-top: 15px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-radius: 10px;">
                <p style="margin-bottom: 10px;"><strong>الوصف:</strong> ${description}</p>
                <p><strong>نصائح:</strong> ${tips}</p>
            </div>
        </div>
    `;
}

// 7. Speed Test
function getSpeedTest() {
    return `
        <h2>📡 اختبار سرعة الإنترنت</h2>
        <div style="text-align: center;">
            <div class="speed-gauge" id="speedGauge">0 Mbps</div>
            <button class="btn" onclick="runSpeedTest()">ابدأ الاختبار</button>
            <div id="speedResult"></div>
        </div>
    `;
}

let speedTestRunning = false;

function initSpeedTest() {
    speedTestRunning = false;
}

async function runSpeedTest() {
    if (speedTestRunning) return;
    
    speedTestRunning = true;
    const gauge = document.getElementById('speedGauge');
    const result = document.getElementById('speedResult');
    
    gauge.textContent = 'جاري الاختبار...';
    result.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    // Simulate speed test
    const startTime = Date.now();
    const imageAddr = "https://via.placeholder.com/1000x1000.jpg?" + Math.random();
    const downloadSize = 1000000; // 1MB
    
    try {
        const response = await fetch(imageAddr);
        const blob = await response.blob();
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const bitsLoaded = downloadSize * 8;
        const speedBps = bitsLoaded / duration;
        const speedMbps = (speedBps / (1024 * 1024)).toFixed(2);
        
        gauge.textContent = speedMbps + ' Mbps';
        
        let quality = '';
        if (speedMbps < 1) quality = 'بطيئة';
        else if (speedMbps < 5) quality = 'متوسطة';
        else if (speedMbps < 25) quality = 'جيدة';
        else quality = 'ممتازة';
        
        result.innerHTML = `
            <div class="result-box" style="margin-top: 20px;">
                <div class="result-item">
                    <span class="result-label">سرعة التحميل:</span>
                    <span class="result-value">${speedMbps} Mbps</span>
                </div>
                <div class="result-item">
                    <span class="result-label">التقييم:</span>
                    <span class="result-value">${quality}</span>
                </div>
            </div>
        `;
    } catch (error) {
        gauge.textContent = 'فشل الاختبار';
        result.innerHTML = '<p style="color: var(--danger); margin-top: 20px;">حدث خطأ في الاتصال. حاول مرة أخرى.</p>';
    }
    
    speedTestRunning = false;
}

// 8. Weather
function getWeather() {
    return `
        <h2>🌤️ حالة الطقس</h2>
        <div class="input-group">
            <label>المدينة:</label>
            <input type="text" id="cityName" placeholder="مثال: دمشق، بيروت، عمان">
        </div>
        <button class="btn" onclick="getWeatherData()">عرض الطقس</button>
        <div id="weatherResult"></div>
    `;
}

async function getWeatherData() {
    const city = document.getElementById('cityName').value;
    if (!city) {
        alert('الرجاء إدخال اسم المدينة');
        return;
    }
    
    const result = document.getElementById('weatherResult');
    result.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        // Get coordinates from city name
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            result.innerHTML = '<p style="color: var(--danger);">المدينة غير موجودة</p>';
            return;
        }
        
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        
        // Get weather
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`);
        const weather = await weatherResponse.json();
        
        const temp = Math.round(weather.current.temperature_2m);
        const humidity = weather.current.relative_humidity_2m;
        const windSpeed = Math.round(weather.current.wind_speed_10m);
        
        const weatherIcons = {
            0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
            45: '🌫️', 48: '🌫️',
            51: '🌦️', 61: '🌧️', 80: '🌦️',
            95: '⛈️'
        };
        
        const icon = weatherIcons[weather.current.weather_code] || '🌤️';
        
        result.innerHTML = `
            <div class="weather-card">
                <div class="weather-icon">${icon}</div>
                <h2>${city}</h2>
                <div class="weather-temp">${temp}°C</div>
                <div style="margin-top: 20px;">
                    <p>💧 الرطوبة: ${humidity}%</p>
                    <p>💨 سرعة الرياح: ${windSpeed} كم/س</p>
                </div>
            </div>
        `;
    } catch (error) {
        result.innerHTML = '<p style="color: var(--danger);">حدث خطأ في جلب البيانات</p>';
    }
}

// 9. Prayer Times
function getPrayerTimes() {
    return `
        <h2>🕌 مواقيت الصلاة</h2>
        <div class="input-group">
            <label>المدينة:</label>
            <input type="text" id="prayerCity" placeholder="مثال: دمشق، بيروت، عمان">
        </div>
        <button class="btn" onclick="getPrayerData()">عرض المواقيت</button>
        <button class="btn" onclick="getPrayerByGPS()" style="background: var(--success);">📍 استخدم موقعي</button>
        <div id="prayerResult"></div>
    `;
}

function initPrayer() {
    // Can be used for initialization if needed
}

async function getPrayerByGPS() {
    if (navigator.geolocation) {
        document.getElementById('prayerResult').innerHTML = '<div class="loading"><div class="spinner"></div><p>جاري تحديد موقعك...</p></div>';
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                await fetchPrayerTimes(lat, lon);
            },
            (error) => {
                document.getElementById('prayerResult').innerHTML = '<p style="color: var(--danger);">فشل الوصول إلى الموقع. استخدم خيار المدينة.</p>';
            }
        );
    } else {
        alert('المتصفح لا يدعم تحديد الموقع');
    }
}

async function getPrayerData() {
    const city = document.getElementById('prayerCity').value;
    if (!city) {
        alert('الرجاء إدخال اسم المدينة');
        return;
    }
    
    document.getElementById('prayerResult').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`);
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            document.getElementById('prayerResult').innerHTML = '<p style="color: var(--danger);">المدينة غير موجودة</p>';
            return;
        }
        
        const lat = geoData[0].lat;
        const lon = geoData[0].lon;
        
        await fetchPrayerTimes(lat, lon, city);
    } catch (error) {
        document.getElementById('prayerResult').innerHTML = '<p style="color: var(--danger);">حدث خطأ في جلب البيانات</p>';
    }
}

async function fetchPrayerTimes(lat, lon, cityName = 'موقعك') {
    try {
        const date = new Date();
        const timestamp = Math.floor(date.getTime() / 1000);
        
        const response = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`);
        const data = await response.json();
        
        if (data.code !== 200) {
            throw new Error('Failed to fetch prayer times');
        }
        
        const timings = data.data.timings;
        
        document.getElementById('prayerResult').innerHTML = `
            <h3 style="text-align: center; margin: 20px 0;">مواقيت الصلاة - ${cityName}</h3>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 20px;">${data.data.date.readable}</p>
            <div class="prayer-times">
                <div class="prayer-card">
                    <div class="prayer-name">الفجر</div>
                    <div class="prayer-time">${timings.Fajr}</div>
                </div>
                <div class="prayer-card">
                    <div class="prayer-name">الشروق</div>
                    <div class="prayer-time">${timings.Sunrise}</div>
                </div>
                <div class="prayer-card">
                    <div class="prayer-name">الظهر</div>
                    <div class="prayer-time">${timings.Dhuhr}</div>
                </div>
                <div class="prayer-card">
                    <div class="prayer-name">العصر</div>
                    <div class="prayer-time">${timings.Asr}</div>
                </div>
                <div class="prayer-card">
                    <div class="prayer-name">المغرب</div>
                    <div class="prayer-time">${timings.Maghrib}</div>
                </div>
                <div class="prayer-card">
                    <div class="prayer-name">العشاء</div>
                    <div class="prayer-time">${timings.Isha}</div>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('prayerResult').innerHTML = '<p style="color: var(--danger);">حدث خطأ في جلب مواقيت الصلاة</p>';
    }
}

// 10. Quran
function getQuran() {
    return `
        <h2>📖 القرآن الكريم</h2>
        <div id="quranSelector"></div>
        <div id="quranReader" class="quran-container"></div>
    `;
}

const surahs = [
    { number: 1, name: 'الفاتحة', ayahs: 7 },
    { number: 2, name: 'البقرة', ayahs: 286 },
    { number: 3, name: 'آل عمران', ayahs: 200 },
    { number: 4, name: 'النساء', ayahs: 176 },
    { number: 5, name: 'المائدة', ayahs: 120 },
    { number: 6, name: 'الأنعام', ayahs: 165 },
    { number: 7, name: 'الأعراف', ayahs: 206 },
    { number: 8, name: 'الأنفال', ayahs: 75 },
    { number: 9, name: 'التوبة', ayahs: 129 },
    { number: 10, name: 'يونس', ayahs: 109 }
    // Add more surahs as needed
];

function initQuran() {
    const selector = document.getElementById('quranSelector');
    selector.innerHTML = `
        <div class="surah-selector">
            ${surahs.map(s => `
                <button class="surah-btn" onclick="loadSurah(${s.number})">${s.number}. ${s.name}</button>
            `).join('')}
        </div>
    `;
    loadSurah(1);
}

async function loadSurah(surahNumber) {
    const reader = document.getElementById('quranReader');
    reader.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const data = await response.json();
        
        if (data.code !== 200) {
            throw new Error('Failed to load surah');
        }
        
        const ayahs = data.data.ayahs;
        
        reader.innerHTML = `
            <h3 style="text-align: center; margin: 20px 0; color: var(--accent-light);">
                سورة ${data.data.name} - ${data.data.englishName}
            </h3>
            ${ayahs.map(ayah => `
                <div class="ayah">
                    ${ayah.text} <span class="highlight">${ayah.numberInSurah}</span>
                </div>
            `).join('')}
        `;
    } catch (error) {
        reader.innerHTML = '<p style="color: var(--danger); text-align: center;">حدث خطأ في تحميل السورة</p>';
    }
}

// Additional Tools

function getBMICalculator() {
    return `
        <h2>⚖️ حاسبة كتلة الجسم (BMI)</h2>
        <div class="input-group">
            <label>الوزن (كجم):</label>
            <input type="number" id="weight" min="1" step="0.1">
        </div>
        <div class="input-group">
            <label>الطول (سم):</label>
            <input type="number" id="height" min="1" step="0.1">
        </div>
        <button class="btn" onclick="calculateBMI()">احسب BMI</button>
        <div id="bmiResult"></div>
    `;
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('الرجاء إدخال قيم صحيحة');
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    
    let category = '';
    let color = '';
    
    if (bmi < 18.5) { category = 'نحيف'; color = 'var(--warning)'; }
    else if (bmi < 25) { category = 'وزن طبيعي'; color = 'var(--success)'; }
    else if (bmi < 30) { category = 'وزن زائد'; color = 'var(--warning)'; }
    else { category = 'سمنة'; color = 'var(--danger)'; }
    
    document.getElementById('bmiResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">مؤشر كتلة الجسم:</span>
                <span class="result-value" style="color: ${color}">${bmi}</span>
            </div>
            <div class="result-item">
                <span class="result-label">التصنيف:</span>
                <span class="result-value" style="color: ${color}">${category}</span>
            </div>
        </div>
    `;
}

function getCurrencyConverter() {
    return `
        <h2>💱 محول العملات</h2>
        <div class="input-group">
            <label>المبلغ:</label>
            <input type="number" id="amount" min="0" step="0.01" value="1">
        </div>
        <div class="input-group">
            <label>من:</label>
            <select id="fromCurrency">
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="EUR">يورو (EUR)</option>
                <option value="GBP">جنيه إسترليني (GBP)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
            </select>
        </div>
        <div class="input-group">
            <label>إلى:</label>
            <select id="toCurrency">
                <option value="EUR">يورو (EUR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="GBP">جنيه إسترليني (GBP)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
                <option value="AED">درهم إماراتي (AED)</option>
            </select>
        </div>
        <button class="btn" onclick="convertCurrency()">تحويل</button>
        <div id="currencyResult"></div>
    `;
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    
    if (!amount || amount <= 0) {
        alert('الرجاء إدخال مبلغ صحيح');
        return;
    }
    
    document.getElementById('currencyResult').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        
        const rate = data.rates[to];
        const result = (amount * rate).toFixed(2);
        
        document.getElementById('currencyResult').innerHTML = `
            <div class="result-box">
                <div class="result-item">
                    <span class="result-label">${amount} ${from} =</span>
                    <span class="result-value">${result} ${to}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">سعر الصرف:</span>
                    <span class="result-value">1 ${from} = ${rate.toFixed(4)} ${to}</span>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById('currencyResult').innerHTML = '<p style="color: var(--danger);">حدث خطأ في جلب أسعار العملات</p>';
    }
}

function getPasswordGenerator() {
    return `
        <h2>🔐 مولد كلمات المرور</h2>
        <div class="input-group">
            <label>طول كلمة المرور:</label>
            <input type="number" id="passLength" min="6" max="50" value="12">
        </div>
        <div class="input-group">
            <label>
                <input type="checkbox" id="includeUpper" checked> أحرف كبيرة (A-Z)
            </label>
        </div>
        <div class="input-group">
            <label>
                <input type="checkbox" id="includeLower" checked> أحرف صغيرة (a-z)
            </label>
        </div>
        <div class="input-group">
            <label>
                <input type="checkbox" id="includeNumbers" checked> أرقام (0-9)
            </label>
        </div>
        <div class="input-group">
            <label>
                <input type="checkbox" id="includeSymbols" checked> رموز (!@#$%)
            </label>
        </div>
        <button class="btn" onclick="generatePassword()">توليد كلمة مرور</button>
        <div id="passwordResult"></div>
    `;
}

function generatePassword() {
    const length = parseInt(document.getElementById('passLength').value);
    const useUpper = document.getElementById('includeUpper').checked;
    const useLower = document.getElementById('includeLower').checked;
    const useNumbers = document.getElementById('includeNumbers').checked;
    const useSymbols = document.getElementById('includeSymbols').checked;
    
    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
        alert('اختر نوع حرف واحد على الأقل');
        return;
    }
    
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('passwordResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">كلمة المرور:</span>
                <span class="result-value" style="font-family: monospace; font-size: 1.3rem;">${password}</span>
            </div>
            <button class="btn" onclick="copyPassword('${password}')">📋 نسخ</button>
        </div>
    `;
}

function copyPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('✅ تم نسخ كلمة المرور');
    });
}

function getPercentageCalculator() {
    return `
        <h2>📊 حاسبة النسبة المئوية</h2>
        <div class="input-group">
            <label>كم تساوي</label>
            <input type="number" id="percent" min="0" step="0.01" placeholder="النسبة المئوية">
        </div>
        <div class="input-group">
            <label>% من</label>
            <input type="number" id="totalValue" min="0" step="0.01" placeholder="القيمة الكلية">
        </div>
        <button class="btn" onclick="calculatePercentage()">احسب</button>
        <div id="percentResult"></div>
    `;
}

function calculatePercentage() {
    const percent = parseFloat(document.getElementById('percent').value);
    const total = parseFloat(document.getElementById('totalValue').value);
    
    if (!percent || !total || percent < 0 || total < 0) {
        alert('الرجاء إدخال قيم صحيحة');
        return;
    }
    
    const result = (percent / 100) * total;
    
    document.getElementById('percentResult').innerHTML = `
        <div class="result-box">
            <div class="result-item">
                <span class="result-label">${percent}% من ${total} =</span>
                <span class="result-value">${result.toFixed(2)}</span>
            </div>
        </div>
    `;
}
