// import { Button } from '@mui/material';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import Chip from '@mui/material/Chip';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getProduct } from '../../functions/src/validations/product.validation';

// function App() {
//   const [token, setToken] = useState(null)
//   const [registerName, setRegisterName] = useState('')
//   const [registerEmail, setRegisterEmail] = useState('')
//   const [registerPassword, setRegisterPassword] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [priority, setPriority] = useState('')
//   const [dueDate, setDueDate] = useState('')
//   const [todos, setTodos] = useState([])
//   const [checked, setChecked] = useState([0]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };
//   // console.log('data', email, password)
//   const URL = process.env.REACT_APP_BE_ENDPOINT
//   // console.log('URL', URL)
//   console.log('todo', {
//     title, description, priority, dueDate
//   })

//   useEffect(() => {
//     const tokenFromLS = localStorage.getItem('token')
//     setToken(tokenFromLS)
//   }, [])
//   const getProduct = async () => {
//     try {
//       const response = await axios.get(`${URL}/v1/todos`,
//         config
//       )
//       console.log('response getTodos', response)
//       console.log('getTodos', response)
//       if (response && response.data) setTodos(response.data.results)
//     } catch (error) {
//       localStorage.removeItem('token')
//       window.location.reload()
//     }

//   }
//   useEffect(() => {
//     if (token) getProduct()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token])

//   console.log('token', token)
//   const config = {
//     headers: { Authorization: `Bearer ${JSON.parse(token)}` }
//   };

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

//   const onTodoSubmit = () => {
//     console.log(`title: ${title}, desc: ${description}, priority: ${priority}`)
//     const user = localStorage.getItem('user')
//     const parsedUser = JSON.parse(user)
//     const createdBy = parsedUser?.id || ''

//     axios.post(`${URL}/v1/todos`, {
//       title,
//       description,
//       priority,
//       dueDate,
//       createdBy
//     },
//       config
//     )
//       .then(function (response) {
//         console.log('create todo success', response);
//         window.location.reload()
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }

//   const onTodoDelete = (todoId) => {
//     try {
//       axios.delete(`${URL}/v1/todos/${todoId}`,
//         config
//       )
//         .then(function (response) {
//           console.log('delete todo success', response);
//           window.location.reload()
//         })
//         .catch(function (error) {
//           console.log(error);
//         });

//     } catch (error) {

//     }

//   }

