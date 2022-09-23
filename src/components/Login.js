import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: ''
  });

  const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(
      email: $email
      password: $password
      username: $username
    ){
      user {
        id
      }
    }
  }
`;

  const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      username: formState.username,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate("/");
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables:{
      email: formState.email,
      password: formState.password,
      username: formState.name
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate("/");
    }
  });

  return (
    <div>
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value
            })
          }
          type="text"
          placeholder="Your username"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;