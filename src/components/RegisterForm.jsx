// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { redirectTo } from 'fogg-utils';

// Contexts
import { FormContext } from '@contexts/form';
import { UserContext } from '@contexts/user';

const RegisterForm = ({ currentUrl }) => {
  // States
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  // Contexts
  const { handleInputChange, values } = useContext(FormContext);
  const { createUser } = useContext(UserContext);

  // Methods
  const handleRegister = async user => {
    const response = await createUser(user);

    if (response.error) {
      setInvalidLogin(true);
      setErrorMessage(response.message);
    } else {
      redirectTo(currentUrl || '/');
    }
  };

  // Effects
  useEffect(() => {
    if (!ready) setReady(true);
  }, [ready]);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-full mt-16 transition-all duration-200 bg-white sm:mt-24 lg:mt-32 sm:w-3/4 md:w-4/5 lg:w-2/5">
          <div className="px-12 py-6 rounded-lg shadow-md">
            <h1 className="pb-2 mb-6 text-4xl font-bold text-center text-gray-700 border-b">
              Register
            </h1>

            {invalidLogin && (
              <div
                className="relative px-4 py-3 mt-2 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
                role="alert"
              >
                <strong className="mr-2 font-bold">Holy smokes!</strong>
                <span className="block sm:inline">{errorMessage}.</span>
                <span
                  className="absolute top-0 bottom-0 right-0 visible px-4 py-3"
                  role="button"
                  tabIndex="0"
                  onClick={() => setInvalidLogin(false)}
                  onKeyDown={() => setInvalidLogin(false)}
                >
                  <svg
                    className="w-6 h-6 text-red-500 fill-current"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Jhon"
                  onChange={handleInputChange}
                  value={values.firstName}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  onChange={handleInputChange}
                  value={values.lastName}
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="jhon_doe"
                  onChange={handleInputChange}
                  value={values.username}
                />
              </div>
              <div className="w-full px-3 md:w-1/2">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="jhon_doe@gmail.com"
                  onChange={handleInputChange}
                  value={values.email}
                />
              </div>
            </div>

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                    id="password"
                    name="password"
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="********"
                    onChange={handleInputChange}
                    value={values.password}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 mr-6"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 576 512" className="w-8 text-gray-500">
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                          className=""
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 640 512" className="w-8 text-gray-500">
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 text-white capitalize transition-all duration-200 bg-gray-200 bg-yellow-700 rounded shadow hover:bg-yellow-900"
                onClick={() => handleRegister(values)}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterForm.defaultProps = {
  currentUrl: ''
};

RegisterForm.propTypes = {
  // eslint-disable-next-line
  createUser: propTypes.func,
  currentUrl: propTypes.string
};

export default RegisterForm;
