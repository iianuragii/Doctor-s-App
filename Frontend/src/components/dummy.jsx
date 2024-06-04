import React, { useEffect, useState } from 'react'
import axios from 'axios';

const dummy = () => {
    const [value,setValue] = useState(null);

    useEffect(() => {       
            fetch("http://localhost:5000/api")
            .then(res=>res.json())
            .then(value=>setValue(value.val))
            .catch(err => console.log("Error:-",err));
    })  
    
    
  return (
    <div>
        {value ? value : "Wait Man!!"}
    </div>
  )
}

export default dummy