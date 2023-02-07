import { useEffect, useState } from 'react';

declare global {
  var handleToken: (token: string) => void;
}

function SignIn() {

  const [uid, setUid] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  
  function parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    function handleToken(obj: any) {
        const jwt = parseJwt(obj.credential);
        setUid(jwt.sub);
        setEmail(jwt.email);
        setFirstName(jwt.given_name);
        setLastName(jwt.family_name);
    }
    window.handleToken = handleToken;
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://accounts.google.com/gsi/client';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return <>
    <div className="App">
      <div>Google UserId:{uid}</div>
      <div>Email: {email}</div>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
    </div>
    <div id="g_id_onload"
      data-client_id="704936193834-0alolkp97r5g459b0nd5bdmt7484s6bk"
      data-context="signup"
      data-ux_mode="popup"
      data-callback="handleToken"
      data-auto_select="true"
      data-itp_support="true">
    </div>

    { uid ? <></>
    : <div className="g_id_signin"
      data-type="standard"
      data-shape="pill"
      data-theme="outline"
      data-text="signin"
      data-size="large"
      data-logo_alignment="left">
    </div>
    }
  </>;
}

export default SignIn;
