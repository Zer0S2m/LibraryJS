export class SliderBeforeAfter {
    /**
	Слайдер до-после.
	* @param slider -> block "slider-before-after" ( type -> HTMLElement )
	* @param options -> custom settings ( type -> Object )
    */

	constructor(slider, options) {
		this.slider = slider;
		this.options = options;

		this.sliderSwitch = this.slider.querySelector(".slider-switch");

		this.positionSliderSwitch = 0;

		this.positionPressedX;

		this._pushingSliderSwitch = () => { this.pushingSliderSwitch(); };

		this.addOptions();
	}

	addOptions() {

	}


	// Вспомогательные методы.
	getEvent() {
		return (event.type.search('touch') != -1) ? event.touches[0] : event;
	}

	removeEventsSliderSwitch() {
		this.sliderSwitch.removeEventListener("mousemove", this._pushingSliderSwitch);
		this.sliderSwitch.removeEventListener("touchmove", this._pushingSliderSwitch);
	}


	// Функционал слайдера.
	pushingSliderSwitch() {
		const evt = this.getEvent();

		this.positionSliderSwitch = this.positionPressedX - evt.clientX;

		this.sliderSwitch.style.left = `${-this.positionSliderSwitch}px`;
	}

	swipeStart() {
		const evt = this.getEvent();

		this.positionPressedX = evt.clientX;

		this.sliderSwitch.addEventListener("mousemove", this._pushingSliderSwitch);
		this.sliderSwitch.addEventListener("touchmove", this._pushingSliderSwitch, { passive: true });
	}

	swipeEnd() {
		this.removeEventsSliderSwitch();
	}


	run() {
		this.sliderSwitch.addEventListener("mousedown", () => { this.swipeStart(); });
		this.sliderSwitch.addEventListener("touchstart", () => { this.swipeStart(); }, { passive: true });

		this.sliderSwitch.addEventListener("mouseup", () => { this.swipeEnd(); });
		this.sliderSwitch.addEventListener("touchend", () => { this.swipeEnd(); });
	}
};
