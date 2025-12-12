import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample notes
  const note1 = await prisma.note.create({
    data: {
      author: 'Mom',
      content: 'Merry Christmas, everyone! So excited to see all our memories here! 🎄',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  const note2 = await prisma.note.create({
    data: {
      author: 'Dad',
      content: 'The best way to spread Christmas cheer is sharing memories with family!',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  // Create sample events
  const event1 = await prisma.event.create({
    data: {
      title: 'Christmas Eve Dinner',
      description: 'Family gathering at home',
      dateTime: new Date('2024-12-24T18:00:00'),
      createdBy: 'Mom',
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Christmas Morning',
      description: 'Opening presents together',
      dateTime: new Date('2024-12-25T08:00:00'),
      createdBy: 'Dad',
    },
  });

  // Create sample memories
  const memory1 = await prisma.memory.create({
    data: {
      title: 'First Family Photo Album',
      description: 'We started this digital photo album to keep all our precious memories in one place. This is just the beginning of our journey!',
      date: new Date('2024-12-01'),
    },
  });

  const memory2 = await prisma.memory.create({
    data: {
      title: 'Setting Up the Album',
      description: 'Everyone is so excited to start sharing photos and memories. This is going to be amazing!',
      date: new Date('2024-12-15'),
    },
  });

  console.log('✅ Seeding completed!');
  console.log('Created:', {
    notes: 2,
    events: 2,
    memories: 2,
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

