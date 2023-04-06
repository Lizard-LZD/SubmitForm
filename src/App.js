import React from "react";
import { useForm } from "react-hook-form";
import './App.css'

export default function App() {
  // Create a useForm instance
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Define a function to handle form submission
  const onSubmit = (data) => {

    fetch("https://66b35316-443e-4443-8b20-f4a9133f6239.mock.pstmn.io/s", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Your personal information has been submitted successfully!");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(reset());
  };
  

  return (
    <div className="App">
      <h1>Submit Information Form</h1>
      {/* Use the handleSubmit function to wrap the onSubmit function */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Use the register function to register each input field */}
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: true })}
        />
        {/* Use the errors object to display error messages */}
        {errors.name && <p>Name is required</p>}

        <label htmlFor="birthday">Birthday(YYYY-MM-DD)</label>
        <input
          id="birthday"
          type="text"
          {...register("birthday", {
            required: true,
            pattern: /^\d{4}-\d{2}-\d{2}$/,
          })}
        />
        {errors.birthday && errors.birthday.type === "required" && (
          <p>Birthday is required</p>
        )}
        {errors.birthday && errors.birthday.type === "pattern" && (
          <p>Birthday is invalid</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p>Email is required</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>Email is invalid</p>
        )}

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          {...register("phone", { required: true })}
        />
        {errors.phone && <p>Phone is required</p>}

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          {...register("address", { required: true })}
        />
        {errors.address && <p>Address is required</p>}


        {/* Add a submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
