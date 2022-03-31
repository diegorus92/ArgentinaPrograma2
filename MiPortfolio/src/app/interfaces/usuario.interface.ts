export interface Academia{
    id?: number;
    escuela: string;
    titulo: string;
    imagen: string;
    carrera: string;
    puntuacion: number;
    inicio: string;
    termino: string;
}

export interface Trabajo{
    id: number;
    nombre: string;
    logo: string;
}

export interface Usuario{
    id?: number;
    name: string;
    img_perfil: string;
    ocupacion: string,
    pais: string,
    provincia: string,
    educacion?: Academia[],
    trabajos?: Trabajo[]
};

