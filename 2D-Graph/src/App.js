import { Navbar, Container} from 'react-bootstrap';
import logo from './img/logo.png';

const App = () => {


    return (
        // RU:Шапка сайта с логотипом 
        // EN:Site header with logo
        <Navbar variant="light">
            <Container>
                <Navbar.Brand href="https://nti2035.ru/markets/edunet">
                    <img src={logo} width={100} alt="not found" ></img>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Created by: <a href="https://www.voenmeh.ru/">YourStart</a>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    
};


export default App;
