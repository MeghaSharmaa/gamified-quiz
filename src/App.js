import './App.css';
import {Route, Switch} from "react-router-dom";
import QuizScreen from "./Screens/QuizScreen";
import BackgroundImage2 from "./assets/images/background2.jpg";
import AnalyticsScreen from "./Screens/AnalyticsScreen";
import HomeScreen from "./Screens/HomeScreen";

function App() {
    return (
        <div
            style={{
                backgroundImage: `url(${BackgroundImage2})`,
                maxHeight: window.innerHeight,
                maxWidth: window.innerWidth,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
        >
            <Switch>
                <Route path="/" exact component={HomeScreen}/>
                <Route path="/quiz" exact component={QuizScreen}/>
                <Route path="/analytics" exact component={AnalyticsScreen}/>
            </Switch>
        </div>
    );
}

export default App;
