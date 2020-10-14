import React, { useEffect } from 'react';
import seedDb from './seedDb';

function App() {
    useEffect(() => {
        seedDb().then(() => console.log('done'));
    }, []);
    return <div className="App">Processing</div>;
}

export default App;
