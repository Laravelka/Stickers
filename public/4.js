(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sticker.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Sticker.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_helpers_other__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/js/helpers/other */ "./resources/js/helpers/other.js");
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
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: 'Стикер',
      error: false,
      payUrl: null,
      loading: true,
      sticker: null,
      message: null,
      isCreatedPayment: false
    };
  },
  methods: {
    reloadPage: function reloadPage() {
      location.reload();
    },
    updateSticker: function updateSticker() {
      this.loading = true;
      this.sticker = null;
      this.getSticker();
    },
    getSticker: function getSticker() {
      var _this = this;

      this.axios.get('/stickers/getById?id=' + this.$route.params.id + '&token=' + Laravel.user.api_token).then(function (response) {
        _this.sticker = response.data.sticker.length < 1 ? false : response.data.sticker;

        _this.$root.$emit('changeTitle', _this.sticker.title);

        _this.loading = false;
      })["catch"](function (error) {
        var response = error.response;
        _this.loading = false;
        _this.error = true;

        if (Object(_js_helpers_other__WEBPACK_IMPORTED_MODULE_0__["isJson"])(response.data)) {
          _this.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
        } else if (response.data.message) {
          _this.message = response.data.message;
        } else {
          _this.message = response.data;
        }
      });
    },
    installSticker: function installSticker() {
      var _this2 = this;

      this.axios.get('/stickers/installation?id=' + this.$route.params.id + '&token=' + Laravel.user.api_token).then(function (response) {
        console.log(response);
      })["catch"](function (error) {
        var response = error.response;
        _this2.loading = false;
        _this2.error = true;

        if (Object(_js_helpers_other__WEBPACK_IMPORTED_MODULE_0__["isJson"])(response.data)) {
          _this2.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
        } else if (response.data.message) {
          _this2.message = response.data.message;
        } else {
          _this2.message = response.data;
        }
      });
    }
  },
  created: function created() {
    this.getSticker();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.loading
    ? _c(
        "v-container",
        {
          staticClass: "text-center",
          staticStyle: { height: "calc(100vh - 100px)" },
          attrs: { "fill-height": "" }
        },
        [
          _c(
            "v-row",
            { attrs: { align: "center" } },
            [
              _c(
                "v-col",
                { staticClass: "loading", attrs: { align: "center" } },
                [
                  _c("v-progress-circular", {
                    attrs: {
                      size: 50,
                      width: 4,
                      color: "primary",
                      indeterminate: ""
                    }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _vm.error
    ? _c(
        "v-container",
        {
          staticClass: "text-center",
          staticStyle: { height: "calc(100vh - 100px)" },
          attrs: { "fill-height": "" }
        },
        [
          _c(
            "v-row",
            { attrs: { align: "center" } },
            [
              _c(
                "v-col",
                { staticClass: "loading" },
                [
                  _c("h2", { staticClass: "red--text lighten-2" }, [
                    _vm._v("\n\t\t\t\tУпс, ошибка\n\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(
                      "\n\t\t\t\tЗайдите чуть позже или обновите страницу\n\t\t\t"
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    { attrs: { dark: "" }, on: { click: _vm.reloadPage } },
                    [_vm._v("Обновить")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    : _c(
        "v-container",
        [
          _c(
            "v-card",
            { staticClass: "mb-3" },
            [
              _c("v-card-title", {
                staticClass: "headline",
                domProps: { textContent: _vm._s(_vm.sticker.title) }
              }),
              _vm._v(" "),
              _c("v-card-subtitle", {
                domProps: { textContent: _vm._s(_vm.sticker.description) }
              }),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _vm.sticker.is_paid == 1
                    ? _c(
                        "v-btn",
                        {
                          attrs: { block: "", outlined: "", color: "primary" },
                          on: { click: _vm.installSticker }
                        },
                        [_vm._v("\n\t\t\t\tУстановить\n\t\t\t")]
                      )
                    : _c("v-btn", {
                        attrs: {
                          to: {
                            name: "payment",
                            params: {
                              sticker_id: _vm.sticker.id
                            }
                          },
                          block: "",
                          outlined: "",
                          color: "primary"
                        },
                        domProps: {
                          textContent: _vm._s(
                            "Купить " + _vm.sticker.price + " ₽"
                          )
                        }
                      })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-container",
                { attrs: { fluid: "" } },
                [
                  _c(
                    "v-row",
                    _vm._l(_vm.sticker.images, function(image) {
                      return _c(
                        "v-col",
                        {
                          key: image.id,
                          staticClass: "d-flex child-flex",
                          staticStyle: { padding: "4px!important" },
                          attrs: { cols: "4" }
                        },
                        [
                          _c(
                            "v-card",
                            {
                              staticClass: "d-flex",
                              attrs: { flat: "", tile: "" }
                            },
                            [
                              _c("v-img", {
                                staticStyle: { "border-radius": ".25rem" },
                                attrs: {
                                  src: image.url,
                                  "lazy-src": image.url,
                                  "aspect-ratio": "1"
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "placeholder",
                                      fn: function() {
                                        return [
                                          _c(
                                            "v-row",
                                            {
                                              staticClass: "fill-height ma-0",
                                              attrs: {
                                                align: "center",
                                                justify: "center"
                                              }
                                            },
                                            [
                                              _c("v-progress-circular", {
                                                attrs: {
                                                  indeterminate: "",
                                                  color: "grey lighten-5"
                                                }
                                              })
                                            ],
                                            1
                                          )
                                        ]
                                      },
                                      proxy: true
                                    }
                                  ],
                                  null,
                                  true
                                )
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    }),
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Sticker.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Sticker.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sticker.vue?vue&type=template&id=36a94c22& */ "./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22&");
/* harmony import */ var _Sticker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sticker.vue?vue&type=script&lang=js& */ "./resources/js/components/Sticker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Sticker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Sticker.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Sticker.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Sticker.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sticker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Sticker.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sticker.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Sticker_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22&":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Sticker.vue?vue&type=template&id=36a94c22& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Sticker.vue?vue&type=template&id=36a94c22&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Sticker_vue_vue_type_template_id_36a94c22___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);