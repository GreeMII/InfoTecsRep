import React from 'react';
import './App.css';
import UsersTable from "./components/UsersTable/UsersTable";
import UserInfo from "./components/UserInfo/UserInfo";
import { UserHooks } from './hooks/UserHooks';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const {
      users,
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
  } = UserHooks();


  return (
      <BrowserRouter basename="/InfoTecsRep">
        <Routes>
          <Route path="/" element={<UsersTable users={users} sortField={sortField} sortOrder={sortOrder} filterCity={filterCity} filterFromAge={filterFromAge} filterToAge={filterToAge}  setSortField={setSortField} setSortOrder={setSortOrder} setFilterCity={setFilterCity} setFilterFromAge={setFilterFromAge} setFilterToAge={setFilterToAge} />} />
          <Route path="/users/:id" element={<UserInfo user={users} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;