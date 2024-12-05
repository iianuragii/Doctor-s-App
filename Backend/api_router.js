const express = require('express');
const router = express.Router();

router.get('/anu', (req, res) => {
    res.status(200).send({
        department: 'Hepatologist',
        allocationDate: 'ddmmyyyy',
        allocationTime: '1030'  // 24 hours format
    })
    console.log("GET API is running SUCCESSFULLY");    
});

module.exports = router;
