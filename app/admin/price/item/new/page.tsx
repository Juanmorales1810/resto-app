"use client";

import { Input, Select, Textarea, SelectItem, Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import React, { ChangeEvent, useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { useForm } from "react-hook-form";


export default function Form() {
    const [file, setFile] = useState<File | null>(null)
    const [datosCargados, setDatosCargados] = useState(false);
    const [newTask, setNewTask] = useState({
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
    const router = useRouter();
    //Obtener datos
    const getTask = async () => {
        const res = await fetch(`/api/catalogo/${params.id}`);
        const data = await res.json();
        setNewTask({ name: data.name, description: data.description, price: data.price, category: data.category, status: data.status, image: data.image });
        setDatosCargados(true);
    };
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
    const selectedFile = watch('imagen')?.[0] || null;
    //Enviar datos
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
    if (params.id) {

        if (!datosCargados) {
            return <div>Cargando...</div>;
        }
    }
    return (
        <section className="flex flex-col lg:flex-row justify-center items-center w-full h-[calc(100vh-20px)] gap-20">
            <div className="w-96 h-[600px]">
                <h1 className="text-3xl text-white font-bold ">Nuevo producto</h1>
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <Suspense fallback={<p>Loading...</p>}>
                        <form onSubmit={onSubmit} className="flex flex-col gap-4 w-96">
                            <Input
                                type="text"
                                placeholder="Nombre"
                                defaultValue={params.id ? newTask.name : ""}
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
                                defaultValue={params.id ? newTask.description : ""}
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
                                defaultValue={params.id ? newTask.price : ""}
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
                            <input
                                placeholder="Image"
                                type="file"
                                {...register('imagen', {
                                    required: 'Imagen es requerida',
                                    validate: {
                                        fileSize: (value) => {
                                            // Validar tamaño máximo del archivo (ejemplo: 2MB)
                                            return value[0]?.size <= 5000000 || 'La imagen no puede ser mayor a 5MB';
                                        },
                                        fileType: (value) => {
                                            // Validar tipo de archivo (ejemplo: solo imágenes)
                                            const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
                                            const extension = value[0]?.name.split('.').pop().toLowerCase();
                                            return allowedExtensions.includes(extension) || 'Formato de imagen no válido';
                                        },
                                    },
                                })}
                            />
                            {errors.imagen && <>{errors.imagen.message}</>}

                            <Button color="primary" variant="shadow" type="submit" isLoading={isLoading}>
                                {params.id ? "Actualizar" : "Crear"}
                            </Button>
                        </form>
                    </Suspense>
                </div>
            </div>
            <div className="flex flex-col w-96 h-[600px] gap-16">
                <h1 className="text-3xl text-white font-bold ">Vista previa</h1>
                <Card className="max-w-[250px]">
                    <CardHeader className="flex gap-3">

                        <div className="flex flex-col">
                            <p className="text-md">{watch("Nombre")}</p>
                            {/* <p className="text-small text-default-500">{watch("Descripción")}</p> */}
                        </div>
                    </CardHeader>

                    <CardBody className="flex justify-center items-center max-h-[300px]">
                        {selectedFile ? <Image src={URL.createObjectURL(selectedFile)} alt="image" width={250} height={300} radius="lg" shadow="md" className="object-cover h-[270px]" /> : <Image src={newTask.image} alt="image" width={250} height={300} radius="lg" shadow="md" className="object-cover h-[270px]" />}
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