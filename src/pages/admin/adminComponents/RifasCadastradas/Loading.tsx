import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Carregando...</p>
        </div>
    );
};

export default Loading;