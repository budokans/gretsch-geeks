import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { SIGN_IN_MUTATION } from './SignIn';
import { CURRENT_USER_QUERY } from './User';

const REGISTER_USER_MUTATION = gql`
  mutation REGISTER_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [createUser, { registerError, registerloading }] = useMutation(
    REGISTER_USER_MUTATION,
    {
      variables: inputs,
    }
  );

  const [signIn, { signInData, signInloading }] = useMutation(
    SIGN_IN_MUTATION,
    {
      variables: { email: inputs.email, password: inputs.password },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createUser();
    console.log(res);
    const res2 = await signIn();
    console.log(res2);
    Router.push(`/`);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <DisplayError error={registerError} />

      <fieldset disabled={registerloading} aria-busy={registerloading}>
        <label htmlFor="name">
          Name
          <input
            required
            aria-label="Name"
            type="name"
            name="name"
            autoComplete="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            required
            aria-label="Email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Password
          <input
            required
            aria-label="Password"
            type="password"
            name="password"
            minLength="8"
            autoComplete="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