//   const handleChange = (event) => {
//     setPriority(event.target.value);
//   };
//   return (
//     <div className="App">
//       <Box
//         component="form"
//         sx={{
//           '& .MuiTextField-root': { mt: 1, mb: 1, width: '25ch' },
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         {!token &&
//           <Box>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <TextField
//                 id="outlined-emailText"
//                 label="Email"
//                 defaultValue=""
//                 helperText="Type your email here"
//                 type='email'
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 id="outlined-passwordText"
//                 label="Password"
//                 defaultValue=""
//                 helperText="Type your password here"
//                 type='password'
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button variant="contained" onClick={() => onLoginSubmit()}>Login</Button>
//             </Box>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <TextField
//                 id="outlined-registerNameText"
//                 label="Name"
//                 defaultValue=""
//                 helperText="Type your name here"
//                 type='text'
//                 onChange={(e) => setRegisterName(e.target.value)}
//               />
//               <TextField
//                 id="outlined-registerEmailText"
//                 label="Email"
//                 defaultValue=""
//                 helperText="Type your email here"
//                 type='email'
//                 onChange={(e) => setRegisterEmail(e.target.value)}
//               />
//               <TextField
//                 id="outlined-registerPasswordText"
//                 label="Password"
//                 defaultValue=""
//                 helperText="Type your password here"
//                 type='password'
//                 onChange={(e) => setRegisterPassword(e.target.value)}
//               />
//               <Button variant="contained" onClick={() => onRegisterSubmit()}>Register</Button>
//             </Box>
//           </Box>
//         }
//         {token &&
//           <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: '100%'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//               <TextField
//                 id="outlined-titleText"
//                 label="Title"
//                 defaultValue=""
//                 // helperText="Type your title here"
//                 type='text'
//                 onChange={(e) => setTitle(e.target.value)}
//                 sx={{ width: '100%' }}
//               />
//               <TextField
//                 id="outlined-descriptionText"
//                 label="Description"
//                 defaultValue=""
//                 // helperText="Type your description here"
//                 type='text'
//                 onChange={(e) => setDescription(e.target.value)}
//                 sx={{ width: '100%' }}
//               />
//               <FormControl fullWidth>
//                 <InputLabel id="priority-select">Priority</InputLabel>
//                 <Select
//                   labelId="priority-select-label"
//                   id="priority-select-input"
//                   value={priority}
//                   label="Priority"
//                   onChange={handleChange}
//                 >
//                   <MenuItem value={'low'}>Low</MenuItem>
//                   <MenuItem value={'medium'}>Medium</MenuItem>
//                   <MenuItem value={'high'}>High</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 id="outlined-dueDateText"
//                 label="Due Date"
//                 defaultValue=""
//                 // helperText="Type your due Date here"
//                 type='text'
//                 onChange={(e) => setDueDate(e.target.value)}
//                 sx={{ width: '100%' }}
//               />
//               <Button variant="contained" onClick={() => onTodoSubmit()}>Create Todo</Button>

//             </Box>
//             <Box ml={2} width={'100%'}>
//               <List sx={{ p: 4, bgcolor: 'background.paper' }}>
//                 {todos && todos.length && todos.map((value) => {
//                   const labelId = `checkbox-list-label-${value}`;

//                   return (
//                     <ListItem
//                       key={value}
//                       secondaryAction={
//                         <>
//                           <Chip label={value.priority} />
//                           <IconButton aria-label="delete" onClick={() => onTodoDelete(value.id)}>
//                             <DeleteIcon />
//                           </IconButton></>
//                       }
//                       disablePadding
//                     >
//                       <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//                         <ListItemIcon>
//                           <Checkbox
//                             edge="start"
//                             checked={checked.indexOf(value) !== -1}
//                             tabIndex={-1}
//                             disableRipple
//                             inputProps={{ 'aria-labelledby': labelId }}
//                           />
//                         </ListItemIcon>
//                         <ListItemText id={labelId} primary={`${value.title || '-'}`} />
//                       </ListItemButton>
//                     </ListItem>
//                   );
//                 })}
//               </List>
//             </Box>
//           </Box>
//         }
//       </Box>
//     </div>
//   );
// }

// export default App;


// import './App.css'
// import  {BrowserRouter, Route, Routes } from 'react-router-dom'
// import { CreateNew, Login, Register, UpdateCategory, CategoryList, Profile } from './pages'
// import { Product } from '../../functions/src/models';


//   function App() {
//     <BrowserRouter>
//           <Routes>
//             <Route path='/login' element={<Login />} /> 
//             <Route path='/register' element={<Register />} />
//             <Route path='/' element={<Product />} />
//             <Route path='/add' element={<CreateNew />} />
//             <Route path='/edit/:id' element={<UpdateCategory />} />
//             <Route path='/profile' element={<Profile />} />
//           </Routes>
//       </BrowserRouter>
  
//     return (

//   );

// }

//   export default App;



import { Button, Form, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Product() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [token, setToken] = useState(null)
  const [products, setProducts] = useState([])

  const URL = process.env.REACT_APP_BE_ENDPOINT

  console.log('data', title, description, priority, dueDate)

  const handleChange = (event) => {
     setPriority(event.target.value);
  };

  useEffect(() => {
      const tokenFromLS = localStorage.getItem('token')
      setToken(tokenFromLS)
    }, [])
      const getProduct = async () => {
      try {
        const response = await axios.get(`${URL}/v1/todos`,
          config
        )
        console.log('response getTodos', response)
        console.log('getTodos', response)
      if (response && response.data) setTodos(response.data.results)
      } catch (error) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }

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
      const user = localStorage.getItem('user')
      const parsedUser = JSON.parse(user)
      const createdBy = parsedUser?.id || ''
    
      axios.post(`${URL}/v1/todos`, {
        title,
        description,
        priority,
        dueDate,
        createdBy
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
    
  const onProductDelete = (todoId) => {
        try {
          axios.delete(`${URL}/v1/todos/${todoId}`,
            config
          )
            .then(function (response) {
              console.log('delete todo success', response);
              window.location.reload()
            })
            .catch(function (error) {
              console.log(error);
            });
    
        } catch (error) {
    
        }
    
  }


  return (
    <div className="App">
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          maxWidth: '',
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
      <div>
          <Form.Item 
          label="Title"
          id="outlined-titleText"
          type="text"
          defaultValue=""
          onChange={(e) => setTitle(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Input your title here!',
            },
          ]}>
            <Input />
          </Form.Item>

          <Form.Item
          label="Description"
          type="text"
          defaultValue=""
          id="outlined-descriptionText"
          onChange={(e) => setDescription(e.target.value)}
          rules={[
            {
              required: true,
              message: 'Input your description here!',
            },
          ]}
        >
            <Input.Password />
          </Form.Item>
        
          <Select
              defaultValue="Low"
              labelId="priority-select-label"
              id='priority-select-input'
              value={priority}
              label="Priority"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'low',
                  label: 'low',
                },
                {
                  value: 'medium',
                  label: 'medium',
                },
                {
                  value: 'high',
                  label: 'high',
                },
              ]}
            />

          <Form.Item
              label="Due Date"
              type="text"
              defaultValue=""
              id="outlined-dueDateText"
              onChange={(e) => setDueDate(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Input due date here!',
                },
              ]}
            >
                <Input.DueDate />
          </Form.Item>        

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
        >
          <Button type="primary" onClick={() => onProductSubmit()} htmlType="login">
            Login  
          </Button>
        </Form.Item>
      </div>
     </Form>
    </div>
  );
}

export default Product;