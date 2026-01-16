from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Data Model
class TodoItem(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False

# In-memory storage
todos: List[TodoItem] = []

# 2. API Endpoints

@app.post("/todos", response_model=TodoItem)
def create_todo(todo: TodoItem):
    # Check for duplicate ID (simple validation)
    for existing_todo in todos:
        if existing_todo.id == todo.id:
             raise HTTPException(status_code=400, detail="Todo with this ID already exists")
    todos.append(todo)
    return todo

@app.get("/todos", response_model=List[TodoItem])
def read_todos():
    return todos

@app.get("/todos/{todo_id}", response_model=TodoItem)
def read_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.put("/todos/{todo_id}", response_model=TodoItem)
def update_todo(todo_id: int, updated_todo: TodoItem):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            # Optimize: ensure the ID remains consistent or allow change? 
            # Usually PUT replaces resource. We'll update the item.
            # We strictly replace it with updated_todo logic, 
            # but usually we want to keep the ID from the path if valid.
            # For simplicity, we assume updated_todo.id matches or we overwrite.
            todos[i] = updated_todo
            return updated_todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            del todos[i]
            return {"detail": "Todo deleted"}
    raise HTTPException(status_code=404, detail="Todo not found")

# 3. Root Redirect
@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")

# 4. Server Startup
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
