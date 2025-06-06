import { anoInicioExperiencia } from '@/data/info';

export const calcularAnosExperiencia = (ano) =>
    new Date().getFullYear() - ano;

export const anosExperiencia = calcularAnosExperiencia(anoInicioExperiencia);