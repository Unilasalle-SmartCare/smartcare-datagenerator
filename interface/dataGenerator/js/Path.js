class Path {
	constructor() {
		this.bubbleList = new LinkedList();
		this.wandering = appVue.wandering;
		this.statistics = new StatisticCalculator();
	}

	isLastNode(node) {
		return !node.next;
	}

	isFirstNode(counter) {
		return counter == 1;
	}

	getBubbleColor(node, counter) {
		if (this.isFirstNode(counter)) {
			return BubbleUtils.FIRST_COLOR;
		}

		if (this.isLastNode(node)) {
			return BubbleUtils.LAST_COLOR;
		}

		return BubbleUtils.NORMAL_COLOR;
	}

	show() {
		let currentNode = this.bubbleList.head;
		let i = 1;
		//this.statistics = new StatisticCalculator();
		while (currentNode) {
			let nextNode = currentNode.next;
			let currentBubble = currentNode.data;
			let nextBubble = nextNode || null;
			if (nextBubble) {
				nextBubble = nextBubble.data;
				BubbleUtils.link(currentBubble, nextBubble, this.wandering);
			}

			//this.statistics.calculate(this.wandering);

			let bubbleColor = this.getBubbleColor(currentNode, i);
			currentBubble.show(i.toString(), bubbleColor);
			currentNode = nextNode;
			i++;
		}
	}

	toArray(date) {
		let currentNode = this.bubbleList.head;
		let path = [];
		while (currentNode) {
			let currentBubble = currentNode.data.getSerializable(date);
			currentBubble.stress = +this.wandering;
			path.push(currentBubble);
			currentNode = currentNode.next;
		}
		return path;
	}

	append(bubble) {
		let newNode = new ListNode(bubble);

		// If list is empty, insert in the head
		if (!this.bubbleList.head) {
			this.bubbleList.head = newNode;
			this.statistics = new StatisticCalculator();
			this.statistics.calculate(this.wandering);
			return 1;
		}

		let currentNode = this.bubbleList.head;
		while (currentNode) {
			// While not at the end of the list, iterate through it
			if (!currentNode.next) {
				currentNode.next = newNode;
				this.statistics.calculate(this.wandering);

				break;
			}
			currentNode = currentNode.next;
		}

		return 1;
	}

	update() {
		this.wandering = appVue.wandering;
		let currentNode = this.bubbleList.head;
		this.statistics = new StatisticCalculator();
		while (currentNode) {
			this.statistics.calculate(this.wandering);

			// While not at the end of the list, iterate through it
			if (!currentNode.next) {
				break;
			}
			currentNode = currentNode.next;
		}
	}
}
