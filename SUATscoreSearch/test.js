// import React from "react";
// import axios from 'axios'

// // const api_Url = 'https://education.suat-sz.edu.cn/api/biz/sdmgt/_score/studentSearchScore/?studingTerm=1948196930375290880&lessonName=&orgIds=4af7fb9b0e594fad903a19d0d8222f3e&sttName=&stuId=1950583867341967360&n=1770111996&an=SUAT';
// const cookie = {
//     'sdp_app_session-legacy-443':'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a6dcca865c8a92ea41dcd9ce4cc3eb679943555d30e32eb3ab75d7f86d75d55fd6cf963488b3fef8b04a3126729fdf64397d46f2df665a06682e6336a8ab4bc264',
//     'sdp_app_session-443':'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a6dcca865c8a92ea41dcd9ce4cc3eb679943555d30e32eb3ab75d7f86d75d55fd6cf963488b3fef8b04a3126729fdf64397d46f2df665a06682e6336a8ab4bc264a'
// }

// // fetch(api_Url,{
// //   method: 'GET',
// //   headers: {
// //     'Content-Type': 'application/json',

// //   },
// //   body: JSON.stringify({

// //   })
// // })
// // .then(response => response.json())
// // .then(data => console.log(data));
// const time = Date.now();
// const url = new URL('https://education.suat-sz.edu.cn/api/biz/sdmgt/_score/studentSearchScore/');
// url.searchParams.append('studingTerm', 1948196930375290880);
// url.searchParams.append('lessonName', '');
// url.searchParams.append('orgIds','4af7fb9b0e594fad903a19d0d8222f3e');
// url.searchParams.append('sttName','');
// url.searchParams.append('stuId',1950583867341967360);
// url.searchParams.append('n',time)
// url.searchParams.append('an','SUAT')
// fetch(url,
//   {
//     method: 'GET',
//     headers: {
//       cookie
//     }
//   }
// )
//   .then(
//     //response => response.json()
//     // print(response)
// );

// test.js
const time = Date.now();

const cookie = {
    'sdp_app_session-legacy-443': 'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a6dcca865c8a92ea41dcd9ce4cc3eb679943555d30e32eb3ab75d7f86d75d55fd6cf963488b3fef8b04a3126729fdf64397d46f2df665a06682e6336a8ab4bc264',
    'sdp_app_session-443': 'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a6dcca865c8a92ea41dcd9ce4cc3eb679943555d30e32eb3ab75d7f86d75d55fd6cf963488b3fef8b04a3126729fdf64397d46f2df665a06682e6336a8ab4bc264a'
};

// 正确的URL构造 - 不需要重复 https://
const url = new URL('https://education.suat-sz.edu.cn/api/biz/sdmgt/_score/studentSearchScore/');

// 添加查询参数
url.searchParams.append('studingTerm', '1948196930375290880');
url.searchParams.append('lessonName', '');
url.searchParams.append('orgIds', '4af7fb9b0e594fad903a19d0d8222f3e');
url.searchParams.append('sttName', '');
url.searchParams.append('stuId', '1950583867341967360');
url.searchParams.append('n', time.toString());
url.searchParams.append('an', 'SUAT');

console.log('请求URL:', url.toString());

// 将cookie对象转换为字符串格式
const cookieString = Object.entries(cookie)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

async function fetchData() {
    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Cookie': cookieString,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
            }
        });

        console.log('响应状态:', response.status);
        console.log('响应头:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('响应数据:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('请求失败:', error);
        console.error('错误详情:', error.cause || error.message);
    }
}

// 执行请求
fetchData();
