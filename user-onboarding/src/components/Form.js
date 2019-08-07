import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import './form.css'

const UserForm = ({values, errors, touched, isSubmitting, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);
    return (
    <>
        <Form className="form">
            <div className="field">
                <Field type="name" name="name" placeholder="Name" />
            </div>
            <div className="field">
                <Field type="email" name="email" placeholder="Email" />
                { touched.email && errors.email && <p>{errors.email}</p> }
            </div>
            <div className="field">
                <Field type="password" name="password" placeholder="Password" />
                { touched.password && errors.password && <p>{errors.password}</p> }
            </div>
            <Field component="select" name="dropdown" className="dropdown">
                <option value="roles">Who do you want to be:</option>
                <option value="prince">Prince</option>
                <option value="50cent">50 Cent</option>
                <option value="britney">Britney</option>
                <option value="none">Dear lord none of those</option>
            </Field>
            <label className="terms">
                <br></br>
                We both know you didn't read the terms, but whatever:
                <Field type="checkbox" name="terms" checked={values.terms}/>
            </label>
            <br></br>
            <button type="submit" disabled={isSubmitting}>Submit!</button>
            <div className="currentUsers">
                <h1>Current Friends</h1>
                {values.user && values.users.map(user => console.log('These users: ', user))}
                {users ? users.map(user => (
                    <p key={user.id} className="users">{user.name}</p>
                ))
                : null}
            </div>
        </Form>
        </>
    )
}

const FormikForm = withFormik ({
    mapPropsToValues({name, email, password, dropdown, terms, users}) {
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            dropdown: dropdown,
            terms: terms || false,
            users: ['Example']
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('Email not valid').required('Email required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters. You know. For safety.').required(),
        terms: Yup.bool().oneOf([true], 'Please check it anyway')
    }),
    handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}){
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
            })
        setTimeout(() => {
            if(values.email === 'tea@tea.io'){
                setErrors({ email: 'That email is already registered'})
            } else {
                resetForm()
            }
            setSubmitting(false)
        }, 2000)
        console.log(values)
        }
      
})(UserForm)

export default FormikForm