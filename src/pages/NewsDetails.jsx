import { Link, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import RightNav from "../components/layout-component/RightNav";


const NewsDetails = () => {
    const data = useLoaderData()
    const news = data.data[0];
    // console.log(news)
    return (
        <div className="w-11/12 mx-auto mt-5">
           <header>
                <Header></Header>
           </header>
           <section className=" grid grid-cols-12 gap-7">
              
                <section className="grid col-span-9">                        
                    <h1 className="font-semibold">Dragon News</h1>
                    <div className="card bg-base-200 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img
                        src={news ?.image_url}
                        alt="Shoes"
                        className="rounded-xl w-full" />
                    </figure>
                    <div className="card-body ">
                        <h2 className="text-3xl font-extrabold">{news?.title}</h2>
                        <p className="text-lg font-normal my-4">{news?.details}</p>
                        <div className="card-actions">
                        <Link to={`/category/${news?.category_id}`} className="btn text-white bg-[#D72050] text-base">All news in this category</Link>
                        </div>
                    </div>
                    </div>
                </section>
                <section className="grid col-span-3">
                        <RightNav></RightNav>
                </section>
             
           </section>
        </div>
    );
};

export default NewsDetails;