const puppeteer = require("puppeteer");

/**
 * メインロジック.
 */
(async () => {
	// Puppeteerの起動.
	const browser = await puppeteer.launch({
		headless: false, // Headlessモードで起動するかどうか.
		slowMo: 50, // 指定のミリ秒スローモーションで実行する.
	});

	// 新しい空のページを開く.
	const page = await browser.newPage();

	// view portの設定.
	await page.setViewport({
		width: 1200,
		height: 800,
	});

	// googleのWebページにアクセス
	await page.goto("http://127.0.0.1:5500/src/html/input.html");

	// 検索窓のテキストボックスに「Puppeteer」を入力
	await page.type("input[name=yourName]", "Puppeteer");

	// 表示確認のためにブラウザを終了させない = 手動でブラウザを終了させる必要がある.
	// await browser.close();
})();
