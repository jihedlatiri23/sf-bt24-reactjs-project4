import React, { useState } from "react";
import { Card, Checkbox, Popover, Button, Typography, Space } from "antd";
import { EllipsisOutlined, EditOutlined, DeleteOutlined, CopyOutlined } from "@ant-design/icons";
import './index.css'

const { Title, Paragraph } = Typography;

const TodoCard = ({ todo, onEdit, onDelete, onDuplicate }) => {
  const [completed, setCompleted] = useState(todo.completed || false);
  const [popoverVisible, setPopoverVisible] = useState(false); 

  const handleCheck = () => setCompleted(!completed);

  const actions = (
    <Space direction="vertical">
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => {
          onEdit(todo.id)
          setPopoverVisible(false); 
        }}
      >
        Edit
      </Button>
      <Button
        type="text"
        icon={<CopyOutlined />}
        onClick={() => onDuplicate(todo.id)}
      >
        Duplicate
      </Button>
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </Button>
    </Space>
  );

  return (
    <Card
      style={{
        marginBottom: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={completed}
        onChange={handleCheck}
        style={{
          marginRight: 16,
          width: 24,
          height: 24,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />

      <div style={{ flex: 1 }}>
        <Title level={5} delete={completed} style={{ margin: 0 }}>
          {todo.title}
        </Title>
        <Paragraph type={completed ? "secondary" : "default"} style={{ margin: 0 }}>
          {todo.description}
        </Paragraph>
      </div>

      <Popover content={actions} trigger="click" placement="bottomRight"
              open={popoverVisible} 
              onOpenChange={(visible) => setPopoverVisible(visible)} 
        >
        <Button
          type="text"
          icon={<EllipsisOutlined />}
          style={{
            fontSize: 20,
            display: "flex",
            alignItems: "center",
          }}
        />
      </Popover>
    </Card>
  );
};

export default TodoCard;
