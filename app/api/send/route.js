import {NextResponse} from 'next/server';
import {createTransport} from 'nodemailer';

export async function POST(request) {
    const mailData = await request.json();
    console.log('Dados recebidos:', mailData);

    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD, // Senha de App
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Portfólio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Enviando para você mesmo
            subject: `Novo contato: ${mailData.firstName}`,
            html: `
        <p><strong>Nome:</strong> ${mailData.firstName} ${mailData.lastName || ''}</p>
        <p><strong>Email:</strong> ${mailData.email}</p>
        <p><strong>Telefone:</strong> ${mailData.phone || 'Não informado'}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mailData.message}</p>
      `,
        });

        console.log('E-mail enviado com sucesso! Message ID:', info.messageId);
        return NextResponse.json({success: true});

    } catch (error) {
        console.error('Erro no Nodemailer:', {
            error: error.message,
            stack: error.stack,
            credentials: {
                user: process.env.EMAIL_USER,
                hasPassword: !!process.env.EMAIL_PASSWORD
            }
        });
        return NextResponse.json(
            {error: 'Erro no servidor de e-mail'},
            {status: 500}
        );
    }
}