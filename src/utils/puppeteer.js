import puppeteer from "puppeteer";
function getCookie(){
(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://sso.suat-sz.edu.cn/gravity-login/#/');

    console.log('页面已打开，请手动登录...');

    // 获取cookie
    const cookies = await page.cookies();
    console.log('Cookies:', cookies);

    console.log('按 Ctrl+C 关闭浏览器');
})();
return cookies;
}
