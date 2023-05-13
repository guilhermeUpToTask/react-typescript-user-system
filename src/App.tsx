import './App.css';
import React from 'react';
import { useState, useEffect } from 'react'
import { Session, createClient } from '@supabase/supabase-js'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const supabase = createClient('https://zspdgsakcitkwsydvsfi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzcGRnc2FrY2l0a3dzeWR2c2ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4ODkzODAsImV4cCI6MTk5OTQ2NTM4MH0.ZjySDbKgPmv8LYtQYtK1p3KPlaOFAX9CqbHS96USRb4')



function App(): React.ReactElement {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignIn, setIsSignIn] = useState(true);


  useEffect(() => {
    // first get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    })

    //get every time the user change
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    })

    return () => subscription.unsubscribe()
  }, [])


  if (loading) {
    return <div>Loading...</div>
  } else if (!session) {
    return (
      <>
        {isSignIn ? <SignIn supabase={supabase} /> : <SignUp supabase={supabase} />}
        <button onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? "Dont have a Account? - Sign Up" : "Already have a Account? - Sign In"}
        </button>
      </>
    )
  } else {
    return (
      <>
        <h1>Profile - {session.user.user_metadata?.first_name}</h1>
        <h2>User Info</h2>
        <p>Email: {session.user.email}</p>
        <p>Name: {session.user.user_metadata?.first_name}</p>
        <p>age : {session.user.user_metadata?.age}</p>

        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </>
    )
  }
}

export default App;
