import { browserInit, verifyPic, typeInfo, getScore } from './main.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = express.Router();

let browser;
const pages = new Map();

// 初始化浏览器
async function initBrowser() {
  if (!browser) {
    browser = await browserInit();
  }
  return browser;
}

// 启动时初始化浏览器
initBrowser().catch(error => {
  console.error('error:', error);
  process.exit(1);
});


route.post('/verifyPic', async (req, res) => {
  console.log('收到请求，正在生成验证码图片...');
  const { timestamp } = req.body;
  const queryTimestamp = req.query.timestamp;

  if (!timestamp || !queryTimestamp || String(timestamp) !== String(queryTimestamp)) {
    return res.status(400).send('Invalid Request: 非法请求参数');
  }

  try {
    const browser = await initBrowser();
    const page = await verifyPic(browser, timestamp, __dirname);
    pages.set(timestamp, page);

    const screenshotPath = path.join(__dirname, `page-${timestamp}.png`);
    await fs.access(screenshotPath);

    res.sendFile(path.resolve(screenshotPath), (err) => {
      if (err) {
        console.error('发送截图失败:', err);
        res.status(500).send('图片发送失败');
      }
    });
  } catch (error) {
    console.error('生成验证码失败:', error);
    if (error.message.includes('非法请求')) {
      res.status(400).send(error.message);
    } else {
      res.status(500).json({ error: `验证码生成失败: ${error.message}` });
    }
  }
});

route.post('/userInfo', async (req, res) => {
  const { userID, password, veriCode, timestamp } = req.body;

  if (!userID || !password || !veriCode || !timestamp) {
    return res.status(400).json({ error: '参数不完整' });
  }

  const page = pages.get(timestamp);
  if (!page) {
    return res.status(400).json({ error: '无效的会话，请重新获取验证码' });
  }

  try {
    await typeInfo(page, { userID, password, veriCode });
    const scoreData = await getScore(page);
    console.log('成绩数据获取成功:', scoreData);
    res.json({
      code: 200,
      message: 'success',
      data: scoreData
    });
  } catch (error) {
    console.error('处理用户请求失败:', error);
    res.status(500).json({
      code: 500,
      error: `操作失败: ${error.message}`
    });

  }
//   finally {
//     try {
//       await page.close();
//       pages.delete(timestamp);
//       const screenshotPath = path.join(__dirname, `page-${timestamp}.png`);
//       await fs.rm(screenshotPath, { force: true });
//     } catch (cleanupErr) {
//       console.error('清理资源失败:', cleanupErr);
//     }
//   }
});

export { route };
