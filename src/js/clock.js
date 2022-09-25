import { $ } from './helper.js'

const time = $('.header__time')

function showTime () {
	const date = new Date()
	const hours = date.getHours()
	const hoursOuter = (hours < 10) ? '0' + hours : hours
	const minutes = date.getMinutes()
	const minutesOuter = (minutes < 10) ? '0' + minutes : minutes
	time.innerHTML = `${hoursOuter}:${minutesOuter}`
}

setInterval(showTime)
