from fastapi import FastAPI,HTTPException 
from fastapi.middleware.cors import CORSMiddleware 
app = FastAPI()
from backend.schema import Todo,TodoUpdate  # Import the Todo model

# Allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

todos = []

@app.get("/todos")
def get_todos():
    return todos

@app.post("/todos")
def create_todo(todo: Todo):
    todos.append(todo)
    return todo

@app.put("/todos/{index}")
def replace_todo(index: int, todo: Todo):
    for i, existing_todo in enumerate(todos):
        if existing_todo.id == index:
            todos[i] = todo
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.patch("/todos/{index}")  
def update_todo(index: int, todo_update: TodoUpdate):
    for i, existing_todo in enumerate(todos):
        if existing_todo.id == index:
            existing_todo.status = todo_update.status
            return existing_todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{index}")
def delete_todo(index: int):
    for i,existing_todo in enumerate(todos):
        if existing_todo.id == index:
            del todos[i]
            return {"message": "Todo deleted successfully","status": "success"}
    raise HTTPException(status_code=404, detail="Todo not found")