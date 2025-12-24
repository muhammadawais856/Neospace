import logo from './logo.svg';
import './App.css';
import Home from './Component/Home/Home';
import Header from './Component/Header';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Birthdays from './Component/Birthdays/Birthdays';
import Carpool from './Component/Carpool/Carpool';
import NUSTFruita from './Component/NUSTFruita/NUSTFruita';
import SmallBusiness from './Component/Small_Business/Small_business';
import Profile from './Component/Profile/Profile.js';
import Footer from './Component/Footer.js';
import VisitProfile from './Component/Birthdays/visit_profile.js';
import "./Styles/Footer.css"
import Offer_services from './Component/Birthdays/Offer_services.js';
import Carpoolvisitprofile from './Component/Carpool/Carpool_visit_profile.js';
import Carpool_offer_services from './Component/Carpool/Carpool_offer_services.js';
import Small_business_profile from "./Component/Small_Business/Small_business_profile.js"
import Small_business_item from './Component/Small_Business/Small_business_item.js';
import ScrollToTop from './ScrollToTop.js';
import Your_cart from './Component/Your_Cart/Your_cart.js';
import Business_offer_service from "./Component/Small_Business/Offer_services.js";
import My_store from './Component/Small_Business/My_Store.js';
import Birthday_Reviews from './Component/Birthdays/Birthday_Reviews.js';
import RateProduct from './Component/Rate_product.js';
import Login from './Component/Auth/Login.js';
import SignUp from './Component/Auth/signup.js';
function App() {
  return (
    <>
    
    <BrowserRouter>
    <ScrollToTop />
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offerservices" element={<Offer_services/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/birthdays" element={<Birthdays/>}></Route>
        <Route path="/carpool" element={<Carpool/>}></Route>
        <Route path="/nustfruita" element={<NUSTFruita/>}></Route>
        <Route path="/smallbusiness" element={<SmallBusiness/>}></Route>
        <Route path="/visitprofile" element={<VisitProfile/>}></Route>
        <Route path='/Carpoolvisitprofile' element={<Carpoolvisitprofile/>}></Route>
        <Route path='/Carpoolofferservices' element={<Carpool_offer_services/>}></Route>
        <Route path='/Smallbusinessprofile' element={<Small_business_profile />}></Route>
        <Route path='/Smallbusinessitem' element={<Small_business_item />}></Route>
        <Route path='yourcart'element={<Your_cart></Your_cart>}></Route>
        <Route path='businessofferservices' element={<Business_offer_service></Business_offer_service>}></Route>
        <Route path='mystore' element={<My_store></My_store>}/>
        <Route path='birthdayreviews' element={<Birthday_Reviews />}></Route>
        <Route path='rateproduct' element={<RateProduct />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    

    </>
  );
}

export default App;


