import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
    return (
        <div>
            
            <div className="content-container" style={{minHeight: 'calc(100vh - 44px)'}}>
                <Navbar />
                { children }
            </div>
            
            <Footer />
        </div>
    )
}

export default Layout;