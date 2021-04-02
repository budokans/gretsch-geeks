import Router from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

export default function SignIn() {
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        Router.push(`/`);
      }}
    >
      <DisplayError error={false} />
      <fieldset disabled={false} aria-busy={false}>
        <label htmlFor="email">
          Email
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="name">
          Password
          <input
            required
            type="password"
            id="password"
            name="password"
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
