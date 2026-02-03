const url = new URL('https://education.suat-sz.edu.cn/api/biz/sdmgt/_score/studentSearchScore/');

const time = Math.floor(Date.now()/1000);

console.log(time)

const cookies = {
    'sdp_app_session-443':'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a679c21b55fa740f382a518e2d4cc566d6bbcf95e6cb1cc644b12349504752fab9f4c63b880c8a6fb98b24d2995fe7f2683cee181b113ff97ab801ba76de47e10f',
    'sdp_app_session-legacy-443':'da7ded464078a0e97f9bfe1b9f0a6b5d70dad5585ba0733419ef1c40b9c82023d7d817b6ed79ef315e0588b7935ab6a679c21b55fa740f382a518e2d4cc566d6bbcf95e6cb1cc644b12349504752fab9f4c63b880c8a6fb98b24d2995fe7f2683cee181b113ff97ab801ba76de47e10f'
};

url.searchParams.append('studingTerm','1948196930375290880');
url.searchParams.append('','');
url.searchParams.append('lessonName','');
url.searchParams.append('','');
url.searchParams.append('orgIds','4af7fb9b0e594fad903a19d0d8222f3e');
url.searchParams.append('','');
url.searchParams.append('sttName','');
url.searchParams.append('','');
url.searchParams.append('stuId','1950583867341967360');
url.searchParams.append('n',time);
url.searchParams.append('an','SUAT');
fetch(url,{
    method:'GET',
    credentials: "include",
    headers: {
        'Content-Type': 'application/json',
        'Cookie':cookies,
        'Accept':'application/json, text/plain, */*',
        'connection':'keep-alive',
        'authorization':'eyJhbGciOiJIUzI1NiJ9.eyJjb3Ntb3MtdXNlci1pZCI6IjE5NTMwMTMxMzg4NDQ2ODQyODkiLCJsb2dpbl90aW1lIjoiMTc3MDEyMTAzMzE4MiIsImxvZ2luX2lwIjoiMjE4LjE3LjE1Mi4yNiIsInRlcm1pbmFsIjoiMSIsImNvc21vc19hcHBfaWQiOiIxOTM3MDU1NzI0MTE3OTA5NTA1IiwiZXhwIjoxNzcwMTI0NjMzfQ.a1s5PU2ji21QA6ChowzCX8oupGJDmOiU3uJ_tmIekxc'
    },
})
.then(res => res.json())
.then(data => console.log(data));
