import { HttpError } from 'wasp/server'

export const createJournalEntry = async ({ content, moodId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newEntry = await context.entities.JournalEntry.create({
    data: {
      content,
      mood: { connect: { id: moodId } },
      user: { connect: { id: context.user.id } },
      createdAt: new Date()
    }
  });

  return newEntry;
}

export const updateJournalEntry = async ({ id, content, moodId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const journalEntry = await context.entities.JournalEntry.findUnique({
    where: { id },
    select: { userId: true }
  });
  if (!journalEntry || journalEntry.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.JournalEntry.update({
    where: { id },
    data: { content, moodId }
  });
}
