import { useEffect, useState } from 'react'
import axios from 'axios'
import EditTaskForm from './EditTaskForm'

function TaskTable({ render, setRender }) {
  const [taskData, setTaskData] = useState([])
  const [editTaskId, setEditTaskId] = useState(null)

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/tasks')
      setTaskData(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData()
    setRender(false)
  }, [render])

  const taskDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`)
      alert("Task Deleted")
      const filterTasks = taskData.filter((val) => val.id !== id)
      setTaskData(filterTasks)
    } catch (error) {
      console.log(error);
    }
  }

  const taskUpdate = (id) => {
    setEditTaskId(id)
  }

  return (
    <div
      style={{
        marginTop: "30px",
        overflowX: "auto"
      }}
    >
      <table
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          border: "2px solid"
        }}
      >
        <thead
          style={{
            backgroundColor: "#1e293b",
            color: "#ffffff",
            fontSize: "1.5rem"
          }}
        >
          <tr>
            <th style={{ padding: "4px" }}>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {taskData?.map((val, index) => (
            <tr
              key={val.id}
              style={{
                textAlign: "center",
                fontSize: "1.2rem"
              }}
            >
              <td>{val.id}</td>
              <td>{val.taskTitle}</td>
              <td>{val.taskDescription}</td>
              <td>{val.taskStatus}</td>
              <td>{val.priority}</td>
              <td>{val.dueDate}</td>

              <td >
                <button onClick={() => taskUpdate(val.id)} >Update</button>
              </td>
              <td >
                <button onClick={() => taskDelete(val.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editTaskId && (
        <div style={{ position: "absolute", zIndex: 100, top: "100px", left: "50%" }}>
          <EditTaskForm id={editTaskId} />
        </div>
      )}
    </div>

  )
}

export default TaskTable