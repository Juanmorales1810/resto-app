# Resto-App

Resto-App es una aplicación moderna diseñada para gestionar y optimizar las operaciones de un restaurante. Utiliza tecnologías web avanzadas para ofrecer una experiencia de usuario intuitiva y eficiente.

## Descripción

Resto-App está construida utilizando Next.js 13 y NextUI v2, proporcionando una base sólida y moderna para el desarrollo web. Esta aplicación permite a los usuarios gestionar menús, pedidos, reservas y otros aspectos del restaurante de manera eficaz.

## Tecnologías Utilizadas

- **Next.js 13**: Framework de React para aplicaciones web modernas.
- **NextUI v2**: Biblioteca de componentes de interfaz de usuario.
- **Tailwind CSS**: Framework de CSS para estilización rápida y eficiente.
- **TypeScript**: Superconjunto tipado de JavaScript que mejora la calidad del código.
- **Framer Motion**: Biblioteca para animaciones en React.
- **next-themes**: Herramienta para la gestión de temas en Next.js.

## Estructura del Proyecto

Dentro del proyecto, encontrarás las siguientes carpetas y archivos:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

- **public/**: Contiene activos estáticos como imágenes.
- **src/components/**: Carpeta para componentes reutilizables.
- **src/layouts/**: Carpeta para diseños reutilizables.
- **src/pages/**: Contiene archivos `.astro` o `.md` que se exponen como rutas basadas en sus nombres de archivo.
- **package.json**: Archivo de configuración del proyecto y dependencias.

## Funcionalidades Principales

- **Gestión de Menús**: Permite a los administradores crear, editar y eliminar elementos del menú.
- **Gestión de Pedidos**: Facilita la toma de pedidos y seguimiento de su estado.
- **Reservas**: Permite a los clientes realizar reservas en el restaurante.
- **Panel de Administración**: Proporciona una vista general de todas las operaciones del restaurante.

## Cómo Usar

### Usar la plantilla con create-next-app

Para crear un nuevo proyecto basado en esta plantilla usando `create-next-app`, ejecuta el siguiente comando:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Instalar dependencias

Instala las dependencias necesarias con el siguiente comando:

```bash
npm install
```

### Ejecutar el servidor de desarrollo

Inicia el servidor de desarrollo con el siguiente comando:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                         |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:3000` |
| `npm run build`           | Compila el sitio de producción                   |
| `npm run start`           | Inicia el servidor de producción                 |
| `npm run lint`            | Ejecuta el linter para comprobar errores en el código |

## Dependencias

El proyecto utiliza las siguientes dependencias principales:

- `@nextui-org/button`
- `@nextui-org/card`
- `@nextui-org/chip`
- `@nextui-org/code`
- `@nextui-org/dropdown`
- `@nextui-org/image`
- `@nextui-org/input`
- `@nextui-org/kbd`
- `@nextui-org/link`
- `@nextui-org/navbar`
- `@nextui-org/pagination`
- `@nextui-org/react`
- `@nextui-org/select`
- `@nextui-org/snippet`
- `@nextui-org/switch`
- `@nextui-org/system`
- `@nextui-org/table`
- `@nextui-org/theme`
- `@nextui-org/tooltip`
- `@nextui-org/user`
- `axios`
- `bcryptjs`
- `cloudinary`
- `dotenv`
- `eslint`
- `eslint-config-next`
- `framer-motion`
- `jsonwebtoken`
- `mercadopago`
- `mongoose`
- `next`
- `next-themes`
- `react`
- `react-dom`
- `react-hook-form`
- `swiper`
- `tailwindcss`
- `typescript`

## Cambios Recientes

- [Actualizar enlace de detalles en tabla de productos](https://github.com/Juanmorales1810/resto-app/commit/79e3a975019826b28c1d3e5e95778f26f436edbf)
- [Actualizar enlace de detalles en tabla de productos](https://github.com/Juanmorales1810/resto-app/commit/ace2d24fb7d820ccd14fc1313379352cd6a38c00)
- [Actualizar estilos en layout.tsx y page.tsx](https://github.com/Juanmorales1810/resto-app/commit/ff34fc79172e74995b4bee993a0e20bb4076d3d2)
- [Actualizar estilos en navbar.tsx](https://github.com/Juanmorales1810/resto-app/commit/3e85ca73b6f27b29afe2d7a6531cdcd9843ee66b)
- [Mejoras en la UI](https://github.com/Juanmorales1810/resto-app/commit/c38ae6524858850e50cbca362f20d96681ae32f8)
- [Cambios en la UI](https://github.com/Juanmorales1810/resto-app/commit/b2d57ad7a19cc36407111751ed5e3f7f1ed20994)
- [Actualizar estilos en blogs.tsx, card.tsx y footer.tsx](https://github.com/Juanmorales1810/resto-app/commit/36f3f607e1646b253529daf54343fab790a840ab)
- [Actualizar modelo de CommandSchema](https://github.com/Juanmorales1810/resto-app/commit/93ce5c05a9223948f8bbc06c4c2f2a3811ecad69)
- [Actualizar descripción en CardItem](https://github.com/Juanmorales1810/resto-app/commit/9caa5f71a0da80b53081ef3040720cb12c4cfc78)
- [Agrega modelo de comandos y función de conexión a MongoDB en la ruta de notificación](https://github.com/Juanmorales1810/resto-app/commit/4c8a33bbe56367101214a34616ad6cf102c00929)

Para más detalles sobre los cambios recientes, visita [este enlace](https://github.com/Juanmorales1810/resto-app/commits?per_page=100&page=1).

## Licencia

Este proyecto está licenciado bajo la [licencia MIT](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
