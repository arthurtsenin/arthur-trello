const showTime = function () {
	const time = document.querySelector('.header__time')
	let date = new Date()

	let hours = date.getHours()
	let hoursOuter = (hours < 10) ? '0' + hours : hours

	let minutes = date.getMinutes()
	let minutesOuter = (minutes < 10) ? '0' + minutes : minutes

	time.innerHTML = `${hoursOuter}:${minutesOuter}`
}

setInterval(showTime)


