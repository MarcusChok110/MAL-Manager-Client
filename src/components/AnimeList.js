import React from 'react';

const AnimeList = ({ animeList }) => {
  const titleClass = 'display-4';

  const Watching = ({ list }) => {
    return (
      <div>
        <h2 className={titleClass}>Currently Watching</h2>
      </div>
    );
  };

  const Completed = ({ list }) => {
    return (
      <div>
        <h2 className={titleClass}>Completed</h2>
      </div>
    );
  };

  const OnHold = ({ list }) => {
    return (
      <div>
        <h2 className={titleClass}>On Hold</h2>
      </div>
    );
  };

  const Dropped = ({ list }) => {
    return (
      <div>
        <h2 className={titleClass}>Dropped</h2>
      </div>
    );
  };

  const PlanToWatch = ({ list }) => {
    return (
      <div>
        <h2 className={titleClass}>Plan to Watch</h2>
      </div>
    );
  };

  const ListFormatted = () => {
    if (animeList) {
      const {
        watching,
        completed,
        on_hold,
        dropped,
        plan_to_watch,
      } = sortAnime(animeList.data);

      return (
        <div>
          <Watching list={watching} />
          <hr />
          <Completed list={completed} />
          <hr />
          <OnHold list={on_hold} />
          <hr />
          <Dropped list={dropped} />
          <hr />
          <PlanToWatch list={plan_to_watch} />
        </div>
      );
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

  // sort anime list alphabetically in the given categories of status
  function sortAnime(list) {
    const watching = [];
    const completed = [];
    const on_hold = [];
    const dropped = [];
    const plan_to_watch = [];

    const listSorted = { watching, completed, on_hold, dropped, plan_to_watch };

    for (const item of list) {
      const status = item.list_status.status;

      if (status === 'watching') {
        watching.push(item);
      } else if (status === 'completed') {
        completed.push(item);
      } else if (status === 'on_hold') {
        on_hold.push(item);
      } else if (status === 'dropped') {
        dropped.push(item);
      } else if (status === 'plan_to_watch') {
        plan_to_watch.push(item);
      }
    }

    // sort each category alphabetically by title
    for (const prop in listSorted) {
      listSorted[prop].sort((a, b) =>
        a.node.title < b.node.title ? -1 : a.node.title > b.node.title ? 1 : 0
      );
    }

    return listSorted;
  }

  return (
    <div>
      <h1>Your Anime List</h1>
      <hr />
      <ListFormatted />
    </div>
  );
};

export default AnimeList;
