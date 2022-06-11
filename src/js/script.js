import { $ } from './dom-element.js'
import { createTemplate, createTemplateInProgress, createTemplateDone } from './templates.js'

const time = $('.header__time')
const todoListElement = $('.todo-list')//СПИСОК ТУДУШЕК
const todoListInProgressElement = $('.inprogress-list')// СПИСОК IN PROCESS
const todoListDoneElement = $('.done-list')// СПИСОК DONE

const todoCounterElement = $('.board__header-counter')// ПОДСЧЕТ ТУДУШЕК
const todoCounterInProgressElement = $('.board__header-counter2')// ПОДСЧЕТ ТУДУШЕК IN  PROCESS
const todoCounterDoneElement = $('.board__header-counter3')// ПОДСЧЕТ ТУДУШЕК DONE

const buttonAddCardElement = $('.btn-add')// КНОПКА ДОБАВЕНИЯ КАРТОЧЕК
const buttonCancelPopUpElement = $('.btn-cancel')//КНОПКА ОТМЕНЫ КАРТОЧКИ

const deleteAllDoneButtonElement = $('.btn-deleteAll')
const formElement = $('#form') // ВСЯ ФОРМА ПОПАПА
const todoTitlePopUpElement = $('input')// ЗАГОЛОВОК ПОПАПА
const todoDescriptionPopUpElement = $('textarea')// ОПИСАНИЕ ПОПАПА
const userSelectPopUpElement = $('#select')// ВЫБОР ИСПОЛНИТЕЛЯ ПОПАПА

//----------------ТЕКУЩЕЕ ВРЕМЯ-----------------------------------------------------------------// ТЕКУЩЕЕ ВРЕМЯ РАБОТАЕТ
const showTime = function () {

	let date = new Date()
	let hours = date.getHours()
	let hoursOuter = (hours < 10) ? '0' + hours : hours
	let minutes = date.getMinutes()
	let minutesOuter = (minutes < 10) ? '0' + minutes : minutes
	time.innerHTML = `${hoursOuter}:${minutesOuter}`
}
setInterval(showTime)

//----------------ПОЯВЛЕНИЕ ПОПАПА---------------------------------------------------------------// ПОЯВЛЕНИЕ РАБОТАЕТ
const popUpElement = $('.popup')// МАКЕТ ПОПАПА

function showPopUp() {
	popUpElement.classList.add('show')
}
buttonAddCardElement.addEventListener('click', showPopUp)

//----------------ОТМЕНА ПОПАПА--------------------------------------------------------------------// ОТМЕНА РАБОТАЕТ

function hidePopUp() {
	popUpElement.classList.remove('show')
}
buttonCancelPopUpElement.addEventListener('click', hidePopUp)

//---------------СОХРАНЕНИЕ ДАННЫХ ИЗ ПОПАПА-------------------------------------------------------// СОХРАНЕНИЕ РАБОТАЕТ
function handleAddTodo(event) {
	event.preventDefault()

	if ((todoDescriptionPopUpElement.value.trim()) === '' || (todoDescriptionPopUpElement.value.length == 0) || (todoTitlePopUpElement.value.trim()) === '') {
		alert('Ведите все данные')
	} else {
		tasks.push(new Tasks(todoTitlePopUpElement.value, todoDescriptionPopUpElement.value, userSelectPopUpElement.value))
	}
	formElement.reset()

	hidePopUp()
	updateAndAdd()
}

formElement.addEventListener('submit', handleAddTodo)




let tasks = []

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function Tasks(title, description, user) {
	this.title = title
	this.description = description
	this.user = user
	this.createdAt = new Date()
	this.id = this.createdAt.getTime()
}

function render() {
	todoCounterElement.innerHTML = `${tasks.length}`
	todoListElement.innerHTML = ''

	tasks.forEach((item) => {
		todoListElement.innerHTML += createTemplate(item)

	});
}

render()

function uptadeLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateAndAdd() {
	uptadeLocalStorage()
	render()
}

//-----------------редактирование тудушек-------


// function handleClickEdit(event) {
// 	const target = event.target

