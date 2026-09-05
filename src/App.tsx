import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from '/Users/ishi/Desktop/github-projects/gf-site-react/src/pages/homepage/index.tsx'
import ImageGallery from '/Users/ishi/Desktop/github-projects/gf-site-react/src/pages/image-gallery/index.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<ImageGallery />} />
    </Routes>
  );
}
export default App
