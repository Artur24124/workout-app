import { Layout } from '../../common/Layout/Layout';
import { Counters } from '../../common/Counters/Counters';
import { Button } from '../../ui/Button/Button';

import styles from './Home.module.scss';

const Home = () => {
	return (
		<Layout className={styles.layout}>
			<div className={styles.home}>
				<Button
					className='main'
					onClick={() => {}}
				>
					New
				</Button>

				<h1 className={styles.title}>EXERCISES FOR THE SHOULDERS</h1>

				<Counters />
			</div>
		</Layout>
	)
};

export { Home }