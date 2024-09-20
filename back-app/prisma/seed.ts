import { Participant, PrismaClient, Skin, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpar os dados das tabelas no banco de dados, respeitando a ordem dos relacionamentos
  await prisma.transaction.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.raffleSkin.deleteMany({});
  await prisma.participant.deleteMany({});
  await prisma.raffle.deleteMany({});
  await prisma.skin.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.text.deleteMany({});

  // Verificar se há um admin existente
  let admin = await prisma.user.findFirst({
    where: {
      isAdmin: true,
    },
  });

  // Se não houver admin, criar um novo
  if (!admin) {
    const hashedPassword = await bcrypt.hash('password', 12);

    admin = await prisma.user.create({
      data: {
        name: 'Vidal',
        email: 'admlokinhoskins@gmail.com',
        password: hashedPassword,
        picture: 'default',
        isAdmin: true,
        saldo: 99999999,
      },
    });

    await prisma.text.create({
      data: {
        text: 'Inicial',
      },
    });
  }

  const transactionTypes = ['credit', 'debit'];
for (let i = 0; i < 20; i++) {
  const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  const amount = Math.random() * 500; // Valor aleatório entre 0 e 500

  await prisma.transaction.create({
    data: {
      user_id: admin.id,
      paymentId: `PAYMENT-${Math.floor(Math.random() * 100000)}`,
      status: 'completed',
      paymentMethod: type === 'credit' ? 'PIX' : 'balance',
      transactionAmount: type === 'credit' ? amount : -amount,
      type,
      dateApproved: new Date(),
    },
  });

  // Atualizar o saldo do admin baseado no tipo de transação
  if (type === 'credit') {
    await prisma.user.update({
      where: { id: admin.id },
      data: { saldo: { increment: amount } },
    });
  } else {
    await prisma.user.update({
      where: { id: admin.id },
      data: { saldo: { decrement: amount } },
    });
  }
}

  // Criar usuários de exemplo
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    const hashedPassword = await bcrypt.hash('password', 12);
    const user = await prisma.user.create({
      data: {
        name: `User${i}`,
        email: `user${i}@example.com`,
        picture: `default`,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  // Criar skins de exemplo
  const skins: Skin[] = [];
  for (let i = 0; i < 10; i++) {
    const skin = await prisma.skin.create({
      data: {
        name: `Skin${i}`,
        value: Math.floor(Math.random() * 100),
        picture: `default`,
        type: 'AWP',
      },
    });
    skins.push(skin);
  }

  // Criar rifas e associá-las com skins e participantes
  for (let i = 0; i < 10; i++) {
    let isActiveStatus = 'Inativa';

    if (i === 9) {
      isActiveStatus = 'Ativa';
    } else if (i === 8) {
      isActiveStatus = 'Em espera';
    }

    const raffle = await prisma.raffle.create({
      data: {
        name: `Raffle${i}`,
        value: Math.floor(Math.random() * 1000),
        is_active: isActiveStatus,
        users_quantity: Math.floor(Math.random() * 50),
        free: Math.random() > 0.5,
      },
    });

    // Selecionar 3 skins aleatórias para a rifa
    const selectedSkins = skins.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Relacionar as skins com a rifa
    for (const skin of selectedSkins) {
      await prisma.raffleSkin.create({
        data: {
          raffle_id: raffle.id,
          skin_id: skin.id,
          skinName: skin.name,
          skinValue: skin.value,
          skinType: skin.type,
          skinPicture: skin.picture,
        },
      });
    }

    // Criar participantes para a rifa
    const participants: Participant[] = [];
    for (let j = 0; j < raffle.users_quantity; j++) {
      const participant = await prisma.participant.create({
        data: {
          user_id: users[Math.floor(Math.random() * users.length)].id,
          raffle_id: raffle.id,
          number: Math.floor(Math.random() * 1000),
        },
      });
      participants.push(participant);
    }

    // Escolher um vencedor aleatório se a rifa não estiver ativa
    if (i !== 9 && participants.length > 0) {
      const winnerIndex = Math.floor(Math.random() * participants.length);
      const winnerParticipant = participants[winnerIndex];

      // Atualizando o campo `winner` na tabela `raffleSkin`
      await prisma.raffleSkin.updateMany({
        where: {
          raffle_id: raffle.id,
        },
        data: {
          winner_id: winnerParticipant.id,
        },
      });
    }
 }
 }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
