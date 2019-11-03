(function () {
    let tasks = {
            current: [{
                taskId: doId(),
                taskContent: "Task 1",
                taskState: "current",
                taskDate: '',
            }],
            done: [{
                taskId: doId(),
                taskContent: "Task 2",
                taskState: "done",
                taskDate: '',
            }],
            edited: [{
                taskId: doId(),
                taskState: 'edit',
                taskDate: '',
            }],
            get allTasks() {
                return this.current.length + this.done.length;
            },
            get doneTasks() {
                return this.done.length;
            }
        },
        tasksList = document.getElementById("app__list"),
        allTasks = document.getElementById("js-all-tasks"),
        doneTasks = document.getElementById("js-done-tasks"),
        addNewTaskField = document.getElementById("app__task-new");

    function INIT() {
        for (const item of tasks.current) {
            createItem(item);
        }
        for (const item of tasks.done) {
            createItem(item);
        }
        for (const item of tasks.edited){
            createItem(item)
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function createItem(el) {
        let item = document.createElement('tr'),
            form = document.createElement('textarea'),
            remove = document.createElement('td'),
            text = document.createElement('td');
            min = document.createElement('td');
            edit = document.createElement('td');
        remove.classList.add('app__list-remove');
        remove.addEventListener('click', function () {
            removeTask(this);
        });
        edit.classList.add('app__list-edit');
        edit.addEventListener('click', function () {
            editTask(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            doneTask(this);
        });
        switch (el.taskState) {
            case 'done':
                item.classList.add('app__list-item', 'app__list-item--done');
                break;
            case 'edited':
                form.classList.add('app__list-item', 'app__list-item--edited');
            default:
                item.classList.add('app__list-item');
        }
        item.id = el.taskId;
        text.innerHTML = el.taskContent;
        min.innerHTML = el.taskDate;
        edit.innerHTML = '<td>Edit</td>';
        item.appendChild(text);
        item.appendChild(min);
        item.appendChild(edit);
        item.appendChild(remove);
        tasksList.appendChild(item);
    }

    function doneTask(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('app__list-item--done');

        const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
        elem.classList.toggle('app__list-item--done');
        for (const [index, item] of itemsRemove.entries()) {
            if (item.taskId !== elemId) continue;
            itemsAdd.push(item);
            itemsRemove.splice(index, 1);
        }
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function removeTask(el) {
        let removeEl = el.parentNode,
            removeElId = removeEl.id,
            removeElState = removeEl.classList.contains('app__list-item--done');

        removeEl.remove();
        const items = removeElState ? tasks.done : tasks.current;
        for (const [index, item] of items.entries()) {
            if (item.taskId !== removeElId) continue;
            items.splice(index, 1);
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;

    }

    function editTask(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('app__list-item--done');

        const [itemsRemove, itemsAdd] = elemState ? [tasks.edited, tasks.current] : [tasks.current, tasks.edited];
        elem.classList.toggle('app__list-item--done');
        for (const [index, item] of itemsRemove.entries()) {
            if (item.taskId !== elemId) continue;
            itemsAdd.push(item);
            itemsRemove.splice(index, 1);
        }


    };



    function addTasks(str) {
        let elem = {
            taskId: doId(),
            taskContent: str,
            taskState: "current",
            taskDate: date,
        };
        tasks.current.push(elem);
        createItem(elem);
        allTasks.innerHTML = tasks.allTasks;
    }

    function doId() {
        return Math.random().toString(36).substr(2, 16);
    };


    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes();



    INIT();

    addNewTaskField.addEventListener('keyup',function (e) {
        if(e.key === 'Enter') {
            addTasks(this.value);
            this.value = "";
        }
    })

})();