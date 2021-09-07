import React from 'react';

import logo from '../logo.svg';

const Register = () => {
    return (
        <div className="form-signup text-center">
            <form>
                <img className="mb-4" src={logo} alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingName" placeholder="Name" />
                    <label for="floatingName">Name</label>
                </div>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingEmail" placeholder="Email" />
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
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                {/* <p className="mt-5 mb-3 text-muted">&copy; 2021</p> */}
            </form>
        </div>
    );
};

export default Register;
