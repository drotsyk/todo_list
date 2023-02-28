import React,{useState} from 'react'
import {Header} from '../Components/Header'
import {List} from '../Components/List'
import {useNavigate} from 'react-router-dom'
import {IList} from '../Interface/type'
import {IUser} from '../Interface/type'
import {Link} from 'react-router-dom'

interface HomeProps {
  setAuth: (auth:IUser | null) => void
  auth: IUser | null
}

export const Home: React.FC<HomeProps> = ({setAuth, auth}) => {
  const [list, setList] = useState<IList[]>([])
  const [id, setId] = useState<number>(0)
  const [filterList, setFilterList] = useState(list)
  const navigate = useNavigate()

  const pushDate = (text: string): void => {
    const newTodo = {
      text: text,
      id: id,
      checkbox: false
    }
    setId(id + 1)
    setList([...list, newTodo])
    setFilterList([...filterList, newTodo])
  }

  const deleteTodo = (id: number): void => {
    setFilterList([...list].filter(item => item.id !== id))
    setList([...list].filter(item => item.id !== id))
  }

  const checkTodo = (id: number): void => {
    const newTodoList = [...list].map(item => {
      if (id === item.id) {
        return {
          ...item, checkbox: !item.checkbox
        }
      }
      return item
    })
    setFilterList(newTodoList)
    setList(newTodoList)
  }

  const onLogOut = () => {
    setAuth(null)
    localStorage.removeItem('authUser')
    navigate('/Login')
  }

  const filterTodo = (text: string): void => {
    switch (text) {
      case 'All': setFilterList([...list])
        return
      case 'Complited':
        setFilterList([...list].filter(item => item.checkbox === true))
        return
      case 'Not complited':
        setFilterList([...list].filter(item => item.checkbox === false))
        return
      default:
        break;
    }
  }

  return (
    <div>
      {auth ? (
        <>
          <Header pushDate={pushDate} />
          <List checkTodo={checkTodo} deleteTodo={deleteTodo} items={filterList} filterTodo={filterTodo} list={list}/>
          <button className='log_out' onClick={() => onLogOut()}>Log out <span className='log_out__text'>{auth?.email}</span></button>
        </>
      ):(
        <>
          <h1>Please  <Link to='/register'>Register</Link> or <Link to='/login'>Log in</Link></h1>
        </>
      )}
    </div>
  )
}
