import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Graph3D from './components/Graph3D';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen theme-transition ${isDarkMode ? '' : 'light-mode'}`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Graph3D />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
