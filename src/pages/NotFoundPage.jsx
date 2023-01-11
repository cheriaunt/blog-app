import withClass from "../hoc/withClass";
import { Alert, Button } from "antd";
import { useNavigate } from "react-router-dom";
import styles from'../components/sign-in-form/sign-in-form.module.scss';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const onMainPage = () =>{
        navigate("/articles");
    }
  return (
    <>
      <Alert
        message={`This page does not exist, you can return to the `} 
        action={
            <Button size="large" type="link" onClick={onMainPage}>
              main page!
            </Button>
            }
        type='info' 
        showIcon />
    </> 
  );
}

export default withClass(NotFoundPage, styles.signIn);