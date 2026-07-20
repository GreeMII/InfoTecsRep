import React, { useState, useEffect, useMemo } from 'react';
import { UserApi } from '../services/UserApi';

export const UserHooks = () => {

    // take a data users
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State Sort
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // State Filter
    const [filterCity, setFilterCity] = React.useState('');
    const [filterFromAge, setFilterFromAge] = React.useState("");
    const [filterToAge, setFilterToAge] = React.useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await UserApi.getAllUsers();
            setUsers(data.users || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter Users by City and Age
    const filteredUsers = useMemo(() => {
        let result = [...users];

        if (filterCity && filterCity !== 'none') {
            result = result.filter(user => user.address?.city === filterCity);
        }


        if (filterFromAge && filterFromAge !== '') {
            const fromAge = Number(filterFromAge);
            if (!isNaN(fromAge) && fromAge >= 0) {
                result = result.filter(user => user.age >= fromAge);
            }
        }

        if (filterToAge && filterToAge !== '') {
            const toAge = Number(filterToAge);
            if (!isNaN(toAge) && toAge >= 0) {
                result = result.filter(user => user.age <= toAge);
            }
        }

        return result;
    }, [users, filterCity, filterFromAge, filterToAge]);

    // Sort Users by FIO, age, gender and phone
    const sortedUsers = useMemo(() => {
        if (!sortField || sortField === 'none') {
            return filteredUsers;
        }

        const sorted = [...filteredUsers];

        sorted.sort((a, b) => {
            let valueA, valueB;

            switch (sortField) {
                case 'FIO':
                    valueA = `${a.lastName} ${a.firstName} ${a.maidenName}`.toLowerCase();
                    valueB = `${b.lastName} ${b.firstName} ${b.maidenName}`.toLowerCase();
                    break;
                case 'age':
                    valueA = a.age;
                    valueB = b.age;
                    break;
                case 'gender':
                    valueA = a.gender;
                    valueB = b.gender;
                    break;
                case 'phone':
                    valueA = a.phone;
                    valueB = b.phone;
                    break;
                default:
                    valueA = a[sortField] || '';
                    valueB = b[sortField] || '';
            }

            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredUsers, sortField, sortOrder]);

    return {
        users: sortedUsers,
        filteredUsers,
        originalUsers: users,
        loading,
        error,
        sortField,
        sortOrder,
        filterCity,
        filterFromAge,
        filterToAge,
        setSortField,
        setSortOrder,
        setFilterCity,
        setFilterFromAge,
        setFilterToAge,
        refetch: fetchUsers
    };
};