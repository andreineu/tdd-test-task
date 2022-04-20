import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { api } from "./api";

import styles from "./pages/UserPage.module.scss";

import { UserCard } from "./components/User";
import { UserPage } from "./pages/UserPage";
import { User } from "./types";
import { Layout } from "./components/Layout";
import { Button } from "./components/Button";

type Filters = "city" | "company";

export const App: React.FC<{}> = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [activeFilter, setActiveFilter] = useState<Filters | null>(null);

  useEffect(() => {
    api.getUsers().then((users) => setUsers(users));
  }, []);

  const sortedUsers = useMemo(() => {
    return users.sort((a, b) =>
      activeFilter === "city"
        ? a.address.city.localeCompare(b.address.city)
        : a.company.name.localeCompare(b.company.name)
    );
  }, [users, activeFilter]);

  const handleSortClick = (filter: Filters) => () => {
    setActiveFilter(filter);
  };

  return (
    <Layout
      sidebar={
        <div className={styles.list}>
          <div>Сортировка</div>
          <div>
            <Button onClick={handleSortClick("city")}>По городу</Button>
          </div>
          <div>
            <Button onClick={handleSortClick("company")}>По компании</Button>
          </div>
        </div>
      }
    >
      <Routes>
        <Route
          index
          element={
            <>
              <h1>Список пользователей</h1>
              <div className={styles.list}>
                {sortedUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </>
          }
        />
        <Route path="user/:id" element={<UserPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
