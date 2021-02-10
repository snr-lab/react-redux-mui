export const getTodos = () => {
    return fetch(`http://localhost:3001/todos`)
    .then(response => response.json());
}
export const addTodo = (todo) => {
    return fetch(`http://localhost:3001/todos`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(response => response.json());
}
export const deleteTodo = (todoId) => {
    return fetch(`http://localhost:3001/todos/${todoId}`,{
        method: 'DELETE'
    })
    .then(() => todoId);
}
export const updateTodo = (todo) => {
    return fetch(`http://localhost:3001/todos/${todo.id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    .then(response => response.json());
}