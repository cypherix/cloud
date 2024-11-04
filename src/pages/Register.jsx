import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
  const Register = () => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [Captcha,setCaptcha] = useState(true);
  
    // Handling the Form Submission
    const handleSubmit = async (e) => {
      console.log(formData);
      e.preventDefault();
      if (!Captcha) {
        toast.error('Please fill the captcha');
        return;
      }  
      setIsLoading(true);
  
      try {
        const response = await fetch('http://18.225.36.241:3001/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success(data.message);
          navigate('/login');
          toast("Now you can Login");
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to register. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      setFormData({ ...formData, [name]: value });
      
    }

    return(<>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register a New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} >
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                //  value={formData.username}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
            
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  // value={formData.email}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
            
                  id="location"
                  name="location"
                  type="location"
                  onChange={handleChange}
                  // value={formData.email}
                  autoComplete="location"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center  justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  // value={formData.password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center  justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  onChange={handleChange}
                  //value={formData.confirmPassword}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='flex justify-center '>
            <ReCAPTCHA
              sitekey="6LfS7zopAAAAAHgD6ZvjSjGNKskIuWZZ5ic3bLlF"
              onChange={()=> setCaptcha(true)}
            />
            
            </div>   
            <div>
              <button
                disabled={!Captcha || isLoading}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#2a2a2a] text-white p-2 rounded-md cursor-pointer hover:bg-[#2a2a2a] hover:text-white"
                //className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                { isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Click here to Login
            </Link>
          </p>
        </div>
      </div>
    </>
    )
}

export default Register;