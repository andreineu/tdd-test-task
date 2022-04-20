import { FieldHookConfig, useField } from "formik";

import styles from "./InputField.module.scss";

type InputFieldProps = {
  multiline?: boolean;
  label: string;
} & FieldHookConfig<string>;

export const InputField: React.FC<InputFieldProps> = ({
  multiline,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  const classes = [
    styles.field,
    meta.error && meta.touched ? styles["field-error"] : ""
  ].join(" ");

  const fieldProps = {
    disabled: props.disabled,
    className: classes,
    placeholder: props.placeholder,
    ...field
  };

  let component = <input {...fieldProps} />;
  if (multiline) component = <textarea rows={3} {...fieldProps} />;
  return (
    <div>
      <label>
        {label}
        {component}
      </label>
      {meta.touched && meta.error ? (
        <div data-testid="error-message" className={styles.error}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
