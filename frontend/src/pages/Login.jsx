import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const history = useHistory();

  const handle = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/login', { phone, password: pass });
      localStorage.setItem('token', data.token);
      history.push('/');
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <div className="p-4">
      <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={handle}>Login</button>
      <button onClick={() => history.push('/register')}>Register</button>
    </div>
  );
}