// 	if (target.classList.contains('btn-edit')) {
// 		const todoElement = target.closest('.todo')
// 		const id = todoElement.id
// 		tasks.forEach((item,index) => {
// 			if (item.id == id) {
// 				return `<div ${item.id} class="popup" style= "display: block">
// 				<form id="form" action="">
// 					<input class="popup__title" type="text" placeholder="Title" text-nowrap value="${item.title}">
// 					<div class="popup__description">
// 						<textarea placeholder="Description" name="Description" id="" cols="" rows="">${item.description}</textarea>
// 					</div>
// 					<div class="popup__solution">
// 						<select name="user" id="select">
// 							<option value="${item.user}">${item.user}</option>
// 							// <option value="Павел">Павел</option>
// 							// <option value="Виктор">Виктор</option>
// 							// <option value="Дмитрий">Дмитрий</option>
// 							// <option value="Cергей">Cергей</option>
// 						</select>

// 						<button class="popup__btn btn-confirm"> Confirm</button>
// 					</div>
// 				</form>
// 				<button class="popup__btn btn-cancel"> Cancel</button>
// 			</div> `
// 				updateAndAdd()
// 			}
// 		})
// 	}

// }
// todoListElement.addEventListener('click', handleClickEdit)


//-------------------------удаление карточки------------------------------
function handleClickRemove(event) {
	const target = event.target

	if (target.classList.contains('btn-delete')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		tasks.forEach((item, index) => {

			if (item.id == id) {
				tasks.splice(index, 1)
				updateAndAdd()
			}
		})
	}
}
todoListElement.addEventListener('click', handleClickRemove)


//----------------------переброс в IN PROGRESS-------------------------
let inProgress = []

!localStorage.inProgress ? inProgress = [] : inProgress = JSON.parse(localStorage.getItem('inProgress'))

function uptadeLocalStorageInProgress() {
	localStorage.setItem('inProgress', JSON.stringify(inProgress))
}

function renderInProgress() {
	todoCounterInProgressElement.innerHTML = `${inProgress.length}`
	todoListInProgressElement.innerHTML = ''

	inProgress.forEach((item) => {
		todoListInProgressElement.innerHTML += createTemplateInProgress(item)
	});
}

function updateAndAddInProgress() {
	renderInProgress()
	uptadeLocalStorageInProgress()
}

function handleDuttonSolve(event) {
	const target = event.target

	if (target.classList.contains('btn-solve')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		tasks.forEach((item, index) => {
			if (item.id == id) {
				tasks.splice(index, 1)
				inProgress.push(item)
				console.log(inProgress)
				updateAndAddInProgress()
				updateAndAdd()
			}
		})
	}
}

updateAndAddInProgress()

todoListElement.addEventListener('click', handleDuttonSolve)

//----------------------переброс в DONE-------------------------
let done = []

!localStorage.done ? done = [] : done = JSON.parse(localStorage.getItem('done'))

function uptadeLocalStorageDone() {
	localStorage.setItem('done', JSON.stringify(done))
}

function renderDone() {
	todoCounterDoneElement.innerHTML = `${done.length}`
	todoListDoneElement.innerHTML = ''

	done.forEach((item) => {
		todoListDoneElement.innerHTML += createTemplateDone(item)
	});
}

function updateAndAddDone() {
	renderDone()
	uptadeLocalStorageDone()
}

function handleDuttonComplete(event) {
	const target = event.target

	if (target.classList.contains('btn-complete')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		inProgress.forEach((item, index) => {
			if (item.id == id) {
				inProgress.splice(index, 1)
				done.push(item)
				console.log(inProgress)
				updateAndAddDone()
				updateAndAddInProgress()

			}
		})
	}
}

updateAndAddDone()

todoListInProgressElement.addEventListener('click', handleDuttonComplete)


//----------------------------возврат в TODO-------------------------------------------

function handleDuttonBack(event) {
	const target = event.target

	if (target.classList.contains('btn-back')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		inProgress.forEach((item, index) => {
			if (item.id == id) {
				inProgress.splice(index, 1)
				tasks.push(item)
				console.log(tasks)
				updateAndAddInProgress()
				updateAndAdd()
			}
		})
	}
}

todoListInProgressElement.addEventListener('click', handleDuttonBack)
//-------------------------удаление карточки в DONE------------------------------
function handleClickRemove(event) {
	const target = event.target

	if (target.classList.contains('btn-delete')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		done.forEach((item, index) => {

			if (item.id == id) {
				done.splice(index, 1)
				updateAndAddDone()
			}
		})
	}
}
todoListDoneElement.addEventListener('click', handleClickRemove)

//--------------------------УДАЛЕНИЕ ВСЕХ КАРТОЧЕК в DONE ---------------------------------

deleteAllDoneButtonElement.addEventListener('click', () => {
	const warning = confirm ('Do you really want delete all completed tasks?')

	if(warning){
		done = []
	}
	updateAndAddDone()
})