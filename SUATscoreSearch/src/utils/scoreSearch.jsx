import apiurl from "../../../tmp";

function apiLogin  () {
    var timestamp = Date.now();

    fetch(apiurl.login, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: new URLSearchParams({
        username,
        password // 如果要 MD5，先 md5(password)
        }),
        credentials: 'include' // 关键：允许 cookie
    })
}
