"use strict";function _classCallCheck(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(i,e){for(var t=0;t<e.length;t++){var s=e[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(i,s.key,s)}}function _createClass(i,e,t){return e&&_defineProperties(i.prototype,e),t&&_defineProperties(i,t),i}var SliderSelfScrolling=function(){function SliderSelfScrolling(i,e){_classCallCheck(this,SliderSelfScrolling),this.slider=i,this.options=e,this.sliderTrack=this.slider.querySelector(".slider-track"),this.maximumSwipingAtSlider=0,this.positionSliderTrack=0,this.numberSecondsAfterStartingSlider=0,this.isVisible=!1,this.isHideSlider_For_FirstTime=!1,this.isSwiping=!0,this.options&&this.addOptions()}return _createClass(SliderSelfScrolling,[{key:"addOptions",value:function addOptions(){this.duration=this.options.duration?this.options.duration:10,this.temporaryFunction=this.options.temporaryFunction?this.options.temporaryFunction:"linear",this.delay=this.options.delay?this.options.delay:0,this.delayBeforeStartingAfterHiding=this.options.delayBeforeStartingAfterHiding?this.options.delayBeforeStartingAfterHiding:1.5,this.repeatSlider=!!this.options.repeatSlider&&this.options.repeatSlider}},{key:"getSpeedSliderTrack",value:function getSpeedSliderTrack(){this.speedSliderTrack=this.maximumSwipingAtSlider/this.duration}},{key:"measuresMaximumSwipeOfSlider",value:function measuresMaximumSwipeOfSlider(){var e=this;this.maximumSwipingAtSlider=0,this.sliderTrack.querySelectorAll(".slide").forEach(function(i){e.maximumSwipingAtSlider+=i.offsetWidth}),this.maximumSwipingAtSlider-=this.slider.querySelector(".slider-list").offsetWidth,this.positionSliderTrack=this.maximumSwipingAtSlider}},{key:"countsTimeSinceStartOfSlider",value:function countsTimeSinceStartOfSlider(){this.numberSecondsAfterStartingSlider=this.isHideSlider_For_FirstTime?(this.time_2-this.time_1)/1e3-this.delayBeforeStartingAfterHiding:(this.time_2-this.time_1)/1e3-this.delay,this.numberSecondsAfterStartingSlider=this.numberSecondsAfterStartingSlider.toFixed(2),this.duration-=this.numberSecondsAfterStartingSlider,this.resetTimers()}},{key:"calculateDistanceAfterStartingSlider",value:function calculateDistanceAfterStartingSlider(){this.positionSliderTrack=this.isHideSlider_For_FirstTime?this.positionSliderTrack+this.numberSecondsAfterStartingSlider*this.speedSliderTrack:this.numberSecondsAfterStartingSlider*this.speedSliderTrack,this.positionSliderTrack=Math.round(this.positionSliderTrack)}},{key:"resetTimers",value:function resetTimers(){this.time_1=0,this.time_2=0}},{key:"deleteStyleSlider",value:function deleteStyleSlider(){this.sliderTrack.removeAttribute("style")}},{key:"addEventScrollWindow",value:function addEventScrollWindow(){var i=this;window.addEventListener("scroll",function(){i.countsPositionSlider_Window()})}},{key:"countsPositionSlider_Window",value:function countsPositionSlider_Window(){var i={top:window.pageYOffset+this.slider.getBoundingClientRect().top,bottom:window.pageXOffset+this.slider.getBoundingClientRect().bottom},e={top:window.pageYOffset,bottom:window.pageYOffset+document.documentElement.clientHeight};this.checks_If_SliderVisible(i,e)}},{key:"checks_If_SliderVisible",value:function checks_If_SliderVisible(i,e){var t=this;this.isSwiping&&(e.top-this.slider.clientHeight<=i.top&&i.top<e.bottom?(this.isVisible||(this.time_1=performance.now(),this.unblockingSlider(),this.isHideSlider_For_FirstTime||this.sliderTrack.addEventListener("transitionend",function(){t.prohibitsMovingSliderAfter_TheEndTransition()})),this.isVisible=!0):(this.isVisible&&(this.time_2=performance.now(),this.blockingSlider(),this.isHideSlider_For_FirstTime||(this.isHideSlider_For_FirstTime=!0)),this.isVisible=!1))}},{key:"blockingSlider",value:function blockingSlider(){this.repeatSlider?this.repeatSlider&&this.blockingSlider_For_EndLess():this.blockingSlider_For_OneEnd()}},{key:"blockingSlider_For_OneEnd",value:function blockingSlider_For_OneEnd(){if(this.deleteStyleSlider(),window.clearTimeout(this.setTimeoutStartSlider),!this.isHideSlider_For_FirstTime&&(this.time_2-this.time_1)/1e3<=this.delay||this.isHideSlider_For_FirstTime&&(this.time_2-this.time_1)/1e3<=this.delayBeforeStartingAfterHiding)return this.positionSliderTrack=1200===this.positionSliderTrack?0:this.positionSliderTrack,void this.resetTimers();this.countsTimeSinceStartOfSlider(),this.calculateDistanceAfterStartingSlider()}},{key:"blockingSlider_For_EndLess",value:function blockingSlider_For_EndLess(){}},{key:"unblockingSlider",value:function unblockingSlider(){this.repeatSlider?this.repeatSlider&&this.unblockingSlider_For_EndLess():this.unblockingSlider_For_OneEnd()}},{key:"unblockingSlider_For_OneEnd",value:function unblockingSlider_For_OneEnd(){var i=this;this.isHideSlider_For_FirstTime||this.setsTransition_For_SliderOneEnd(),this.sliderTrack.style.transform="translate3d(-".concat(this.positionSliderTrack,"px, 0px, 0px)"),this.isHideSlider_For_FirstTime&&(this.setTimeoutStartSlider=setTimeout(function(){i.setsTransition_For_SliderOneEnd(),i.sliderTrack.style.transform="translate3d(-".concat(i.maximumSwipingAtSlider,"px, 0px, 0px)")},1e3*this.delayBeforeStartingAfterHiding))}},{key:"unblockingSlider_For_EndLess",value:function unblockingSlider_For_EndLess(){this.setsTransition_For_SliderEndLess()}},{key:"prohibitsMovingSliderAfter_TheEndTransition",value:function prohibitsMovingSliderAfter_TheEndTransition(){this.isSwiping=!1,this.resetTimers()}},{key:"setsTransition_For_SliderOneEnd",value:function setsTransition_For_SliderOneEnd(){this.isHideSlider_For_FirstTime?this.isHideSlider_For_FirstTime&&(this.sliderTrack.style.transition="transform ".concat(this.duration,"s ").concat(this.temporaryFunction)):this.sliderTrack.style.transition="transform ".concat(this.duration,"s ").concat(this.temporaryFunction," ").concat(this.delay,"s")}},{key:"setsTransition_For_SliderEndLess",value:function setsTransition_For_SliderEndLess(){var i=this;this.slides=this.sliderTrack.children;var e=this.duration/(this.sliderTrack.querySelectorAll(".slide").length-1);this.sliderTrack.style.transition="transform ".concat(e,"s ").concat(this.temporaryFunction," ").concat(this.delay,"s"),this.sliderTrack.style.transform="translate3d(-".concat(this.slider.clientWidth,"px, 0px, 0px)"),this.sliderTrack.addEventListener("transitionend",function(){i.transitionEndAtSlider(e)})}},{key:"transitionEndAtSlider",value:function transitionEndAtSlider(i){var e=this;this.movesFirstSlide_TheEnd(),this.nullifiesCssSliderTrack(),setTimeout(function(){e.setsStyle_For_SliderEndLess(i)},0)}},{key:"movesFirstSlide_TheEnd",value:function movesFirstSlide_TheEnd(){var i=this.slides[0];i.remove(),this.sliderTrack.append(i)}},{key:"calculatesTransitTimeOneSlide",value:function calculatesTransitTimeOneSlide(){return this.duration/(this.sliderTrack.querySelectorAll(".slide").length-1)}},{key:"setsInteval_For_EndLessSlider",value:function setsInteval_For_EndLessSlider(i){var e=this;setInterval(function(){e.movesFirstSlide_TheEnd(),e.nullifiesCssSliderTrack()},i)}},{key:"nullifiesCssSliderTrack",value:function nullifiesCssSliderTrack(){this.sliderTrack.style.transition="none",this.sliderTrack.style.transform="translate3d(0px, 0px, 0px)"}},{key:"setsStyle_For_SliderEndLess",value:function setsStyle_For_SliderEndLess(i){this.sliderTrack.style.transition="transform ".concat(i,"s ").concat(this.temporaryFunction),this.sliderTrack.style.transform="translate3d(-".concat(this.slider.clientWidth,"px, 0px, 0px)")}},{key:"run",value:function run(){this.measuresMaximumSwipeOfSlider(),this.getSpeedSliderTrack(),this.countsPositionSlider_Window(),this.addEventScrollWindow()}}]),SliderSelfScrolling}();