import { useState, useEffect, useContext } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaBoxOpen, FaEdit, FaEye, FaExclamationTriangle } from "react-icons/fa";
import { LanguageContext } from "../../context/LanguageContext";
import { languages } from "../../languages.js";

const List = ({ url }) => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].list;

  const [list, setList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const translateCategory = (category) => {
    const lower = category.toLowerCase();

    if (lower === "salad") return t.categorySalad;
    if (lower === "pizza") return t.categoryRolls;
    if (lower === "deserts") return t.categoryDeserts;
    if (lower === "sandwich") return t.categorySandwich;
    if (lower === "cake") return t.categoryCake;
    if (lower === "pure veg") return t.categoryPureVeg;
    if (lower === "pasta") return t.categoryPasta;
    if (lower === "noodles") return t.categoryNoodles;

    return category;
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if(response.data.success){
        setList(response.data.data);
      } else {
        toast.error(t.errorFetching);
      }
    } catch (err) {
      toast.error(t.errorFetching);
    }
  };

  const removeFood = async(foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id: foodId});
      await fetchList();
      if(response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(t.errorDeleting);
      }
    } catch (err) {
      toast.error(t.errorDeleting);
    }
  };

  const handleShowDetails = async (foodId) => {
    try {
      const response = await axios.get(`${url}/api/food/${foodId}`);
      if(response.data.success){
        setSelectedFood(response.data.data);
        setShowDetails(true);
      } else {
        toast.error(t.errorFetchingDetails);
      }
    } catch (err) {
      toast.error(t.errorFetchingDetails);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedFood(null);
  };

  const handleUpdate = (foodId) => {
    toast.info(`${t.updateFood}: ${foodId}`);
    // Add your update logic here or open a modal
  };

  const getCategoryClass = (category) => {
    switch(category) {
      case "Salad": return "category-salad";
      case "Pizza": return "category-rolls";
      case "Deserts": return "category-deserts";
      case "Sandwich": return "category-sandwich";
      case "Cake": return "category-cake";
      case "Pure Veg": return "category-pureveg";
      case "Pasta": return "category-pasta";
      case "Noodles": return "category-noodles";
      default: return "category-default";
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-page'>
      <div className="list-card">
        <h2>{t.menuOverview}</h2>

        {list.length === 0 ? (
          <div className="empty-list">
            <FaBoxOpen size={60} />
            <p>{t.noItems}</p>
            <small>{t.addProducts}</small>
          </div>
        ) : (
          <div className="list-table">
            <div className="list-table-format title">
              <b>{t.image}</b>
              <b>{t.name}</b>
              <b>{t.category}</b>
              <b>{t.price}</b>
              <b></b>
            </div>

            {list.map((item, index) => (
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>
                  <span className={`category-badge ${getCategoryClass(item.category)}`}>
                    {translateCategory(item.category)}
                  </span>
                </p>
                <p>{item.price} <strong>{t.currency}</strong></p>

                <p className="action-icons">
                  <span className="action-badge action-show" onClick={() => handleShowDetails(item._id)} title={t.showDetails}>
                    <FaEye />
                  </span>
                  <span className="action-badge action-update" onClick={() => handleUpdate(item._id)} title={t.updateFood}>
                    <FaEdit />
                  </span>
                  <span className="action-badge action-delete" onClick={() => { setSelectedFoodId(item._id); setShowConfirm(true); }} title={t.deleteFood}>
                    <FaTrash />
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="list-overlay">
          <div className="list-modal">
            <FaExclamationTriangle size={40} color="#e63946" style={{ marginBottom: '12px' }}/>
            <h3>{t.confirmDelete}</h3>
            <p>{t.confirmDeleteMsg}</p>

            <div className="list-modal-actions">
              <button className="list-confirm" onClick={() => { removeFood(selectedFoodId); setShowConfirm(false); }}>{t.yesDelete}</button>
              <button className="list-cancel" onClick={() => setShowConfirm(false)}>{t.cancel}</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOD DETAILS MODAL */}
      {showDetails && selectedFood && (
        <div className="list-overlay">
          <div className="list-modal food-details-modal">
            <span className="modal-close-btn" onClick={handleCloseDetails}>&times;</span>
            <img src={`${url}/images/${selectedFood.image}`} alt={selectedFood.name} className="food-modal-image" />
            <div className="food-modal-content">
              <h2 className="food-modal-title">{selectedFood.name}</h2>
              <div className="food-modal-content-details">
                <p><strong>{t.category}: </strong> <span className={`category-badge ${getCategoryClass(selectedFood.category)}`}>{translateCategory(selectedFood.category)}</span></p>
                <p><strong>{t.price}: </strong> {selectedFood.price} <strong>{t.currency}</strong></p>
                <p><strong>{t.description}: </strong> {selectedFood.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
