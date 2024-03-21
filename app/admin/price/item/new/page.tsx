"use client";

import { Input, Select, Textarea, SelectItem, Button, Spinner } from "@nextui-org/react";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import CardItem from "@/components/cardItem";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";


export default function Form() {
    const [file, setFile] = useState<File | null>(null)
    const [datosCargados, setDatosCargados] = useState(false);
    const [getItem, setGetItem] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        status: "",
        image: ""
    });
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
    //useLoading
    const { finishLoading, isLoading, startLoading } = useLoading()
    //useAuthFetch
    const authFetch = useAuthFetch()
    const params = useParams();
    //Obtener datos
    const getTask = async () => {
        const data = await authFetch({
            endpoint: `catalogo/${params.id}`,
            method: 'get'
        })

        setGetItem({ name: data.Item.name, description: data.Item.description, price: data.Item.price, category: data.Item.category, status: data.Item.status, image: data.Item.image });
        setDatosCargados(true);
    }
    useEffect(() => {
        if (params.id) {
            getTask();
        }
    }, []);

    //useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    //Enviar datos
    const onSubmit = handleSubmit(async ({ Nombre: name, Descripción: description, Precio: price, Categoria: category, Estado: status }) => {
        startLoading()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('status', status);
        if (file) {
            formData.append('image', file);
        }
        console.log(formData.get('image',));
        console.log(formData.get('name'));
        console.log(formData.get('description'));
        console.log(formData.get('price'));
        console.log(formData.get('category'));
        console.log(formData.get('status'));

        if (params.id) {
            await authFetch({
                endpoint: `catalogo/${params.id}`,
                method: 'put',
                redirectRoute: '/admin/price',
                formData: formData
            })
            finishLoading()
        } else {
            await authFetch({
                endpoint: 'catalogo',
                redirectRoute: '/admin/price',
                formData: formData
            })
            finishLoading()
        }
    });
    if (params.id) {

        if (!datosCargados) {
            return <div className="flex justify-center items-center w-full h-auto min-h-[calc(100vh-16px)]"><Spinner label="Cargando..." size="lg" /></div>;
        }
    }
    return (
        <section className="flex flex-col lg:flex-row justify-center items-center w-full h-[calc(100vh-20px)] gap-20">
            <div className="w-96 h-[600px]">
                <h1 className="text-3xl text-white font-bold ">{params.id ? "Editar producto" : "Nuevo Producto"}</h1>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4 w-96">
                        <Input
                            type="text"
                            placeholder="Nombre"
                            defaultValue={params.id ? getItem.name : ""}
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
                            defaultValue={params.id ? getItem.description : ""}
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
                            defaultValue={params.id ? getItem.price : ""}
                            {...register("Precio", {
                                required: {
                                    value: true,
                                    message: "Precio es requerido",
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Precio no es valido",
                                },
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
                            label="Estado"
                            variant="faded"
                            placeholder="Estado"
                            required
                            {...register("Estado", {
                                required: {
                                    value: true,
                                    message: "Estado es requerido",
                                }
                            })}
                            isInvalid={!!errors.Estado}
                            errorMessage={errors.Estado && `${errors.Estado.message}`}
                        >
                            {status.map((data) => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <input className="block w-full text-white file:py-2 file:px-4 file:font-light file:rounded-lg file:bg-zinc-800 file:border-2 file:border-solid file:border-zinc-700" placeholder="Image" type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }} required={params.id ? false : true} />
                        <p>
                            {errors.imagen && <>{errors.imagen.message}</>}
                        </p>

                        <Button color={params.id ? "warning" : "primary"} variant="shadow" type="submit" isLoading={isLoading}>
                            {params.id ? "Actualizar" : "Crear"}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="flex flex-col w-96 h-[600px] gap-16">
                <h1 className="text-3xl text-white font-bold ">Vista previa</h1>

                <CardItem title={watch("Nombre")} description={watch("Descripción")} image={file ? URL.createObjectURL(file) : getItem.image} price={watch("Precio")} />
            </div>

        </section>
    )
}