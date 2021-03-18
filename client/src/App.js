import './App.css';
import {useState, useEffect} from 'react';
import ReadString from './ReadString.js';
import SetString from './SetString.js';


function App(props) {

  const [loading, setLoading] = useState(true);
  const [drizzleState, setDrizzleState] = useState(null);

  useEffect(()=>{
    const { drizzle } = props;

    const unsubscribe = drizzle.store.subscribe(()=>{

      console.log("drizzle in app = ",drizzle);
      
      const drizzleState = drizzle.store.getState();

      console.log("drizzle state in app = ",drizzleState);

      if(drizzleState.drizzleStatus.initialized){
        
        setDrizzleState(drizzleState);
        setLoading(false);
      }
    });

    return ()=>{
      unsubscribe();
    }

  },[]);

    if(loading) return "Loading Drizzle...";
    return (
      <div className="App">
      
      Drizzle is Ready
      
      <ReadString
        drizzle={props.drizzle}
        drizzleState={drizzleState}
      />
      <SetString
        drizzle={props.drizzle}
        drizzleState={drizzleState}
      />
      
      </div>
      
    );
}

export default App;
