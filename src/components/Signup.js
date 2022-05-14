import { useState } from 'react';
import { useAlert } from 'react-alert';

const axios = require('axios');

function Signup() {
  const [showPassword, setShowPassword] = useState('password');
  const [profile, setProfile] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const alert = useAlert();
  const handleChange = (e) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validation = (e) => {
    e.preventDefault();
    const emailformat = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );
    const passwordformat = new RegExp(
      `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`
    );
    if (profile.username.length < 6 || profile.username.length > 12) {
      alert.show(
        <div className='bg-red-500 text-white p-3 rounded-full'>
          Username must contain a minimum of 6 and a maximum of 12 characters!
        </div>
      );
    } else if (profile.firstname.length < 1) {
      alert.show(
        <div className='bg-yellow-500 text-white p-3 rounded-full'>
          Firstname is a required field!
        </div>
      );
    } else if (profile.lastname.length < 1) {
      alert.show(
        <div className='bg-yellow-500 text-white p-3 rounded-full'>
          Lastname is a required field!
        </div>
      );
    } else if (!emailformat.test(profile.email)) {
      alert.show(
        <div className='bg-red-500 text-white p-3 rounded-full'>
          Email address is not valid!
        </div>
      );
    } else if (
      profile.password < 1 ||
      profile.confirmpassword < 1 ||
      !passwordformat.test(profile.password) ||
      !passwordformat.test(profile.confirmpassword) ||
      profile.confirmpassword !== profile.password
    ) {
      alert.show(
        <div className='bg-yellow-500 text-white p-3 rounded-full'>
          Password must contain atleast 8 characters, one number, both lower and
          uppercase letters and special character. Confirm password and password
          must be the same!
        </div>
      );
    } else {
      let { username, firstname, lastname, email, password } = profile;
      axios
        .post('https://jsonblob.com/api/jsonBlob', {
          username,
          firstname,
          lastname,
          email,
          password,
        })
        .then(function (response) {
          alert.show(
            <div className='bg-green-500 text-white p-3 rounded-full'>
              Account created! username: {response.data.username}, firstname:{' '}
              {response.data.firstname}, lastname {response.data.lastname},
              email {response.data.email}
            </div>
          );
        })
        .catch(function (error) {
          alert.show(
            <div className='bg-red-500 text-white p-3 rounded-full'>
              {error.message}
            </div>
          );
        });
    }
  };

  const passwordHandle = () => {
    if (showPassword === 'password') {
      setShowPassword('text');
    }
    if (showPassword === 'text') {
      setShowPassword('password');
    }
  };
  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-2xl font-bold text-center text-yellow-400 sm:text-3xl'>
          Registration
        </h1>
        <form
          onSubmit={validation}
          className='p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl'
        >
          <div>
            <label htmlFor='username' className='text-sm font-medium'>
              Username
            </label>

            <div className='relative mt-1'>
              <input
                type='text'
                id='username'
                name='username'
                value={profile.username}
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter username'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='relative mt-1 flex gap-10'>
            <div>
              <label htmlFor='firstname' className='text-sm font-medium'>
                Firstname
              </label>
              <input
                type='text'
                id='firstname'
                name='firstname'
                value={profile.firstname}
                required
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter firstname'
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor='lastname' className='text-sm font-medium'>
                Lastname
              </label>

              <input
                type='text'
                id='lastname'
                name='lastname'
                value={profile.lastname}
                required
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter lastname'
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor='email' className='text-sm font-medium'>
              Email
            </label>

            <div className='relative mt-1'>
              <input
                type='email'
                id='email'
                name='email'
                value={profile.email}
                required
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter email'
                onChange={handleChange}
              />

              <span className='absolute inset-y-0 inline-flex items-center right-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor='password' className='text-sm font-medium'>
              Password
            </label>

            <div className='relative mt-1'>
              <input
                type={showPassword}
                id='password'
                name='password'
                value={profile.password}
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter password'
                onChange={handleChange}
              />

              <span
                className='absolute inset-y-0 inline-flex items-center right-4'
                onClick={passwordHandle}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor='confirmpassword' className='text-sm font-medium'>
              Confirm password
            </label>

            <div className='relative mt-1'>
              <input
                type={showPassword}
                id='confirmpassword'
                name='confirmpassword'
                value={profile.confirmpassword}
                className='w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm focus:border-yellow-400 focus:ring-yellow-400'
                placeholder='Enter password'
                onChange={handleChange}
              />

              <span
                className='absolute inset-y-0 inline-flex items-center right-4'
                onClick={passwordHandle}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type='submit'
            className='block w-full px-5 py-3 text-sm font-medium text-white bg-yellow-400 rounded-lg'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
