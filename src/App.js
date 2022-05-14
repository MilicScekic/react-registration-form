import './App.css';
import Signup from './components/Signup';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const AlertTemplate = ({ style, message, close }) => (
  <div onClick={close} style={style}>
    {message}
  </div>
);
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
};
function App() {
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Signup />
    </AlertProvider>
  );
}

export default App;
