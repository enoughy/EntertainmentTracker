'use client';

import { useState, useEffect } from "react";
import { Modal } from '@/app/components/modal';
import X from '@/app/components/icons/x';
import { setDataStartEndIndexes } from "recharts/types/state/chartDataSlice";
import { useContent } from '@/features/content/hooks/useContent';
import { Media } from "@/features/content/entity/media";

export default function Movie(){
    const [ isOpen, setIsOpen ] = useState(false);
    const { content, getMediaBlocks, addMedia } = useContent();
    const [ series, setSeries ] = useState<Media[]>([]);

    const [ title, setTitle ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ status, setStatus ] = useState('');

    useEffect(() => {
        if (content) {
            const mediaBlocks = getMediaBlocks?.();
            if (mediaBlocks) {
                const allMedia: Media[] = [];
                Object.values(mediaBlocks).forEach(block => {
                    if (block.mediaList && Array.isArray(block.mediaList)) {
                        allMedia.push(...block.mediaList);
                    }
                });
                const filteredSeries = allMedia.filter((item) => item.contentType === 'series');

                if(filteredSeries.length !== series.length){
                    setSeries(filteredSeries);
                }
            }
        }
    }, [content, getMediaBlocks]);

    async function addMovie(){
        if(!title.trim() || !genre.trim() || !rating.trim() || !status.trim()){
            alert('Заполните все поля');
            return;
        }

        const numRating = Number(rating);
        if(numRating < 1 || numRating > 10){
            alert('Рейтинг должен быть от 1 до 10');
            return;
        }

        const series: Media = {
           name: title,
           genres: genre.split(',').map(g => g.trim()),
           rate: numRating,
           contentType: 'series',
           contentStatus: status,
           dateOfAdd: new Date(),
        }

        await addMedia(series);

        setTitle('');
        setGenre('');
        setRating('');
        setStatus('');

        setIsOpen(false);
    }

    return(
        <>
        <div className="flex justify-center items-center mb-[50px] mt-[30px] pageInfo">
            <h2 className="mr-[30px]">Мои Сериалы</h2>
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
                <label>Статус: </label>
                <select className="selectOption" onChange={(e) => setStatus(e.target.value)} value={status}>
                    <option value="favorite" className="text-[#ff6787]">Любимое</option>
                    <option value="completed" className="text-[#87d68d]">Просмотрено</option>
                    <option value="in_progress" className="text-[#ffc766]">В процессе</option>
                    <option value="planning" className="text-[#9a99f4]">Запланировано</option>
                    <option value="dropped" className="text-[#483c46]">Брошено</option>
                </select>
            </div>
            <div className="flex justify-center">
                <button className="cursor-pointer bg-[lightgray] p-[7px] rounded-[10px] border 2border-[gray] addBtn" onClick={addMovie}>Добавить</button>
            </div>
        </Modal>

        <div className="flex justify-center">
        <div className="gap-[20px] movies">
            {series.length === 0 ? (<p>Сериалов пока нет</p>) : (series.map((movie, index) => (
                <div key={index} className="bg-[#424549] p-[20px] text-[white] rounded-[15px] cardMovie">
                    <p>Название: {movie.name}</p>
                    <p>Жанр: {movie.genres.join(', ')}</p>
                    {movie.rate <= 10 && movie.rate > 6 ? (<p className="bg-[green] p-[5px] rounded-[10px] mb-[15px] mt-[10px]">Оценка: {movie.rate}/10</p>) : (movie.rate <= 6 && movie.rate > 3) ? (<p className="bg-[gold] p-[7px] rounded-[10px] mb-[15px] mt-[10px]">Оценка: {movie.rate}/10</p>) : (<p className="bg-[red] p-[7px] rounded-[10px] mb-[15px] mt-[10px]">Оценка: {movie.rate}/10</p>)}
                    {movie.contentStatus === 'favorite' ? (<p className="bg-[#ff6787] p-[3px] rounded-[10px]">Статус: Любимое</p>) : movie.contentStatus === 'completed' ? (<p className="bg-[#87d68d] p-[3px] rounded-[10px]">Статус: Просмотрено</p>) : movie.contentStatus === 'in_progress' ? (<p className="bg-[#ffc766] p-[3px] rounded-[10px]">Статус: В процессе</p>) : movie.contentStatus === 'planning' ? (<p className="bg-[#9a99f4] p-[3px] rounded-[10px]">Статус: Запланировано</p>) : (<p className="bg-[#483c46] p-[3px] rounded-[10px]">Статус: Брошено</p>)}
                </div>
            )))}
        </div>
        </div>
        </>
    )
}