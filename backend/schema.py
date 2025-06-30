from pydantic import BaseModel
class Todo(BaseModel):
    id:int
    title: str
    priority: str
    status: str
    date: str
    
class TodoUpdate(BaseModel):
    status:str