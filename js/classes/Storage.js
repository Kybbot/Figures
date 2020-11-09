class Storage {
	constructor() {
		// Создаем локальное хранилище если его нету
		if (!localStorage.getItem('data')) {
			const figures = [];
			const json = JSON.stringify(figures);
			localStorage.setItem('data', json);
		}
	
		// Получаем данные из локального хранилища
		this.storage = localStorage.getItem('data');
	}

	// Получение массива данных из хранилища
	getData() {
		const figures = JSON.parse(localStorage.getItem('data'));
		return figures;
	}

	// Получение конкретного обьекта из массива данных
	getObject(name) {
		const figures = this.getData();
		return figures.find(item => item.name === name);
	}

	// Добавление обьекта в массив данных
	setObject(obj) {
		const figures = JSON.parse(localStorage.getItem('data'));

		figures.push(obj);
	
		const json = JSON.stringify(figures);
		localStorage.setItem('data', json);
	}

	// Обновление массива данных
	setData(arr) {
		const json = JSON.stringify(arr);
		localStorage.setItem('data', json);
	}

}