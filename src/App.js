import {BrowserRouter, Route, Routes} from "react-router-dom";

import {HomePage, MediaPage, MediaDetailsPage,  PersonPage, AccountPage,} from "./pages";

import {mediaType} from "./api";

import './styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Footer, Header} from "./components";


function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/movie'} element={<MediaPage mediaTyp={mediaType.movie}/>}/>
                <Route path={'/tv'} element={<MediaPage mediaTyp={mediaType.tv}/>}/>
                <Route path={'/:mediaType/:id'} element={<MediaDetailsPage/>}/>
                <Route path={'/person/:id'} element={<PersonPage/>}/>
                <Route path={'/account'} element={<AccountPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
