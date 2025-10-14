import { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import {toast} from 'react-hot-toast';
import {assets,  categories } from '../../assets/assets';

const AddProduct = () => {
    const {navigate, axios}=useContext(AppContext);
    const [file, setFile] = useState(null);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        price: '',
        offerPrice: '',
        rating: '',
        reviews: '',
        description: '',
        category: '',
        image: null,
    });
    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
      try {
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('author', bookData.author);
        formData.append('price', bookData.price);
        formData.append('offerPrice', bookData.offerPrice);
        formData.append('rating', bookData.rating);
        formData.append('reviews', bookData.reviews);
        formData.append('description', bookData.description);
        formData.append('category', bookData.category);
        formData.append('image', file);
        const { data } = await axios.post("/book/add", formData);
        if(data.success){
            toast.success(data.message);
            navigate("/admin");
        }
        else{
            toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Book Image</p>
                    <div className='flex items-center gap-3 mt-2'>
                    <label htmlFor="image">
                    <input type="file" accept='image/*' onChange={(e) => { setFile(e.target.files[0]);}} id='image' hidden />
                    <img src={file ? URL.createObjectURL(file) : assets.upload_area} alt="UploadArea" width={100} height={100} className='max-w-24 cursor-pointer' />
                    </label>
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Book Name</label>
                    <input id="product-name" type="text" name='title' value={bookData.title} onChange={handleChange} placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-author">Book Author</label>
                    <input id="author-name" type="text" name='author' value={bookData.author} onChange={handleChange} placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Book Description</label>
                    <textarea id="product-description" name='description' value={bookData.description} onChange={handleChange} rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" value={bookData.category} name='category' onChange={handleChange} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input id="product-price" type="number" name='price' value={bookData.price} onChange={handleChange} placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input id="offer-price" type="number"  placeholder="0" name='offerPrice' onChange={handleChange} value={bookData.offerPrice} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="">Rating</label>
                        <input type="number"  placeholder="0" name='rating' onChange={handleChange} value={bookData.rating} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Review</label>
                        <input type="text"  placeholder="Type Here" name='reviews' onChange={handleChange} value={bookData.reviews} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded">ADD</button>
            </form>
        </div>
  )
}

export default AddProduct
