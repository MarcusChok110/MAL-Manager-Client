import React from 'react';

const AnimeList = ({ animeList }) => {
  const ListFormatted = () => {
    if (animeList) {
      return <p>{JSON.stringify(animeList)}</p>;
    } else if (animeList === '') {
      return (
        <p>
          Please log with your MyAnimeList account if you want to see your Anime
          List!
        </p>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>AnimeList</h1>
      <ListFormatted />
    </div>
  );
};

export default AnimeList;
