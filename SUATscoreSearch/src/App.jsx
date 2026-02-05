// import React, { useEffect, useState } from 'react';

// // 配置项
// const API_BASE_URL = 'http://localhost:3000/api';

// export default function App() {
//   const [scoredata, setScoredata] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [timestamp, setTimestamp] = useState(null);

//   const loadData = () => {
//     setLoading(true);
//     setTimeout(() => {
//       if (window.scoredata) {
//         setScoredata(window.scoredata);
//       } else {
//         setScoredata([]);
//       }
//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
//       <div style={{
//         marginBottom: '20px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <h1 style={{ margin: 0 }}></h1>
//         <button
//           onClick={loadData}
//           disabled={loading}
//         >
//           {loading ? '加载中...' : '刷新数据'}
//         </button>
//       </div>

//       <VerifyCodeComponent onTimestampChange={setTimestamp} />
//       <SearchScoreComponent timestamp={timestamp} onScoreDataUpdate={setScoredata} />

//       {loading ? (
//         <div>
//           加载成绩数据中...
//         </div>
//       ) : (
//         <ScoreTable scoredata={scoredata} />
//       )}
//     </div>
//   );
// }

// function VerifyCodeComponent({ onTimestampChange }) {
//   const [imageSrc, setImageSrc] = useState('');
//   const [localTimestamp, setLocalTimestamp] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchVerifyCode = async () => {
//     const newTimestamp = Date.now();
//     setLocalTimestamp(newTimestamp);
//     onTimestampChange(newTimestamp);
//     setLoading(true);

//     try {
//       const response = await fetch(`${API_BASE_URL}/verifyPic?timestamp=${newTimestamp}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ timestamp: newTimestamp })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setImageSrc(imageUrl);
//     } catch (error) {
//       console.error('获取验证码失败:', error);
//       alert('获取验证码失败，请重试');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (imageSrc) {
//         URL.revokeObjectURL(imageSrc);
//       }
//     };
//   }, [imageSrc]);

//   return (
//     <div style={{ padding: '20px' }}>
//       <button onClick={fetchVerifyCode} disabled={loading}>
//         {loading ? '加载中...' : '获取验证码'}
//       </button>
//       {imageSrc && (
//         <div style={{ marginTop: '10px' }}>
//           <img src={imageSrc} alt="验证码" />
//         </div>
//       )}
//     </div>
//   );
// }

// function SearchScoreComponent({ timestamp, onScoreDataUpdate }) {
//   const [userID, setUserID] = useState('');
//   const [password, setPassword] = useState('');
//   const [veriCode, setVeriCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!timestamp) {
//       setError('请先获取验证码');
//       return;
//     }
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${API_BASE_URL}/userInfo?timestamp=${timestamp}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userID,
//           password,
//           veriCode,
//           timestamp
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       onScoreDataUpdate(data.data); // 将数据传递给父组件
//       console.log(data.data);
//     } catch (err) {
//       console.error('Error:', err);
//       setError('查询失败，请检查信息或稍后再试');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='submitbar' style={{ padding: '20px' }}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={userID}
//           onChange={(e) => setUserID(e.target.value)}
//           placeholder="学号/工号"
//           required
//           style={{ marginRight: '8px', marginBottom: '8px' }}
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="密码"
//           required
//           style={{ marginRight: '8px', marginBottom: '8px' }}
//         />
//         <input
//           type="text"
//           value={veriCode}
//           onChange={(e) => setVeriCode(e.target.value)}
//           placeholder="验证码"
//           required
//           style={{ marginRight: '8px', marginBottom: '8px' }}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? '查询中...' : '查询'}
//         </button>
//         {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }

// function ScoreTable({ scoredata }) {
//   if (!scoredata || scoredata.length === 0) {
//     return (
//       <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
//         暂无成绩数据
//       </div>
//     );
//   }

//   const importantColumns = [
//     { key: 'lessonCode', label: '课程代码', width: '100px' },
//     { key: 'lessonName', label: '课程名称', width: '200px' },
//     { key: 'credit', label: '学分', width: '70px' },
//     { key: 'scoreLevel', label: '等级', width: '80px' },
//     { key: 'scoreGpa', label: '绩点', width: '70px' },
//     // { key: 'scorePf', label: '通过状态', width: '100px' },
//     // { key: 'semesterName', label: '学期', width: '120px' }
//   ];

//   const calculateStats = () => {
//     const totalCredits = scoredata.reduce((sum, item) => {
//       const credit = parseFloat(item.credit) || 0;
//       return sum + credit;
//     }, 0);

