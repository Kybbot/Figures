let target = '';

class Figure {
	constructor(type, name, styles, storage) {
		this.type = type;
		this.name = name;
		this.styles = styles;
		this.storage = storage;
	}

	// Создание фигуры
	createFigure() {
		this.element = document.createElement('div');
		this.element.classList.add('el', `${this.type}`);
		this.element.style = `${this.css(this.styles)}`;
		this.element.dataset.name = this.name;

		this.element.addEventListener('click', () => this.move());

		return this.element;
	}

	// Движение фигуры
	move() {
		target = this.name;

		const obj = this.storage.getObject(target);
		const { styles: {top, left, transform} } = obj;
		
		let y = top.replace(/[^-0-9]/gim,'');
		let x = left.replace(/[^-0-9]/gim,'');
		let angle = transform.replace(/[^-0-9]/gim,'');

		this.element.style.top = top;
		this.element.style.left = left;

		window.addEventListener('keydown', (event) => {
			
			if (target != this.name) return;

			const keyCode = event.code;

			switch (keyCode) {
				case 'ArrowDown':
					y++;
					this.element.style.top = y + 'px';
					break;
				case 'ArrowUp':
					y--;
					this.element.style.top = y + 'px';
					break;
				case 'ArrowLeft':
					x--;
					this.element.style.left = x + 'px';
					break;
				case 'ArrowRight':
					x++;
					this.element.style.left = x + 'px';
					break;
				case 'KeyQ':
					angle--;
					this.element.style.transform = `rotate(${angle}deg)`;
					break;
				case 'KeyE':
					angle++;
					this.element.style.transform = `rotate(${angle}deg)`;
					break;
				}
				
				this.save(x, y, angle,  target);
			});
	}

	// Сохранение координат фигуры
	save(x, y, angle, name) {

		let figures = this.storage.getData();
		let obj = figures.find(item => item.name === name);
		let index = figures.findIndex(item => item.name === name);

		obj.styles.top = y + 'px';
		obj.styles.left = x + 'px';
		obj.styles.transform = `rotate(${angle}deg)`;

		figures.splice(index, 1, obj);

		this.storage.setData(figures);

	}

	css(styles = {}) {
		if (typeof styles === 'string') return styles;
		return Object.keys(styles).map(key => `${key}: ${styles[key]}`).join(';');
	}

}