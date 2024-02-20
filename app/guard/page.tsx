"use client";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/link";
import React from "react";


export default function Sesion() {
    const [isVisible, setIsVisible] = React.useState(false);
    const { finishLoading, isLoading, startLoading } = useLoading()

    const toggleVisibility = () => setIsVisible(!isVisible);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const authFetch = useAuthFetch()
    const onSubmit = handleSubmit(async ({ Email: email, Contraseña: password }) => {
        startLoading()
        await authFetch({
            endpoint: 'auth/login',
            redirectRoute: '/admin',
            formData: { email, password }
        })
        finishLoading()
    });
    return (

        <div className="h-96 max-w-md gap-4 w-full justify-center items-center p-4 bg-slate-200 rounded-xl z-50">
            <h1 className="text-black text-left text-2xl font-bold pb-10">
                Iniciar sesión
            </h1>
            <form
                className="h-auto max-w-md flex flex-col gap-4 w-full justify-center items-center pb-4"
                onSubmit={onSubmit}
            >
                <Input
                    type="email"
                    label="Email"
                    required
                    {...register("Email", {
                        required: {
                            value: true,
                            message: "Email es requerido",
                        },
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Email no es valido",
                        },
                    })}
                    isInvalid={!!errors.Email}
                    errorMessage={errors.Email && `${errors.Email.message}`}
                />
                <Input
                    type={isVisible ? "text" : "password"}
                    label="Contraseña"
                    required
                    {...register("Contraseña", {
                        required: {
                            value: true,
                            message: "Contraseña es requerida",
                        },
                    })}
                    isInvalid={!!errors.Contraseña}
                    errorMessage={
                        errors.Contraseña && `${errors.Contraseña.message}`
                    }
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                />
                <Button color="primary" variant="shadow" type="submit" isLoading={isLoading}>
                    Iniciar sesión
                </Button>
            </form>
            <p className="text-slate-600 text-sm text-center pt-4">
                No recuerdas tu Contraseña?{" "}
                <Link size="sm" href="./guard/forgetpassword">
                    Hace clic aquí
                </Link>
            </p>
        </div>

    );
}
