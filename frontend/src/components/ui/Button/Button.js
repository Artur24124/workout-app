import styles from './Button.module.scss';

const Button = ({
	children,
	className = 'default',
	onClick
}) => {
	return (
		<button
			className={`${styles.button} ${styles[className]}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export { Button };