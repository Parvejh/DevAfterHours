import { useEffect, useState } from "react"
import Navbar from "../components/Home/Navbar"
import {getPosts} from '../services/postServices'
import PostCard from "../components/Postcard";
import {ArrowRight,ArrowLeft,X} from 'lucide-react'
import {getCategories} from '../services/categoryServices'

const Posts = () => {
    const[posts,setPosts] = useState([]);
    const[error,setError] = useState('');
    const[isLoading,setIsLoading] = useState(true);
    const[search,setSearch] = useState("")
    const[searchQuery, setSearchQuery] = useState("");
    const[searchMessage,setSearchMessage] = useState("")
    const[currentPage,setCurrentPage] = useState(1);
    const[totalPages,setTotalPages] = useState(0);
    const[categories,setCategories] = useState([]);
    const[currentCategory,setCurrentCategory] = useState("")
    
    const submitHandler = (e)=>{
        e.preventDefault();
        setCurrentPage(1);
        const trimmedSearch = search.trim();
        setSearchQuery(trimmedSearch);
        // try{
        //     setIsLoading(true);
        //     setError("");
        //     setSearchMessage("")
        //     setCurrentPage(1)
        //     const response = await getPosts(search,1);
        //     const data = response.posts
        //     if(data.length===0){
        //         setSearchMessage(`No post found for "${search}"`)
        //     }
        //     setPosts(data);
        // }catch(error){
        //     console.error(`Error Searching : ${error}`);
        //     setError(error.response?.data?.message)
        // }finally{
        //     setIsLoading(false)
        // }
    }
    const clearSearch = ()=>{
        setSearch("")
        setSearchQuery("");
        setSearchMessage("");
        setCurrentPage(1)
    }

    const previousPage = ()=>{
        if(currentPage===1){
            return
        }
        setCurrentPage(prev=>prev-1)
        
    }
    const nextPage = ()=>{
        if(currentPage === totalPages){
            return
        }
        setCurrentPage(prev=>prev+1)
        
    }

    // Fetch categories
    useEffect(()=>{

        const controller = new AbortController();
        const extractCategories = async()=>{
            try{
                setIsLoading(true)
                setError("")
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories.categories)
            }catch(error){
                console.error("Error fetching posts:", error);
                setError(
                    error.response?.data?.message ||
                    "Unable to extract Categories."
                );
            }finally{
                // setIsLoading(false)
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        extractCategories();

        return () => {
            controller.abort();
        };
    },[])

    // Fetch Posts
    useEffect(()=>{

        const controller = new AbortController();
        const extractPosts = async()=>{
            try{
                setIsLoading(true)
                setError("")
                const data = await getPosts(searchQuery,currentPage,controller.signal,currentCategory);
                const {totalPages} = data.pagination
                setTotalPages(totalPages)
                setPosts(data.posts)
                if(data.posts.length===0 && searchQuery){
                    setSearchMessage(`No Post found for "${searchQuery}"`)
                }else{
                    setSearchMessage("")
                }
            }catch(error){
                if (error.name === "CanceledError") {
                    return;
                }
                console.error("Error fetching posts:", error);
                setError(
                    error.response?.data?.message ||
                    "Unable to load posts."
                );
            }finally{
                // setIsLoading(false)
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }
        const extractCategories = async()=>{
            try{
                setIsLoading(true)
                setError("")
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories.categories)
            }catch(error){
                console.error("Error fetching posts:", error);
                setError(
                    error.response?.data?.message ||
                    "Unable to extract Categories."
                );
            }finally{
                // setIsLoading(false)
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        extractPosts();
        extractCategories();

        return () => {
            controller.abort();
        };
    },[currentPage,searchQuery,currentCategory])

    // Scroll effect
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [currentPage]);

    const getPageNumbers = () => {
        if(totalPages<=5){
            const pages = [];
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }
        if(currentPage <=3){
            return [1,2,3,"...",totalPages];
        }
        if(currentPage >= totalPages-2){
            return [1,"...",totalPages-2,totalPages-1,totalPages]
        }
        return [
            1,
            "...",
            currentPage-1,
            currentPage,
            currentPage+1,
            "...",
            totalPages
        ]
    };

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <main className="mx-auto max-w-7xl px-6 py-16">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                    All Posts
                </h1>

                <p className="mt-3 text-zinc-500 mb-5">
                    Explore everything I've written.
                </p>

                {/* Search Bar */}
                <form className="mb-5 flex w-full gap-2 items-start" onSubmit={submitHandler}>
                    <div className="searchBar relative grow">
                        <input 
                        type="text" 
                        name="search" 
                        className="mb-5 outline-none rounded px-5 py-2 text-lg w-full border border-zinc-500 text-zinc-700"
                        placeholder="Search Posts" 
                        value={search}
                        onChange={(e)=>{
                            setSearch(e.target.value)
                        }}
                        />
                        
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-3 top-1/3 -translate-y-1/2 text-zinc-500 hover:text-zinc-900 cursor-pointer"
                                aria-label="Clear search"
                            >
                                <X size={21} />
                            </button>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="rounded-md bg-zinc-900 text-lg px-7 py-2 font-medium text-white hover:bg-zinc-800 "
                    >
                        Search
                    </button>
                </form>

                {/* Category filter */}
                <select 
                name="category" 
                value={currentCategory}
                onChange={(e)=>{
                    setCurrentCategory(e.target.value);
                    setCurrentPage(1)
                }}
                className="mb-5 border w-fit px-3 py-1 rounded">
                    <option value="" disabled selected hidden>Choose Category</option>
                    <option value="">
                        Clear Categories
                    </option>
                    {categories.map((category)=>(
                        <option 
                        key={category._id}
                        value={category.slug}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                
                {isLoading &&
                    (
                        <p className="mt-10 text-zinc-500">
                            Loading posts...
                        </p>
                    )
                }

                {
                    error &&
                    (
                        <p className="mt-10 text-red-500">
                            {error}
                        </p>
                    )
                }

                {
                    !isLoading && !error && posts.length===0 && !searchMessage && (
                        <p className="my-5 text-zinc-500">
                            No Posts published yet.
                        </p>
                    )
                }

                {
                    searchMessage &&
                    (
                        <p className="mb-5 text-zinc-500">
                            {searchMessage}
                        </p>
                    )
                }
                {
                    !isLoading && !error && posts.length>0 && (
                        posts.map((post)=>(
                            <PostCard
                                key={post._id}
                                post={post}
                            />
                        ))
                    )
                }
                {
                    totalPages>1 &&
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        {/* Previous button */}
                        <button 
                        aria-label="Previous page"
                        className={`flex items-center gap-1 text-lg font-semibold text-zinc-700 group 
                            ${currentPage===1 ? 'opacity-70 cursor-not-allowed':' cursor-pointer'}`}
                        disabled={currentPage===1}
                        onClick={previousPage}
                        >
                            <span className="transition-transform duration-200 ease-in-out group-hover:-translate-x-1">
                                <ArrowLeft size={17}/>
                            </span>
                            Prev
                        </button>
                        {/* Pagination Buttons */}
                        <div className="flex items-center gap-2">
                            {
                                getPageNumbers().map((page,index)=>{
                                    if (page === "...") {
                                        return (
                                            <span
                                                key={`ellipsis-${index}`}
                                                className="flex h-10 w-10 items-center justify-center text-zinc-500"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    return <button 
                                    key={page}
                                    aria-label={`Go to page ${page}`}
                                    onClick={()=>setCurrentPage(page)}
                                    disabled={currentPage===page}
                                    className={`h-9 w-9 rounded-md text-sm font-medium transition
                                        ${
                                            currentPage === page
                                                ? "bg-zinc-900 text-white cursor-default"
                                                : "text-zinc-600 hover:bg-zinc-200 cursor-pointer"
                                        }
                                    `}>
                                        {page}
                                    </button>
                                })
                            }
                        </div>
                        {/* Next Button */}
                        <button
                        aria-label="Next page"
                        className={`flex items-center gap-1 text-lg font-semibold text-zinc-700 group
                            ${currentPage===totalPages ? 'opacity-70 cursor-not-allowed':' cursor-pointer'}`} 
                        disabled={currentPage===totalPages}
                        onClick={(nextPage)}
                        >
                            Next
                            <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <ArrowRight size={17}/>
                            </span>
                        </button>
                    </div>
                }
            </main>
        </div>
    )
}

export default Posts
