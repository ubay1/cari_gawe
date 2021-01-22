/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import image_login from '../assets/image_login.png';
import AnimationAuth from './AnimationAuth';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Slide, toast } from 'react-toastify';
import { setLoading } from '../store/loading';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { HTTPLoginUser } from '../utils/http';
import Cookies from 'js-cookie';


const Login = () => {
    const dispatch: AppDispatch = useDispatch()
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: values => {
            httpLoginUser(values)
          console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Wajib diisi"),
            password: Yup.string()
              .required("Wajib diisi"),
        })
    });

    const httpLoginUser = async (params: any) => {
        try {
            const responseLoginUser = await HTTPLoginUser({
                email: params.email,
                password: params.password,
            })

            if (responseLoginUser.status === 200) {
                toast(responseLoginUser.data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    type: 'success',
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    transition: Slide
                })
                dispatch(setLoading({
                    show: false,
                    timeout: 0,
                }))



                Cookies.set('token', responseLoginUser.data.accessToken)
                // localStorage.setItem('user', responseLoginUser.data.filter((item: any) => {
                //     item.accessToken
                // }))
                console.log(Cookies.get('token'))
    
                // history.push('/')
            }


        } catch (error) {
            toast(error.data.errors, {
                position: "bottom-right",
                autoClose: 5000,
                type: 'error',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                transition: Slide
            })
            dispatch(setLoading({
                show: false,
                timeout: 0,
            }))
        }
    }
    
    return(
        <div className="lg:flex">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="
                    px-10
                    h-screen 
                    flex flex-col justify-center
                    sm:px-24 
                    md:px-48 
                    lg:px-12 lg:mt-0 lg:h-screen lg:flex lg:shadow-lg lg:ml-3 lg:mr-3 
                    xl:px-12 xl:max-w-2xl
                    "
                >
                    <div className="">
                        <div className="py-6 flex justify-center">
                            <div className="cursor-pointer flex items-center">
                                <div className="text-5xl text-blue-600 tracking-wide ml-2 font-semibold font_damion">
                                    <Link to="/">Cari Gawe</Link>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mt-6">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                                <input 
                                    name="email"
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                    type="" placeholder="jhon@mail.com" 
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && formik.touched.email && (
                                    <p className="text-red-400">{formik.errors.email}</p>
                                )}
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-800
                                        cursor-pointer">
                                            Lupa Password?
                                        </a>
                                    </div>
                                </div>
                                <input 
                                    name="password"
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.errors.password && formik.touched.password && (
                                    <p className="text-red-400">{formik.errors.password}</p>
                                )}
                            </div>
                            <div className="mt-10">
                                <button className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                                shadow-lg"
                                type="submit"
                                >
                                    Masuk
                                </button>
                            </div>
                        </form>
                        <div className="my-6 text-sm font-display font-semibold text-gray-700 text-center">
                            Belum punya akun ? <Link to="/register" className="cursor-pointer text-blue-600 hover:text-blue-800">Daftar</Link>
                        </div>
                    </div>
                    <AnimationAuth />
                </div>
            </div>
            
        </div>
    )
}

export default Login;