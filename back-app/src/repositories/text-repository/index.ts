import { prisma } from "../../config";

const postText = async (newText: string) => {
    // Excluir todos os textos existentes (caso haja mais de um)
    await prisma.text.deleteMany({});

    // Criar o novo texto no banco de dados
    const createdText = await prisma.text.create({
        data: {
            text: newText  // Supondo que seu modelo tenha um campo 'content'
        }
    });

    return createdText;
};

const getText = async () => {
    // Buscar o único texto no banco de dados
    return await prisma.text.findFirst();
};

export default {
    postText,
    getText
};