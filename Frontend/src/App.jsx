// import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css';

// import Footer from './pages/Footer';
// import AppRoutes from './routes/AppRoutes';



// function App() {
//   return (
//     <div className="app-container">
//       <Router>
//         <AppRoutes />
        
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import Footer from "./pages/Footer";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div className="app-container">
        <Router>
          <AppRoutes />
          <Footer />
        </Router>
      </div>
    </SearchProvider>
  );
}

export default App;
