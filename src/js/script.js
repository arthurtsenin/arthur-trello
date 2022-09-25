
import { $ } from './helper.js'

import {
  createTemplate,
  createTemplateInProgress,
  createTemplateDone
} from './templates.js'

import {
  userSelectPopUpElement,
  renderUsers,
  userSelectPopUpElementEdit,
  renderUsersEdit
} from './users.js'

import { Tasks } from './constuctor.js'

const body = $('body')
const todoListElement = $('.todo-list') // СПИСОК TODO
const todoListInProgressElement = $('.inprogress-list')// СПИСОК IN PROCESS
const todoListDoneElement = $('.done-list')// СПИСОК DONE

const todoCounterElement = $('.board__header-counter')// ПОДСЧЕТ TODO
const todoCounterInProgressElement = $('.board__header-counter2')// ПОДСЧЕТ  IN PROCESS
const todoCounterDoneElement = $('.board__header-counter3')// ПОДСЧЕТ DONE

const buttonAddCardElement = $('.btn-add')// КНОПКА ДОБАВЕНИЯ TODO
const deleteAllDoneButtonElement = $('.btn-deleteAll')// КНОПКА УДАЛЕНИЯ ВСЕХ DONE

const popUpElement = $('.popup')// МАКЕТ POPUP
const formElement = $('#add') // ВСЯ ФОРМА POPUP
const todoTitlePopUpElement = $('input')// ЗАГОЛОВОК POPUP
const todoDescriptionPopUpElement = $('textarea')// ОПИСАНИЕ POPUP
const buttonCancelPopUpElement = $('.btn-cancel')// КНОПКА ОТМЕНЫ POPUP

const formElementEdit = $('#edit') // ВСЯ ФОРМА POPUP EDIT
const popUpElementEdit = $('.popup__edit')// МАКЕТ POPUP EDIT
const todoTitlePopUpElementEdit = $('.popup__edit__title')// ЗАГОЛОВОК POPUP EDIT
const todoDescriptionPopUpElementEdit = $('.textarea__edit')// ОПИСАНИЕ POPUP EDIT
const buttonCancelPopUpElementEdit = $('.btn-cancel-edit')// КНОПКА ОТМЕНЫ POPUP EDIT

let tasks = []
let inProgress = []
let done = []

renderUsers()
renderUsersEdit()

// ----------------ПОЯВЛЕНИЕ ПОПАПА--------------------------------------------// ПОЯВЛЕНИЕ РАБОТАЕТ

function handleClickButtonShowPopUp() {
  popUpElement.classList.add('show')
}

buttonAddCardElement.addEventListener('click', handleClickButtonShowPopUp)

// ----------------ОТМЕНА ПОПАПА ПО КНОПКЕ-------------------------------------// ОТМЕНА РАБОТАЕТ

function handleClickButtonHidePopUp() {
  popUpElement.classList.remove('show')
}
buttonCancelPopUpElement.addEventListener('click', handleClickButtonHidePopUp)

//----------------ОТМЕНА ПОПАПА ПО ОКНУ БРАУЗЕРА-----------------------------// ОТМЕНА РАБОТАЕТ

function handleClickButtonHidePopUpWindow(event) {
  if (event.target == body) {
    popUpElement.classList.remove('show')
  }
}

window.addEventListener('click', handleClickButtonHidePopUpWindow)

//---------------СОХРАНЕНИЕ ДАННЫХ ИЗ ПОПАПА----------------------------------// СОХРАНЕНИЕ РАБОТАЕТ

function handleSubmitButtonAddTodo(event) {
  event.preventDefault()

  if ((todoDescriptionPopUpElement.value.trim()) === '' || (todoDescriptionPopUpElement.value.length == 0) || (todoTitlePopUpElement.value.trim()) === '') {
    alert('Введите все данные')
  } else {
    tasks.push(new Tasks(todoTitlePopUpElement.value, todoDescriptionPopUpElement.value, userSelectPopUpElement.options[userSelectPopUpElement.selectedIndex].text))
    handleClickButtonHidePopUp()
  }
  updateAndAdd()
  formElement.reset()
}

formElement.addEventListener('submit', handleSubmitButtonAddTodo)

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

function render() {
  todoCounterElement.innerHTML = `${tasks.length}`
  todoListElement.innerHTML = ''

  tasks.forEach((item) => {
    todoListElement.innerHTML += createTemplate(item)
  })
}

render()

function uptadeLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateAndAdd() {
  uptadeLocalStorage()
  render()
}

//-----------------редактирование тудушек--------------------------------------------- РАБОТАЕТ

function handleClickButtonEdit(event) {
  const target = event.target

  if (target.classList.contains('btn-edit')) {
    const todoElement = target.closest('.todo')
    const id = todoElement.id

    tasks.forEach((item, index) => {
      if (item.id == id) {
        tasks.splice(index, 1)
        updateAndAdd()
      }

      popUpElementEdit.classList.add('show')
      todoTitlePopUpElementEdit.setAttribute('value', `${item.title}`)
      todoDescriptionPopUpElementEdit.innerHTML = `${item.description}`
      uptadeLocalStorage()
    })
    buttonCancelPopUpElementEdit.style.display = "none"
  }
}

todoListElement.addEventListener('click', handleClickButtonEdit)

function handleClickButtonHidePopUpEdit() {
  popUpElementEdit.classList.remove('show')
}

buttonCancelPopUpElementEdit.addEventListener('click', handleClickButtonHidePopUpEdit)

function handleSubmitButtonEdit(event) {
  event.preventDefault()
  tasks.unshift(new Tasks(todoTitlePopUpElementEdit.value, todoDescriptionPopUpElementEdit.value, userSelectPopUpElementEdit.options[userSelectPopUpElementEdit.selectedIndex].text))
  formElementEdit.reset()

  handleClickButtonHidePopUpEdit()
  updateAndAdd()
}

formElementEdit.addEventListener('submit', handleSubmitButtonEdit)


//-------------------------удаление карточки---------------------------------

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

  if (target.classList.contains('btn-solve-progress')) {
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

// ------------------------ПЕРЕБРОС ИЗ TODO В DONE

function handleClickButtonSolveDone(event) {
  const target = event.target

  if (target.classList.contains('btn-solve-done')) {
    const todoElement = target.closest('.todo')
    const id = todoElement.id

    tasks.forEach((item, index) => {
      if (item.id == id) {
        tasks.splice(index, 1)
        done.push(item)
        updateAndAddDone()
        updateAndAdd()
      }
    })
  }
}

updateAndAddInProgress()

todoListElement.addEventListener('click', handleClickButtonSolveDone)

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
  })
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

//----------------------------возврат в IN PROGRESS-------------------------------------------

function handleClickButtonBack2(event) {
  const target = event.target

  if (target.classList.contains('btn-back')) {
    const todoElement = target.closest('.todo')
    const id = todoElement.id

    done.forEach((item, index) => {
      if (item.id == id) {
        done.splice(index, 1)
        inProgress.push(item)
        updateAndAddDone()
        updateAndAddInProgress()
      }
    })
  }
}

todoListDoneElement.addEventListener('click', handleClickButtonBack2)

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
