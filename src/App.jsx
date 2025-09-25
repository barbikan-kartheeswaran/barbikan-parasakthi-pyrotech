import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbars from './pages/Navbar';
import RetailPrice from './pages/RetailPrice';
import About from './pages/About';
import WholeSale from './pages/WholeSale';
import GiftBox from './pages/GiftBox';
import Contact from './pages/Contact';
import FamilyPack from './pages/FamilyPack';
import ComboPack from './pages/ComboPack';
import Footer from './Components/Footer/Footer';
import Bankfooter from './Components/Bank Footer/Bankfooter';
import PremiumPack from './pages/PremiumPack';

function App() {
	return (
		<div className='App'>
			<Navbars />
			<Routes>
				<Route path='/' element={<RetailPrice />} />
				<Route path='/retail' element={<RetailPrice />} />
				<Route path='/family-pack' element={<FamilyPack />} />
				<Route path='/wholesale' element={<WholeSale />} />
				<Route path='/gift-box' element={<GiftBox />} />
				<Route path='/combo-pack' element={<ComboPack />} />
				<Route path='/premium' element={<PremiumPack />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/about' element={<About />} />
			</Routes>
			<Bankfooter />
			<Footer />
		</div>
	);
}

export default App;
