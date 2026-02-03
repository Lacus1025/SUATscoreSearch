const url = new URL('https://education.suat-sz.edu.cn/api/biz/sdmgt/_score/studentSearchScore/');

const time = Math.floor(Date.now() / 1000);

const cookies = 'sdp_app_session-443=dda7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a679c21b55fa740f382a518e2d4cc566d6bbcf95e6cb1cc644b12349504752fab9f4c63b880c8a6fb98b24d2995fe7f2683cee181b113ff97ab801ba76de47e10f;sdp_app_session-legacy-443=da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a679c21b55fa740f382a518e2d4cc566d6bbcf95e6cb1cc644b12349504752fab9f4c63b880c8a6fb98b24d2995fe7f2683cee181b113ff97ab801ba76de47e10f'

console.log('timestamp:', time);

// add param
url.searchParams.append('studingTerm', '1948196930375290880');
url.searchParams.append('', '');
url.searchParams.append('lessonName', '');
url.searchParams.append('', '');
url.searchParams.append('orgIds', '4af7fb9b0e594fad903a19d0d8222f3e');
url.searchParams.append('', '');
url.searchParams.append('sttName', '');
url.searchParams.append('', '');
url.searchParams.append('stuId', '1950583867341967360');
url.searchParams.append('n', time);
url.searchParams.append('an', 'SUAT');

async function searchScore() {
    try {
        // send req
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Cookie':cookies,
                'Referer': 'https://education.suat-sz.edu.cn/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'authorization':'eyJhbGciOiJIUzI1NiJ9.eyJjb3Ntb3MtdXNlci1pZCI6IjE5NTMwMTMxMzg4NDQ2ODQyODkiLCJsb2dpbl90aW1lIjoiMTc3MDEyODM5MTgwOSIsImxvZ2luX2lwIjoiMjE4LjE3LjE1Mi4yNiIsInRlcm1pbmFsIjoiMSIsImNvc21vc19hcHBfaWQiOiIxOTM3MDU1NzI0MTE3OTA5NTA1IiwiZXhwIjoxNzcwMTMxOTkxfQ.uWQSyjjQVuz-xl97cM9OkyDnFR_C6nW63u1TV6NqD3k'
            }
        });

        console.log('status:', response.status);
        console.log('URL:', response.url);

        const contentType = response.headers.get('content-type');
        const contentEncoding = response.headers.get('content-encoding');

        console.log('Content-Type:', contentType);
        console.log('Content-Encoding:', contentEncoding);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (contentEncoding && contentEncoding.includes('gzip')) {
            console.log('find gzip!');
            const data = await response.json();
            return data;
        }
        else {
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.error('fail:', error);
        throw error;
    }
}

searchScore()
    .then(data => {
        console.log('results:', data);
        if (data.code === 200) {
            console.log('success:', data.msg);
            console.log('data:', data.data);
        } else if (data.code === 600) {
            console.error('error:', data.msg);
        }
    })
    .catch(error => {
        console.error('fail:', error);
    });
