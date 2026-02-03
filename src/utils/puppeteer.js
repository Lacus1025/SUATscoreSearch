import puppeteer from "puppeteer";

export async function getCookie() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://sso.suat-sz.edu.cn/gravity-login/#/');

    console.log('页面已打开，请手动登录...');
    console.log('登录完成后，按任意键继续...');

    // 等待用户按下任意键
    await new Promise(resolve => {
        process.stdin.once('data', resolve);
    });

    // 获取cookie
    const cookies = await page.cookies();
    await browser.close();

    return cookies;
}

// 使用示例
async function main() {
    try {
        const cookies = await getCookie();
        console.log('Cookies:', cookies);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
