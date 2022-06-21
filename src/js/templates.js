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
               </div>
               <div class="todo__buttons-progress">
                     <button class="todo__btn btn-solve-progress"> IN PROGRESS >	</button>
                     <button class="todo__btn btn-solve-done"> DONE > </button>
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
               <button class="todo__btn btn-back">BACK</button>
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

function getTimeAndDate(date) {
   if (typeof (date) == 'string') {
      date = new Date(date)
   }
   const day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate()
   const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
   const year = date.getFullYear()
   return ` ${day}.${month}.${year}`
}

export { createTemplate, createTemplateInProgress, createTemplateDone}