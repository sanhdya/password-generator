import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength]= useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str += "0123456789"
    if(character) str +="!@#$%^&*_-+={}[]?~`"
    for(let i =1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, number, character, setPassword]);
  const copyPassword = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-4 my-8 text-orange-500 bg-gray-800 text-center'>
        <h1 className='text-white text-center my-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password' readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0' onClick={copyPassword}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e) =>{setLength(e.target.value)}}/>
            <label>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={number} id='numberInput' onChange={() =>{
              setNumber((prev) => !prev);
            }} /> 
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={number} id='characterInput' onChange={() =>{
              setCharacter((prev) => !prev);
            }} /> 
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
