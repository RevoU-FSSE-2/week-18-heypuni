import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getProduct from '../product.validation';

function App() {
  const [token, setToken] = useState(null)
//   const [registerName, setRegisterName] = useState('')
//   const [registerEmail, setRegisterEmail] = useState('')
//   const [registerPassword, setRegisterPassword] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [products, setProduct] = useState([])
  const [checked, setChecked] = useState([0]);

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
  
  useEffect(() => {
    if (token) getProduct()
  }, [token])

  console.log('token', token)

  const config = {
    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
  };

//   const onLoginSubmit = () => {
//     console.log(`email: ${email}, password: ${password}`)
//     axios.post(`${URL}/v1/auth/login`, {
//       email,
//       password
//     })
//       .then(function (response) {
//         console.log('login success', response);
//         if (response && response.data && response.data.tokens && response.data.tokens.access) {
//           localStorage.setItem('token', JSON.stringify(response.data.tokens.access.token))
//           localStorage.setItem('user', JSON.stringify(response.data.user))
//           window.location.reload()
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   const onRegisterSubmit = () => {
//     console.log(`name: ${registerName}, email: ${registerEmail}, password: ${registerPassword}`)
//     axios.post(`${URL}/v1/auth/register`, {
//       name: registerName,
//       email: registerEmail,
//       password: registerPassword
//     })
//       .then(function (response) {
//         console.log('register success', response);
//         if (response && response.data && response.data.tokens && response.data.tokens.access) {
//           // localStorage.setItem('token', JSON.stringify(response.data.tokens.access.token))
//           // localStorage.setItem('user', JSON.stringify(response.data.user))
//           // window.location.reload()
//         }
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

  const onProductSubmit = () => {
    console.log(`title: ${title}, desc: ${description}, priority: ${priority}`)
    // const user = localStorage.getItem('user')
    // const parsedUser = JSON.parse(user)
    // const createdBy = parsedUser?.id || ''

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
  }

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
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 1, mb: 1, width: '25ch' },
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
{/*         
          <Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TextField
                id="outlined-emailText"
                label="Email"
                defaultValue=""
                helperText="Type your email here"
                type='email'
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-passwordText"
                label="Password"
                defaultValue=""
                helperText="Type your password here"
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" onClick={() => onLoginSubmit()}>Login</Button>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TextField
                id="outlined-registerNameText"
                label="Name"
                defaultValue=""
                helperText="Type your name here"
                type='text'
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <TextField
                id="outlined-registerEmailText"
                label="Email"
                defaultValue=""
                helperText="Type your email here"
                type='email'
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <TextField
                id="outlined-registerPasswordText"
                label="Password"
                defaultValue=""
                helperText="Type your password here"
                type='password'
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <Button variant="contained" onClick={() => onRegisterSubmit()}>Register</Button>
            </Box>
          </Box> */}
        
        {token &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <TextField
                id="outlined-titleText"
                label="Title"
                defaultValue=""
                helperText="Type your title here"
                type='text'
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: '100%' }}
              />
              <TextField
                id="outlined-descriptionText"
                label="Description"
                defaultValue=""
                helperText="Type your description here"
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                sx={{ width: '100%' }}
              />
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
                sx={{ width: '100%' }}
              />
              <Button variant="contained" onClick={() => onProductSubmit()}>Create Task</Button>

            </Box>
            <Box ml={2} width={'100%'}>
              <List sx={{ p: 4, bgcolor: 'background.paper' }}>
                {products && products.length && products.map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      secondaryAction={
                        <>
                          <Chip label={value.priority} />
                          <IconButton aria-label="delete" onClick={() => onProductDelete(value.id)}>
                            <DeleteIcon />
                          </IconButton></>
                      }
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`${value.title || '-'}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Box>
        }
      </Box>
    </div>
  );
}

export default App;
