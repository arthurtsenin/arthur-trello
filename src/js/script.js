import { $, $$ } from './dom-element.js'
import {
	createTemplate,
	createTemplateInProgress,
	createTemplateDone,
	createTemplatePopUp
} from './templates.js'

const time = $('.header__time')
const todoListElement = $('.todo-list')//СПИСОК TODO
const todoListInProgressElement = $('.inprogress-list')// СПИСОК IN PROCESS
const todoListDoneElement = $('.done-list')// СПИСОК DONE

const todoCounterElement = $('.board__header-counter')// ПОДСЧЕТ TODO
const todoCounterInProgressElement = $('.board__header-counter2')// ПОДСЧЕТ  IN PROCESS
const todoCounterDoneElement = $('.board__header-counter3')// ПОДСЧЕТ DONE

const buttonAddCardElement = $('.btn-add')// КНОПКА ДОБАВЕНИЯ TODO
const deleteAllDoneButtonElement = $('.btn-deleteAll')// КНОПКА УДАЛЕНИЯ ВСЕХ DONE  

const popUpElement = $('.popup')// МАКЕТ POPUP
const formElement = $('#form') // ВСЯ ФОРМА POPUP
const todoTitlePopUpElement = $('input')// ЗАГОЛОВОК POPUP
const todoDescriptionPopUpElement = $('textarea')// ОПИСАНИЕ POPUP
const userSelectPopUpElement = $('#select')// ВЫБОР ИСПОЛНИТЕЛЯ POPUP
const buttonCancelPopUpElement = $('.btn-cancel')//КНОПКА ОТМЕНЫ POPUP

let tasks = []
let inProgress = []
let done = []
//----------------ТЕКУЩЕЕ ВРЕМЯ-----------------------------------------------------------------// ТЕКУЩЕЕ ВРЕМЯ РАБОТАЕТ
function showTime() {

	let date = new Date()
	let hours = date.getHours()
	let hoursOuter = (hours < 10) ? '0' + hours : hours
	let minutes = date.getMinutes()
	let minutesOuter = (minutes < 10) ? '0' + minutes : minutes
	time.innerHTML = `${hoursOuter}:${minutesOuter}`
}
setInterval(showTime)

//----------------ПОЯВЛЕНИЕ ПОПАПА---------------------------------------------------------------// ПОЯВЛЕНИЕ РАБОТАЕТ

function handleClickButtonShowPopUp() {
	popUpElement.classList.add('show')
}

buttonAddCardElement.addEventListener('click', handleClickButtonShowPopUp)

//----------------ОТМЕНА ПОПАПА--------------------------------------------------------------------// ОТМЕНА РАБОТАЕТ

function handleClickButtonHidePopUp() {
	popUpElement.classList.remove('show')
}
buttonCancelPopUpElement.addEventListener('click', handleClickButtonHidePopUp)

//---------------СОХРАНЕНИЕ ДАННЫХ ИЗ ПОПАПА-------------------------------------------------------// СОХРАНЕНИЕ РАБОТАЕТ
function handleSubmitButtonAddTodo(event) {
	event.preventDefault()

	if ((todoDescriptionPopUpElement.value.trim()) === '' || (todoDescriptionPopUpElement.value.length == 0) || (todoTitlePopUpElement.value.trim()) === '') {
		alert('Введите все данные')
	} else {
		tasks.push(new Tasks(todoTitlePopUpElement.value, todoDescriptionPopUpElement.value, userSelectPopUpElement.value))
	}
	formElement.reset()

	handleClickButtonHidePopUp()
	updateAndAdd()
}

formElement.addEventListener('submit', handleSubmitButtonAddTodo)


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

//-----------------редактирование тудушек-------------------------------------------------------НЕ РАБОТАЕТ!!!!!!!

function handleClickButtonEdit(event) {
	const target = event.target

	if (target.classList.contains('btn-edit')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id
		tasks.forEach((item, index) => {
			if (item.id == id) {
				todoListDoneElement.innerHTML += createTemplatePopUp(item)
			}
		})
	}
}
todoListElement.addEventListener('click', handleClickButtonEdit)

//-------------------------удаление карточки------------------------------
function handleClickButtonRemove(event) {
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
todoListElement.addEventListener('click', handleClickButtonRemove)


//----------------------переброс в IN PROGRESS-------------------------
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

function handleClickButtonSolve(event) {
	const target = event.target

	if (target.classList.contains('btn-solve')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		tasks.forEach((item, index) => {
			if (item.id == id) {
				tasks.splice(index, 1)
				inProgress.push(item)
				updateAndAddInProgress()
				updateAndAdd()
			}
		})
	}
}

updateAndAddInProgress()

todoListElement.addEventListener('click', handleClickButtonSolve)

//---------------------------------ОГРАНИЧЕНИЕ в In PROGRESS--------------------------------НЕ РАБОТАЕТ
// function res() {

// 	const buttonSolveCardElement = $$('.btn-solve')// КНОПКИ ДОБАВЕНИЯ TODO
// 	if (inProgress.length > 2) {
// 		buttonSolveCardElement.forEach(item => item.setAttribute('disabled', ' true'))
// 	}
// 	else { buttonSolveCardElement.forEach(item => item.setAttribute('disabled', ' false')) }
// }

// res()
//----------------------переброс в DONE-------------------------

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

function handleClickButtonComplete(event) {
	const target = event.target

	if (target.classList.contains('btn-complete')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		inProgress.forEach((item, index) => {
			if (item.id == id) {
				inProgress.splice(index, 1)
				done.push(item)
				updateAndAddDone()
				updateAndAddInProgress()
			}
		})
	}
}

updateAndAddDone()

todoListInProgressElement.addEventListener('click', handleClickButtonComplete)

//----------------------------возврат в TODO-------------------------------------------

function handleClickButtonBack(event) {
	const target = event.target

	if (target.classList.contains('btn-back')) {
		const todoElement = target.closest('.todo')
		const id = todoElement.id

		inProgress.forEach((item, index) => {
			if (item.id == id) {
				inProgress.splice(index, 1)
				tasks.push(item)
				updateAndAddInProgress()
				updateAndAdd()
			}
		})
	}
}

todoListInProgressElement.addEventListener('click', handleClickButtonBack)
//-------------------------удаление карточки в DONE------------------------------
function handleClickButtonRemoveDone(event) {
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
todoListDoneElement.addEventListener('click', handleClickButtonRemoveDone)

//--------------------------УДАЛЕНИЕ ВСЕХ КАРТОЧЕК в DONE ---------------------------------

function handleClickButtonDeleteAllDone() {
	const warning = confirm('Do you really want delete all completed tasks?')

	if (warning) {
		done = []
	}
	updateAndAddDone()
}

deleteAllDoneButtonElement.addEventListener('click', handleClickButtonDeleteAllDone)

