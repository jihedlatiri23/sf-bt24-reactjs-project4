import React, {  useEffect } from "react";
import { Button, Modal, Input, DatePicker, Select } from "antd";
import {  SendOutlined, CloseOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import axiosInstance from "../../../axios/axiosInstance";
import {  useMutation  } from '@tanstack/react-query';

const createTask = async (data) => {
  const response = await axiosInstance.post('/tasks', data); 
  return response.data;
};

const updateTask = async (id, data) => {
  const response = await axiosInstance.put(`/tasks/${id}`, data); 
  return response.data;
};

const AddTaskModal = ({ isModalOpen, setIsModalOpen, currentTask }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title,
        description: currentTask.description,
        date: currentTask.date ? dayjs(currentTask.date) : null,
        flag: currentTask.flag || "",
      });
    }
  }, [currentTask, reset]);

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  const mutationCreate = useMutation({
    mutationFn:createTask, 
    onSuccess: () => {
      setIsModalOpen(false); 
   }
  });

  const mutationUpdate = useMutation({
    mutationFn:updateTask, 
    onSuccess: () => {
      setIsModalOpen(false);
  }
  });

  const onSubmit = (data) => {
    if (currentTask) {
      mutationUpdate.mutate(currentTask.id, data);
    } else {
      mutationCreate.mutate(data);
    }
  };

  return (
    <Modal
      title={currentTask ? "Edit Task" : "Add Task"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 16 }}>
          <label>Title</label>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter task title" />
            )}
          />
          {errors.title && <span style={{ color: "red" }}>{errors.title.message}</span>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Description</label>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Input.TextArea {...field} rows={4} placeholder="Enter task description" />
            )}
          />
          {errors.description && <span style={{ color: "red" }}>{errors.description.message}</span>}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Date</label>
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                {...field}
                style={{ width: "100%" }}
                onChange={(date) => field.onChange(date ? dayjs(date) : null)}
              />
            )}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Priority</label>
          <Controller
            name="flag"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} placeholder="Select priority">
                <Select.Option value="low">Low</Select.Option>
                <Select.Option value="medium">Medium</Select.Option>
                <Select.Option value="high">High</Select.Option>
              </Select>
            )}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="default" icon={<CloseOutlined />} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SendOutlined />}
            style={{ marginLeft: 8 }}
            loading={mutationCreate.isLoading || mutationUpdate.isLoading} 
          >
            {currentTask ? "Update Task" : "Add Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTaskModal;