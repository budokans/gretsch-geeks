import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const errorMessage =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    const { res } = await signin();
    if (
      res.data.authenticateUserWithPassword.__typename ===
      'UserAuthenticationWithPasswordSuccess'
    ) {
      Router.push(`/`);
    }
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account</h2>

      <DisplayError error={errorMessage} />

      <fieldset disabled={loading} aria-busy={loading}>
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
            autoComplete="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Sign in</button>
      </fieldset>
    </Form>
  );
}
