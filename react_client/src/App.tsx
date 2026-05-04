
const NavBar = () => <div>NavBar</div>
const MessageList = () => <div>MessageList</div>
const RouterView = () => <div>RouterView</div>
const DialogBoxes = () => <div>DialogBoxes</div>

const sessionStore = {
  isLoading: false
}

export default function App() {
  

  return (
    <>
        <NavBar />
          <div className="container">
            { sessionStore.isLoading &&
            <progress className="progress is-primary"></progress>}
            <MessageList />
            <RouterView />
          </div>
        <DialogBoxes />
    </>
  )
}

