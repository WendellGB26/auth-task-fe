import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, TextField, Button } from '@material-ui/core';
import api from '../../api/index';
import './taskstable.css'

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Taskstable = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setID] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('tasks/', { title, description, completed });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditContainer = async (taskInfo) => {
    setTitle(taskInfo.title);
    setDescription(taskInfo.description);
    setCompleted(taskInfo.completed);
    setID(taskInfo.id)
    setIsEdit(true)
  };

  const handleEditTask = async (taskId) => {
    try {
      await api.put(`tasks/${taskId}/`, { title, description, completed });
      setTitle('');
      setDescription('');
      setCompleted(false);
      setIsEdit(!isEdit);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = async () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setIsEdit(false);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`tasks/${taskId}/`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('tasks/');
        setTasks(response.data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, [isEdit]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-row justify-center">
      <form className={`${classes.formContainer} w-2/5 px-2`} onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Checkbox
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          color="primary"
        />
        {!isEdit ? 
          <Button fullWidth type="submit" variant="contained" color="primary">
            Add Task
          </Button>
          :
          <div>
            <Button onClick={() => handleEditTask(id)}>
              Edit Task
            </Button>
            <Button onClick={() => handleCancelEdit()}>
              Cancel Edit
            </Button>
          </div>

        }
      </form>
      <TableContainer className={classes.TableContainer} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.TableRow}>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Title</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Description</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Completed</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={task.completed}
                    disabled
                    color="primary"
                  />
                </TableCell>
                <TableCell style={{ display:'flex', justifyContent: 'space-between' }}>
                  <EditIcon onClick={() => handleEditContainer(task)} />
                  <DeleteIcon style={{ color:'red' }} onClick={() => handleDeleteTask(task.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      
    </div>

  );
}

export default Taskstable;


const useStyles = makeStyles({
  TableContainer: {
    width: '50%',
    marginLeft: '15px',
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'auto',
  },
  table: {
  },
  TableRow: {
    backgroundColor: 'rgba(48, 45, 107, 0.754)',
  },
  tableCell: {
    fontWeight: 'bold',
    borderBottom: '1px solid #e0e0e0',
  },
  formContainer: {
    backgroundColor: '#e0e0e0'
  },
});