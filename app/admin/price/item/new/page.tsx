"use client";

import { Input, Select, Textarea, SelectItem, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { useForm } from "react-hook-form";
import React, { ChangeEvent, useState } from "react";


export default function Form() {
    const [file, setFile] = useState<File | null>(null)
    const category = [
        {
            label: 'Comida',
            value: 'comida'
        },
        {
            label: 'Bebida',
            value: 'bebida'
        },
        {
            label: 'Otros',
            value: 'otros'
        }
    ]
    const status = [
        {
            label: 'Activo',
            value: 'active'
        },
        {
            label: 'Pausado',
            value: 'paused'
        },
    ]
    const { finishLoading, isLoading, startLoading } = useLoading()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const authFetch = useAuthFetch()
    const onSubmit = handleSubmit(async ({ Nombre: name, Descripción: description, Image: image, Precio: price, Categoria: category }) => {
        startLoading()

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        if (file) {
            formData.append('image', file);
        }

        await authFetch({
            endpoint: 'catalogo',
            redirectRoute: '/admin/price',
            formData: formData
        })
        finishLoading()
    });
    return (
        <section className="flex justify-center items-center w-full h-[calc(100vh-20px)] gap-10">
            <div>
                <h1 className="text-3xl font-bold py-3">Nuevo producto</h1>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-96">
                        <Input
                            type="text"
                            placeholder="Nombre"
                            required {...register("Nombre", {
                                required: {
                                    value: true,
                                    message: "Nombre es requerido",
                                },
                                maxLength: {
                                    value: 40,
                                    message: "Nombre no puede ser mayor a 40 caracteres"
                                }
                            })}
                            isInvalid={!!errors.Nombre}
                            errorMessage={errors.Nombre && `${errors.Nombre.message}`} />
                        <Textarea
                            placeholder="Descripción"
                            required
                            {...register("Descripción", {
                                required: {
                                    value: true,
                                    message: "Descripción es requerida",
                                },
                                maxLength: {
                                    value: 300,
                                    message: "Descripción no puede ser mayor a 300 caracteres"
                                }

                            })}
                            isInvalid={!!errors.Descripción}
                            errorMessage={errors.Descripción && `${errors.Descripción.message}`} />
                        <Input
                            type="number"
                            placeholder="Precio"
                            required
                            {...register("Precio", {
                                required: {
                                    value: true,
                                    message: "Precio es requerido",
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Precio no es valido",
                                }
                            })}
                            isInvalid={!!errors.Precio}
                            errorMessage={errors.Precio && `${errors.Precio.message}`} />
                        <Select
                            label="Categoria"
                            variant="faded"
                            placeholder="Categoria"
                            required
                            {...register("Categoria", {
                                required: {
                                    value: true,
                                    message: "Categoria es requerido",
                                }
                            })}
                            isInvalid={!!errors.Categoria}
                            errorMessage={errors.Categoria && `${errors.Categoria.message}`}
                        >
                            {category.map((data) => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Status"
                            variant="faded"
                            placeholder="Status"
                            required
                            {...register("Status", {
                                required: {
                                    value: true,
                                    message: "Status es requerido",
                                }
                            })}
                            isInvalid={!!errors.Categoria}
                            errorMessage={errors.Categoria && `${errors.Categoria.message}`}
                        >
                            {status.map((data) => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <input placeholder="Image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }} required />

                        <Button color="primary" variant="shadow" type="submit" isLoading={isLoading}>
                            Enviar datos
                        </Button>
                    </form>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold py-4">Vista previa</h1>
                <Card className="max-w-[250px]">
                    <CardHeader className="flex gap-3">

                        <div className="flex flex-col">
                            <p className="text-md">{watch("Nombre")}</p>
                            <p className="text-small text-default-500">{watch("Descripción")}</p>
                        </div>
                    </CardHeader>

                    <CardBody className="flex justify-center items-center">
                        {file && <Image src={URL.createObjectURL(file)} alt="image" width={250} height={300} radius="lg" shadow="md" className="object-cover h-auto max-h-[300px]" />}
                    </CardBody>

                    <CardFooter className="flex justify-between">
                        <p className="text-lg font-bold">${watch("Precio")}</p>
                        <Button>Comprar</Button>
                    </CardFooter>
                </Card>
            </div>

        </section>
    )
}