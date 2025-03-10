"use client"
import { useState } from "react"

const STYLE = "border border-black rounded-md px-2 mb-2"

export default function Todo() {
    const [task, setTask] = useState('')
    const [editTask, setEditTask] = useState('')
    const [editId, setEditId] = useState(-1)
    const [tasks, setTasks] = useState<string[]>([
        "Reading",
        "Writing",
        "Coding",
    ])

    // ฟังก์ชันสำหรับเพิ่ม task
    const addTask = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, task])
            setTask('') 
        }
    }

    // ฟังก์ชันสำหรับลบ task
    const deleteTask = (indexTask: number) => {
        setTasks(tasks.filter((_, index) => index !== indexTask))
    }

    // ฟังก์ชันสำหรับแก้ไข task
    const editTaskFunction = (indexTask: number) => {
        setEditId(indexTask)
        setEditTask(tasks[indexTask])
    }

    // ฟังก์ชันสำหรับอัปเดต task หลังจากแก้ไข
    const updateTask = () => {
        if (editId === -1) {
            return
        }
        const newTasks = [...tasks]
        newTasks[editId] = editTask
        setTasks(newTasks)
        setEditId(-1)
        setEditTask('')
    }

    // ฟังก์ชันสำหรับรีเซ็ต task ทั้งหมด
    const resetTasks = () => {
        setTask('')
        setTasks([]) 
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Todo</h1>
            
            <div>
                <label htmlFor="task">Task: </label>
                <input
                    className={`${STYLE}`}
                    type="text"
                    name="task"
                    onChange={e => setTask(e.target.value)}
                    value={task}
                />
            </div>

            <div>
                <button className={`${STYLE}`} onClick={addTask}>
                    Add task
                </button>
            </div>

            <div>
                <button className={`${STYLE}`} onClick={resetTasks}>
                    Reset
                </button>
            </div>

            <div>
                <div>
                    Task: {task} <br />
                    Tasks:
                    {
                        tasks.map((task, index) => (
                            <div key={index}>
                                {index + 1}. {task}
                                <button
                                    className={`${STYLE} ml-4`}
                                    onClick={() => deleteTask(index)}
                                >
                                    Delete
                                </button>
                                <button
                                    className={`${STYLE} ml-4`}
                                    onClick={() => editTaskFunction(index)}
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                    }
                </div>

                <div>
                    {editId !== -1 && (
                        <>
                            <div>Edit Task:</div>
                            <input
                                className={`${STYLE}`}
                                type="text"
                                value={editTask}
                                onChange={e => setEditTask(e.target.value)}
                            />
                            <button
                                className={`${STYLE} ml-4`}
                                onClick={updateTask}
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
