import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'

const UserForm = (values) => (
    <Form>
        <Field type="name" name="name" placeholder="Name" />
        <Field type="email" name="email" placeholder="Email" />
        <Field type="password" name="password" placeholder="Password" />
        <label>
            We both know you didn't read the terms:
            <Field type="checkbox" name="terms" checked={values.newsletter}/>
        </label>
        <button>Submit!</button>
    </Form>
)

const FormikForm = withFormik ({
    mapPropsToValues({name, email, password, terms}) {
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        }
    },
    handleSubmit(values){
        console.log(values)
    }
})(UserForm)

export default FormikForm