import assets from "../assets/assets"

const NewsLetter = () => {
  return (
    <div>
      <div className="md:grid md:grid-cols-2 max-w-4xl bg-white mx-4 md:mx-auto rounded-xl">
    <img src={assets.hero_girl}
        alt="newsletter" className="hidden md:block w-full max-w-lg rounded-xl" />
    <div className="relative flex items-center justify-center">
        <button className="absolute top-6 right-6" aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2 2 13M2 2l11 11" stroke="#1F2937" stroke-opacity=".7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div className="max-md:py-20 px-6 md:px-10 text-center">
            <h1 className="text-3xl font-bold">
                Subscribe to our newsletter
            </h1>
            <p className="mt-4 text-gray-500">
                Be the first to get the latest news about trends, promotions, and much more!
            </p>
            <form className="mt-8 flex">
                <input type="email" placeholder="Your email address"
                    className="w-full outline-none rounded-l-md border border-r-0 border-gray-300 p-4 text-gray-900" />
                <button type="submit" className="rounded-r-md bg-primary px-7 py-2 text-white">
                    Submit
                </button>
            </form>
        </div>
    </div>
</div>
    </div>
  )
}

export default NewsLetter;
