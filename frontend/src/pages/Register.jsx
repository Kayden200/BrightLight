import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Register() {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();

  const handle = async () => {
    if (pass !== confirm) return alert('Passwords do not match');
    try {
      await axios.post('http://localhost:4000/api/auth/register', { phone, password: pass, code });
      history.push('/login');
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
      <input placeholder="Invite Code (optional)" value={code} onChange={e => setCode(e.target.value)} />
      <button onClick={handle}>Register</button>
      <button onClick={() => history.push('/login')}>Already have an account? Log in</button>
    </div>
  );
  }
