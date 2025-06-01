
const clientId = 'f1f9a66af54d43d49ededb892628f605';
const redirectUri = 'http://127.0.0.1:3000/';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const generateRandomString = length => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => possible.charAt(x % possible.length)).join('');
};

const sha256 = async plain => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return new Uint8Array(hash);
};

const base64urlEncode = buffer => {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const initiateLogin = async () => {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await sha256(codeVerifier).then(base64urlEncode);

  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public' ;

  const authUrl = `${authEndpoint}?response_type=code&client_id=${encodeURIComponent(clientId)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

  window.location = authUrl;
};

export const handleRedirect = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error');

  if (error) {
    console.error('Spotify Auth Error:', error);
    return null;
  }

  if (!code) return null; // Not on callback yet

  const codeVerifier = localStorage.getItem('spotify_code_verifier');

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem('spotify_access_token', data.access_token);
    window.history.replaceState({}, document.title, '/'); // Clean the URL
    return data.access_token;
  }

  console.error('Token exchange failed:', data);
  return null;
};

export const getStoredToken = () => {
  return localStorage.getItem('spotify_access_token');
};
