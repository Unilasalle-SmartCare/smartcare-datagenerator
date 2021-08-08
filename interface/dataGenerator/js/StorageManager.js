class StorageManager {
	static save(array) {
		let json = JSON.stringify(array);
		saveJSON(json, "dataset");
	}
	static load() {
		loadJSON(url);
	}

	static load(file) {
		let newManager = new PathManager();
		let paths = this.handleJSON(file);
		paths.forEach((path) => {
			let bubble = new Bubble(path.x, path.y);
			let date = path.date;
			newManager.add(date, bubble, path.stress);
		});
		return newManager;
	}

	static handleJSON(file) {
		try {
			if (file.type === "application") {
				let json = JSON.parse(file.data);
				return json;
			}
		} catch (error) {
			console.log(`Houve um erro ao carregar os dados (0x69) - ${error}`);
		}
	}

	static handleImage(file) {
		try {
			if (file.type === "image") {
				img = loadImage(file.data);
			} else {
				img = null;
			}
			return img;
		} catch (error) {
			console.log(`Houve um erro ao carregar a imagem (0x16) - ${error}`);
		}
	}
}
