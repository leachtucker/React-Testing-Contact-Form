import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from 'axios'

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    axios.post('https://reqres.in/api/users', data)
      .then(resp => {
        console.log(resp);
        setData(resp.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email">
            Email*
          </label>
          <input name="email" ref={register({ required: true })} placeholder="bluebill1049@hotmail.com" />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea name="message" role='messageInput' ref={register({ required: false })} />
        </div>
        {data && (
          <pre title='output' style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <button role='button' type="submit">Submit!</button>
      </form>
    </div>
  );
};

export default ContactForm;
