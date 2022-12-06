import { Header } from '../Header/Header';

import styles from './Layout.module.scss';

const Layout = ({ children, className }) => {
	return (
		<div className={`${styles.wrapper} ${className}`}>
			<Header />
			{ children }
		</div>
	);
};

export { Layout }