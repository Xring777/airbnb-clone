'use client'

import {FC, useCallback, useState} from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/heading/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/button/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface LoginModalProps {

}

const LoginModal: FC<LoginModalProps> = ({}) => {
    const router = useRouter();
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
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback: any) => {
                setIsLoading(false)
                if (callback?.ok) {
                    toast.success('Logged In')
                    router.refresh()
                    loginModal.onClose()
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })

    }

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = <div className={`flex flex-col gap-4`}>
        <Heading title={`Welcome back`} subTitle={`Login to your account!`}/>
        <Input id={`email`} label={`Email`} disabled={isLoading} register={register} errors={errors} required/>
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
                <div>First time use Airbnb?</div>
                <div onClick={toggle} className={`text-neutral-800 cursor-pointer hover:underline`}>Create an account
                </div>
            </div>
        </div>
    </div>

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={'Login'}
            actionLabel={'continue'}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;