'use strict';

(function ($) {
    $.fn.tilt = function (options) {
        var _this2 = this;

        /**
         * RequestAnimationFrame
         */
        var requestTick = function requestTick() {
            if (this.ticking) return;
            requestAnimationFrame(updateTransforms.bind(this));
            this.ticking = true;
        };

        /**
         * Bind mouse movement evens on instance
         */
        var bindEvents = function bindEvents() {
            $(this).on('mousemove', mouseMove);
            $(this).on('mouseenter', mouseEnter);
            if (this.settings.reset) $(this).on('mouseleave', mouseLeave);
        };

        /**
         * Set transition only on mouse leave and mouse enter so it doesn't influence mouse move transforms
         */
        var setTransition = function setTransition() {
            var _this = this;

            if (this.timeout !== undefined) clearTimeout(this.timeout);
            $(this).css({ 'transition': this.settings.speed + 'ms ' + this.settings.easing });
            this.timeout = setTimeout(function () {
                $(_this).css({ 'transition': '' });
            }, this.settings.speed);
        };

        /**
         * When user mouse enters tilt element
         */
        var mouseEnter = function mouseEnter() {
            this.ticking = false;
            $(this).css({ 'will-change': 'transform' });
            setTransition.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseEnter");
        };

        /**
         * Return the x,y position of the muose on the tilt element
         * @returns {{x: *, y: *}}
         */
        var getMousePositions = function getMousePositions() {
            if (event === undefined) {
                event = {
                    pageX: $(this).offset().left + $(this).width() / 2,
                    pageY: $(this).offset().top + $(this).height() / 2
                };
            }
            return { x: event.pageX, y: event.pageY };
        };

        /**
         * When user mouse moves over the tilt element
         */
        var mouseMove = function mouseMove() {
            this.mousePositions = getMousePositions();
            requestTick.call(this);
        };

        /**
         * When user mouse leaves tilt element
         */
        var mouseLeave = function mouseLeave() {
            setTransition.call(this);
            this.reset = true;
            requestTick.call(this);

            // Trigger change event
            $(this).trigger("tilt.mouseLeave");
        };

        /**
         * Get tilt values
         *
         * @returns {{x: tilt value, y: tilt value}}
         */
        var _getValues = function _getValues() {
            var width = this.clientWidth;
            var height = this.clientHeight;
            var percentageX = (this.mousePositions.x - $(this).offset().left) / width;
            var percentageY = (this.mousePositions.y - $(this).offset().top) / height;
            // x or y position inside instance / width of instance = percentage of position inside instance * the max tilt value
            var tiltX = (this.settings.maxTilt / 2 - percentageX * this.settings.maxTilt).toFixed(2);
            var tiltY = (percentageY * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2);
            // Return x & y tilt values
            return { tiltX: tiltX, tiltY: tiltY, 'percentageX': percentageX * 100, 'percentageY': percentageY * 100 };
        };

        /**
         * Update tilt transforms on mousemove
         */
        var updateTransforms = function updateTransforms() {
            this.transforms = _getValues.call(this);

            if (this.reset) {
                this.reset = false;
                $(this).css('transform', 'perspective(' + this.settings.perspective + 'px) rotateX(0deg) rotateY(0deg)');
                return;
            } else {
                $(this).css('transform', 'perspective(' + this.settings.perspective + 'px) rotateX(' + (this.settings.axis === 'x' ? 0 : this.transforms.tiltY) + 'deg) rotateY(' + (this.settings.axis === 'y' ? 0 : this.transforms.tiltX) + 'deg) scale3d(' + this.settings.scale + ',' + this.settings.scale + ',' + this.settings.scale + ')');
            }

            // Trigger change event
            $(this).trigger("change", [this.transforms]);

            this.ticking = false;
        };
        /**
         * Public methods
         * @type {{getValues: (()), reset: (()), destroy: (())}}
         */
        this.methods = {
            getValues: function getValues() {
                var results = [];
                $(_this2).each(function () {
                    this.mousePositions = getMousePositions();
                    results.push(_getValues.call(this));
                });
                return results;
            },

            reset: function (_reset) {
                function reset() {
                    return _reset.apply(this, arguments);
                }

                reset.toString = function () {
                    return _reset.toString();
                };

                return reset;
            }(function () {
                mouseLeave();
                setTimeout(function () {
                    reset = false;
                }, _this2.settings.transition);
            }),

            destroy: function destroy() {
                $(_this2).each(function () {
                    $(this).css({ 'will-change': '', 'transform': '' });
                    $(this).off('mousemove mouseenter mouseleave');
                });
            }
        };

        /**
         * Loop every instance
         */
        return this.each(function () {
            var _this3 = this;

            /**
             * Default settings merged with user settings
             * Can be set trough data attributes or as parameter.
             * @type {*}
             */
            this.settings = $.extend({
                maxTilt: $(this).is('[data-tilt-max]') ? $(this).data('tilt-max') : 20,
                perspective: $(this).is('[data-tilt-perspective]') ? $(this).data('tilt-perspective') : 1000,
                easing: $(this).is('[data-tilt-easing]') ? $(this).data('tilt-easing') : 'cubic-bezier(.03,.98,.52,.99)',
                scale: $(this).is('[data-tilt-scale]') ? $(this).data('tilt-scale') : '1',
                speed: $(this).is('[data-tilt-speed]') ? $(this).data('tilt-speed') : '300',
                transition: $(this).is('[data-tilt-transition]') ? $(this).data('tilt-transition') : true,
                axis: $(this).is('[data-tilt-axis]') ? $(this).data('tilt-axis') : null,
                reset: $(this).is('[data-tilt-reset]') ? $(this).data('tilt-reset') : true
            }, options);

            this.init = function () {
                bindEvents.call(_this3);
            };

            // Init
            this.init();
        });
    };
})(jQuery);
//# sourceMappingURL=tilt.jquery.js.map
