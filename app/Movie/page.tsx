'use client';

import { useState } from "react";
import { Modal } from '@/app/components/modal';
import X from '@/app/components/icons/x';

interface MovieType {
    id: number;
    title: string;
    genre: string;
    rating: number;
}

export default function Movie(){
    const [ isOpen, setIsOpen ] = useState(false);
    const [ movies, setMovies ] = useState<MovieType[]>([]);

    const [ title, setTitle ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ rating, setRating ] = useState('');

    function addMovie(){
        if(!title.trim() || !genre.trim() || !rating.trim()){
            alert('Заполните все поля');
            return;
        }

        const numRating = Number(rating);
        if(numRating < 1 || numRating > 10){
            alert('Рейтинг должен быть от 1 до 10');
            return;
        }

        const movie: MovieType = {
            id: Date.now(),
            title: title,
            genre: genre,
            rating: numRating,
        }

        setMovies([...movies, movie]);
        setTitle('');
        setGenre('');
        setRating('');

        setIsOpen(false);
    }

    return(
        <>
        <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
            <h2 className="mr-[30px]">Мои фильмы</h2>
            <button onClick={() => setIsOpen(true)} className="bg-[lightgray] p-[5px] rounded-[7px] border 2border-[gray] cursor-pointer addMovie">Добавить</button>
        </div>

        <Modal isOpen={isOpen}>
            
            <div className="flex justify-end">
                <button onClick={() => {setIsOpen(false); setTitle(''); setGenre(''); setRating('')}} className="cursor-pointer closeBtn"><X /></button>
            </div>
            <div className="inputContainer">
                <label>Название: </label>
                <input type="text" placeholder="Название..." value={title} onChange={(e) => setTitle(e.target.value)} required/>
                <br />
                <label>Жанр: </label>
                <input type="text" placeholder="экшен..." value={genre} onChange={(e) => setGenre(e.target.value)} required/>
                <br />
                <label>Ваша оценка от 1 до 10: </label>
                <input type="number" placeholder="9" value={rating} onChange={(e) => setRating(e.target.value)} required/>
            </div>
            <div className="flex justify-center">
                <button className="cursor-pointer bg-[lightgray] p-[7px] rounded-[10px] border 2border-[gray] addBtn" onClick={addMovie}>Добавить</button>
            </div>
        </Modal>

        <div className="flex justify-center">
        <div className="gap-[20px] movies">
            {movies.length === 0 ? (<p>Фильмов пока нет</p>) : (movies.map((movie) => (
                <div key={movie.id} className="bg-[#424549] p-[20px] text-[white] rounded-[15px] cardMovie">
                    <p>Название: {movie.title}</p>
                    <p>Жанр: {movie.genre}</p>
                    {movie.rating <= 10 && movie.rating > 6 ? (<p className="bg-[green] p-[7px] rounded-[10px]">Оценка: {movie.rating}/10</p>) : (movie.rating <= 6 && movie.rating > 3) ? (<p className="bg-[gold] p-[7px] rounded-[10px]">Оценка: {movie.rating}/10</p>) : (<p className="bg-[red] p-[7px] rounded-[10px]">Оценка: {movie.rating}/10</p>)}
                    
                </div>
            )))}
        </div>
        </div>
        </>
    )
}