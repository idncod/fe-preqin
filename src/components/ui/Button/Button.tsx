import React from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    type: 'submit' | 'button' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
    color?: 'primary' | 'cancel' | 'edit';
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ type, onClick, children, color = 'primary', disabled = false }) => {
    const buttonClass = `${styles.button} ${styles[color]}`;

    return (
        <button type={type} onClick={onClick} className={buttonClass} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
