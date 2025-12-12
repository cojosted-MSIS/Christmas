import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data (optional, for clean seed)
  await prisma.note.deleteMany();
  await prisma.event.deleteMany();
  await prisma.memory.deleteMany();
  await prisma.photo.deleteMany();

  // Create sample notes with 30-day expiration
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const note1 = await prisma.note.create({
    data: {
      author: 'Mom',
      content: 'Merry Christmas, everyone! So excited to see all our memories here! 🎄\n\n"The best way to spread Christmas cheer is singing loud for all to hear." - Elf',
      expiresAt,
    },
  });

  const note2 = await prisma.note.create({
    data: {
      author: 'Dad',
      content: 'The best way to spread Christmas cheer is sharing memories with family! Can\'t wait to see all the photos everyone uploads.',
      expiresAt,
    },
  });

  const note3 = await prisma.note.create({
    data: {
      author: 'Family',
      content: 'Welcome to our family photo album! Upload your favorite memories and let\'s make this Christmas special. 🎁',
      expiresAt,
    },
  });

  // Create sample events
  const now = new Date();
  const event1 = await prisma.event.create({
    data: {
      title: 'Christmas Eve Dinner',
      description: 'Family gathering at home - traditional dinner and gift exchange',
      dateTime: new Date(now.getFullYear(), 11, 24, 18, 0, 0), // Dec 24, 6 PM
      createdBy: 'Mom',
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Christmas Morning',
      description: 'Opening presents together and enjoying breakfast',
      dateTime: new Date(now.getFullYear(), 11, 25, 8, 0, 0), // Dec 25, 8 AM
      createdBy: 'Dad',
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'New Year\'s Eve Celebration',
      description: 'Ring in the new year together!',
      dateTime: new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0), // Jan 1, midnight
      createdBy: 'Family',
    },
  });

  // Create sample memories
  const memory1 = await prisma.memory.create({
    data: {
      title: 'First Family Photo Album',
      description: 'We started this digital photo album to keep all our precious memories in one place. This is just the beginning of our journey! Every photo tells a story, and we\'re excited to document our family\'s adventures together.',
      date: new Date(now.getFullYear(), 11, 1), // Dec 1
    },
  });

  const memory2 = await prisma.memory.create({
    data: {
      title: 'Setting Up the Album',
      description: 'Everyone is so excited to start sharing photos and memories. This is going to be amazing! We can\'t wait to look back on all these moments years from now.',
      date: new Date(now.getFullYear(), 11, 15), // Dec 15
    },
  });

  const memory3 = await prisma.memory.create({
    data: {
      title: 'Christmas Traditions Begin',
      description: 'Starting new traditions and keeping old ones alive. "Merry Christmas, ya filthy animal!" - Home Alone',
      date: new Date(now.getFullYear(), 11, 20), // Dec 20
    },
  });

  console.log('✅ Seeding completed!');
  console.log('Created:', {
    notes: 3,
    events: 3,
    memories: 3,
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

