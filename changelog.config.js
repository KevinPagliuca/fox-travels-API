module.exports = {
  disableEmoji: false,
  questions: ['type', 'subject', 'body', 'issues'],
  list: ['chore', 'feat', 'fix', 'test', 'refactor', 'docs', 'merge'],
  maxMessageLength: 64,
  minMessageLength: 3,
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '๐ฆ',
      value: 'chore',
    },
    feat: {
      description: 'A new feature',
      emoji: 'โจ',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '๐',
      value: 'fix',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '๐งช',
      value: 'test',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '๐ก',
      value: 'refactor',
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '๐',
      value: 'docs',
    },
    merge: {
      description: 'Merge branchs',
      emoji: '๐งฌ',
      value: 'merge',
    },
  },
};
