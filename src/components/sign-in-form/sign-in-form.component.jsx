import {useState} from 'react';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import '../sign-in-form/sign-in-form.styles.scss';
import {signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: "",
    password: ""
}

const signInWithGoogle = async ()=>{
    await signInWithGooglePopup();
}

function SignInForm() {
    const[formFields, setFormFields] = useState(defaultFormFields);
    const{email, password} = formFields;

    function handleChange(event){
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    async function handleSubmit(event){
        event.preventDefault();
        try {
            // authenticate user
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

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