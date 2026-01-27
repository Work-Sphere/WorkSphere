import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Footer from './pages/Footer';
import AppRoutes from './routes/AppRoutes';



function App() {
  return (
    <div className="app-container">
      <Router>
        <AppRoutes />
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
