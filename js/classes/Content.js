class Content {
	constructor(selector, storage) {
		this.el = document.querySelector(selector);  // Выбираем элемент на странице
		this.storage = storage;
	}

	// Добавление всех фигур на экран
	render() {
		this.el.innerHTML = ''; // Очищаем выбранный элемент на странице

		let data = this.storage.getData();
		data.forEach(item => {
			this.el.append( new Figure(item.type, item.name, item.styles, this.storage).createFigure() ); // Добавляем в выбранный элемент фигуры
		})
	}
}