import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {

  const [article, setArticle] = useState({
    url:'',
    summary:'',
  });

  const [allArticles, setAllArticles] = useState([]);//for the whole summary

  const [getSummary, { error, isFetching}] = useLazyGetSummaryQuery(); //direct get summary, detect error, and fetch the api
  
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }

  }, []) //avoid lost article after reloading or disconnect by stroing it on local storage

  const handleSubmit = async (e) => {
    e.preventDefault()//prevent default behavior in browser to reload the app

    const{data} = await getSummary({ articleUrl:article.url});

    if(data?.summary){
      const newArticle = { ...article, summary: data.summary};
      const updatedAllArticles = [newArticle, ...allArticles];//

      setArticle(newArticle);
      setAllArticles(updatedAllArticles); //pushing new articles to updatedAllArticles

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/*Search */}
      <div className="flex flex-col w-full gap-2">
        <form action="" className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link-icon" className="absolute left-0 my-2 ml-3 w-5" />

          <input type="url" placeholder="Enter a URL" value={article.url} onChange={(e) => setArticle({article, url: e.target.value})} required className="url_input peer-focus:border-gray-700 peer-focus:text-gray-700"/>

          <button type="submit" className="submit_btn">
            <p>↵</p>
          </button>
        </form>

        {/*Browse URL History */}
      </div>

      {/* Display Results */}
    </section>
  )
}

export default Demo