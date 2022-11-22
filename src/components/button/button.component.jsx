import "../button/button.styles.scss";

function Button({children, buttonType, ...otherProps}){
    // 3 types: inverted, default, google-sign-in

    const BUTTON_TYPE_CLASSES = {
        google: "google-sign-in",
        inverted: "inverted"
    }

    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;