import React, { FormEvent } from "react";
import { Form, Input } from "up-to-task-validation-form";



export default function (props: any): React.ReactElement {
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);


async function onLoginHandler(e : FormEvent<HTMLFormElement>) : Promise<void>{
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
        const { error } =  await props.supabase.auth.signInWithPassword({
            email,
            password
        });
        setErrorMessage(error?.message);
} 


    return (
        <section>
            <h1> Login </h1>
            <Form onSubmit={onLoginHandler}>
                <Input type="text" name='email' id='email' label='E-mail' placeholder='ex:email@exemple.com'
                    pattern="^[a-zA-Z0-9!#$%&amp;'*+\/=?^_`\{\|\}~.\-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*$" required />
                <Input type="password" name='password' id='password' label='Password' required />
                <button type="submit">Sign - In</button>
            </Form>
            <p>{errorMessage}</p>
        </section>
    )
}