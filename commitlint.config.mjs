// Conventional Commits with the issue number, e.g. `feat(auth): add register page (#3)`.
// Rules: docs/process/commits-and-reviews.md in horizon-documentation.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    // Every commit references its GitHub issue with `#<number>`.
    'references-empty': [2, 'never'],
  },
};
