const createTemplate = ({ title, description, user, createdAt, id }) => {
	const newdate = getTimeAndDate(createdAt)
	return ` 
				<div class="todo" id="${id}">
					<div class="todo__buttons">
						<button class="todo__btn btn-edit">EDIT</button>
						<button class="todo__btn btn-delete">DELETE</button>
					</div>
					<div class="todo__content">
						<div class="todo__content-text">
							<div class="todo__content-title">${title}</div>
							<div class="todo__content-description">${description}</div>
						</div>
						<button class="todo__btn btn-solve">></button>
					</div>
					<div class="todo__info">
						<div class="todo__info-user">${user}</div>
						<div class="todo__info-date">${newdate}</div>
					</div>
				</div>
			 `
}

const createTemplateInProgress = ({ title, description, user, createdAt, id }) => {
	const newdate = getTimeAndDate(createdAt)
	return ` 
				<div class="todo inprogress" id="${id}">
					<div class="todo__buttons">
						<button class="todo__btn btn-back">BACK</button>
						<button class="todo__btn btn-complete">COMPLETE</button>
					</div>
					<div class="todo__content">
						<div class="todo__content-text">
							<div class="todo__content-title">${title}</div>
							<div class="todo__content-description">${description}</div>
						</div>

					</div>
					<div class="todo__info">
						<div class="todo__info-user">${user}</div>
						<div class="todo__info-date">${newdate}</div>
					</div>
				</div>
			 `
}

const createTemplateDone = ({ title, description, user, createdAt, id }) => {
	const newdate = getTimeAndDate(createdAt)
	return ` 
				<div class="todo done" id="${id}">
					<div class="todo__buttons">
						<button class="todo__btn btn-delete">DELETE</button>
					</div>
					<div class="todo__content">
						<div class="todo__content-text">
							<div class="todo__content-title">${title}</div>
							<div class="todo__content-description">${description}</div>
						</div>

					</div>
					<div class="todo__info">
						<div class="todo__info-user">${user}</div>
						<div class="todo__info-date">${newdate}</div>
					</div>
				</div>
			 `
}



const createTemplatePopUp = ({ title, description, user, id }) => {
	return `<div id="${id}" class="popup show">
				<form id="form" action="">
					<input class="popup__title" type="text" placeholder="Title" text-nowrap value="${title}">
					<div class="popup__description">
						<textarea placeholder="Description" name="Description" id="" cols="" rows="">${description}</textarea>
					</div>
					<div class="popup__solution">
						<select name="user" id="select">
							<option value="${user}">${user}</option>
							<option value="Павел">Павел</option>
							<option value="Виктор">Виктор</option>
							<option value="Дмитрий">Дмитрий</option>
							<option value="Cергей">Cергей</option>
						</select>
						<button class="popup__btn btn-confirm"> Confirm</button>
					</div>
				</form>
				<button class="popup__btn btn-cancel"> Cancel</button>
			</div> `
}

	function getTimeAndDate(date) {
		if (typeof (date) == 'string') {
			date = new Date(date)
		}
		let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
		let month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		let year = date.getFullYear()
		return ` ${day}.${month}.${year}`
	}

	export { createTemplate, createTemplateInProgress, createTemplateDone,createTemplatePopUp }