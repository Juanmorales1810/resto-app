"use client";

import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { Link } from "@nextui-org/link";
import React from "react";
export default function forgetPassword() {
    const { finishLoading, isLoading, startLoading } = useLoading()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const authFetch = useAuthFetch()
    const onSubmit = handleSubmit(async ({ Email: email }) => {
        startLoading()
        await authFetch({
            endpoint: 'forget-password',
            formData: { email }
        })
        finishLoading()
    });
    return (
        <div className="h-96 max-w-md gap-4 w-full justify-center items-center p-4 bg-slate-200 rounded-xl z-50">
            <h1 className="text-black text-left text-2xl font-bold pb-10">
                Recuperar contraseña
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
                <Button color="primary" variant="shadow" type="submit" isLoading={isLoading}>
                    Enviar correo
                </Button>
            </form>
            <p className="text-slate-600 text-sm text-center pt-4">
                Te perdiste?{" "}
                <Link size="sm" href="../guard">
                    Volver
                </Link>
            </p>
        </div>
    )
}