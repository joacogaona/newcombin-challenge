import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMember } from "../api/members";
import { Member } from "../types/members";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Input from "../components/Input";

function invalidNameOrAddressErrors(value: string, inputName: string): string {
    if (value.length < 2) {
        return `${inputName} must be at least 2 characters`
    } else if (value[0] === ' ' || value[value.length - 1] === ' ') {
        return `${inputName} must not have whitespaces to the sides`
    }
    return ''

}

const Form = () => {
    const { token } = useAuth()
    const queryClient = useQueryClient();
    const { mutate, isError, error } = useMutation({
        mutationFn: (newMember: Member) => {
            return createMember(newMember, token)
        },
        onMutate: (data) => {
            const currentMembers = queryClient.getQueryData<Member[]>(['members']) || [];
            queryClient.setQueryData(['members'], [...currentMembers, data]);
            return { currentMembers }
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['members'], context?.currentMembers)
        },
        onSuccess: () => {
            form.reset()
        }
    })
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            ssn: '',
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },

    })

    useEffect(() => {
        if (isError && error) {
            window.alert(error.response.data.message);
        }
    }, [isError, error]);


    return <div className="w-96">
        <form.Provider>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <div className="flex flex-col h-52 justify-around text-black">
                    <form.Field
                        name="firstName"
                        children={(field) => <Input field={field} placeholder={"First Name"} />}
                        validators={{
                            onBlur: ({ value }) => invalidNameOrAddressErrors(value, 'First Name')
                        }}
                    />
                    <form.Field
                        name="lastName"
                        children={(field) => <Input field={field} placeholder={"Last Name"} />}
                        validators={{
                            onBlur: ({ value }) => invalidNameOrAddressErrors(value, 'Last Name')
                        }}
                    />
                    <form.Field
                        name="address"
                        children={(field) => <Input field={field} placeholder={"Address"} />}
                        validators={{
                            onBlur: ({ value }) => invalidNameOrAddressErrors(value, 'Address')
                        }}
                    />
                    <form.Field
                        name="ssn"
                        children={(field) => <Input field={field} placeholder={"SSN"} />}
                        validators={{
                            onBlur: ({ value }) => value.length < 11 ? 'SSN must have 9 digits' : null
                        }}
                    />
                </div>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                        <button className='border-white border-2 p-2 m-2 rounded hover:bg-sky-500  disabled:bg-slate-500' type="submit" disabled={!canSubmit} >{isSubmitting ? "..." : "Save"}</button>
                    )}
                />
                <button className='border-white border-2 p-2 m-2 rounded hover:bg-sky-500' onClick={() => form.reset()}  >Reset</button>
            </form>
        </form.Provider>

    </div>
}

export default Form