//     const gpaData = scoredata.filter(item =>
//       item.scoreGpa !== null && item.scoreGpa !== undefined && item.scoreGpa > 0
//     );

//     const totalGpa = gpaData.reduce((sum, item) => {
//       const credit = parseFloat(item.credit) || 0;
//       const gpa = parseFloat(item.scoreGpa) || 0;
//       return sum + (credit * gpa);
//     }, 0);

//     const avgGpa = gpaData.length > 0 ? (totalGpa / gpaData.reduce((sum, item) =>
//       sum + (parseFloat(item.credit) || 0), 0
//     )).toFixed(2) : '0.00';

//     return {
//       totalCredits: totalCredits.toFixed(2),
//       avgGpa: avgGpa,
//       totalCourses: scoredata.length,
//       passedCourses: scoredata.filter(item =>
//         item.scorePf === 'P' || item.scoreLevel || (item.scoreGpa && item.scoreGpa > 0)
//       ).length
//     };
//   };

//   const stats = calculateStats();

//   return (
//     <div>
//       <div>
//         <div>
//           <div>
//             <div>
//               {stats.avgGpa}
//             </div>
//             <div>平均绩点</div>
//           </div>
//           <div>
//             <div>
//               {stats.totalCredits}
//             </div>
//             <div style={{ fontSize: '12px', color: '#666' }}>总学分</div>
//           </div>
//           <div style={{ textAlign: 'center' }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#722ed1' }}>
//               {stats.totalCourses}
//             </div>
//             <div style={{ fontSize: '12px', color: '#666' }}>课程数</div>
//           </div>
//         </div>
//       </div>

//       <div style={{ overflowX: 'auto' }}>
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 序号
//               </th>
//               {importantColumns.map((col, index) => (
//                 <th key={col.key}>
//                   {col.label}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {scoredata.map((item, index) => (
//               <tr key={item.pkey || index}
//                 style={{
//                   borderBottom: '1px solid #f0f0f0',
//                   transition: 'background-color 0.2s'
//                 }}>
//                 <td style={{
//                   padding: '12px 16px',
//                   color: '#666',
//                   position: 'sticky',
//                   left: 0,
//                   backgroundColor: 'white'
//                 }}>
//                   {index + 1}
//                 </td>

//                 {importantColumns.map(col => {
//                   const value = item[col.key];
//                   let displayValue = value;
//                   let style = { padding: '12px 16px' };

//                   if (col.key === 'scoreLevel') {
//                     style = {
//                       ...style,
//                       color: getLevelColor(value),
//                       fontWeight: 'bold',
//                       textAlign: 'center'
//                     };
//                   } else if (col.key === 'scoreGpa') {
//                     displayValue = value || value === 0 ? value : '-';
//                     style = {
//                       ...style,
//                       color: getGpaColor(value),
//                       fontWeight: 'bold',
//                       textAlign: 'center'
//                     };
//                   } else if (col.key === 'scorePf') {
//                     const bgColor = value === 'P' ? '#52c41a' :
//                                    value === 'F' ? '#f5222d' : '#666';
//                     const color = value === 'P' ? '#52c41a' :
//                                   value === 'F' ? '#f5222d' : '#666';
//                     style = {
//                       ...style,
//                       backgroundColor: bgColor,
//                       color: color,
//                       textAlign: 'center',
//                       borderRadius: '4px',
//                       padding: '4px 8px',
//                       display: 'inline-block',
//                       minWidth: '60px'
//                     };
//                     displayValue = value === 'P' ? '通过' :
//                                   value === 'F' ? '不通过' :
//                                   value || '-';
//                   } else if (col.key === 'credit') {
//                     style = { ...style, textAlign: 'center' };
//                   }

//                   return (
//                     <td key={col.key} style={style}>
//                       {displayValue}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={{
//         padding: '16px 20px',
//         backgroundColor: '#fafafa',
//         borderTop: '1px solid #e8e8e8',
//         fontSize: '12px',
//         color: '#666',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//       }}>
//         <div>
//           注: 绩点等级对照: A+(4.3), A(4.0), A-(3.7), B+(3.4), B(3.0), B-(2.7), C+(2.3), C(2.0), C-(1.7), D+(1.3), D(1.0), F(0.0)
//         </div>
//         <div>
//           数据更新时间: {new Date().toLocaleDateString()}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';

// 配置项
const API_BASE_URL = 'http://localhost:3000/api';

