function Footer(){
    const year = new Date().getFullYear();
    return(
        <>
        <div className="footer">
            <h3>© {year} NeoSpace. All rights reserved.</h3>
        </div>
        </>
    )
}

export default Footer;