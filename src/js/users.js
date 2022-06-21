import { $ } from './helper.js'

const userSelectPopUpElement = $('#select')// ВЫБОР ИСПОЛНИТЕЛЯ POPUP
const userSelectPopUpElementEdit = $('#select-edit')// ВЫБОР ИСПОЛНИТЕЛЯ POPUP

let usersSelect = []
async function fetchUsers() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users/')
	const data = await response.json()
	usersSelect = data.map(user => ({ id: user.id, name: user.name }))
}

async function renderUsers() {
	await fetchUsers()
	usersSelect.forEach(user => {
		userSelectPopUpElement.innerHTML += `<option value=${user.id}>${user.name}</option>`
	})
}


let usersSelectEdit = []
async function fetchUsersEdit() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users/')
	const data = await response.json()
	usersSelectEdit = data.map(user => ({ id: user.id, name: user.name }))
}

async function renderUsersEdit() {
	await fetchUsersEdit()
	usersSelectEdit.forEach(user => {
		userSelectPopUpElementEdit.innerHTML += `<option value=${user.id}>${user.name}</option>`
	})
}

export {
	userSelectPopUpElement,
	renderUsers,
	userSelectPopUpElementEdit,
	renderUsersEdit
}
