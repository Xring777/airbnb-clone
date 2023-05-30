'use client'

import {FC, useCallback, useState} from "react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/heading/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/button/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

interface RegisterModalProps {

}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
    const loginModal = useLoginModal(); 
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Success!')
                registerModal.onClose()
                loginModal.onOpen()
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(true))

    }

    const bodyContent = <div className={`flex flex-col gap-4`}>
        <Heading title={`Welcome to Airbnb`} subTitle={`Create an account!`}/>
        <Input id={`email`} label={`Email`} disabled={isLoading} register={register} errors={errors} required/>
        <Input id={`name`} label={`Name`} disabled={isLoading} register={register} errors={errors} required/>
        <Input id={`password`} type={`password`} label={`Password`} disabled={isLoading} register={register}
               errors={errors} required/>
    </div>

    const footerContent = <div className={`flex flex-col gap-4 mt-3`}>
        <hr/>
        <Button outline label={`Continue With Google`} icon={FcGoogle} onClick={() => signIn('google')}/>
        <Button outline label={`Continue With Github`} icon={AiFillGithub} onClick={() => signIn('github')}/>
        <div className={`text-neutral-500 
        text-center
        mt-4
        font-light
        `}>
            <div className={`flex flex-row justify-center items-center gap-2`}>
                <div>Already have an account?</div>
                <div onClick={toggle} className={`text-neutral-800 cursor-pointer hover:underline`}>Log In</div>
            </div>
        </div>
    </div>

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={'Register'}
            actionLabel={'continue'}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;