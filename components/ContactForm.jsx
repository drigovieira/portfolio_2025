"use client";

import {Loader2} from "lucide-react"; // Importe o ícone de loading
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useForm, Controller} from 'react-hook-form';
import {toast} from 'react-hot-toast';

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        control, // Adicionado para o Controller
        formState: {errors, isSubmitting},
    } = useForm({
        defaultValues: {
            service: "" // Valor inicial vazio
        }
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Reset com valores padrão explícitos
                reset({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: "",
                    service: ""
                });

                toast.success('Mensagem enviada com sucesso!');
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            toast.error('Erro ao enviar mensagem. Tente novamente.');
            console.error('Erro no envio:', error);
        }
    };

    return (
        <form
            className='flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h3 className='text-4xl text-accent'>Vamos criar algo incrível
                juntos?</h3>
            <p className='text-white/60'>Discuta seu projeto comigo e veja como
                posso ajudar.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <Input
                        className='w-full'
                        type='text'
                        placeholder='Nome'
                        {...register('firstName', {required: 'Campo obrigatório'})}
                    />
                    {errors.firstName && (
                        <p className='text-red-500 text-sm mt-1'>{errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        className='w-full'
                        type='text'
                        placeholder='Sobrenome'
                        {...register('lastName')}
                    />
                </div>

                <div>
                    <Input
                        className='w-full'
                        type='email'
                        placeholder='Email'
                        {...register('email', {
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email inválido'
                            }
                        })}
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <Input
                        className='w-full'
                        type='tel'
                        placeholder='Telefone (ex: 11999998888)'
                        onKeyDown={(e) => {
                            // Permite apenas números, Backspace e Tab
                            if (!/[0-9]|Backspace|Tab/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                        {...register('phone', {
                            required: 'Campo obrigatório',
                            pattern: {
                                value: /^\d{10,11}$/, // Aceita 10 ou 11 dígitos numéricos
                                message: 'Digite apenas números com DDD (ex: 11999998888)'
                            },
                            minLength: {
                                value: 10,
                                message: 'Mínimo 10 dígitos'
                            },
                            maxLength: {
                                value: 11,
                                message: 'Máximo 11 dígitos'
                            }
                        })}
                    />
                    {errors.phone && (
                        <p className='text-red-500 text-sm mt-1'>{errors.phone.message}</p>
                    )}
                </div>
            </div>

            <div>
                <Controller
                    name="service"
                    control={control}
                    rules={{required: 'Selecione um serviço'}}
                    render={({field}) => (
                        <Select onValueChange={field.onChange}
                                value={field.value}>
                            <SelectTrigger className='w-full'>
                                <SelectValue
                                    placeholder='Selecione um serviço'/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Selecione um
                                        serviço</SelectLabel>
                                    <SelectItem value='analise'>Análise de
                                        Dados</SelectItem>
                                    <SelectItem value='ciencia'>Ciência de
                                        Dados</SelectItem>
                                    <SelectItem value='desenvolvimento'>Desenvolvimento
                                        Web</SelectItem>
                                    <SelectItem value='outro'>Outro</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.service && (
                    <p className='text-red-500 text-sm mt-1'>{errors.service.message}</p>
                )}
            </div>

            <div>
                <Textarea
                    className='h-[200px]'
                    placeholder='Deixe sua mensagem aqui!'
                    {...register('message', {required: 'Campo obrigatório'})}
                />
                {errors.message && (
                    <p className='text-red-500 text-sm mt-1'>{errors.message.message}</p>
                )}
            </div>

            <Button
                size='md'
                className='max-w-40 h-12'
                type='submit'
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <>
                        Enviando
                        <Loader2
                            className="h-4 w-4 animate-spin ml-2"/> {/* Ícone giratório */}
                    </>
                ) : (
                    'Enviar'
                )}
            </Button>
        </form>
    );
};

export default ContactForm;