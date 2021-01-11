const Enum = (name, data) => {
  // data = {displayName: 'param'...}
  return { name, data };
};

const type = Enum('type', {
  TV: 'tv',
  OVA: 'ova',
  Movie: 'movie',
  Special: 'special',
  ONA: 'ona',
  Music: 'music',
});

const score = Enum('score', {
  '10 - Masterpiece': '10.0',
  '9 - Great': '9.0',
  '8 - Very Good': '8.0',
  '7 - Good': '7.0',
  '6 - Fine': '6.0',
  '5 - Average': '5.0',
  '4 - Bad': '4.0',
  '3 - Very Bad': '3.0',
  '2 - Horrible': '2.0',
  '1 - Appalling': '1.0',
});

const status = Enum('status', {
  Airing: 'airing',
  Completed: 'completed',
  'To Be Aired': 'to_be_aired',
});

const rated = Enum('rated', {
  'G - All Ages': 'g',
  'PG - Children': 'pg',
  'PG-13 - Teens 13 or Older': 'pg13',
  'R - 17+ recommended': 'r17',
  'R+ - Mild Nudity': 'r',
  'Rx - Hentai': 'rx',
});

const order_by = Enum('order_by', {
  Title: 'title',
  'Start Date': 'start_date',
  'End Date': 'end_date',
  Score: 'score',
  Type: 'type',
  Members: 'members',
  ID: 'id',
  Episodes: 'episodes',
  Rating: 'rating',
});

const sort = Enum('sort', {
  Ascending: 'ascending',
  Descending: 'descending',
});

const genre = Enum('genre', {
  Action: 1,
  Adventure: 2,
  Cars: 3,
  Comedy: 4,
  Dementia: 5,
  Demons: 6,
  Mystery: 7,
  Drama: 8,
  Ecchi: 9,
  Fantasy: 10,
  Game: 11,
  Hentai: 12,
  Historical: 13,
  Horror: 14,
  Kids: 15,
  Magic: 16,
  'Martial Arts': 17,
  Mecha: 18,
  Music: 19,
  Parody: 20,
  Samurai: 21,
  Romance: 22,
  School: 23,
  'Sci Fi': 24,
  Shoujo: 25,
  'Shoujo Ai': 26,
  Shounen: 27,
  'Shounen Ai': 28,
  Space: '29',
  Sports: 30,
  'Super Power': 31,
  Vampire: 32,
  Yaoi: 33,
  Yuri: 34,
  Harem: 35,
  'Slice Of Life': 36,
  Supernatural: 37,
  Military: 38,
  Police: 39,
  Psychological: 40,
  Thriller: 41,
  Seinen: 42,
  Josei: 43,
});

const searchEnums = { type, score, status, rated, order_by, sort, genre };

export default searchEnums;
