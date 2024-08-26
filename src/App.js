import { useState,useEffect } from 'react';
import './App.css';
import logo from './currency.gif'
import logo1 from './exchange.png'
//import axios from 'axios';

function App() {
  const [convertedamount,setConverted]=useState(0);
  const [Exchangerate,setExchangerate]=useState({})
  const [amount,setAmount]=useState(0)
  const [fromcur,setfromcur]=useState('USD')
  const [tocur,settocur]=useState('INR')
  const handlchange=(e)=>{
    const {name,value}=e.target
    switch(name){
      case 'amount':
        setAmount(value);
        break;
      case 'fromcur':
        setfromcur(value);
        break;
      case 'tocur':
        settocur(value);
        break;
      default:
    }
  }
  async function fetchdata(){
    const apikey=process.env.REACT_APP_CURRENCY_API_KEY
    const res=await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromcur}`)
    const data=await res.json()
    //console.log(data.conversion_rates)
    setExchangerate(data.conversion_rates)  
  }
  function Exchange(){
    setfromcur(tocur)
    settocur(fromcur)
  }
  useEffect(
    ()=>{
      fetchdata()
    },[fromcur]
  )
  useEffect(
    ()=>{
      const convertedrate=Exchangerate[tocur]
      if(convertedrate){
        const total=amount*convertedrate
        setConverted(total.toFixed(2))
      }
    },[amount,fromcur,tocur,Exchangerate]
  )
  return (
    <div classname='currency-exchange'>
      <img className='logo' src={logo} alt='image here'/>
      <h1 classname='text'>Currency Converter</h1>
      <div className='wrap'>
        <div className='input_container'>
          <label className='input_label'> Amount</label>
          <input type='number' name='amount' value={amount} onChange={handlchange} className='input_field'/>
        </div>
        <div className='input_container'>
          <label className='input_label'> From Currency</label>
          <select name="fromcur" value={fromcur} onChange={handlchange} className='input_field'>
            {/* <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option> */}
            {
              Object.keys(Exchangerate).map((ele)=>{
                return <option key={ele} value={ele}>{ele}</option>
              })
            }
          </select>
        </div>
        <div className='logo1'><img className='imagelogo' src={logo1} alt='exchange icon' onClick={Exchange}/></div>
        <div className='input_container'>
          <label className='input_label'> To Currency</label>
          <select name="tocur" value={tocur} onChange={handlchange} className='input_field'>
            {/* <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option> */}
            {
              Object.keys(Exchangerate).map((ele)=>{
                return <option key={ele } value={ele}>{ele}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className='Result'>
        <h2>Converted Amount: <b>{convertedamount} {tocur}</b></h2>
      </div>
    </div>
  );
}

export default App;
