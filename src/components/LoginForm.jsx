// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import { redirectTo } from 'fogg-utils';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// Contexts
import { FormContext } from '@contexts/form';
import { UserContext } from '@contexts/user';

// Components
import { Alert } from '@components';

const LoginForm = ({ currentUrl }) => {
  // States
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  // Contexts
  const { handleInputChange, values } = useContext(FormContext);
  const { login, google, facebook } = useContext(UserContext);

  // Effects
  useEffect(() => {
    if (!ready) setReady(true);
  }, [ready]);

  // Methods
  const handleLogin = async user => {
    const response = await login(user);

    if (response.error) {
      setInvalidLogin(true);
      setErrorMessage(response.message);
    } else {
      redirectTo(currentUrl || '/dashboard');
    }
  };

  const responseGoogle = async res => {
    const response = await google(res.accessToken);

    if (response.error) {
      setInvalidLogin(true);
      setErrorMessage('Request not successful, please try again');
    } else {
      redirectTo(currentUrl || '/dashboard');
    }
  };

  const responseFacebook = async res => {
    if (res) {
      const response = await facebook(res.accessToken);

      if (response.error) {
        setInvalidLogin(true);
        setErrorMessage('Request not successful, please try again');
      } else {
        redirectTo(currentUrl || '/dashboard');
      }
    }
  };

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-full mt-16 transition-all duration-200 bg-white sm:mt-24 lg:mt-32 sm:w-3/4 lg:w-5/12">
          <div className="px-12 py-6 rounded-lg shadow-md">
            <h1 className="pb-2 mb-6 text-4xl font-bold text-center text-gray-700 border-b">
              Login
            </h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <GoogleLogin
                buttonText="Login"
                clientId="1021304788868-4bfpvgk7dqfo10e56k1io56r517nknmi.apps.googleusercontent.com"
                cookiePolicy="single_host_origin"
                render={renderProps => (
                  <button
                    className="flex items-center justify-center w-full px-4 py-3 text-xs font-semibold tracking-wider text-black uppercase bg-white border rounded"
                    disabled={renderProps.disabled}
                    onClick={renderProps.onClick}
                    type="button"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                    Google
                  </button>
                )}
                onFailure={res => responseGoogle(res)}
                onSuccess={res => responseGoogle(res)}
              />

              <FacebookLogin
                appId="3084537424910860"
                callback={res => responseFacebook(res)}
                render={renderProps => (
                  <button
                    className="flex items-center justify-center w-full px-4 py-3 text-xs font-semibold tracking-wider text-white uppercase rounded facebook"
                    onClick={renderProps.onClick}
                    type="button"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 155.139 155.139"
                    >
                      <path d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z" />
                    </svg>
                    Facebook
                  </button>
                )}
              />

              <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-3 text-xs font-semibold tracking-wider text-white uppercase rounded twitter"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
                </svg>
                Twitter
              </button>
            </div>

            <hr className="my-6" />

            <Alert
              message={errorMessage}
              onClose={setInvalidLogin}
              open={invalidLogin}
            />

            <div className="flex flex-wrap mb-6 -mx-3">
              <div className="w-full px-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="block w-full px-4 py-3 leading-tight text-gray-700 transition-all duration-200 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-yellow-500 focus:shadow-outline"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  placeholder="john_doe@gmail.com"
                  type="email"
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
                    onChange={handleInputChange}
                    placeholder="********"
                    type={`${showPassword ? 'text' : 'password'}`}
                    value={values.password}
                  />

                  <button
                    className="absolute right-0 mr-6"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                    type="button"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 576 512" className="w-8 text-gray-500">
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
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
                className="px-6 py-2 text-white capitalize transition-all duration-200 bg-gray-200 bg-yellow-700 rounded shadow hover:bg-yellow-900"
                onClick={() => handleLogin(values)}
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.defaultProps = {
  currentUrl: ''
};

LoginForm.propTypes = {
  currentUrl: propTypes.string
};

export default LoginForm;
