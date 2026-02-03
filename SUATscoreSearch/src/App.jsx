import { useState } from 'react'
import './App.css'
import { GetVertifyCode, login, fetchCaptcha } from './utils/login'

function App() {
  const [message, setMessage] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [captchaId, setCaptchaId] = useState('');

  const testProxy = async () => {
    try {
      const response = await fetch('/api/cosmos/corona/oauth2/v1/web_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: 'test'
        })
      });

      const text = await response.text();
      setMessage(`代理响应状态: ${response.status}, 内容: ${text.substring(0, 100)}...`);
    } catch (error) {
      setMessage(`代理错误: ${error.message}`);
      console.error('代理测试错误:', error);
    }
  };

  const handleLogin = async () => {
    try {
      // 先获取验证码（如果需要）
      const captchaData = await fetchCaptcha();
      if (captchaData) {
        setCaptchaImg(captchaData.img);
        setCaptchaId(captchaData.id);
      }

      // 进行登录
      // 注意：这里需要用户输入验证码，或者自动处理
      const loginData = await login(
        'SUAT25000207',
        'wuhu114514',
        {
          captchaId: captchaId,
          captcha: '' // 这里需要用户输入验证码
        }
      );

      setMessage(`登录成功: ${JSON.stringify(loginData.data)}`);
    } catch (error) {
      setMessage(`登录失败: ${error.message}`);
      console.error('登录错误:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SSO登录测试</h1>

      {/* 测试区域 */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>代理测试</h3>
        <button onClick={testProxy} style={{ marginRight: '10px' }}>
          测试代理请求
        </button>
      </div>

      {/* 验证码区域 */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
        <h3>验证码</h3>
        {/* 使用 GetVertifyCode 组件 */}
        <GetVertifyCode />
      </div>

      {/* 登录区域 */}
      <div style={{ padding: '15px', border: '1px solid #ccc' }}>
        <h3>登录</h3>
        <button onClick={handleLogin} style={{ marginRight: '10px' }}>
          测试登录
        </button>
      </div>

      {/* 显示消息 */}
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h4>消息:</h4>
        <p>{message}</p>
        {captchaImg && (
          <div>
            <p>验证码ID: {captchaId}</p>
            <img src={captchaImg} alt="验证码" style={{ width: '120px', height: '40px', border: '1px solid #000' }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
