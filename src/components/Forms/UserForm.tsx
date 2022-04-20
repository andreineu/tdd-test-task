import React from "react";

import { Form, Formik } from "formik";
import * as yup from "yup";

import { User } from "../../types";
import { Button } from "../Button";
import { InputField } from "../InputField";

import styles from "./UserForm.module.scss";

interface UserFormProps {
  user: User;
  disabled?: boolean;
}

const validationSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required(),
  phone: yup.string().required(),
  website: yup.string().required(),
  comment: yup.string().required()
});

export const UserForm: React.FC<UserFormProps> = ({
  user,
  disabled = false
}) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        name: user.name,
        username: user.username,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zip: user.address.zipcode,
        phone: user.phone,
        website: user.website,
        comment: ""
      }}
      validateOnBlur={true}
      validateOnMount={true}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <div className={styles.list}>
            {Object.keys(values).map((name, i) => (
              <InputField
                key={i}
                label={name.charAt(0).toUpperCase() + name.slice(1)}
                multiline={name === "comment"}
                disabled={disabled}
                name={name}
              />
            ))}
          </div>
          <div className={styles.submit}>
            <Button
              data-testid="submit"
              disabled={!isValid}
              color="success"
              type="submit"
            >
              Отправить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
