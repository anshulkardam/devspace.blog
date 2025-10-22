export const generateUsername = (): string => {
  const usernamePrefix = 'user-';

  const randomChar = Math.random().toString(36).slice(2);

  const username = usernamePrefix + randomChar;

  return username;
};

export const slugify = (title: string): string => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const randomChar = Math.random().toString(36).slice(2);

  const uniqueSlug = `${slug}-${randomChar}`;

  return uniqueSlug;
};
