import React from 'react'
import { withFormik} from 'formik'
import * as Yup from 'yup'

const UserForm = ({values, handleChange} ) => (
    <div>
        <input type="name" name="name" placeholder="Name" value={values.name} onChange={handleChange}/>
        <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
    </div>
)

const FormikForm = withFormik ({
    mapPropsToValues({name, email, password}) {
        return{
            name: name || '',
            email: email || '',
            password: password || ''
        }
    }
})(UserForm)

export default FormikForm