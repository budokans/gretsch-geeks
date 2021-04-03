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

  const [
    createUser,
    { error: registerError, loading: registerloading },
  ] = useMutation(REGISTER_USER_MUTATION, {
    variables: inputs,
  });

  const [signIn, { data: signInData, loading: signInloading }] = useMutation(
    SIGN_IN_MUTATION,
    {
      variables: { email: inputs.email, password: inputs.password },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const signInErrorMessage =
    signInData?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? signInData.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createUser().catch(console.error);
    if (res?.data?.createUser) {
      const resSignIn = await signIn();
      if (
        resSignIn.data.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        Router.push(`/`);
      }
    }
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <DisplayError error={registerError || signInErrorMessage} />

      <fieldset
        disabled={registerloading || signInloading}
        aria-busy={registerloading || signInloading}
      >
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
