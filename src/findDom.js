const puppeteer = require("puppeteer");

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1200, height: 800 });
	await page.goto("https://www.shuwasystem.co.jp/");
	await page.waitForSelector(".listType1 img");
	const newsBlockImages = await page.$$(".listType1 img");

	const getImageSrc = async (imgTag) => {
		const prop = await imgTag.getProperty("src");
		const src = await prop.jsonValue();
		return src;
	};
	const imageSrcPromises = [];
	newsBlockImages.forEach((imgTag) => {
		imageSrcPromises.push(getImageSrc(imgTag));
	});
	const result = await Promise.all(imageSrcPromises);
	console.log(result);
	await browser.close();
})();
