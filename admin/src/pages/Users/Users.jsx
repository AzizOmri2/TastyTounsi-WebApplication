import { useState, useEffect, useContext } from 'react';
import './Users.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaUser, FaExclamationTriangle } from "react-icons/fa";
import { LanguageContext } from '../../context/LanguageContext';
import { languages } from '../../languages.js';

const Users = ({ url }) => {
  const { language } = useContext(LanguageContext);
  const t = languages[language || "English"].users;

  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/user/list`);
      if (response.data.success) {
        setUsers(response.data.data || []);
      } else {
        setUsers([]);
        toast.error(t.errorFetchingUsers);
      }
    } catch (err) {
      setUsers([]);
      toast.error(t.errorFetchingUsers);
      console.error(err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${url}/api/user/delete/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchUsers();
      } else {
        toast.error(t.errorDeletingUser);
      }
    } catch (err) {
      toast.error(t.errorDeletingUser);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='users-page'>
      <div className="users-card">
        <h2>{t.usersList}</h2>

        {(!users || users.length === 0) ? (
          <div className="users-empty">
            <FaUser size={60} />
            <p>{t.noUsers}</p>
            <small>{t.usersPlaceholder}</small>
          </div>
        ) : (
          <div className="users-table">
            <div className="users-table-row users-title">
              <b>{t.name}</b>
              <b>{t.email}</b>
              <b>{t.role}</b>
              <b></b>
            </div>

            {users.map((user, index) => (
              <div key={user._id || index} className='users-table-row'>
                <p><span className="name-badge">{user.name}</span></p>
                <p>{user.email}</p>
                <p>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                  </span>
                </p>
                <p className="users-actions">
                  <span className="users-btn users-delete" onClick={() => { setSelectedUserId(user._id); setShowConfirm(true); }} title={t.deleteUser}>
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
        <div className="users-overlay">
          <div className="users-modal">
            <FaExclamationTriangle size={40} color="#e63946" style={{ marginBottom: '12px' }}/>
            <h3>{t.confirmDeletion}</h3>
            <p>{t.confirmDeletionText}</p>

            <div className="users-modal-actions">
              <button className="users-confirm" onClick={() => { deleteUser(selectedUserId); setShowConfirm(false); }}>
                {t.yesDelete}
              </button>
              <button className="users-cancel" onClick={() => setShowConfirm(false)}>
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
