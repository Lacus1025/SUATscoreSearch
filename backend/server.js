import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan'
import {} from './getScore.js';
import puppeteer from "puppeteer";
// import readline from "readline";

// function askQuestion(question) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       rl.close();
//       resolve(answer.trim());
//     });
//   });
// }

async function getVerifyPic(page) {
  const selector =
    "#pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large img";

  await page.waitForSelector(selector, { timeout: 15000 });

  const img = await page.$(selector);
  if (!img) throw new Error("找不到验证码图片");

  await img.screenshot({ path: "./verify.png" });
  console.log("验证码已保存到 verify.png");
}

async function typeInfo(page, param) {
  await page.waitForSelector('input[placeholder="请输入学号/工号"]');
  await page.waitForSelector('input[placeholder="密码"]');

  await page.type('input[placeholder="请输入学号/工号"]', param.usrID, {
    delay: 50,
  });
  await page.type('input[placeholder="密码"]', param.password, { delay: 50 });

  const codeSelector =
    "#pane-Account > div > form > div.el-form-item.vertify-code-item.el-form-item--large input";

  await page.type(codeSelector, param.veriCode, { delay: 50 });
  
  const checkbox = await page.$('span[class="el-checkbox__inner"]');
  if (checkbox) await checkbox.click();

  await page.click("button.el-button--primary.el-button--large");
}

async function getScore(page) {
  await page.goto("https://education.suat-sz.edu.cn/teaching/viewGrades", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(
    'button.el-button.el-button--primary.el-button--small',
    { timeout: 15000 }
  );

  const scorePromise = new Promise((resolve, reject) => {
    const handler = async (response) => {
      try {
        const url = response.url();

        if (url.includes("api/biz/sdmgt/_score/studentSearchScore/")) {
          page.off("response", handler);
          const json = await response.json();
          resolve(json);
        }
      } catch (e) {
        reject(e);
      }
    };

    page.on("response", handler);
  });

  // 点击查询
  await page.click('button.el-button.el-button--primary.el-button--small');

  // 等待接口返回
  const scoreJson = await scorePromise;
  return scoreJson;
}

async function Init() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // const page = await browser.newPage();

//   await page.goto(
//     "https://sso.suat-sz.edu.cn/gravity-login/#/?state=SUAT&redirect_url=https%3A%2F%2Feducation.suat-sz.edu.cn%2Fauth-blank&app_id=1937055724117909505&use_new_code_name=false",
//     { waitUntil: "networkidle2" }
//   );

//   const m = {
//     usrID: "SUAT25000207",
//     password: "Wuhu114514.",
//     veriCode: "",
//   };

//   // 1) 截验证码
//   await getVerifyPic(page);

//   // 2) 你输入验证码
//   m.veriCode = await askQuestion("请输入验证码(看 verify.png): ");

//   // 3) 登录
//   await typeInfo(page, m);

//   console.log("已提交登录，等待跳转...");
//   await page.waitForTimeout(3000);

//   // 4) 获取成绩
//   const score = await getScore(page);
//   console.log("成绩数据：");
//   console.log(score);

//   // await browser.close();
//   return score;
}

const app = express();

let browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('short'));

app.post('/api/login-score', async (req, res) => {
    const { userID, userPassword, verifyCode } = req.body;
    try {
        const scoreData = await getScoreFromBackend(userID, userPassword, verifyCode);
        res.json(scoreData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve score data' });
    }
});
app.get('/api/verify', async (req, res) => {
    // res.json({ img: 'data:image/png;base64,...' });
    const page = await browser.newPage();
    console.log("新建页面获取验证码");
    await getVerifyPic(page);
    console.log("跳转到登录页");
      await page.goto(
            "https://sso.suat-sz.edu.cn/gravity-login/#/?state=SUAT&redirect_url=https%3A%2F%2Feducation.suat-sz.edu.cn%2Fauth-blank&app_id=1937055724117909505&use_new_code_name=false",
            { waitUntil: "networkidle2" }
          );

    res.json({ "status": "ok"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
