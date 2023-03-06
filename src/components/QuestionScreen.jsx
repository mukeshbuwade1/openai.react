import React, { useState } from 'react';
import { askQuestion } from '../APIService/APIService';
import { Bars, Dna } from 'react-loader-spinner'



function QuestionScreen() {
  const [status, setStatus] = useState("");
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('AI Based Answer GeneratorAI Based Answer GeneratorAI Based Answer GeneratorAI Based Answer Generator');

  function handleInputChange(event) {
    setQuestion(event.target.value);
  }

  async function handleSubmit(event) {
    setStatus("loading")
    event.preventDefault();
    // Do something with the question input (e.g. send it to a server)
    console.log('Question:', question);
    let data = {
      "question": question
    }
    try {
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

    // setQuestion('');
  }
  console.log("ans", answer)
  return (
    <div className='container' >
      <h1 className='page-heading' >AI Based Answer Generator</h1>
      {/* input section and submit button  */}
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="text-input">
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleInputChange} required
            autocomplete="off"
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
                <p>{answer}</p>
              </>
        }
      </div>
    </div>
  );
}

export default QuestionScreen;