import { PrismaClient,Prisma, MemberRole, InvitationStatus, AIRole } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
import bcrypt from "bcrypt";


async function main() {
  const password = await bcrypt.hash("password123", 10);

  // Users
  const owner = await prisma.user.create({
    data: {
      name: "Nadeem Ansari",
      email: "nadeem@example.com",
      password,
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password,
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  });

  // Project
  const project = await prisma.project.create({
    data: {
      name: "PairPilot AI",
      description: "Real-time collaborative coding platform",
      ownerId: owner.id,
    },
  });

  // Members
  const ownerMember = await prisma.projectMember.create({
    data: {
      role: MemberRole.OWNER,
      projectId: project.id,
      userId: owner.id,
    },
  });

  const memberMember = await prisma.projectMember.create({
    data: {
      role: MemberRole.MEMBER,
      projectId: project.id,
      userId: member.id,
    },
  });

  // Invitation
  await prisma.invitation.create({
    data: {
      email: "newuser@example.com",
      status: InvitationStatus.PENDING,
      projectId: project.id,
      invitedById: owner.id,
    },
  });

  // File
  await prisma.file.create({
    data: {
      name: "index.ts",
      path: "/src/index.ts",
      language: "typescript",
      content: 'console.log("Hello PairPilot");',
      projectId: project.id,
    },
  });

  // Chat
  const chat = await prisma.chat.create({
    data: {
      projectId: project.id,
    },
  });

  // Messages
  await prisma.message.createMany({
    data: [
      {
        content: "Welcome to PairPilot!",
        senderId: ownerMember.id,
        chatId: chat.id,
      },
      {
        content: "Excited to collaborate 🚀",
        senderId: memberMember.id,
        chatId: chat.id,
      },
    ],
  });

  // AI Conversation
  const conversation = await prisma.conversation.create({
    data: {
      projectId: project.id,
    },
  });

  // AI Messages
  await prisma.aIMessage.createMany({
    data: [
      {
        role: AIRole.USER,
        content: "Generate a WebSocket server.",
        conversationId: conversation.id,
      },
      {
        role: AIRole.AI,
        content: "Sure! Here's a basic WebSocket server...",
        conversationId: conversation.id,
      },
    ],
  });

  // Notification
  await prisma.notification.create({
    data: {
      title: "Project Created",
      message: "Your PairPilot AI project has been created successfully.",
      userId: owner.id,
    },
  });

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });