import '../../App.css';
import Info from './info';
import {Navbar} from '../Global Components/navbar';
import {Footer} from '../Global Components/Footer';



function Champion() {
    return (
        <div className="champion">
            <Navbar />
            <Info />
            <Footer />
        </div>
    );
}

export default Champion;
