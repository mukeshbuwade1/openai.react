import React, { useRef, useState } from 'react';
import { askQuestion } from '../APIService/APIService';
import { Dna } from 'react-loader-spinner'



function QuestionScreen() {
  const inputRef = useRef('')
  const [status, setStatus] = useState("");
  const [answer, setAnswer] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    let question = inputRef.current.value
    if(!question  || typeof question!=="string"|| question.trim().length===0){
      alert("Script Error Refresh Page")
      return
    } 
    setStatus("loading")
    let data = {
      "question": question
    }
    try {
      // connection with node sever 
      let res = await askQuestion(data)
      if (res?.error) {
        alert(res?.message ?? "Something went wrong")
        setStatus("error")
      } else {
        setAnswer(res?.data.answer[0].text)
        setStatus("success")
      }
    } catch (error) {
      console.log("error", error)
      alert(error?.message ?? "Something went wrong")
      setStatus("error")
    }
  }
 
  return (
    <div className='container' >
      <h1 className='page-heading' >AI Based Answer Generator</h1>
      {/* input section and submit button  */}
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="text-input">
          <input
            type="text"
            id="question"
            ref={inputRef}
            required
            autoComplete="off"
          />
          <div className="underline"></div>
          <label htmlFor="question">Your Question</label>
        </div>
        <button type="submit"> {status === "loading" ? "Generating Answer" : "Submit"}</button>
      </form>
      {/* answer container with loader  */}
      <div className='ans-container' >
        {
          status === "loading" ? <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{ width: "100%", display: "flex", justifyContent: "center" }}
            wrapperClass="dna-wrapper"
          />
            : status === ""
              ? <></>
              : <>
                <h1 className='ans-heading'>Answer </h1>
                <p className='ans'>{answer}</p>
              </>
        }
      </div>
    </div>
  );
}

export default QuestionScreen;