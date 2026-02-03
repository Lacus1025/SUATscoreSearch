const baseUrl ='https:\/\/sso.suat-sz.edu.cn';

const apiurl = {
  // 登录接口
  login: baseUrl + '/cosmos/corona/oauth2/v1/web_login',
  // 获取验证码

//   https://sso.suat-sz.edu.cn/cosmos/corona/auth/v1/get/captcha
  captcha: baseUrl + '/cosmos/corona/auth/v1/get/captcha',
  // 校验验证码
  verify: baseUrl + '/cosmos/corona/auth/v1/verify/captcha/aj',
  // 发送手机短信验证码
  sendCode: baseUrl + '/cosmos/corona/oauth2/v1/send/mobile_code',
  // 获取登录配置
  loginConfig: baseUrl + '/cosmos/corona/oauth2/v1/login_page_config',
  // 获取用户拥有权限的应用
  getApplication: baseUrl + '/cosmos/corona/auth/v1/list/app',
  // 获取用户头像   
  getUserImg: baseUrl + '/cosmos/corona/user/v1/list/img',
  // 获取应用头像
  getAppImg: baseUrl + '/cosmos/corona/app/v1/list/img',
  // 修改密码
  updatePW: baseUrl + '/cosmos/corona/auth/v1/update/password',
  // 激活码是否到期
  licenseTime: baseUrl + '/cosmos/configuration/license/v1/expired',
  // 激活
  activeCode: baseUrl + '/cosmos/configuration/license/v1/activate',
  // 刷新refreshToken
  refreshToken: baseUrl + '/cosmos/corona/oauth2/v1/refresh_token',
  // 获取【登录页】相关图片流
  loginPageImg: baseUrl + '/cosmos/configuration/config/v1/login_page_img/get',
  // 用户身份验证信息查询
  userVerifyQuery: baseUrl + '/cosmos/corona/oauth2/v1/verify/query',
  // 发送用户密码重置验证码
  sendResetCode: baseUrl + '/cosmos/corona/oauth2/v1/verify/code/send',
  // 用户密码重置验证码校验
  checkCode: baseUrl + '/cosmos/corona/oauth2/v1/verify/code/check',
  // 重置用户密码
  resetPassword: baseUrl + '/cosmos/corona/user/v1/reset/password',
  protocolConfig: baseUrl + '/cosmos/configuration/config/v1/login_protocol/get',
};

export default apiurl;
