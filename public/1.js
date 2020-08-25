(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Home.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Home.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      title: 'Главная',
      error: false,
      loading: true,
      message: null,
      stickers: []
    };
  },
  methods: {
    reloadPage: function reloadPage() {
      location.reload();
      sessionStorage.removeItem('getStickers');
    },
    updateStickers: function updateStickers() {
      this.loading = true;
      this.stickers = false;
      sessionStorage.removeItem('getStickers');
      this.getStickers();
    },
    getStickers: function getStickers() {
      var app = this;
      var stickers = sessionStorage.getItem('getStickers');

      if (stickers !== null) {
        app.stickers = JSON.parse(stickers);
        app.loading = false;
      } else {
        this.axios.get('/stickers/getAll').then(function (response) {
          app.stickers = response.data.stickers.length < 1 ? false : response.data.stickers;
          app.loading = false;
          if (app.stickers) sessionStorage.setItem('getStickers', JSON.stringify(response.data.stickers));
        })["catch"](function (error) {
          var response = error.response;
          app.loading = false;
          app.error = true;

          if (Object(_js_helpers_other__WEBPACK_IMPORTED_MODULE_0__["isJson"])(response.data)) {
            app.message = JSON.parse(response.data).message ? JSON.parse(response.data).message : JSON.parse(response.data);
          } else if (error.response.data.message) {
            app.message = response.data.message;
          } else {
            app.message = response.data;
          }
        });
      }
    },
    installSticker: function installSticker(sticker) {
      var _this = this;

      this.axios.get('/stickers/installation?id=' + sticker.id + '&token=' + Laravel.user.api_token).then(function (response) {
        console.log(response);
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
    }
  },
  created: function created() {
    this.getStickers();
    this.$root.$emit('changeTitle', this.title);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Home.vue?vue&type=template&id=f2b6376c&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Home.vue?vue&type=template&id=f2b6376c& ***!
  \*******************************************************************************************************************************************************************************************************/
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
        _vm._l(_vm.stickers, function(stick, index) {
          return _vm.stickers
            ? _c(
                "v-card",
                {
                  key: index,
                  staticClass: "mb-3",
                  attrs: { to: { name: "sticker", params: { id: stick.id } } }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "d-flex flex-no-wrap justify-space-between"
                    },
                    [
                      _c(
                        "div",
                        [
                          _c("v-card-title", {
                            staticClass: "headline",
                            domProps: { textContent: _vm._s(stick.title) }
                          }),
                          _vm._v(" "),
                          _c("v-card-subtitle", {
                            domProps: { textContent: _vm._s(stick.description) }
                          }),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            [
                              stick.is_paid == 1
                                ? _c(
                                    "v-btn",
                                    {
                                      attrs: {
                                        block: "",
                                        outlined: "",
                                        color: "primary"
                                      },
                                      on: {
                                        click: function($event) {
                                          return _vm.installSticker(stick)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\tУстановить\n\t\t\t\t\t"
                                      )
                                    ]
                                  )
                                : _c("v-btn", {
                                    attrs: {
                                      outlined: "",
                                      color: "primary",
                                      to: {
                                        name: "payment",
                                        params: {
                                          sticker_id: stick.id
                                        }
                                      }
                                    },
                                    domProps: {
                                      textContent: _vm._s(stick.price + " ₽")
                                    }
                                  })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-avatar",
                        {
                          staticClass: "ma-3",
                          attrs: { size: "125", tile: "" }
                        },
                        [_c("v-img", { attrs: { src: stick.url } })],
                        1
                      )
                    ],
                    1
                  )
                ]
              )
            : _c("v-alert", { attrs: { type: "error" } }, [
                _vm._v("Пока что пусто")
              ])
        }),
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Home.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Home.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=f2b6376c& */ "./resources/js/components/Home.vue?vue&type=template&id=f2b6376c&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/components/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Home.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Home.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Home.vue?vue&type=template&id=f2b6376c&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Home.vue?vue&type=template&id=f2b6376c& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=template&id=f2b6376c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Home.vue?vue&type=template&id=f2b6376c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_f2b6376c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);