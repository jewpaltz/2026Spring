import { BrowserRouter } from 'react-router'
import NavBar from './components/NavBar'
import RouterView from './router'


const MessageList = () => <div>MessageList</div>
const DialogBoxes = () => <div>DialogBoxes</div>

const sessionStore = {
  isLoading: false
}

export default function App() {
  

  return (
    <>
    <BrowserRouter>
        <NavBar />
          <div className="container">
            { sessionStore.isLoading &&
            <progress className="progress is-primary"></progress>}
            <MessageList />
            <RouterView />
          </div>
        <DialogBoxes />
        </BrowserRouter>
    </>
  )
}

