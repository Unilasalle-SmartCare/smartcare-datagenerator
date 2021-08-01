class Bubble {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = BubbleUtils.BUBBLE_SIZE;
	}

	renderCircle(color) {
		stroke(BubbleUtils.CIRCLE_OUTLINE_COLOR);
		strokeWeight(BubbleUtils.CIRCLE_OUTLINE_WEIGHT);
		fill(color);
		circle(0, 0, this.size);
	}

	renderText(str) {
		fill(BubbleUtils.TEXT_COLOR);
		stroke(BubbleUtils.TEXT_OUTLINE_COLOR);
		strokeWeight(BubbleUtils.TEXT_OUTLINE_WEIGHT);
		textAlign(CENTER, CENTER);
		textSize(this.size / 2);
		text(str, 0, 0);
	}

	show(order = "", color) {
		translate(this.x, this.y);

		this.renderCircle(color);
		this.renderText(order);

		resetMatrix();
	}

	getSerializable(date) {
		return {
			date: date || null,
			x: this.x,
			y: this.y,
		};
	}
}
