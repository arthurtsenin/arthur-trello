function Tasks(title, description, user) {
	this.title = title
	this.description = description
	this.user = user
	this.createdAt = new Date()
	this.id = this.createdAt.getTime()
}


export{Tasks}