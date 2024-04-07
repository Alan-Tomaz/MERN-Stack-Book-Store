import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


function EditBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/books/${id}`)
            .then((res) => {
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setPublishYear(res.data.publishYear);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
                enqueueSnackbar("Book Edited Successfully", { variant: 'success' })
            })
            .catch((err) => {
                setLoading(false);
                enqueueSnackbar("An error hapened. Please Check Console", { variant: 'error' })
                console.log(err);
            });
    };


    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ?
                <Spinner />
                :
                <div className="flex flex-col border-2 border-sky-400 w-[600px] p-4 mx-auto">
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Title</label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Author</label>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>
                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                        <input
                            type='text'
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>
                    <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Save</button>

                </div>
            }
        </div>
    )
}

export default EditBook
