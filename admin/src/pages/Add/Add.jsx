import { useState, useContext } from "react";
import './Add.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { AiOutlineUpload } from 'react-icons/ai';
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const Add = ({ url }) => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].add;

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({
      ...data, [name]: value
    }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "" });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(t.serverError);
    }
  }

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>{t.title}</h2>
        <form onSubmit={onSubmitHandler} className="add-form">
          {/* Left Column: Image */}
          <div className="form-left">
            <div className="add-img-upload">
              <label htmlFor="image" className="upload-area">
                {image ? <img src={URL.createObjectURL(image)} alt="food" /> :
                  <div className="upload-placeholder">
                    <AiOutlineUpload size={40} />
                    <p>{t.upload}</p>
                  </div>
                }
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
          </div>

          {/* Right Column: Form Fields */}
          <div className="form-right">
            <div className="form-group">
              <label>{t.name}</label>
              <input type="text" name="name" placeholder={t.namePlaceholder} value={data.name} onChange={onChangeHandler} required />
            </div>
            <div className="form-group">
              <label>{t.description}</label>
              <textarea name="description" rows="5" placeholder={t.descriptionPlaceholder} value={data.description} onChange={onChangeHandler} required></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t.category}</label>
                <select name="category" value={data.category} onChange={onChangeHandler}>
                  <option value="" disabled>{t.selectCategory}</option>
                  {t.categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{t.price}</label>
                <input type="number" name="price" placeholder={t.pricePlaceholder} value={data.price} onChange={onChangeHandler} required />
              </div>
            </div>
            <button type="submit" className="add-btn">{t.addButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
