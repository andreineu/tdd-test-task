import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types";

import styles from "./UserCard.module.scss";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div>
        <span className={styles.field}>ФИО: </span>
        {user.name}
      </div>
      <div>
        <span className={styles.field}>город: </span>
        {user.address.city}
      </div>
      <div>
        <span className={styles.field}>компания: </span>
        {user.company.name}
      </div>
      <div className={styles.link}>
        <Link to={`/user/${user.id}`}>Подробнее</Link>
      </div>
    </div>
  );
};
