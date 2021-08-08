class BubbleUtils {
	static get NORMAL_COLOR() {
		return 51;
	}

	static get FIRST_COLOR() {
		return [0, 255, 0];
	}

	static get LAST_COLOR() {
		return [255, 0, 0];
	}

	static get TEXT_COLOR() {
		return 255;
	}

	static get LINK_COLOR() {
		return [0, 0, 0];
	}

	static get LINK_WANDER_COLOR() {
		return [255, 0, 0];
	}

	static get TEXT_OUTLINE_COLOR() {
		return 0;
	}

	static get TEXT_OUTLINE_WEIGHT() {
		return 3;
	}

	static get CIRCLE_OUTLINE_COLOR() {
		return 0;
	}

	static get CIRCLE_OUTLINE_WEIGHT() {
		return 1;
	}

	static get BUBBLE_SIZE() {
		return 30;
	}

	static createBubble() {}

	static link(bubble1, bubble2, isWandering) {
		stroke(this.LINK_COLOR);
		if (isWandering) {
			stroke(this.LINK_WANDER_COLOR);
		}
		line(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
	}
}
