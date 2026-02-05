import puppeteer from "puppeteer";
// import readline from 'readline';

async function browserInit() {
     const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    return browser;
}

async function  verifyPic(browser,timestamp,fileurl) {
    const page = await browser.newPage();
    await page.goto('https://sso.suat-sz.edu.cn/gravity-login/#/?state=SUAT&redirect_url=https%3A%2F%2Feducation.suat-sz.edu.cn%2Fauth-blank&app_id=1937055724117909505&use_new_code_name=false');
    console.log('页面已打开，请手动登录...');

    await page.waitForSelector(' #pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large > div > div:nth-child(2) > img');

    await page.screenshot({
        'path':`${fileurl}/page-${timestamp}.png`,
        'clip':{
            'x':400,
            'y':300,
            'height':50,
            'width':200
        }
    });

    return page;
}

async function typeInfo (page,param){
    //userID,password,veriCode

    await page.bringToFront();

    await page.waitForSelector('input[type="text"][autocomplete="off"][placeholder="请输入学号/工号"]');
    await page.type('input[type="text"][autocomplete="off"][placeholder="请输入学号/工号"]', param.userID,{delay:50});
    await page.type('input[type="password"][autocomplete="off"][placeholder="密码"]',param.password,{delay:50});
    await page.type('#pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large > div > div:nth-child(1) > div > div > div > input',param.veriCode,{delay:50});

    await page.click('span[class="el-checkbox__inner"]')

    await page.click('button[type="button"][class="el-button el-button--primary el-button--large"]');
    console.log('信息已输入，正在登录...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {
        console.warn('登录页面未跳转，可能登录失败');
      });
}

async function getScore(page) {
    await page.waitForSelector('#app');
    await page.goto('https://education.suat-sz.edu.cn/teaching/viewGrades');
    await page.waitForSelector('#app');

    await page.waitForSelector('button[type="button"][class="el-button el-button--primary el-button--small"]');
    await page.click('button[type="button"][class="el-button el-button--primary el-button--small"]');

    return new Promise((resolve) => {
        page.on('response', async response => {
            if (response.url().includes('api/biz/sdmgt/_score/studentSearchScore/')) {
                const json = await response.json();
                resolve(json.data.list); // 拿到数据后立即返回
            }
        });
    });
}

export {browserInit,verifyPic,typeInfo,getScore};

//     async function askQuestion(question) {
//         const rl = readline.createInterface({
//             input: process.stdin,
//             output: process.stdout
//         });

//         return new Promise((resolve) => {
//             rl.question(question, (answer) => {
//                 rl.close();
//                 resolve(answer);
//             });
//         });
//     }

// //=========================TEST=============================

// const browser = await browserInit();
// const page = await verifyPic(browser,Date.now());
// askQuestion('请输入验证码: ').then((veriCode)=>{
// typeInfo(page,{usrID:'SUAT25000207',password:'Wuhu114514.',veriCode:veriCode});
// });
// getScore(page);
