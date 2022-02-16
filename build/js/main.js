
const inputElement =  document.getElementById('input')
const ulElement =  document.getElementById('list')
let todoList = []


inputElement.addEventListener('keydown', (event)=> {

  if (event.key =='Enter'|| event.keyCode ==13){
    todoList.unshift({
          content: inputElement.value,
          done: false,
          selected: false
        })
    inputElement.value = ''
    upgradeView()
   }
})

function upgradeView(){
    ulElement.innerHTML=''
      for (let index=0; index<todoList.length ;index++){
          const todoItem = todoList[index]
          const liElement = document.createElement('li')
          liElement.className = 'List-group-item'
          ulElement.append(liElement)

          const divElement = document.createElement('div')
          divElement.className = 'form-group form-check'
          liElement.append(divElement)

          const chekboxElement=document.createElement('input')
          divElement.append(chekboxElement)
          chekboxElement.type='checkbox'
          chekboxElement.className='form-check-input'
          chekboxElement.id='todoItem' + index
          chekboxElement.cheked=todoItem.selected

          const labelElement=document.createElement('label')
          divElement.append(labelElement)
          labelElement.className ='form-check-label'
          if (todoItem.done) {
            labelElement.className += ' todoDone'
      }
        labelElement.setAttribute =('for', 'todoItem' + index)
          labelElement.innerText =todoItem.content
    if (!todoItem.done){
              const buttonDonElement=document.createElement('button')
              divElement.append(buttonDonElement)
              buttonDonElement.typ='button'
              buttonDonElement.className='btn btn-outline-primary'
              buttonDonElement.innerText ='Done'

              buttonDonElement.addEventListener('click',()=>{
              todoItem.done = !todoItem.done
              upgradeView()
          })
          }else{
            const buttonRemoveElement=document.createElement('button')
            divElement.append(buttonRemoveElement)
            buttonRemoveElement.typ='button'
            buttonRemoveElement.className='btn btn-outline-danger'
            buttonRemoveElement.innerText ='Remove'

            buttonRemoveElement.addEventListener('click', ()=>{
              todoList=todoList.filter(currentTodoItem => currentTodoItem !== todoItem)
              upgradeView()

        })
  }
      chekboxElement.addEventListener('change', () =>{
        todoItem.selected = chekboxElement.checked
  })

    }
}


document.getElementById('doneAction').addEventListener('click', ()=>{
  for (const todoItem of todoList){
          if (todoItem.selected){
          todoItem.done =true
          todoItem.selected=false
    }
  }
          upgradeView()
})

document.getElementById('restoreAction').addEventListener('click', ()=>{
  for (const todoItem of todoList){
          if (todoItem.selected){
                todoItem.done =false
                todoItem.selected=false
              }
  }
      upgradeView()
})

      document.getElementById('removeAction').addEventListener('click', ()=>{
      todoList= todoList.filter(todoItem =>!todoItem.selected)
      upgradeView()
})

      document.getElementById('test').addEventListener('click', () => {
      for (const todoItem of todoList) {
        todoItem.selected=true
      }
      upgradeView()
})
