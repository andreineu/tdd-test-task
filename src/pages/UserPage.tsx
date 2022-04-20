import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { UserForm } from "../components/Forms/UserForm";

import { api } from "../api";
import { User } from "../types";

import styles from "./UserPage.module.scss";

export const UserPage = () => {
  const [user, setUser] = useState<User>();
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    api.getUserById(id!).then((u) => setUser(u));
  }, [id]);

  const handleClick = () => {
    setIsDisabled((p) => !p);
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Профиль пользователя</h1>
        <Button onClick={handleClick}>
          {isDisabled ? "Редактировать" : "Отменить"}
        </Button>
      </div>
      {user ? (
        <UserForm user={user} disabled={isDisabled} />
      ) : (
        <h1>...loading</h1>
      )}
    </>
  );
};