export default function App() {
  const [scoredata, setScoredata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timestamp, setTimestamp] = useState(null);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      if (window.scoredata) {
        setScoredata(window.scoredata);
      } else {
        setScoredata([]);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <div>
        <h1></h1>
        <button onClick={loadData} disabled={loading}>
          {loading ? '加载中...' : '刷新数据'}
        </button>
      </div>

      <VerifyCodeComponent onTimestampChange={setTimestamp} />
      <SearchScoreComponent timestamp={timestamp} onScoreDataUpdate={setScoredata} />

      {loading ? (
        <div>加载成绩数据中...</div>
      ) : (
        <ScoreTable scoredata={scoredata} />
      )}
    </div>
  );
}

function VerifyCodeComponent({ onTimestampChange }) {
  const [imageSrc, setImageSrc] = useState('');
  const [localTimestamp, setLocalTimestamp] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchVerifyCode = async () => {
    const newTimestamp = Date.now();
    setLocalTimestamp(newTimestamp);
    onTimestampChange(newTimestamp);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/verifyPic?timestamp=${newTimestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp: newTimestamp })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('获取验证码失败:', error);
      alert('获取验证码失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div>
      <button onClick={fetchVerifyCode} disabled={loading}>
        {loading ? '加载中...' : '获取验证码'}
      </button>
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="验证码" />
        </div>
      )}
    </div>
  );
}

function SearchScoreComponent({ timestamp, onScoreDataUpdate }) {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [veriCode, setVeriCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timestamp) {
      setError('请先获取验证码');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/userInfo?timestamp=${timestamp}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID,
          password,
          veriCode,
          timestamp
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      onScoreDataUpdate(data.data);
      console.log(data.data);
    } catch (err) {
      console.error('Error:', err);
      setError('查询失败，请检查信息或稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='submitbar'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="学号/工号"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
          required
        />
        <input
          type="text"
          value={veriCode}
          onChange={(e) => setVeriCode(e.target.value)}
          placeholder="验证码"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? '查询中...' : '查询'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

function ScoreTable({ scoredata }) {
  if (!scoredata || scoredata.length === 0) {
    return <div>暂无成绩数据</div>;
  }

  const importantColumns = [
    { key: 'lessonCode', label: '课程代码' },
    { key: 'lessonName', label: '课程名称' },
    { key: 'credit', label: '学分' },
    { key: 'scoreLevel', label: '等级' },
    { key: 'scoreGpa', label: '绩点' },
  ];

  const calculateStats = () => {
    const totalCredits = scoredata.reduce((sum, item) => {
      const credit = parseFloat(item.credit) || 0;
      return sum + credit;
    }, 0);

    const gpaData = scoredata.filter(item =>
      item.scoreGpa !== null && item.scoreGpa !== undefined && item.scoreGpa > 0
    );

    const totalGpa = gpaData.reduce((sum, item) => {
      const credit = parseFloat(item.credit) || 0;
      const gpa = parseFloat(item.scoreGpa) || 0;
      return sum + (credit * gpa);
    }, 0);

    const avgGpa = gpaData.length > 0 ? (totalGpa / gpaData.reduce((sum, item) =>
      sum + (parseFloat(item.credit) || 0), 0
    )).toFixed(2) : '0.00';

    return {
      totalCredits: totalCredits.toFixed(2),
      avgGpa: avgGpa,
      totalCourses: scoredata.length,
      passedCourses: scoredata.filter(item =>
        item.scorePf === 'P' || item.scoreLevel || (item.scoreGpa && item.scoreGpa > 0)
      ).length
    };
  };

  const stats = calculateStats();

  return (
    <div>
      <div>
        <div>
          <div>
            <div>{stats.avgGpa}</div>
            <div>平均绩点</div>
          </div>
          <div>
            <div>{stats.totalCredits}</div>
            <div>总学分</div>
          </div>
          <div>
            <div>{stats.totalCourses}</div>
            <div>课程数</div>
          </div>
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <th>序号</th>
              {importantColumns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scoredata.map((item, index) => (
              <tr key={item.pkey || index}>
                <td>{index + 1}</td>
                {importantColumns.map(col => {
                  const value = item[col.key];
                  let displayValue = value;

                  if (col.key === 'scoreGpa') {
                    displayValue = value || value === 0 ? value : '-';
                  } else if (col.key === 'scorePf') {
                    displayValue = value === 'P' ? '通过' :
                                  value === 'F' ? '不通过' :
                                  value || '-';
                  }

                  return <td key={col.key}>{displayValue}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div>
          注: 绩点等级对照: A+(4.3), A(4.0), A-(3.7), B+(3.4), B(3.0), B-(2.7), C+(2.3), C(2.0), C-(1.7), D+(1.3), D(1.0), F(0.0)
        </div>
        <div>
          数据更新时间: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
