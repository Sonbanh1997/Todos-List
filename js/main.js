var toDosAPI = 'https://my-json-server.typicode.com/Sonbanh1997/mockJS/todoList';


function start(){
getTodos(render_todos);
todos_Form()
}

function getTodos(callback){
    fetch(toDosAPI)
        .then(function(responses){
            return responses.json();
        })
        .then(callback)
}


function render_todos(todosList){
    var stt =1;
    var todos_block = document.querySelector('#todos_Block');
    var todos = todosList.map(function(todo){
        return  `
        <tr class="todos-item-${todo.id}">
        <td>${stt++}</td>
        <td>${todo.title}</td>
        <td>${todo.content}</td>
        <td>
        <button onclick="deleteTodos(${todo.id})">Delete</button>
        <button onclick="updateTodos(${todo.id})">Update</button>
        </td>
        </tr>
        `;
    })
    todos_block.innerHTML = todos.join('');
}

//Add todos
function Create_todos(){
    var title = document.querySelector('input[name="title"]').value;
    var content = document.querySelector('input[name="content"]').value;
    if(title == '' || content == ''){
        alert('please type in the fields!');
    } else {
        var data = {
            title:title,
            content:content
        }
        var request = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:JSON.stringify(data)
        }
        fetch(toDosAPI, request)
            .then(function(responses){
                return responses.json();
            })
            .then(function(){
                getTodos(render_todos);
            })
    }
    

}

//Delete todos
function deleteTodos(id){
    var request = {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    fetch(toDosAPI + '/' + id, request)
        .then(function(responses){
            return responses.json();
        })
        .then(function(){
            var todoItem = document.querySelector('.todos-item-' + id);
            todoItem.remove();
            getTodos(render_todos);
        })
}



//UpdateTodos
function updateTodos(id){
 getTodos(function(todosList){
    var title = document.querySelector('input[name="title"]');
    var content = document.querySelector('input[name="content"]');
     for(var todo of todosList){
         if(todo.id == id){
             title.value = todo.title;
             content.value = todo.content;
         }
     }
     var addBTN = document.querySelector('#add_Todos');
     addBTN.innerHTML = 'Save change!';
     addBTN.removeEventListener('click', Create_todos);
     addBTN.onclick = function(){
        var title = document.querySelector('input[name="title"]').value;
        var content = document.querySelector('input[name="content"]').value;
        var data = {
            title:title,
            content:content
        }
        updateTodosHandle(id, data);
     }
 })
}

function updateTodosHandle(id, data){
    var request = {
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:JSON.stringify(data)
    }
    fetch(toDosAPI + '/' + id, request)
        .then(function(responses){
            return responses.json();
        })
        .then(function(){
            var addBTN = document.querySelector('#add_Todos');
            addBTN.innerHTML = 'Create Todos';
            addBTN.addEventListener('click', function(){});
            addBTN.addEventListener('click', Create_todos);
            getTodos(render_todos);
        })
}

function todos_Form(){
     var addBTN = document.querySelector('#add_Todos');
     addBTN.addEventListener('click', Create_todos);
}




start();
