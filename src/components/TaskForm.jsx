import { useState } from 'react'
import axios from 'axios'
import TaskTable from './TaskTable'

function TaskForm() {
  const [data, setData] = useState({ taskTitle: "", taskDescription: "", taskStatus: "Pending", priority: "", duaDate: "" })
  const [render, setRender] = useState(false)
  const formHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const formSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/tasks", data)
      alert("Successfully Added")
      setData({ taskTitle: "", taskDescription: "", taskStatus: "Pending", priority: "", duaDate: "" })
      setRender(true)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form
        onSubmit={formSubmit}
        style={{
          maxWidth: "420px",
          margin: "40px auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <label style={{ fontWeight: "600" }}>Task Title</label>
        <input
          name="taskTitle"
          value={data.taskTitle}
          onChange={formHandle}
          type="text"
          placeholder="Enter Task..."

        />

        <label style={{ fontWeight: "600" }}>Task Description</label>
        <textarea
          name="taskDescription"
          value={data.taskDescription}
          onChange={formHandle}
          placeholder="Enter Task Description..."
          rows={3}
        />

        <label style={{ fontWeight: "600" }}>Priority</label>
        <select
          name="priority"
          value={data.priority}
          onChange={formHandle}

        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label style={{ fontWeight: "600" }}>Due Date</label>
        <input
          name="dueDate"
          value={data.dueDate}
          onChange={formHandle}
          type="date"

        />

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1e40af"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
        >
          Submit
        </button>
      </form>

      <TaskTable render={render} setRender={setRender} />

    </div>

  )
}

export default TaskForm