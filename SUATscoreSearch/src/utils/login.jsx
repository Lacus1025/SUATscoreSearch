import axios from "axios"
import md5 from "md5"
import CryptoJS from "crypto-js"
import { useState } from "react"

function aesEncrypt(word, keyWord = "XwKsGlMcdPMEhR1B") {
  const key = CryptoJS.enc.Utf8.parse(keyWord)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

//GetVertifyCode 组件
export function GetVertifyCode() {
  const [message, setMessage] = useState('');
  const [captchaInfo, setCaptchaInfo] = useState(null);
  const timestamp = Date.now();
  const seq = aesEncrypt(timestamp)
//   const seq1 = md5(timestamp);
//   const seq2 = md5(seq1)
//   const seq = aesEncrypt(seq2)
  const getCaptcha = async () => {
    try {
      const response = await fetch('/api/cosmos/corona/auth/v1/get/captcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                'seq':seq,
                'timestamp':timestamp
            }
    )
      });

      const data = await response.json();

      setMessage(`验证码获取成功: ${response.status}`);
      setCaptchaInfo({
        id: data.id,
        img: data.img
      });

      return data; // 返回数据供后续使用
    } catch (error) {
      setMessage(`验证码获取失败: ${error.message}`);
      console.error('获取验证码错误:', error);
      return null;
    }
  };

  // 组件必须返回JSX
  return (
    <div>
      <button onClick={getCaptcha}>获取验证码</button>
      <p>{message}</p>
      {captchaInfo && (
        <div>
          <p>验证码ID: {captchaInfo.id}</p>
          <img src={captchaInfo.img} alt="验证码" style={{ width: '120px', height: '40px' }} />
        </div>
      )}
    </div>
  );
}

const myaccount = 'SUAT25000207'
const mypsw = 'wuhu114514'

export function login(account = myaccount, password = mypsw, verifyParams = {}) {
  const timestamp = Date.now()
  const encryptedPassword = aesEncrypt(
    md5(password),
    md5(account + timestamp)
  )

  return axios.post(
    "https://sso.suat-sz.edu.cn/cosmos/corona/oauth2/v1/web_login",
    {
      data: {
        loginType: 1,
        appId: null,
        account: account,
        password: encryptedPassword,
        time: timestamp,
        passwordType: 1,
        ...verifyParams
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
      },
      withCredentials: true
    }
  )
}

// 新增：获取验证码的纯函数（如果只需要功能，不需要UI）
export async function fetchCaptcha() {
  try {
    const response = await fetch('https://sso.suat-sz.edu.cn/cosmos/corona/auth/v1/get/captcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`HTTP错误: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('获取验证码失败:', error);
    throw error;
  }
}
