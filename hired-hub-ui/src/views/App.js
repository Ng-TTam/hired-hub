import './App.css';
// import Loader from '../components/Loader/Loader';
// import DownloadButton from '../components/DownloadButton/DownLoadButton';
import LoginForm from '../components/LoginForm';
// import NotificationBadge from '../components/NotificationBadge/NotificationBadge';

function App() {
  return (
    <div className="App">
      <header className="">
        {/* <Loader/>
        <DownloadButton/> */}
      </header>
      <body className='App-body'>
        <LoginForm/>
        {/* <NotificationBadge unreadCount={2}/> */}
      </body>
    </div>
  );
}

export default App;
