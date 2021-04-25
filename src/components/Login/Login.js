import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import { UserContext } from '../hooks/UserContext';
import { Redirect } from 'react-router-dom';
import Container from '../Container';

export default function Login({ setToken }) {
  const { user, isLoading } = useContext(UserContext);
  const { values, handleChange } = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  const { loginUser } = useAuth();

  if (isLoading) {
    return <div />;
  }

  if (user) {
    return <Redirect to={`/${user.id}/${user.role}/home`} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(values);
  };

  return (
    <Container>
      <div className='col-lg-12 bigger'>
        <div className='h-80 d-flex justify-content-center align-items-center mt-3 px-3 '>
          <div className='border rounded shadow-sm m-5'>
            <form onSubmit={handleLogin} className='m-3'>
              <div className='mb-3'>
                <label class='form-label'>Email Address</label>
                <input
                  type=''
                  class='form-control'
                  onChange={(e) => handleChange('username', e)}
                />
              </div>
              <div className='mb-3'>
                <label class='form-label'>Password</label>
                <input
                  type='password'
                  class='form-control'
                  onChange={(e) => handleChange('password', e)}
                />
              </div>
              <div className='mb-3'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                />
                <label class='form-check-label ms-2' for='flexCheckDefault'>
                  Remember me
                </label>
              </div>
              <div className='mb-4'>
                <button type='submit' class='btn btn-primary mb-3'>
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
