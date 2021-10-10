import RadioButtons from "./radiobutton";
import CheckboxGroup from "./checkBoxGroup";
import DatePicker from "./datePicker";
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "radio":
      return <RadioButtons {...rest} />;
    case "checkbox":
      return <CheckboxGroup {...rest} />;
    case "date":
      return <DatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
