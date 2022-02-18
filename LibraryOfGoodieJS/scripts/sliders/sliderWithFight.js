function _classCallCheck(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(i,e){for(var t=0;t<e.length;t++){var s=e[t];s.enumerable=s.enumerable||0,s.configurable=1,"value"in s&&(s.writable=1),Object.defineProperty(i,s.key,s)}}function _createClass(i,e,t){return e&&_defineProperties(i.prototype,e),t&&_defineProperties(i,t),i}function _getPrototypeOf(i){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(i){return i.__proto__||Object.getPrototypeOf(i)})(i)}function _setPrototypeOf(i,e){return(_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(i,e){return i.__proto__=e,i})(i,e)}function _assertThisInitialized(i){if(void 0===i)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function _possibleConstructorReturn(i,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(i):e}function _get(i,e,t){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function _get(i,e,t){var s=function _superPropBase(i,e){for(;!Object.prototype.hasOwnProperty.call(i,e)&&null!==(i=_getPrototypeOf(i)););return i}(i,e);if(s){var n=Object.getOwnPropertyDescriptor(s,e);return n.get?n.get.call(t):n.value}})(i,e,t||i)}var Navigation=function(){function Navigation(i,e){_classCallCheck(this,Navigation),this.slider=i,this.sliderTrack=this.slider.querySelector(".slider-track"),this.speed=e,this.slides=this.slider.querySelectorAll(".slide"),this.maximumSwipingAtSlider=0,this.measuresMaximumSwipeOfSlider()}return _createClass(Navigation,[{key:"measuresMaximumSwipeOfSlider",value:function measuresMaximumSwipeOfSlider(){var i=this;this.sliderTrack.querySelectorAll(".slide").forEach((function(e){i.maximumSwipingAtSlider+=e.offsetWidth})),this.maximumSwipingAtSlider-=this.slider.clientWidth}},{key:"getNewPositionSliderTrack",value:function getNewPositionSliderTrack(i){for(var e=0,t=0;t<i;t++)e+=Math.round(this.slides[t].getBoundingClientRect().width);return this.checkNewPosition(e)}},{key:"addTransitionSliderTrack",value:function addTransitionSliderTrack(i){var e=this;this.sliderTrack.style.transition="transform 0.".concat(this.speed,"s ease"),setTimeout((function(){e.sliderTrack.style.transform="translate3d(".concat(-i,"px, 0px, 0px)")}),0),setTimeout((function(){e.sliderTrack.style.transition="transform 0s ease"}),this.speed)}},{key:"checkNewPosition",value:function checkNewPosition(i){return i>this.maximumSwipingAtSlider?i=this.maximumSwipingAtSlider:i<0&&(i=0),i}},{key:"pushingSliderTrack",value:function pushingSliderTrack(i,e){if(!(e===this.slides.length-1&&"last"!==i||0===e&&"next"!==i)){var t="next"===i?e+1:e-1,s=this.getNewPositionSliderTrack(t);return Math.round(this.slides[e].getBoundingClientRect().width),Math.abs(getComputedStyle(this.sliderTrack).transform.split(",")[4]),this.addTransitionSliderTrack(s),{position:s,current_slide:t}}}}]),Navigation}(),Pagination=function(){function Pagination(i){_classCallCheck(this,Pagination),this.slider=i,this.btnsPagination=this.slider.querySelectorAll(".pagination-btn")}return _createClass(Pagination,[{key:"changeBtnPagination",value:function changeBtnPagination(i){this.btnsPagination.forEach((function(i){i.classList.remove("pagination-btn-active")})),this.btnsPagination[i].classList.add("pagination-btn-active")}}]),Pagination}(),Slider=function(){function Slider(){_classCallCheck(this,Slider)}return _createClass(Slider,[{key:"getEvent",value:function getEvent(){return-1!=event.type.search("touch")?event.touches[0]:event}},{key:"measuresMaximumSwipeOfSlider",value:function measuresMaximumSwipeOfSlider(){var i=this;this.sliderTrack.querySelectorAll(".slide").forEach((function(e){i.maximumSwipingAtSlider+=e.offsetWidth})),this.maximumSwipingAtSlider-=this.sliderWidth}},{key:"removeEventsSliderTrack",value:function removeEventsSliderTrack(){this.sliderTrack.removeEventListener("touchmove",this._swipeAction),this.sliderTrack.removeEventListener("touchend",this._swipeEnd),this.sliderTrack.removeEventListener("mousemove",this._swipeAction),this.sliderTrack.removeEventListener("mouseout",this.goingOutBoundsSlider),this.sliderTrack.removeEventListener("mouseup",this._swipeEnd),this.slider.classList.remove("slider-active")}},{key:"addEventsSliderTrack",value:function addEventsSliderTrack(){this.sliderTrack.addEventListener("mouseup",this._swipeEnd),this.sliderTrack.addEventListener("touchend",this._swipeEnd,{passive:1}),this.sliderTrack.addEventListener("mousemove",this._swipeAction),this.sliderTrack.addEventListener("touchmove",this._swipeAction,{passive:1}),this.sliderTrack.addEventListener("mouseout",this.goingOutBoundsSlider),this.slider.classList.add("slider-active")}},{key:"getPaginationSlider",value:function getPaginationSlider(){return this.slider.querySelector(".slider-pagination")}},{key:"checkIsPaginationSlider",value:function checkIsPaginationSlider(){this.getPaginationSlider()&&this.addPagination()}},{key:"watchSwipeSliderTrack_Pagination",value:function watchSwipeSliderTrack_Pagination(){this.newPagination.changeBtnPagination(this.currentSlide)}},{key:"addPagination",value:function addPagination(){this.isPagination=1,this.newPagination=new Pagination(this.slider)}},{key:"addNavigation",value:function addNavigation(){var i=this;this.isNavigation=1,this.newNavigation=new Navigation(this.slider,this.speed);var e=this.slider.querySelector(".btn-slider-push-last"),t=this.slider.querySelector(".btn-slider-push-next");e.addEventListener("click",(function(){i.pressedBtnPushSlider()})),t.addEventListener("click",(function(){i.pressedBtnPushSlider()}))}},{key:"pressedBtnPushSlider",value:function pressedBtnPushSlider(){var i=this;if(this.allowSwipe){var e=event.currentTarget.dataset.direction,t=this.newNavigation.pushingSliderTrack(e,this.currentSlide);t&&(this.currentSlide=t.current_slide,this.positionFinal=t.position,this.positionSliderTrack=t.position,"SliderWithPreviews"==this.className&&(this.changeDataForSLiderPreviews(),this.pushingSliderPreviews()),this.isPagination&&this.watchSwipeSliderTrack_Pagination()),this.allowSwipe=0,setTimeout((function(){i.allowSwipe=1}),500)}}},{key:"checkSliderCanBeMoved",value:function checkSliderCanBeMoved(i){Math.abs(i.clientY-this.positionPressedY)>=5&&"touchmove"===event.type&&(this.isScrollingSlider?this.isScrollingSlider&&(this.allowSwipe=1):(this.allowSwipe=0,this.removeEventsSliderTrack()))}},{key:"checksOutOfBounds",value:function checksOutOfBounds(){(this.positionX_FingetCurrentMoment_OnSlider>=this.positionFingerPressSliderX&&this.positionSliderTrack-this.positionFinal>0||this.positionX_FingetCurrentMoment_OnSlider>=this.sliderWidth-this.positionFingerPressSliderX&&this.positionSliderTrack-this.positionFinal<0)&&this.swipeEnd()}},{key:"calculatesTouchCoordinates_SwipeStart",value:function calculatesTouchCoordinates_SwipeStart(i){this.positionPressedX=i.clientX,this.positionPressedY=i.clientY,this.positionFingerPressSliderX=this.positionPressedX-this.slider.getBoundingClientRect().x,this.positionFingerPressSliderY=this.positionPressedY-this.slider.getBoundingClientRect().y}},{key:"checkNavigation",value:function checkNavigation(){this.slider.querySelector(".slider-navigation")&&this.addNavigation()}}]),Slider}(),HandlerFight=function(){function HandlerFight(i,e){_classCallCheck(this,HandlerFight),this.slider=i,this.sliderTrack=e,this.sliderWidth=Math.round(this.slider.getBoundingClientRect().width)}return _createClass(HandlerFight,[{key:"addTransitionSliderTrack",value:function addTransitionSliderTrack(i,e){var t=this;this.sliderTrack.style.transition="transform 0.".concat(e,"s ease");var s=i*this.sliderWidth;return setTimeout((function(){t.sliderTrack.style.transform="translate3d(".concat(-s,"px, 0px, 0px)")}),0),setTimeout((function(){t.sliderTrack.style.transition="none"}),e),s}},{key:"returnsSliderBack",value:function returnsSliderBack(i,e){this.addTransitionSliderTrack(i,e)}}]),HandlerFight}();!function(i){!function _inherits(i,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");i.prototype=Object.create(e&&e.prototype,{constructor:{value:i,writable:1,configurable:1}}),e&&_setPrototypeOf(i,e)}(SliderWithFight,Slider);var e=function _createSuper(i){var e=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return 0;if(Reflect.construct.sham)return 0;if("function"==typeof Proxy)return 1;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),1}catch(i){return 0}}();return function _createSuperInternal(){var t,s=_getPrototypeOf(i);if(e){var n=_getPrototypeOf(this).constructor;t=Reflect.construct(s,arguments,n)}else t=s.apply(this,arguments);return _possibleConstructorReturn(this,t)}}(SliderWithFight);function SliderWithFight(i,t){var s,n,r;return _classCallCheck(this,SliderWithFight),(r=e.call(this)).slider=i,r.options=t,r.sliderWidth=Math.round(r.slider.getBoundingClientRect().width),r.sliderTrack=r.slider.querySelector(".slider-track"),r.currentSlide=0,r.numberSlides=r.sliderTrack.querySelectorAll(".slide").length,r.positionSliderTrack=0,r.positionFinal=0,r.singleSwipe=0,r.positionPressedX,r.positionPressedY,r.positionFingerPressSliderX,r.positionFingerPressSliderY,r.positionX_FingetCurrentMoment_OnSlider,r.positionY_FingetCurrentMoment_OnSlider,r.allowSwipe=1,r.isScrollingSlider=0,r.addOptions(),_get((s=_assertThisInitialized(r),_getPrototypeOf(SliderWithFight.prototype)),"checkIsPaginationSlider",s).call(s),_get((n=_assertThisInitialized(r),_getPrototypeOf(SliderWithFight.prototype)),"checkNavigation",n).call(n),r._swipeStart=function(){r.swipeStart()},r._swipeAction=function(){r.swipeAction()},r._swipeEnd=function(){r.swipeEnd()},r.percentForSuccessfulScrolling=Math.round(r.sliderWidth/100*r.percentageForSuccessfulScrolling),r.newHandlerFight=new HandlerFight(r.slider,r.sliderTrack),r.goingOutBoundsSlider=function(){r.swipeEnd(),r.sliderTrack.removeEventListener("mouseout",r.goingOutBoundsSlider)},r}_createClass(SliderWithFight,[{key:"addOptions",value:function addOptions(){this.speed=this.options.speed?this.options.speed:200,this.percentageForSuccessfulScrolling=this.options.percentageForSuccessfulScrolling?this.options.percentageForSuccessfulScrolling:35}},{key:"checkIsNavigation_Pagination",value:function checkIsNavigation_Pagination(){this.isPagination&&_get(_getPrototypeOf(SliderWithFight.prototype),"watchSwipeSliderTrack_Pagination",this).call(this)}},{key:"checksIfSliderNeedsPromoted",value:function checksIfSliderNeedsPromoted(){this.currentSlide+=this.singleSwipe>=this.percentForSuccessfulScrolling&&this.currentSlide!==this.numberSlides.length-1?1:-1,this.currentSlide<0?this.currentSlide=0:this.currentSlide>this.numberSlides-1&&(this.currentSlide=this.numberSlides-1);var i=this.newHandlerFight.addTransitionSliderTrack(this.currentSlide,this.speed);this.positionFinal=i,this.checkIsNavigation_Pagination()}},{key:"setsPropertyAllowSwipe",value:function setsPropertyAllowSwipe(){var i=this;this.allowSwipe=0,setTimeout((function(){i.allowSwipe=1}),this.speed)}},{key:"pushingSlider",value:function pushingSlider(){this.singleSwipe=this.positionSliderTrack-this.positionFinal,this.sliderTrack.style.transform="translate3d(".concat(-this.positionSliderTrack,"px, 0px, 0px)"),Math.abs(this.singleSwipe)>=5&&(this.isScrollingSlider=1)}},{key:"swipeStart",value:function swipeStart(){if(this.allowSwipe){var i=_get(_getPrototypeOf(SliderWithFight.prototype),"getEvent",this).call(this);this.sliderTrack.style.transform="translate3d(-".concat(this.positionFinal,"px, 0px, 0px)"),_get(_getPrototypeOf(SliderWithFight.prototype),"calculatesTouchCoordinates_SwipeStart",this).call(this,i),_get(_getPrototypeOf(SliderWithFight.prototype),"addEventsSliderTrack",this).call(this)}}},{key:"swipeAction",value:function swipeAction(){var i=_get(_getPrototypeOf(SliderWithFight.prototype),"getEvent",this).call(this);_get(_getPrototypeOf(SliderWithFight.prototype),"checkSliderCanBeMoved",this).call(this,i),this.allowSwipe&&(this.positionSliderTrack=this.positionPressedX-i.clientX+this.positionFinal,"touchmove"===event.type&&(this.positionX_FingetCurrentMoment_OnSlider=Math.abs(this.positionPressedX-i.clientX),this.positionY_FingetCurrentMoment_OnSlider=Math.abs(this.positionPressedY-i.clientY),_get(_getPrototypeOf(SliderWithFight.prototype),"checksOutOfBounds",this).call(this)),this.pushingSlider())}},{key:"swipeEnd",value:function swipeEnd(){_get(_getPrototypeOf(SliderWithFight.prototype),"removeEventsSliderTrack",this).call(this),this.isScrollingSlider=0,this.setsPropertyAllowSwipe(),Math.abs(this.singleSwipe)<=this.percentForSuccessfulScrolling?this.newHandlerFight.returnsSliderBack(this.currentSlide,this.speed):(this.checksIfSliderNeedsPromoted(),this.singleSwipe=0)}},{key:"run",value:function run(){this.sliderTrack.addEventListener("mousedown",this._swipeStart),this.sliderTrack.addEventListener("touchstart",this._swipeStart,{passive:1}),this.sliderTrack.style.transform="translate3d(0px, 0px, 0px)"}}])}();