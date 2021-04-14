import Head from 'next/head';
import PleaseSignIn from '../components/PleaseSignIn';
import RequestReset from '../components/RequestReset';
import { useUser } from '../components/User';

export default function AccountPage() {
  const me = useUser();

  return (
    <>
      <Head>
        <title>Sick Fits | {`${!me ? 'Your' : me.name}'s Account`}</title>
      </Head>
      <PleaseSignIn>
        <h2>Signed in as {me.name}</h2>
        <RequestReset />
      </PleaseSignIn>
    </>
  );
}
