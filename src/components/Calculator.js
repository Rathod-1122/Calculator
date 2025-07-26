import React, { useRef } from 'react'
import './Cal.css';
import { evaluate } from 'mathjs';


function Calculator() {

  let inputValu1Ref=useRef();
  let inputValu2Ref=useRef();  
  let finalAnsRef=useRef();
  let operatorRef=useRef();

  // let [initialVal1,setInitialVal1]=useState('');
  // let [initialVal2,setInitialVal2]=useState('');

  let initialVal1='';
  let initialVal2='';

  let ans;
  let val1FocStatus=false;
  let val2FocStatus=false;

  let updatedInitialVal1=(p)=>{

    // if(operatorRef.current.value!=null)
    
    if(val1FocStatus){
      initialVal1=initialVal1.concat(p);
      inputValu1Ref.current.value=initialVal1;
      inputValu1Ref.current.style.backgroundColor='lightblue';
      inputValu1Ref.current.style.boxShadow='0 0 0 2px #0b71d0ff';
    }
    
    if(val2FocStatus){
      initialVal2=initialVal2.concat(p);
      inputValu2Ref.current.value=initialVal2;
      inputValu2Ref.current.style.backgroundColor='lightblue';
      inputValu2Ref.current.style.boxShadow='0 0 0 2px #0b71d0ff';
    }

  }

  let deleteValue=()=>{
    if(val1FocStatus){
      initialVal1=initialVal1.slice(0,initialVal1.length-1);
      inputValu1Ref.current.value=initialVal1;
    }
    if(val2FocStatus){
      initialVal2=initialVal2.slice(0,initialVal2.length-1)
      inputValu2Ref.current.value=initialVal2;
    }

  }

  return (
    <div className='App'>
      
      <div className='container'>

        <div className='inputContainer'>
          <h1><u>Calculator</u></h1>
          <input ref={inputValu1Ref} type='text' 
          onFocus={()=>{
            val1FocStatus=true;
            val2FocStatus=false;
            inputValu1Ref.current.style.backgroundColor='lightblue';
          }} onChange={()=>{
            initialVal1=inputValu1Ref.current.value;
            inputValu1Ref.current.style.backgroundColor='lightblue';
          }} onBlur={()=>{
            inputValu1Ref.current.style.backgroundColor='';
          }} placeholder='0'/>

          <input ref={operatorRef} type='text' style={{width:'20%'}} placeholder='+'  onFocus={()=>{
            operatorRef.current.style.backgroundColor='lightblue'
          }} onChange={()=>{
            operatorRef.current.style.backgroundColor='lightblue'
          }} onBlur={()=>{
            operatorRef.current.style.backgroundColor=''
          }}/>
          
          <input ref={inputValu2Ref} type='text' 
          onFocus={()=>{
            val2FocStatus=true;
            val1FocStatus=false;
            inputValu2Ref.current.style.backgroundColor='lightblue';
          }} onChange={()=>{
            initialVal2=inputValu2Ref.current.value;
            inputValu2Ref.current.style.backgroundColor='lightblue';
          }} onBlur={()=>{
            inputValu2Ref.current.style.backgroundColor='';
          }} placeholder='0' />

          <input ref={finalAnsRef} readOnly type='text' style={{margin:'10px'}} placeholder='Ans' />
        </div> 

        {/* -------------------Buttons------------------- */}

        <div className='buttonContainer'>
          {[...'+-*/%'].map((op,i)=>( 
            <button type='button'  onClick={()=>{operatorRef.current.value=op}} key={i}>{op}</button>
          ))}

          
          <button type='button'  onClick={()=>{
            
            finalAnsRef.current.style.backgroundColor='lightgreen';
            finalAnsRef.current.style.boxShadow='0 0 0 2px green';
            val1FocStatus=false;
            val2FocStatus=false;
            ans=`${initialVal1}${operatorRef.current.value}${initialVal2}`;
            finalAnsRef.current.value=`${ans} = ${evaluate(ans)}`;
            // console.log(ans);
          }}><b style={{color:'black', fontSize:'1.2rem'}}>=</b></button>

          <button type='button' title='all clear' onClick={()=>{
            initialVal1='';
            initialVal2='';
            val1FocStatus=false;
            val2FocStatus=false;
            inputValu1Ref.current.value=null;
            inputValu2Ref.current.value=null;
            operatorRef.current.value=null;
            finalAnsRef.current.value=null;
          }}>AC</button>

          <button type='button' title='Delete' onClick={()=>{
            deleteValue();
          }}>D</button>

          {[...'0123456789.'].map(n => (
            <button key={n} type='button' onClick={() => updatedInitialVal1(n)}>{n}</button>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Calculator