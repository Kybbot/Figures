class App {
	constructor(storage) {
		this.storage = storage;
	}

	init() {
		const content = new Content('#content', this.storage);
		content.render();

		new Panel('#panel', newBlock => {
			this.storage.setObject(newBlock);
			content.render();
		});
	}
}