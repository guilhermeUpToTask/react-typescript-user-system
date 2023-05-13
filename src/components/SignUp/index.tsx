import React, { FormEvent } from 'react';
import { Form, Input } from 'up-to-task-validation-form';

export default function (props: any): React.ReactElement {

    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    async function onSignUpHandler(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formDataObj = Object.fromEntries(formData);

        const { error } = await props.supabase.auth.signUp({
            email: formDataObj.email as string,
            password: formDataObj.password as string,
            options: {
                data: {
                    first_name:  formDataObj.first_name as string,
                    age:   formDataObj.age
                }
            }
        });
        setErrorMessage(error?.message);
    }

    //found bug that need to double click on sign-up button to verify
    return (
        <section>
            <Form onSubmit={onSignUpHandler}>
                <Input name="email" type="email" label='Enter your e-mail'
                    required placeholder="Email" />

                <Input name="password" type="password" label='Enter your password'
                    required minLength={6} placeholder="Password" />

                <Input name='first_name' type='text' label='Enter your first-name'
                    placeholder='Name' required />

                <Input name='age' type='number' label='Enter your age'
                    min={1} max={100} required placeholder='Age' />

                <button type="submit">Sign-Up</button>

                <p>{errorMessage}</p>
            </Form>

        </section>
    )

}