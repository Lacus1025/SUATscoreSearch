(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/sys-logo.8463d56f.png";

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_application_vue_vue_type_style_index_0_id_47314c3e_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(66);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_application_vue_vue_type_style_index_0_id_47314c3e_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_dist_cjs_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_application_vue_vue_type_style_index_0_id_47314c3e_prod_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/view/application.vue?vue&type=template&id=47314c3e&scoped=true
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"router-container application"},[_c('div',{staticClass:"application-user"},[_c('p',[_c('img',{staticClass:"avatar",attrs:{"src":_vm.userImg,"alt":""}})]),_vm._v(" "),_c('span',{staticClass:"username"},[_vm._v(_vm._s((_vm.$store.state.userInfo&&_vm.$store.state.userInfo.account)||''))]),_vm._v(" "),_c('span',{staticClass:"swith",on:{"click":function($event){return _vm.$router.push('/')}}},[_c('i',{staticClass:"el-icon-switch-button"})])]),_vm._v(" "),_c('div',{staticClass:"application-modal"},_vm._l((_vm.appArr),function(item,i){return _c('div',{key:i,staticClass:"application-type",on:{"click":function($event){return _vm.toUrl(item.url)}}},[_c('p',[_c('img',{attrs:{"src":_vm.getImg(item.id,_vm.imgArr)||_vm.defaultImg,"alt":""}})]),_vm._v(" "),_c('h3',[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.url))])])}),0)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/view/application.vue?vue&type=template&id=47314c3e&scoped=true

// EXTERNAL MODULE: ./src/api/auth.js
var auth = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--0!./node_modules/vue-loader/lib??vue-loader-options!./src/view/application.vue?vue&type=script&lang=js
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var applicationvue_type_script_lang_js = ({
  name: 'application',
  components: {},
  computed: {
    userDefaultImg: function userDefaultImg() {
      return __webpack_require__(48) || '';
    }
  },
  data: function data() {
    return {
      activeName: 'account',
      configInfo: {
        captchaEnable: false,
        loginType: 99,
        captchaStyle: '',
        mobileCodeEnable: false
      },
      isInit: false,
      appArr: [],
      userImg: '',
      imgArr: [],
      defaultImg: __webpack_require__(110),
      tokenInterval: null,
      tokenDelay: 300000
    };
  },
  methods: {
    // 刷新token
    updateToken: function updateToken() {
      var _this = this;
      this.$http({
        method: 'post',
        url: auth["l" /* refreshToken */],
        data: {
          data: {
            app_id: null,
            grant_type: 'refresh_token'
          }
        }
      }).then(function (res) {
        _this.$store.commit('setStoreState', {
          key: 'tokenInfo',
          value: res.data
        });
      });
    },
    initConfig: function initConfig() {
      var _this2 = this;
      this.$http({
        method: 'post',
        url: auth["e" /* getApplication */],
        data: {}
      }).then(function (res) {
        _this2.appArr = res.data;
        _this2.getAppImgFn(_this2.appArr.map(function (item) {
          return item.id;
        }));
      })["catch"](function (err) {
        _this2.$message({
          type: 'error',
          message: err.msg || ''
        });
      });
    },
    getUserImg: function getUserImg() {
      var _this3 = this;
      this.$http({
        method: 'post',
        url: auth["f" /* getUserImg */],
        data: {
          data: {
            userIdList: [this.$store.state.userInfo.id],
            imageTypeList: []
          }
        }
      }).then(function (res) {
        if (res.data[0]) {
          _this3.userImg = res.data[0].imageBase64;
        } else {
          _this3.userImg = _this3.userDefaultImg;
        }
      });
    },
    getAppImgFn: function getAppImgFn(arr) {
      var _this4 = this;
      this.$http({
        method: 'post',
        url: auth["d" /* getAppImg */],
        data: {
          data: {
            appIdList: arr
          }
        }
      }).then(function (res) {
        _this4.imgArr = res.data;
      });
    },
    toUrl: function toUrl(url) {
      // window.location.href = url;
      var check = url.substring(0, 4);
      if (check === 'http') {
        window.open(url);
      } else {
        window.open('//' + url);
      }
    },
    getImg: function getImg(id, arr) {
      return arr.find(function (item) {
        return item.appId === id;
      }) && arr.find(function (item) {
        return item.appId === id;
      }).imageBase64;
    }
  },
  created: function created() {
    this.updateToken();
    this.tokenInterval = setInterval(this.updateToken, this.tokenDelay);
    this.initConfig();
    this.getUserImg();
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.tokenInterval);
  }
});
// CONCATENATED MODULE: ./src/view/application.vue?vue&type=script&lang=js
 /* harmony default export */ var view_applicationvue_type_script_lang_js = (applicationvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/view/application.vue?vue&type=style&index=0&id=47314c3e&prod&lang=scss&scoped=true
var applicationvue_type_style_index_0_id_47314c3e_prod_lang_scss_scoped_true = __webpack_require__(111);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./src/view/application.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  view_applicationvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  "47314c3e",
  null
  
)

