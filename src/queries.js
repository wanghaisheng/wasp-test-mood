import { HttpError } from 'wasp/server';

export const getJournalEntries = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  return context.entities.JournalEntry.findMany({
    where: { userId: context.user.id },
    include: { mood: true }
  });
}

export const getMoodList = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Mood.findMany();
}
