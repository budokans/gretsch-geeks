import styled from 'styled-components';
import SignIn from '../components/SignIn';
import RegisterUser from '../components/RegisterUser';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`;

export default function SignInPage() {
  return (
    <Grid>
      <SignIn />
      <RegisterUser />
    </Grid>
  );
}
