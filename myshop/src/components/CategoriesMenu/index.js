import Link from 'next/link';

import styles from './CategoriesMenu.module.css';

// params = { categories, ... }
const CategoriesMenu = ({ categories = [] }) => {
    // const categories = params.categories;
    return (
        <div className={styles.menu}>
            <h3>Kategooriad</h3>
            <menu className={styles.wrapper}>
                {categories.map(category => (
                    <div className={styles.category}>
                        <Link href={`/kategooriad/${category.slug}`}>{category.name}</Link>
                    </div>
                ))}
            </menu>
        </div>
    );
};

export default CategoriesMenu;
