class Slider {
    index;

    constructor(slideContainerId, slidesElementClass, slideElementClass, nextBtnId, prevBtnId, interval) {
        this.slideContainerId = slideContainerId;
        this.slidesElementClass = slidesElementClass;
        this.slideElementClass = slideElementClass;
        this.nextBtnId = nextBtnId;
        this.prevBtnId = prevBtnId;
        this.interval = interval;
        this.index = 0;
        this.slideIndex = null;
        this.startSlide();
        this.stopSliderMouseHover();
        this.resumeSliderMouseLeave();
        this.next();
        this.prev();
    }

    startSlide() {
        this.slideIndex = setInterval(() => {
            this.moveToNextSlide()
        }, this.interval)
    }

    slideContainerWidth() {
        return document.querySelector(this.slideContainerId).clientWidth;
    }

    slideWidth() {
        return document.querySelector(this.slideElementClass).clientWidth;
    }

    slidesPerContainer() {
        return Math.round(this.slideContainerWidth() / this.slideWidth());
    }

    slidesLength() {
        return document.querySelectorAll(this.slideElementClass).length;
    }

    moveToNextSlide() {
        if (this.index <= this.slidesLength() - 1) {
            this.index += this.slidesPerContainer();
            if (this.index >= this.slidesLength() - 1) {
                this.index = 0
            }
        } else {
            this.index = 0
        }
        document.querySelector(this.slidesElementClass).style.transform = `translateX(${-this.slideWidth() * this.index}px)`;
        document.querySelector(this.slidesElementClass).style.transition = '1s';
    }

    moveToPreviousSlide() {
        if (this.index <= this.slidesLength() - 1) {
            this.index = 0;
        } else {
            this.index -= this.slidesPerContainer();
        }
        document.querySelector(this.slidesElementClass).style.transform = `translateX(${-this.slideWidth(this.index) * this.index}px)`;
        document.querySelector(this.slidesElementClass).style.transition = '1s';
    }

    next() {
        document.querySelector(this.nextBtnId).addEventListener('click',this.moveToNextSlide.bind(this), false)
    }

    prev() {
        document.querySelector(this.prevBtnId).addEventListener('click', this.moveToPreviousSlide.bind(this), false);
    }

    stopSliderMouseHover() {
        document.querySelector(this.slideContainerId).addEventListener('mouseenter', () => {
            clearInterval(this.slideIndex);
        });
    }

    resumeSliderMouseLeave() {
        document.querySelector(this.slideContainerId).addEventListener('mouseleave', this.startSlide.bind(this))

    }
}
