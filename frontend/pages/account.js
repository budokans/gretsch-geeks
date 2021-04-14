import Head from 'next/head';
import PleaseSignIn from '../components/PleaseSignIn';

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>Sick Fits | Your Account</title>
      </Head>
      <PleaseSignIn>
        <h2>Account page</h2>
      </PleaseSignIn>
    </>
  );
}
