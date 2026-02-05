import React, { useState } from 'react';

const timestamp = Date.now();

export function VerifyCodeComponent() {
  const [imageSrc, setImageSrc] = useState('');
  // const [timestamp,settimestamp] = useState(Date.now());
  const fetchVerifyCode = async () => {
    // settimestamp(Date.now());
    try {
      const response = await fetch(`http://localhost:3000/api/verifyPic?timestamp=${timestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: timestamp
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 获取图片的 Blob
      const blob = await response.blob();

      // 创建本地 URL
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('获取验证码失败:', error);
      alert('获取验证码失败，请重试');
    } finally {
    }
  };

  React.useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={fetchVerifyCode}>获取验证码</button>

      {imageSrc && (
        <div>
          <img src={imageSrc} alt="验证码"/>
        </div>
      )}
    </div>
  );
}
export function SearchScoreComponent() {

  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [veriCode, setVeriCode] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/userInfo?timestamp=${timestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: userID,
          password: password,
          veriCode: veriCode,
          timestamp: timestamp
        })});

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(response);

      }
    catch(error){
        console.log(error);
      }
  }

  return (
    <div className='submitbar'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="学号/工号"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
        />
        <input
          type="text"
          value={veriCode}
          onChange={(e) => setVeriCode(e.target.value)}
          placeholder="验证码"
        />
        <button type="submit">查询</button>
      </form>
    </div>
  );
}
