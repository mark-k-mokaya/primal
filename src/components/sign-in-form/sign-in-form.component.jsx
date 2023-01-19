import {useState} from 'react';
import {useDispatch} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import '../sign-in-form/sign-in-form.styles.scss';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
    email: "",
    password: ""
}

function SignInForm() {
    const dispatch = useDispatch();
    const[formFields, setFormFields] = useState(defaultFormFields);
    const{email, password} = formFields;

    const signInWithGoogle = async ()=>{
        dispatch(googleSignInStart());
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email,password));
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password!");
                    break;

                case "auth/user-not-found":
                    alert("Email Address not registered!");
                    break;
            
                default:
                    console.log(error);
                    break;
            }
        }
    }

    function handleChange(event){
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    function resetFormFields(){
        setFormFields(defaultFormFields);
    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>
                        Google sign-in
                    </Button>
                </div>
            </form>
        </div>
    );
}
    
export default SignInForm;