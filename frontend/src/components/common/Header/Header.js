import userImage from '../../../images/header/user.svg'
import menuImage from '../../../images/header/hamburger.svg'

import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<button type='button'>
				<img src={userImage} alt='Auth' />
			</button>

			<button type='button'>
				<img src={menuImage} alt='Menu' />
			</button>
		</header>
	)
};

export { Header };