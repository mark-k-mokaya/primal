import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import '../sign-up-form/sign-up-form.styles.scss';
import { signUpStart } from '../../store/user/user.action';



const defaultFormfields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function SignUpForm(){
    const [formFields, setFormFields] = useState
    (defaultFormfields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    function handleChange(event){
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    async function handleSubmit(event){
        event.preventDefault();
        // confirm password
        if(password !== confirmPassword) {
            return alert("Passwords do not match!");
        }

        try{
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();

        }catch(error){
            if (error.code === "auth/email-already-in-use") {
                alert("Email already in use!");
            }else{
                console.log("Unexpected error occured" + error);
            }
        }
    }

    function resetFormFields(){
        setFormFields(defaultFormfields);
    }


    return(
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" autoComplete="new-password" type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;
