import React from 'react';
import styles from './UserInfo.module.css';
import { CgClose } from "react-icons/cg";
import { MdEmail, MdPhoneIphone, MdLocationOn  } from "react-icons/md";
import {useLocation, useNavigate } from 'react-router-dom';


// AllIcons
const CloseIcon = CgClose;
const PhoneIcon = MdPhoneIphone;
const EmailIcon = MdEmail;
const LocationIcon = MdLocationOn;

const UserInfo = () => {

    // For Routes
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.userInfo}>
                            <img
                                className={styles.avatar}
                                src={user.image}
                            />
                            <div className={styles.userNames}>
                                <h3 className={styles.fullName}>
                                    {user.lastName} {user.firstName} {user.maidenName || ""}
                                </h3>
                            </div>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={() => navigate('/')}
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Контакты */}
                    <div className={styles.contactInfo}>
                        <p className={styles.infoItem}>
                            <span className={styles.infoLabel}><EmailIcon/></span>
                            {user.email}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoLabel}><PhoneIcon/></span>
                            {user.phone}
                        </p>
                        <p className={styles.infoItem}>
                            <span className={styles.infoLabel}><LocationIcon/></span>
                            {user.address?.city || '-'}, {user.address?.country || '-'}
                        </p>
                    </div>

                    {/* Теги */}
                    <div className={styles.tags}>
                        <span className={`${styles.tag}  `}>

                          Возраст: {user.age}
                        </span>

                        <span className={`${styles.tag}`}>
                            Рост: {user.height} см
                        </span>
                        <span className={`${styles.tag} `}>
                            Вес: {user.weight} кг
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserInfo;