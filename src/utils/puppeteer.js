import puppeteer from "puppeteer";
import readline from 'readline';

    // const captchaSrc = await page.$eval(' #pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large > div > div:nth-child(2) > img', (img) => img.src);
    //Base64 form
    //verify code picture
    async function getVerifyPic(page){
        await page.waitForSelector(' #pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large > div > div:nth-child(2) > img');
        return page.screenshot({
            // 'path':'./page.png',
            'clip':{
                'x':400,
                'y':300,
                'height':50,
                'width':200
            }
        });
    }

    async function typeInfo (page,param){
    await page.type('input[type="text"][autocomplete="off"][placeholder="请输入学号/工号"]', param.usrID,{delay:50});
    await page.type('input[type="password"][autocomplete="off"][placeholder="密码"]',param.password,{delay:50});
    await page.type('#pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large > div > div:nth-child(1) > div > div > div > input',param.veriCode,{delay:50});
    // await page.click('input[type="checkbox"][aria-hidden="false"][class="el-checkbox__original"]');
    await page.click('span[class="el-checkbox__inner"]')
    await page.click('button[type="button"][class="el-button el-button--primary el-button--large"]');
}

    async function askQuestion(question) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
    async function  getScore(page) {
    await page.waitForSelector('button[type="button"][class="el-button el-button--primary el-button--small"]');
    await page.click('button[type="button"][class="el-button el-button--primary el-button--small"]');
    page.on('response', async response => {
    const url = response.url();
    const status = response.status();

    console.log(`响应: ${status} ${url}`);

    if (url.includes('api/biz/sdmgt/_score/studentSearchScore/')) {
        console.log('capture:', url);

        const headers = response.headers();
        console.log('headers:', headers);
            return await response.json();
            // console.log('响应数据:', json);
    }});
}

async function main() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        // await page.goto('https://sso.suat-sz.edu.cn/gravity-login/#/');
        await page.goto('https://sso.suat-sz.edu.cn/gravity-login/#/?state=SUAT&redirect_url=https%3A%2F%2Feducation.suat-sz.edu.cn%2Fauth-blank&app_id=1937055724117909505&use_new_code_name=false');
        console.log('页面已打开，请手动登录...');
        console.log('登录完成后，按任意键继续...');
        var m = {};
        m.password = 'Wuhu114514.';
        m.usrID = 'SUAT25000207'
        getVerifyPic(page);
        m.veriCode = await askQuestion('verify code');
        typeInfo(page,m);
        await page.waitForSelector('#app');
        await page.goto('https://education.suat-sz.edu.cn/teaching/viewGrades');
        await page.waitForSelector('#app');
        getScore(page);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
