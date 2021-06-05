"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var PopupDisposable=function(){function PopupDisposable(e){var t=this;_classCallCheck(this,PopupDisposable),this.popupContainer=e,this.btnOpenPopup=this.popupContainer.querySelector(".popup-disposable-btn-open"),this.deletePopup=function(){if(!event.target.closest(".pop-up")&&!event.target.classList.contains("popup-disposable-btn-open")){var e=document.querySelector(".popup-disposable");e.classList.remove("popup-disposable-active"),e.classList.add("popup-disposable-delete-popup"),document.removeEventListener("click",t.deletePopup),setTimeout(function(){e.classList.remove("popup-disposable-delete-popup"),t.hides_showVerticalScrolling()},300)}}}return _createClass(PopupDisposable,[{key:"hides_showVerticalScrolling",value:function hides_showVerticalScrolling(){var e=document.querySelector("body"),t=window.innerWidth-this.popupContainer.querySelector(".popup-disposable__container-content").clientWidth;e.style.cssText="\n\t\t\t\tpadding-right: ".concat(t,t?"px;\n\t\t\t\toverflow: hidden;\n\t\t\t":"px;\n\t\t\t\toverflow: auto;\n\t\t\t")}},{key:"addEventClickBtnOpenPopup",value:function addEventClickBtnOpenPopup(){var e=this;this.btnOpenPopup.addEventListener("click",function(){e.openPopup()})}},{key:"openPopup",value:function openPopup(){this.popupContainer.classList.add("popup-disposable-active"),this.hides_showVerticalScrolling(),this.addEventClickDocument()}},{key:"addEventClickDocument",value:function addEventClickDocument(){document.addEventListener("click",this.deletePopup)}},{key:"run",value:function run(){this.addEventClickBtnOpenPopup()}}]),PopupDisposable}();