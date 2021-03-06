export class SliderSelfScrolling {
  /**
	Самопрокручиваемый слайдер.
	* @param slider - block "slider-automatic-adjustment" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
  */
	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderTrack = this.slider.querySelector(".slider-track");

		this.maximumSwipingAtSlider = 0;
		this.positionSliderTrack = 0;
		this.numberSecondsAfterStartingSlider = 0;

		this.isVisible = false;
		this.isHideSlider_For_FirstTime = false;

		this.isSwiping = true;

		if (this.options) {
			this.addOptions();
		};
	}

	addOptions() {
		this.duration = (this.options.duration) ? this.options.duration : 10;
		this.temporaryFunction = (this.options.temporaryFunction) ? this.options.temporaryFunction : "linear";
		this.delay = (this.options.delay) ? this.options.delay : 0;
		this.delayBeforeStartingAfterHiding = (this.options.delayBeforeStartingAfterHiding) ? this.options.delayBeforeStartingAfterHiding : 1.5;
		this.repeatSlider = (this.options.repeatSlider) ? this.options.repeatSlider : false;
	}

  getSpeedSliderTrack() {
    this.speedSliderTrack = this.maximumSwipingAtSlider / (this.duration);
  }

	measuresMaximumSwipeOfSlider() {
		this.maximumSwipingAtSlider = 0;

		this.sliderTrack.querySelectorAll(".slide").forEach(slide => this.maximumSwipingAtSlider += slide.offsetWidth);

		this.maximumSwipingAtSlider -= this.slider.querySelector(".slider-list").offsetWidth;
		this.positionSliderTrack = this.maximumSwipingAtSlider;
	}

	countsTimeSinceStartOfSlider() {
		this.numberSecondsAfterStartingSlider =
			(!this.isHideSlider_For_FirstTime) ?
			((this.time_2 - this.time_1) / 1000 - this.delay) :
			((this.time_2 - this.time_1) / 1000) - this.delayBeforeStartingAfterHiding;
		this.numberSecondsAfterStartingSlider = this.numberSecondsAfterStartingSlider.toFixed(2);

		this.duration -= this.numberSecondsAfterStartingSlider;

		this.resetTimers();
	}

	calculateDistanceAfterStartingSlider() {
		this.positionSliderTrack = (!this.isHideSlider_For_FirstTime) ?
				this.numberSecondsAfterStartingSlider * this.speedSliderTrack :
				this.positionSliderTrack + this.numberSecondsAfterStartingSlider * this.speedSliderTrack;
		this.positionSliderTrack = Math.round(this.positionSliderTrack);
	}

	resetTimers() {
		this.time_2 = 0;
		this.time_1 = 0;
	}

	deleteStyleSlider() {
		this.sliderTrack.removeAttribute("style");
	}

	addEventScrollWindow() {
		window.addEventListener("scroll", () => {
			this.countsPositionSlider_Window();
		});
	}

  countsPositionSlider_Window() {
		const positionSlider = {
			top: window.pageYOffset + this.slider.getBoundingClientRect().top,
			bottom: window.pageXOffset + this.slider.getBoundingClientRect().bottom,
		};

		const positionWindow = {
			top: window.pageYOffset,
			bottom: window.pageYOffset + document.documentElement.clientHeight
		};

		this.checks_If_SliderVisible(positionSlider, positionWindow);
	}

	checks_If_SliderVisible(positionSlider, positionWindow) {
		if (!this.isSwiping) return;

		if (positionWindow.top - this.slider.clientHeight <= positionSlider.top &&
			positionSlider.top < positionWindow.bottom) {

			if (!this.isVisible) {
				this.time_1 = performance.now();
				this.unblockingSlider();

				if (!this.isHideSlider_For_FirstTime) {
					this.sliderTrack.addEventListener("transitionend", () => { this.prohibitsMovingSliderAfter_TheEndTransition(); });
				};
			};
			this.isVisible = true;

		} else {
			if (this.isVisible) {
				this.time_2 = performance.now();
				this.blockingSlider();

				this.isHideSlider_For_FirstTime = true;
			};
			this.isVisible = false;
		};
	}

	blockingSlider() {
		if (!this.repeatSlider) this.blockingSlider_For_OneEnd();
	}

	blockingSlider_For_OneEnd() {
		this.deleteStyleSlider();
		window.clearTimeout(this.setTimeoutStartSlider);

		if ( !this.isHideSlider_For_FirstTime && ((this.time_2 - this.time_1) / 1000) <= this.delay ||
			  this.isHideSlider_For_FirstTime && ((this.time_2 - this.time_1) / 1000) <= this.delayBeforeStartingAfterHiding) {

			this.positionSliderTrack = (this.positionSliderTrack === 1200) ? 0 : this.positionSliderTrack;

			this.resetTimers();
			return;
		};

		this.countsTimeSinceStartOfSlider();
		this.calculateDistanceAfterStartingSlider();
	}

	unblockingSlider() {
		if (!this.repeatSlider) this.unblockingSlider_For_OneEnd();
	}

	unblockingSlider_For_OneEnd() {
		if (!this.isHideSlider_For_FirstTime) {
			this.setsTransition_For_SliderOneEnd();
		};

		if (this.positionSliderTrack === 1600 && this.isHideSlider_For_FirstTime) {
			this.positionSliderTrack = 0;
		};

		this.sliderTrack.style.transform = `translate3d(-${this.positionSliderTrack}px, 0px, 0px)`;

		if (this.isHideSlider_For_FirstTime) {
			this.setTimeoutStartSlider = setTimeout(() => {
				this.setsTransition_For_SliderOneEnd();
				this.sliderTrack.style.transform = `translate3d(-${this.maximumSwipingAtSlider}px, 0px, 0px)`;
			}, this.delayBeforeStartingAfterHiding * 1000);
		};
	}

	prohibitsMovingSliderAfter_TheEndTransition() {
		this.isSwiping = false;
		this.resetTimers();
	}

	setsTransition_For_SliderOneEnd() {
		if (!this.isHideSlider_For_FirstTime) {
			this.sliderTrack.style.transition = `transform ${this.duration}s ${this.temporaryFunction} ${this.delay}s`;
		} else if (this.isHideSlider_For_FirstTime) {
			this.sliderTrack.style.transition = `transform ${this.duration}s ${this.temporaryFunction}`;
		};
	}

	setsTransition_For_SliderEndLess() {
		this.slides = this.sliderTrack.children;

		const timeToPassOneSlide = this.duration / (this.sliderTrack.querySelectorAll(".slide").length - 1);

		this.sliderTrack.style.transition = `transform ${timeToPassOneSlide}s ${this.temporaryFunction} ${this.delay}s`;
		this.sliderTrack.style.transform = `translate3d(-${this.slider.clientWidth}px, 0px, 0px)`;

		this.sliderTrack.addEventListener("transitionend", () => { this.transitionEndAtSlider(timeToPassOneSlide); });
	}

	transitionEndAtSlider(timeToPassOneSlide) {
		this.movesFirstSlide_TheEnd();

		this.nullifiesCssSliderTrack();
		setTimeout(() => {
			this.setsStyle_For_SliderEndLess(timeToPassOneSlide);
		}, 0);
	}

	movesFirstSlide_TheEnd() {
		const firstSlide = this.slides[0];
		firstSlide.remove();

		this.sliderTrack.append(firstSlide);
	}

	calculatesTransitTimeOneSlide() {
		const timeToPassOneSlide = this.duration / (this.sliderTrack.querySelectorAll(".slide").length - 1);
		return timeToPassOneSlide;
	}

	setsInteval_For_EndLessSlider(timeToPassOneSlide) {
		setInterval(() => {
			this.movesFirstSlide_TheEnd();
			this.nullifiesCssSliderTrack();
		}, timeToPassOneSlide);
	}

	nullifiesCssSliderTrack() {
		this.sliderTrack.style.transition = "none";
		this.sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
	}

	setsStyle_For_SliderEndLess(timeToPassOneSlide) {
		this.sliderTrack.style.transition = `transform ${timeToPassOneSlide}s ${this.temporaryFunction}`;
		this.sliderTrack.style.transform = `translate3d(-${this.slider.clientWidth}px, 0px, 0px)`;
	}

	run() {
		this.measuresMaximumSwipeOfSlider();
		this.getSpeedSliderTrack();

		this.countsPositionSlider_Window();

		this.addEventScrollWindow();
	}
};
