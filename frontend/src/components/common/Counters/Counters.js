import styles from './Counters.module.scss';

const data = [
	{ title: 'Minutes', value: 19 },
	{ title: 'Workouts', value: 0 },
	{ title: 'Weight', value: 60 }
];

const Counters = ({ stats = data }) => {
	const generateCounters = (counters) => {
		return counters.map(counter => (
			<div key={counter.title} className={styles.counter}>
				<div className={styles.counter__title}>
					{counter.title}
				</div>

				<div className={styles.counter__value}>
					{counter.value}
				</div>
			</div>
		))
	}

	return (
		<div className={styles.counters}>
			{generateCounters(stats)}
		</div>
	);
};

export { Counters };