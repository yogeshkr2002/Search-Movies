const GetMovies = ({ movies }) => {
  return (
    <>
      <div className="box">
        {movies.map((data) => {
          return (
            <>
              <div className="boxItem">
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  className="img"
                />
                <h3>{data.title}</h3>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default GetMovies;
