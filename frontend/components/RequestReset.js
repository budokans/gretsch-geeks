import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [sendUserPasswordResetLink, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    await sendUserPasswordResetLink().catch(console.error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset password</h2>

      <DisplayError error={error} />

      {data?.sendUserPasswordResetLink === null && (
        <p>Success! Check your email for your password reset link.</p>
      )}

      {data?.sendUserPasswordResetLink !== null && (
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

          <button type="submit">Reset</button>
        </fieldset>
      )}
    </Form>
  );
}
