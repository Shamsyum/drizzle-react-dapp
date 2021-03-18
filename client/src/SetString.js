import './App.css';
import {useState} from 'react';

function SetString(props) {

    const [stakeId, setStakeId] = useState(null);

    const handleKeyDown = e => {
        if(e.keyCode === 13) {
            setValue(e.target.value);
        }
    };

    const setValue = value => {
        const {drizzle, drizzleState} = props;
        const contract = drizzle.contracts.MyStringStore;

        const stackId = contract.methods["set"].cacheSend(value,{
            from: drizzleState.accounts[0]
        });
        setStakeId(stackId);
    }

    const getTxStatus = () => {
        const {transactions, transactionStack} = props.drizzleState;
        const txHash = transactionStack[stakeId];
        if(!txHash)return null;
        return `transaction status: ${transactions[txHash] && transactions[txHash].status}`; 
    }
    
    return(
        <div>
            <input type="text" onKeyDown={handleKeyDown}/>
            <div>{getTxStatus()}</div>
            
        </div>
    );
}

export default SetString;