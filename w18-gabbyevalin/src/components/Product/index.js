import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// import getProduct from '../product.validation';

function App() {
  const [token, setToken] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [products, setProduct] = useState([])
  const [checked, setChecked] = useState([0])
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  console.log(data, error);

  const [editTaskData, setEditTaskData] = useState({
    name: "",
    activity: "",
    priority: "",
    due_date: "",
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  // console.log('data', email, password)
  const URL = process.env.REACT_APP_BE_ENDPOINT
  // console.log('URL', URL)
  console.log('products', {
    title, description, priority, dueDate
  })

  useEffect(() => {
    const tokenFromLS = localStorage.getItem('token')
    setToken(tokenFromLS)
  }, [])

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalEdit = () => {
    setIsModalEditOpen(true);
    // setEditData(product);
  };

  const closeModalEdit = () => {
    setIsModalEditOpen(false);
  };
  
  useEffect(() => {
    if (token) getProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  console.log('token', token)

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  };

  const onProductSubmit = () => {
  console.log(`title: ${title}, desc: ${description}, priority: ${priority}`)

  axios.post(`${URL}/v1/products`, {
    title,
    description,
    priority,
    dueDate,
  },
      config
    )
      .then(function (response) {
        console.log('create product success', response);
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(`${URL}/v1/products`,
        config
      )
      console.log('response getProduct', response)
      console.log('getProduct', response)
      if (response && response.data) setProduct(response.data.results)
    } catch (error) {
      localStorage.removeItem('token')
      window.location.reload()
    }
  }

  const fetchData = useCallback(() => {
    axios
      .get(`${URL}/v1/products`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, [setData, URL]);

  const onProductEdit = (productId) => {
    try {
      axios.patch(`${URL}/v1/products/${productId})`,
        config
      )
        .then(function (response) {
          const newProduct = response.data.data;
          console.log('new task', newProduct)
          closeModalEdit(); 
          window.location.reload()

        })

        .catch(function (error) {
          closeModalEdit();
          console.log(`error editing task`, error)
        });
    } catch (error) {
        console.log('error editing product')
    }
}

useEffect(() => {
  fetchData();
}, [fetchData]);

const handleInputChangeEdit = (event) => {
  const { name, value } = event.target;
  setEditTaskData({
    ...editTaskData,
    [name]: value,
  });
};

  const onProductDelete = (productId) => {
    try {
      axios.delete(`${URL}/v1/products/${productId}`,
        config
      )
        .then(function (response) {
          console.log('delete product success', response);
          window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
        console.log('error deleting product')
    }

  }

  const handleChange = (event) => {
    setPriority(event.target.value);
  };


  return (
    <div className="App">
      {token && (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          maxWidth: '80vw',
        }}>
        <Button variant="contained" onClick={() => openModal()} sx={{display: 'flex', flexDirection: 'center', alignItems: 'center', width: '10vw'}}>
          Create Task
        </Button>
        
        {/* <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          href="/login"
          onClick={handleLogout}
        >
            Logout
        </Button> */}
        
        <Box ml={2} width={'100%'} >
            <List sx={{ p: 4, bgcolor: 'background.paper' }} >
              {products && products.length && products.map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (

                  <ListItem
                    key={value}
                    secondaryAction={<>
                      <Chip label={value.priority} />
                      <IconButton aria-label="delete" onClick={() => onProductDelete(value.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="edit" onClick={() => openModalEdit(value.id)}>
                        <EditIcon />
                      </IconButton>

                    </>}
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }} />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value.title || '-'}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box><Modal open={isModalOpen} onClose={closeModal}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <TextField
                id="outlined-titleText"
                label="Title"
                defaultValue=""
                helperText="Type your title here"
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: '100%' }} />
              <TextField
                id="outlined-descriptionText"
                label="Description"
                defaultValue=""
                helperText="Type your description here"
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                sx={{ width: '100%' }} />
              <FormControl fullWidth>
                <InputLabel id="priority-select">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select-input"
                  value={priority}
                  label="Priority"
                  onChange={handleChange}
                >
                  <MenuItem value={'low'}>Low</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'high'}>High</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-dueDateText"
                label="Due Date"
                defaultValue=""
                // helperText="Type your due Date here"
                type='text'
                onChange={(e) => setDueDate(e.target.value)}
                sx={{ width: '100%' }} />
              <Button variant="contained" onClick={() => onProductSubmit()}>Create Task</Button>
            </Box>
          </Modal>
          
          
          <Modal open={isModalEditOpen} onClose={closeModalEdit}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <TextField
                id="outlined-titleText"
                label="Title"
                defaultValue=""
                helperText="Type your title here"
                value={editTaskData.title}
                type='text'
                onChange={handleInputChangeEdit}
                sx={{ width: '100%' }} />
              <TextField
                id="outlined-descriptionText"
                label="Description"
                defaultValue=""
                value={editTaskData.description}
                type='text'
                onChange={handleInputChangeEdit}
                sx={{ width: '100%' }} />
              <FormControl fullWidth>
                <InputLabel id="priority-select">Priority</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select-input"
                  value={editTaskData.priority}
                  label="Priority"
                  onChange={handleInputChangeEdit}
                >
                  <MenuItem value={'low'}>Low</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'high'}>High</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="outlined-dueDateText"
                label="Due Date"
                defaultValue=""
                value={editTaskData.dueDate}
                type='text'
                onChange={handleInputChangeEdit}
                sx={{ width: '100%' }} />
              <Button variant="contained" onClick={() => onProductEdit()}>Create Task</Button>
            </Box>
          </Modal>
          
          </Box>
        )};
       </div>
  );
}    

export default App;
