const {app}=require('../server');

app.get('/api',(req, res)=>{
    res.send({'mensaje': 'hola Nati'})
 
 })