const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1200, height: 800 });
	console.log("--------------goto");
	await page.goto("https://www.yahoo.co.jp/");
	console.log("--------------click");
	await Promise.all([
		page.waitForNavigation({ waitUntil: "load" }),
		page.click("#tabpanelTopics1 > div ul li:first-child a"),
	]);
	// await page.click("#tabpanelTopics1 > div ul li:first-child a");
	// console.log("--------------wait");
	// await page.waitForNavigation({ waitUntil: "load" });
	console.log("--------------evaluate");
	const digest = await page.evaluate(
		() => document.querySelector("[data-ual-view-type='digest'] p").textContent
	);
	console.log(digest);
	await browser.close();
})();
