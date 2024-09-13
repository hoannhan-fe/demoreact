export const GetLocaleFullname = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'ja':
      return 'Japanese';
    case 'vi':
      return 'Tiếng Việt';
    default:
      return 'English';
  }
};
