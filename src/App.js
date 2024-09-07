import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  let [movieList, setMovieList] = useState([]);

  let getMovie = (title = "") => {
    let api = "";
    if (title === "") {
      api =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
    } else {
      api = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`;
    }
    axios.get(api).then((res) => {
      console.log(res.data.results);
      setMovieList(res.data.results);
    });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-purple-600 to-teal-600 font-mono overflow-y-scroll">
      <div className="max-w-[1140px] text-center mx-auto z-10">
        <h3 className="w-[100%] text-[40px] font-bold py-4">Movie App</h3>
        <input
          type="text"
          id="simple-search"
          onChange={(event) => getMovie(event.target.value)}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] mx-auto ps-7 p-2.5 outline-none"
          placeholder="Search movie..."
        />
        <div className="w-[100%] grid grid-cols-3 gap-6 py-12 ">
          {movieList.map((item, index) => {
            return <MovieCard key={index} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

function MovieCard({ data }) {
  return (
    <div className="relative w-[100%] rounded overflow-hidden shadow-lg">
      <div className={`w-[100%] h-[130px]  blur-[6px]`}>
        <img src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`} />
      </div>
      <div className="w-[100%] h-[130px] grid grid-cols-[31%_auto] text-center rounded-md absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgba(0,0,0,0.4)]">
        <div className="h-[80%]">
          <img
            src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
            className="h-[100%] w-[100%] rounded-l-md"
          />
        </div>
        <div className=" h-[80%] flex flex-col text-left pl-4 text-white">
          <h4 className="text-xl font-semibold mt-2 ">{data.title}</h4>
          <p className="justify-self-center">
            Release Date: {data.release_date}
          </p>
          <p className="justify-self-end">Average vote: {data.vote_average}</p>
        </div>
      </div>
    </div>
  );
}
