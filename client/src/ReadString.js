import './App.css';
import {useState, useEffect} from 'react';

function ReadString(props) {

    const [dataKey, setDataKey] = useState(null);

    useEffect(()=>{
        const {drizzle} = props;
        const contract = drizzle.contracts.MyStringStore;

        const dataKey = contract.methods["myString"].cacheCall();
        setDataKey(dataKey);
    },[])

    const {MyStringStore} = props.drizzleState.contracts;
    const myString = MyStringStore.myString[dataKey];
    return(
        <div>
            <div>Hello in readString</div>
            <p>My stored string: {myString && myString.value}</p>
        </div>
    );
}

export default ReadString;