/* harmony default export */ var application = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAABGBJREFUWEfNmEtoXFUcxr/vPjJ5N01iMUajtbaCEIq11lYkLZRKLElMXUiVUnAlKG4SUBcKAV2oEDc+tt0UdFE0pkEpWg0WKukDbZviIha1jY9oOzZpJslkzrl/OXfmzkwnj7k3bWDOcs653/nN/30vEXF1vCYtSOldALcRshFgs0CqjQzBaUD+EHAMkFNw7eGhd3k5yhUMc7ivT6yzN3SXCF4gsRWCUM+BEBGcIXHokRp7sK+PXrH7igp39abaPMHbBB8oJrbcvkB+sYg3Bvvd75c7tyTQU69IzC5Tb1F44FZACp8VymE977z51QdMLqa7KNDul6WhMqYOA9x8O2FyWnJuJukcOP4RrxXqLwAyMBUxNUBww+rApFUFcmk26XQXQt0EZNzkuGpg9SyzwIHnVMrpznffTUAdvan3bnfMFLOyiamhfvfV4FwWyGSTCD8tJlC4X1UJ3rMODkm5/LfoxCwkqgYp+4Ps84FMnTkzpYajpvb2VsS2PcQYmS44nkc5/bMkR0ZlPgqUKQlba51dpk75QJ29qhuCj6OIPPwg3bYtrPA8AwJIxi4kcOInzJ4fk1QUPRAvHe13Bnygjh71BYFHwwpYBF7cxxrHBbUGtOcbyF8GKKUgh47KdPBbGF0BTg+97zzNvb2z99pwT4ZuBwCa7oD97G6rSmmB0hBjIS8DZGAtC/h8WBL/xFG0VWRhjdcdewc7etRBAu+E+RfBmfuaaXc9gSql4QNp47LM1bQA2wK+PCkz4xPQUXQFeJ0dPfpDQp6J8mBdDXhwL2sMkHHPYhb65GuZnk5EyzgBP2NnjzoGoDUKkDm7/0mrsr5WnMVcdnWSamDYm42qCeACO3v0KCD1UR9uXAtr305WObbvtmyWGcDBEzITn4wQP7lAipsY+o1AWVQgc76uFtaOVsbuaqRt0v/Pf6FGLiJ5/UaU/MrdLMD8LQEZKRPAsVh6YEsm0wG+0uUDrcRl65vhbGqh09QAp7KcNBnm+fFLmZ6BTMRFj11B6ve/JFKWAYxHCur6NbDat7OicW3aRekKTdGeZNPJmMq2CFJ4bZLq2Ig3d30qdDxdCJ32dTXkc3tQ7Zalq7N4FO33LzPb+ANOplSbYT9dHG0SSSVy5DgSkyHqtp/2YQtj++Os2NRCV+t0EzVWCXpYYXs3QKaF+FAWMXZFUt+ckrliseUXxrCt4/l2VjWsgW1SXOe1i6XyyQfKQMUnxTvyLRLLAgWtI2xzbduC8s0bWRa0i6x1lph+DFBgpdFLMv/DeSw61AeQ2eZqfggzfjgOsOcxq/z+Jrgq4y6/oUoufAJxvwb41qH8Oi7qux9lTqsiDssfP6IMaOvqYW24m+6d9bBrq2HFygjxJM1AylxSZCoBbyIOPTYu6up/xTNswYBmxFY6whq3GOuZpVSuhRQL4Pz9BSNssFlSQ76BKrnXIANVUi+KgetK6lU6gCqpjw35GVAyn2PyoUrqg1VhPTG9zxJ352p90vsfnTZtDXmnGp8AAAAASUVORK5CYII="

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);