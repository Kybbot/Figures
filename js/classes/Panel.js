class Panel {
	constructor(selector, updateCallback) {
		this.el = document.querySelector(selector); // Выбираем элемент на странице
		this.update = updateCallback;

		this.render()
	}

	render() {
		this.el.insertAdjacentHTML('afterbegin', this.form()); // Добавляем в выбранный элемент форму
		this.el.addEventListener('submit', this.add.bind(this)); // Добавляем событие для выбранного элемента
	}

	add(event) {
		event.preventDefault();

		// Считываем значения с полей формы
		const type = event.target.figure.value;
		const name = event.target.name.value;
		const width = event.target.width.value + 'px';
		const height = event.target.height.value + 'px';
		const background = event.target.bgColor.value;

		if(this.check(type, name, event.target.width.value, event.target.height.value, background)) {
			const styles = {
				width,
				height,
				background,
				top: '0',
				left: '0',
				transform: 'rotate(0)'
			}
		
			let newBlock = new Figure(type, name, styles);
		
			this.update(newBlock);
		
			event.target.name.value = '';
			event.target.width.value = '';
			event.target.height.value = '';
			event.target.bgColor.value = '';
		}

	}

	// Проверка формы на пустые поля
	check(type, name, width, height, color) {
		if (type === '') {
			alert('Выберите фигуру');
			return false
		} else if (name === '') {
			alert('Введите имя');
			return false
		} else if (width === '') {
			alert('Введите ширину');
			return false
		} else if (height === '') {
			alert('Введите высоту');
			return false
		} else if (color === '') {
			alert('Выберите цвет');
			return false
		}

		return true;
	}

	form() {
		return `
			<form>
				<h3>Добаваить фигуру</h3>
				<select name="figure">
					<option value="circle">Круг</option>
					<option value="square">Квадрат</option>
					<option value="triangle">Треугольник</option>
					<option value="trapezoid">Трапеция</option>
					<option value="parallelogram">Паралелеграмм</option>
				</select>
				<input name="name" type="text" placeholder="Имя">
				<input name="width" type="text" placeholder="Ширина">
				<input name="height" type="text" placeholder="Высота">
				<input name="bgColor" type="color">
				<button type="submit">Добавить</button>
			</form>
			<p>Для управления фигурой надо нажать на нее и использовать клавиши Up, Down, Left, Right.</p>
			<p>Для вращения использовать q и e.w</p>
		`
	}

}