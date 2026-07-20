import React from "react";
import styles from './UsersTable.module.css';
import { useNavigate } from "react-router-dom";
import { IoFilterOutline } from "react-icons/io5";

const FilterIcon = IoFilterOutline;

const UsersTable = ({users, sortField, sortOrder, filterCity, filterToAge, filterFromAge, setSortField, setSortOrder, setFilterCity, setFilterToAge, setFilterFromAge}) => {

    const navigate = useNavigate();



    const allCity = [...new Set(users.map(user => user.address?.city))]

    const [ShowFilter, setShowFilter] = React.useState(false);



    const handleChangeBoxFilter = () => {
        setShowFilter(!ShowFilter);
        setFilterCity("none");
        setFilterToAge("");
        setFilterFromAge("");

    }

    const handleFromAgeFilter = (e) => {
        setFilterFromAge(e.target.value);
    }

    const handleToAgeFilter = (e) => {
        setFilterToAge(e.target.value);
    }

    const handleChangeCityFilter = (e) => {
        setFilterCity(e.target.value);
    }

    const handleClickCell = (user) => {
        navigate(`/users/${user.id}`, { state: { user } });
    }

    const handleChangeSortField = (e) => {
        setSortField(e.target.value);
        if (e.target.value === "none") {
            setSortOrder("asc")
        }
        console.log(e.target.value)
    }
    const handleChangeSortOrder = (e) => {
        setSortOrder(e.target.value);
        console.log(e.target.value)
    }

    return (
        <div id="container" className={styles.pageContainer}>
            <div id="tableHeader" className={styles.tableHeader}>
                <div className={styles.sortContainer}>
                    <div>Сортировать по:</div>
                    <div>
                        <select name="sort" id="by" className={styles.sortInput} onChange={handleChangeSortField}>
                            <option value="none">Без сортировки</option>
                            <option value="FIO">ФИО</option>
                            <option value="age">Возрасту</option>
                            <option value="gender">Полу</option>
                            <option value="phone">Номеру телефона</option>
                        </select>
                    </div>
                </div>
                <div className={styles.sortContainer}>
                    <div>Сортировать как:</div>
                    <div>
                        <select name="sort_asc_desc" id="kak" disabled={sortField === 'none'} onChange={handleChangeSortOrder} className={styles.sortInput} >
                            <option value="asc">По возрастанию</option>
                            <option value="desc">По убыванию</option>

                        </select>
                    </div>
                </div>
                <label className={styles.checkboxFilter}>
                    <input type="checkbox" checked={ShowFilter} onChange={handleChangeBoxFilter} hidden/>
                    <FilterIcon />
                </label>

            </div>
            {ShowFilter && (
                <div id="tableFilter" className={styles.tableFilter}>
                    <div className={styles.sortContainer}>
                        Возраст:
                        <div className={styles.sortContainer}>
                            <input type="number" placeholder="От" min={0} max={100} onChange={handleFromAgeFilter} className={styles.aksInput}/>
                            <div>-</div>
                            <input type="number" placeholder="До" min={0} max={100} onChange={handleToAgeFilter} className={styles.aksInput}/>
                        </div>
                    </div>
                    <div className={styles.sortContainer}>
                        Город:
                        <select id="selectCity" value={filterCity} onChange={handleChangeCityFilter} className={styles.sortInput}>
                            <option value="none">-</option>
                            {allCity.map(city => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div id="tableContainer" className={styles.tableContainer}>
                <table>
                    <thead className={styles.tableHead}>
                    <tr>
                        <th scope="col">Фамилия</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Отчество</th>
                        <th scope="col">Возраст</th>
                        <th scope="col">Пол</th>
                        <th scope="col">Номер телефона</th>
                        <th scope="col">Email</th>
                        <th scope="col">Страна</th>
                        <th scope="col">Город</th>
                    </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                    {users && users.length > 0 ? (

                        users.map((user) => (
                                <tr key={user.id} onClick={() => handleClickCell(user)}>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.maidenName || '-'}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address?.country || '-'}</td>
                                    <td>{user.address?.city || '-'}</td>
                                </tr>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>
                                Нет пользователей
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersTable;