import withClass from "../../hoc/withClass";
import styles from './edit-profile.module.scss';

const EditProfile = () => {
    return (
        <>
        <form>
            <h2 className={styles['form-header']}>Edit Profile
            </h2>
            <ul className={styles['inputs']}>
                <li className={styles['inputs-item']}>
                    <label htmlFor={'username'} >Username
                    </label>
                    <input type='text' id={'username'} placeholder='Username' className={styles['inputs-item-input']}/>
                </li>
                <li className={styles['inputs-item']}>
                    <label htmlFor={'email'} >Email address
                    </label>
                    <input type='text' id={'email'} placeholder={'Email address'} className={styles['inputs-item-input']}/>
                </li>
                <li className={styles['inputs-item']}>
                    <label htmlFor={'new password'} > New password
                    </label>
                    <input type='password' id={'new password'} placeholder={'New password'} autocomplete="new-password" className={styles['inputs-item-input']}/>
                </li>
                <li className={styles['inputs-item']}>
                <label htmlFor={'avatar image'} >Avatar image (url)
                    </label>
                    <input type='text' id={'avatar image'} placeholder={'Avatar image'} className={styles['inputs-item-input']}/>
                </li>
            </ul>
            <input className={styles['sign-up-btn']}type="submit" value="Save" />
        </form>
        </>
    )

};

export default withClass(EditProfile, styles.editeProfile);
