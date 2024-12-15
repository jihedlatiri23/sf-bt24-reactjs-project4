import React, { useState } from "react";
import { Button, Space, Typography } from "antd";
import TodoCard from "../TodoCard";
import AddTaskModal from "../addTask"; 
import { PlusOutlined } from "@ant-design/icons/lib";
const { Title } = Typography;

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: "Buy Groceries", description: "Milk, Bread, Eggs", completed: false },
    { id: 2, title: "Workout", description: "1 hour of cardio", completed: false },
    { id: 3, title: "Project Meeting", description: "Discuss milestones", completed: false },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); 

  const handleEdit = (task) => {
    setCurrentTask(task); 
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleOpenModal = () => {
    setCurrentTask(null); 
    setIsModalOpen(true); 
  };

  return (
    <div style={{ padding: "16px" }}>
      <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          My Todos
        </Title>
        <Button type="primary" icon={<PlusOutlined/>} onClick={() => handleOpenModal()} >
          Add Todo
        </Button>
      </Space>

      <Space style={{ display: "flex", marginBottom: 16 }}>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={() => handleEdit(todo)}
            onDelete={handleDelete}
          />
        ))}
      </Space>
   
      <AddTaskModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currentTask={currentTask} 
        handleOpenModal={handleOpenModal} 
      />
     
    </div>
  );
};

export default TodoList;
