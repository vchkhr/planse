import React from 'react';

import logo from '../logo.svg';

const Login = () => {
    return (
        <div className="form-signin text-center">
            <form>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" />
                    <label for="floatingEmail">Email</label>
                </div>

                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>

                {/* <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div> */}
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                {/* <p className="mt-5 mb-3 text-muted">&copy; 2021</p> */}
            </form>
        </div>
    );
};

export default Login;
