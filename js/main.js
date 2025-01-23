const form = document.querySelector("#form")
const input = document.querySelector('#taskInput')
const TaskUl = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')
const removeDoneTasks = document.querySelector('#removeDoneTasks')
const removeTasks = document.querySelector('#removeTasks')

// Пустой масив для данных
let tasks = [];

// Функция добавления задачи 
const addTask = (event) => {
	console.log('Форма отправилась!!!');
	event.preventDefault()
	const text = input.value

const newTasks = {
	id: Date.now( ),
	text: text, 
	done: false
}

tasks.push(newTasks)
saveLocalStorage()
console.log(newTasks);

renderTask(newTasks)

	input.value = '' 
	input.focus()
	checkEmptyList()
}
// Функция удаления задачи 
const deleteTask = (event) => {
	if (event.target.dataset.action !== 'delete') return
		const parantNode = event.target.closest('.list-group-item')	
		parantNode.remove()
	
		const id = Number(parantNode.id);


const index = tasks.findIndex((task) => (task.id === id ))
	
	console.log(index);

	tasks.splice(index , 1)
	saveLocalStorage()
	checkEmptyList()

}

// Функция отметки задачи 
const doneTask = (event) => {
		if (event.target.dataset.action !== 'done') return 
			const parantNode = event.target.closest('.list-group-item')

			const id = Number(parantNode.id) 

	const  task = tasks.find((task) => (task.id === id ))

			const taskTitle = parantNode.querySelector('span')
			taskTitle.classList.add("task-title--done")
			
			task.done = !task.done
			console.log(task);
			saveLocalStorage()
}




// Функция удаления всех задач
const removeTask = () => {
	tasks = [];
	TaskUl.innerHTML = '';
	saveLocalStorage();
	checkEmptyList();
};
// Функция выполненых задач
const removeDoneTask = () => {
	tasks = tasks.filter(task => !task.done);
	TaskUl.innerHTML = '';
	tasks.forEach(task => {
			const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

			const TaskLi = `
			<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
							<button type="button" data-action="done" class="btn-action"><img src="img/image.png" alt="app" srcset="" height="18px" width="18px"></button>
							<button type="button" data-action="delete" class="btn-action"><img src="img/krest.png" alt="app" srcset="" height="18px" width="18px"></button>
					</div>
			</li>
			`;
			TaskUl.insertAdjacentHTML('beforeend', TaskLi);
	});
	saveLocalStorage();
	checkEmptyList();
};

// Функция убирания заставки Списка дел 
const checkEmptyList = () => {
	if (tasks.length === 0) {
		const checkEmptyHTML = `
							<li id="emptyList" class="list-group-item empty-list">
					<div class="empty-list__title">Список дел пуст</div>
					<div>hohoho</div>
					<img src="img/dedmoroz.png" alt="ded" class="ded-moroz">
						<div>hohoho</div>
				</li>
		`
		TaskUl.insertAdjacentHTML('afterbegin', checkEmptyHTML )
	} 

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList')
		emptyListEl ? emptyListEl.remove() : null;
	}
};
// Функция обновления LocalStorage
const saveLocalStorage = () => {
	localStorage.setItem('tasks' , JSON.stringify(tasks))
};

// Функция работает на основе задачи task
const renderTask = (task) => {
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title'
	const TaskLi = `
<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
				<span class="${cssClass}">${task.text}</span>
				<div class="task-item__buttons">

					<button type="button" data-action="done" class="btn-action"><img src="img/image.png" alt="app" srcset="" height="18px" width="18px"></button>
					<button type="button" data-action="delete" class="btn-action"><img src="img/krest.png" alt="app" srcset="" height="18px" width="18px"></button>

				</div>
			</li>
			`
	TaskUl.insertAdjacentHTML('beforeend' , TaskLi )
};

// Добавления обьекта в пустой масив из LocalStorage
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))
	console.log(tasks);
	tasks.forEach((task) => renderTask(task));
}



// События
form.addEventListener("submit" , addTask)
TaskUl.addEventListener("click" , deleteTask)
TaskUl.addEventListener("click" , doneTask)
removeTasks.addEventListener("click", removeTask)
removeDoneTasks.addEventListener('click' , removeDoneTask)
