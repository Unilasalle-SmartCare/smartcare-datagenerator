class Path {
	constructor() {
		this.bubbleList = new LinkedList();
		this.wandering = appVue.wandering;
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
		while (currentNode) {
			let nextNode = currentNode.next;
			let currentBubble = currentNode.data;
			let nextBubble = nextNode || null;
			if (nextBubble) {
				nextBubble = nextBubble.data;
				BubbleUtils.link(currentBubble, nextBubble);
			}

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
			return 1;
		}

		let currentNode = this.bubbleList.head;

		while (currentNode.next) {
			// While not at the end of the list, iterate through it
			currentNode = currentNode.next;
		}

		currentNode.next = newNode;

		return 1;
	}
}
