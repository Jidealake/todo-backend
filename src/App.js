import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css'; // Import the gradient background

function App() {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (!taskText.trim()) return;

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { text: taskText, date: dueDate };
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: taskText, date: dueDate }]);
    }

    setTaskText('');
    setDueDate(new Date());
  };

  const handleEdit = (index) => {
    setTaskText(tasks[index].text);
    setDueDate(new Date(tasks[index].date));
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setEditingIndex(null);
    setTaskText('');
    setDueDate(new Date());
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1>🗓️ Uri's To-Do App</h1>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Task name"
            style={styles.input}
          />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            style={styles.datepicker}
          />
          <button onClick={handleAddOrUpdate} style={styles.button}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task, i) => (
            <li key={i} style={styles.listItem}>
              <div>
                <strong>{task.text}</strong> <br />
                <small>Due: {new Date(task.date).toLocaleDateString()}</small>
              </div>
              <div>
                <button onClick={() => handleEdit(i)} style={styles.edit}>✏️</button>
                <button onClick={() => handleDelete(i)} style={styles.delete}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  container: {
    maxWidth: 600,
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
  },
  inputContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 20
  },
  input: {
    padding: 8,
    width: 150
  },
  button: {
    padding: '8px 12px'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '10px 0'
  },
  edit: {
    marginRight: 8
  }
};

export default App;
