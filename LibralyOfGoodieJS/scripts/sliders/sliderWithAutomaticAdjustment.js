function _classCallCheck(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,i){for(var t=0;t<i.length;t++){var s=i[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,i,t){return i&&_defineProperties(e.prototype,i),t&&_defineProperties(e,t),e}var SliderWithAutomaticAdjustment=function(){function SliderWithAutomaticAdjustment(e,i){var t=this;_classCallCheck(this,SliderWithAutomaticAdjustment),this.slider=e,this.options=i,this.sliderTrack=this.slider.querySelector(".slider-track"),this.currentSlide=0,this.numberSlides=this.sliderTrack.querySelectorAll(".slide"),this.positionPressedX,this.positionPressedY,this.positionFingerPressSliderX,this.positionFingerPressSliderY,this.positionX_FingetCurrentMoment_OnSlider,this.positionY_FingetCurrentMoment_OnSlider,this.allowSwipe=!0,this.isScrollingSlider=!1,this._swipeStart=function(){t.swipeStart()},this._swipeAction=function(){t.swipeAction()},this._swipeEnd=function(){t.swipeEnd()},this.addOptions(),this.goingOutBoundsSlider=function(){t.swipeEnd(),t.sliderTrack.removeEventListener("mouseout",t.goingOutBoundsSlider)}}return _createClass(SliderWithAutomaticAdjustment,[{key:"addOptions",value:function addOptions(){this.speed=this.options.speed?this.options.speed:200}},{key:"getEvent",value:function getEvent(){return-1!=event.type.search("touch")?event.touches[0]:event}},{key:"checksOutOfBounds",value:function checksOutOfBounds(){(this.positionX_FingetCurrentMoment_OnSlider>=this.positionFingerPressSliderX&&0<this.positionSliderTrack-this.positionFinal||this.positionX_FingetCurrentMoment_OnSlider>=this.sliderWidth-this.positionFingerPressSliderX&&this.positionSliderTrack-this.positionFinal<0)&&(this.sliderTrack.removeEventListener("touchmove",this._swipeAction),this.swipeEnd())}},{key:"removeEventsSliderTrack",value:function removeEventsSliderTrack(){this.sliderTrack.removeEventListener("mousemove",this._swipeAction),this.sliderTrack.removeEventListener("touchmove",this._swipeAction),this.sliderTrack.removeEventListener("mouseup",this._swipeEnd),this.sliderTrack.removeEventListener("touchend",this._swipeEnd)}},{key:"pushingSlider",value:function pushingSlider(){}},{key:"swipeStart",value:function swipeStart(){this.sliderTrack.addEventListener("mousemove",this._swipeAction),this.sliderTrack.addEventListener("touchmove",this._swipeAction,{passive:!0}),this.sliderTrack.addEventListener("mouseup",this._swipeEnd),this.sliderTrack.addEventListener("touchend",this._swipeEnd,{passive:!0})}},{key:"swipeAction",value:function swipeAction(){"touchmove"===event.type&&(this.positionX_FingetCurrentMoment_OnSlider=Math.abs(this.positionPressedX-evt.clientX),this.positionY_FingetCurrentMoment_OnSlider=Math.abs(this.positionPressedY-evt.clientY),this.checksOutOfBounds())}},{key:"swipeEnd",value:function swipeEnd(){this.removeEventsSliderTrack()}},{key:"run",value:function run(){this.sliderTrack.addEventListener("mousedown",this._swipeStart),this.sliderTrack.addEventListener("touchstart",this._swipeStart,{passive:!0})}}]),SliderWithAutomaticAdjustment}();